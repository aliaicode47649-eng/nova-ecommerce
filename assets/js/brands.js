/**
 * NOVA — Brands & Designers Directory Engine
 * Alphabetical index, category filtering, instant search & spotlight
 */

const NOVA_BRANDS = [
  {
    id: "atelier-vesper",
    slug: "atelier-vesper",
    name: "آتلیه وسپر",
    enName: "Atelier Vesper",
    city: "میلان، ایتالیا",
    category: "fashion",
    categoryLabel: "مد و پوشاک",
    monogram: "AV",
    founded: "۲۰۱۸",
    bio: "تمرکز بر ساختارگرایی معاصر، پالتوهای دست‌دوز با پشم خالص مرینوس و کت‌های لینن طبیعی با برش‌های رها و باوقار.",
    featured: true,
    productIds: ["nova-01", "nova-09"]
  },
  {
    id: "officine-pelle",
    slug: "officine-pelle",
    name: "اوفیچینه پله",
    enName: "Officine Pelle",
    city: "فلورانس، ایتالیا",
    category: "accessories",
    categoryLabel: "اکسسوری و چرم",
    monogram: "OP",
    founded: "۱۹۸۵",
    bio: "میراث چرم‌دوزی سنتی توسکانی با یراق‌آلات برنجی و زیره‌های ویبرام؛ پیوند دیرینه اصالت چرم طبیعی با دیزاین ارگونومیک.",
    featured: true,
    productIds: ["nova-02", "nova-15", "nova-18"]
  },
  {
    id: "botanica-essentia",
    slug: "botanica-essentia",
    name: "بوتانیکا اسنتیا",
    enName: "Botanica Essentia",
    city: "گرس، فرانسه",
    category: "beauty",
    categoryLabel: "زیبایی و عطر نیش",
    monogram: "BE",
    founded: "۲۰۱۲",
    bio: "اکستریت‌های پرفیوم طبیعی و فرمولاسیون‌های بیوپپتیدی ارگانیک بر پایه خالص‌ترین عصاره‌های گیاهی مزارع آلپ و مراکش.",
    featured: true,
    productIds: ["nova-03", "nova-08", "nova-14", "nova-19"]
  },
  {
    id: "nordic-form",
    slug: "nordic-form",
    name: "نوردیک فرم",
    enName: "NordicForm Studio",
    city: "کپنهاگ، دانمارک",
    category: "living",
    categoryLabel: "خانه و دکوراسیون",
    monogram: "NF",
    founded: "۲۰۱۵",
    bio: "سادگی ارگانیک اسکاندیناوی، صندلی‌های بوکله دست‌ساز، ماگ‌های سفالگری و گلدان‌های مجسمه‌ای با خطوط خالص.",
    featured: true,
    productIds: ["nova-04", "nova-13", "nova-16"]
  },
  {
    id: "studio-kian",
    slug: "studio-kian",
    name: "استودیو کیان",
    enName: "Studio Kian",
    city: "وین / تهران",
    category: "accessories",
    categoryLabel: "اکسسوری و ساعت",
    monogram: "SK",
    founded: "۲۰۲۰",
    bio: "ترکیب هندسه مهندسی و مینیمالیسم استیل ۳۱۶L با جواهرات برنجی آبکاری طلای ۱۸ عیار و استندهای چوب گردو.",
    featured: false,
    productIds: ["nova-05", "nova-17", "nova-20"]
  },
  {
    id: "sole-milano",
    slug: "sole-milano",
    name: "سوله میلانو",
    enName: "Sole Milano",
    city: "میلان، ایتالیا",
    category: "accessories",
    categoryLabel: "اکسسوری و عینک",
    monogram: "SM",
    founded: "۲۰۱۷",
    bio: "فریم‌های دست‌ساز تراش‌خورده با استات پنبه‌ای مازوکلی و لنزهای پلاریزه؛ بیانی متمایز از جسارت مد خیابانی میلان.",
    featured: false,
    productIds: ["nova-06"]
  },
  {
    id: "lumina-lab",
    slug: "lumina-lab",
    name: "لومینا لب",
    enName: "Lumina Lab",
    city: "زوریخ، سوئیس",
    category: "living",
    categoryLabel: "فناوری و نورپردازی",
    monogram: "LL",
    founded: "۲۰۱۹",
    bio: "تجهیزات صوتی سرامیکی های-فای، چراغ‌های بتنی دیمردار و هدفون‌های آلومینیومی آکوستیک با بالاترین استانداردهای سوئیسی.",
    featured: false,
    productIds: ["nova-07", "nova-10", "nova-12"]
  },
  {
    id: "maison-aria",
    slug: "maison-aria",
    name: "مِزون آریا",
    enName: "Maison Aria",
    city: "پاریس، فرانسه",
    category: "fashion",
    categoryLabel: "مد و پوشاک",
    monogram: "MA",
    founded: "۲۰۱۶",
    bio: "پیراهن‌های شب ابریشمی ماکسی، شال‌های کرک کشمیر مغولستان و پتوهای ژاکارد دورو با ریزش و درخشش اشرافی.",
    featured: true,
    productIds: ["nova-11", "nova-21", "nova-22"]
  },
  {
    id: "aurora-atelier",
    slug: "aurora-atelier",
    name: "آتلیه آرورا",
    enName: "Aurora Atelier",
    city: "استکهلم، سوئد",
    category: "fashion",
    categoryLabel: "مد و پوشاک",
    monogram: "AA",
    founded: "۲۰۲۱",
    bio: "بافت‌های زمستانه با الیاف بازیافتی پایدار و دوخت صنعتی ارگانیک متناسب با اقلیم‌های کوهستانی.",
    featured: false,
    productIds: []
  },
  {
    id: "ceramica-terra",
    slug: "ceramica-terra",
    name: "سرامیکا ترا",
    enName: "Ceramica Terra",
    city: "کیوتو، ژاپن",
    category: "living",
    categoryLabel: "خانه و دکوراسیون",
    monogram: "CT",
    founded: "۲۰۱۰",
    bio: "هنر ظروف خاک رس ارگانیک با فلسفه وابی-سابی و پذیرش نقص‌های طبیعی خاک در آتش کوره.",
    featured: false,
    productIds: []
  },
  {
    id: "forma-minimal",
    slug: "forma-minimal",
    name: "فرما مینیمال",
    enName: "Forma Minimal",
    city: "برلین، آلمان",
    category: "accessories",
    categoryLabel: "اکسسوری لوکس",
    monogram: "FM",
    founded: "۲۰۲۲",
    bio: "کارت‌هولدرهای تیتانیومی مسدودکننده RFID و جزئیات چرمی بادوام با الهام از خطوط باوهاوس.",
    featured: false,
    productIds: []
  },
  {
    id: "zenith-parfums",
    slug: "zenith-parfums",
    name: "زنیت پرفیومز",
    enName: "Zenith Parfums",
    city: "لندن، انگلستان",
    category: "beauty",
    categoryLabel: "زیبایی و عطر",
    monogram: "ZP",
    founded: "۲۰۱۴",
    bio: "عطرهای غلیظ دودی، تنباکویی و چرمی با شمع‌های آروماتیک موم سویا جهت مراقبه و آرامش فضا.",
    featured: false,
    productIds: []
  }
];

