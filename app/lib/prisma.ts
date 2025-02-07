import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
});

// Ensure connection is reused
const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
};

export const db = globalForPrisma.prisma ?? prisma;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma; 