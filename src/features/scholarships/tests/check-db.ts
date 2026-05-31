import { db } from '@/db/client';
import { scholarships } from '@/db/schema';
import { sql } from 'drizzle-orm';

async function analyzeDB() {
  console.log('--- ESTADOS EN LA BD ---');
  const states = await db.execute(sql`SELECT DISTINCT unnest(target_states) as state FROM scholarships`);
  console.log(states.map(r => `"${r.state}"`).join(', '));

  console.log('\n--- NIVELES ACADÉMICOS EN LA BD ---');
  const levels = await db.execute(sql`SELECT DISTINCT unnest(academic_levels) as level FROM scholarships`);
  console.log(levels.map(r => `"${r.level}"`).join(', '));

  console.log('\n--- GRUPOS EN LA BD ---');
  const groups = await db.execute(sql`SELECT DISTINCT unnest(target_groups) as grp FROM scholarships`);
  console.log(groups.map(r => `"${r.grp}"`).join(', '));

  process.exit(0);
}

analyzeDB();
