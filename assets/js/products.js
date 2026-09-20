/**
 * NOVA — Premium Ecommerce Product Catalog Dataset
 * 22 realistic luxury lifestyle, fashion, beauty, accessories & design products
 */

const NOVA_PRODUCTS = [
  {
    id: "nova-01",
    brand: "atelier-vesper",
    brandName: "آتلیه وسپر",
    collection: "autumn-winter",
    collectionName: "پاییز و زمستان ۲۰۲۶",
    season: "پاییز / زمستان ۲۰۲۶",
    gender: "women",
    materials: ["پشم مرینوس استرالیا","ابریشم ملبری"],
    tags: ["پالتو","دست‌دوز","پاییزه","لوکس","آوانگارد"],
    name: "پالتو پشمی دست‌دوز مینیمال",
    enName: "Minimal Handcrafted Wool Coat",
    category: "fashion",
    categoryName: "مد و پوشاک",
    price: 4850000,
    oldPrice: 5900000,
    rating: 4.9,
    reviews: 38,
    badge: "تخفیف ویژه",
    badgeType: "sale",
    stock: 12,
    colors: [
      { name: "شنی طبیعی", hex: "#D8CAB8" },
      { name: "مشکی زغالی", hex: "#1C1C1C" },
      { name: "شکلاتی تیره", hex: "#4A3B32" }
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=900&q=80"
    ],
    description: "تلفیقی ماندگار از پشم طبیعی ۱۰۰٪ خالص استرالیایی و آستر ابریشمی اعلا. برشی باوقار و مدرن متناسب با استانداردهای فشن آوانگارد اروپا.",
    features: ["۱۰۰٪ پشم طبیعی مرینوس", "دوخت دست‌ساز استادکاران", "آستر داخلی ضدحساسیت ابریشمی", "تولید با تیراژ محدود"]
  },
  {
    id: "nova-02",
    brand: "officine-pelle",
    brandName: "اوفیچینه پله",
    collection: "desert-sand",
    collectionName: "شن و کهربا",
    season: "کالکشن دائمی",
    gender: "unisex",
    materials: ["چرم فول گرین توسکانی","برنج آبکاری طلا"],
    tags: ["کیف","چرم طبیعی","ایتالیایی","رسمی","روزمره"],
    name: "کیف دوشی چرم طبیعی ایتالیایی",
    enName: "Italian Full-Grain Leather Tote",
    category: "accessories",
    categoryName: "اکسسوری لوکس",
    price: 3600000,
    oldPrice: null,
    rating: 5.0,
    reviews: 54,
    badge: "پرفروش",
    badgeType: "hot",
    stock: 8,
    colors: [
      { name: "عسلی کاراملی", hex: "#A66E38" },
      { name: "مشکی مات", hex: "#1A1A1A" },
      { name: "زیتونی خاکی", hex: "#556B2F" }
    ],
    sizes: ["تک‌سایز"],
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=80"
    ],
    description: "کیف تمام‌چرم دست‌دوز با یراق‌آلات برنجی آبکاری طلا. ظرافتی بی‌نظیر برای محیط‌های کاری رسمی و مهمانی‌های پر زرق و برق.",
    features: ["چرم دانه‌کامل طبیعی توسکانی", "جیب اختصاصی لپ‌تاپ تا ۱۴ اینچ", "بند دوشی قابل تنظیم", "مقاوم در برابر سایش و رطوبت"]
  },
  {
    id: "nova-03",
    brand: "botanica-essentia",
    brandName: "بوتانیکا اسنتیا",
    collection: "silk-cashmere",
    collectionName: "ابریشم و کشمیر",
    season: "کالکشن دائمی",
    gender: "unisex",
    materials: ["عصاره روغنی خالص","کریستال دست‌تراش"],
    tags: ["عطر نیش","چوب صندل","عنبر","ماندگاری بالا","فرانسه"],
    name: "عطر نیش سنشوال چوب صندل و عنبر",
    enName: "Sensual Amber & Sandalwood Extrait",
    category: "beauty",
    categoryName: "زیبایی و عطر",
    price: 2950000,
    oldPrice: 3400000,
    rating: 4.8,
    reviews: 42,
    badge: "جدید",
    badgeType: "new",
    stock: 20,
    colors: [
      { name: "شیشه‌ای کریستال", hex: "#E8D8C8" }
    ],
    sizes: ["50ml", "100ml"],
    images: [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=900&q=80"
    ],
    description: "عصاره‌ای عمیق با غلظت اکستریت د پرفیوم. هارمونی جادویی نت‌های ترنج سیسیلی، چوب صندل کهنسال و وانیل دودی بوربون.",
    features: ["ماندگاری فراتر از ۲۴ ساعت", "عصاره طبیعی ارگانیک", "بطری کریستال تراش‌خورده سنگین", "طراحی شده توسط عطرسازان فرانسوی"]
  },
  {
    id: "nova-04",
    brand: "nordic-form",
    brandName: "نوردیک فرم",
    collection: "architectural-living",
    collectionName: "معماری و دکوراسیون",
    season: "کالکشن دائمی",
    gender: "unisex",
    materials: ["پارچه بوکله","چوب بلوط اتریشی"],
    tags: ["مبلمان","صندلی مدرن","اسکاندیناوی","ارگونومیک"],
    name: "صندلی استراحت مدرن اسکاندیناوی",
    enName: "Nordic Minimalist Lounge Chair",
    category: "living",
    categoryName: "خانه و دکوراسیون",
    price: 7200000,
    oldPrice: null,
    rating: 4.9,
    reviews: 19,
    badge: "پیشنهاد معماران",
    badgeType: "hot",
    stock: 5,
    colors: [
      { name: "کرم بوکله", hex: "#EDE8DF" },
      { name: "خاکستری ذغالی", hex: "#3A3A3A" }
    ],
    sizes: ["استاندارد"],
    images: [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=80"
    ],
    description: "شاهکاری از تعادل ارگونومیک با پارچه لوکس بوکله و پایه‌های چوب بلوط جنگلی اتریش. شکوه بصری آرامش‌بخش برای هر نشیمن معاصر.",
    features: ["پارچه بوکله ضدلک و بادوام", "اسکلت چوب بلوط اشباع‌شده", "فوم سرد تزریقی ارتوپدیک", "گارانتی تعویض ۵ ساله اسکلت"]
  },
  {
    id: "nova-05",
    brand: "studio-kian",
    brandName: "استودیو کیان",
    collection: "monochrome",
    collectionName: "مونوکروم مینیمال",
    season: "کالکشن دائمی",
    gender: "unisex",
    materials: ["استیل ضدزنگ ۳۱۶L","کریستال سافایر","موتور میوتا ژاپن"],
    tags: ["ساعت مچی","مینیمال","ضدآب","استیل"],
    name: "ساعت کلاسیک عقربه‌ای استیل ۳۱۶",
    enName: "Monochrome Minimalist Chrono Watch",
    category: "accessories",
    categoryName: "اکسسوری لوکس",
    price: 4200000,
    oldPrice: 4900000,
    rating: 4.9,
    reviews: 67,
    badge: "محبوب‌ترین",
    badgeType: "hot",
    stock: 15,
    colors: [
      { name: "نقره‌ای مات", hex: "#C5C6C7" },
      { name: "رزگلد متالیک", hex: "#B76E79" },
      { name: "مشکی استیل", hex: "#1F2022" }
    ],
    sizes: ["40mm"],
    images: [
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80"
    ],
    description: "حرکت کوارتز دقیق ژاپنی، شیشه یاقوت کبود ضدخش و بدنه استیل ۳۱۶L ضدزنگ با مقاومت در برابر ۵۰ متر عمق آب.",
    features: ["شیشه کریستال سافایر", "موتور دقیق میوتا ژاپن", "بند چرم طبیعی قابل تعویض", "مقاومت در برابر آب ۵ATM"]
  },
  {
    id: "nova-06",
    brand: "sole-milano",
    brandName: "سوله میلانو",
    collection: "monochrome",
    collectionName: "مونوکروم مینیمال",
    season: "کالکشن دائمی",
    gender: "unisex",
    materials: ["استات مازوکلی ایتالیا","لنز پلاریزه UV400"],
    tags: ["عینک آفتابی","استات طبیعی","دست‌ساز","پلاریزه"],
    name: "عینک آفتابی استات دست‌ساز تیپ آیکونیک",
    enName: "Architectural Acetate Sunglasses",
    category: "accessories",
    categoryName: "اکسسوری لوکس",
    price: 1850000,
    oldPrice: 2200000,
    rating: 4.7,
    reviews: 29,
    badge: "جدید",
    badgeType: "new",
    stock: 14,
    colors: [
      { name: "پلنگی هاوانا", hex: "#70482B" },
      { name: "مشکی آبنوسی", hex: "#111111" }
    ],
    sizes: ["استاندارد"],
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=900&q=80"
    ],
    description: "فریم‌های تراش‌خورده با استات طبیعی مازوکلی ایتالیا. لنزهای پلاریزه UV400 با محافظت کامل در برابر تشعشعات مضر خورشیدی.",
    features: ["استات ارگانیک ایتالیایی", "لنزهای Polarized UV400", "لولاهای ۵ مفصله تقویت‌شده", "جعبه چرمی دست‌دوز اختصاصی"]
  },
  {
    id: "nova-07",
    brand: "lumina-lab",
    brandName: "لومینا لب",
    collection: "architectural-living",
    collectionName: "معماری و دکوراسیون",
    season: "کالکشن دائمی",
    gender: "unisex",
    materials: ["سرامیک حرارتی","درایور نئودیمیوم","آلومینیوم"],
    tags: ["اسپیکر","های-فای","سرامیکی","فناوری مینیمال"],
    name: "اسپیکر خانگی سرامیکی بی‌سیم های-فای",
    enName: "Hi-Fi Studio Ceramic Speaker",
    category: "tech",
    categoryName: "فناوری مینیمال",
    price: 5400000,
    oldPrice: null,
    rating: 4.9,
    reviews: 31,
    badge: "فناوری روز",
    badgeType: "hot",
    stock: 9,
    colors: [
      { name: "سفید گچی", hex: "#F3F3F3" },
      { name: "دودی سنگی", hex: "#424242" }
    ],
    sizes: ["رومیزی"],
    images: [
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80"
    ],
    description: "بدنه سرامیک پخته شده در دمای ۱۲۰۰ درجه برای مهار رزونانس‌های مزاحم صوتی. صدای کریستالی با پشتیبانی از بلوتوث ۵.۳ و کابل اپتیکال.",
    features: ["توان خروجی ۶۰ وات واقعی", "درایورهای نئودیمیوم باکیفیت", "شارژدهی باتری تا ۱۸ ساعت", "پشتیبانی از صدای Hi-Res"]
  },
  {
    id: "nova-08",
    brand: "botanica-essentia",
    brandName: "بوتانیکا اسنتیا",
    collection: "desert-sand",
    collectionName: "شن و کهربا",
    season: "کالکشن دائمی",
    gender: "women",
    materials: ["اسید هیالورونیک ۵ لایه","جلبک قرمز قطبی","بیوپپتید"],
    tags: ["مراقبت پوست","سرم آبرسان","وگان","ضدچروک"],
    name: "سرم آبرسان عمیق جلبک دریایی و پپتید",
    enName: "Bio-Peptide Marine Hydrating Serum",
    category: "beauty",
    categoryName: "زیبایی و عطر",
    price: 1450000,
    oldPrice: 1750000,
    rating: 4.8,
    reviews: 61,
    badge: "تخفیف ویژه",
    badgeType: "sale",
    stock: 25,
    colors: [
      { name: "سبز ملایم", hex: "#B8D8BA" }
    ],
    sizes: ["30ml", "50ml"],
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1608248597359-00f72384c45b?auto=format&fit=crop&w=900&q=80"
    ],
    description: "فرمول غنی شده با ۵ نوع اسید هیالورونیک، عصاره جلبک قرمز قطب شمال و پپتیدهای جوانساز. درخشش طبیعی و احیای سد دفاعی پوست.",
    features: ["۱۰۰٪ گیاهی و وگان", "فاقد پارابن، الکل و اسانس مصنوعی", "جذب سریع بدون چسبندگی", "مناسب انواع پوست حتی حساس"]
  },
  {
    id: "nova-09",
    brand: "atelier-vesper",
    brandName: "آتلیه وسپر",
    collection: "desert-sand",
    collectionName: "شن و کهربا",
    season: "بهار ۲۰۲۶",
    gender: "men",
    materials: ["لینن ارگانیک کانسای ژاپن","دکمه چوب زیتون"],
    tags: ["کت تک","لینن","ژاپنی","خنک","کژوال لوکس"],
    name: "کت لینن بهاره ارگانیک ژاپنی",
    enName: "Japanese Organic Linen Blazer",
    category: "fashion",
    categoryName: "مد و پوشاک",
    price: 3800000,
    oldPrice: null,
    rating: 4.7,
    reviews: 24,
    badge: "کالکشن جدید",
    badgeType: "new",
    stock: 11,
    colors: [
      { name: "کرم طبیعی", hex: "#EADCC9" },
      { name: "سبز سدر", hex: "#7E8A78" }
    ],
    sizes: ["S", "M", "L"],
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80"
    ],
    description: "بافته شده با نخ لینن صددرصد ارگانیک کشت شده در کانسای ژاپن. ساختاری خنک، تنفس‌پذیر و بافتی باوقار برای فصول معتدل و گرم.",
    features: ["نخ طبیعی الیاف کتان", "دکمه‌های ارگانیک چوب زیتون", "تنفس‌پذیری فوق‌العاده بالا", "دوخت مزونی ظریف"]
  },
  {
    id: "nova-10",
    brand: "lumina-lab",
    brandName: "لومینا لب",
    collection: "architectural-living",
    collectionName: "معماری و دکوراسیون",
    season: "کالکشن دائمی",
    gender: "unisex",
    materials: ["بتن ریخته‌گری صیقلی","شیشه دمیده دهانی"],
    tags: ["چراغ خواب","بتنی","دیمر لمسی","نورپردازی معماری"],
    name: "چراغ خواب بتنی معماری با دیمر لمسی",
    enName: "Brutalist Cast-Concrete Table Lamp",
    category: "living",
    categoryName: "خانه و دکوراسیون",
    price: 1950000,
    oldPrice: 2400000,
    rating: 4.9,
    reviews: 33,
    badge: "پرفروش",
    badgeType: "hot",
    stock: 18,
    colors: [
      { name: "خاکستری بتنی", hex: "#B0B0B0" },
      { name: "تراکوتا رسی", hex: "#C66D54" }
    ],
    sizes: ["رومیزی"],
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=900&q=80"
    ],
    description: "تلاقی جسورانه ماده زمخت بتن و حباب شیشه‌ای دهان‌دمیده نیمه‌مات. دارای سنسور لمسی دیمر با ۳ طیف نوری گرم و چشم‌نواز.",
    features: ["پایه بتنی دست‌ساز پرداخت‌شده", "سنسور لمسی شدت روشنایی", "لامپ LED کم‌مصرف آفتابی", "کابل نخی بافته‌شده باکیفیت"]
  },
  {
    id: "nova-11",
    brand: "maison-aria",
    brandName: "مِزون آریا",
    collection: "autumn-winter",
    collectionName: "پاییز و زمستان ۲۰۲۶",
    season: "پاییز / زمستان ۲۰۲۶",
    gender: "unisex",
    materials: ["کشمیر ۱۰۰٪ مغولستان","ریشه دست‌دوز"],
    tags: ["شال","کشمیر","ترمه","فوق‌سبک","زمستانه"],
    name: "شال ترمه و کشمیر فوق‌سبک",
    enName: "Ultra-Lightweight Cashmere Scarf",
    category: "fashion",
    categoryName: "مد و پوشاک",
    price: 1650000,
    oldPrice: 1950000,
    rating: 4.8,
    reviews: 47,
    badge: "تخفیف ویژه",
    badgeType: "sale",
    stock: 14,
    colors: [
      { name: "استخوانی", hex: "#F3EDE2" },
      { name: "دودی نقره‌ای", hex: "#C7C7C7" },
      { name: "آبی درباری", hex: "#2C3E50" }
    ],
    sizes: ["200x70cm"],
    images: [
      "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=900&q=80"
    ],
    description: "لطافتی باورنکردنی از ۱۰۰٪ کرک کشمیر مغولستان با لبه‌های ریشه‌دوزی دست‌ساز. گرما و وزنی بی‌وزن برای تمام فصول سال.",
    features: ["کشمیر درجه یک A-Grade", "بافت متراکم و ضدپرز", "رنگرزی گیاهی دوستدار محیط زیست", "بسته‌بندی کادویی اختصاصی"]
  },
  {
    id: "nova-12",
    brand: "lumina-lab",
    brandName: "لومینا لب",
    collection: "monochrome",
    collectionName: "مونوکروم مینیمال",
    season: "کالکشن دائمی",
    gender: "unisex",
    materials: ["آلومینیوم آندایز شده","چرم ارگانیک","فوم حافظه‌دار"],
    tags: ["هدفون","نویزکنسلینگ","استودیویی","بی‌سیم"],
    name: "هدفون روگوشی نویزکنسلینگ استودیویی",
    enName: "Studio ANC Wireless Headphones",
    category: "tech",
    categoryName: "فناوری مینیمال",
    price: 6800000,
    oldPrice: 7500000,
    rating: 5.0,
    reviews: 88,
    badge: "ویژه",
    badgeType: "hot",
    stock: 7,
    colors: [
      { name: "نقره‌ای مات", hex: "#D6D6D6" },
      { name: "مشکی ابسیدیان", hex: "#171717" }
    ],
    sizes: ["استاندارد"],
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=900&q=80"
    ],
    description: "طراحی مینیمال آلومینیومی همراه با بالشتک‌های فوم حافظه‌دار با روکش چرم طبیعی. حذف فعال نویز پیشرفته هیبریدی با شفافیت صدای واقعی.",
    features: ["فناوری Active Noise Cancelling", "شارژدهی باتری تا ۴۰ ساعت", "پدهای چرمی با حافظه ابری", "درایورهای داینامیک ۴۰ میلی‌متری"]
  },
  {
    id: "nova-13",
    brand: "nordic-form",
    brandName: "نوردیک فرم",
    collection: "architectural-living",
    collectionName: "معماری و دکوراسیون",
    season: "کالکشن دائمی",
    gender: "unisex",
    materials: ["سرامیک متراکم","لعاب مات پودری"],
    tags: ["دکوراسیون","گلدان مجسمه‌ای","مینیمال","سرامیک"],
    name: "گلدان سرامیکی زاویه‌دار معمارانه",
    enName: "Architectural Sculptural Ceramic Vase",
    category: "living",
    categoryName: "خانه و دکوراسیون",
    price: 1150000,
    oldPrice: null,
    rating: 4.6,
    reviews: 19,
    badge: "دیزاین",
    badgeType: "new",
    stock: 22,
    colors: [
      { name: "سفید مات کرکی", hex: "#FAF8F5" },
      { name: "مشکی گرافیتی", hex: "#2B2B2B" }
    ],
    sizes: ["30cm", "45cm"],
    images: [
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=900&q=80"
    ],
    description: "فرم مجسمه‌ای با زاویه‌بندی‌های منحصربه‌فرد که حتی بدون گل نیز به عنوان یک تندیس هنری خیره‌کننده بر روی میز جلوه می‌کند.",
    features: ["سرامیک کوره‌ای مقاوم در برابر نشت آب", "لعاب مات مات‌پوش", "تک‌سازی دستی توسط سفالگران", "کف پوشیده با پد ضدخش"]
  },
  {
    id: "nova-14",
    brand: "botanica-essentia",
    brandName: "بوتانیکا اسنتیا",
    collection: "desert-sand",
    collectionName: "شن و کهربا",
    season: "کالکشن دائمی",
    gender: "unisex",
    materials: ["روغن آرگان ۱۰۰٪ پرس سرد مراکش"],
    tags: ["روغن آرگان","ارگانیک","پوست و مو","اکسیر طبیعی"],
    name: "روغن تغذیه‌کننده مو و پوست آرگان خالص",
    enName: "Organic Cold-Pressed Argan Elixir",
    category: "beauty",
    categoryName: "زیبایی و عطر",
    price: 980000,
    oldPrice: 1200000,
    rating: 4.9,
    reviews: 75,
    badge: "پرفروش",
    badgeType: "sale",
    stock: 30,
    colors: [
      { name: "طلایی کهربایی", hex: "#FFBF00" }
    ],
    sizes: ["50ml", "100ml"],
    images: [
      "https://images.unsplash.com/photo-1608248597359-00f72384c45b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80"
    ],
    description: "روغن آرگان ۱۰۰٪ ارگانیک استخراج شده با پرس سرد از دانه‌های درختان کهنسال مراکش. سرشار از اسیدهای چرب امگا و ویتامین E طبیعی.",
    features: ["پرس سرد خالص و تصفیه‌نشده", "بدون افزودنی یا روغن‌های رقیق‌کننده", "تقویت ساختار تار مو و احیای ناخن", "دارای سرتیفیکیت ارگانیک ECOCERT"]
  },
  {
    id: "nova-15",
    brand: "officine-pelle",
    brandName: "اوفیچینه پله",
    collection: "autumn-winter",
    collectionName: "پاییز و زمستان ۲۰۲۶",
    season: "پاییز / زمستان ۲۰۲۶",
    gender: "men",
    materials: ["چرم گوساله فول گرین واکس‌خورده","زیره Vibram"],
    tags: ["کفش چرم","دربی","دست‌دوز","کلاسیک","ویبرام"],
    name: "کفش چرم دربی مینیمال واکس‌خورده",
    enName: "Hand-Burnished Leather Derby Shoes",
    category: "fashion",
    categoryName: "مد و پوشاک",
    price: 3450000,
    oldPrice: 4100000,
    rating: 4.8,
    reviews: 36,
    badge: "تخفیف ویژه",
    badgeType: "sale",
    stock: 8,
    colors: [
      { name: "قهوه‌ای گردویی", hex: "#5C4033" },
      { name: "مشکی براق", hex: "#1B1B1B" }
    ],
    sizes: ["40", "41", "42", "43", "44"],
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=900&q=80"
    ],
    description: "کفش کلاسیک دربی با کفی ضخیم لاستیکی Vibram و رویه چرم طبیعی گوساله. راحتی فوق‌العاده در طول پیاده‌روی‌های شهری طولانی.",
    features: ["رویه چرم گوساله فول گرین", "زیره ارگونومیک سبک و بادوام", "کفی داخلی طبی با تنفس آنتی‌باکتریال", "دوخت گودیر با قابلیت تعمیر مادام‌العمر"]
  },
  {
    id: "nova-16",
    brand: "nordic-form",
    brandName: "نوردیک فرم",
    collection: "architectural-living",
    collectionName: "معماری و دکوراسیون",
    season: "کالکشن دائمی",
    gender: "unisex",
    materials: ["خاک رس ترکیبی","لعاب طبیعی بدون سرب"],
    tags: ["ماگ","سرامیک دست‌ساز","استودیویی","قهوه"],
    name: "ماگ سرامیکی استودیویی دست‌ساز",
    enName: "Artisanal Studio Ceramic Mug",
    category: "living",
    categoryName: "خانه و دکوراسیون",
    price: 480000,
    oldPrice: null,
    rating: 4.9,
    reviews: 94,
    badge: "پرفروش",
    badgeType: "hot",
    stock: 45,
    colors: [
      { name: "کرم دون‌دار", hex: "#EBE3D5" },
      { name: "آبی خاکی مات", hex: "#7E94A0" }
    ],
    sizes: ["350ml"],
    images: [
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&w=900&q=80"
    ],
    description: "هر ماگ با چرخ سفالگری و با لعاب‌کاری غیریکنواخت اختصاصی متولد شده است؛ به این معنی که هیچ دو ماگی کاملاً شبیه به یکدیگر نیستند.",
    features: ["قابل استفاده در مایکروویو و ماشین ظرفشویی", "لعاب ایمن با گرید خوراکی بدون سرب", "دسته با ارگونومی عالی برای گرفتن دست", "حفظ طولانی‌مدت دمای نوشیدنی"]
  },
  {
    id: "nova-17",
    brand: "studio-kian",
    brandName: "استودیو کیان",
    collection: "architectural-living",
    collectionName: "معماری و دکوراسیون",
    season: "کالکشن دائمی",
    gender: "unisex",
    materials: ["چوب گردو آمریکایی","برنج پولیش‌خورده"],
    tags: ["شارژر وایرلس","چوب گردو","مگ‌سیف","اکسسوری میز"],
    name: "پایه شارژر وایرلس چوب گردو و برنج",
    enName: "Walnut & Brass Wireless Charging Dock",
    category: "tech",
    categoryName: "فناوری مینیمال",
    price: 1850000,
    oldPrice: 2100000,
    rating: 4.8,
    reviews: 28,
    badge: "جدید",
    badgeType: "new",
    stock: 16,
    colors: [
      { name: "چوب گردو آمریکایی", hex: "#5C4033" },
      { name: "چوب زبان‌گنجشک روشن", hex: "#D2B48C" }
    ],
    sizes: ["دوگانه"],
    images: [
      "https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1622445262464-84b1456045b6?auto=format&fit=crop&w=900&q=80"
    ],
    description: "استند شارژ همزمان گوشی و ایرپاد با سرعت شارژ ۱۵ وات سازگار با استاندارد MagSafe. ساخته شده از چوب طبیعی دست‌چین گردو.",
    features: ["شارژ سریع بی‌سیم ۱۵ وات", "پایه وزین برنجی ضدلغزش", "پد محافظ چرم گیاهی ضدخش", "کابل نایلونی بافته شده تایپ سی"]
  },
  {
    id: "nova-18",
    brand: "officine-pelle",
    brandName: "اوفیچینه پله",
    collection: "monochrome",
    collectionName: "مونوکروم مینیمال",
    season: "کالکشن دائمی",
    gender: "men",
    materials: ["چرم هورس واکس‌خورده","فویل مسدودکننده RFID"],
    tags: ["کیف پول","کارت هولدر","باریک","RFID"],
    name: "کیف پول جیبی چرم مینیمال اسلیم",
    enName: "Ultra-Slim Cardholder Wallet",
    category: "accessories",
    categoryName: "اکسسوری لوکس",
    price: 890000,
    oldPrice: 1100000,
    rating: 4.7,
    reviews: 58,
    badge: "پیشنهادی",
    badgeType: "sale",
    stock: 28,
    colors: [
      { name: "قهوه‌ای کاراملی", hex: "#8B5A2B" },
      { name: "مشکی مات کربنی", hex: "#1E1E1E" }
    ],
    sizes: ["جیب کتی"],
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80"
    ],
    description: "ضخامت تنها ۴ میلی‌متر با ظرفیت ۶ کارت بانکی و محفظه اسکناس تا شده. مجهز به لایه محافظ RFID جهت مسدودسازی تراکنش‌های ناخواسته.",
    features: ["فناوری محافظت ضدسرقت RFID", "چرم هورس واکس‌خورده دست‌دوز", "فوق‌العاده باریک و سبک وزن", "لبه‌های رنگ‌شده دستی با رزین"]
  },
  {
    id: "nova-19",
    brand: "botanica-essentia",
    brandName: "بوتانیکا اسنتیا",
    collection: "architectural-living",
    collectionName: "معماری و دکوراسیون",
    season: "کالکشن دائمی",
    gender: "unisex",
    materials: ["موم سویای ارگانیک","فتیله چوب طبیعی","ظرف سرامیکی"],
    tags: ["شمع معطر","سویا","فتیله چوبی","آروماتراپی"],
    name: "شمع معطر مومی با فتیله چوبی سوزان",
    enName: "Botanical Soy Candle with Wood Wick",
    category: "living",
    categoryName: "خانه و دکوراسیون",
    price: 650000,
    oldPrice: null,
    rating: 4.9,
    reviews: 82,
    badge: "محبوب",
    badgeType: "hot",
    stock: 35,
    colors: [
      { name: "ظرف سرامیک کهربا", hex: "#B8860B" }
    ],
    sizes: ["300g"],
    images: [
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80"
    ],
    description: "موم صددرصد طبیعی سویا با اسانس‌های درمانی رزماری، لوندر و چوب سدر. فتیله چوبی طبیعی هنگام سوختن صدای آرامش‌بخش شومینه را تداعی می‌کند.",
    features: ["سوخت بدون دود و سازگار با ریه", "فتیله چوبی با صدای سوختن آرام شومینه", "زمان سوخت تقریبی ۵۵ ساعت", "ظرف چندبارمصرف زیبای سرامیکی"]
  },
  {
    id: "nova-20",
    brand: "studio-kian",
    brandName: "استودیو کیان",
    collection: "desert-sand",
    collectionName: "شن و کهربا",
    season: "کالکشن دائمی",
    gender: "women",
    materials: ["برنج صیقلی","آبکاری طلای ۱۸ عیار ۵ میکرون"],
    tags: ["دستبند","طلا ۱۸ عیار","النگو","مینیمال","لوکس"],
    name: "دستبند النگویی برنجی با روکش طلا ۱۸ عیار",
    enName: "Architectural Gold-Plated Bangle",
    category: "accessories",
    categoryName: "اکسسوری لوکس",
    price: 1350000,
    oldPrice: 1600000,
    rating: 4.9,
    reviews: 40,
    badge: "لوکس",
    badgeType: "sale",
    stock: 15,
    colors: [
      { name: "طلایی شامپاینی", hex: "#E5C158" },
      { name: "نقره‌ای رودیوم", hex: "#E0E0E0" }
    ],
    sizes: ["قابل تنظیم"],
    images: [
      "https://images.unsplash.com/photo-1611591475819-797de4d75f3f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=80"
    ],
    description: "خطوط هندسی خالص با انحنای ارگونومیک بر مچ دست. پوشش آبکاری طلا ۱۸ عیار با ضخامت ۵ میکرون برای درخشش و ماندگاری همیشگی.",
    features: ["آبکاری طلای ۱۸ عیار ضدکدرشدگی", "ساختار بدون نیکل و ضدحساسیت", "فری‌سایز با انعطاف ملایم", "حکاکی ظریف لوگوی نُوا در لبه داخلی"]
  },
  {
    id: "nova-21",
    brand: "maison-aria",
    brandName: "مِزون آریا",
    collection: "silk-cashmere",
    collectionName: "ابریشم و کشمیر",
    season: "بهار ۲۰۲۶",
    gender: "women",
    materials: ["۱۰۰٪ ابریشم ساتن ملبری"],
    tags: ["پیراهن شب","ابریشم","ماکسی","ساتن","مجلسی"],
    name: "پیراهن ماکسی ابریشمی شب مدل سلستیا",
    enName: "Silk Satin Celestia Evening Dress",
    category: "fashion",
    categoryName: "مد و پوشاک",
    price: 5200000,
    oldPrice: 6200000,
    rating: 5.0,
    reviews: 19,
    badge: "محدود",
    badgeType: "hot",
    stock: 6,
    colors: [
      { name: "زمردی عمیق", hex: "#046307" },
      { name: "شامپاینی نود", hex: "#E6D5B8" },
      { name: "مشکی شبق", hex: "#111111" }
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80"
    ],
    description: "پیراهن ساتن ابریشمی مجلل با ریزش فوق‌العاده زیبا بر اندام. طراحی شده برای ضیافت‌های مجلل با برشی متقارن و پرجذبه.",
    features: ["۱۰۰٪ ابریشم خالص ملبری", "بندهای باریک قابل تنظیم", "برش مورب ارگانیک روی بافت پارچه", "بسته‌بندی در کاور ضدغبار ارگانزا"]
  },
  {
    id: "nova-22",
    brand: "maison-aria",
    brandName: "مِزون آریا",
    collection: "silk-cashmere",
    collectionName: "ابریشم و کشمیر",
    season: "پاییز / زمستان ۲۰۲۶",
    gender: "unisex",
    materials: ["پشم بره مرینوس","کشمیر نپال"],
    tags: ["پتو مسافرتی","ژاکارد","کشمیر","پشم بره","دکوراسیون"],
    name: "پتو مسافرتی کشمیری طرح هندسی",
    enName: "Geometric Jacquard Cashmere Throw",
    category: "living",
    categoryName: "خانه و دکوراسیون",
    price: 3950000,
    oldPrice: 4500000,
    rating: 4.8,
    reviews: 31,
    badge: "پیشنهادی",
    badgeType: "sale",
    stock: 10,
    colors: [
      { name: "کرم و تائوپی", hex: "#C3B091" },
      { name: "طوسی و آبی نفتی", hex: "#4A5568" }
    ],
    sizes: ["140x180cm"],
    images: [
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=80"
    ],
    description: "بافت ژاکارد دورو با تلفیق پشم بره و الیاف کشمیر نپالی. انتخابی رویایی برای گرمابخشی به مبل و تختخواب با ظاهری اشرافی.",
    features: ["ترکیب کشمیر و پشم گوسفند اعلا", "بافت دورو با دو ترکیب رنگ مجزا", "گرمادهی استثنایی با وزن مطلوب", "ریشه‌های دست‌بافت نفیس"]
  }
];

