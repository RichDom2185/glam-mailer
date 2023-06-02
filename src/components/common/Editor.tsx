import React from "react";
import { IAceEditorProps } from "react-ace";

import AceEditor from "react-ace";
import { HEADER_HEIGHT } from "../../utils/constants";

const Editor: React.FC<IAceEditorProps> = (props) => {
  return (
    <AceEditor
      style={{ position: "sticky", top: HEADER_HEIGHT + 16 }}
      setOptions={{ cursorStyle: "smooth" }}
      fontSize={13}
      width="100%"
      wrapEnabled
      {...props}
    />
  );
};

export default Editor;
