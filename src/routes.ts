const ComposePage = () => import("./pages/ComposePage/ComposePage");
const Drafts = () => import("./pages/Drafts");
const HomePage = () => import("./pages/HomePage");
const ThemeEditor = () => import("./pages/ThemeEditor");
const Themes = () => import("./pages/Themes");

export const appRoutes = [
  { path: "", lazy: HomePage },
  { path: "compose", lazy: ComposePage },
  { path: "drafts", lazy: Drafts },
  { path: "themes", lazy: Themes },
  { path: "edit-theme", lazy: ThemeEditor },
];
