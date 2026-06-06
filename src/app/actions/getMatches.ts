'use server';

import { findMatchingScholarships } from '@/features/scholarships/queries/match';
import { UserFormSchema, UserFormResponses } from '@/lib/validations';
import { unstable_cache } from 'next/cache';

/**
 * Server Action que recibe las respuestas del formulario lineal
 * y devuelve el listado de becas compatibles usando Drizzle ORM.
 */
// eslint-disable-next-line
export async function fetchMatches(responses: UserFormResponses) {
  try {
    // Validación estricta con Zod
    const validationResult = UserFormSchema.safeParse(responses);
    
    if (!validationResult.success) {
      // Tomamos el primer error para mostrar un mensaje amigable
      const firstError = validationResult.error?.issues?.[0]?.message;
      return {
        success: false,
        data: null,
        error: firstError || 'La información proporcionada contiene errores lógicos o está incompleta.',
        validationErrors: validationResult.error?.issues
      };
    }

    // Generar una clave de caché única basada en los parámetros
    const cacheKey = JSON.stringify(validationResult.data);
    
    // Función cacheadada agresivamente por 24 horas (86400 segundos)
    const getCachedMatches = unstable_cache(
      async (data: UserFormResponses) => {
        return await findMatchingScholarships(data, undefined);
      },
      [`matches-${cacheKey}`],
      { revalidate: 86400, tags: ['scholarships'] }
    );

    const matches = await getCachedMatches(validationResult.data);
    
    // Retornamos los datos planos para que los consuma React
    return {
      success: true,
      data: matches,
      error: null
    };
  } catch (error) {
    console.error('Error fetching matches:', error);
    return {
      success: false,
      data: null,
      error: 'Hubo un error al calcular tus resultados. Inténtalo más tarde.'
    };
  }
}
