import { fetchMatches } from '@/app/actions/getMatches';
import { UserFormResponses } from '@/lib/validations';
import fs from 'fs';

const REAL_STATES = ['Aguascalientes', 'Ciudad de México', 'Jalisco', 'Nuevo León', 'Yucatán', 'Tamaulipas', 'Zacatecas', 'Chiapas', 'Sonora', 'Guanajuato'];
const REAL_LEVELS = ['Básica', 'Media Superior', 'Superior', 'Posgrado'];
const REAL_GROUPS = ['Excelencia académica', 'Discapacidad', 'Prioridad socioeconómica', 'Indígenas', 'Madres o padres solteros', 'Embarazadas', 'Enfermedad crónica', 'Zonas rurales o marginadas', 'Adultos mayores'];
const CHAOTIC_STRINGS = ['', '   ', 'null', 'undefined', 'NaN', 'DROP TABLE scholarships;', '👩‍🚀', 'Extranjero', 'No sé'];
const GENDERS = ['Femenino', 'Masculino', 'Otro'] as const;

function getRandomItem<T>(arr: T[] | readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateRandomProfile(): UserFormResponses {
  const isChaotic = Math.random() < 0.2; // 20% de probabilidad de ser caótico

  if (isChaotic) {
    // Generar intencionalmente un perfil con contradicciones y strings caóticos
    return {
      state: getRandomItem(CHAOTIC_STRINGS),
      academicLevel: Math.random() < 0.5 ? getRandomItem(CHAOTIC_STRINGS) : getRandomItem(REAL_LEVELS),
      groups: Math.random() < 0.5 ? [] : [getRandomItem(REAL_GROUPS), getRandomItem(CHAOTIC_STRINGS)],
      gender: getRandomItem(GENDERS),
      age: Math.floor(Math.random() * 100), // Edad aleatoria (podría fallar si es Adulto mayor y < 60)
      hasChildren: Math.random() < 0.5,
      isPregnant: Math.random() < 0.5
    };
  }

  // Perfil normal/semi-realista
  const numGroups = Math.floor(Math.random() * 3); // 0 a 2 grupos
  const groups: string[] = [];
  for (let i = 0; i < numGroups; i++) {
    const group = getRandomItem(REAL_GROUPS);
    if (!groups.includes(group)) {
      groups.push(group);
    }
  }

  // Si no queremos forzar que todos los perfiles normales fallen, arreglamos los demográficos
  let gender = getRandomItem(GENDERS);
  let age = Math.floor(Math.random() * 50) + 15; // 15 a 65
  let hasChildren = Math.random() < 0.3;
  let isPregnant = Math.random() < 0.1;
  const academicLevel = getRandomItem(REAL_LEVELS);

  // Intentar hacer perfiles lógicos para los grupos seleccionados (a menos que queramos probar la validación intencionalmente en los chaotic)
  if (groups.includes('Madres o padres solteros')) {
    hasChildren = true;
  }
  if (groups.includes('Embarazadas')) {
    gender = 'Femenino';
    isPregnant = true;
  }
  if (groups.includes('Adultos mayores')) {
    age = Math.floor(Math.random() * 30) + 60; // 60 a 90
  }
  if (academicLevel === 'Básica') {
    age = Math.floor(Math.random() * 12) + 6; // 6 a 18
  }

  return {
    state: Math.random() < 0.8 ? getRandomItem(REAL_STATES) : getRandomItem(CHAOTIC_STRINGS),
    academicLevel,
    groups,
    gender,
    age,
    hasChildren,
    isPregnant
  };
}

async function runMassTests() {
  console.log('Generando 200 perfiles para pruebas masivas con validación Zod...');
  
  const results = {
    totalTests: 0,
    successes: 0,
    validationErrorsCount: 0,
    dbErrorsCount: 0,
    zeroMatches: 0,
    hasMatches: 0,
    maxMatches: 0,
    maxMatchProfile: null as any,
    chaoticProfilesTested: 0,
    errorsList: [] as any[]
  };

  for (let i = 0; i < 200; i++) {
    const profile = generateRandomProfile();
    const isChaotic = CHAOTIC_STRINGS.includes(profile.state) || CHAOTIC_STRINGS.includes(profile.academicLevel);
    if (isChaotic) results.chaoticProfilesTested++;

    const res = await fetchMatches(profile);
    results.totalTests++;

    if (res.success && res.data) {
      results.successes++;
      const matchCount = res.data.length;
      
      if (matchCount === 0) {
        results.zeroMatches++;
      } else {
        results.hasMatches++;
        if (matchCount > results.maxMatches) {
          results.maxMatches = matchCount;
          results.maxMatchProfile = { profile, matches: matchCount };
        }
      }
    } else {
      // Diferenciar error de validación de error de DB
      if (res.validationErrors) {
        results.validationErrorsCount++;
      } else {
        results.dbErrorsCount++;
      }
      results.errorsList.push({ profile, error: res.error, validationErrors: res.validationErrors });
    }
  }

  // Guardar resultados
  fs.writeFileSync('mass-test-report.json', JSON.stringify(results, null, 2));
  console.log('✅ Pruebas masivas completadas. Reporte guardado en mass-test-report.json');
  console.log(`Resumen: ${results.successes} exitosos, ${results.validationErrorsCount} errores de validación (bloqueados correctamente), ${results.dbErrorsCount} errores de DB.`);
  process.exit(0);
}

runMassTests();
