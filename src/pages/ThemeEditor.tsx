import {
  Box,
  Button,
  Divider,
  Group,
  SimpleGrid,
  Space,
  Text,
  Title,
} from "@mantine/core";
import React, { useMemo, useState } from "react";
import {
  HiOutlineArrowPath,
  HiOutlineBackspace,
  HiOutlinePaintBrush,
} from "react-icons/hi2";
import SAMPLE_MARKDOWN_CONTENT from "../assets/md-sample.md?raw";
import Markdown from "../components/common/Markdown";
import defaultTheme from "../themes/default.yaml?raw";

import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-yaml";
import Editor from "../components/common/Editor";
import { getTheme } from "../utils/theme";

const ThemeEditor: React.FC = () => {
  const [editorValue, setEditorValue] = useState(defaultTheme);

  const theme = useMemo(() => {
    try {
      return getTheme(editorValue);
    } catch {
      // TODO: Handle this more gracefully
      console.error("Invalid theme, using default theme");
      return getTheme(defaultTheme);
    }
  }, [editorValue]);

  return (
    <div>
      <SimpleGrid cols={2}>
        <div>
          <Title order={2}>
            <Group>
              <HiOutlinePaintBrush />
              Let us create a theme!
            </Group>
          </Title>
          <Space h="md" />
          <Text>
            Start by writing your theme following the YAML template below. The
            default theme has been loaded for you. Feel free to customize it, or
            start from a blank slate; your theme will be visible on the right.
          </Text>
          <Space h="md" />
          <Text>
            Documentation for building theme files will be coming soon.
          </Text>
          <Space h="md" />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              rightIcon={<HiOutlineArrowPath />}
              onClick={() => setEditorValue(defaultTheme)}
            >
              Reset to Default
            </Button>
            <Button
              color="red"
              rightIcon={<HiOutlineBackspace />}
              onClick={() => setEditorValue("")}
            >
              Clear All
            </Button>
          </Box>
          <Divider
            my="sm"
            variant="dashed"
            label="Write your theme below"
            labelPosition="center"
          />
          <Editor mode="yaml" onChange={setEditorValue} value={editorValue} />
        </div>
        <div>
          {/* TODO: Load every possible supported (extended) Markdown construct */}
          <Markdown theme={theme}>{SAMPLE_MARKDOWN_CONTENT}</Markdown>
        </div>
      </SimpleGrid>
    </div>
  );
};

export default ThemeEditor;
