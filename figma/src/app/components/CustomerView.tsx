import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Minus, Plus, ShoppingBag, ChevronRight, Flame, Leaf, Star } from "lucide-react";
import { MENU, type Dish, type OrderItem } from "./menu-data";

type Props = {
  onSubmitOrder: (items: OrderItem[], note: string) => void;
};

const TAG_STYLES: Record<string, string> = {
  "热门": "bg-red-100 text-red-700",
  "厨师推荐": "bg-amber-100 text-amber-700",
  "家庭最爱": "bg-orange-100 text-orange-700",
  "辣": "bg-rose-100 text-rose-700",
  "时令": "bg-teal-100 text-teal-700",
  "养生": "bg-green-100 text-green-700",
};

const TAG_ICONS: Record<string, React.ReactNode> = {
  "辣": <Flame size={10} />,
  "养生": <Leaf size={10} />,
  "厨师推荐": <Star size={10} />,
};

export function CustomerView({ onSubmitOrder }: Props) {
  const [activeCategory, setActiveCategory] = useState(MENU[0].id);
  const [cart, setCart] = useState<Map<string, number>>(new Map());
  const [note, setNote] = useState("");
  const [showCart, setShowCart] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const totalItems = Array.from(cart.values()).reduce((a, b) => a + b, 0);

  function updateCart(dishId: string, delta: number) {
    setCart(prev => {
      const next = new Map(prev);
      const current = next.get(dishId) ?? 0;
      const updated = current + delta;
      if (updated <= 0) next.delete(dishId);
      else next.set(dishId, updated);
      return next;
    });
  }

  function handleSubmit() {
    const items: OrderItem[] = [];
    cart.forEach((qty, id) => {
      for (const cat of MENU) {
        const dish = cat.dishes.find(d => d.id === id);
        if (dish) {
          items.push({ dish, quantity: qty, categoryName: cat.name });
        }
      }
    });
    if (items.length === 0) return;
    onSubmitOrder(items, note);
    setCart(new Map());
    setNote("");
    setShowCart(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

  const activeMenuCategory = MENU.find(c => c.id === activeCategory)!;

  return (
    <div className="flex flex-col h-full bg-background" style={{ fontFamily: "'Nunito', sans-serif" }}>
      {/* 顶部标题栏 */}
      <div className="bg-primary text-primary-foreground px-5 pt-8 pb-5">
        <p className="text-xs tracking-widest uppercase opacity-70 mb-1">家庭聚餐</p>
        <h1 style={{ fontFamily: "'Lora', serif", fontSize: "1.6rem", fontWeight: 600, lineHeight: 1.2 }}>
          家庭点菜
        </h1>
        <p className="mt-1 opacity-80" style={{ fontSize: "0.8rem" }}>选好菜品后提交，厨师马上为您准备</p>
      </div>

      {/* 分类标签 */}
      <div className="flex gap-2 px-4 py-3 border-b border-border bg-card overflow-x-auto">
        {MENU.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
              activeCategory === cat.id
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-secondary text-foreground hover:bg-muted"
            }`}
            style={{ fontSize: "0.85rem", fontWeight: 600 }}
          >
            <span>{cat.emoji}</span>
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* 菜品列表 */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            {activeMenuCategory.dishes.map(dish => (
              <DishCard
                key={dish.id}
                dish={dish}
                quantity={cart.get(dish.id) ?? 0}
                onAdd={() => updateCart(dish.id, 1)}
                onRemove={() => updateCart(dish.id, -1)}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 提交成功提示 */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-green-700 text-white px-6 py-3 rounded-2xl shadow-lg z-50"
            style={{ fontSize: "0.85rem", fontWeight: 600 }}
          >
            ✅ 已成功发送至厨房！
          </motion.div>
        )}
      </AnimatePresence>

      {/* 购物车栏 */}
      {totalItems > 0 && (
        <div className="border-t border-border bg-card px-4 py-3">
          {showCart && (
            <div className="mb-3 space-y-2 max-h-48 overflow-y-auto">
              {Array.from(cart.entries()).map(([id, qty]) => {
                const dish = MENU.flatMap(c => c.dishes).find(d => d.id === id)!;
                return (
                  <div key={id} className="flex items-center justify-between">
                    <span style={{ fontSize: "0.88rem" }}>
                      {dish.emoji} {dish.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateCart(id, -1)}
                        className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center hover:bg-muted"
                      >
                        <Minus size={12} />
                      </button>
                      <span style={{ fontSize: "0.88rem", fontWeight: 600, minWidth: "1rem", textAlign: "center" }}>{qty}</span>
                      <button
                        onClick={() => updateCart(id, 1)}
                        className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                );
              })}
              <textarea
                value={note}
                onChange={e => setNote(e.target.value)}
                placeholder="给厨师的备注（过敏食材、辣度要求等）"
                className="w-full bg-input-background rounded-xl px-3 py-2 outline-none border border-border resize-none mt-2"
                style={{ fontSize: "0.82rem" }}
                rows={2}
              />
            </div>
          )}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowCart(v => !v)}
              className="flex items-center gap-2 flex-1 bg-secondary rounded-2xl px-4 py-3"
            >
              <div className="relative">
                <ShoppingBag size={20} className="text-primary" />
                <span className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              </div>
              <div className="text-left flex-1">
                <p style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>已选 {totalItems} 道菜</p>
              </div>
              <ChevronRight size={16} className={`text-muted-foreground transition-transform ${showCart ? "rotate-90" : ""}`} />
            </button>
            <button
              onClick={handleSubmit}
              className="bg-primary text-primary-foreground rounded-2xl px-6 py-3 hover:opacity-90 active:scale-95 transition-all"
              style={{ fontWeight: 700, fontSize: "0.9rem", whiteSpace: "nowrap" }}
            >
              提交点菜
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function DishCard({
  dish,
  quantity,
  onAdd,
  onRemove,
}: {
  dish: Dish;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
}) {
  return (
    <div className="bg-card rounded-2xl p-4 border border-border flex items-start gap-3 shadow-sm">
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: "var(--secondary)", fontSize: "1.8rem" }}
      >
        {dish.emoji}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span style={{ fontWeight: 700, fontSize: "0.98rem" }}>{dish.name}</span>
        </div>
        {dish.tags && dish.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {dish.tags.map(tag => (
              <span
                key={tag}
                className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full ${TAG_STYLES[tag] ?? "bg-gray-100 text-gray-600"}`}
                style={{ fontSize: "0.68rem", fontWeight: 600 }}
              >
                {TAG_ICONS[tag]}
                {tag}
              </span>
            ))}
          </div>
        )}
        <p className="mt-1 text-muted-foreground leading-snug" style={{ fontSize: "0.78rem" }}>
          {dish.description}
        </p>
        <div className="flex items-center justify-end mt-2">
          <div className="flex items-center gap-2">
            {quantity > 0 ? (
              <>
                <button
                  onClick={onRemove}
                  className="w-7 h-7 rounded-full bg-secondary border border-border flex items-center justify-center hover:bg-muted transition-colors"
                >
                  <Minus size={13} />
                </button>
                <span style={{ fontWeight: 700, fontSize: "0.9rem", minWidth: "1.2rem", textAlign: "center" }}>
                  {quantity}
                </span>
              </>
            ) : null}
            <button
              onClick={onAdd}
              className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 active:scale-95 transition-all"
            >
              <Plus size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
