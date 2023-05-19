import { AppShell, MantineProvider } from "@mantine/core";
import React from "react";
import { Route, Routes } from "react-router-dom";
import AppHeader from "./components/app/AppHeader";
import AppNavigation from "./components/app/AppNavigation";
import Compose from "./pages/Compose";
import Drafts from "./pages/Drafts";
import ThemeEditor from "./pages/ThemeEditor";

const App: React.FC = () => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <AppShell
        padding="md"
        fixed={false}
        navbar={<AppNavigation />}
        header={<AppHeader />}
        styles={(theme) => ({
          main: { backgroundColor: theme.colors.gray[0] },
        })}
      >
        <Routes>
          <Route path="/compose" element={<Compose />} />
          <Route path="/drafts" element={<Drafts />} />
          <Route path="/edit-theme" element={<ThemeEditor />} />
        </Routes>
      </AppShell>
    </MantineProvider>
  );
};

export default App;
