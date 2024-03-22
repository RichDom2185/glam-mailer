import {
  AppShell,
  Burger,
  Group,
  MantineProvider,
  createTheme,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { useDisclosure, useHeadroom } from "@mantine/hooks";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { sendHello } from "./api/general";
import AppHeader from "./components/app/AppHeader";
import AppNavigation from "./components/app/AppNavigation";
import { HEADER_HEIGHT } from "./utils/constants";

const theme = createTheme({
  defaultRadius: "md",
});

const App: React.FC = () => {
  const [mobileOpened, { toggle: toggleMobile, close: closeMobile }] =
    useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const isPinned = useHeadroom({ fixedAt: 120 });

  useEffect(() => {
    sendHello();
  }, []);

  return (
    <MantineProvider theme={theme}>
      <Notifications />
      <AppShell
        padding="md"
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
        }}
        header={{ height: HEADER_HEIGHT, collapsed: !isPinned }}
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
        <AppNavigation handleCloseDrawer={closeMobile} />
        <AppShell.Main>
          <Outlet />
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
};

export default App;
