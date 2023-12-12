import { Title } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";

const AppHeader: React.FC = () => {
  return (
    <Link
      to="/"
      // FIXME: Remove hardcoding of Tailwind prefix
      className="tw-no-underline hover:tw-underline tw-text-black"
    >
      <Title>glam-mailer</Title>
    </Link>
  );
};

export default AppHeader;
