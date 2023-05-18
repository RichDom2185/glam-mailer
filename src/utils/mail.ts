import { SiGmail, SiMicrosoftoutlook } from "react-icons/si";

export enum MailProvider {
  OUTLOOK_PERSONAL = "Outlook (Personal)",
  OUTLOOK_OFFICE = "Outlook (Office 365)",
  GMAIL = "Gmail",
}

export const MAIL_PROVIDERS = [
  {
    label: MailProvider.OUTLOOK_PERSONAL,
    icon: SiMicrosoftoutlook,
    color: "#0078D4",
  },
  {
    label: MailProvider.OUTLOOK_OFFICE,
    icon: SiMicrosoftoutlook,
    color: "#0078D4",
  },
  {
    label: MailProvider.GMAIL,
    icon: SiGmail,
    color: "#EA4335",
  },
] as const;

export type Mail = {
  to: string[];
  cc: string[];
  bcc: string[];
  subject: string;
  body: string;
};

const providerToBaseUrlMap: {
  [provider in MailProvider]: string;
} = {
  [MailProvider.OUTLOOK_PERSONAL]:
    "https://outlook.live.com/mail/deeplink/compose?",
  [MailProvider.OUTLOOK_OFFICE]:
    "https://outlook.office.com/?path=/mail/action/compose&",
  [MailProvider.GMAIL]: "https://mail.google.com/mail/?view=cm&fs=1&",
};

const queryParamKeys: {
  [provider in MailProvider]: {
    [field in keyof Mail]?: string;
  };
} = {
  // CC, BCC are not supported in Outlook:
  // See https://stackoverflow.com/a/40477920
  [MailProvider.OUTLOOK_PERSONAL]: {
    to: "to",
    subject: "subject",
    body: "body",
  },
  [MailProvider.OUTLOOK_OFFICE]: {
    to: "to",
    subject: "subject",
    body: "body",
  },
  [MailProvider.GMAIL]: {
    to: "to",
    cc: "cc",
    bcc: "bcc",
    subject: "su",
    body: "body",
  },
};

export function generateDeepLinkFor(
  mail: Mail,
  provider: MailProvider
): string {
  const params = Object.entries(queryParamKeys[provider])
    .filter(([field]) => mail[field as keyof Mail] !== undefined)
    .map(([field, key]) => `${key}=${mail[field as keyof Mail]}`)
    .join("&");
  return providerToBaseUrlMap[provider] + params;
}
