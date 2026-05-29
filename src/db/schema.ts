import { pgTable, serial, text, timestamp, index, varchar } from 'drizzle-orm/pg-core';

export const scholarships = pgTable(
  'scholarships',
  {
    id: serial('id').primaryKey(),
    hashId: varchar('hash_id', { length: 256 }).notNull().unique(), // SHA-256 for idempotency
    title: text('title').notNull(),
    institutionName: text('institution_name').notNull(),
    description: text('description'),
    targetStates: text('target_states').array(), // Arrays for fast matching
    academicLevels: text('academic_levels').array().notNull(),
    status: varchar('status', { length: 50 }).notNull().default('active'), // active, pending, expired
    deadline: timestamp('deadline'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => {
    return [
      // GIN Indexes for array columns to ensure blazing fast matching queries
      index('idx_scholarships_states').using('gin', table.targetStates),
      index('idx_scholarships_levels').using('gin', table.academicLevels),
    ];
  }
);
