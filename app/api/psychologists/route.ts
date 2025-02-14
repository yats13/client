import { prisma } from '@/prisma/db';
import { NextResponse } from 'next/server';
import type { Psychologist } from '@/app/types/appointment';
import type { ApiResponse } from '@/app/types/api';

export async function GET(): Promise<NextResponse<ApiResponse<Psychologist[]>>> {
  try {
    const psychologists = await prisma.psychologist.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json({
      data: psychologists,
      status: 200,
    });
  } catch (error) {
    console.error('Error fetching psychologists:', error);
    return NextResponse.json(
      { 
        error: 'Не удалось загрузить список психологов',
        status: 500,
      },
      { status: 500 },
    );
  }
}
