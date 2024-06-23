import { Box, Button, Code, Flex, Group, Text, Title } from "@mantine/core";
import React from "react";
import { HiOutlinePencil } from "react-icons/hi2";
import { TbTable } from "react-icons/tb";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import rehypeMathjax from "rehype-mathjax";
import remarkMath from "remark-math";
import Tag from "../components/text/Tag";

const features: React.ReactNode[] = [
  "Markdown",
  <ReactMarkdown
    // FIXME: Remove hardcoding of Tailwind prefix
    className="*:tw-m-0"
    remarkPlugins={[remarkMath]}
    rehypePlugins={[rehypeMathjax]}
  >
    {"$\\text{LaTeX}$"}
  </ReactMarkdown>,
  <Group gap={6}>
    Tables
    <TbTable />
  </Group>,
  <img
    // FIXME: Remove hardcoding of Tailwind prefix
    className="tw-mt-[-10px] tw-mr-[-9px] tw-mb-[-18px] tw-ml-[-4px]"
    // Equivalent to ```plantuml\ncard UML\n```
    src="https://www.plantuml.com/plantuml/png/IquiIb48zVK10000"
  />,
  <Code color="blue.0" fz="md">
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
      <Title my="xl" ta="center" fz="3rem" mb="lg">
        <Text
          size="1em"
          lh={1.2}
          fw="bold"
          variant="gradient"
          gradient={{ from: "#862E9C", to: "#4DABF7", deg: 30 }}
        >
          Do you want to create beautiful, professional emails?
        </Text>
      </Title>
      <Text
        fz="lg"
        // FIXME: Remove hardcoding of Tailwind prefix
        className="!tw-text-slate-700"
        fs="italic"
        ta="center"
        my="xl"
      >
        <strong>glam-mailer</strong> is an app to generate beautiful emails
        using extended Markdown. Perfect for students, professionals, or anyone
        who wants to make their emails more unique.
      </Text>
      <Text fz="1.8rem" ta="center" my="xl">
        Focus on what matters – content.
      </Text>
      <Flex
        gap="sm"
        justify="center"
        wrap="wrap"
        maw={500}
        align="center"
        mx="auto"
        my="xl"
      >
        {features.map((feature, i) => (
          <Tag key={i} content={feature} />
        ))}
      </Flex>
      <Box maw={600} mx="auto" my="xl">
        <Text
          fz="lg"
          // FIXME: Remove hardcoding of Tailwind prefix
          className="!tw-text-slate-700"
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
      <Box
        w="min-content"
        mx="auto"
        my="xl"
        style={{ display: "flex", gap: 12, justifyContent: "space-between" }}
      >
        <Link to="/compose">
          <Button
            variant="filled"
            bg="#862E9C"
            leftSection={<HiOutlinePencil />}
          >
            Start Writing
          </Button>
        </Link>
        <Link to="/themes">
          <Button variant="default">Browse Themes</Button>
        </Link>
      </Box>
    </Box>
  );
};

// For lazy loading
export const Component = HomePage;
Component.displayName = "HomePage";

export default HomePage;
