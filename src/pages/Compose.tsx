import {
  Box,
  Button,
  Divider,
  Group,
  Menu,
  SimpleGrid,
  Space,
  Text,
  Title,
} from "@mantine/core";
import React, { useCallback, useRef, useState } from "react";
import AceEditor from "react-ace";
import {
  HiOutlineArrowTopRightOnSquare,
  HiOutlineBackspace,
  HiOutlineDocumentDuplicate,
  HiOutlinePaperAirplane,
  HiOutlinePencilSquare,
} from "react-icons/hi2";
import ReactToPrint from "react-to-print";
import Markdown from "../components/common/Markdown";
import { PLACEHOLDER_MARKDOWN_CONTENT } from "../utils/constants";
import { MAIL_PROVIDERS } from "../utils/mail";
import { formatAsHtmlEmail } from "../utils/theme";

import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-markdown";

const Compose: React.FC = () => {
  const [editorValue, setEditorValue] = useState(PLACEHOLDER_MARKDOWN_CONTENT);
  const ref = useRef<HTMLDivElement>(null);

  const handleCopyToClipboard = useCallback(async () => {
    const e = ref.current;
    if (!e) {
      return;
    }

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
        alert("Copied to clipboard!");
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
            formatting and structure to your message
          </Text>
          <Space h="md" />
          <Box sx={{ display: "flex", justifyContent: "end" }}>
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
            label="Write your email below"
            labelPosition="center"
          />
          <AceEditor
            setOptions={{ cursorStyle: "smooth" }}
            fontSize={13}
            mode="markdown"
            width="100%"
            onChange={setEditorValue}
            value={editorValue}
            wrapEnabled
          />
        </div>
        <div>
          <Menu>
            <Menu.Target>
              <Button rightIcon={<HiOutlinePaperAirplane />}>
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
                    icon={<ProviderIcon color={false && provider.color} />}
                  >
                    {provider.label}
                  </Menu.Item>
                );
              })}
              <Menu.Divider />
              <Menu.Label>Manual send</Menu.Label>
              <Menu.Item
                icon={<HiOutlineDocumentDuplicate />}
                onClick={() => handleCopyToClipboard()}
              >
                Copy to clipboard
              </Menu.Item>
              <ReactToPrint
                pageStyle=""
                trigger={() => (
                  <Menu.Item icon={<HiOutlineArrowTopRightOnSquare />}>
                    Save as PDF
                  </Menu.Item>
                )}
                content={() => ref.current}
              />
            </Menu.Dropdown>
          </Menu>
          <Divider
            my="sm"
            variant="dashed"
            label="Email preview"
            labelPosition="center"
          />
          <Markdown containerRef={ref}>{editorValue}</Markdown>
        </div>
      </SimpleGrid>
    </div>
  );
};

export default Compose;
