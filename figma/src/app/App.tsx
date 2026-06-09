import { useState } from "react";
import { UtensilsCrossed, ChefHat } from "lucide-react";
import { CustomerView } from "./components/CustomerView";
import { ChefView } from "./components/ChefView";
import { type Order, type OrderItem } from "./components/menu-data";


type View = "customer" | "chef";

let orderCounter = 1;

export default function App() {
  const [view, setView] = useState<View>("customer");
  const [orders, setOrders] = useState<Order[]>([]);

  function handleSubmitOrder(items: OrderItem[], note: string) {
    const newOrder: Order = {
      id: `order-${orderCounter++}`,
      items,
      note,
      submittedAt: new Date(),
      status: "pending",
    };
    setOrders(prev => [newOrder, ...prev]);
  }

  function handleUpdateStatus(orderId: string, status: Order["status"]) {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  }

  return (
    <div
      className="flex flex-col h-screen max-w-md mx-auto relative overflow-hidden"
      style={{ fontFamily: "'Nunito', sans-serif" }}
    >
      <div className="flex-1 overflow-hidden">
        {view === "customer" ? (
          <CustomerView onSubmitOrder={handleSubmitOrder} />
        ) : (
          <ChefView orders={orders} onUpdateStatus={handleUpdateStatus} />
        )}
      </div>

      {/* 底部导航 */}
      <div className="bg-card border-t border-border flex">
        <button
          onClick={() => setView("customer")}
          className={`flex-1 flex flex-col items-center gap-1 py-3 transition-colors ${
            view === "customer" ? "text-primary" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <UtensilsCrossed size={20} />
          <span style={{ fontSize: "0.7rem", fontWeight: 600 }}>点菜</span>
        </button>
        <div className="w-px bg-border" />
        <button
          onClick={() => setView("chef")}
          className={`flex-1 flex flex-col items-center gap-1 py-3 relative transition-colors ${
            view === "chef" ? "text-primary" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <div className="relative">
            <ChefHat size={20} />
            {orders.filter(o => o.status === "pending").length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {orders.filter(o => o.status === "pending").length}
              </span>
            )}
          </div>
          <span style={{ fontSize: "0.7rem", fontWeight: 600 }}>厨房</span>
        </button>
      </div>
    </div>
  );
}
