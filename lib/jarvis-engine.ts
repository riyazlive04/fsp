/**
 * Jarvis Chatbot Engine
 * Processes user messages and generates responses based on the FSP knowledge base.
 * Follows the system prompt rules for all responses.
 */

import { knowledge, getFallbackResponse } from "@/data/jarvis-knowledge";
import { moreKnowledge } from "@/data/jarvis-knowledge2";

const allKnowledge = [...knowledge, ...moreKnowledge];

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatResponse {
  reply: string;
  suggestions?: string[];
}

type IntentHandler = (message: string) => string | null;

/**
 * Simple intent matching: check if any keywords from the message
 * match known topics.
 */
function matchTopic(message: string): string[] {
  const lower = message.toLowerCase().trim();
  const matchedIds: string[] = [];

  for (const chunk of allKnowledge) {
    for (const topic of chunk.topic) {
      if (lower.includes(topic.toLowerCase())) {
        matchedIds.push(chunk.id);
        break;
      }
    }
  }

  return matchedIds;
}

function findBestResponse(message: string): string | null {
  const matchedIds = matchTopic(message);
  if (matchedIds.length === 0) return null;

  // Prefer exact topic matches over partial
  const best = allKnowledge.find((k) => matchedIds.includes(k.id));
  return best ? best.content : null;
}

/**
 * Lead qualification questions
 */
const qualificationQuestions = [
  "Are you an aspiring, new or experienced trainer?",
  "Are you currently conducting training sessions?",
  "What would you most like to improve — facilitation, training design, personal branding, or trainer business?",
];

function handleGeneralGreeting(message: string): string | null {
  const greetings = ["hi", "hello", "hey", "hii", "namaste", "good morning", "good afternoon", "good evening"];
  if (greetings.some((g) => message.toLowerCase().includes(g))) {
    return "Hi there! 👋 Welcome to FSP — Facilitator Support Program. I'm Jarvis, your FSP assistant. I can help you understand FSP, its programs, certification, community and how to get started.\n\nWhat would you like to know?";
  }
  return null;
}

function handleHowToHelp(message: string): string | null {
  const helpTriggers = ["help", "what can you do", "what do you know", "assist me"];
  if (helpTriggers.some((t) => message.toLowerCase().includes(t))) {
    return "I can help with:\n\n• What FSP is and how it works\n• Core Program details\n• 30 Days Challenge\n• Good to Great Certification\n• Community and experiences\n• Pricing and dates\n• How to join\n• Facilitation tips\n\nJust ask me anything about FSP!";
  }
  return null;
}

/**
 * Process a user message and return a chatbot response.
 */
export function processMessage(message: string): ChatResponse {
  // Check for greetings first
  const greeting = handleGeneralGreeting(message);
  if (greeting) return { reply: greeting };

  // Check for help requests
  const help = handleHowToHelp(message);
  if (help) return { reply: help };

  // Try to find a knowledge-based response
  const knowledgeResponse = findBestResponse(message);
  if (knowledgeResponse) {
    // Add a follow-up question for relevant topics
    const topics = matchTopic(message);
    if (topics.some((id) => ["who-can-join", "how-to-join", "pricing", "dates"].includes(id))) {
      return {
        reply: knowledgeResponse,
        suggestions: qualificationQuestions.slice(0, 2),
      };
    }
    return { reply: knowledgeResponse };
  }

  // No match found — check if they're asking about something FSP-related
  const lowerMsg = message.toLowerCase().trim();
  if (lowerMsg.includes("fsp") || lowerMsg.includes("facilitat") || lowerMsg.includes("trainer") || lowerMsg.includes("training")) {
    return {
      reply: getFallbackResponse(),
    };
  }

  // Completely unrelated — respond warmly and redirect
  return {
    reply: getFallbackResponse(),
  };
}

/**
 * Check if a message is a goodbye.
 */
export function isGoodbye(message: string): boolean {
  const lower = message.toLowerCase().trim();
  return ["bye", "goodbye", "see you", "quit", "exit", "later"].some((w) => lower.includes(w));
}
