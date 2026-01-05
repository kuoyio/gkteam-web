import Image from "next/image";
import {
  ThunderboltOutlined,
  EditOutlined,
  MessageOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import FeatureCard from "../FeatureCard";
import styles from "../../app/styles.module.scss";

interface VisualSectionProps {
  communityCount: number;
}

const VisualSection = ({ communityCount }: VisualSectionProps) => {
  return (
    <div className="flex-1 relative w-full max-w-[600px] aspect-square lg:max-w-none">
      <div className="relative w-full h-full flex items-center justify-center">
        <div
          className={`relative z-20 w-32 h-32 sm:w-48 sm:h-48 bg-white rounded-[40px] shadow-2xl flex items-center justify-center p-8 ${styles.animateFloat}`}
        >
          <Image
            src="/logo.png"
            alt="GKTeam Logo"
            width={120}
            height={120}
            className="w-full h-full object-contain"
          />
        </div>

        <FeatureCard
          icon={<ThunderboltOutlined />}
          title="行测训练"
          subtitle="从看题就困😴 到露头就秒💥"
          iconBgColor="bg-orange-100"
          iconTextColor="text-orange-500"
          position="top-[5%] left-[0%]"
          animationClass="floatDelayed"
        />

        <FeatureCard
          icon={<EditOutlined />}
          title="申论读写"
          subtitle="从憋不出字😫 到下笔如神🖋️"
          iconBgColor="bg-blue-100"
          iconTextColor="text-blue-500"
          position="top-[15%] right-[-5%]"
          animationClass="float"
        />

        <FeatureCard
          icon={<MessageOutlined />}
          title="面试练习"
          subtitle="从张口结舌😶 到侃侃而谈🎤"
          iconBgColor="bg-purple-100"
          iconTextColor="text-purple-500"
          position="bottom-[20%] left-[-5%]"
          animationClass="floatDelayed"
        />

        <FeatureCard
          icon={<TeamOutlined />}
          title="社区人数"
          subtitle={`已有 ${communityCount.toLocaleString()} 人加入社区`}
          iconBgColor="bg-green-100"
          iconTextColor="text-green-500"
          position="bottom-[10%] right-[0%]"
          animationClass="float"
        />

        <div
          className={`absolute inset-0 border-[40px] border-ant-blue-50/50 rounded-full ${styles.animateSpinSlow}`}
        />
      </div>
    </div>
  );
};

export default VisualSection;
