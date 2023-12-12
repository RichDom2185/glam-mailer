import { Card, Group, Text, Title } from "@mantine/core";
import React from "react";
import { HiOutlinePencilSquare } from "react-icons/hi2";

const ComposePageHeader: React.FC = () => {
  return (
    <Card shadow="lg">
      <Title order={2} mb="lg">
        <Group>
          <HiOutlinePencilSquare /> Let's create an email!
        </Group>
      </Title>
      <Text mb="sm">
        Simply type your message below. Focus on the content – don't worry about
        styling, we will theme it. You can utilize Markdown to add formatting
        and structure to your message.
      </Text>
      <Text>Unsure of what's supported? Load the example below!</Text>
    </Card>
  );
};

export default ComposePageHeader;
