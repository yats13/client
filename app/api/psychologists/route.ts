import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function GET() {
    try {
        const psychologists = await prisma.psychologist.findMany({
            select: {
                slug: true,
                name: true,
            },
            orderBy: {
                name: 'asc',
            },
        });

        return NextResponse.json(psychologists);
    } catch (error) {
        console.error('Error fetching psychologists:', error);
        return NextResponse.json(
            { error: 'Failed to fetch psychologists' },
            { status: 500 }
        );
    }
}
