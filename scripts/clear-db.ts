import { db } from '@/db/client';
import { sql } from 'drizzle-orm';

async function clearDB() {
  console.log('Borrando la tabla scholarships para preparar la normalización...');
  await db.execute(sql`DELETE FROM scholarships`);
  console.log('✅ Base de datos limpiada. Lista para el scraper.');
  process.exit(0);
}

clearDB();
