"use client";

import { FormEventHandler, useState } from "react";
import { useLogin } from "@/hooks/useLogin";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useLogin();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    await login(email, password);
  };

  return (
    <div className="flex flex-col items-center gap-16 p-16">
      <h1 className="text-4xl">LoginPage</h1>

      {/* form */}
      <form onSubmit={handleSubmit} className="w-96 flex flex-col gap-4 ">
        {/* email */}
        <div className="flex flex-col gap-1">
          <label htmlFor="">email</label>
          <input
            type="email"
            className="border-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

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

        <button>Submit</button>
      </form>
    </div>
  );
};
export default LoginPage;
