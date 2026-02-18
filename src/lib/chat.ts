"use client";

export interface ChatMessage {
  id: string;
  conversationId: string;
  sender: "customer" | "admin";
  text: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  customerName: string;
  lastMessage: string;
  lastTimestamp: string;
  unreadCount: number;
  status: "active" | "closed";
}

const CONVERSATIONS_KEY = "mbs_conversations";
const MESSAGES_KEY = "mbs_chat_messages";
const CUSTOMER_ID_KEY = "mbs_customer_chat_id";

export function getCustomerId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem(CUSTOMER_ID_KEY);
  if (!id) {
    id = "guest-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    localStorage.setItem(CUSTOMER_ID_KEY, id);
  }
  return id;
}

export function getConversations(): Conversation[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(CONVERSATIONS_KEY);
  if (!stored) return [];
  return JSON.parse(stored);
}

function saveConversations(convos: Conversation[]) {
  localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(convos));
}

export function getMessages(conversationId: string): ChatMessage[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(MESSAGES_KEY);
  if (!stored) return [];
  const all: ChatMessage[] = JSON.parse(stored);
  return all.filter((m) => m.conversationId === conversationId);
}

function getAllMessages(): ChatMessage[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(MESSAGES_KEY);
  if (!stored) return [];
  return JSON.parse(stored);
}

function saveAllMessages(messages: ChatMessage[]) {
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
}

export function sendMessage(
  conversationId: string,
  sender: "customer" | "admin",
  text: string,
  customerName?: string
): ChatMessage {
  const allMessages = getAllMessages();
  const message: ChatMessage = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    conversationId,
    sender,
    text,
    timestamp: new Date().toISOString(),
    read: false,
  };
  allMessages.push(message);
  saveAllMessages(allMessages);

  const convos = getConversations();
  let convo = convos.find((c) => c.id === conversationId);
  if (!convo) {
    convo = {
      id: conversationId,
      customerName: customerName || "Guest",
      lastMessage: text,
      lastTimestamp: message.timestamp,
      unreadCount: sender === "customer" ? 1 : 0,
      status: "active",
    };
    convos.unshift(convo);
  } else {
    convo.lastMessage = text;
    convo.lastTimestamp = message.timestamp;
    if (sender === "customer") {
      convo.unreadCount += 1;
    }
    convo.status = "active";
  }
  saveConversations(convos);

  return message;
}

export function markConversationRead(conversationId: string) {
  const convos = getConversations();
  const convo = convos.find((c) => c.id === conversationId);
  if (convo) {
    convo.unreadCount = 0;
    saveConversations(convos);
  }

  const allMessages = getAllMessages();
  let changed = false;
  for (const msg of allMessages) {
    if (msg.conversationId === conversationId && msg.sender === "customer" && !msg.read) {
      msg.read = true;
      changed = true;
    }
  }
  if (changed) saveAllMessages(allMessages);
}

export function markCustomerMessagesRead(conversationId: string) {
  const allMessages = getAllMessages();
  let changed = false;
  for (const msg of allMessages) {
    if (msg.conversationId === conversationId && msg.sender === "admin" && !msg.read) {
      msg.read = true;
      changed = true;
    }
  }
  if (changed) saveAllMessages(allMessages);
}

export function getUnreadAdminCount(): number {
  const convos = getConversations();
  return convos.reduce((sum, c) => sum + c.unreadCount, 0);
}

export function closeConversation(conversationId: string) {
  const convos = getConversations();
  const convo = convos.find((c) => c.id === conversationId);
  if (convo) {
    convo.status = "closed";
    saveConversations(convos);
  }
}

export function getUnreadCustomerCount(conversationId: string): number {
  const messages = getMessages(conversationId);
  return messages.filter((m) => m.sender === "admin" && !m.read).length;
}
