/** Programs and the FSP ecosystem, from the approved content source. */

export type EcosystemItem = {
  id: string;
  number: string;
  title: string;
  description: string;
  href: string;
};

export const ecosystem = {
  headline: ["One ecosystem.", "Multiple growth experiences."],
  items: [
    {
      id: "core",
      number: "01",
      title: "FSP Core Program",
      description: "Build your foundation in facilitation, experiential learning, training design, branding and professional growth.",
      href: "/core-program",
    },
    {
      id: "challenge",
      number: "02",
      title: "30 Days Challenge",
      description: "Turn learning into action through 30 practical tasks completed over 30 days.",
      href: "/30-days-challenge",
    },
    {
      id: "certification",
      number: "03",
      title: "Good to Great Facilitator",
      description: "Work towards becoming a Good to Great Facilitator through learning, practice, reflection and continuous improvement.",
      href: "/certification",
    },
    {
      id: "community",
      number: "04",
      title: "FSP Community",
      description: "Stay connected with trainers and facilitators who are on the same journey.",
      href: "/community",
    },
    {
      id: "masterclasses",
      number: "05",
      title: "Masterclasses & Mastermind",
      description: "Keep learning through regular knowledge-sharing sessions and conversations with experienced professionals.",
      href: "/community#wednesday-masterclass",
    },
    {
      id: "experiences",
      number: "06",
      title: "Experiences & Connections",
      description: "Participate in Catalyst Connect, TTX, community meetups and other curated learning experiences.",
      href: "/community#catalyst-connect",
    },
  ] satisfies EcosystemItem[],
  /** "Core ecosystem" progression from the Core Positioning section. */
  flow: [
    "FSP Core Program",
    "30 Days Challenge",
    "Good to Great Facilitator Certification",
    "FSP Community",
    "Masterclasses + Masterminds",
    "Catalyst Connect + TTX + Experiences",
    "Continuous Growth",
  ],
};

export type Module = { number: string; label: string; title: string; topics: string[] };

export const coreProgram = {
  headline: ["Build your foundation.", "Strengthen your facilitation."],
  description:
    "The FSP Core Program is a hands-on learning journey designed to help you develop the essential capabilities required to become a professional facilitator.",
  modules: [
    {
      number: "01",
      label: "Module 1",
      title: "Foundation of Facilitation",
      topics: [
        "Facilitator mindset",
        "Experiential learning",
        "Activity facilitation",
        "Participant engagement",
        "Debriefing",
        "Communication",
        "Facilitation practice",
      ],
    },
    {
      number: "02",
      label: "Module 2",
      title: "Build Your Training",
      topics: [
        "Training design",
        "Learning objectives",
        "Activity design",
        "Session flow",
        "Module creation",
        "Workbook creation",
        "Practical facilitation",
      ],
    },
    {
      number: "03",
      label: "Module 3",
      title: "Build Your Brand & Opportunities",
      topics: [
        "Personal branding",
        "Trainer positioning",
        "Marketing",
        "Proposal creation",
        "Client communication",
        "Content creation",
        "Building your trainer business",
      ],
    },
  ] satisfies Module[],
  close: ["The Core Program is where", "your journey begins."],
};

export const thirtyDays = {
  headline: ["30 days.", "30 tasks.", "One better facilitator."],
  statement: "Knowledge becomes valuable when you put it into action.",
  description:
    "The FSP 30 Days Challenge is designed to help facilitators develop the habit of taking consistent action.",
  daily: { label: "Every Day", items: ["30 Minutes", "1 Practical Task", "1 Step Forward"] },
  focusAreas: [
    "Facilitation",
    "Communication",
    "Creativity",
    "Personal branding",
    "Content creation",
    "Learning design",
    "Reflection",
    "Professional development",
  ],
  goal: [
    "The goal is not just to complete 30 tasks.",
    "The goal is to build the habit of learning, practising and improving every day.",
  ],
  close: "Small Actions. Consistent Practice. Meaningful Growth.",
  totalDays: 30,
};

export const certification = {
  name: "Good to Great Facilitator Certification",
  headline: ["From good", "to great."],
  intro: "A facilitator's journey doesn't end after learning a few techniques. Great facilitation comes through:",
  cycle: ["Learning", "Practice", "Reflection", "Feedback", "Improvement"],
  description:
    "The Good to Great Facilitator Certification is part of the FSP journey and recognises the commitment towards continuous learning, practical application and professional growth.",
  focusAreas: [
    "Facilitation skills",
    "Experiential learning capabilities",
    "Learning design skills",
    "Activity facilitation",
    "Participant engagement",
    "Training module creation",
    "Personal branding",
    "Professional communication",
    "Continuous improvement",
  ],
  close: ["The certificate is a milestone.", "The growth is the journey."],
};

export type Challenge = { title: string; description: string; href?: string };

export const challenges = {
  headline: "Learning Through Action",
  items: [
    {
      title: "21-Day Habit Challenge",
      description: "Build better professional and personal habits through consistent daily action.",
    },
    {
      title: "30 Days Challenge",
      description: "Complete 30 practical facilitator-focused tasks in 30 days.",
      href: "/30-days-challenge",
    },
    {
      title: "Book Reading Challenge",
      description: "Read, reflect and discuss ideas that can improve your professional and personal growth.",
    },
  ] satisfies Challenge[],
  close: "Don't Just Learn. Apply.",
};
