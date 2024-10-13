import bcrypt from "bcryptjs";

export default async function verifyPassword(
  plainTextPassword: string,
  hashedPassword: string
): Promise<void> {
  const isValid = await bcrypt.compare(plainTextPassword, hashedPassword);
  if (!isValid) {
    throw new Error("Invalid credentials."); // 直接拋出錯誤
  }
}
