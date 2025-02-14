'use server';

import { hash, compare } from 'bcryptjs';

export async function hashPassword(password: string): Promise<{ 
  success: boolean; 
  hashedPassword?: string; 
  error?: string; 
}> {
  try {
    const hashedPassword = await hash(password, 12);
    return { success: true, hashedPassword };
  } catch (error) {
    console.error('Error hashing password:', error);
    return { success: false, error: 'Failed to hash password' };
  }
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<{
  success: boolean;
  isValid?: boolean;
  error?: string;
}> {
  try {
    const isValid = await compare(password, hashedPassword);
    return { success: true, isValid };
  } catch (error) {
    console.error('Error verifying password:', error);
    return { success: false, error: 'Failed to verify password' };
  }
} 