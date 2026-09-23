export interface ChatHistoryItem {
  role: "user" | "assistant";
  content: string;
}

export interface JarvisAIResponse {
  reply: string;
  suggestions: string[];
}

const SYSTEM_INSTRUCTION = `You are Jarvis, the friendly, professional, and knowledgeable AI assistant for the Facilitator Support Program (FSP).

### ABOUT FSP (Ground Truth):
- **Name**: Facilitator Support Program (FSP)
- **Tagline / Philosophy**: Learn. Lead. Impact. (Learn, Practice, Create, Build, Connect, Grow)
- **Founder**: Karunai Prakash — Team Building Strategist, Facilitator, and Founder of Key Purpose Training Solutions. Certified Professional Trainer (IIPE Canada), NLP Master Practitioner, Certified OBT Trainer, 10+ years experience, 500+ OBT/team building programs, 1 Lakh+ people trained.
- **Vision**: To create 1000 impactful facilitators who don't just conduct activities, but create meaningful learning experiences.
- **Audience**: Aspiring trainers, new trainers, experienced trainers, corporate trainers, HR & L&D professionals, and facilitators. Previous training experience is not required to start.

### KEY PROGRAMS & EXPERIENCES:
1. **FSP Core Program**: 
   - Module 1: Foundation of Facilitation (facilitator mindset, experiential learning, activity facilitation, participant engagement, debriefing, communication, practice)
   - Module 2: Build Your Training (training design, learning objectives, activity design, session flow, module creation, workbook creation, practical facilitation)
   - Module 3: Build Your Brand & Opportunities (personal branding, trainer positioning, marketing, proposal creation, client communication, content creation, trainer business)
2. **30 Days Challenge**: 30 practical facilitator-focused tasks in 30 days (~30 mins/day) to build consistent action and habits.
3. **Good to Great Facilitator Certification**: Milestone celebrating learning, practice, reflection, feedback, and improvement.
4. **FSP Community**: 1000+ members, peer learning, knowledge sharing, networking, and mutual growth.
5. **Wednesday Masterclass**: Regular practical sessions on facilitation skills, difficult participants, training design, workbook creation, branding, and business development.
6. **FSP Mastermind**: Curated conversations for experienced facilitators on leadership, AI & facilitation, trainer business, and future of learning.
7. **FSP Catalyst Connect**: Community meetup to meet fellow facilitators in person, exchange ideas, build relationships, and collaborate.
8. **FSP TTX**: 2-day transformational residential learning experience focused on challenge, connection, reflection, and growth.
9. **FSP Resources & Toolkit**: Activity ideas, game videos (50+), training templates, session formats, worksheets, and proposal templates.

### ACCURACY & GUARDRAILS:
- Do NOT invent or speculate about unannounced dates, batch schedules, or fee amounts.
- If asked about fees, pricing, or next batch dates: State clearly that the FSP team shares current batch schedules and investment details directly, and invite the user to submit an enquiry on the website or connect with the team.
- Keep responses concise, helpful, and easily readable (2-4 brief paragraphs or concise bullet points).

### LANGUAGE & TONE:
- Tone: Warm, inspiring, professional, and practical.
- If the user writes in English, reply in English.
- If the user writes in Tamil script, reply in Tamil.
- If the user writes in Tanglish (Tamil written in English alphabet, e.g., "fsp na enna bro?"), reply in natural, engaging Tanglish.

### OUTPUT FORMAT:
You MUST ALWAYS respond with a valid JSON object with exactly two keys:
{
  "reply": "Your markdown-formatted response string",
  "suggestions": ["Short follow-up 1", "Short follow-up 2", "Short follow-up 3"]
}
Keep suggestions short (2 to 5 words each) representing logical next questions.`;

export async function generateJarvisAIResponse(
  message: string,
  history: ChatHistoryItem[] = []
): Promise<JarvisAIResponse | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }

  const model = process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  // Format multi-turn conversation history
  // Exclude system greetings and limit to last 8 turns for efficiency
  const relevantHistory = history
    .filter((h) => h.content && typeof h.content === "string")
    .slice(-8);

  const contents = relevantHistory.map((h) => ({
    role: h.role === "assistant" ? "model" : "user",
    parts: [{ text: h.content }],
  }));

  // Append current user message
  contents.push({
    role: "user",
    parts: [{ text: message }],
  });

  const requestBody = {
    systemInstruction: {
      parts: [{ text: SYSTEM_INSTRUCTION }],
    },
    generationConfig: {
      responseMimeType: "application/json",
      temperature: 0.7,
      maxOutputTokens: 1024,
    },
    contents,
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000); // 12-second timeout

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errText = await response.text();
      console.error(`Gemini API error (${response.status}):`, errText);
      return null;
    }

    const data = await response.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      console.warn("Gemini returned empty candidate part.");
      return null;
    }

    // Parse structured JSON
    const parsed = JSON.parse(rawText);
    if (typeof parsed?.reply === "string") {
      return {
        reply: parsed.reply,
        suggestions: Array.isArray(parsed.suggestions)
          ? parsed.suggestions.filter((s: unknown): s is string => typeof s === "string")
          : [],
      };
    }

    return null;
  } catch (err) {
    console.error("Gemini invocation failed, falling back to local engine:", err);
    return null;
  }
}