class BrandsManager {
  constructor() {
    this.brands = NOVA_BRANDS;
    this.activeLetter = 'all';
    this.activeCategory = 'all';
    this.searchQuery = '';
  }

  init() {
    this.renderAlphabetBar();
    this.renderSpotlight();
    this.bindEvents();
    this.applyFilters();
  }

  renderAlphabetBar() {
    const bar = document.getElementById('brand-alphabet-container');
    if (!bar) return;

    // Persian alphabet subset + English letters
    const letters = ['همه', 'آ', 'ا', 'ب', 'ت', 'س', 'ف', 'ک', 'ل', 'م', 'ن', 'و', 'A', 'B', 'F', 'L', 'M', 'N', 'O', 'S', 'Z'];

    bar.innerHTML = letters.map(char => `
      <button class="alpha-btn ${char === 'همه' ? 'active' : ''}" data-char="${char}">
        ${char}
      </button>
    `).join('');

    bar.querySelectorAll('.alpha-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        bar.querySelectorAll('.alpha-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activeLetter = btn.getAttribute('data-char') === 'همه' ? 'all' : btn.getAttribute('data-char');
        this.applyFilters();
      });
    });
  }

  renderSpotlight() {
    const container = document.getElementById('brand-spotlight-container');
    if (!container) return;

    const featured = this.brands.find(b => b.slug === 'atelier-vesper');
    if (!featured) return;

    container.innerHTML = `
      <div class="brand-spotlight-box reveal-fade-up">
        <div>
          <span class="section-tag">برند برگزیده ماه</span>
          <h3 style="font-size: var(--text-2xl); font-weight: bold; margin-top: 0.5rem; margin-bottom: 0.75rem;">
            ${featured.name} <span style="font-size: var(--text-base); color: var(--text-secondary); font-weight: normal;">(${featured.enName})</span>
          </h3>
          <div class="flex items-center gap-sm" style="margin-bottom: 1rem; font-size: var(--text-xs); color: var(--accent);">
            <span>📍 ${featured.city}</span>
            <span>•</span>
            <span>تأسیس: ${featured.founded}</span>
          </div>
          <p style="font-size: var(--text-base); color: var(--text-secondary); line-height: 1.7; margin-bottom: 1.5rem;">
            «${featured.bio}»
          </p>
          <div class="flex gap-md">
            <a href="shop.html?category=${featured.category}" class="btn btn-primary">
              مشاهده محصولات این برند
            </a>
          </div>
        </div>
        <div style="aspect-ratio: 4/3; border-radius: var(--radius-xs); overflow: hidden; background: var(--bg-surface-subtle); border: 1px solid var(--border-color);">
          <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80" alt="${featured.name}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
      </div>
    `;
  }

  bindEvents() {
    const searchInp = document.getElementById('brand-search-input');
    if (searchInp) {
      searchInp.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.trim().toLowerCase();
        this.applyFilters();
      });
    }

    const catChips = document.querySelectorAll('.brand-cat-chip');
    catChips.forEach(chip => {
      chip.addEventListener('click', () => {
        catChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        this.activeCategory = chip.getAttribute('data-cat') || 'all';
        this.applyFilters();
      });
    });
  }

  applyFilters() {
    const grid = document.getElementById('brands-grid');
    const countEl = document.getElementById('brands-count-badge');
    if (!grid) return;

    let filtered = this.brands.filter(b => {
      // Category filter
      if (this.activeCategory !== 'all' && b.category !== this.activeCategory) return false;

      // Letter filter
      if (this.activeLetter !== 'all') {
        const letter = this.activeLetter.toLowerCase();
        const startFa = b.name.startsWith(letter);
        const startEn = b.enName.toLowerCase().startsWith(letter);
        if (!startFa && !startEn) return false;
      }

      // Search query
      if (this.searchQuery) {
        const matchName = b.name.toLowerCase().includes(this.searchQuery);
        const matchEn = b.enName.toLowerCase().includes(this.searchQuery);
        const matchCity = b.city.toLowerCase().includes(this.searchQuery);
        const matchBio = b.bio.toLowerCase().includes(this.searchQuery);
        if (!matchName && !matchEn && !matchCity && !matchBio) return false;
      }

      return true;
    });

    if (countEl) {
      countEl.textContent = `${filtered.length.toLocaleString('fa-IR')} برند فعال`;
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="empty-state" style="grid-column: 1/-1; text-align: center; padding: 4rem;">
          <div style="font-size: 2.5rem; margin-bottom: 1rem;">🔍</div>
          <h4 style="font-size: var(--text-lg); font-weight: bold; margin-bottom: 0.5rem;">برندی با این مشخصات یافت نشد</h4>
          <p style="font-size: var(--text-sm); color: var(--text-secondary); margin-bottom: 1.5rem;">لطفاً کلمه جستجو شده یا فیلتر دسته‌بندی را تغییر دهید.</p>
          <button class="btn btn-outline btn-sm" onclick="novaBrands.resetFilters()">پاکسازی فیلترها</button>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map((b, idx) => `
      <article class="brand-card reveal-fade-up delay-${(idx % 4) + 1}">
        <div class="brand-card-top">
          <div class="brand-monogram">${b.monogram}</div>
          <span class="brand-origin-badge">${b.city}</span>
        </div>
        <div>
          <h3 class="brand-card-title">${b.name}</h3>
          <div style="font-size: 0.72rem; color: var(--text-tertiary);">${b.enName} • ${b.categoryLabel}</div>
        </div>
        <p class="brand-card-desc">${b.bio}</p>
        <div class="brand-card-footer">
          <span style="font-size: var(--text-xs); color: var(--text-tertiary);">تأسیس: ${b.founded}</span>
          <a href="shop.html?category=${b.category}" class="btn btn-ghost btn-sm" style="color: var(--accent); font-weight: bold;">
            کالکشن‌ها ←
          </a>
        </div>
      </article>
    `).join('');

    if (window.initScrollReveal) window.initScrollReveal();
  }

  resetFilters() {
    this.activeLetter = 'all';
    this.activeCategory = 'all';
    this.searchQuery = '';
    const searchInp = document.getElementById('brand-search-input');
    if (searchInp) searchInp.value = '';
    const alphaBtns = document.querySelectorAll('.alpha-btn');
    alphaBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-char') === 'همه'));
    const catChips = document.querySelectorAll('.brand-cat-chip');
    catChips.forEach(c => c.classList.toggle('active', c.getAttribute('data-cat') === 'all'));
    this.applyFilters();
  }
}

const novaBrands = new BrandsManager();
window.novaBrands = novaBrands;

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('brands-grid')) {
    novaBrands.init();
  }
});
