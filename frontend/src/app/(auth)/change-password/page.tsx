"use client";

import { FormEventHandler, useState } from "react";

const ChangePasswordPage = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    // const response = await axios.post("/api/auth/change-password", {
    //   oldPassword,
    //   password,
    //   confirmPassword,
    // });
  };

  return (
    <div className="flex flex-col items-center gap-16 p-16">
      <h1 className="text-4xl">ChangePasswordPage</h1>

      {/* form */}
      <form onSubmit={handleSubmit} className="w-96 flex flex-col gap-4 ">
        {/* oldPassword */}
        <div className="flex flex-col gap-1">
          <label htmlFor="">oldPassword</label>
          <input
            type="password"
            className="border-2"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
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
export default ChangePasswordPage;
