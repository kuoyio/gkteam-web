import { Image } from "antd";
import { Shrikhand } from "next/font/google";
import LoginForm from "@/src/app/(auth)/login/components/LoginForm";

const shrikhand = Shrikhand({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function LoginPage() {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center px-4 bg-light-blue/20">
        <div className="flex flex-col justify-center items-center shadow-2xl rounded-b-xl h-[320] w-[400] p-8">
          <div className="flex justify-center items-center gap-x-1">
            <Image
              src={"/logo.png"}
              height={24}
              width={24}
              alt={"logo"}
              preview={false}
            />
            <h1
              className={`text-2xl font-bold text-blue ${shrikhand.className}`}
            >
              GKTeam
            </h1>
          </div>
          <span className="text-sm text-dark-grey mb-10">
            公考备考一站式服务平台
          </span>
          <LoginForm />
        </div>
      </div>
    </>
  );
}
