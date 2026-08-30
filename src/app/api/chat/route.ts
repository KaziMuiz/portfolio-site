import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { CHAT_MODEL, SYSTEM_PROMPT } from "@/lib/ai-config";

// The API key (ANTHROPIC_API_KEY) is read by @ai-sdk/anthropic directly
// from the server's environment — it never appears in any client bundle
// or response. This route is the only place that ever talks to Claude.
export const runtime = "nodejs";

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: CHAT_MODEL,
    system: SYSTEM_PROMPT,
    messages: await convertToModelMessages(messages),
  });

  // Streams back as a UI-message stream that useChat on the client
  // understands directly — this is what produces token-by-token
  // rendering instead of waiting for the full response.
  return result.toUIMessageStreamResponse();
}
