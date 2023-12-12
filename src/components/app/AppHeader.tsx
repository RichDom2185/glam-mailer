import { Image, Title } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";

const AppHeader: React.FC = () => {
  return (
    <Link
      to="/"
      // FIXME: Remove hardcoding of Tailwind prefix
      className="tw-no-underline tw-text-gray-800 hover:tw-text-blue-700"
    >
      <Title order={2}>
        <Image
          src="/mail.png"
          w="xl"
          mr="xs"
          display="inline"
          style={{ verticalAlign: "-0.25em" }}
        />
        glam-mailer
      </Title>
    </Link>
  );
};

export default AppHeader;
