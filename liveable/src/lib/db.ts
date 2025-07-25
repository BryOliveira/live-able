import { PrismaClient } from '@prisma/client';

/**
 * A global variable used to store a singleton instance of `PrismaClient` on the `globalThis` object.
 * This pattern helps to prevent multiple instances of Prisma Client from being created during development,
 * especially when using hot-reloading in frameworks like Next.js.
 *
 * @remarks
 * The type assertion ensures that `globalThis` has a `prisma` property of type `PrismaClient`.
 */
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

/**
 * Singleton instance of the PrismaClient.
 * Reuses the existing PrismaClient instance from the global scope if available,
 * otherwise creates a new instance. This approach helps to prevent multiple
 * PrismaClient instances in development environments with hot-reloading.
 */
const prisma =
  globalForPrisma.prisma || new PrismaClient();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;