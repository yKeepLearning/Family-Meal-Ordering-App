import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChefHat, Clock, CheckCircle2, Flame, StickyNote } from "lucide-react";
import { type Order } from "./menu-data";

type Props = {
  orders: Order[];
  onUpdateStatus: (orderId: string, status: Order["status"]) => void;
};

const STATUS_CONFIG = {
  pending: { label: "待处理", color: "bg-amber-100 text-amber-800 border-amber-200", dot: "bg-amber-500" },
  preparing: { label: "备菜中", color: "bg-blue-100 text-blue-800 border-blue-200", dot: "bg-blue-500" },
  ready: { label: "已完成", color: "bg-green-100 text-green-800 border-green-200", dot: "bg-green-500" },
};

export function ChefView({ orders, onUpdateStatus }: Props) {
  const [filter, setFilter] = useState<Order["status"] | "all">("all");

  const filtered = filter === "all" ? orders : orders.filter(o => o.status === filter);
  const counts = {
    pending: orders.filter(o => o.status === "pending").length,
    preparing: orders.filter(o => o.status === "preparing").length,
    ready: orders.filter(o => o.status === "ready").length,
  };

  return (
    <div className="flex flex-col h-full bg-background" style={{ fontFamily: "'Nunito', sans-serif" }}>
      {/* 顶部标题栏 */}
      <div className="bg-foreground text-card px-5 pt-8 pb-5">
        <div className="flex items-center gap-3 mb-1">
          <ChefHat size={22} className="opacity-80" />
          <p className="text-xs tracking-widest uppercase opacity-60">厨房显示屏</p>
        </div>
        <h1 style={{ fontFamily: "'Lora', serif", fontSize: "1.5rem", fontWeight: 600, lineHeight: 1.2 }}>
          厨师工作台
        </h1>
        <div className="flex gap-4 mt-3">
          {(["pending", "preparing", "ready"] as const).map(s => (
            <div key={s} className="flex items-center gap-1.5">
              <div className={`w-2 h-2 rounded-full ${STATUS_CONFIG[s].dot}`} />
              <span style={{ fontSize: "0.78rem", opacity: 0.8 }}>{counts[s]} {STATUS_CONFIG[s].label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 筛选标签 */}
      <div className="flex gap-2 px-4 py-3 border-b border-border bg-card overflow-x-auto">
        {(["all", "pending", "preparing", "ready"] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full whitespace-nowrap transition-all ${
              filter === f
                ? "bg-foreground text-card"
                : "bg-secondary text-foreground hover:bg-muted"
            }`}
            style={{ fontSize: "0.82rem", fontWeight: 600 }}
          >
            {f === "all"
              ? `全部（${orders.length}）`
              : `${STATUS_CONFIG[f].label}（${counts[f]}）`}
          </button>
        ))}
      </div>

      {/* 订单列表 */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 gap-3 text-muted-foreground">
            <Flame size={36} className="opacity-30" />
            <p style={{ fontSize: "0.9rem" }}>暂无订单，厨房还在等待中</p>
          </div>
        ) : (
          <AnimatePresence>
            {filtered.map(order => (
              <motion.div
                key={order.id}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.22 }}
                className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm"
              >
                {/* 订单头部 */}
                <div className="flex items-start justify-between px-4 pt-4 pb-3 border-b border-border">
                  <div>
                    <div className="flex items-center gap-2">
                      <span style={{ fontFamily: "'Lora', serif", fontWeight: 600, fontSize: "1rem" }}>
                        第 {order.id.split("-")[1]} 单
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border ${STATUS_CONFIG[order.status].color}`}
                        style={{ fontSize: "0.7rem", fontWeight: 700 }}
                      >
                        <div className={`w-1.5 h-1.5 rounded-full ${STATUS_CONFIG[order.status].dot}`} />
                        {STATUS_CONFIG[order.status].label}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="flex items-center gap-1 text-muted-foreground" style={{ fontSize: "0.75rem" }}>
                        <Clock size={12} /> {formatTime(order.submittedAt)}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {order.status === "pending" && (
                      <button
                        onClick={() => onUpdateStatus(order.id, "preparing")}
                        className="px-3 py-1.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                        style={{ fontSize: "0.75rem", fontWeight: 700 }}
                      >
                        开始备菜
                      </button>
                    )}
                    {order.status === "preparing" && (
                      <button
                        onClick={() => onUpdateStatus(order.id, "ready")}
                        className="px-3 py-1.5 rounded-xl bg-green-600 text-white hover:bg-green-700 transition-colors"
                        style={{ fontSize: "0.75rem", fontWeight: 700 }}
                      >
                        完成 ✓
                      </button>
                    )}
                    {order.status === "ready" && (
                      <CheckCircle2 size={20} className="text-green-600 mt-0.5" />
                    )}
                  </div>
                </div>

                {/* 按类别分组的菜品 */}
                <div className="px-4 py-3 space-y-3">
                  {groupByCategory(order.items).map(([cat, items]) => (
                    <div key={cat}>
                      <p className="text-muted-foreground mb-1.5" style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        {cat}
                      </p>
                      <div className="space-y-1.5">
                        {items.map(item => (
                          <div key={item.dish.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span style={{ fontSize: "1.1rem" }}>{item.dish.emoji}</span>
                              <span style={{ fontWeight: 600, fontSize: "0.88rem" }}>{item.dish.name}</span>
                            </div>
                            <span
                              className="bg-primary text-primary-foreground rounded-full px-2.5 py-0.5"
                              style={{ fontSize: "0.8rem", fontWeight: 700 }}
                            >
                              ×{item.quantity}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  {order.note && (
                    <div className="flex gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3 mt-2">
                      <StickyNote size={14} className="text-amber-600 shrink-0 mt-0.5" />
                      <p style={{ fontSize: "0.8rem", color: "#92400e" }}>{order.note}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

function groupByCategory(items: Order["items"]): [string, Order["items"]][] {
  const map = new Map<string, Order["items"]>();
  for (const item of items) {
    if (!map.has(item.categoryName)) map.set(item.categoryName, []);
    map.get(item.categoryName)!.push(item);
  }
  return Array.from(map.entries());
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", hour12: false });
}
