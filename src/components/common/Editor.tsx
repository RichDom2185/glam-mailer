import React from "react";
import { IAceEditorProps } from "react-ace";

import AceEditor from "react-ace";

const Editor: React.FC<IAceEditorProps> = (props) => {
  return (
    <AceEditor
      setOptions={{ cursorStyle: "smooth" }}
      fontSize={13}
      width="100%"
      wrapEnabled
      {...props}
    />
  );
};

export default Editor;
