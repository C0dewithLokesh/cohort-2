import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updateUser = async (
  username: string,
  updatedObject: {
    firstName: string;
    lastName: string;
  }
) => {
  prisma.user.update({
    where: { email: username },
    data: updatedObject,
  });
};

updateUser("test@gmail.com", {
  firstName: "Lokesh",
  lastName: "Kaushik",
});
