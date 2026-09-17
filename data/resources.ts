/**
 * FSP resource library.
 *
 * To publish a resource, append to `resources`. Use real, approved files or
 * links only. Access "members" marks resources available inside FSP.
 *
 * Example:
 * {
 *   id: "session-flow-template",
 *   title: "Session flow template",
 *   category: "training-templates",
 *   description: "…",
 *   type: "PDF",
 *   access: "members",
 *   href: "/resources/files/session-flow-template.pdf",
 * }
 */

export const resourceCategories = [
  { id: "activity-ideas", label: "Activity Ideas" },
  { id: "game-videos", label: "Game Videos" },
  { id: "training-templates", label: "Training Templates" },
  { id: "session-formats", label: "Session Formats" },
  { id: "worksheets", label: "Worksheets" },
  { id: "workbooks", label: "Workbooks" },
  { id: "proposal-templates", label: "Proposal Templates" },
  { id: "branding-resources", label: "Branding Resources" },
  { id: "learning-resources", label: "Learning Resources" },
  { id: "facilitation-tools", label: "Facilitation Tools" },
] as const;

export type ResourceCategoryId = (typeof resourceCategories)[number]["id"];

export type FspResource = {
  id: string;
  title: string;
  category: ResourceCategoryId;
  description?: string;
  /** e.g. "PDF", "Video", "Template" */
  type?: string;
  access?: "public" | "members";
  href?: string;
  tags?: string[];
};

export const resources: FspResource[] = [];

export const resourcesCopy = {
  headline: "Your Facilitator Toolkit",
  intro: "FSP provides practical resources, templates, activities and learning materials.",
  empty: "Resources will appear here as they are published.",
  noMatch: "No resources match your search.",
};
