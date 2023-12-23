import { Prisma, PrismaClient } from "@prisma/client"

export const db = new PrismaClient({
    log: ["info", "error"]
})