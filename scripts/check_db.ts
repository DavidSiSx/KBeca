import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { scholarships } from '../src/db/schema';
import { sql } from 'drizzle-orm';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function checkDb() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL is missing in .env.local');
  }

  const client = postgres(connectionString, { prepare: false });
  const db = drizzle(client);

  try {
    const result = await db.select({ count: sql<number>`count(*)` }).from(scholarships);
    console.log(`✅ Conexión exitosa a la base de datos.`);
    console.log(`📊 Total de becas registradas: ${result[0].count}`);
    
    // Contar por status
    const byStatus = await db.select({
      status: scholarships.status,
      count: sql<number>`count(*)`
    }).from(scholarships).groupBy(scholarships.status);
    
    console.log(`\nDesglose por estado:`);
    byStatus.forEach(row => {
      console.log(`- ${row.status}: ${row.count}`);
    });
    
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
  } finally {
    await client.end();
  }
}

checkDb();
