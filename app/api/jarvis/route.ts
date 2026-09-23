import { NextRequest, NextResponse } from "next/server";
import { processMessage, isGoodbye } from "@/lib/jarvis-engine";
import { generateJarvisAIResponse, ChatHistoryItem } from "@/lib/gemini";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const message: string = body.message;
    const history: ChatHistoryItem[] = Array.isArray(body.history) ? body.history : [];

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const goodbye = isGoodbye(message);

    // 1. Attempt generation via Gemini AI
    const aiResponse = await generateJarvisAIResponse(message, history);
    if (aiResponse && aiResponse.reply) {
      return NextResponse.json({
        reply: aiResponse.reply,
        suggestions: aiResponse.suggestions || [],
        goodbye,
        source: "gemini",
      });
    }

    // 2. Seamless fallback to local deterministic engine if Gemini is unavailable
    const fallbackResponse = processMessage(message);
    return NextResponse.json({
      reply: fallbackResponse.reply,
      suggestions: fallbackResponse.suggestions || [],
      goodbye,
      source: "local",
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
