import { MantineProvider, Title } from "@mantine/core";
import React from "react";

const App: React.FC = () => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Title>glam-mailer</Title>
    </MantineProvider>
  );
};

export default App;
