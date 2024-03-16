import {
  Box,
  Button,
  Divider,
  Group,
  Select,
  SimpleGrid,
  Space,
  Text,
  Title,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import {
  HiOutlineArrowPath,
  HiOutlineBackspace,
  HiOutlinePaintBrush,
} from "react-icons/hi2";
import FEATURE_MARKDOWN_CONTENT from "../assets/md-features.md?raw";
import SAMPLE_MARKDOWN_CONTENT from "../assets/md-sample.md?raw";
import Editor from "../components/common/Editor";
import Markdown from "../components/common/Markdown";
import { Theme, defaultThemeFile, parseTheme } from "../utils/theme";

import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-yaml";

const ThemeEditor: React.FC = () => {
  const [editorValue, setEditorValue] = useState(defaultThemeFile);
  const [previewType, setPreviewType] = useState<"sample" | "features">(
    "features"
  );
  const [theme, setTheme] = useState<Theme>();
  useEffect(() => {
    try {
      setTheme(parseTheme(editorValue));
    } catch {
      // Do nothing and only update if theme file is valid
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
          <Box style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              rightSection={<HiOutlineArrowPath />}
              onClick={() => setEditorValue(defaultThemeFile)}
            >
              Reset to Default
            </Button>
            <Button
              color="red"
              rightSection={<HiOutlineBackspace />}
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
          <Select
            value={previewType}
            label="Preview type"
            // TODO: Investigate if `any` can be removed here
            // TODO: Refactor
            onChange={(e: any) => setPreviewType(e)}
            data={[
              { value: "features", label: "List of supported features" },
              { value: "sample", label: "Sample document" },
            ]}
          />
          <Divider
            my="sm"
            variant="dashed"
            label="Theme preview"
            labelPosition="center"
          />
          <Markdown theme={theme}>
            {previewType === "features"
              ? FEATURE_MARKDOWN_CONTENT
              : SAMPLE_MARKDOWN_CONTENT}
          </Markdown>
        </div>
      </SimpleGrid>
    </div>
  );
};

// For lazy loading
export const Component = ThemeEditor;
Component.displayName = "ThemeEditor";

export default ThemeEditor;
