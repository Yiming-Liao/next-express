"use client";

import axios from "@/services/axios";
import { FormEventHandler } from "react";

const DashboardPage = () => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const response = await axios.get("/api/auth/user");
    if (response) console.log(response);
  };

  return (
    <div className="flex flex-col items-center gap-16 p-16">
      <h1 className="text-4xl">DashboardPage</h1>

      {/* form */}
      <form onSubmit={handleSubmit} className="w-96 flex flex-col gap-4 ">
        <button>Submit</button>
      </form>
    </div>
  );
};
export default DashboardPage;
