import prisma from "../../utils/prisma-client.js";

export const create = async ({
  name,
  user_id,
}: {
  name: string;
  user_id: string;
}) => {
  return await prisma.branches.create({
    data: {
      name,
      user_id,
    },
  });
};
