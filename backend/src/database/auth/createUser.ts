import bcrypt from "bcryptjs";
import prisma from "@/services/prismaClient.ts";

export const createUser = async (
  username: string,
  email: string,
  password: string
) => {
  // 將密碼加密
  const hashedPassword = await bcrypt.hash(password, 10);

  // 建立一筆新的使用者資料
  try {
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    return { user }; // ✔️ 返回使用者資料和 error 設為 null
  } catch (error) {
    throw error; // ✖️ 讓 middleware 捕獲
  }
};
