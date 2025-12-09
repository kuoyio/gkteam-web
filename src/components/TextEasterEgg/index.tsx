"use client";

import { useState } from "react";
import { Typography } from "antd";

const { Text } = Typography;

const TextEasterEgg = () => {
  const easterEggTexts = [
    "扬帆起航⛵⛵️，乘风破浪🌊🌊。",
    "岭南处处是春天，广东时时无闲人 - 天才卷",
    "摒弃埋头几夜可达所欲的妄念，在点滴努力中摆脱匮乏与平庸 - 黑白局",
    "流水不争先，争的是滔滔不绝 - 🐑🐑",
    "更值得遇到和等待的是：更好的自己！🥸 - 发疯叔叔",
    "修心，修性，修行- 锦鲤大王",
    "To be present - 瑞秋",
    "优雅永不过时 - 🌲哥",
    "把期待值降到最低，所有的遇见都是惊喜 - 帅气无敌的k师傅",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [isActivated, setIsActivated] = useState(false);

  const handleClick = () => {
    if (!isActivated) {
      const newClickCount = clickCount + 1;
      setClickCount(newClickCount);

      if (newClickCount >= 10) {
        setIsActivated(true);
      }
    } else {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % easterEggTexts.length);
    }
  };

  return (
    <Text className="text-center text-ant-grey-500" onClick={handleClick}>
      {easterEggTexts[currentIndex]}
    </Text>
  );
};

export default TextEasterEgg;
