export const env = {
    database: {
        url: process.env.DATABASE_URL,
    }
} as const;

export type Env = typeof env;

// Validate required environment variables
export function validateEnv() {
    const required = [
        'DATABASE_URL',
    ];

    const missing = required.filter(key => !process.env[key]);

    if (missing.length > 0) {
        throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
}