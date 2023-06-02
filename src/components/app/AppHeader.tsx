import { Group, Header, Title } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
import { HEADER_HEIGHT } from "../../utils/constants";

const AppHeader: React.FC = () => {
  return (
    <Header height={HEADER_HEIGHT}>
      <Group sx={{ height: "100%" }} px={20} position="apart">
        <Link
          to="/"
          // FIXME: Remove hardcoding of Tailwind prefix
          className="tw-no-underline hover:tw-underline tw-text-black"
        >
          <Title>glam-mailer</Title>
        </Link>
      </Group>
    </Header>
  );
};

export default AppHeader;
