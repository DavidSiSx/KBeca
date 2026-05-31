import { db } from './src/db/client';
import { scholarships } from './src/db/schema';
import { arrayContains, arrayOverlaps, or } from 'drizzle-orm';

async function testQuery() {
  const all = await db.select().from(scholarships);
  console.log('Total in DB:', all.length);

  const matched = await db.select().from(scholarships).where(
    or(
      arrayContains(scholarships.targetStates, ['Quintana Roo']),
      arrayContains(scholarships.targetStates, ['Nacional / No aplica'])
    )
  );

  console.log('Matched Qroo or Nacional:', matched.length);
  
  const superMatched = matched.filter(b => b.academicLevels.includes('Superior'));
  console.log('Matched Qroo or Nacional AND Superior:', superMatched.length);

  // Let's print out what states and levels are actually stored in the DB for the first 5 records
  all.slice(0, 5).forEach(b => {
    console.log(`Beca: ${b.title}`);
    console.log(`  States: ${JSON.stringify(b.targetStates)}`);
    console.log(`  Levels: ${JSON.stringify(b.academicLevels)}`);
  });
}

testQuery().catch(console.error).finally(() => process.exit(0));
