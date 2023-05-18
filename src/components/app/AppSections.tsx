import { NavLink, ThemeIcon } from "@mantine/core";
import React from "react";
import { HiOutlineDocumentDuplicate, HiOutlineEnvelope } from "react-icons/hi2";

const sections = [
  { icon: HiOutlineEnvelope, color: "green", label: "Compose" },
  { icon: HiOutlineDocumentDuplicate, color: "orange", label: "Drafts" },
] as const;

const AppSections: React.FC = () => {
  return (
    <div>
      {sections.map((section) => {
        const Icon = section.icon;
        return (
          <NavLink
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
