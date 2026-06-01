import { pgTable, serial, text, timestamp, index, varchar, customType, boolean } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

// Definir tipo customizado para pgvector
const vectorType = customType<{ data: number[]; driverData: string }>({
  dataType() {
    return 'vector(768)';
  },
  toDriver(value: number[]): string {
    return `[${value.join(',')}]`;
  },
  fromDriver(value: string | number[]): number[] {
    if (Array.isArray(value)) return value;
    return value.replace('[', '').replace(']', '').split(',').map(Number);
  },
});

export const scholarships = pgTable(
  'scholarships',
  {
    id: serial('id').primaryKey(),
    hashId: varchar('hash_id', { length: 256 }).notNull().unique(), // SHA-256 for idempotency
    title: text('title').notNull(),
    institutionName: text('institution_name').notNull(),
    description: text('description'),
    url: text('url').notNull(),
    targetStates: text('target_states').array(), // Arrays for fast matching
    targetGroups: text('target_groups').array(), // Ej: adultos mayores, enfermedades, indígenas, etc.
    academicLevels: text('academic_levels').array().notNull(),
    status: varchar('status', { length: 50 }).notNull().default('active'), // active, pending, expired
    requiresEnrollment: boolean('requires_enrollment').default(false), // true si requiere estar inscrito en la institucion
    callDate: timestamp('call_date'), // Fecha de convocatoria
    deadline: timestamp('deadline'), // Expira
    embedding: vectorType('embedding'), // Representación semántica (Gemini 768)
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => {
    return [
      // GIN Indexes for array columns to ensure blazing fast matching queries
      index('idx_scholarships_states').using('gin', table.targetStates),
      index('idx_scholarships_levels').using('gin', table.academicLevels),
      // Index for semantic vector search
      index('idx_scholarships_embedding').using('hnsw', table.embedding.op('vector_cosine_ops')),
    ];
  }
);
