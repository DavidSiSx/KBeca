import { db } from '@/db/client';
import { scholarships } from '@/db/schema';
import { and, or, isNull, gt, arrayContains, eq, arrayOverlaps, sql } from 'drizzle-orm';

import { UserFormResponses } from '@/lib/validations';

export async function findMatchingScholarships(responses: UserFormResponses, searchVector?: number[]) {
  const now = new Date();

  // Condición 1: El estatus debe ser activo
  const statusCondition = eq(scholarships.status, 'active');

  // Condición 2: La convocatoria no debe haber expirado
  const deadlineCondition = or(
    isNull(scholarships.deadline),
    gt(scholarships.deadline, now)
  );

  // Condición 3: Filtro de estado geográfico
  // Es nacional (NULL o vacío) o contiene el estado del usuario
  const isNationalScholarship = or(
    isNull(scholarships.targetStates),
    sql`cardinality(${scholarships.targetStates}) = 0`
  );

  const stateCondition = or(
    isNationalScholarship,
    arrayContains(scholarships.targetStates, [responses.state])
  );

  // Condición 4: Filtro de nivel académico (Estricto, no debe ser nulo en DB)
  const academicCondition = arrayContains(scholarships.academicLevels, [responses.academicLevel]);

  // Condición 5: Filtro de grupos vulnerables/específicos
  // Es general (NULL o vacío) o los grupos de la beca coinciden (se solapan) con los del usuario
  const isGeneralScholarship = or(
    isNull(scholarships.targetGroups),
    sql`cardinality(${scholarships.targetGroups}) = 0`
  );

  let groupsCondition;
  if (responses.groups && responses.groups.length > 0) {
    groupsCondition = or(
      isGeneralScholarship,
      arrayOverlaps(scholarships.targetGroups, responses.groups)
    );
  } else {
    // Si el usuario no pertenece a ningún grupo, solo puede ver becas generales
    groupsCondition = isGeneralScholarship;
  }

  // Cálculo de Ranking Score (Relevancia)
  let groupsScoreSql = sql`0`;
  if (responses.groups && responses.groups.length > 0) {
    groupsScoreSql = sql`(COALESCE(${scholarships.targetGroups} && ARRAY[${sql.join(responses.groups, sql`, `)}]::text[], false)::int * 2)`;
  }

  const matchScoreExpr = sql`
    (COALESCE(${scholarships.targetStates} @> ARRAY[${responses.state}]::text[], false)::int * 3) +
    (COALESCE(${scholarships.academicLevels} @> ARRAY[${responses.academicLevel}]::text[], false)::int * 2) +
    ${groupsScoreSql}
  `;

  // Ordenamiento base: Ranking Score DESC, luego Fecha de creación DESC
  let orderByClause: any[] = [sql`${matchScoreExpr} DESC`, sql`${scholarships.createdAt} DESC`];

  // Si hay un vector de búsqueda, ordenamos por similitud semántica combinada con el score
  if (searchVector && searchVector.length > 0) {
    const vectorString = `[${searchVector.join(',')}]`;
    orderByClause = [
      sql`${matchScoreExpr} DESC`,
      sql`${scholarships.embedding} <=> ${vectorString} ASC`
    ];
  }

  // Ejecutamos la consulta
  const results = await db.select()
    .from(scholarships)
    .where(
      and(
        statusCondition,
        deadlineCondition,
        stateCondition,
        academicCondition,
        groupsCondition
      )
    )
    .orderBy(...orderByClause);

  return results;
}
