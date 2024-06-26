import { Button, Card, Group, Select } from "@mantine/core";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { HiOutlineArrowPath, HiOutlineBackspace } from "react-icons/hi2";
import FEATURE_MARKDOWN_CONTENT from "../assets/md-features.md?raw";
import SAMPLE_MARKDOWN_CONTENT from "../assets/md-sample.md?raw";
import Editor from "../components/common/Editor";
import Markdown from "../components/common/Markdown";
import ResponsiveBody from "../components/common/ResponsiveBody";
import StickyToolbar from "../components/common/StickyToolbar";
import { useResponsive } from "../utils/hooks";
import { Theme, defaultThemeFile, parseTheme } from "../utils/theme";
import ThemeEditorHeader from "./ThemeEditor/ThemeEditorHeader";

const previewTypes = [
  { value: "features", label: "Preview entire Markdown syntax" },
  { value: "sample", label: "Preview a sample email" },
];

const ThemeEditor: React.FC = () => {
  const [editorValue, setEditorValue] = useState(defaultThemeFile);
  const [previewType, setPreviewType] =
    useState<(typeof previewTypes)[number]["value"]>("features");

  const [theme, setTheme] = useState<Theme>();
  useEffect(() => {
    try {
      setTheme(parseTheme(editorValue));
    } catch {
      // Do nothing and only update if theme file is valid
    }
  }, [editorValue]);

  const handleResetTheme = useCallback(() => {
    const confirm = window.confirm(
      "Are you sure you want to reset the theme to default?"
    );
    if (confirm) {
      setEditorValue(defaultThemeFile);
    }
  }, []);
  const handleClearTheme = useCallback(() => {
    const confirm = window.confirm(
      "Are you sure you want to clear the editor?"
    );
    if (confirm) {
      setEditorValue("");
    }
  }, []);

  const { isMobile } = useResponsive();
  const editor = useMemo(
    () => (
      <Card h={isMobile ? "100%" : undefined} shadow="sm">
        <Editor
          height="100%"
          mode="yaml"
          onChange={setEditorValue}
          value={editorValue}
        />
      </Card>
    ),
    [editorValue, isMobile]
  );
  const preview = useMemo(
    () => (
      <Card shadow="sm" h="100%" style={{ overflowY: "auto" }}>
        <Select
          value={previewType}
          label="Preview type"
          onChange={(e) => e && setPreviewType(e)}
          data={previewTypes}
        />
        <Markdown theme={theme}>
          {previewType === "features"
            ? FEATURE_MARKDOWN_CONTENT
            : SAMPLE_MARKDOWN_CONTENT}
        </Markdown>
      </Card>
    ),
    [previewType, theme]
  );

  // FIXME: Abstraction violation
  const footerHeight =
    "calc(var(--app-shell-footer-offset, 0rem) + var(--app-shell-padding))";
  const negativeFooterHeight =
    "calc(-1 * var(--app-shell-footer-offset, 0rem) - var(--app-shell-padding))";

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <ThemeEditorHeader />
      <StickyToolbar>
        <Group justify="space-between" wrap="nowrap">
          <Button
            variant="default"
            leftSection={<HiOutlineArrowPath />}
            onClick={handleResetTheme}
          >
            Reset to Default
          </Button>
          <Button
            variant="light"
            color="red"
            rightSection={<HiOutlineBackspace />}
            onClick={handleClearTheme}
          >
            Clear All
          </Button>
        </Group>
      </StickyToolbar>
      <div
        style={{
          flex: 1,
          overflow: "auto",
          // FIXME: Hacky workaround to not clip shadows
          marginBottom: negativeFooterHeight,
          paddingBottom: footerHeight,
        }}
      >
        <ResponsiveBody
          data={[
            { element: editor, label: "Editor" },
            { element: preview, label: "Preview" },
          ]}
        />
      </div>
    </div>
  );
};

// For lazy loading
export const Component = ThemeEditor;
Component.displayName = "ThemeEditor";

export default ThemeEditor;
