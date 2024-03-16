import {
  Button,
  Card,
  Divider,
  Group,
  Notification,
  SimpleGrid,
  Space,
} from "@mantine/core";
import React, { useRef, useState } from "react";
import { HiOutlineBackspace, HiOutlineDocumentText } from "react-icons/hi2";
import SAMPLE_MARKDOWN_CONTENT from "../../assets/md-sample.md?raw";
import Editor from "../../components/common/Editor";
import Markdown from "../../components/common/Markdown";
import {
  HEADER_HEIGHT,
  PLACEHOLDER_MARKDOWN_CONTENT,
} from "../../utils/constants";

import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-markdown";
import { defaultTheme } from "../../utils/theme";
import ComposePageHeader from "./ComposePageHeader";
import ComposePageMenu from "./ComposePageMenu";

const minimalButtonProps = {
  variant: "subtle",
  px: "xs",
};

const ComposePage: React.FC = () => {
  const [editorValue, setEditorValue] = useState(PLACEHOLDER_MARKDOWN_CONTENT);
  const ref = useRef<HTMLDivElement>(null);

  const [isFormatting, setIsFormatting] = useState(false);

  // TODO: Use a selector
  const theme = defaultTheme;
  return (
    <div>
      <SimpleGrid cols={2}>
        <div>
          <ComposePageHeader />
          <div style={{ position: "sticky", top: HEADER_HEIGHT + 16 }}>
            <Card shadow="lg" radius="md" p="xs" my="sm">
              <Group justify="space-between">
                <Button
                  {...minimalButtonProps}
                  rightSection={<HiOutlineDocumentText />}
                  onClick={() => setEditorValue(SAMPLE_MARKDOWN_CONTENT)}
                >
                  Load Example
                </Button>
                <Button
                  {...minimalButtonProps}
                  color="red"
                  rightSection={<HiOutlineBackspace />}
                  onClick={() => setEditorValue("")}
                >
                  Clear All
                </Button>
              </Group>
            </Card>
            <Card shadow="lg" radius="md">
              <Editor
                mode="markdown"
                onChange={setEditorValue}
                value={editorValue}
                showGutter={false}
              />
            </Card>
          </div>
        </div>
        <div>
          <ComposePageMenu sourceRef={ref} loadingCallback={setIsFormatting} />
          {isFormatting && (
            <>
              <Space h="md" />
              <Notification
                loading
                title="Please wait while we turn your document into an email-compatible format"
                withCloseButton={false}
              >
                This might take a few seconds...
              </Notification>
            </>
          )}
          <Divider
            my="sm"
            variant="dashed"
            label="Email preview"
            labelPosition="center"
          />
          <Markdown theme={theme} containerRef={ref}>
            {editorValue}
          </Markdown>
        </div>
      </SimpleGrid>
    </div>
  );
};

// For lazy loading
export const Component = ComposePage;
Component.displayName = "ComposePage";

export default ComposePage;
