import { Group, Header, Title } from "@mantine/core";
import React from "react";

const AppHeader: React.FC = () => {
  return (
    <Header height={60}>
      <Group sx={{ height: "100%" }} px={20} position="apart">
        <Title>glam-mailer</Title>
      </Group>
    </Header>
  );
};

export default AppHeader;
