import { PrismaClient } from "./app/db/db";

declare global {
  const db: PrismaClient;
}
