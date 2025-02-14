'use server';

import { prisma } from '@/prisma/db';
import type { Psychologist } from '@prisma/client';
import { ERRORS } from '../constants/errors';

export async function getPsychologist(): Promise<Psychologist[] | null> {
    try {
        return await prisma.psychologist.findMany();
    } catch (error) {
        console.error("Error fetching psychologists:", error);
        throw new Error(ERRORS.FETCH.PSYCHOLOGISTS);
    }
}