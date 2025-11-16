import { Image } from "antd";
import Link from "next/link";
import { Shrikhand } from "next/font/google";

const shrikhand = Shrikhand({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const Logo = () => {
  return (
    <Link className="flex justify-center items-center gap-x-1" href="/">
      <Image
        src={"/logo.png"}
        height={24}
        width={24}
        alt={"logo"}
        preview={false}
      />
      <h1 className={`text-2xl font-bold text-blue ${shrikhand.className}`}>
        GKTeam
      </h1>
    </Link>
  );
};

export default Logo;
