"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  CreditCard,
  Trash2,
  ChevronDown,
  ChevronUp,
  ClipboardList,
} from "lucide-react";
import {
  getOrders,
  updateOrderStatus,
  deleteOrder,
  Order,
} from "@/lib/orders";

const STATUS_CONFIG: Record<
  Order["status"],
  { label: string; color: string; icon: React.ReactNode }
> = {
  pending: {
    label: "Pending",
    color: "bg-yellow-100 text-yellow-800",
    icon: <Clock size={14} />,
  },
  paid: {
    label: "Paid",
    color: "bg-blue-100 text-blue-800",
    icon: <CreditCard size={14} />,
  },
  shipped: {
    label: "Shipped",
    color: "bg-purple-100 text-purple-800",
    icon: <Truck size={14} />,
  },
  delivered: {
    label: "Delivered",
    color: "bg-green-100 text-green-800",
    icon: <CheckCircle size={14} />,
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-red-100 text-red-800",
    icon: <XCircle size={14} />,
  },
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    setOrders(getOrders());
  }, []);

  function showSaved(msg: string) {
    setSaveMessage(msg);
    setTimeout(() => setSaveMessage(""), 3000);
  }

  function handleStatusChange(orderId: string, newStatus: Order["status"]) {
    updateOrderStatus(orderId, newStatus);
    setOrders(getOrders());
    showSaved(`Order updated to ${newStatus}`);
  }

  function handleDelete(orderId: string) {
    if (confirm("Are you sure you want to delete this order?")) {
      deleteOrder(orderId);
      setOrders(getOrders());
      showSaved("Order deleted");
    }
  }

  function handleNotesChange(orderId: string, notes: string) {
    const order = orders.find((o) => o.id === orderId);
    if (order) {
      updateOrderStatus(orderId, order.status, notes);
      setOrders(getOrders());
    }
  }

  const filteredOrders =
    filterStatus === "all"
      ? orders
      : orders.filter((o) => o.status === filterStatus);

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    paid: orders.filter((o) => o.status === "paid").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    revenue: orders
      .filter((o) => o.status !== "cancelled")
      .reduce((sum, o) => sum + o.subtotal, 0),
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-brand-dark text-white">
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
              <h1 className="text-lg font-display font-bold text-white">
                Order Log
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Toast */}
      {saveMessage && (
        <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg text-sm font-medium animate-pulse">
          {saveMessage}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-brand-dark">{stats.total}</p>
            <p className="text-xs text-brand-light uppercase tracking-wider">Total Orders</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            <p className="text-xs text-brand-light uppercase tracking-wider">Pending</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{stats.paid}</p>
            <p className="text-xs text-brand-light uppercase tracking-wider">Paid</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-purple-600">{stats.shipped}</p>
            <p className="text-xs text-brand-light uppercase tracking-wider">Shipped</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{stats.delivered}</p>
            <p className="text-xs text-brand-light uppercase tracking-wider">Delivered</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-brand-gold">${stats.revenue.toFixed(2)}</p>
            <p className="text-xs text-brand-light uppercase tracking-wider">Revenue</p>
          </div>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-sm text-brand-medium font-medium">Filter:</span>
          {["all", "pending", "paid", "shipped", "delivered", "cancelled"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all ${
                filterStatus === status
                  ? "bg-brand-dark text-brand-cream"
                  : "bg-white text-brand-medium hover:bg-brand-dark hover:text-brand-cream"
              }`}
            >
              {status === "all" ? "All" : status}
            </button>
          ))}
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center">
            <ClipboardList size={48} className="text-brand-light mx-auto mb-4" />
            <p className="text-brand-medium text-lg mb-2">
              {orders.length === 0 ? "No orders yet" : "No orders match this filter"}
            </p>
            <p className="text-brand-light text-sm">
              {orders.length === 0
                ? "Orders will appear here once customers complete a purchase."
                : "Try a different filter to see more orders."}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredOrders.map((order) => {
              const statusConfig = STATUS_CONFIG[order.status];
              const isExpanded = expandedOrder === order.id;

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden"
                >
                  {/* Order Summary Row */}
                  <div
                    className="flex items-center gap-4 p-4 cursor-pointer hover:bg-cream/50 transition-colors"
                    onClick={() =>
                      setExpandedOrder(isExpanded ? null : order.id)
                    }
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-brand-dark text-sm">
                          {order.id}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium uppercase ${statusConfig.color}`}
                        >
                          {statusConfig.icon}
                          {statusConfig.label}
                        </span>
                      </div>
                      <p className="text-xs text-brand-light">
                        {new Date(order.createdAt).toLocaleString()} &middot;{" "}
                        {order.items.length} item{order.items.length !== 1 ? "s" : ""} &middot;{" "}
                        {order.customerEmail || "No email"}
                      </p>
                    </div>

                    <span className="text-lg font-bold text-brand-gold whitespace-nowrap">
                      ${order.subtotal.toFixed(2)}
                    </span>

                    {isExpanded ? (
                      <ChevronUp size={18} className="text-brand-light" />
                    ) : (
                      <ChevronDown size={18} className="text-brand-light" />
                    )}
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="border-t border-brand-cream px-4 py-4 space-y-4">
                      {/* Items */}
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-brand-medium mb-2">
                          Items
                        </h4>
                        <div className="space-y-2">
                          {order.items.map((item, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-3 bg-cream rounded-lg p-2"
                            >
                              <div className="w-10 h-10 rounded-lg overflow-hidden bg-brand-cream flex-shrink-0">
                                {item.imageUrl ? (
                                  <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center">
                                    <Package size={16} className="text-brand-light" />
                                  </div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-brand-dark truncate">
                                  {item.name}
                                </p>
                                <p className="text-xs text-brand-light">
                                  Qty: {item.quantity} x ${item.price.toFixed(2)}
                                </p>
                              </div>
                              <span className="text-sm font-bold text-brand-dark">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Shipping */}
                      {order.shippingAddress && (
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-brand-medium mb-1">
                            Shipping Address
                          </h4>
                          <p className="text-sm text-brand-light">
                            {order.shippingAddress}
                          </p>
                        </div>
                      )}

                      {/* Notes */}
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-brand-medium mb-1">
                          Notes
                        </h4>
                        <textarea
                          value={order.notes}
                          onChange={(e) =>
                            handleNotesChange(order.id, e.target.value)
                          }
                          rows={2}
                          className="w-full px-3 py-2 rounded-lg border border-brand-cream bg-cream text-sm text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-gold resize-none"
                          placeholder="Add notes about this order..."
                        />
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap items-center gap-2 pt-2">
                        <span className="text-xs text-brand-medium font-medium mr-1">
                          Update status:
                        </span>
                        {(
                          ["pending", "paid", "shipped", "delivered", "cancelled"] as const
                        ).map((status) => (
                          <button
                            key={status}
                            onClick={() => handleStatusChange(order.id, status)}
                            disabled={order.status === status}
                            className={`px-3 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider transition-all ${
                              order.status === status
                                ? STATUS_CONFIG[status].color + " opacity-50 cursor-not-allowed"
                                : "bg-brand-cream text-brand-medium hover:bg-brand-dark hover:text-brand-cream"
                            }`}
                          >
                            {status}
                          </button>
                        ))}

                        <div className="flex-1" />

                        <button
                          onClick={() => handleDelete(order.id)}
                          className="flex items-center gap-1 px-3 py-1 text-xs text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 size={12} />
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
