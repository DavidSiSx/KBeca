import { db } from './src/db/client';
import { scholarships } from './src/db/schema';

async function clearDb() {
  console.log('Borrando datos mock de scholarships...');
  await db.delete(scholarships);
  console.log('Base de datos vaciada.');
}

clearDb().catch(console.error).finally(() => process.exit(0));
