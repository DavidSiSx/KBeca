import { findMatchingScholarships } from './src/features/scholarships/queries/match';
import { db } from './src/db/client';
import { scholarships } from './src/db/schema';

async function test() {
  const params = {
    state: "Quintana Roo",
    academicLevel: "Superior",
    gender: "Masculino",
    age: 20,
    hasChildren: false,
    groups: []
  };

  try {
    const results = await findMatchingScholarships(params as any);
    console.log(`Found ${results.length} matches for `, params);
    
    // Total DB check
    const total = await db.select().from(scholarships);
    console.log(`Total in DB: ${total.length}`);
    
    // Count active
    const active = total.filter(t => t.status === 'active');
    console.log(`Active in DB: ${active.length}`);
    
    // Count superior
    const superior = active.filter(t => t.academicLevels && t.academicLevels.includes('Superior'));
    console.log(`Active & Superior in DB: ${superior.length}`);

    // Check states
    const statesMatch = superior.filter(t => !t.targetStates || t.targetStates.length === 0 || t.targetStates.includes('Quintana Roo'));
    console.log(`Active & Superior & Qroo/National: ${statesMatch.length}`);

    // Check groups
    const groupsMatch = statesMatch.filter(t => !t.targetGroups || t.targetGroups.length === 0);
    console.log(`Active & Superior & Qroo/National & General Audience: ${groupsMatch.length}`);

    // Check deadlines
    const now = new Date();
    const finalMatch = groupsMatch.filter(t => !t.deadline || new Date(t.deadline) > now);
    console.log(`Final JS Match: ${finalMatch.length}`);

  } catch (err) {
    console.error(err);
  }
}

test().catch(console.error).finally(() => process.exit(0));
