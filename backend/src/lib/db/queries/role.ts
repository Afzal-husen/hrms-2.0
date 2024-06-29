import prisma from "../../utils/prisma-client.js";

type RoleType = {
  name: string;
  email: string;
  password: string;
  permissions: string[];
  user_id: string;
};

export const create = async ({
  email,
  name,
  password,
  permissions,
  user_id,
}: RoleType) => {
  return await prisma.roles.create({
    data: {
      name,
      email,
      password,
      permissions,
      user_id,
    },
  });
};
