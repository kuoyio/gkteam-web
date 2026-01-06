import { ReactNode } from "react";
import styles from "../../app/styles.module.scss";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  iconBgColor: string;
  iconTextColor: string;
  position: string;
  animationClass: "float" | "floatDelayed";
}

const FeatureCard = ({
  icon,
  title,
  subtitle,
  iconBgColor,
  iconTextColor,
  position,
  animationClass,
}: FeatureCardProps) => {
  const animationClassName =
    animationClass === "float"
      ? styles.animateFloat
      : styles.animateFloatDelayed;

  return (
    <div
      className={`absolute ${position} z-30 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white hidden sm:block w-[235px] ${animationClassName}`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-full ${iconBgColor} flex items-center justify-center ${iconTextColor} flex-shrink-0`}
        >
          {icon}
        </div>
        <div>
          <div className="text-sm font-bold text-slate-700">{title}</div>
          <div className="text-[11px] text-slate-500 font-medium">
            {subtitle}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
