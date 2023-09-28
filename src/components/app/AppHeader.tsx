import { AppShell, Group, Title } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";

const AppHeader: React.FC = () => {
  return (
    <AppShell.Header>
      <Group style={{ height: "100%" }} px={20} justify="space-between">
        <Link
          to="/"
          // FIXME: Remove hardcoding of Tailwind prefix
          className="tw-no-underline hover:tw-underline tw-text-black"
        >
          <Title>glam-mailer</Title>
        </Link>
      </Group>
    </AppShell.Header>
  );
};

export default AppHeader;
