"use client";

import { FormEventHandler, useState } from "react";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    // const response = await axios.post("/api/auth/register", {
    //   username,
    //   email,
    //   password,
    //   confirmPassword,
    // });

    // console.log(response);
  };

  return (
    <div className="flex flex-col items-center gap-16 p-16">
      <h1 className="text-4xl">RegisterPage</h1>

      {/* form */}
      <form onSubmit={handleSubmit} className="w-96 flex flex-col gap-4 ">
        {/* username */}
        <div className="flex flex-col gap-1">
          <label htmlFor="">Username</label>
          <input
            type="text"
            className="border-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

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

        {/* confirm password */}
        <div className="flex flex-col gap-1">
          <label htmlFor="">confirm password</label>
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
export default RegisterPage;
