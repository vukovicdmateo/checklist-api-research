import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export async function connect() {
  await prisma.$connect();
  console.log('Database connected');
}

export async function disconnect() {
  await prisma.$disconnect();
  console.log('Database disconnected');
}
