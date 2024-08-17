import { Card } from "@mantine/core";
import { useHeadroom } from "@mantine/hooks";
import React from "react";
import { HEADER_HEIGHT } from "../../utils/constants";

type Props = {
  width?: React.CSSProperties["width"];
  children: React.ReactNode;
};

const StickyToolbar: React.FC<Props> = ({ children, width }) => {
  const isHeaderOpen = useHeadroom({ fixedAt: 120 });

  return (
    <div
      style={{
        position: "sticky",
        top: isHeaderOpen ? HEADER_HEIGHT + 16 : 16,
        zIndex: 10,
        width,
      }}
    >
      <Card shadow="sm" p="xs" my="sm">
        {children}
      </Card>
    </div>
  );
};

export default StickyToolbar;
