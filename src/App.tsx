import {
  AppShell,
  Burger,
  Group,
  MantineProvider,
  createTheme,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { useDisclosure } from "@mantine/hooks";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { sendHello } from "./api/general";
import AppHeader from "./components/app/AppHeader";
import AppNavigation from "./components/app/AppNavigation";
import Compose from "./pages/Compose";
import Drafts from "./pages/Drafts";
import HomePage from "./pages/HomePage";
import ThemeEditor from "./pages/ThemeEditor";
import { HEADER_HEIGHT } from "./utils/constants";

const theme = createTheme({});

const App: React.FC = () => {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  useEffect(() => {
    sendHello();
  }, []);

  return (
    <MantineProvider theme={theme}>
      <AppShell
        padding="md"
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
        }}
        header={{ height: HEADER_HEIGHT }}
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
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/compose" element={<Compose />} />
            <Route path="/drafts" element={<Drafts />} />
            <Route path="/edit-theme" element={<ThemeEditor />} />
          </Routes>
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
};

export default App;
