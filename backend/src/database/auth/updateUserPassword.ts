import bcrypt from "bcryptjs";
import prisma from "@/database/prismaClient.ts"; // 假設使用 Prisma

export default async function updateUserPassword(
  email: string,
  password: string
) {
  // 將密碼加密
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.update({
      where: { email },
      data: { password: hashedPassword }, // 更新密碼
    });
    return user;
  } catch (err) {
    throw err;
  }
}
