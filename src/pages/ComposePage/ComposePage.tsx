import { Button, Card, Group } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { HiOutlineBackspace, HiOutlineDocumentText } from "react-icons/hi2";
import SAMPLE_MARKDOWN_CONTENT from "../../assets/md-sample.md?raw";
import Editor from "../../components/common/Editor";
import Markdown from "../../components/common/Markdown";
import { PLACEHOLDER_MARKDOWN_CONTENT } from "../../utils/constants";

import ResponsiveBody from "../../components/common/ResponsiveBody";
import StickyToolbar from "../../components/common/StickyToolbar";
import { useResponsive } from "../../utils/hooks";
import { defaultTheme } from "../../utils/theme";
import ComposePageHeader from "./ComposePageHeader";
import ComposePageMenu from "./ComposePageMenu";

const ComposePage: React.FC = () => {
  const [editorValue, setEditorValue] = useState(PLACEHOLDER_MARKDOWN_CONTENT);
  const ref = useRef<HTMLDivElement>(null);

  const [isFormatting, setIsFormatting] = useState(false);

  // TODO: Use a selector
  const theme = useMemo(() => defaultTheme, []);
  const handleLoadExample = useCallback(() => {
    const confirm = window.confirm(
      "Are you sure you want to load the example? Your current content will be lost."
    );
    if (confirm) {
      setEditorValue(SAMPLE_MARKDOWN_CONTENT);
    }
  }, []);
  const handleResetContent = useCallback(() => {
    const confirm = window.confirm(
      "Are you sure you want to clear all content?"
    );
    if (confirm) {
      setEditorValue("");
    }
  }, []);

  const notificationId = useRef<string>();
  useEffect(() => {
    if (isFormatting) {
      notificationId.current = notifications.show({
        loading: true,
        title:
          "Please wait while we turn your document into an email-compatible format",
        withCloseButton: false,
        message: <>This might take a few seconds&hellip;</>,
      });
    } else {
      if (notificationId.current) {
        notifications.hide(notificationId.current);
      }
    }
  }, [isFormatting]);

  const { isMobile } = useResponsive();
  const editor = useMemo(
    () => (
      <Card h={isMobile ? "80vh" : undefined} shadow="sm">
        <Editor
          height="100%"
          mode="markdown"
          onChange={setEditorValue}
          value={editorValue}
          showGutter={false}
          setOptions={{ highlightActiveLine: false }}
        />
      </Card>
    ),
    [editorValue, isMobile]
  );
  const preview = useMemo(
    () => (
      <Card shadow="sm">
        <Markdown theme={theme} containerRef={ref}>
          {editorValue}
        </Markdown>
      </Card>
    ),
    [editorValue, theme]
  );

  return (
    <div>
      <ComposePageHeader />
      <StickyToolbar>
        <Group justify="space-between" wrap="nowrap">
          <Button
            variant="default"
            leftSection={<HiOutlineDocumentText />}
            onClick={handleLoadExample}
          >
            Load Example
          </Button>
          <Group gap="xs" wrap="nowrap">
            <Button
              variant="subtle"
              color="red"
              rightSection={<HiOutlineBackspace />}
              onClick={handleResetContent}
            >
              Clear All
            </Button>
            <ComposePageMenu
              sourceRef={ref}
              loadingCallback={setIsFormatting}
            />
          </Group>
        </Group>
      </StickyToolbar>
      <ResponsiveBody
        data={[
          { element: editor, label: "Editor" },
          { element: preview, label: "Preview" },
        ]}
      />
    </div>
  );
};

// For lazy loading
export const Component = ComposePage;
Component.displayName = "ComposePage";

export default ComposePage;
