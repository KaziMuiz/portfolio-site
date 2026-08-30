# Portfolio Site + Streaming Chat

Next.js portfolio site for the FlyRank AI Internship, extended in Week 4 with a streaming AI chat feature.

## Routes

- `/` — Home, `/projects`, `/about`, `/contact` — portfolio pages
- `/chat` — the streaming AI chat (this week's assignment)
- `/health` — server-side health check
- `/api/chat` — the route handler that streams from Claude

## Required: Google AI (Gemini) API key — free, no credit card

This project uses Google's Gemini API instead of Claude directly, specifically because it has a genuinely free tier that requires no credit card or billing setup — a deliberate substitution made due to budget constraints. The AI SDK abstracts model providers behind the same interface, so the actual pattern being demonstrated (streaming, `useChat`, scroll-pinning, stop-button handling) is identical regardless of which model sits behind it — see the note at the top of `src/lib/ai-config.ts`.

1. Go to **aistudio.google.com/apikey**
2. Sign in with any Google account — no card required
3. Click "Create API Key"
4. Local dev: create a `.env.local` file in the project root:
   ```
   GOOGLE_GENERATIVE_AI_API_KEY=your_key_here
   ```
5. On Vercel: Project Settings → Environment Variables → add `GOOGLE_GENERATIVE_AI_API_KEY` there.

## Local setup

```
npm install
npm run dev
```

## Architecture notes

- `src/lib/ai-config.ts` — single place holding the model choice and system prompt. FE-07 extends this same file rather than duplicating config.
- `src/app/api/chat/route.ts` — server-only route handler. `ANTHROPIC_API_KEY` is read here via the SDK directly from the server environment; it is never sent to or readable by the browser.
- `src/components/ChatWindow.tsx` — client component using `useChat`. Handles:
  - **Scroll pinning**: auto-scrolls to bottom only while the user hasn't scrolled up; shows a "Jump to latest" button once they have.
  - **Stop button**: swaps to a Stop button while streaming; calling `stop()` ends the request but keeps the partial message and immediately re-enables the input for the next send.
  - **Thinking indicator**: shown only during the `submitted` status, before the first token arrives — disappears the same render real text starts streaming in.

## Testing this properly

Don't just read the code — actually run it and:
1. Send a message, confirm text streams in token-by-token, not all at once.
2. Send a long question, click Stop mid-stream, confirm the partial text stays and you can immediately send another message.
3. Scroll up while it's streaming, confirm it stops auto-scrolling and shows "Jump to latest."
4. Resize to phone width (375px) and confirm the input and messages still work.
