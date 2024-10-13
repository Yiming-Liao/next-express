import prisma from "@/services/prismaClient.ts";

export const findUser = async (email: string) => {
  // 搜尋一筆的使用者資料
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    return { user }; // ✔️ 返回使用者資料和 error 設為 null
  } catch (error) {
    throw error; // ✖️ 讓 middleware 捕獲
  }
};
