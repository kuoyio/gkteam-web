import { useState, useEffect } from "react";

export enum ScreenType {
  MOBILE = "mobile",
  PAD = "pad",
  PC = "pc",
}

export interface Screen {
  type: ScreenType;
  isMobile: boolean;
  isPad: boolean;
  isPc: boolean;
}

const BREAKPOINTS = {
  mobile: 576,
  pad: 1200,
} as const;

const getScreenType = (width: number): ScreenType => {
  if (width < BREAKPOINTS.mobile) return ScreenType.MOBILE;
  if (width < BREAKPOINTS.pad) return ScreenType.PAD;
  return ScreenType.PC;
};

const createScreen = (width: number): Screen => {
  const type = getScreenType(width);
  return {
    type,
    isMobile: type === ScreenType.MOBILE,
    isPad: type === ScreenType.PAD,
    isPc: type === ScreenType.PC,
  };
};

const useScreen = (): Screen => {
  const [screen, setScreen] = useState<Screen>(() =>
    createScreen(window.innerWidth),
  );

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(
        () => setScreen(createScreen(window.innerWidth)),
        100,
      );
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return screen;
};

export default useScreen;
