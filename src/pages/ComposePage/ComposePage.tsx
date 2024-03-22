import { Button, Card, Group, SimpleGrid } from "@mantine/core";
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
import {
  HEADER_HEIGHT,
  PLACEHOLDER_MARKDOWN_CONTENT,
} from "../../utils/constants";

import { useHeadroom } from "@mantine/hooks";
import { defaultTheme } from "../../utils/theme";
import ComposePageHeader from "./ComposePageHeader";
import ComposePageMenu from "./ComposePageMenu";

const ComposePage: React.FC = () => {
  const isHeaderOpen = useHeadroom({ fixedAt: 120 });
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

  return (
    <div>
      <ComposePageHeader />
      <div
        style={{
          position: "sticky",
          top: isHeaderOpen ? HEADER_HEIGHT + 16 : 16,
          zIndex: 10,
        }}
      >
        <Card shadow="sm" p="xs" my="sm">
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
        </Card>
      </div>
      <SimpleGrid cols={2}>
        <Card mih={200} shadow="sm">
          <Editor
            height="100%"
            mode="markdown"
            onChange={setEditorValue}
            value={editorValue}
            showGutter={false}
            setOptions={{ highlightActiveLine: false }}
            theme="tomorrow"
          />
        </Card>
        <Card shadow="sm">
          <Markdown theme={theme} containerRef={ref}>
            {editorValue}
          </Markdown>
        </Card>
      </SimpleGrid>
    </div>
  );
};

// For lazy loading
export const Component = ComposePage;
Component.displayName = "ComposePage";

export default ComposePage;
