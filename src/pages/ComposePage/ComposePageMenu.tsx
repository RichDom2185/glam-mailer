import { Button, Menu } from "@mantine/core";
import React from "react";
import {
  HiOutlineArrowTopRightOnSquare,
  HiOutlineDocumentDuplicate,
  HiOutlinePaperAirplane,
} from "react-icons/hi2";
import ReactToPrint from "react-to-print";
import { MAIL_PROVIDERS } from "../../utils/mail.ts";
import { formatAsHtmlEmail } from "../../utils/theme.ts";

const handleCopyToClipboard = async (
  sourceRef: React.RefObject<HTMLDivElement>,
  loadingCallback: (loadingState: boolean) => void = () => {}
) => {
  const e = sourceRef.current;
  if (!e) {
    return;
  }

  loadingCallback(true);
  const html = e.innerHTML;
  const formattedHtml = await formatAsHtmlEmail(html);
  navigator.clipboard
    .write([
      new ClipboardItem({
        "text/html": new Blob([formattedHtml], { type: "text/html" }),
        "text/plain": new Blob([formattedHtml], { type: "text/plain" }),
      }),
    ])
    .then(() => alert("Copied to clipboard!"))
    .catch((e) => {
      alert("Something went wrong.");
      console.error(e);
    })
    .finally(() => loadingCallback(false));
};

type Props = {
  sourceRef: React.RefObject<HTMLDivElement>;
  loadingCallback?: (loadingState: boolean) => void;
};

const ComposePageMenu: React.FC<Props> = ({ sourceRef, loadingCallback }) => {
  return (
    <Menu>
      <Menu.Target>
        <Button variant="light" rightSection={<HiOutlinePaperAirplane />}>
          Send
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
              leftSection={<ProviderIcon color={provider.color} />}
            >
              {provider.label}
            </Menu.Item>
          );
        })}
        <Menu.Divider />
        <Menu.Label>Manual send</Menu.Label>
        <Menu.Item
          leftSection={<HiOutlineDocumentDuplicate />}
          onClick={() => handleCopyToClipboard(sourceRef, loadingCallback)}
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
          content={() => sourceRef.current}
        />
      </Menu.Dropdown>
    </Menu>
  );
};

export default ComposePageMenu;
