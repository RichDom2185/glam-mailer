import React from "react";

const Drafts: React.FC = () => {
  return <div>Drafts is coming soon!</div>;
};

// For lazy loading
export const Component = Drafts;
Component.displayName = "Drafts";

export default Drafts;
