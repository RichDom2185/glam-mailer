import { Card, Group, Text, Title } from "@mantine/core";
import React from "react";
import { HiOutlinePencilSquare } from "react-icons/hi2";

const ComposePageHeader: React.FC = () => {
  return (
    <Card shadow="lg" radius="md">
      <Title order={2} mb="lg">
        <Group>
          <HiOutlinePencilSquare /> Let's create an email!
        </Group>
      </Title>
      <Text mb="sm">
        Simply type your message below. Focus on the content – don't worry about
        styling, glam-mailer takes care of it. You can utilize Markdown to add
        formatting and structure to your message.
      </Text>
      <Text>
        Use the "Load Example" button below to explore the available features.
      </Text>
    </Card>
  );
};

export default ComposePageHeader;
