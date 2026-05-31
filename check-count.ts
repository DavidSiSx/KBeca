import { db } from './src/db/client';
import { scholarships } from './src/db/schema';
import { sql } from 'drizzle-orm';

async function check() {
  const result = await db.select({ count: sql<number>`count(*)` }).from(scholarships);
  console.log('Total scholarships:', result[0].count);
}

check().catch(console.error).finally(() => process.exit(0));
