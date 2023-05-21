import { AppShell, MantineProvider } from "@mantine/core";
import React from "react";
import { Route, Routes } from "react-router-dom";
import AppHeader from "./components/app/AppHeader";
import AppNavigation from "./components/app/AppNavigation";
import Compose from "./pages/Compose";
import Drafts from "./pages/Drafts";

const App: React.FC = () => {
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
          <Route path="/compose" element={<Compose />} />
          <Route path="/drafts" element={<Drafts />} />
        </Routes>
      </AppShell>
    </MantineProvider>
  );
};

export default App;
