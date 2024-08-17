export type Draft = {
  id: string;
  // TODO: Set up themeId when slice is introduced
  // themeId: string;
  subject: string;
  content: string;
  /** ISO-string of created timestamp */
  createdAt: string;
};
