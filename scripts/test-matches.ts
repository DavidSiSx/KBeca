import { db } from '../src/db/client';
import { findMatchingScholarships } from '../src/features/scholarships/queries/match';
import { UserFormResponses } from '../src/lib/validations';
import { ESTADOS } from '../src/config/estados';
import { NIVELES } from '../src/config/niveles';
import { GRUPOS } from '../src/config/grupos';

function getRandomItem(arr: any[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateValidProfile(): UserFormResponses {
  const gender = getRandomItem(['Femenino', 'Masculino']);
  let age = Math.floor(Math.random() * 40) + 10; // entre 10 y 50 años
  const hasChildren = Math.random() > 0.7;
  let isPregnant = false;
  let groups: string[] = [];

  // Agregar algún grupo aleatorio, excepto los conflictivos (los manejaremos manualmente para que sean válidos)
  const randomGroup = getRandomItem(GRUPOS).id;
  if (randomGroup === 'Embarazadas') {
    if (gender === 'Femenino') {
      isPregnant = true;
      groups.push(randomGroup);
    }
  } else if (randomGroup === 'Madres o padres solteros') {
    if (hasChildren) {
      groups.push(randomGroup);
    }
  } else if (randomGroup === 'Adultos mayores') {
    age = Math.floor(Math.random() * 20) + 65; // 65-85 años
    groups.push(randomGroup);
  } else {
    if (Math.random() > 0.5) {
      groups.push(randomGroup);
    }
  }

  return {
    state: getRandomItem(ESTADOS).value,
    academicLevel: getRandomItem(NIVELES).id,
    groups: groups,
    gender: gender,
    age: age,
    hasChildren: hasChildren,
    isPregnant: isPregnant
  };
}

async function runTests() {
  console.log("==========================================");
  console.log("   TEST DE EMPAREJAMIENTO DE PERFILES");
  console.log("==========================================\n");

  let totalScholarshipsFound = 0;

  for (let i = 1; i <= 50; i++) {
    const profile = generateValidProfile();
    
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
