import { AppShell, MantineProvider } from "@mantine/core";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { sendHello } from "./api/general";
import AppHeader from "./components/app/AppHeader";
import AppNavigation from "./components/app/AppNavigation";
import Compose from "./pages/Compose";
import Drafts from "./pages/Drafts";
import HomePage from "./pages/HomePage";
import ThemeEditor from "./pages/ThemeEditor";

const App: React.FC = () => {
  useEffect(() => {
    sendHello();
  }, []);

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <AppShell
        padding="md"
        fixed
        navbar={<AppNavigation />}
        header={<AppHeader />}
        styles={(theme) => ({
          main: { backgroundColor: theme.colors.gray[0] },
        })}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/compose" element={<Compose />} />
          <Route path="/drafts" element={<Drafts />} />
          <Route path="/edit-theme" element={<ThemeEditor />} />
        </Routes>
      </AppShell>
    </MantineProvider>
  );
};

export default App;
