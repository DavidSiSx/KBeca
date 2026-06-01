import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const secret = authHeader?.split('Bearer ')[1];
  
  if (!process.env.REVALIDATION_SECRET || secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: 'Acceso no autorizado' }, { status: 401 });
  }

  try {
    // @ts-ignore - Evita falsos positivos de TypeScript en Next.js 16 experimental
    revalidateTag('scholarships');
    return NextResponse.json({ revalidated: true, now: Date.now(), message: "Caché de becas invalidado exitosamente" });
  } catch (err) {
    return NextResponse.json({ revalidated: false, message: 'Error invalidando caché' }, { status: 500 });
  }
}
