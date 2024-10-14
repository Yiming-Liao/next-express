import HttpError from "@/HttpError.ts";
import prisma from "@/database/prismaClient.ts";

export default async function findUser(email: string) {
  // 搜尋一筆的使用者資料
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) throw new HttpError("沒有該筆 email 資料", 404);

    return user; // ✔️ 返回使用者資料
  } catch (err) {
    throw err;
  }
}
