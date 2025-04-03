import React, { useEffect, useMemo, useState } from "react";
import { Theme } from "../../types/theme";
import { buildRenderPipeline } from "../../utils/markdown";
import { getClassMappingFrom } from "../../utils/theme";

type Props = {
  theme?: Theme;
  containerRef?: React.RefObject<HTMLDivElement | null>;
  children: string;
};

const Markdown: React.FC<Props> = ({ theme, containerRef, children }) => {
  const [classesToAdd, setClassesToAdd] = useState<Record<string, string>>({});
  useEffect(() => {
    if (!theme) {
      return;
    }
    setClassesToAdd(getClassMappingFrom(theme));
  }, [theme]);

  const pipeline = useMemo(
    () => buildRenderPipeline(classesToAdd),
    [classesToAdd]
  );

  return (
    // TODO: Wrap with Tailwind component when ready
    <>
      <div ref={containerRef} className={classesToAdd[".markdown-body"]}>
        {pipeline.processSync(children).result as React.ReactNode}
      </div>
    </>
  );
};

export default Markdown;
