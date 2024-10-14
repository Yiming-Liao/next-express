import bcrypt from "bcryptjs";
import prisma from "@/database/prismaClient.ts";
import HttpError from "@/HttpError.ts";

export default async function createUser(
  username: string,
  email: string,
  password: string
) {
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

    return { user }; // ✔️ 返回使用者資料
  } catch (err) {
    // unique 資料已存在
    if (err.code === "P2002") {
      throw new HttpError("✖️ 使用者已存在，請使用其他電子郵件或用戶名。", 409);
    }
    throw err;
  }
}