// Formatting Helper Functions
function formatPrice(amount) {
  if (typeof amount !== 'number') return '۰ تومان';
  return amount.toLocaleString('fa-IR') + ' تومان';
}

function formatNumber(num) {
  if (typeof num !== 'number') return '۰';
  return num.toLocaleString('fa-IR');
}

function getAllProducts() {
  return NOVA_PRODUCTS;
}

function getProductById(id) {
  return NOVA_PRODUCTS.find(p => p.id === id) || null;
}

function getProductsByCategory(cat) {
  if (!cat || cat === 'all') return NOVA_PRODUCTS;
  return NOVA_PRODUCTS.filter(p => p.category === cat);
}

// Global helper to render a uniform product card HTML
function renderProductCardHTML(p, isList = false, index = 0) {
  const isWishlisted = window.novaWishlist && window.novaWishlist.has(p.id);
  const badgeClass = p.badgeType ? `badge-${p.badgeType}` : 'badge-new';
  const delayClass = index > 0 ? `delay-${((index - 1) % 5) + 1}` : '';

  return `
    <article class="product-card ${isList ? 'list-view' : ''} reveal-fade-up ${delayClass}" id="card-${p.id}">
      <div class="product-card-media">
        <a href="product.html?id=${p.id}" style="display:block; width:100%; height:100%;">
          <img src="${p.images[0]}" alt="${p.name}" class="product-card-img primary img-blur-up" width="600" height="800" loading="lazy" onload="this.classList.add('is-loaded')">
          ${p.images[1] ? `<img src="${p.images[1]}" alt="${p.name}" class="product-card-img secondary img-blur-up" width="600" height="800" loading="lazy" onload="this.classList.add('is-loaded')">` : ''}
        </a>

        ${p.badge ? `
          <div class="product-card-badges">
            <span class="badge ${badgeClass}">${p.badge}</span>
          </div>
        ` : ''}

        <div class="product-card-actions">
          <button class="card-action-btn ${isWishlisted ? 'active' : ''}" data-wishlist-id="${p.id}" onclick="novaWishlist.toggle('${p.id}')" title="علاقه‌مندی">
            <svg viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
          </button>
          <button class="card-action-btn" onclick="novaCompare.toggle('${p.id}')" title="مقایسه">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
          </button>
          <button class="card-action-btn" onclick="openQuickView('${p.id}')" title="مشاهده سریع">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
          </button>
        </div>

        <div class="product-card-quick-add">
          <button class="btn btn-primary btn-sm btn-block" onclick="novaCart.addItem('${p.id}', 1)">
            افزودن سریع به سبد
          </button>
        </div>
      </div>

      <div class="product-card-body">
        <span class="product-card-category">${p.categoryName}</span>
        <a href="product.html?id=${p.id}" class="product-card-title">${p.name}</a>
        
        <div class="product-card-rating">
          <span>★</span>
          <span>${p.rating.toLocaleString('fa-IR')}</span>
          <span class="rating-count">(${p.reviews.toLocaleString('fa-IR')})</span>
        </div>

        <div class="product-card-price">
          <span class="current-price">${formatPrice(p.price)}</span>
          ${p.oldPrice ? `<span class="old-price">${formatPrice(p.oldPrice)}</span>` : ''}
        </div>

        ${p.colors && p.colors.length > 1 ? `
          <div class="product-card-colors">
            ${p.colors.map(c => `
              <span class="color-swatch-dot" style="background-color: ${c.hex};" title="${c.name}"></span>
            `).join('')}
          </div>
        ` : ''}
      </div>
    </article>
  `;
}
window.renderProductCardHTML = renderProductCardHTML;

