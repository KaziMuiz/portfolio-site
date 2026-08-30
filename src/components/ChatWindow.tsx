"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState } from "react";

/**
 * The scroll-pinning behavior below is the part the mentor tips flagged as
 * where most submissions quietly fail: we only auto-scroll to the bottom
 * while the user is *already* at the bottom. The moment they scroll up to
 * re-read something, we stop yanking them back down, and show a small
 * "Jump to latest" button instead.
 */
function useStickyScroll(deps: unknown[]) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPinned, setIsPinned] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    function handleScroll() {
      if (!el) return;
      const distanceFromBottom =
        el.scrollHeight - el.scrollTop - el.clientHeight;
      setIsPinned(distanceFromBottom < 40);
    }

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !isPinned) return;
    el.scrollTop = el.scrollHeight;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  function jumpToLatest() {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
    setIsPinned(true);
  }

  return { containerRef, isPinned, jumpToLatest };
}

export default function ChatWindow() {
  const { messages, sendMessage, status, stop } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });
  const [input, setInput] = useState("");

  const { containerRef, isPinned, jumpToLatest } = useStickyScroll([
    messages,
    status,
  ]);

  const isStreaming = status === "streaming" || status === "submitted";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isStreaming) return;
    sendMessage({ text: trimmed });
    setInput("");
  }

  return (
    <div className="flex flex-col h-[70vh] border border-gray-800 rounded-lg overflow-hidden relative">
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {messages.length === 0 && (
          <p className="text-sm text-gray-500">
            Ask about my projects, my role in them, or how I work.
          </p>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[85%] sm:max-w-[75%] rounded-lg px-3 py-2 text-sm whitespace-pre-wrap ${
                message.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-100"
              }`}
            >
              {message.parts.map((part, i) =>
                part.type === "text" ? (
                  <span key={i}>{part.text}</span>
                ) : null
              )}
            </div>
          </div>
        ))}

        {/* Thinking indicator: shown only in the gap before the first token
            arrives. Once real text parts exist on the last message, this
            disappears the same render the text appears in — a handoff,
            not a flicker. */}
        {status === "submitted" && (
          <div className="flex justify-start">
            <div className="bg-gray-800 text-gray-400 rounded-lg px-3 py-2 text-sm">
              <span className="inline-flex gap-1">
                <span className="animate-pulse">●</span>
                <span className="animate-pulse [animation-delay:150ms]">
                  ●
                </span>
                <span className="animate-pulse [animation-delay:300ms]">
                  ●
                </span>
              </span>
            </div>
          </div>
        )}
      </div>

      {!isPinned && (
        <button
          onClick={jumpToLatest}
          className="absolute bottom-20 right-4 bg-gray-700 hover:bg-gray-600 text-white text-xs px-3 py-1.5 rounded-full shadow-lg"
        >
          Jump to latest ↓
        </button>
      )}

      <form
        onSubmit={handleSubmit}
        className="border-t border-gray-800 p-3 flex gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          disabled={isStreaming}
          className="flex-1 min-w-0 bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-sm text-white disabled:opacity-50"
        />
        {isStreaming ? (
          <button
            type="button"
            onClick={stop}
            className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-500 text-white text-sm font-medium shrink-0"
          >
            Stop
          </button>
        ) : (
          <button
            type="submit"
            disabled={!input.trim()}
            className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white text-sm font-medium shrink-0"
          >
            Send
          </button>
        )}
      </form>
    </div>
  );
}
