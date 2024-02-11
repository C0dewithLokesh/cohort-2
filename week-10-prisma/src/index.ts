import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function insertUser(
  username: string,
  password: string,
  firstName: string,
  lastName: string
) {
  const res = await prisma.user.create({
    data: {
      email: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
    },
    select: {
      id: true,
    },
  });

  console.log(res);
}

insertUser("test2@gmail.com", "test123", "Test", "Test");
