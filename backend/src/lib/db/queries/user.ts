import prisma from "../../utils/prisma-client.js";
import { UserData } from "../../types/user.js";

export const createUser = async (userData: UserData) => {
  await prisma.users.create({
    data: userData,
  });
};

export const findUserWithEmail = async (email: string) => {
  const user = await prisma.users.findFirst({
    where: { email },
  });
  if (!user) return null;
  return user;
};