// Skeleton card generator for loading states
function renderSkeletonCardsHTML(count = 6) {
  return Array.from({ length: count }).map(() => `
    <div class="skeleton-card" aria-hidden="true">
      <div class="skeleton skeleton-img"></div>
      <div class="skeleton-body">
        <div class="skeleton skeleton-line short"></div>
        <div class="skeleton skeleton-line long"></div>
        <div class="skeleton skeleton-line medium"></div>
        <div class="skeleton skeleton-btn"></div>
      </div>
    </div>
  `).join('');
}
window.renderSkeletonCardsHTML = renderSkeletonCardsHTML;

// ==========================================================================
// Recently Viewed Products Engine
// Tracks last 6 viewed products persistently via localStorage.
// Used by the homepage "Recently Viewed" section and product detail pages.
// ==========================================================================
const RECENTLY_VIEWED_KEY = 'nova_recently_viewed';
const MAX_RECENTLY_VIEWED = 6;

function trackRecentlyViewed(productId) {
  if (!productId) return;
  try {
    let viewed = getRecentlyViewed();
    // Move to front if already present, otherwise prepend
    viewed = [productId, ...viewed.filter(id => id !== productId)];
    // Limit to max count
    viewed = viewed.slice(0, MAX_RECENTLY_VIEWED);
    localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(viewed));
  } catch (e) {}
}

