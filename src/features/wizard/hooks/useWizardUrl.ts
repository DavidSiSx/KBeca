import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback } from 'react';

export function useWizardUrl() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const getParam = useCallback((key: string) => searchParams.get(key), [searchParams]);
  const getAllParams = useCallback((key: string) => searchParams.getAll(key), [searchParams]);

  const setParam = useCallback((key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === null) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, [searchParams, pathname, router]);

  const setParams = useCallback((updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value === null) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, [searchParams, pathname, router]);
  
  const setArrayParam = useCallback((key: string, values: string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    values.forEach(v => params.append(key, v));
    router.replace(`${pathname}?${params.toString()}`);
  }, [searchParams, pathname, router]);

  // Derivar estados directamente de la URL
  const step = parseInt(getParam('step') || '1', 10);
  const target = getParam('target') as 'myself' | 'child' | 'other' | null;
  const estado = getParam('state');
  const nivelAcademico = getParam('level');
  const gender = getParam('gender') as 'Femenino' | 'Masculino' | 'Otro' | null;
  const age = getParam('age') ? parseInt(getParam('age')!) : null;
  const hasChildren = getParam('hasChildren') === 'true' ? true : getParam('hasChildren') === 'false' ? false : null;
  const isPregnant = getParam('isPregnant') === 'true' ? true : getParam('isPregnant') === 'false' ? false : null;
  const groups = getAllParams('groups');

  const nextStep = useCallback(() => {
    setParam('step', (step + 1).toString());
  }, [step, setParam]);

  const prevStep = useCallback(() => {
    setParam('step', Math.max(1, step - 1).toString());
  }, [step, setParam]);

  const setTarget = (val: 'myself' | 'child' | 'other') => setParam('target', val);
  const setEstado = (val: string) => setParam('state', val);
  const setNivelAcademico = (val: string) => setParam('level', val);
  const setGender = (val: 'Femenino' | 'Masculino' | 'Otro') => {
    setParams({
      gender: val,
      isPregnant: val !== 'Femenino' ? null : (isPregnant !== null ? isPregnant.toString() : null)
    });
  };
  const setAge = (val: number) => setParam('age', val.toString());
  const setHasChildren = (val: boolean) => setParam('hasChildren', val.toString());
  const setIsPregnant = (val: boolean) => setParam('isPregnant', val.toString());
  const setGroups = (val: string[]) => setArrayParam('groups', val);

  const reset = useCallback(() => {
    router.replace(pathname);
  }, [pathname, router]);

  return {
    step, target, estado, nivelAcademico, gender, age, hasChildren, isPregnant, groups,
    nextStep, prevStep, setTarget, setEstado, setNivelAcademico, setGender, setAge, setHasChildren, setIsPregnant, setGroups, reset
  };
}
