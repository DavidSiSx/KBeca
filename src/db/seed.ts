import { db } from './index';
import { scholarships } from './schema';
import { fakerES_MX as faker } from '@faker-js/faker';
import crypto from 'crypto';

const STATES = [
  'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas', 
  'Chihuahua', 'Coahuila', 'Colima', 'Ciudad de México', 'Durango', 'Guanajuato', 
  'Guerrero', 'Hidalgo', 'Jalisco', 'Estado de México', 'Michoacán', 'Morelos', 
  'Nayarit', 'Nuevo León', 'Oaxaca', 'Puebla', 'Querétaro', 'Quintana Roo', 
  'San Luis Potosí', 'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 
  'Veracruz', 'Yucatán', 'Zacatecas'
];

const LEVELS = ['Básica', 'Media Superior', 'Superior', 'Posgrado'];

function generateMockScholarships(count: number) {
  const mocks = [];
  
  for (let i = 0; i < count; i++) {
    const title = `Beca ${faker.company.catchPhrase()} - 2026`;
    const institutionName = faker.company.name();
    
    // Hash SHA-256 for Idempotency
    const hash = crypto.createHash('sha256').update(title + institutionName).digest('hex');
    
    // 30% chance of being national (null), 70% chance of being targeted to 1-3 states
    const isNational = faker.number.int({ min: 1, max: 100 }) <= 30;
    const targetStates = isNational ? null : faker.helpers.arrayElements(STATES, faker.number.int({ min: 1, max: 3 }));
    
    // 1 to 2 academic levels
    const academicLevels = faker.helpers.arrayElements(LEVELS, faker.number.int({ min: 1, max: 2 }));

    mocks.push({
      hashId: hash,
      title,
      institutionName,
      description: faker.lorem.paragraphs(2),
      targetStates,
      academicLevels,
      status: 'active',
      deadline: faker.date.future({ years: 1 }),
    });
  }
  return mocks;
}

async function main() {
  console.log('🌱 Iniciando el Mock Seeder...');
  
  const data = generateMockScholarships(20);
  
  try {
    console.log('Borrando datos anteriores (si existen)...');
    await db.delete(scholarships);
    
    console.log(`Insertando ${data.length} becas realistas...`);
    await db.insert(scholarships).values(data);
    
    console.log('✅ ¡Base de datos poblada exitosamente!');
  } catch (error) {
    console.error('❌ Error ejecutando el seeder:', error);
  } finally {
    process.exit(0);
  }
}

main();
