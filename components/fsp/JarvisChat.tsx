"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function JarvisChat({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi there! 👋 Welcome to FSP. I'm Jarvis. Ask me about FSP programs, certification, community, or how to join!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => { scrollToBottom(); }, [messages]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;
    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/jarvis", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: trimmed }) });
      const data = await res.json();
      if (data.reply) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
        setSuggestions(data.suggestions || []);
      }
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "I'm having trouble connecting." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } };
  const handleSuggestionClick = (text: string) => setInput(text);

  return (
    <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }} className="fixed bottom-24 right-6 z-50 w-[340px] sm:w-[380px] rounded-2xl bg-white shadow-2xl border border-line overflow-hidden">
      <div className="bg-navy px-4 py-3 flex items-center justify-between">
        <div><p className="text-white font-semibold text-sm">FSP Assistant</p><p className="text-on-dark-muted text-xs">Jarvis</p></div>
        <button onClick={onClose} className="text-on-dark-muted hover:text-white transition-colors p-1 rounded focus:outline-none focus:ring-2 focus:ring-orange" aria-label="Close chat"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><path d="M18 6L6 18M6 6l12 12" /></svg></button>
      </div>
      <div className="h-72 overflow-y-auto p-4 space-y-3 bg-paper">
        {messages.map((msg, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={cn("flex items-end gap-2 text-sm", msg.role === "user" ? "justify-end" : "justify-start")}>
            {msg.role === "assistant" && <div className="h-6 w-6 rounded-full bg-navy flex items-center justify-center shrink-0 mt-1"><span className="text-white text-xs font-bold">F</span></div>}
            <div className={cn("max-w-[85%] rounded-xl px-3 py-2 text-[0.875rem] leading-relaxed whitespace-pre-line", msg.role === "user" ? "bg-navy text-white rounded-br-sm" : "bg-white border border-line text-ink rounded-bl-sm")}>{msg.content}</div>
          </motion.div>
        ))}
        {loading && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-end gap-2 text-sm"><div className="h-6 w-6 rounded-full bg-navy flex items-center justify-center shrink-0 mt-1"><span className="text-white text-xs font-bold">F</span></div><div className="bg-white border border-line rounded-xl rounded-bl-sm px-3 py-2"><div className="flex gap-1"><span className="h-2 w-2 bg-muted rounded-full animate-bounce" style={{ animationDelay: "0ms" }} /><span className="h-2 w-2 bg-muted rounded-full animate-bounce" style={{ animationDelay: "150ms" }} /><span className="h-2 w-2 bg-muted rounded-full animate-bounce" style={{ animationDelay: "300ms" }} /></div></div></motion.div>}
        <div ref={messagesEndRef} />
      </div>
      <AnimatePresence>
        {suggestions.length > 0 && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="border-t border-line px-4 py-2 bg-white"><div className="flex flex-wrap gap-2">{suggestions.map((s, i) => <button key={i} onClick={() => handleSuggestionClick(s)} className="text-xs text-navy border border-navy/20 rounded-full px-3 py-1 hover:bg-navy hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-orange">{s}</button>)}</div></motion.div>}
      </AnimatePresence>
      <div className="border-t border-line px-4 py-3 bg-white"><div className="flex gap-2"><input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="Ask me about FSP..." className="flex-1 border border-line rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent" disabled={loading} /><button onClick={sendMessage} disabled={loading || !input.trim()} className="bg-navy text-white rounded-lg px-4 py-2 text-sm font-semibold hover:bg-ink disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-orange"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg></button></div></div>
    </motion.div>
  );
}
