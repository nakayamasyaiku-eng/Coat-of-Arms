import type {Locale} from '@/i18n/routing';

export type LocalizedProduct = {
  city: string;
  title: string;
  short: string;
  story: string;
  heraldry: string;
  alt: string;
};

export type Product = {
  slug: string;
  sku: string;
  region: 'bohemia' | 'moravia' | 'national';
  image: string;
  processVideo?: string;
  exhibitionImage?: string;
  orientation: 'portrait' | 'landscape';
  priceCents: number;
  currency: 'EUR';
  stock: number;
  editionTotal: number;
  editionNumber: number;
  available: boolean;
  localized: Record<Locale, LocalizedProduct>;
};

// TODO: replace with confirmed prices before production launch.
const DEMO_PRICES: Record<string, number> = {
  'cesky-krumlov': 48000,
  'ceske-budejovice': 46000,
  beroun: 42000,
  prague: 52000,
  tabor: 45000,
  'czech-republic': 56000,
  pardubice: 44000,
  'kutna-hora': 49000,
  'hradec-kralove': 46000
};

const entries: Array<Omit<Product, 'priceCents' | 'currency' | 'stock' | 'editionTotal' | 'editionNumber' | 'available'>> = [
  {
    slug: 'cesky-krumlov', sku: 'COA-CZ-CK-001', region: 'bohemia',
    image: '/images/products/cesky-krumlov.jpg', exhibitionImage: '/images/exhibitions/cesky-krumlov.jpg', orientation: 'portrait',
    localized: {
      en: {city: 'Český Krumlov', title: 'Český Krumlov — Copper Plate Impression', short: 'A rose held above a walled river town.', story: 'Český Krumlov gathers around a bend of the Vltava beneath its Renaissance castle. The town feels preserved yet lived-in—an ideal subject for a plate made to carry memory through time.', heraldry: 'The five-petalled rose recalls the town’s historic lords; walls and an open gate turn the emblem into a portrait of place.', alt: 'Hand-hammered copper plate impression of the Český Krumlov coat of arms'},
      zh: {city: '捷克克鲁姆洛夫', title: '捷克克鲁姆洛夫｜城市纹章铜板拓印', short: '一朵玫瑰，守在伏尔塔瓦河畔的城墙之上。', story: '捷克克鲁姆洛夫沿伏尔塔瓦河湾展开，文艺复兴城堡俯瞰红瓦街巷。它既被时间保存，也仍在生活，是一座适合被留在铜板上的城市。', heraldry: '五瓣玫瑰指向城市历史领主，城墙与敞开的城门则把纹章变成一幅地方肖像。', alt: '捷克克鲁姆洛夫城市纹章手工铜板拓印作品'}
    }
  },
  {
    slug: 'ceske-budejovice', sku: 'COA-CZ-CB-002', region: 'bohemia',
    image: '/images/products/ceske-budejovice.jpg', exhibitionImage: '/images/exhibitions/ceske-budejovice.jpg', processVideo: '/videos/ceske-budejovice.mp4', orientation: 'portrait',
    localized: {
      en: {city: 'České Budějovice', title: 'České Budějovice — Copper Plate Impression', short: 'Fortified towers frame a royal Bohemian shield.', story: 'Founded at the meeting of the Vltava and Malše rivers, České Budějovice carries the measured confidence of a planned royal town. Its arcades and broad square echo the order of its emblem.', heraldry: 'Twin towers, masonry and the Bohemian lion speak of civic protection and royal foundation.', alt: 'Handcrafted copper impression of the České Budějovice city arms'},
      zh: {city: '捷克布杰约维采', title: '捷克布杰约维采｜城市纹章铜板拓印', short: '两座城塔，框住一枚波希米亚王家之盾。', story: '捷克布杰约维采建于伏尔塔瓦河与马尔谢河交汇处，宽阔广场和连续拱廊保留着王家规划城市的从容秩序。', heraldry: '双塔、砖石与波希米亚狮共同讲述城市防卫和王家建城的历史。', alt: '捷克布杰约维采城市纹章手工铜板拓印作品'}
    }
  },
  {
    slug: 'beroun', sku: 'COA-CZ-BE-003', region: 'bohemia',
    image: '/images/products/beroun.jpg', exhibitionImage: '/images/exhibitions/beroun.jpg', orientation: 'portrait',
    localized: {
      en: {city: 'Beroun', title: 'Beroun — Copper Plate Impression', short: 'A fortified gate remembers the road west from Prague.', story: 'Beroun grew where trade routes followed the river toward western Bohemia. Its surviving gates give the town a grounded, watchful character.', heraldry: 'The walled gate, towers and crowned lion bind local craft, travel and Bohemian identity.', alt: 'Copper plate impression showing the historic coat of arms of Beroun'},
      zh: {city: '贝龙', title: '贝龙｜城市纹章铜板拓印', short: '一座城门，记住从布拉格向西的古老道路。', story: '贝龙沿河谷贸易路线生长，连接布拉格与西波希米亚。留存至今的城门，让这座城市带着沉静而警醒的气质。', heraldry: '城门、双塔与加冕狮把地方手艺、旅行与波希米亚身份合在一枚纹章中。', alt: '贝龙历史城市纹章手工铜板拓印作品'}
    }
  },
  {
    slug: 'prague', sku: 'COA-CZ-PR-004', region: 'bohemia',
    image: '/images/products/prague.jpg', exhibitionImage: '/images/exhibitions/prague.jpg', orientation: 'portrait',
    localized: {
      en: {city: 'Prague', title: 'Prague — Copper Plate Impression', short: 'Three towers and an open gate for the city of a hundred spires.', story: 'Prague is a city of thresholds: bridge and river, castle and market, medieval stone and ordinary life. Its arms reduce that layered city to a strong, memorable gate.', heraldry: 'Three towers rise above an open portcullis and arm, a compact emblem of defense, welcome and self-rule.', alt: 'Hand-worked copper impression of the Prague coat of arms'},
      zh: {city: '布拉格', title: '布拉格｜城市纹章铜板拓印', short: '三座塔与一扇门，属于百塔之城。', story: '布拉格是一座由边界构成的城市：桥与河、城堡与市集、中世纪石墙与日常生活。纹章把层叠的城市收束为一扇有力的门。', heraldry: '三座塔、开启的栅门与持剑手臂，凝练了守护、迎接和城市自治。', alt: '布拉格城市纹章手工铜板拓印作品'}
    }
  },
  {
    slug: 'tabor', sku: 'COA-CZ-TA-005', region: 'bohemia',
    image: '/images/products/tabor.jpg', exhibitionImage: '/images/exhibitions/tabor.jpg', orientation: 'portrait',
    localized: {
      en: {city: 'Tábor', title: 'Tábor — Copper Plate Impression', short: 'A lion stands above a gate shaped by conviction.', story: 'Tábor was formed by reformers who imagined a different civic order. The steep lanes and fortified setting still carry a sense of resolve.', heraldry: 'The crowned lion and gate balance Bohemian lineage with the town’s independent spirit.', alt: 'Limited copper plate impression of the Tábor coat of arms'},
      zh: {city: '塔博尔', title: '塔博尔｜城市纹章铜板拓印', short: '一头狮子，站在由信念筑成的城门之上。', story: '塔博尔由宗教改革者建立，他们曾在这里想象不同的城市秩序。陡峭街巷和防御地势，至今仍保留一种坚定感。', heraldry: '加冕狮与城门既延续波希米亚血脉，也保留这座城独立的精神。', alt: '塔博尔城市纹章限量手工铜板拓印作品'}
    }
  },
  {
    slug: 'czech-republic', sku: 'COA-CZ-CR-006', region: 'national',
    image: '/images/products/czech-republic.jpg', exhibitionImage: '/images/exhibitions/czech-republic.jpg', orientation: 'portrait',
    localized: {
      en: {city: 'Czech Republic', title: 'Czech Republic — Copper Plate Impression', short: 'The Bohemian lion, carried as a national memory.', story: 'Beyond any single city, the double-tailed lion is one of the Czech lands’ most enduring heraldic figures. Here it becomes an emblem of shared inheritance.', heraldry: 'The crowned double-tailed lion layers sovereignty, continuity and the visual language of Bohemia.', alt: 'Large copper plate impression of the Czech double-tailed lion'},
      zh: {city: '捷克共和国', title: '捷克共和国｜波希米亚狮铜板拓印', short: '一头双尾狮，承载共同的国家记忆。', story: '越过单一城市，双尾狮是捷克土地上最持久的纹章形象之一。在这件作品中，它成为共同文化继承的象征。', heraldry: '加冕双尾狮把主权、延续与波希米亚的视觉语言叠合在一起。', alt: '捷克双尾狮大型手工铜板拓印作品'}
    }
  },
  {
    slug: 'pardubice', sku: 'COA-CZ-PA-007', region: 'bohemia',
    image: '/images/products/pardubice.jpg', exhibitionImage: '/images/exhibitions/pardubice.jpg', orientation: 'portrait',
    localized: {
      en: {city: 'Pardubice', title: 'Pardubice — Copper Plate Impression', short: 'A silver horse in motion across copper.', story: 'Pardubice has long been associated with horses, movement and the flat Elbe landscape. The emblem feels unusually alive among civic arms.', heraldry: 'The leaping half-horse recalls the city’s noble lineages and its enduring equestrian identity.', alt: 'Copper plate impression of the running horse on the Pardubice arms'},
      zh: {city: '帕尔杜比采', title: '帕尔杜比采｜城市纹章铜板拓印', short: '一匹银马，在铜面上奔行。', story: '帕尔杜比采长久以来与马匹、速度和易北河平原相连。它的纹章在众多城市徽记中显得格外有生命力。', heraldry: '跃起的半身马既指向城市的贵族谱系，也延续至今的马术身份。', alt: '帕尔杜比采奔马城市纹章手工铜板拓印作品'}
    }
  },
  {
    slug: 'kutna-hora', sku: 'COA-CZ-KH-008', region: 'bohemia',
    image: '/images/products/kutna-hora.jpg', exhibitionImage: '/images/exhibitions/kutna-hora.jpg', orientation: 'portrait',
    localized: {
      en: {city: 'Kutná Hora', title: 'Kutná Hora — Copper Plate Impression', short: 'Silver miners and royal symbols shaped by hand.', story: 'Kutná Hora rose from medieval silver and rivalled Prague in wealth and influence. Its churches and mines hold the gravity of labour transformed into beauty.', heraldry: 'Mining tools, royal emblems and the central chalice record the source of the city’s historic prosperity.', alt: 'Portrait copper plate impression of the Kutná Hora mining coat of arms'},
      zh: {city: '库特纳霍拉', title: '库特纳霍拉｜城市纹章铜板拓印', short: '银矿工人与王家符号，在手工锤击中成形。', story: '库特纳霍拉因中世纪银矿而兴盛，财富和影响力一度与布拉格相望。教堂与矿井共同保留了劳动转化为美的重量。', heraldry: '采矿工具、王家徽记和中央圣杯，记录着城市历史繁荣的来源。', alt: '库特纳霍拉矿业城市纹章纵向手工铜板拓印作品'}
    }
  },
  {
    slug: 'hradec-kralove', sku: 'COA-CZ-HK-009', region: 'bohemia',
    image: '/images/products/hradec-kralove.jpg', exhibitionImage: '/images/exhibitions/hradec-kralove.jpg', processVideo: '/videos/hradec-kralove.mp4', orientation: 'portrait',
    localized: {
      en: {city: 'Hradec Králové', title: 'Hradec Králové — Copper Plate Impression', short: 'A crowned lion holds the letter G for a royal city.', story: 'Known as the Queen’s Castle, Hradec Králové layers a medieval core with disciplined modern architecture. Its emblem is both heraldic and typographic.', heraldry: 'The Bohemian lion holding a letter G marks the city’s royal status and historic name.', alt: 'Copper plate impression of the crowned lion arms of Hradec Králové'},
      zh: {city: '赫拉德茨-克拉洛韦', title: '赫拉德茨-克拉洛韦｜城市纹章铜板拓印', short: '加冕狮手持字母 G，守护一座王后之城。', story: '赫拉德茨-克拉洛韦意为“王后城堡”，中世纪核心与克制的现代建筑在此叠合。它的纹章既是图像，也是文字。', heraldry: '波希米亚狮手持字母 G，标记城市的王家地位与历史名称。', alt: '赫拉德茨-克拉洛韦加冕狮城市纹章铜板拓印作品'}
    }
  }
];

export const products: Product[] = entries.map((entry, index) => ({
  ...entry,
  priceCents: DEMO_PRICES[entry.slug],
  currency: 'EUR',
  stock: 10 - index,
  editionTotal: 10,
  editionNumber: 1,
  available: true
}));

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function formatPrice(product: Product, locale: Locale) {
  return new Intl.NumberFormat(locale === 'zh' ? 'zh-CN' : 'en-GB', {
    style: 'currency', currency: product.currency, maximumFractionDigits: 0
  }).format(product.priceCents / 100);
}
