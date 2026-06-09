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
    id: 'appetizer',
    name: '开胃凉菜',
    emoji: '🥗',
    dishes: [
      { id: 'ap-spicy-noodle', name: '辣拌凉面', description: '凉面拌以辣椒油花椒酱，麻辣爽口，夏日开胃首选', emoji: '🍜', tags: ['辣'] },
      { id: 'ap-pepper-egg', name: '烧椒皮蛋', description: '青椒烤至焦香配溏心皮蛋，口感层次丰富，开胃凉菜', emoji: '🥚', tags: ['辣'] },
      { id: 'ap-braised-chicken-feet', name: '卤味鸡爪', description: '秘制卤水慢火卤制，入味透彻，Q弹有嚼劲', emoji: '🐓', tags: ['热门'] },
      { id: 'ap-pickled-chicken-feet', name: '泡椒凤爪', description: '鸡爪泡制野山椒，酸辣爽脆，越啃越上瘾', emoji: '🐓', tags: ['辣', '热门'] },
      { id: 'ap-cucumber', name: '凉拌黄瓜', description: '清脆黄瓜拍碎后拌上蒜泥香醋，爽口解腻', emoji: '🥒', tags: ['家庭最爱'] },
      { id: 'ap-peanut', name: '油酥花生', description: '花生米炸至金黄酥脆，撒上椒盐，下酒佳品', emoji: '🥜' },
      { id: 'ap-mixed-veg', name: '红油拌菜', description: '时令蔬菜拌以红油辣酱，色泽红亮，香辣爽口', emoji: '🥗', tags: ['辣'] },
    ],
  },
  {
    id: 'chef-special',
    name: '钵钵鸡',
    emoji: '🐔',
    dishes: [
      { id: 'cs-beef-tripe', name: '毛肚', description: '薄切毛肚涮煮几秒即食，脆嫩爽口，火锅灵魂', emoji: '🐄', tags: ['热门'] },
      { id: 'cs-thousand-tripe', name: '千层肚', description: '层层叠叠的肚丝，吸满汤汁，口感丰富有嚼劲', emoji: '🐄', tags: ['热门'] },
      { id: 'cs-squid', name: '鱿鱼', description: '鲜鱿鱼改花刀，涮煮后卷曲，鲜嫩弹牙', emoji: '🦑' },
      { id: 'cs-fatty-beef', name: '肥牛', description: '雪花纹路丰富，入锅即化，口感细腻鲜美', emoji: '🥩', tags: ['厨师推荐'] },
      { id: 'cs-frog', name: '牛蛙', description: '鲜嫩蛙腿肉质细嫩，麻辣汤底中涮煮后回味无穷', emoji: '🐸' },
      { id: 'cs-shrimp-paste', name: '虾滑', description: '鲜虾仁手工打制，Q弹鲜甜，每一口都是大海的味道', emoji: '🦐', tags: ['厨师推荐'] },
      { id: 'cs-diaolong', name: '吊龙', description: '牛里脊最嫩部位，薄切入锅数秒即食，入口即化', emoji: '🥩' },
      { id: 'cs-crab-stick', name: '蟹肉棒', description: '鲜嫩蟹肉棒，入锅即软，鲜甜可口', emoji: '🦀' },
      { id: 'cs-shrimp-dumpling', name: '虾饺', description: '水晶皮包裹整只虾仁，晶莹剔透，鲜美多汁', emoji: '🥟' },
      { id: 'cs-beef-ball', name: '牛肉丸', description: '手打牛肉丸，弹牙爆汁，咬开满是肉香', emoji: '🧆', tags: ['热门'] },
      { id: 'cs-duck-intestine', name: '鸭肠', description: '新鲜鸭肠处理干净，涮煮后脆嫩爽口', emoji: '🦆' },
      { id: 'cs-huanghou', name: '黄喉', description: '猪/牛血管壁，涮煮后清脆爽口，火锅经典配菜', emoji: '🥓' },
      { id: 'cs-cod', name: '鳕鱼', description: '银鳕鱼切厚片，肉质细嫩鲜美，入口即化', emoji: '🐟' },
      { id: 'cs-sausage', name: '火腿肠', description: 'Q弹火腿肠，老少皆宜，火锅经典配料', emoji: '🌭' },
      { id: 'cs-lunch-meat', name: '午餐肉', description: '厚切午餐肉，煎煮皆宜，童年的火锅记忆', emoji: '🥫' },
      { id: 'cs-potato', name: '土豆', description: '厚切土豆片，涮煮后绵软入味，吸满汤汁精华', emoji: '🥔' },
      { id: 'cs-lotus-root', name: '莲藕', description: '脆藕片涮煮后依旧清脆，带有淡淡泥土清香', emoji: '🪷' },
      { id: 'cs-enoki', name: '金针菇', description: '金黄色的菇束，充分吸收锅底精华，鲜嫩可口', emoji: '🍄' },
      { id: 'cs-white-radish', name: '白萝卜', description: '白萝卜切厚片，煮透后清甜多汁，解腻神器', emoji: '🥬' },
      { id: 'cs-tomato', name: '西红柿', description: '新鲜番茄切片入锅，酸甜汤底自然增味', emoji: '🍅' },
    ],
  },
  {
    id: 'hotpot',
    name: '火锅冒菜',
    emoji: '🍲',
    dishes: [
      { id: 'hp-beef-tripe', name: '毛肚', description: '薄切毛肚涮煮几秒即食，脆嫩爽口，火锅灵魂', emoji: '🐄', tags: ['热门'] },
      { id: 'hp-thousand-tripe', name: '千层肚', description: '层层叠叠的肚丝，吸满汤汁，口感丰富有嚼劲', emoji: '🐄', tags: ['热门'] },
      { id: 'hp-squid', name: '鱿鱼', description: '鲜鱿鱼改花刀，涮煮后卷曲，鲜嫩弹牙', emoji: '🦑' },
      { id: 'hp-fatty-beef', name: '肥牛', description: '雪花纹路丰富，入锅即化，口感细腻鲜美', emoji: '🥩', tags: ['厨师推荐'] },
      { id: 'hp-frog', name: '牛蛙', description: '鲜嫩蛙腿肉质细嫩，麻辣汤底中涮煮后回味无穷', emoji: '🐸' },
      { id: 'hp-shrimp-paste', name: '虾滑', description: '鲜虾仁手工打制，Q弹鲜甜，每一口都是大海的味道', emoji: '🦐', tags: ['厨师推荐'] },
      { id: 'hp-diaolong', name: '吊龙', description: '牛里脊最嫩部位，薄切入锅数秒即食，入口即化', emoji: '🥩' },
      { id: 'hp-crab-stick', name: '蟹肉棒', description: '鲜嫩蟹肉棒，入锅即软，鲜甜可口', emoji: '🦀' },
      { id: 'hp-shrimp-dumpling', name: '虾饺', description: '水晶皮包裹整只虾仁，晶莹剔透，鲜美多汁', emoji: '🥟' },
      { id: 'hp-beef-ball', name: '牛肉丸', description: '手打牛肉丸，弹牙爆汁，咬开满是肉香', emoji: '🧆', tags: ['热门'] },
      { id: 'hp-duck-intestine', name: '鸭肠', description: '新鲜鸭肠处理干净，涮煮后脆嫩爽口', emoji: '🦆' },
      { id: 'hp-huanghou', name: '黄喉', description: '猪/牛血管壁，涮煮后清脆爽口，火锅经典配菜', emoji: '🥓' },
      { id: 'hp-cod', name: '鳕鱼', description: '银鳕鱼切厚片，肉质细嫩鲜美，入口即化', emoji: '🐟' },
      { id: 'hp-sausage', name: '火腿肠', description: 'Q弹火腿肠，老少皆宜，火锅经典配料', emoji: '🌭' },
      { id: 'hp-lunch-meat', name: '午餐肉', description: '厚切午餐肉，煎煮皆宜，童年的火锅记忆', emoji: '🥫' },
      { id: 'hp-potato', name: '土豆', description: '厚切土豆片，涮煮后绵软入味，吸满汤汁精华', emoji: '🥔' },
      { id: 'hp-lotus-root', name: '莲藕', description: '脆藕片涮煮后依旧清脆，带有淡淡泥土清香', emoji: '🪷' },
      { id: 'hp-enoki', name: '金针菇', description: '金黄色的菇束，充分吸收锅底精华，鲜嫩可口', emoji: '🍄' },
      { id: 'hp-white-radish', name: '白萝卜', description: '白萝卜切厚片，煮透后清甜多汁，解腻神器', emoji: '🥬' },
      { id: 'hp-tomato', name: '西红柿', description: '新鲜番茄切片入锅，酸甜汤底自然增味', emoji: '🍅' },
    ],
  },
  {
    id: 'stirfry',
    name: '经典热菜',
    emoji: '🥘',
    dishes: [
      { id: 'sf-braised-chicken', name: '红烧鸡块', description: '土鸡块以酱油冰糖烧制，酱香浓郁，肉质紧实饱满', emoji: '🍗' },
      { id: 'sf-tomato-brisket', name: '番茄牛腩', description: '牛腩与番茄慢炖至酥烂，酸甜浓郁，汤汁拌饭一绝', emoji: '🥩', tags: ['家庭最爱'] },
      { id: 'sf-cola-chicken', name: '可乐鸡翅', description: '鸡翅以可乐与酱油烧制，甜咸交织，肉质嫩滑', emoji: '🫗' },
      { id: 'sf-dry-pot-shrimp', name: '干锅虾', description: '鲜虾与干辣椒花椒同炒，虾壳酥脆，麻辣鲜香', emoji: '🦐', tags: ['辣'] },
    ],
  },
  {
    id: 'soup',
    name: '养生汤羹',
    emoji: '🫕',
    dishes: [
      { id: 'so-rib-soup', name: '排骨汤', description: '猪骨慢炖至汤色奶白，加入玉米萝卜，清甜滋补', emoji: '🍖', tags: ['养生'] },
      { id: 'so-chicken-soup', name: '老鸡汤', description: '长时间慢炖，加入枸杞，汤色金黄，温补滋养', emoji: '🍵', tags: ['养生'] },
      { id: 'so-duck-soup', name: '老鸭汤', description: '老鸭与酸萝卜同炖，汤鲜味美，去燥滋补', emoji: '🫕', tags: ['养生'] },
      { id: 'so-seaweed-egg', name: '紫菜蛋花汤', description: '紫菜与蛋花在清汤中飘散，鲜美清淡，解腻佳品', emoji: '🌊' },
      { id: 'so-egg-veg', name: '煎蛋青菜汤', description: '煎蛋与时令青菜同煮，汤清味鲜，家常暖胃', emoji: '🥬' },
    ],
  },
  {
    id: 'dessert',
    name: '水果甜点',
    emoji: '🍰',
    dishes: [
      { id: 'de-watermelon', name: '西瓜', description: '当季西瓜切块，清甜多汁，解暑必备', emoji: '🍉' },
      { id: 'de-grape', name: '提子', description: '新鲜提子粒粒饱满，清甜脆爽', emoji: '🍇' },
      { id: 'de-grapes', name: '葡萄', description: '当季巨峰葡萄，肉厚多汁，酸甜可口', emoji: '🍇' },
      { id: 'de-cantaloupe', name: '哈密瓜', description: '新疆哈密瓜，金黄脆甜，蜜香四溢', emoji: '🍈' },
      { id: 'de-pineapple', name: '菠萝', description: '新鲜菠萝切块，酸甜开胃，清爽解腻', emoji: '🍍' },
      { id: 'de-dragon-fruit', name: '火龙果', description: '红心火龙果切块，清甜爽口，富含花青素', emoji: '🐉' },
      { id: 'de-ice-jelly', name: '冰粉', description: '手搓冰粉配红糖水与花生碎，清凉滑嫩，夏日必备', emoji: '🧊', tags: ['热门'] },
      { id: 'de-cake', name: '小蛋糕', description: '松软奶油小蛋糕，香甜绵密，饭后甜蜜收尾', emoji: '🧁' },
    ],
  },
  {
    id: 'drinks',
    name: '酒水饮料',
    emoji: '🥤',
    dishes: [
      { id: 'dr-pepsi', name: '百事可乐', description: '冰镇百事可乐，畅爽怡神', emoji: '🥤' },
      { id: 'dr-coca', name: '可口可乐', description: '经典可口可乐，冰镇更过瘾', emoji: '🥤' },
      { id: 'dr-sprite', name: '雪碧', description: '柠檬味冰爽汽水，清凉解渴', emoji: '🥤' },
      { id: 'dr-dayao', name: '大窑', description: '经典国产汽水，橙味浓郁，怀旧口感', emoji: '🧃' },
      { id: 'dr-orange-juice', name: '橙汁', description: '鲜榨橙汁，富含维C，酸甜可口', emoji: '🍊' },
      { id: 'dr-iced-tea', name: '冰红茶', description: '冰镇红茶，清凉解渴，夏日畅饮', emoji: '🧊' },
      { id: 'dr-mixue', name: '蜜雪冰城', description: '甜蜜冰饮，平价好喝，人手一杯', emoji: '🧋' },
      { id: 'dr-beer', name: '啤酒', description: '冰镇啤酒，清爽怡人，聚会必备', emoji: '🍺' },
      { id: 'dr-red-wine', name: '红酒', description: '进口干红，果香浓郁，佐餐佳品', emoji: '🍷' },
      { id: 'dr-baijiu', name: '白酒', description: '纯粮酿造，醇厚绵柔，适合小酌', emoji: '🥃' },
      { id: 'dr-huangjiu', name: '黄酒', description: '绍兴黄酒，温润滋补，暖胃驱寒', emoji: '🫗' },
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
