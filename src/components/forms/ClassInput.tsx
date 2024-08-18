import { Box, Kbd, TagsInput } from "@mantine/core";
import React from "react";
import { TAILWIND_CLASSES_AUTOCOMPLETE } from "../../lib/json/themes/tailwind";
import { filterTailwindClassesSync } from "../../utils/theme";

type Props = {
  value: string[];
  onChange: (value: string[]) => void;
};

const ClassInput: React.FC<Props> = ({ value, onChange }) => {
  return (
    <TagsInput
      label={
        <Box pb={8}>
          <Kbd>Enter</Kbd> or <Kbd>Space</Kbd> to add
        </Box>
      }
      placeholder="Pick class name from list, or add your own classes"
      data={TAILWIND_CLASSES_AUTOCOMPLETE}
      value={value}
      onInput={() => {}}
      onChange={onChange}
      limit={20}
      splitChars={[" "]}
      filter={filterTailwindClassesSync}
    />
  );
};

export default ClassInput;
