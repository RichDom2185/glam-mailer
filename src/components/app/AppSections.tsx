import { NavLink, ThemeIcon } from "@mantine/core";
import React from "react";
import {
  HiOutlineDocumentDuplicate,
  HiOutlineEnvelope,
  HiOutlinePaintBrush,
} from "react-icons/hi2";
import { Link, useLocation } from "react-router-dom";

const sections = [
  {
    icon: HiOutlineEnvelope,
    color: "green",
    label: "Compose",
    ref: "/compose",
  },
  {
    icon: HiOutlineDocumentDuplicate,
    color: "orange",
    label: "Drafts",
    ref: "/drafts",
  },
  {
    icon: HiOutlinePaintBrush,
    color: "cyan",
    label: "Theme Editor",
    ref: "/edit-theme",
  },
] as const;

const AppSections: React.FC = () => {
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
            icon={
              <ThemeIcon color={section.color} variant="light">
                <Icon />
              </ThemeIcon>
            }
          />
        );
      })}
    </div>
  );
};

export default AppSections;
