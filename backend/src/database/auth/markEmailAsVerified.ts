import HttpError from "@/HttpError.ts";
import prisma from "@/database/prismaClient.ts";

export default async function markEmailAsVerified(email: string): Promise<{
  email: string;
  username: string;
  isEmailVerified: boolean;
}> {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) throw new HttpError("沒有該筆 email 資料", 404);

    // 更新使用者的 isEmailVerified 狀態
    const updatedUser = await prisma.user.update({
      where: { email },
      data: { isEmailVerified: true },
    });

    return updatedUser;
  } catch (err) {
    throw err;
  }
}
