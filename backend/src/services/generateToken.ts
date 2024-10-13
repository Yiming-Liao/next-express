import jwt from "jsonwebtoken";
import { authConfig } from "@/config/auth.ts";

export default function generateToken(user: {
  email: string;
  username: string;
}): string {
  return jwt.sign(
    { email: user.email, username: user.username }, // payload
    authConfig.JWT_SECRET, // secret
    { expiresIn: "1h" } // options
  );
}
