import {
  Box,
  Button,
  Divider,
  Group,
  Menu,
  Notification,
  SimpleGrid,
  Space,
  Text,
  Title,
} from "@mantine/core";
import React, { useCallback, useRef, useState } from "react";
import {
  HiOutlineArrowTopRightOnSquare,
  HiOutlineBackspace,
  HiOutlineDocumentDuplicate,
  HiOutlineDocumentText,
  HiOutlinePaperAirplane,
  HiOutlinePencilSquare,
} from "react-icons/hi2";
import ReactToPrint from "react-to-print";
import SAMPLE_MARKDOWN_CONTENT from "../../assets/md-sample.md?raw";
import Editor from "../../components/common/Editor";
import Markdown from "../../components/common/Markdown";
import { PLACEHOLDER_MARKDOWN_CONTENT } from "../../utils/constants";
import { MAIL_PROVIDERS } from "../../utils/mail";
import { formatAsHtmlEmail, getTheme } from "../../utils/theme";

import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-markdown";

const ComposePage: React.FC = () => {
  const [editorValue, setEditorValue] = useState(PLACEHOLDER_MARKDOWN_CONTENT);
  const ref = useRef<HTMLDivElement>(null);

  const [isFormatting, setIsFormatting] = useState(false);

  const theme = getTheme();

  const handleCopyToClipboard = useCallback(async () => {
    const e = ref.current;
    if (!e) {
      return;
    }

    setIsFormatting(true);
    const html = e.innerHTML;
    const formattedHtml = await formatAsHtmlEmail(html);
    navigator.clipboard
      .write([
        new ClipboardItem({
          "text/html": new Blob([formattedHtml], { type: "text/html" }),
          "text/plain": new Blob([formattedHtml], { type: "text/plain" }),
        }),
      ])
      .then(() => {
        setIsFormatting(false);
        alert("Copied to clipboard!");
      })
      .catch(() => {
        setIsFormatting(false);
        alert("Something went wrong.");
      });
  }, [ref]);

  return (
    <div>
      <SimpleGrid cols={2}>
        <div>
          <Title order={2}>
            <Group>
              <HiOutlinePencilSquare /> Let's create an email!
            </Group>
          </Title>
          <Space h="md" />
          <Text>Let's streamline the process of creating your message.</Text>
          <Space h="md" />
          <Text>
            Simply type your message below. Focus on the content – don't worry
            about styling, we will theme it. You can utilize Markdown to add
            formatting and structure to your message.
          </Text>
          <Space h="md" />
          <Text>Unsure of what's supported? Load the example below!</Text>
          <Space h="md" />
          <Box style={{ display: "flex", justifyContent: "space-between" }}>
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
          </Box>
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
          <Menu>
            <Menu.Target>
              <Button rightSection={<HiOutlinePaperAirplane />}>
                Send Message
              </Button>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Send via (coming soon)</Menu.Label>
              {MAIL_PROVIDERS.map((provider) => {
                const ProviderIcon = provider.icon;
                return (
                  <Menu.Item
                    disabled // TODO: Remove when ready
                    key={provider.label}
                    leftSection={
                      <ProviderIcon color={false && provider.color} />
                    }
                  >
                    {provider.label}
                  </Menu.Item>
                );
              })}
              <Menu.Divider />
              <Menu.Label>Manual send</Menu.Label>
              <Menu.Item
                leftSection={<HiOutlineDocumentDuplicate />}
                onClick={() => handleCopyToClipboard()}
              >
                Copy to clipboard
              </Menu.Item>
              <ReactToPrint
                pageStyle=""
                trigger={() => (
                  <Menu.Item leftSection={<HiOutlineArrowTopRightOnSquare />}>
                    Save as PDF
                  </Menu.Item>
                )}
                content={() => ref.current}
              />
            </Menu.Dropdown>
          </Menu>
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
