import HttpError from "#/HttpError.ts";
import bcrypt from "bcryptjs";

export default async function verifyPassword(
  plainTextPassword: string,
  hashedPassword: string
): Promise<void> {
  const isValid = await bcrypt.compare(plainTextPassword, hashedPassword);
  if (!isValid) {
    throw new HttpError("密碼錯誤", 401);
  }
}
