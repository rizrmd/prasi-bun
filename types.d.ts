import { PrismaClient } from "./app/db/db";

declare global {
  const db: PrismaClient;
}

declare module "@surfy/multipart-parser";
