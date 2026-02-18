"use client";

export interface OrderItem {
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export interface Order {
  id: string;
  stripeSessionId: string;
  items: OrderItem[];
  subtotal: number;
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
  customerEmail: string;
  shippingAddress: string;
  createdAt: string;
  updatedAt: string;
  notes: string;
}

const ORDERS_KEY = "mbs_orders";

export function getOrders(): Order[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(ORDERS_KEY);
  if (!stored) return [];
  return JSON.parse(stored);
}

export function saveOrders(orders: Order[]) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

export function addOrder(order: Omit<Order, "id" | "createdAt" | "updatedAt">): Order {
  const orders = getOrders();
  const newOrder: Order = {
    ...order,
    id: `MBS-${Date.now().toString(36).toUpperCase()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  orders.unshift(newOrder);
  saveOrders(orders);
  return newOrder;
}

export function updateOrderStatus(
  id: string,
  status: Order["status"],
  notes?: string
): Order | null {
  const orders = getOrders();
  const order = orders.find((o) => o.id === id);
  if (!order) return null;
  order.status = status;
  order.updatedAt = new Date().toISOString();
  if (notes !== undefined) order.notes = notes;
  saveOrders(orders);
  return order;
}

export function getOrderBySessionId(sessionId: string): Order | null {
  const orders = getOrders();
  return orders.find((o) => o.stripeSessionId === sessionId) || null;
}

export function deleteOrder(id: string): boolean {
  const orders = getOrders();
  const filtered = orders.filter((o) => o.id !== id);
  if (filtered.length === orders.length) return false;
  saveOrders(filtered);
  return true;
}
