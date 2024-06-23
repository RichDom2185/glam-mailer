import { Card, Text } from "@mantine/core";
import React from "react";

type Props = {
  content: React.ReactNode;
};

const Tag: React.FC<Props> = ({ content }) => {
  return (
    <Card w="max-content" shadow="sm" p="sm">
      <Text
        // FIXME: Remove hardcoding of Tailwind prefix
        className="!tw-text-slate-700"
      >
        {content}
      </Text>
    </Card>
  );
};

export default Tag;
