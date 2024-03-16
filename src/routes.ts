const ComposePage = () => import("./pages/ComposePage/ComposePage");
const Drafts = () => import("./pages/Drafts");
const HomePage = () => import("./pages/HomePage");
const ThemeEditor = () => import("./pages/ThemeEditor");

export const appRoutes = [
  { path: "", lazy: HomePage },
  { path: "compose", lazy: ComposePage },
  { path: "drafts", lazy: Drafts },
  { path: "edit-theme", lazy: ThemeEditor },
];
