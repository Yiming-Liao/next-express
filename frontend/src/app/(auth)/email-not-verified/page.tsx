"use client";

import { FormEventHandler } from "react";

import { useAxios } from "@/contexts/AxiosContext";

const EmailNotVerifiedPage = () => {
  const axios = useAxios(); // 獲取 Axios 實例

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    await axios.post("/auth/resend-verification-email");
  };

  return (
    <div className="flex flex-col items-center gap-16 p-16">
      <h1 className="text-4xl">EmailNotVerifiedPage</h1>

      {/* form */}
      <form onSubmit={handleSubmit} className="w-96 flex flex-col gap-4 ">
        <h1>Send Again</h1>
        <button>Resend Verification Email</button>
      </form>
    </div>
  );
};
export default EmailNotVerifiedPage;
