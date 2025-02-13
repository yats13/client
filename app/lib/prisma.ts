import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
});

// Ensure connection is reused
const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
};

if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = prismaClientSingleton;
}

export const prisma = globalForPrisma.prisma;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prismaClientSingleton;