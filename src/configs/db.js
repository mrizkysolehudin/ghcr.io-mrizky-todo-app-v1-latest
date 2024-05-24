import { PrismaClient } from '@prisma/client'

// let prisma
// if (process.env.NODE_ENV === 'production') {
//   prisma = new PrismaClient()
// } else {
//   if (!global.cachedPrisma) {
//     global.cachedPrisma = new PrismaClient()
//   }

//   prisma = global.cachedPrisma
// }

// export const db = prisma


const prismaClientSingleton = () => {
  return new PrismaClient()
}

const db = globalThis.prisma ?? prismaClientSingleton()

export default db

if (process.env.NODE_ENV !== "production") globalThis.prisma = db