"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation"; // 使用useSearchParams
import { useVerifyEmail } from "@/hooks/useVerifyEmail";
import { useRouter } from "next/navigation";

const VerifyEmailPage = () => {
  const { verifyEmail } = useVerifyEmail();

  const searchParams = useSearchParams();
  const verifyEmailToken = searchParams.get("verifyEmailToken"); // 獲取 URL 中的 verifyEmailToken
  const router = useRouter();

  useEffect(() => {
    const immediatelyCall = async () => {
      const response = await verifyEmail(verifyEmailToken);
      if (response) {
        router.push("/dashboard");
      }
    };
    immediatelyCall();
  }, []);

  return (
    <div className="flex flex-col items-center gap-16 p-16">
      <h1 className="text-4xl">VerifyEmailPage</h1>
    </div>
  );
};
export default VerifyEmailPage;
