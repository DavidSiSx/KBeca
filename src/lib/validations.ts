import { z } from 'zod';

export const UserFormSchema = z.object({
  state: z.string(),
  academicLevel: z.string(),
  groups: z.array(z.string()),
  gender: z.enum(['Femenino', 'Masculino', 'Otro'], {
    message: 'El género proporcionado no es válido.'
  }),
  age: z.number().int().min(1).max(120),
  hasChildren: z.boolean(),
  isPregnant: z.boolean(),
}).superRefine((data, ctx) => {
  if (data.groups.includes('Madres o padres solteros')) {
    if (data.gender !== 'Femenino' && data.gender !== 'Masculino') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Debe especificar un género válido para aplicar al programa de madres o padres solteros.',
        path: ['gender'],
      });
    }
    if (!data.hasChildren) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Debe tener hijos para aplicar al programa de madres o padres solteros.',
        path: ['hasChildren'],
      });
    }
  }

  if (data.groups.includes('Embarazadas')) {
    if (data.gender !== 'Femenino') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'El programa para mujeres embarazadas es exclusivo para perfiles femeninos.',
        path: ['gender'],
      });
    }
    if (!data.isPregnant) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Debe estar embarazada para aplicar a este programa.',
        path: ['isPregnant'],
      });
    }
  }

  if (data.groups.includes('Adultos mayores') && data.age < 60) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Debe tener al menos 60 años para aplicar a programas de adultos mayores.',
      path: ['age'],
    });
  }

  if (data.academicLevel === 'Básica' && data.age > 18) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Usualmente la educación básica aplica para menores de 18 años.',
      path: ['age'],
    });
  }
});

export type UserFormResponses = z.infer<typeof UserFormSchema>;
