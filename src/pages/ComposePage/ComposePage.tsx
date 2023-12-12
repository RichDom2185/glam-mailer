import {
  Button,
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
import { PLACEHOLDER_MARKDOWN_CONTENT } from "../../utils/constants";
import { getTheme } from "../../utils/theme";

import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-markdown";
import ComposePageHeader from "./ComposePageHeader";
import ComposePageMenu from "./ComposePageMenu";

const ComposePage: React.FC = () => {
  const [editorValue, setEditorValue] = useState(PLACEHOLDER_MARKDOWN_CONTENT);
  const ref = useRef<HTMLDivElement>(null);

  const [isFormatting, setIsFormatting] = useState(false);

  const theme = getTheme();
  return (
    <div>
      <SimpleGrid cols={2}>
        <div>
          <ComposePageHeader />
          <Group mt="md" justify="space-between">
            <Button
              rightSection={<HiOutlineDocumentText />}
              onClick={() => setEditorValue(SAMPLE_MARKDOWN_CONTENT)}
            >
              Load Example
            </Button>
            <Button
              color="red"
              rightSection={<HiOutlineBackspace />}
              onClick={() => setEditorValue("")}
            >
              Clear All
            </Button>
          </Group>
          <Divider
            my="sm"
            variant="dashed"
            label="Write your email below"
            labelPosition="center"
          />
          <Editor
            mode="markdown"
            onChange={setEditorValue}
            value={editorValue}
          />
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

export default ComposePage;
