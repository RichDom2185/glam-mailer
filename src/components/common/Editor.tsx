import { useMantineTheme } from "@mantine/core";
import React from "react";
import AceEditor, { IAceEditorProps } from "react-ace";

import "ace-builds/esm-resolver";

const Editor: React.FC<IAceEditorProps> = (props) => {
  const theme = useMantineTheme();

  return (
    <AceEditor
      style={{ fontFamily: theme.fontFamilyMonospace }}
      theme="tomorrow"
      setOptions={{ cursorStyle: "smooth" }}
      fontSize={theme.fontSizes.md}
      width="100%"
      height="100%"
      wrapEnabled
      {...props}
    />
  );
};

export default Editor;
