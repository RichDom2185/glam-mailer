import {
  AppShell,
  Burger,
  Button,
  CloseButton,
  Group,
  MantineProvider,
  createTheme,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { useDisclosure, useHeadroom } from "@mantine/hooks";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { sendHello } from "./api/general";
import AppHeader from "./components/app/AppHeader";
import AppNavigation from "./components/app/AppNavigation";
import { HEADER_HEIGHT } from "./utils/constants";
import { useSideContent } from "./utils/sideContent";

const theme = createTheme({});

const App: React.FC = () => {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const [sideContentOpened, { close: closeSideContent }] = useDisclosure(true);
  const isPinned = useHeadroom({ fixedAt: 120 });

  useEffect(() => {
    sendHello();
  }, []);

  // TODO: Get this from the store
  const { sideContent: aside } = useSideContent();

  return (
    <MantineProvider theme={theme}>
      <AppShell
        padding="md"
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
        }}
        header={{ height: HEADER_HEIGHT, collapsed: !isPinned }}
        aside={
          aside
            ? {
                width: { lg: 500, xl: 600 },
                breakpoint: "lg",
                collapsed: { desktop: false, mobile: sideContentOpened },
              }
            : undefined
        }
        styles={(theme) => ({
          main: { backgroundColor: theme.colors.gray[0] },
        })}
      >
        <AppShell.Header>
          <Group h="100%" px="md">
            <Burger
              opened={mobileOpened}
              onClick={toggleMobile}
              hiddenFrom="sm"
              size="sm"
            />
            <Burger
              opened={desktopOpened}
              onClick={toggleDesktop}
              visibleFrom="sm"
              size="sm"
            />
            <AppHeader />
          </Group>
        </AppShell.Header>
        <AppNavigation />
        <AppShell.Main>
          <Outlet />
        </AppShell.Main>
        {aside && (
          <AppShell.Aside p="md">
            <Button
              variant="default"
              rightSection={<CloseButton />}
              ml="auto"
              hiddenFrom="lg"
              onClick={closeSideContent}
              aria-label="Close"
            >
              Close
            </Button>
            {aside}
          </AppShell.Aside>
        )}
      </AppShell>
    </MantineProvider>
  );
};

export default App;
