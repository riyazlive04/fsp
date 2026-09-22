import { NextRequest, NextResponse } from "next/server";
import { processMessage, isGoodbye } from "@/lib/jarvis-engine";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const message: string = body.message;

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const response = processMessage(message);
    const goodbye = isGoodbye(message);

    return NextResponse.json({
      reply: response.reply,
      suggestions: response.suggestions,
      goodbye,
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
