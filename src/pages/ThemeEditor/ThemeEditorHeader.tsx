import { Card, Group, Text, Title } from "@mantine/core";
import React from "react";
import { HiOutlinePaintBrush } from "react-icons/hi2";

const ThemeEditorHeader: React.FC = () => {
  return (
    <Card shadow="sm" style={{ flexShrink: 0 }}>
      <Title order={2} mb="lg">
        <Group>
          <HiOutlinePaintBrush /> Let us create a theme!
        </Group>
      </Title>
      <Text mb="sm">
        Start by writing your theme following the YAML template below. The
        default theme has been loaded for you. Feel free to customize it, or
        start from a blank slate; your theme will be visible on the right.
      </Text>
      <Text>Documentation for building theme files will be coming soon.</Text>
    </Card>
  );
};

export default ThemeEditorHeader;
