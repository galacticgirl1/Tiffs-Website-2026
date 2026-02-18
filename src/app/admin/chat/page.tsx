"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Send,
  MessageCircle,
  User,
  Clock,
  XCircle,
  CheckCircle,
} from "lucide-react";
import {
  getConversations,
  getMessages,
  sendMessage,
  markConversationRead,
  closeConversation,
  Conversation,
  ChatMessage,
} from "@/lib/chat";

export default function AdminChatPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConvo, setActiveConvo] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setConversations(getConversations());

    pollRef.current = setInterval(() => {
      setConversations(getConversations());
      if (activeConvo) {
        setMessages(getMessages(activeConvo));
      }
    }, 2000);

    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [activeConvo]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function selectConversation(id: string) {
    setActiveConvo(id);
    setMessages(getMessages(id));
    markConversationRead(id);
    setConversations(getConversations());
  }

  function handleSend() {
    const text = input.trim();
    if (!text || !activeConvo) return;

    sendMessage(activeConvo, "admin", text);
    setInput("");
    setMessages(getMessages(activeConvo));
    setConversations(getConversations());
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function handleClose(id: string) {
    closeConversation(id);
    setConversations(getConversations());
    if (activeConvo === id) {
      setActiveConvo(null);
      setMessages([]);
    }
  }

  function formatTime(timestamp: string) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return date.toLocaleDateString();
  }

  function formatMessageTime(timestamp: string) {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
  }

  const totalUnread = conversations.reduce((sum, c) => sum + c.unreadCount, 0);
  const activeConversations = conversations.filter((c) => c.status === "active");
  const closedConversations = conversations.filter((c) => c.status === "closed");

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      {/* Header */}
      <header className="bg-brand-dark text-white flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link
                href="/admin"
                className="flex items-center gap-2 text-brand-cream/60 hover:text-white transition-colors text-sm"
              >
                <ArrowLeft size={16} />
                Admin Panel
              </Link>
              <span className="text-brand-cream/30">|</span>
              <h1 className="text-lg font-display font-bold text-white flex items-center gap-2">
                <MessageCircle size={18} />
                Live Chat
                {totalUnread > 0 && (
                  <span className="bg-rose-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {totalUnread}
                  </span>
                )}
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Layout */}
      <div className="flex-1 flex overflow-hidden" style={{ height: "calc(100vh - 64px)" }}>
        {/* Sidebar - Conversations */}
        <div className="w-80 bg-white border-r border-brand-cream flex flex-col flex-shrink-0">
          <div className="px-4 py-3 border-b border-brand-cream">
            <p className="text-xs font-bold uppercase tracking-wider text-brand-medium">
              Conversations ({activeConversations.length})
            </p>
          </div>

          <div className="flex-1 overflow-y-auto">
            {conversations.length === 0 ? (
              <div className="text-center py-12 px-4">
                <MessageCircle size={32} className="text-brand-light mx-auto mb-3" />
                <p className="text-sm text-brand-medium">No conversations yet</p>
                <p className="text-xs text-brand-light mt-1">
                  Customer messages will appear here
                </p>
              </div>
            ) : (
              <>
                {activeConversations.map((convo) => (
                  <button
                    key={convo.id}
                    onClick={() => selectConversation(convo.id)}
                    className={`w-full text-left px-4 py-3 border-b border-brand-cream/50 hover:bg-cream transition-colors ${
                      activeConvo === convo.id ? "bg-cream" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-brand-dark/10 flex items-center justify-center flex-shrink-0">
                          <User size={14} className="text-brand-dark" />
                        </div>
                        <span className="text-sm font-semibold text-brand-dark truncate">
                          {convo.customerName}
                        </span>
                      </div>
                      {convo.unreadCount > 0 && (
                        <span className="bg-rose-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0">
                          {convo.unreadCount}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-brand-light truncate pl-10">
                      {convo.lastMessage}
                    </p>
                    <p className="text-[10px] text-brand-light/60 pl-10 mt-0.5 flex items-center gap-1">
                      <Clock size={10} />
                      {formatTime(convo.lastTimestamp)}
                    </p>
                  </button>
                ))}

                {closedConversations.length > 0 && (
                  <>
                    <div className="px-4 py-2 bg-brand-cream/50">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-brand-light">
                        Closed ({closedConversations.length})
                      </p>
                    </div>
                    {closedConversations.map((convo) => (
                      <button
                        key={convo.id}
                        onClick={() => selectConversation(convo.id)}
                        className={`w-full text-left px-4 py-3 border-b border-brand-cream/50 hover:bg-cream transition-colors opacity-60 ${
                          activeConvo === convo.id ? "bg-cream opacity-100" : ""
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                            <User size={14} className="text-gray-400" />
                          </div>
                          <span className="text-sm font-semibold text-brand-dark truncate">
                            {convo.customerName}
                          </span>
                        </div>
                        <p className="text-xs text-brand-light truncate pl-10">
                          {convo.lastMessage}
                        </p>
                      </button>
                    ))}
                  </>
                )}
              </>
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {activeConvo ? (
            <>
              {/* Chat Header */}
              <div className="bg-white border-b border-brand-cream px-6 py-3 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-brand-dark/10 flex items-center justify-center">
                    <User size={16} className="text-brand-dark" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-brand-dark">
                      {conversations.find((c) => c.id === activeConvo)?.customerName || "Guest"}
                    </p>
                    <p className="text-[10px] text-brand-light">
                      {conversations.find((c) => c.id === activeConvo)?.status === "active"
                        ? "Active conversation"
                        : "Closed"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {conversations.find((c) => c.id === activeConvo)?.status === "active" && (
                    <button
                      onClick={() => handleClose(activeConvo)}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs text-brand-light hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                    >
                      <XCircle size={14} />
                      Close
                    </button>
                  )}
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3 bg-cream/30">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.sender === "admin" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        msg.sender === "admin"
                          ? "bg-brand-dark text-brand-cream rounded-br-md"
                          : "bg-white text-brand-dark rounded-bl-md shadow-sm border border-brand-cream"
                      }`}
                    >
                      <p className="whitespace-pre-wrap break-words">{msg.text}</p>
                      <p
                        className={`text-[10px] mt-1 ${
                          msg.sender === "admin"
                            ? "text-brand-cream/50"
                            : "text-brand-light"
                        }`}
                      >
                        {formatMessageTime(msg.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              {conversations.find((c) => c.id === activeConvo)?.status === "active" && (
                <div className="border-t border-brand-cream px-4 py-3 bg-white flex-shrink-0">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type a reply..."
                      className="flex-1 px-4 py-2.5 rounded-xl bg-cream border border-brand-cream text-sm text-brand-dark placeholder:text-brand-light focus:outline-none focus:ring-2 focus:ring-brand-dark"
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
              )}
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageCircle size={48} className="text-brand-light mx-auto mb-4" />
                <p className="text-brand-medium text-lg">Select a conversation</p>
                <p className="text-sm text-brand-light mt-1">
                  Choose a customer chat from the sidebar to respond
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
