import {
  Button,
  Divider,
  Group,
  Menu,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import React, { useCallback, useRef, useState } from "react";
import AceEditor from "react-ace";
import {
  HiOutlineDocumentDuplicate,
  HiOutlinePaperAirplane,
  HiOutlinePencilSquare,
} from "react-icons/hi2";
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
          <Text>Let's streamline the process of creating your message.</Text>
          <Text>
            Simply type your message below. Focus on the content – don't worry
            about styling, we will theme it. You can utilize Markdown to add
            formatting and structure to your message
          </Text>
          <AceEditor
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
              <Menu.Label>Send via</Menu.Label>
              {MAIL_PROVIDERS.map((provider) => {
                const ProviderIcon = provider.icon;
                return (
                  <Menu.Item
                    key={provider.label}
                    icon={<ProviderIcon color={provider.color} />}
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
            </Menu.Dropdown>
          </Menu>
          <Divider
            my="sm"
            variant="dashed"
            label="Email Preview: "
            labelPosition="center"
          />
          <Markdown containerRef={ref}>{editorValue}</Markdown>
        </div>
      </SimpleGrid>
    </div>
  );
};

export default Compose;
