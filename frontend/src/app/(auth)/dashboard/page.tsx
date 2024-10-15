"use client";

import { useAxios } from "@/contexts/AxiosContext";
import { FormEventHandler } from "react";

const DashboardPage = () => {
  const axios = useAxios(); // 獲取 Axios 實例
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    await axios.get("/user");
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