function getRecentlyViewed() {
  try {
    const data = localStorage.getItem(RECENTLY_VIEWED_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

function renderRecentlyViewedSection(excludeId = null) {
  const container = document.getElementById('recently-viewed-grid');
  if (!container) return;

  const viewedIds = getRecentlyViewed().filter(id => id !== excludeId);
  if (viewedIds.length === 0) {
    // Hide the whole section if nothing was viewed
    const section = document.getElementById('recently-viewed-section');
    if (section) section.style.display = 'none';
    return;
  }

  const section = document.getElementById('recently-viewed-section');
  if (section) section.style.display = '';

  const products = viewedIds
    .map(id => getProductById(id))
    .filter(Boolean)
    .slice(0, 4);

  container.innerHTML = products.map((p, idx) => renderProductCardHTML(p, false, idx + 1)).join('');
  if (window.novaWishlist) window.novaWishlist.updateCardButtons();
  if (window.initScrollReveal) window.initScrollReveal();
}

window.trackRecentlyViewed = trackRecentlyViewed;
window.getRecentlyViewed = getRecentlyViewed;
window.renderRecentlyViewedSection = renderRecentlyViewedSection;


function getProductsByCollection(collectionSlug) {
  if (!collectionSlug || collectionSlug === 'all') return NOVA_PRODUCTS;
  return NOVA_PRODUCTS.filter(p => p.collection === collectionSlug);
}

function getProductsByBrand(brandSlug) {
  if (!brandSlug || brandSlug === 'all') return NOVA_PRODUCTS;
  return NOVA_PRODUCTS.filter(p => p.brand === brandSlug);
}

function getProductsByGender(gender) {
  if (!gender || gender === 'all') return NOVA_PRODUCTS;
  return NOVA_PRODUCTS.filter(p => p.gender === gender || p.gender === 'unisex');
}

function getRelatedProducts(productId, limit = 4) {
  const current = getProductById(productId);
  if (!current) return NOVA_PRODUCTS.slice(0, limit);
  return NOVA_PRODUCTS.filter(p => p.id !== productId && (p.category === current.category || p.collection === current.collection)).slice(0, limit);
}

window.getProductsByCollection = getProductsByCollection;
window.getProductsByBrand = getProductsByBrand;
window.getProductsByGender = getProductsByGender;
window.getRelatedProducts = getRelatedProducts;
