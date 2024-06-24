import { PrismaClient } from "@prisma/client";

const prismaSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaSingleton>;
}
