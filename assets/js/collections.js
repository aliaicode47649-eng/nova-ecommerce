/**
 * NOVA — Collections Engine & Catalog Showcase
 * Manages seasonal collections, storytelling, mood filtering, and collection landing pages
 */

const NOVA_COLLECTIONS = [
  {
    id: "autumn-winter",
    slug: "autumn-winter",
    title: "پاییز و زمستان ۲۰۲۶",
    enTitle: "Autumn / Winter 2026",
    tagline: "دیالوگ پشم، کشمیر و خطوط ارگانیک",
    concept: "تلاقی باوقار سرما و گرمای الیاف طبیعی استرالیایی و نپالی. هر طرح با الهام از معماری زاویه‌دار معاصر اروپا و سکوت جنگل‌های کوهستانی طراحی شده است. برش‌های آزاد و در عین حال ساختارمند، شکوهی جاودان به استایل روزمره می‌بخشند.",
    quote: "زیبایی واقعی در سکوت نهفته است؛ جایی که کیفیت خالص بافت، بلندتر از هر شعاری سخن می‌گوید.",
    mood: "minimal",
    moodLabel: "مینیمالیسم مدرن",
    season: "پاییز / زمستان ۲۰۲۶",
    heroImage: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1600&q=85",
    accentColor: "#B08D57",
    materials: [
      { name: "پشم مرینوس خالص", desc: "گرمای مطبوع با الیاف بسیار متراکم ضدپرز بدون احساس خارش یا سنگینی." },
      { name: "کشمیر دست‌چین نپال", desc: "ظرافت لمسی فراتر از استاندارد برای ایستایی بی‌نقص روی اندام." },
      { name: "چرم طبیعی واکس‌خورده", desc: "دباغی گیاهی پایدار توسکانی با مقاومت استثنایی در برابر نفوذ سرما." }
    ]
  },
  {
    id: "monochrome",
    slug: "monochrome",
    title: "مونوکروم مینیمال",
    enTitle: "Monochrome Minimalist",
    tagline: "سکوت فرم‌ها در تلاقی نور و سایه",
    concept: "مجموعه‌ای متمرکز بر هندسه مطلق سیاه، سفید و خاکستری بتنی. حذف تمام المان‌های اضافه برای رسیدن به ذات خالص فرم، ماده و کارکرد مدرن.",
    quote: "فرم از عملکرد پیروی می‌کند، اما زیبایی از خلوص ذهن متولد می‌شود.",
    mood: "avantgarde",
    moodLabel: "آوانگارد معاصر",
    season: "کالکشن دائمی",
    heroImage: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1600&q=85",
    accentColor: "#424242",
    materials: [
      { name: "استیل جراحی ۳۱۶L", desc: "ضدزنگ، ضدخش و مقاوم در برابر رطوبت با پرداخت مات ساتنی." },
      { name: "استات زیستی مازوکلی", desc: "پلیمر استات مشتق شده از پنبه ارگانیک با سبکی باورنکردنی." },
      { name: "آلومینیوم آنودایز شده", desc: "حداکثر استحکام سازه‌ای با کمترین وزن ممکن برای گجت‌های پوشیدنی." }
    ]
  },
  {
    id: "silk-cashmere",
    slug: "silk-cashmere",
    title: "ابریشم و کشمیر شبانه",
    enTitle: "Silk & Cashmere Nocturne",
    tagline: "لمس ظرافت اشرافی و الیاف جاودان",
    concept: "طراحی شده برای ضیافت‌های شبانه و لحظات درخشش باوقار. ریزش چشم‌نواز ساتن ابریشمی ملبری در همنشینی با پشم و کشمیر فاخر، روایتی شاعرانه از شکوه معاصر است.",
    quote: "ظرافت حقیقی به چشم نمی‌آید؛ در ذهن و خاطره ماندگار می‌شود.",
    mood: "sensual",
    moodLabel: "لوکس و سنشوال",
    season: "بهار / تابستان ۲۰۲۶",
    heroImage: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1600&q=85",
    accentColor: "#6C4A8D",
    materials: [
      { name: "ابریشم خالص ملبری ۱۰۰٪", desc: "درخشش طبیعی بدون مواد براق‌کننده شیمیایی با لمسی همچون آب روان." },
      { name: "کشمیر گرید A", desc: "الیاف دست‌ریس زیر ۱۶ میکرون با نرمی افسانه‌ای." },
      { name: "رنگدانه‌های ارگانیک گیاهی", desc: "ثبات رنگ پایدار با استفاده از عصاره‌های طبیعی روناس و پوست گردو." }
    ]
  },
  {
    id: "architectural-living",
    slug: "architectural-living",
    title: "معماری و دکوراسیون استودیویی",
    enTitle: "Architectural Living Space",
    tagline: "تندیس‌های کاربردی برای فضاهای معاصر",
    concept: "آثاری برای تبدیل خانه به یک گالری هنری زنده. از صندلی‌های ارگونومیک بوکله تا چراغ‌های ریخته‌گری شده بتنی و ماگ‌های سفالگری استودیویی، هر قطعه هویتی مجسمه‌وار دارد.",
    quote: "خانه‌ای که در آن می‌زیستید، امتداد روحی است که در شما جریان دارد.",
    mood: "bohemian",
    moodLabel: "لایف‌استایل معمارانه",
    season: "کالکشن دائمی",
    heroImage: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1600&q=85",
    accentColor: "#245A66",
    materials: [
      { name: "بتن ریخته‌گری صیقلی", desc: "بافت ارگانیک متخلخل با دوام صدساله و لمسی مخملی." },
      { name: "سرامیک کوره‌ای پخته‌شده", desc: "خاک رس طبیعی با لعاب‌های ترکیبی استودیویی بدون سرب." },
      { name: "چوب بلوط وحشی اتریش", desc: "اشباع شده با روغن‌های محافظ طبیعی جهت نمایاندن گره‌های اصیل چوب." }
    ]
  },
  {
    id: "desert-sand",
    slug: "desert-sand",
    title: "شن و کهربا",
    enTitle: "Desert Sand & Ochre",
    tagline: "گرما و اصالت در بافت‌های طبیعی زمین",
    concept: "پالت رنگی گرم الهام‌گرفته از تپه‌های ماسه‌ای کویر، چرم عسلی و کهربای درخشان. کت‌های لینن تنفس‌پذیر، اکسیرهای ارگانیک و اکسسوری‌های دست‌ساز طلاکاری‌شده.",
    quote: "طبیعت در ساده‌ترین پالت‌هایش، والاترین هنر را خلق می‌کند.",
    mood: "minimal",
    moodLabel: "طبیعت و زمین",
    season: "بهار ۲۰۲۶",
    heroImage: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1600&q=85",
    accentColor: "#C85A48",
    materials: [
      { name: "لینن دست‌بافت کانسای", desc: "خنک‌ترین و تنفس‌پذیرترین الیاف طبیعی جهان برای روزهای آفتابی." },
      { name: "چرم گیاهی عسلی", desc: "پتینه‌پذیری فوق‌العاده با گذر زمان که هر کیف را منحصربه‌فرد می‌کند." },
      { name: "طلای ۱۸ عیار ۵ میکرون", desc: "درخشش ماندگار با مقاومت در برابر سایش بدون تیرگی." }
    ]
  }
];

