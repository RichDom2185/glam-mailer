import { AppShell, Box, Text, rem, useMantineTheme } from "@mantine/core";
import React from "react";
import AppSections from "./AppSections";

type Props = {
  handleCloseDrawer?: () => void;
};

const AppNavigation: React.FC<Props> = ({ handleCloseDrawer }) => {
  const theme = useMantineTheme();

  return (
    <AppShell.Navbar p="md">
      <AppShell.Section grow>
        <AppSections handleClick={handleCloseDrawer} />
      </AppShell.Section>
      <AppShell.Section>
        <Box
          style={{
            paddingTop: theme.spacing.sm,
            borderTop: `${rem(1)} solid ${theme.colors.gray[2]}`,
          }}
        >
          <Text size="sm" c="dimmed" ta="center">
            Copyright &copy; 2023-2024
            <br />
            Richard Dominick
          </Text>
        </Box>
      </AppShell.Section>
    </AppShell.Navbar>
  );
};

export default AppNavigation;
