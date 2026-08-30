import ChatWindow from "@/components/ChatWindow";

export default function ChatPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Ask About My Work</h1>
      <p className="text-gray-400 text-sm mb-6">
      A streaming chat, scoped to my portfolio — ask about any project or how I approached it.
      </p>
      <ChatWindow />
    </div>
  );
}
