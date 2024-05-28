import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

async function connectDb() {
  try {
    await prisma.$connect();
    console.log("connected to database successfully");
  } catch (err) {
    throw Error(err);
  }
}

export default connectDb;
