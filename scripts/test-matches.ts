import { db } from '../src/db/client';
import { findMatchingScholarships } from '../src/features/scholarships/queries/match';
import { UserFormResponses } from '../src/lib/validations';
import { ESTADOS } from '../src/config/estados';
import { NIVELES } from '../src/config/niveles';
import { GRUPOS } from '../src/config/grupos';

function getRandomItem(arr: any[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateValidProfile(enfoque: number): UserFormResponses {
  let gender = getRandomItem(['Femenino', 'Masculino']);
  let age = Math.floor(Math.random() * 40) + 10;
  let hasChildren = Math.random() > 0.7;
  let isPregnant = false;
  let groups: string[] = [];
  let academicLevel = getRandomItem(NIVELES).id;
  let state = getRandomItem(ESTADOS).value;

  // Enfoque 1: No estudia (Ninguno)
  if (enfoque === 1) {
    academicLevel = 'Ninguno';
    age = Math.floor(Math.random() * 20) + 18; // 18 a 38 años
  }
  // Enfoque 2: Embarazada y/o con hijos, nivel básico o medio
  else if (enfoque === 2) {
    gender = 'Femenino';
    isPregnant = Math.random() > 0.5;
    hasChildren = true;
    academicLevel = getRandomItem(['Básica', 'Media Superior']);
    if (isPregnant) groups.push('Embarazadas');
    groups.push('Madres o padres solteros');
  }
  // Enfoque 3: Adulto mayor, no importa el nivel
  else if (enfoque === 3) {
    age = Math.floor(Math.random() * 20) + 65; // 65-85
    groups.push('Adultos mayores');
  }
  // Enfoque 4: Grupo vulnerable (Discapacidad o Indígena), Educación Superior
  else if (enfoque === 4) {
    academicLevel = 'Superior';
    groups.push(getRandomItem(['Personas con discapacidad', 'Pueblos indígenas y afromexicanos']));
    age = Math.floor(Math.random() * 10) + 18; // 18-28
  }
  // Enfoque 5: Perfil genérico, sin grupos, de estado aleatorio, edad escolar
  else {
    groups = [];
    age = Math.floor(Math.random() * 10) + 12; // 12-22
  }

  return {
    state,
    academicLevel,
    groups,
    gender,
    age,
    hasChildren,
    isPregnant
  };
}

async function runTests() {
  console.log("==========================================");
  console.log("   TEST DE EMPAREJAMIENTO DE PERFILES");
  console.log("==========================================\n");

  let totalScholarshipsFound = 0;

  for (let i = 1; i <= 50; i++) {
    const enfoque = (i % 5) + 1;
    const profile = generateValidProfile(enfoque);
    
    // Obtenemos las becas usando la función de matching real
    const matches = await findMatchingScholarships(profile, undefined);
    
    totalScholarshipsFound += matches.length;

    console.log(`[Test #${i}] Perfil: ${profile.age} años | ${profile.gender} | Nivel: ${profile.academicLevel} | Estado: ${profile.state} | Grupos: ${profile.groups.length > 0 ? profile.groups.join(', ') : 'Ninguno'}`);
    
    if (matches.length === 0) {
      console.log(`   ❌ No se encontraron becas.\n`);
    } else {
      console.log(`   ✅ Se encontraron ${matches.length} becas.`);
      // Mostrar solo los primeros 2 resultados para no saturar la consola
      const topMatches = matches.slice(0, 2);
      topMatches.forEach((match, index) => {
         console.log(`      -> Beca ${index + 1}: ${match.title}`);
         console.log(`         Institución: ${match.institutionName}`);
         console.log(`         URL: ${match.url}`);
      });
      console.log(""); // Espacio extra
    }
  }

  console.log("==========================================");
  console.log(`   FIN DEL TEST. Becas devueltas en total: ${totalScholarshipsFound}`);
  console.log("==========================================");
  process.exit(0);
}

runTests().catch(e => {
  console.error(e);
  process.exit(1);
});
