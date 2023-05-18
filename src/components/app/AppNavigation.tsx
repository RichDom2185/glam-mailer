import { Box, Navbar, Text, rem, useMantineTheme } from "@mantine/core";
import React from "react";
import AppSections from "./AppSections";

const AppNavigation: React.FC = () => {
  const theme = useMantineTheme();

  return (
    <Navbar width={{ base: 300 }} p="xs">
      <Navbar.Section grow mt="xs">
        <AppSections />
      </Navbar.Section>
      <Navbar.Section>
        <Box
          sx={{
            paddingTop: theme.spacing.sm,
            borderTop: `${rem(1)} solid ${theme.colors.gray[2]}`,
          }}
        >
          <Text size="sm" c="dimmed" align="center">
            Copyright © 2023 Richard Dominick
          </Text>
        </Box>
      </Navbar.Section>
    </Navbar>
  );
};

export default AppNavigation;
