import { useWindowSize } from "./use-window-size";

const BREAKPOINTS = { mobile: 768, tablet: 1024 } as const;

export function useDevice() {
  const width = useWindowSize();
  return {
    isMobile: width < BREAKPOINTS.mobile,
    isTablet: width >= BREAKPOINTS.mobile && width < BREAKPOINTS.tablet,
    isDesktop: width >= BREAKPOINTS.tablet,
  };
}
