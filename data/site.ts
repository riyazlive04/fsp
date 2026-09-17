/**
 * Site-wide configuration: URL, navigation and brand constants.
 *
 * Set NEXT_PUBLIC_SITE_URL in the deployment environment so canonical URLs,
 * the sitemap and Open Graph tags point at the production domain. On Vercel,
 * the project's production domain is used automatically when it is not set.
 * Blank values and values without a protocol are handled.
 */
function resolveSiteUrl(): string {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_URL,
  ];
  for (const raw of candidates) {
    const value = raw?.trim();
    if (!value) continue;
    const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
    try {
      return new URL(withProtocol).origin;
    } catch {
      // Ignore malformed values and try the next candidate.
    }
  }
  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();

export const site = {
  name: "Facilitator Support Program",
  shortName: "FSP",
  tagline: "Learn. Lead. Impact.",
  founder: "Karunai Prakash",
  organisation: "Key Purpose Training Solutions",
  description:
    "Facilitator Support Program (FSP) is a practical learning and growth ecosystem for trainers, facilitators and aspiring facilitators who want to improve their facilitation skills, build their personal brand and create more professional opportunities.",
  /**
   * Contact channels. Leave null until approved details are supplied;
   * components render them only when present.
   */
  contact: {
    email: null as string | null,
    phone: null as string | null,
  },
  /** Endpoint that receives enquiry form submissions (JSON POST). */
  formEndpoint: process.env.NEXT_PUBLIC_FSP_FORM_ENDPOINT?.trim() || null,
} as const;

export type NavLink = { label: string; href: string; description?: string };
export type NavItem = NavLink | { label: string; children: NavLink[] };

export const primaryNav: NavItem[] = [
  { label: "About FSP", href: "/about-fsp" },
  {
    label: "Programs",
    children: [
      { label: "Core Program", href: "/core-program", description: "Build your foundation" },
      { label: "30 Days Challenge", href: "/30-days-challenge", description: "30 days. 30 tasks." },
      { label: "Good to Great Certification", href: "/certification", description: "From good to great" },
    ],
  },
  {
    label: "Community",
    children: [
      { label: "FSP Community", href: "/community", description: "You don't have to grow alone" },
      { label: "Wednesday Masterclass", href: "/community#wednesday-masterclass", description: "Learn something. Apply something." },
      { label: "FSP Mastermind", href: "/community#mastermind", description: "Conversations that make you think" },
      { label: "Catalyst Connect", href: "/community#catalyst-connect", description: "Connect. Learn. Collaborate." },
      { label: "FSP TTX", href: "/community#ttx", description: "2-day residential experience" },
    ],
  },
  { label: "Events", href: "/events" },
  { label: "Resources", href: "/resources" },
  { label: "FAQ", href: "/faq" },
];

export const joinHref = "/contact";
export const talkHref = "/contact?intent=talk";

export const footerNav: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Programs",
    links: [
      { label: "About FSP", href: "/about-fsp" },
      { label: "Core Program", href: "/core-program" },
      { label: "30 Days Challenge", href: "/30-days-challenge" },
      { label: "Certification", href: "/certification" },
    ],
  },
  {
    heading: "Community",
    links: [
      { label: "FSP Community", href: "/community" },
      { label: "Events", href: "/events" },
      { label: "Resources", href: "/resources" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
      { label: "Join FSP", href: "/contact" },
    ],
  },
];
