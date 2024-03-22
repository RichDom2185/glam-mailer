import { useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

export const useResponsive = () => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md}`);
  const isDesktop = useMediaQuery(`(min-width: ${theme.breakpoints.md}`);
  return { isMobile, isDesktop };
};
