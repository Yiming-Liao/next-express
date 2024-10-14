"use client";

import { useLogout } from "@/hooks/useLogout";
import { FormEventHandler } from "react";

const LogoutPage = () => {
  const { logout } = useLogout();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    await logout();
  };

  return (
    <div className="flex flex-col items-center gap-16 p-16">
      <h1 className="text-4xl">LogoutPage</h1>

      {/* form */}
      <form onSubmit={handleSubmit} className="w-96 flex flex-col gap-4 ">
        <button>Logout</button>
      </form>
    </div>
  );
};
export default LogoutPage;
