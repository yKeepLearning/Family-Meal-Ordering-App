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
    id: 'chef-special',
    name: '主厨力荐',
    emoji: '👨‍🍳',
    dishes: [
      { id: 'cs-braised-chicken', name: '红烧鸡', description: '土鸡块以酱油冰糖烧制，酱香浓郁，肉质紧实饱满', emoji: '🍗', tags: ['厨师推荐'] },
      { id: 'cs-pork-belly', name: '红烧肉', description: '五花肉以酱油、糖与绍兴黄酒慢炖，入口即化，色泽红亮', emoji: '🍖', tags: ['家庭最爱', '厨师推荐'] },
      { id: 'cs-gongbao', name: '宫保鸡丁', description: '干辣椒与花生碎爆炒，麻辣鲜香，下饭神器', emoji: '🍗', tags: ['热门', '辣'] },
      { id: 'cs-fish', name: '红烧鱼', description: '整条鱼配姜葱与酱汁红烧，鱼肉鲜嫩，汤汁浓郁', emoji: '🐟', tags: ['热门'] },
      { id: 'cs-boiled-beef', name: '水煮牛肉', description: '嫩滑牛肉片在滚烫的麻辣红油中沸腾，麻辣鲜香，肉质嫩滑', emoji: '🥩', tags: ['厨师推荐', '辣'] },
      { id: 'cs-sweet-sour-fish', name: '松鼠鱼', description: '整鱼改花刀炸至酥脆，浇上酸甜番茄酱汁，形如松鼠', emoji: '🐟', tags: ['家庭最爱'] },
      { id: 'cs-spare-ribs', name: '椒盐排骨', description: '排骨炸至金黄酥脆，撒上椒盐与蒜蓉，外酥里嫩', emoji: '🍖', tags: ['热门'] },
      { id: 'cs-fish-head', name: '剁椒鱼头', description: '大花鲢鱼头铺满剁椒蒸制，鲜辣入味，鱼肉嫩滑', emoji: '🐟', tags: ['厨师推荐', '辣'] },
      { id: 'cs-beef-brisket', name: '秘制红烧牛腩', description: '牛腩慢炖至酥烂，酱汁浓郁，配米饭一绝', emoji: '🥩', tags: ['厨师推荐'] },
      { id: 'cs-pepper-salt-ribs', name: '香辣蟹', description: '鲜活螃蟹与干辣椒花椒爆炒，香辣鲜美，吮指回味', emoji: '🦀', tags: ['时令', '辣'] },
      { id: 'cs-lobster-noodle', name: '龙虾伊面', description: '整只鲜龙虾焗烤，搭配伊面吸满龙虾汁，宴席首选', emoji: '🦞', tags: ['厨师推荐'] },
      { id: 'cs-pepper-beef', name: '黑椒牛柳', description: '嫩牛肉条配黑胡椒汁爆炒，辛香浓郁，肉质鲜嫩', emoji: '🥩', tags: ['热门'] },
      { id: 'cs-beer-duck', name: '啤酒鸭', description: '鸭肉与啤酒同炖去腥增香，肉质酥烂，汤汁浓郁', emoji: '🦆' },
    ],
  },
  {
    id: 'appetizer',
    name: '开胃凉菜',
    emoji: '🥗',
    dishes: [
      { id: 'ap-bobo-chicken', name: '钵钵鸡', description: '冷吃鸡肉串浸润红油芝麻，麻辣鲜香，回味悠长', emoji: '🐔', tags: ['厨师推荐', '辣'] },
      { id: 'ap-pepper-egg', name: '烧椒皮蛋', description: '青椒烤至焦香配溏心皮蛋，口感层次丰富，开胃凉菜', emoji: '🥚', tags: ['辣', '时令'] },
      { id: 'ap-twice-pork', name: '蒜泥白肉', description: '薄切五花肉淋上蒜泥红油，肥而不腻，爽口开胃', emoji: '🥓', tags: ['厨师推荐'] },
      { id: 'ap-cucumber', name: '凉拌黄瓜', description: '清脆黄瓜拍碎后拌上蒜泥香醋，爽口解腻', emoji: '🥒', tags: ['家庭最爱'] },
      { id: 'ap-saliva-chicken', name: '口水鸡', description: '嫩鸡肉淋上红油辣酱与花椒，麻辣鲜香，让人口水直流', emoji: '🐔', tags: ['辣'] },
      { id: 'ap-tofu-egg', name: '皮蛋豆腐', description: '冰镇嫩豆腐配上切块皮蛋，淋上酱油麻油，入口即化', emoji: '🥟' },
      { id: 'ap-mushroom', name: '凉拌木耳', description: '黑木耳焯水后拌以香醋蒜泥，爽脆开胃', emoji: '🍄' },
      { id: 'ap-peanut', name: '老醋花生', description: '花生米泡制老陈醋，酸香酥脆，下酒佳品', emoji: '🥜', tags: ['热门'] },
      { id: 'ap-couple-beef', name: '夫妻肺片', description: '牛杂薄片淋上红油辣酱，麻辣鲜香，经典川味凉菜', emoji: '🥩', tags: ['厨师推荐', '辣'] },
      { id: 'ap-jellyfish', name: '凉拌海蜇', description: '海蜇皮切丝拌以香醋麻油，脆爽弹牙，鲜美可口', emoji: '🪸' },
      { id: 'ap-chicken-feet', name: '泡椒凤爪', description: '鸡爪泡制野山椒，酸辣爽脆，越啃越上瘾', emoji: '🐓', tags: ['辣', '热门'] },
      { id: 'ap-okra', name: '凉拌秋葵', description: '秋葵焯水后淋上蒜蓉酱油，滑嫩清爽，健康美味', emoji: '🫛', tags: ['养生'] },
    ],
  },
  {
    id: 'hotpot',
    name: '火锅冒菜',
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
      { id: 'hp-potato', name: '土豆片', description: '厚切土豆片，涮煮后绵软入味，吸满汤汁精华', emoji: '🥔' },
      { id: 'hp-tofu-skin', name: '豆皮', description: '薄豆腐皮入锅即软，豆香浓郁，口感柔韧', emoji: '🫛' },
      { id: 'hp-duck-blood', name: '鸭血', description: '鲜鸭血切块，嫩滑如豆腐，麻辣锅底的绝配', emoji: '🩸', tags: ['时令'] },
      { id: 'hp-shrimp-paste', name: '虾滑', description: '鲜虾仁手工打制，Q弹鲜甜，每一口都是大海的味道', emoji: '🦐', tags: ['厨师推荐'] },
      { id: 'hp-beef-ball', name: '牛丸', description: '手打牛肉丸，弹牙爆汁，咬开满是肉香', emoji: '⚪', tags: ['热门'] },
      { id: 'hp-fish-ball', name: '鱼丸', description: '鲜鱼肉打制的鱼丸，嫩滑细腻，鲜味十足', emoji: '⚪' },
      { id: 'hp-lunch-meat', name: '午餐肉', description: '厚切午餐肉，煎煮皆宜，童年的火锅记忆', emoji: '🥫' },
      { id: 'hp-frozen-tofu', name: '冻豆腐', description: '冻豆腐孔隙丰富，吸满汤汁后口感层次十足', emoji: '🧊' },
      { id: 'hp-vermicelli', name: '粉丝', description: '晶莹剔透的粉丝入锅即软，吸汁能力一流', emoji: '🍜' },
      { id: 'hp-rice-cake', name: '年糕', description: '软糯年糕片，涮煮后外软内韧，甜咸皆宜', emoji: '🍚' },
      { id: 'hp-lettuce', name: '生菜', description: '新鲜生菜入锅即出，清脆爽口，解腻佳品', emoji: '🥬' },
      { id: 'hp-bean-curd-stick', name: '腐竹', description: '干腐竹泡发后入锅，柔韧有嚼劲，豆香浓郁', emoji: '🫛' },
    ],
  },
  {
    id: 'stirfry',
    name: '经典热菜',
    emoji: '🥘',
    dishes: [
      { id: 'sf-mapo', name: '麻婆豆腐', description: '嫩豆腐配豆瓣酱与肉末，麻辣鲜嫩，回味无穷', emoji: '🌶️', tags: ['辣'] },
      { id: 'sf-bokchoy', name: '蒜蓉青菜', description: '时令绿叶菜配香蒜爆炒，清爽提神，解腻必备', emoji: '🥬' },
      { id: 'sf-twicepork', name: '回锅肉', description: '五花肉配青蒜与甜面酱翻炒，香气扑鼻，经典川味', emoji: '🥓', tags: ['厨师推荐'] },
      { id: 'sf-egg-tomato', name: '番茄炒蛋', description: '家常必备，酸甜开胃，老少皆宜的温暖味道', emoji: '🍅', tags: ['家庭最爱'] },
      { id: 'sf-eggplant', name: '鱼香茄子', description: '茄子炖至软糯，浇上酸辣蒜香汁，浓郁入味', emoji: '🍆', tags: ['辣'] },
      { id: 'sf-tofu-skin', name: '腐皮卷', description: '豆腐皮包裹馅料，在浓汤中慢炖入味，外韧内嫩', emoji: '🥟' },
      { id: 'sf-pepper-pork', name: '青椒肉丝', description: '青椒与瘦肉切丝爆炒，家常下饭，简简单单的美味', emoji: '🫑' },
      { id: 'sf-sweet-sour-pork', name: '糖醋里脊', description: '猪里脊炸至酥脆裹上糖醋酱汁，酸甜可口，老少皆宜', emoji: '🥩', tags: ['家庭最爱'] },
      { id: 'sf-sour-potato', name: '酸辣土豆丝', description: '土豆切细丝，配干辣椒与醋猛火快炒，脆爽开胃', emoji: '🥔', tags: ['辣'] },
      { id: 'sf-green-bean', name: '干煸四季豆', description: '四季豆煸至焦香，配蒜末干辣椒，咸香微辣', emoji: '🫛', tags: ['辣'] },
      { id: 'sf-spicy-chicken', name: '辣子鸡', description: '鸡丁与干辣椒花椒同炸，麻辣酥香，外焦里嫩', emoji: '🐔', tags: ['辣', '热门'] },
      { id: 'sf-cola-chicken', name: '可乐鸡翅', description: '鸡翅以可乐与酱油烧制，甜咸交織，肉质嫩滑', emoji: '🫗', tags: ['家庭最爱'] },
      { id: 'sf-boiled-pork', name: '水煮肉片', description: '猪里脊片在麻辣红油中滚熟，嫩滑鲜辣，经典川菜', emoji: '🥩', tags: ['厨师推荐', '辣'] },
      { id: 'sf-three-fresh', name: '地三鲜', description: '茄子土豆青椒同炒，咸鲜入味，东北经典素菜', emoji: '🍆' },
      { id: 'sf-cabbage', name: '醋溜白菜', description: '白菜快炒勾醋，酸爽脆嫩，家常快手菜', emoji: '🥬' },
      { id: 'sf-home-tofu', name: '家常豆腐', description: '老豆腐煎至两面金黄，配木耳青椒红烧，外焦里嫩', emoji: '🫛' },
      { id: 'sf-oyster-lettuce', name: '蚝油生菜', description: '脆嫩生菜淋上蚝油酱汁，清淡鲜美，解腻必备', emoji: '🥬' },
      { id: 'sf-beef-scallion', name: '葱爆牛肉', description: '嫩牛肉片与大葱爆炒，葱香四溢，肉嫩汁浓', emoji: '🥩', tags: ['热门'] },
    ],
  },
  {
    id: 'soup',
    name: '养生汤羹',
    emoji: '🫕',
    dishes: [
      { id: 'so-rib-soup', name: '排骨汤', description: '猪骨慢炖至汤色奶白，加入玉米萝卜，清甜滋补', emoji: '🍖', tags: ['养生'] },
      { id: 'so-chicken-soup', name: '老鸡汤', description: '长时间慢炖，加入枸杞，汤色金黄，温补滋养', emoji: '🍵', tags: ['养生'] },
      { id: 'so-oxtail', name: '炖牛尾', description: '配根茎蔬菜慢炖，骨肉脱落，汤汁醇厚鲜美', emoji: '🦴', tags: ['时令'] },
      { id: 'so-tomato-egg', name: '番茄蛋汤', description: '番茄熬出红汤后淋入蛋花，酸甜开胃，家常暖胃', emoji: '🍅' },
      { id: 'so-seaweed-egg', name: '紫菜蛋花汤', description: '紫菜与蛋花在清汤中飘散，鲜美清淡，解腻佳品', emoji: '🌊' },
      { id: 'so-weston-soup', name: '西湖牛肉羹', description: '牛肉末配蛋清香菇，勾芡成羹，滑润鲜美', emoji: '🥣', tags: ['热门'] },
      { id: 'so-hot-sour', name: '酸辣汤', description: '豆腐丝木耳丝配胡椒醋，酸辣开胃，暖身佳品', emoji: '🥣', tags: ['辣'] },
      { id: 'so-mushroom-soup', name: '菌菇汤', description: '多种野生菌菇慢火熬制，汤色金黄，鲜美至极', emoji: '🍄', tags: ['养生'] },
      { id: 'so-lily-birdnest', name: '银耳莲子羹', description: '银耳莲子红枣同炖，胶质满满，清甜滋补', emoji: '🍵', tags: ['养生', '家庭最爱'] },
    ],
  },
  {
    id: 'dessert',
    name: '水果甜点',
    emoji: '🍰',
    dishes: [
      { id: 'de-fruit-platter', name: '水果拼盘', description: '时令鲜果精心搭配，清爽解腻，甜润可口', emoji: '🍉' },
      { id: 'de-ice-jelly', name: '冰粉', description: '手搓冰粉配红糖水与花生碎，清凉滑嫩，夏日必备', emoji: '🧊', tags: ['热门'] },
      { id: 'de-glutinous-rice', name: '红糖糍粑', description: '糯米糍粑炸至金黄，淋上红糖浆，外酥里糯', emoji: '🍡', tags: ['家庭最爱'] },
      { id: 'de-mango-pudding', name: '芒果布丁', description: '新鲜芒果泥制成的布丁，滑嫩香甜，冰凉爽口', emoji: '🥭' },
      { id: 'de-mango-sago', name: '杨枝甘露', description: '芒果西柚配椰汁西米露，酸甜清爽，经典港式甜品', emoji: '🥥', tags: ['热门'] },
      { id: 'de-egg-tart', name: '蛋挞', description: '酥脆挞皮包裹嫩滑蛋奶馅，外酥里嫩，甜而不腻', emoji: '🥧', tags: ['热门'] },
      { id: 'de-red-bean', name: '红豆沙', description: '红豆熬煮至起沙，配陈皮与冰糖，温润甜美', emoji: '🫘' },
      { id: 'de-gui-ling-gao', name: '龟苓膏', description: '传统龟苓膏配蜂蜜，清凉降火，微苦回甘', emoji: '🫗', tags: ['养生'] },
      { id: 'de-wine-rice-ball', name: '酒酿圆子', description: '糯米小圆子配甜酒酿与桂花，清甜暖胃，中式甜品', emoji: '🍡', tags: ['家庭最爱'] },
      { id: 'de-osmanthus-cake', name: '桂花糕', description: '糯米粉蒸制佐以桂花蜜，软糯香甜，满口花香', emoji: '🌸' },
    ],
  },
  {
    id: 'drinks',
    name: '酒水饮料',
    emoji: '🥤',
    dishes: [
      { id: 'dr-cola', name: '可乐', description: '冰镇可口可乐，畅爽怡神', emoji: '🥤' },
      { id: 'dr-sprite', name: '雪碧', description: '柠檬味冰爽汽水，清凉解渴', emoji: '🥤' },
      { id: 'dr-herbal-tea', name: '王老吉', description: '传统凉茶配方，清热降火，吃辣必备', emoji: '🧃', tags: ['热门'] },
      { id: 'dr-sour-plum', name: '酸梅汤', description: '古法熬制，酸甜生津，消食开胃', emoji: '🫗', tags: ['时令'] },
      { id: 'dr-coconut', name: '椰汁', description: '新鲜椰子水与椰肉榨取，清甜滋润，天然解渴', emoji: '🥥' },
      { id: 'dr-beer', name: '雪花啤酒', description: '冰镇雪花啤酒，清爽怡人，聚会必备', emoji: '🍺' },
      { id: 'dr-water', name: '矿泉水', description: '天然矿泉水，解渴纯净', emoji: '💧' },
      { id: 'dr-orange-juice', name: '橙汁', description: '鲜榨橙汁，富含维C，酸甜可口', emoji: '🍊' },
      { id: 'dr-lemon-tea', name: '柠檬茶', description: '红茶配新鲜柠檬片，冰爽解暑，酸甜怡人', emoji: '🍋' },
      { id: 'dr-vitasoy', name: '维他奶', description: '经典豆奶饮品，顺滑香浓，老少皆宜', emoji: '🧃' },
      { id: 'dr-iced-tea', name: '冰红茶', description: '冰镇红茶，清凉解渴，夏日畅饮', emoji: '🧊' },
      { id: 'dr-sour-plum-juice', name: '酸梅汁', description: '乌梅山楂桂花同熬，生津止渴，酸甜浓郁', emoji: '🫗' },
      { id: 'dr-milk', name: '豆奶', description: '现磨浓豆浆，香醇顺滑，营养健康', emoji: '🥛' },
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
