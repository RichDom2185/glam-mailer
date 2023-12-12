import { AppShell, Box, Text, rem, useMantineTheme } from "@mantine/core";
import React from "react";
import AppSections from "./AppSections";

const AppNavigation: React.FC = () => {
  const theme = useMantineTheme();

  return (
    <AppShell.Navbar p="md">
      <AppShell.Section grow>
        <AppSections />
      </AppShell.Section>
      <AppShell.Section>
        <Box
          style={{
            paddingTop: theme.spacing.sm,
            borderTop: `${rem(1)} solid ${theme.colors.gray[2]}`,
          }}
        >
          <Text size="sm" c="dimmed" ta="center">
            Copyright © 2023 Richard Dominick
          </Text>
        </Box>
      </AppShell.Section>
    </AppShell.Navbar>
  );
};

export default AppNavigation;
