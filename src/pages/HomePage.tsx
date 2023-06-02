import {
  Box,
  Button,
  Code,
  Flex,
  Group,
  Space,
  Text,
  Title,
} from "@mantine/core";
import React from "react";
import { HiOutlinePencil } from "react-icons/hi2";
import { TbTable } from "react-icons/tb";
import { Link } from "react-router-dom";
import Markdown from "../components/common/Markdown";
import Tag from "../components/text/Tag";

const features: React.ReactNode[] = [
  "Markdown",
  <Markdown
    // FIXME: Remove hardcoding of Tailwind prefix
    theme={{ styles: { p: ["tw-m-0"] } } as any}
  >
    {"$\\text{LaTeX}$"}
  </Markdown>,
  <Group spacing={6}>
    Tables
    <TbTable />
  </Group>,
  <Markdown
    // FIXME: Remove hardcoding of Tailwind prefix
    // FIXME: Remove hardcoding of margins
    theme={
      {
        styles: {
          "*": [
            "tw-mt-[-7px]",
            "tw-mr-[-9px]",
            "tw-mb-[-11px]",
            "tw-ml-[-4px]",
          ],
        },
      } as any
    }
  >
    {"```plantuml\ncard UML\n```"}
  </Markdown>,
  <Code color="blue" fz="md">
    code
  </Code>,
  "⭐ Emojis ✨",
  "← Arrows →",
  <Link
    to="/"
    // FIXME: Remove hardcoding of Tailwind prefix
    className="tw-text-blue-500 hover:tw-text-blue-800 tw-underline-offset-4"
  >
    Links
  </Link>,
  "and many more…",
];

// TODO: Refactor this whole component
const HomePage: React.FC = () => {
  return (
    <Box maw={840} mx="auto">
      <Title
        // FIXME: Remove hardcoding of Tailwind prefix
        className="tw-drop-shadow-md"
        order={1}
        variant="gradient"
        gradient={{ from: "#862E9C", to: "#4DABF7", deg: 30 }}
        my="xl"
        ta="center"
        fz="3rem"
      >
        So you want to create beautiful emails?
      </Title>
      <Space h="xl" />
      <Text
        fz="lg"
        // FIXME: Remove hardcoding of Tailwind prefix
        className="tw-text-slate-700"
        fs="italic"
        ta="center"
      >
        <strong>glam-mailer</strong> is an app to generate beautiful emails
        using extended Markdown. Perfect for students, professionals, or anyone
        who wants to make their emails more unique.
      </Text>
      <Space h="md" />
      <Text fz="1.8rem" ta="center" my="xl">
        Focus on what matters – content.
      </Text>
      <Space h="md" />
      <Flex
        gap="sm"
        justify="center"
        wrap="wrap"
        maw={500}
        align="center"
        mx="auto"
      >
        {features.map((feature) => (
          <Tag content={feature} />
        ))}
      </Flex>
      <Space h="xl" />
      <Box maw={600} mx="auto">
        <Text
          fz="lg"
          // FIXME: Remove hardcoding of Tailwind prefix
          className="tw-text-slate-700"
          fs="italic"
          ta="center"
        >
          Leave it to us to make it look good – or, if you want, customize it
          yourself using our{" "}
          <Link
            to="/edit-theme"
            // FIXME: Remove hardcoding of Tailwind prefix
            className="tw-text-black tw-no-underline hover:tw-underline"
          >
            <strong>theme editor</strong>
          </Link>
          .
        </Text>
      </Box>
      <Space h="md" />
      <Box
        w="min-content"
        mx="auto"
        my="sm"
        sx={{ display: "flex", gap: 12, justifyContent: "space-between" }}
      >
        <Link to="/compose">
          <Button
            variant="gradient"
            gradient={{ from: "#4DABF7", to: "green" }}
            leftIcon={<HiOutlinePencil />}
          >
            Start Writing
          </Button>
        </Link>
        <Button
          variant="default"
          onClick={() => {
            alert("Coming soon!");
          }}
        >
          Browse Themes
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;