class CollectionsManager {
  constructor() {
    this.collections = NOVA_COLLECTIONS;
    this.activeMood = 'all';
  }

  initArchivePage() {
    const grid = document.getElementById('collections-grid');
    if (!grid) return;

    this.renderCards('all');
    this.bindMoodFilter();
  }

  bindMoodFilter() {
    const chips = document.querySelectorAll('.mood-chip');
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const mood = chip.getAttribute('data-mood') || 'all';
        this.renderCards(mood);
      });
    });
  }

  renderCards(mood = 'all') {
    const grid = document.getElementById('collections-grid');
    if (!grid) return;

    const filtered = mood === 'all' 
      ? this.collections 
      : this.collections.filter(c => c.mood === mood);

    grid.innerHTML = filtered.map((c, idx) => {
      const items = window.getProductsByCollection ? window.getProductsByCollection(c.slug) : [];
      return `
        <article class="collection-card reveal-fade-up delay-${(idx % 3) + 1}">
          <div class="collection-card-media">
            <a href="collection-details.html?collection=${c.slug}">
              <img src="${c.heroImage}" alt="${c.title}" loading="lazy">
            </a>
          </div>
          <div class="collection-card-body">
            <span class="collection-card-tag">${c.season} • ${c.moodLabel}</span>
            <h3 class="collection-card-title">
              <a href="collection-details.html?collection=${c.slug}">${c.title}</a>
            </h3>
            <p class="collection-card-desc">${c.concept}</p>
            <div class="collection-card-footer">
              <span>تعداد آثار: <strong>${items.length.toLocaleString('fa-IR')} محصول</strong></span>
              <a href="collection-details.html?collection=${c.slug}" class="btn btn-ghost btn-sm" style="color: var(--accent); font-weight: bold;">
                مشاهده کالکشن ←
              </a>
            </div>
          </div>
        </article>
      `;
    }).join('');

    if (window.initScrollReveal) window.initScrollReveal();
  }

  initDetailPage() {
    const container = document.getElementById('collection-detail-page');
    if (!container) return;

    const params = new URLSearchParams(window.location.search);
    const slug = params.get('collection') || 'autumn-winter';
    const collection = this.collections.find(c => c.slug === slug) || this.collections[0];

    document.title = `${collection.title} | کالکشن‌های نُوا`;

    // Set Hero Banner
    const heroBanner = document.getElementById('collection-hero-banner');
    if (heroBanner) {
      heroBanner.style.backgroundImage = `url('${collection.heroImage}')`;
      heroBanner.innerHTML = `
        <div class="container collection-hero-inner reveal-fade-up">
          <div class="breadcrumbs" style="color: rgba(255,255,255,0.8); margin-bottom: 1rem;">
            <a href="index.html" style="color: #fff;">صفحه اصلی</a>
            <span class="breadcrumb-sep">/</span>
            <a href="collections.html" style="color: #fff;">کالکشن‌ها</a>
            <span class="breadcrumb-sep">/</span>
            <span class="current" style="color: var(--accent);">${collection.title}</span>
          </div>
          <span class="section-tag" style="background: rgba(212,175,55,0.25); color: #FFDF73; border: 1px solid rgba(212,175,55,0.4); padding: 0.35rem 0.85rem; border-radius: 4px; display: inline-block;">
            ${collection.season}
          </span>
          <h1 style="font-size: clamp(2.2rem, 1.8rem + 2.5vw, 4rem); font-family: var(--font-display); font-weight: 900; margin-top: 0.5rem; margin-bottom: 0.75rem; text-shadow: 0 4px 16px rgba(0,0,0,0.6);">
            ${collection.title}
          </h1>
          <p style="font-size: var(--text-lg); color: rgba(255,255,255,0.9); font-weight: 300; max-width: 650px; line-height: 1.6;">
            ${collection.tagline}
          </p>
        </div>
      `;
    }

    // Set Concept Story
    const storyBox = document.getElementById('collection-concept-box');
    if (storyBox) {
      storyBox.innerHTML = `
        <div class="editorial-story-grid">
          <div class="editorial-story-text reveal-fade-up">
            <span class="section-tag">روایت مفهومی دیزاین</span>
            <h2 style="font-size: var(--text-2xl); font-weight: bold; margin-top: 0.5rem; margin-bottom: 1.5rem;">فلسفه و خطوط خلق اثر</h2>
            <p class="editorial-dropcap">${collection.concept}</p>
            <blockquote style="padding: 1.5rem; border-inline-start: 3px solid var(--accent); background: var(--bg-surface-subtle); border-radius: var(--radius-xs); margin-block: 1.5rem; font-style: italic; color: var(--text-primary); font-size: var(--text-md);">
              «${collection.quote}»
            </blockquote>
          </div>
          <div class="editorial-story-media reveal-slide-left">
            <img src="${collection.heroImage}" alt="${collection.title}" style="width: 100%; aspect-ratio: 4/5; object-fit: cover; border-radius: var(--radius-xs); box-shadow: var(--shadow-lg);">
          </div>
        </div>
      `;
    }

    // Set Products
    const productsGrid = document.getElementById('collection-products-grid');
    if (productsGrid) {
      const products = window.getProductsByCollection ? window.getProductsByCollection(collection.slug) : [];
      if (products.length > 0) {
        productsGrid.innerHTML = products.map((p, idx) => window.renderProductCardHTML(p, false, idx + 1)).join('');
      } else {
        productsGrid.innerHTML = `<div class="empty-state" style="grid-column: 1/-1; text-align: center; padding: 4rem;"><p>محصولات این کالکشن به زودی رونمایی خواهند شد.</p></div>`;
      }
      if (window.novaWishlist) window.novaWishlist.updateCardButtons();
    }

    // Set Materials
    const materialsBox = document.getElementById('collection-materials-grid');
    if (materialsBox && collection.materials) {
      materialsBox.innerHTML = collection.materials.map(m => `
        <div class="material-card reveal-fade-up">
          <div class="material-card-icon">✦</div>
          <h4 style="font-size: var(--text-md); font-weight: bold; margin-bottom: 0.5rem;">${m.name}</h4>
          <p style="font-size: var(--text-xs); color: var(--text-secondary); line-height: 1.6;">${m.desc}</p>
        </div>
      `).join('');
    }

    // Set Related Collections
    const relatedBox = document.getElementById('collection-related-grid');
    if (relatedBox) {
      const others = this.collections.filter(c => c.slug !== collection.slug).slice(0, 2);
      relatedBox.innerHTML = others.map(c => `
        <div class="collection-card" style="aspect-ratio: auto;">
          <div class="collection-card-media" style="aspect-ratio: 16/9;">
            <a href="collection-details.html?collection=${c.slug}">
              <img src="${c.heroImage}" alt="${c.title}" loading="lazy">
            </a>
          </div>
          <div class="collection-card-body">
            <span class="collection-card-tag">${c.season}</span>
            <h4 class="collection-card-title" style="font-size: var(--text-lg);"><a href="collection-details.html?collection=${c.slug}">${c.title}</a></h4>
            <a href="collection-details.html?collection=${c.slug}" class="btn btn-outline btn-sm" style="margin-top: 0.5rem; align-self: flex-start;">مشاهده کالکشن</a>
          </div>
        </div>
      `).join('');
    }

    if (window.initScrollReveal) window.initScrollReveal();
  }
}

const novaCollections = new CollectionsManager();
window.novaCollections = novaCollections;

document.addEventListener('DOMContentLoaded', () => {
  novaCollections.initArchivePage();
  novaCollections.initDetailPage();
});
