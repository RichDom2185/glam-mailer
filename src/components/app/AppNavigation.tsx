import {
  AppShell,
  Box,
  Button,
  Group,
  Text,
  rem,
  useMantineTheme,
} from "@mantine/core";
import React from "react";
import { RiGithubFill, RiGlobalLine, RiLinkedinBoxFill } from "react-icons/ri";
import { GITHUB_URL, LINKEDIN_URL, WEBSITE_URL } from "../../utils/constants";
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
            paddingBlock: theme.spacing.sm,
            borderTop: `${rem(1)} solid ${theme.colors.gray[2]}`,
          }}
        >
          <Text size="sm" c="dimmed" ta="center">
            Copyright &copy; 2023-2024
            <br />
            Richard Dominick
          </Text>
        </Box>
        <Group justify="center">
          <Button.Group>
            <Button
              component="a"
              target="_blank"
              rel="noopener noreferrer"
              href={GITHUB_URL}
              leftSection={<RiGithubFill />}
              variant="default"
              size="compact-xs"
            >
              GitHub
            </Button>
            <Button
              component="a"
              target="_blank"
              rel="noopener noreferrer"
              href={WEBSITE_URL}
              leftSection={<RiGlobalLine />}
              variant="default"
              size="compact-xs"
            >
              Website
            </Button>
            <Button
              component="a"
              target="_blank"
              rel="noopener noreferrer"
              href={LINKEDIN_URL}
              leftSection={<RiLinkedinBoxFill />}
              variant="default"
              size="compact-xs"
            >
              LinkedIn
            </Button>
          </Button.Group>
        </Group>
      </AppShell.Section>
    </AppShell.Navbar>
  );
};

export default AppNavigation;
