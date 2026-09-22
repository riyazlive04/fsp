/**
 * Jarvis — FSP Chatbot Knowledge Base
 * All information sourced from the approved FSP content source.
 */

export type KnowledgeChunk = {
  id: string;
  topic: string[];
  title: string;
  content: string;
};

export const knowledge: KnowledgeChunk[] = [
  {
    id: "fsp-overview",
    topic: ["what is fsp", "facilitator support program", "about fsp"],
    title: "What is FSP?",
    content: "The Facilitator Support Program (FSP) is a practical learning and growth ecosystem for trainers, facilitators and aspiring facilitators who want to improve their facilitation skills, build their personal brand and create more professional opportunities. Founded by Karunai Prakash, FSP has been operating since 2022 with a vision to create 1000 impactful facilitators.",
  },
];

export function getFallbackResponse(): string {
  return "I don't have the confirmed details for that yet. The FSP team can share the latest information with you.";
}
