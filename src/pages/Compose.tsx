import { Button, Group, Menu, SimpleGrid, Text, Title } from "@mantine/core";
import React from "react";
import {
  HiOutlineDocumentDuplicate,
  HiOutlinePaperAirplane,
  HiOutlinePencilSquare,
} from "react-icons/hi2";
import { SiGmail, SiMicrosoftoutlook } from "react-icons/si";

const Compose: React.FC = () => {
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
              <Menu.Item icon={<SiMicrosoftoutlook color="#0078D4" />}>
                Outlook
              </Menu.Item>
              <Menu.Item icon={<SiGmail color="#EA4335" />}>Gmail</Menu.Item>
              <Menu.Divider />
              <Menu.Label>Alternatively</Menu.Label>
              <Menu.Item icon={<HiOutlineDocumentDuplicate />}>
                Copy to clipboard
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
      </SimpleGrid>
    </div>
  );
};

export default Compose;
