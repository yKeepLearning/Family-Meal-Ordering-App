export interface Dish {
  id: string
  name: string
  description: string
  emoji: string
  tags?: string[]
}

export interface Category {
  id: string
  name: string
  emoji: string
  dishes: Dish[]
}

export interface OrderItem {
  dish: Dish
  quantity: number
  categoryName: string
}

export interface Order {
  id: string
  items: OrderItem[]
  note: string
  submittedAt: string
  status: 'pending' | 'preparing' | 'ready'
}

export const MENU: Category[] = [
  {
    id: 'hotpot',
    name: '火锅',
    emoji: '🍲',
    dishes: [
      { id: 'hp-beef-tripe', name: '毛肚', description: '嫩滑爽口，薄切处理，最适合在麻辣锅底中涮食', emoji: '🐄', tags: ['热门'] },
      { id: 'hp-fatty-beef', name: '肥牛', description: '雪花纹路丰富，入锅即化，口感细腻鲜美', emoji: '🥩', tags: ['厨师推荐'] },
      { id: 'hp-lotus-root', name: '藕片', description: '清脆爽口，带有淡淡的泥土清香，吸汁效果极佳', emoji: '🪷' },
      { id: 'hp-enoki', name: '金针菇', description: '金黄色的菇束，充分吸收锅底精华，鲜嫩可口', emoji: '🍄' },
      { id: 'hp-lamb', name: '羊肉片', description: '手工卷制，薄如纸张，入口鲜嫩，滋味醇厚', emoji: '🐑', tags: ['热门'] },
      { id: 'hp-tofu', name: '嫩豆腐', description: '质地细腻滑嫩，能充分吸收汤底的每一丝鲜味', emoji: '🫛' },
      { id: 'hp-shrimp', name: '鲜虾', description: '带壳整虾，新鲜甜脆，口感饱满弹牙', emoji: '🦐', tags: ['时令'] },
      { id: 'hp-corn', name: '玉米段', description: '切段玉米，天然甜味在汤中愈发浓郁', emoji: '🌽' },
    ],
  },
  {
    id: 'stirfry',
    name: '炒菜',
    emoji: '🥘',
    dishes: [
      { id: 'sf-gongbao', name: '宫保鸡丁', description: '干辣椒与花生碎爆炒，麻辣鲜香，下饭神器', emoji: '🍗', tags: ['热门', '辣'] },
      { id: 'sf-mapo', name: '麻婆豆腐', description: '嫩豆腐配豆瓣酱与肉末，麻辣鲜嫩，回味无穷', emoji: '🌶️', tags: ['辣'] },
      { id: 'sf-bokchoy', name: '蒜蓉青菜', description: '时令绿叶菜配香蒜爆炒，清爽提神，解腻必备', emoji: '🥬' },
      { id: 'sf-twicepork', name: '回锅肉', description: '五花肉配青蒜与甜面酱翻炒，香气扑鼻，经典川味', emoji: '🥓', tags: ['厨师推荐'] },
      { id: 'sf-egg-tomato', name: '番茄炒蛋', description: '家常必备，酸甜开胃，老少皆宜的温暖味道', emoji: '🍅', tags: ['家庭最爱'] },
      { id: 'sf-eggplant', name: '鱼香茄子', description: '茄子炖至软糯，浇上酸辣蒜香汁，浓郁入味', emoji: '🍆', tags: ['辣'] },
    ],
  },
  {
    id: 'stew',
    name: '炖菜',
    emoji: '🫕',
    dishes: [
      { id: 'st-pork-belly', name: '红烧肉', description: '五花肉以酱油、糖与绍兴黄酒慢炖，入口即化，色泽红亮', emoji: '🍖', tags: ['家庭最爱', '厨师推荐'] },
      { id: 'st-fish', name: '红烧鱼', description: '整条鱼配姜葱与酱汁红烧，鱼肉鲜嫩，汤汁浓郁', emoji: '🐟', tags: ['热门'] },
      { id: 'st-chicken-soup', name: '老鸡汤', description: '长时间慢炖，加入枸杞，汤色金黄，温补滋养', emoji: '🍵', tags: ['养生'] },
      { id: 'st-oxtail', name: '炖牛尾', description: '配根茎蔬菜慢炖，骨肉脱落，汤汁醇厚鲜美', emoji: '🦴', tags: ['时令'] },
      { id: 'st-tofu-skin', name: '腐皮卷', description: '豆腐皮包裹馅料，在浓汤中慢炖入味，外韧内嫩', emoji: '🥟' },
    ],
  },
]

export function findDish(dishId: string): Dish | undefined {
  for (const cat of MENU) {
    const dish = cat.dishes.find(d => d.id === dishId)
    if (dish) return dish
  }
  return undefined
}

export function getTagStyle(tag: string): string {
  const styles: Record<string, string> = {
    '热门': 'tag-hot',
    '厨师推荐': 'tag-chef',
    '家庭最爱': 'tag-family',
    '辣': 'tag-spicy',
    '时令': 'tag-seasonal',
    '养生': 'tag-wellness',
  }
  return styles[tag] || 'tag-default'
}

export function getTagIcon(tag: string): string {
  const icons: Record<string, string> = {
    '辣': '🌶️',
    '养生': '🌿',
    '厨师推荐': '⭐',
  }
  return icons[tag] || ''
}
