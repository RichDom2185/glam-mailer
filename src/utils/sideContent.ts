import React from "react";
import { create } from "zustand";

type SideContentState = {
  sideContent: React.ReactNode;
  setSideContent: (sideContent: React.ReactNode) => void;
};

export const useSideContent = create<SideContentState>()((set) => ({
  sideContent: null,
  setSideContent: (sideContent) => set({ sideContent }),
}));
