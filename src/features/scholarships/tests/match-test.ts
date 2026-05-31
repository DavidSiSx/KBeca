import { fetchMatches } from '@/app/actions/getMatches';
import { UserFormResponses } from '@/lib/validations';

async function runTest() {
  console.log('🧪 Iniciando prueba del algoritmo de emparejamiento con validación Zod...\n');

  // Perfil de prueba 1: Estudiante de Preparatoria, Yucatán, perfil correcto
  const profile1: UserFormResponses = {
    state: 'Yucatán',
    academicLevel: 'Media Superior',
    groups: [],
    gender: 'Masculino',
    age: 16,
    hasChildren: false,
    isPregnant: false
  };

  console.log('📝 Perfil 1 (Valido):', profile1);
  const result1 = await fetchMatches(profile1);
  if (result1.success) {
    console.log(`✅ Se encontraron ${result1.data?.length} becas compatibles.`);
  } else {
    console.log('❌ Error:', result1.error);
  }

  console.log('\n----------------------------------------\n');

  // Perfil de prueba 2: Estudiante Universitario (Superior), Ciudad de México, Madre Soltera (Correcto)
  const profile2: UserFormResponses = {
    state: 'Ciudad de México',
    academicLevel: 'Superior',
    groups: ['Madres solteras'],
    gender: 'Femenino',
    age: 22,
    hasChildren: true,
    isPregnant: false
  };

  console.log('📝 Perfil 2 (Valido - Madre Soltera Femenina con hijos):', profile2);
  const result2 = await fetchMatches(profile2);
  if (result2.success) {
    console.log(`✅ Se encontraron ${result2.data?.length} becas compatibles.`);
  } else {
    console.log('❌ Error:', result2.error);
  }
  
  console.log('\n----------------------------------------\n');

  // Perfil de prueba 3: INVALIDO - Hombre aplicando a Madres Solteras
  const profile3: UserFormResponses = {
    state: 'Jalisco',
    academicLevel: 'Superior',
    groups: ['Madres solteras'],
    gender: 'Masculino',
    age: 25,
    hasChildren: true,
    isPregnant: false
  };

  console.log('📝 Perfil 3 (Invalido - Hombre en programa de madres solteras):', profile3);
  const result3 = await fetchMatches(profile3);
  if (result3.success) {
    console.log(`❌ ERROR FATAL: Pasó la validación cuando no debía.`);
  } else {
    console.log(`✅ Validación bloqueó correctamente: ${result3.error}`);
  }

  console.log('\n----------------------------------------\n');

  // Perfil de prueba 4: INVALIDO - Persona de 30 años en programa de Adultos mayores
  const profile4: UserFormResponses = {
    state: 'Extranjero',
    academicLevel: 'Posgrado',
    groups: ['Adultos mayores'],
    gender: 'Femenino',
    age: 30,
    hasChildren: false,
    isPregnant: false
  };

  console.log('📝 Perfil 4 (Invalido - Persona joven en programa de adultos mayores):', profile4);
  const result4 = await fetchMatches(profile4);
  if (result4.success) {
    console.log(`❌ ERROR FATAL: Pasó la validación cuando no debía.`);
  } else {
    console.log(`✅ Validación bloqueó correctamente: ${result4.error}`);
  }
  
  process.exit(0);
}

runTest();
