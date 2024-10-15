"use client";

import { FormEventHandler, useState } from "react";
import { useSearchParams } from "next/navigation"; // 使用useSearchParams
import { useResetPassword } from "@/hooks/useResetPassword";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { resetPassword } = useResetPassword();

  const searchParams = useSearchParams();
  const resetPasswordToken = searchParams.get("resetPasswordToken"); // 獲取 URL 中的 resetPasswordToken

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    await resetPassword(resetPasswordToken, password, confirmPassword);
  };

  return (
    <div className="flex flex-col items-center gap-16 p-16">
      <h1 className="text-4xl">ResetPasswordPage</h1>

      {/* form */}
      <form onSubmit={handleSubmit} className="w-96 flex flex-col gap-4 ">
        {/* password */}
        <div className="flex flex-col gap-1">
          <label htmlFor="">password</label>
          <input
            type="password"
            className="border-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {/* confirmPassword */}
        <div className="flex flex-col gap-1">
          <label htmlFor="">confirmPassword</label>
          <input
            type="password"
            className="border-2"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button>Submit</button>
      </form>
    </div>
  );
};
export default ResetPasswordPage;
