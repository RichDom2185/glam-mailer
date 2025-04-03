import { NavLink, ThemeIcon } from "@mantine/core";
import React from "react";
import {
  HiOutlineDocumentDuplicate,
  HiOutlineEnvelope,
  HiOutlinePaintBrush,
  HiOutlineSwatch,
} from "react-icons/hi2";
import { Link, useLocation } from "react-router";

const sections = [
  {
    icon: HiOutlineEnvelope,
    color: "#15803d", // Tailwind green-700
    label: "Compose",
    ref: "/compose",
  },
  {
    icon: HiOutlineDocumentDuplicate,
    color: "#c2410c", // Tailwind orange-700
    label: "Drafts",
    ref: "/drafts",
  },
  {
    icon: HiOutlineSwatch,
    color: "#7e22ce", // Tailwind purple-700
    label: "Browse Themes",
    ref: "/themes",
  },
  {
    icon: HiOutlinePaintBrush,
    color: "#0e7490", // Tailwind cyan-700
    label: "Theme Editor",
    ref: "/edit-theme",
  },
] as const;

type Props = {
  handleClick?: () => void;
};

const AppSections: React.FC<Props> = ({ handleClick }) => {
  const location = useLocation();
  return (
    <div>
      {sections.map((section) => {
        const Icon = section.icon;
        return (
          <NavLink
            key={section.ref}
            component={Link}
            to={section.ref}
            active={location.pathname === section.ref}
            label={section.label}
            color={section.color}
            onClick={handleClick}
            styles={(theme) => ({
              root: { borderRadius: theme.radius.md },
              label: { fontWeight: 500 },
            })}
            leftSection={
              <ThemeIcon color={section.color} variant="light" size="lg">
                <Icon size={20} />
              </ThemeIcon>
            }
          />
        );
      })}
    </div>
  );
};

export default AppSections;
