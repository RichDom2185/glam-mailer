import { Group, Header, Title } from "@mantine/core";
import React from "react";
import { HEADER_HEIGHT } from "../../utils/constants";

const AppHeader: React.FC = () => {
  return (
    <Header height={HEADER_HEIGHT}>
      <Group sx={{ height: "100%" }} px={20} position="apart">
        <Title>glam-mailer</Title>
      </Group>
    </Header>
  );
};

export default AppHeader;
