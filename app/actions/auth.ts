'use server';

import { hashPassword } from './password';
import { prisma } from '@/app/lib/prisma';

export async function createUser(email: string, phone: string, password: string) {
  try {
    const hashResult = await hashPassword(password);
    if (!hashResult.success) {
      throw new Error(hashResult.error);
    }

    const user = await prisma.user.create({
      data: {
        email,
        phone,
        password: hashResult.hashedPassword!
      }
    });

    return { 
      success: true, 
      user: {
        id: user.id,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    };
  } catch (error) {
    console.error('Error creating user:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to create user' 
    };
  }
} 