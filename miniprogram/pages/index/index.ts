import { MENU, findDish, type Order, type OrderItem } from '../../utils/menu-data'

interface CartItem {
  id: string
  name: string
  emoji: string
  qty: number
}

interface OrderGroup {
  cat: string
  items: OrderItem[]
}

interface OrderDisplay extends Omit<Order, 'submittedAt'> {
  submittedAt: string
  displayId: number
  statusLabel: string
  groupedItems: OrderGroup[]
}

interface FilterOption {
  value: string
  label: string
}

Page({
  data: {
    view: 'customer',

    menu: MENU,
    activeCategory: MENU[0].id,
    activeDishes: MENU[0].dishes,

    cart: {} as Record<string, number>,
    totalItems: 0,
    showCart: false,
    note: '',
    cartItems: [] as CartItem[],

    orders: [] as OrderDisplay[],
    orderCounts: { pending: 0, preparing: 0, ready: 0 },
    chefFilter: 'all',
    filters: [
      { value: 'all', label: '全部（0）' },
      { value: 'pending', label: '待处理（0）' },
      { value: 'preparing', label: '备菜中（0）' },
      { value: 'ready', label: '已完成（0）' },
    ] as FilterOption[],
    filteredOrders: [] as OrderDisplay[],
    pendingCount: 0,

    submitted: false,
    orderCounter: 1,
  },

  onCategoryTap(e: WechatMiniprogram.TouchEvent) {
    const id = e.currentTarget.dataset.id as string
    const cat = MENU.find(c => c.id === id)
    if (!cat) return
    this.setData({
      activeCategory: id,
      activeDishes: cat.dishes,
    })
  },

  onCartUpdate(e: WechatMiniprogram.TouchEvent) {
    const { id, delta } = e.currentTarget.dataset as { id: string; delta: number }
    const cart = { ...this.data.cart }
    const current = cart[id] || 0
    const updated = current + delta
    if (updated <= 0) {
      delete cart[id]
    } else {
      cart[id] = updated
    }
    this.setData({ cart })
    this._recalcCart()
  },

  onToggleCart() {
    this.setData({ showCart: !this.data.showCart })
  },

  onNoteInput(e: WechatMiniprogram.Input) {
    this.setData({ note: e.detail.value })
  },

  onSubmitOrder() {
    const { cart, note, orderCounter } = this.data
    const items: OrderItem[] = []
    for (const id of Object.keys(cart)) {
      const dish = findDish(id)
      if (dish) {
        const cat = MENU.find(c => c.dishes.some(d => d.id === id))
        items.push({ dish, quantity: cart[id], categoryName: (cat && cat.name) || '' })
      }
    }
    if (items.length === 0) return

    const now = new Date()
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`

    const newOrder: Order = {
      id: `order-${orderCounter}`,
      items,
      note,
      submittedAt: timeStr,
      status: 'pending',
    }

    const orders = [newOrder, ...this.data.orders]
    const orderDisplays = orders.map(o => this._toDisplay(o))

    this.setData({
      cart: {},
      note: '',
      showCart: false,
      orderCounter: orderCounter + 1,
      orders: orderDisplays,
      submitted: true,
    })
    this._recalcCart()
    this._recalcOrders()

    setTimeout(() => {
      this.setData({ submitted: false })
    }, 3000)
  },

  onSwitchView(e: WechatMiniprogram.TouchEvent) {
    const view = e.currentTarget.dataset.view as string
    this.setData({ view })
  },

  onFilterTap(e: WechatMiniprogram.TouchEvent) {
    const value = e.currentTarget.dataset.value as string
    this.setData({ chefFilter: value })
    this._recalcOrders()
  },

  onUpdateStatus(e: WechatMiniprogram.TouchEvent) {
    const { id, status } = e.currentTarget.dataset as { id: string; status: string }
    const orders = this.data.orders.map(o => {
      if (o.id === id) {
        return this._toDisplay({ ...o, status: status as Order['status'] })
      }
      return o
    })
    this.setData({ orders })
    this._recalcOrders()
  },

  _recalcCart() {
    const { cart } = this.data
    const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0)
    const cartItems: CartItem[] = []
    for (const id of Object.keys(cart)) {
      const dish = findDish(id)
      if (dish) {
        cartItems.push({ id: dish.id, name: dish.name, emoji: dish.emoji, qty: cart[id] })
      }
    }
    this.setData({ totalItems, cartItems })
  },

  _recalcOrders() {
    const { orders, chefFilter } = this.data
    const orderCounts = { pending: 0, preparing: 0, ready: 0 }
    for (const o of orders) {
      if (orderCounts[o.status] !== undefined) orderCounts[o.status]++
    }
    const pendingCount = orderCounts.pending

    let filtered = orders
    if (chefFilter !== 'all') {
      filtered = orders.filter(o => o.status === chefFilter)
    }

    const filters: FilterOption[] = [
      { value: 'all', label: `全部（${orders.length}）` },
      { value: 'pending', label: `待处理（${orderCounts.pending}）` },
      { value: 'preparing', label: `备菜中（${orderCounts.preparing}）` },
      { value: 'ready', label: `已完成（${orderCounts.ready}）` },
    ]

    this.setData({ orderCounts, pendingCount, filteredOrders: filtered, filters })
  },

  _toDisplay(order: Order): OrderDisplay {
    const statusLabels: Record<string, string> = {
      pending: '待处理',
      preparing: '备菜中',
      ready: '已完成',
    }
    const num = parseInt(order.id.split('-')[1], 10)
    const groupedItems = this._groupByCategory(order.items)
    return {
      ...order,
      displayId: num,
      statusLabel: statusLabels[order.status] || order.status,
      groupedItems,
    }
  },

  _groupByCategory(items: OrderItem[]): OrderGroup[] {
    const map = new Map<string, OrderItem[]>()
    for (const item of items) {
      if (!map.has(item.categoryName)) map.set(item.categoryName, [])
      map.get(item.categoryName)!.push(item)
    }
    const result: OrderGroup[] = []
    map.forEach((items, cat) => {
      result.push({ cat, items })
    })
    return result
  },
})
