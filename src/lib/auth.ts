import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "../../generated/prisma/client";
import { prisma } from "./prisma";
// If your Prisma file is located elsewhere, you can change the path



// # import prisma from prisma.ts and also set provider postgresql

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
     emailAndPassword: { 
    enabled: true,  // * copy this 2 line from betther auth email password
  }, 
});