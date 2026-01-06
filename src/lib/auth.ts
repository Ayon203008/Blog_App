import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "../../generated/prisma/client";
import { prisma } from "./prisma";
import nodemailer from "nodemailer";


// ! This is from nodemalier , copy it from node mailer a

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // ! add new host here smtp.gmail.com
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: process.env.app_name, // # get them from google account center 
    pass: process.env.password,
  },
});


// # import prisma from prisma.ts and also set provider postgresql

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  trustedOrigins: [process.env.APP_URL!], // ! add trusted origin to the project
  // * add additional information to the better auth
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "USER",
        required: false
      },
      phone: {
        type: "string",
        required: false,
      },
      status: {
        type: "string",
        defaultValue: "ACTIVE",
        required: false
      }
    }
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true
    // * autoSignIn and Email varification added successfully
  },
  emailVerification: {
    sendOnSignUp: true,  // ! add this 2 line in your code 
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }, request) => { // ! copy this dummy data from node mailer
      try {
        const verificationUrl = `${process.env.APP_URL}/verify-email?token=${token}` // * add verfication url 

        console.log("Verfication email send successfully")
        const info = await transporter.sendMail({
          from: '"Maddison Foo Koch" <abidayon.tech@gmail.com>',
          to: "paypal572874@gmail.com",
          subject: "Hello ✔",
          text: "Hello world?", // Plain-text version of the message
          html: "<b>Hello world?</b>", // HTML version of the message
        })
      } catch (err) {
        console.log(err)
      }
    }
    // # added email verification mechanism 
  },
  socialProviders: {
    google: {
      prompt: "select_account consent",
      accessType: "offline",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});