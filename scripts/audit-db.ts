import { fetchMatches } from '@/app/actions/getMatches';

async function testSemanticSearch() {
  console.log('Iniciando prueba de búsqueda semántica (Vector Search)...');
  
  const fakeUserData = {
    state: 'Jalisco',
    academicLevel: 'Superior',
    groups: [],
    gender: 'Masculino',
    age: 22,
    hasChildren: false,
    isPregnant: false,
    freeTextSearch: "Programación e Inteligencia Artificial", // <--- Prueba de vector
  };

  // @ts-ignore (we know it's valid for this test)
  const result = await fetchMatches(fakeUserData);

  if (result.success) {
    console.log(`✅ Éxito! Se encontraron ${result.data?.length} becas.`);
    if (result.data && result.data.length > 0) {
      console.log('Top match:', result.data[0].title);
    }
  } else {
    console.error('❌ Falló la búsqueda semántica:', result.error);
    console.error(result.validationErrors);
  }
}

testSemanticSearch().then(() => process.exit(0));
