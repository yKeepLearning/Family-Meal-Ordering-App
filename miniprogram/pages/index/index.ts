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
    submitting: false,
    searchQuery: '',
    menuImage: '',
    showMenuPreview: false,
    generating: false,
    orderCounter: 1,
  },

  onCategoryTap(e: WechatMiniprogram.TouchEvent) {
    const id = e.currentTarget.dataset.id as string
    const cat = MENU.find(c => c.id === id)
    if (!cat) return
    this.setData({
      activeCategory: id,
      activeDishes: cat.dishes,
      searchQuery: '',
    })
  },

  onSearchInput(e: WechatMiniprogram.Input) {
    const query = e.detail.value
    this.setData({ searchQuery: query })
    if (!query) {
      const cat = MENU.find(c => c.id === this.data.activeCategory)
      this.setData({ activeDishes: cat ? cat.dishes : [] })
      return
    }
    const q = query.toLowerCase()
    const results: typeof MENU[0]['dishes'] = []
    for (const cat of MENU) {
      for (const dish of cat.dishes) {
        if (dish.name.includes(q) || dish.name.includes(query) || (dish.tags && dish.tags.some(t => t.includes(q) || t.includes(query)))) {
          results.push(dish)
        }
      }
    }
    this.setData({ activeDishes: results })
  },

  onClearSearch() {
    const cat = MENU.find(c => c.id === this.data.activeCategory)
    this.setData({
      searchQuery: '',
      activeDishes: cat ? cat.dishes : [],
    })
  },

  onShareMenu() {
    if (this.data.generating) return
    const { cartItems } = this.data
    if (cartItems.length === 0) return

    this.setData({ generating: true, showMenuPreview: true })

    const groups: { cat: string; items: CartItem[] }[] = []
    const catMap = new Map<string, CartItem[]>()
    for (const item of cartItems) {
      const dish = findDish(item.id)
      if (!dish) continue
      const cat = MENU.find(c => c.dishes.some(d => d.id === item.id))
      const catName = (cat && cat.name) || ''
      if (!catMap.has(catName)) catMap.set(catName, [])
      catMap.get(catName)!.push(item)
    }
    catMap.forEach((items, cat) => groups.push({ cat, items }))

    const dpr = 2
    const logicalW = 375
    const pad = 16
    let logicalH = 80
    for (const g of groups) {
      logicalH += 26 + g.items.length * 22 + 8
    }
    logicalH += 50
    logicalH = Math.max(logicalH, 300)

    const bufferW = Math.round(logicalW * dpr)
    const bufferH = Math.round(logicalH * dpr)

    const query = wx.createSelectorQuery()
    query.select('#shareCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        if (!res || !res[0]) {
          this.setData({ generating: false })
          return
        }
        const canvas = res[0].node as WechatMiniprogram.Canvas
        canvas.width = bufferW
        canvas.height = bufferH
        const ctx = canvas.getContext('2d') as any
        ctx.scale(dpr, dpr)

        ctx.fillStyle = '#fdf6ee'
        ctx.fillRect(0, 0, logicalW, logicalH)

        ctx.fillStyle = '#c0392b'
        ctx.fillRect(0, 0, logicalW, 56)
        ctx.fillStyle = '#ffffff'
        ctx.font = 'bold 18px sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText('家庭点菜 · 菜单', logicalW / 2, 30)

        const now = new Date()
        const dateStr = `${now.getFullYear()}.${now.getMonth() + 1}.${now.getDate()}`
        ctx.fillStyle = '#7a6150'
        ctx.font = '11px sans-serif'
        ctx.textAlign = 'right'
        ctx.textBaseline = 'top'
        ctx.fillText(dateStr, logicalW - pad, 64)

        let y = 86
        for (const g of groups) {
          ctx.fillStyle = '#f5e6d3'
          ctx.fillRect(pad, y, logicalW - pad * 2, 22)
          ctx.fillStyle = '#1e1208'
          ctx.font = 'bold 12px sans-serif'
          ctx.textAlign = 'left'
          ctx.textBaseline = 'middle'
          ctx.fillText(g.cat, pad + 8, y + 11)
          y += 26

          for (const item of g.items) {
            ctx.fillStyle = '#1e1208'
            ctx.font = '13px sans-serif'
            ctx.textAlign = 'left'
            ctx.textBaseline = 'middle'
            ctx.fillText(item.emoji + ' ' + item.name, pad + 8, y + 11)

            ctx.fillStyle = '#c0392b'
            ctx.font = 'bold 13px sans-serif'
            ctx.textAlign = 'right'
            ctx.fillText('×' + item.qty, logicalW - pad, y + 11)

            y += 22
          }
          y += 4
        }

        const footerY = logicalH - 40
        ctx.fillStyle = '#f5e6d3'
        ctx.fillRect(0, footerY, logicalW, 40)
        const totalQty = cartItems.reduce((s, i) => s + i.qty, 0)
        ctx.fillStyle = '#1e1208'
        ctx.font = 'bold 13px sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText('共 ' + totalQty + ' 道菜', logicalW / 2, footerY + 20)

        wx.canvasToTempFilePath({
          canvas,
          x: 0,
          y: 0,
          width: bufferW,
          height: bufferH,
          destWidth: bufferW,
          destHeight: bufferH,
          fileType: 'png',
          quality: 1,
          success: (res2: any) => {
            this.setData({ menuImage: res2.tempFilePath, generating: false })
          },
          fail: () => {
            this.setData({ generating: false })
            wx.showToast({ title: '图片生成失败', icon: 'none' })
          },
        })
      })
  },

  onSaveImage() {
    const { menuImage } = this.data
    if (!menuImage) return
    wx.saveImageToPhotosAlbum({
      filePath: menuImage,
      success: () => {
        wx.showToast({ title: '已保存到相册', icon: 'success' })
      },
      fail: () => {
        wx.showToast({ title: '保存失败，请授权相册权限', icon: 'none' })
      },
    })
  },

  onClosePreview() {
    this.setData({ showMenuPreview: false })
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
    if (this.data.submitting) return
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

    this.setData({ submitting: true })

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
      this.setData({ submitted: false, submitting: false })
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
