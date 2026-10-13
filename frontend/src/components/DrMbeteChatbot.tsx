// DrMbeteChatbot.tsx
import { MessageSquare, Send, X } from "lucide-react";
import { type FormEvent, useEffect, useRef, useState } from "react";
import avatarDrMbete from "../assets/Pic1.Aly.Mbegte.jpg";

const API_URL = `${import.meta.env.VITE_API_URL}/api/chatbot/message`;

type Sender = "user" | "bot";

interface ChatMessage {
  id: string;
  sender: Sender;
  text: string;
}

interface MessageBubbleProps {
  sender: Sender;
  text: string;
}

/* ======================
  Utils sécurité
====================== */
const sanitizeText = (text: string) =>
  text.replace(/</g, "&lt;").replace(/>/g, "&gt;");

/* ======================
  Message Bubble
====================== */
const MessageBubble = ({ sender, text }: MessageBubbleProps) => {
  const isUser = sender === "user";

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`my-1 max-w-xs rounded-xl px-4 py-3 shadow-sm sm:max-w-md ${
          isUser
            ? "ml-auto rounded-br-none bg-green-500 text-white"
            : "mr-auto rounded-tl-none bg-gray-100 text-gray-800"
        }`}
      >
        {sanitizeText(text)}
      </div>
    </div>
  );
};

/* ======================
    Chatbot
====================== */
const DrMbeteChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: crypto.randomUUID(),
      sender: "bot",
      text: "Salam 👋🏾 Je suis votre assistant citoyen 😊 Comment puis-je vous aider aujourd’hui ?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* ======================
    Scroll auto
  ====================== */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ======================
    Focus input à l'ouverture
  ====================== */
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  /* ======================
    Envoi message
  ====================== */
  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();

    // Ajout message user
    setMessages((prev) => [
      ...prev.slice(-50),
      { id: crypto.randomUUID(), sender: "user", text: userMessage },
    ]);

    setInput("");
    setIsLoading(true);

    try {
      // Timeout sécurité
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8000);

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!response.ok) {
        throw new Error("Erreur serveur");
      }

      const data = await response.json();

      const safeText =
        typeof data?.response === "string"
          ? data.response
          : "Je n’ai pas bien compris 🤔 Peux-tu reformuler ?";

      // Ajout réponse bot
      setMessages((prev) => [
        ...prev.slice(-50),
        {
          id: crypto.randomUUID(),
          sender: "bot",
          text: safeText,
        },
      ]);
    } catch (error) {
      console.error("Erreur frontend chatbot:", error);

      setMessages((prev) => [
        ...prev.slice(-50),
        {
          id: crypto.randomUUID(),
          sender: "bot",
          text: "Un petit souci technique est survenu ⚡ Réessaie dans quelques instants.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const COLOR_PRIMARY = "bg-blue-800";

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Bouton flottant */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Fermer le chatbot" : "Ouvrir le chatbot"}
        className={`flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-xl transition ${
          isOpen ? "rotate-90 scale-90" : "hover:scale-110"
        }`}
      >
        {isOpen ? <X /> : <MessageSquare />}
      </button>

      {/* Fenêtre chatbot */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[90vw] max-w-sm h-125 bg-white rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden border border-slate-100">
          {/* Header */}
          <div
            className={`${COLOR_PRIMARY} text-white p-6 flex items-center gap-3`}
          >
            <img
              src={avatarDrMbete}
              alt="Avatar de Dr. Mbegté"
              className="w-10 h-10 rounded-full object-cover border-2 border-white"
            />
            <div>
              <h3 className="text-lg font-extrabold leading-tight">
                Dr. Mbegté
              </h3>
              <p className="text-xs text-blue-200">Votre assistant citoyen</p>
            </div>
          </div>

          {/* Messages */}
          <section
            className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50"
            role="log"
            aria-live="polite"
            aria-busy={isLoading}
          >
            {messages.map((msg) => (
              <MessageBubble key={msg.id} sender={msg.sender} text={msg.text} />
            ))}

            {isLoading && (
              <div className="rounded-xl bg-gray-100 p-3 text-sm animate-pulse">
                Dr. Mbegté écrit…
              </div>
            )}

            <div ref={messagesEndRef} />
          </section>

          {/* Input */}
          <form
            onSubmit={handleSendMessage}
            className="flex border-t bg-white p-3"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value.slice(0, 500))}
              placeholder="Écrivez votre message…"
              aria-label="Message"
              className="flex-1 rounded-l-lg border p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              disabled={isLoading}
            />

            <button
              type="submit"
              disabled={isLoading}
              aria-label="Envoyer"
              className="flex w-12 items-center justify-center rounded-r-lg bg-blue-800 text-white transition hover:bg-blue-700 disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default DrMbeteChatbot;
