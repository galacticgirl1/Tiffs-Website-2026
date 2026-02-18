"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Minimize2 } from "lucide-react";
import {
  getCustomerId,
  getMessages,
  sendMessage,
  markCustomerMessagesRead,
  getUnreadCustomerCount,
  ChatMessage,
} from "@/lib/chat";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [nameSet, setNameSet] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const customerId = useRef("");
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    customerId.current = getCustomerId();
    const msgs = getMessages(customerId.current);
    setMessages(msgs);
    if (msgs.length > 0) {
      setNameSet(true);
    }
    setUnreadCount(getUnreadCustomerCount(customerId.current));

    pollRef.current = setInterval(() => {
      const updated = getMessages(customerId.current);
      setMessages(updated);
      if (!isOpen) {
        setUnreadCount(getUnreadCustomerCount(customerId.current));
      }
    }, 2000);

    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  useEffect(() => {
    if (isOpen && customerId.current) {
      markCustomerMessagesRead(customerId.current);
      setUnreadCount(0);
    }
  }, [isOpen, messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSend() {
    const text = input.trim();
    if (!text) return;

    if (!nameSet) {
      setCustomerName(text);
      setNameSet(true);
      sendMessage(customerId.current, "customer", text, text);
      setInput("");
      const updated = getMessages(customerId.current);
      setMessages(updated);

      setTimeout(() => {
        sendMessage(
          customerId.current,
          "admin",
          `Hi ${text}! Thanks for reaching out to Reactivate MBS. How can we help you today?`,
          text
        );
        setMessages(getMessages(customerId.current));
      }, 1000);
      return;
    }

    sendMessage(customerId.current, "customer", text, customerName);
    setInput("");
    setMessages(getMessages(customerId.current));
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function formatTime(timestamp: string) {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
  }

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-brand-dark text-brand-cream rounded-full shadow-lg hover:bg-brand-medium transition-all duration-300 flex items-center justify-center group"
        >
          <MessageCircle size={24} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-40 w-[360px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-brand-cream"
          style={{ height: "480px" }}
        >
          {/* Header */}
          <div className="bg-brand-dark text-white px-4 py-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                <MessageCircle size={16} className="text-brand-dark" />
              </div>
              <div>
                <p className="text-sm font-semibold text-brand-cream">
                  Reactivate MBS
                </p>
                <p className="text-[10px] text-brand-cream/60">
                  Live Support
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-brand-cream/60 hover:text-brand-cream transition-colors"
              >
                <Minimize2 size={16} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-brand-cream/60 hover:text-brand-cream transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-cream/50">
            {/* Welcome message */}
            {messages.length === 0 && !nameSet && (
              <div className="text-center py-6">
                <div className="w-12 h-12 bg-brand-dark/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MessageCircle size={24} className="text-brand-dark" />
                </div>
                <p className="text-sm font-semibold text-brand-dark mb-1">
                  Welcome to Reactivate MBS!
                </p>
                <p className="text-xs text-brand-light mb-4">
                  We&apos;re here to help. What&apos;s your name?
                </p>
              </div>
            )}

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "customer" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === "customer"
                      ? "bg-brand-dark text-brand-cream rounded-br-md"
                      : "bg-white text-brand-dark rounded-bl-md shadow-sm border border-brand-cream"
                  }`}
                >
                  <p className="whitespace-pre-wrap break-words">{msg.text}</p>
                  <p
                    className={`text-[10px] mt-1 ${
                      msg.sender === "customer"
                        ? "text-brand-cream/50"
                        : "text-brand-light"
                    }`}
                  >
                    {formatTime(msg.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-brand-cream px-3 py-3 flex-shrink-0 bg-white">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  !nameSet
                    ? "Type your name..."
                    : "Type a message..."
                }
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-cream border border-brand-cream text-sm text-brand-dark placeholder:text-brand-light focus:outline-none focus:ring-2 focus:ring-brand-dark"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="w-10 h-10 rounded-xl bg-brand-dark text-brand-cream flex items-center justify-center hover:bg-brand-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
