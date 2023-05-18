import { AppShell, MantineProvider } from "@mantine/core";
import React from "react";
import AppHeader from "./components/app/AppHeader";
import AppNavigation from "./components/app/AppNavigation";

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
        {/* TODO: Add Children */}
      </AppShell>
    </MantineProvider>
  );
};

export default App;
