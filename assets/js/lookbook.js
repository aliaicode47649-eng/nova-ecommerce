/**
 * NOVA — Interactive Shoppable Lookbook Engine
 * Magazine-style visual canvas with animated product hotspots & quick drawer
 */

const NOVA_LOOKS = [
  {
    id: "look-01",
    title: "شکوه سرمای پاییزه در خیابان‌های سنگ‌فرش",
    subtitle: "استایل مونوکروم و شیک آوانگارد",
    season: "پاییز / زمستان ۲۰۲۶",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85",
    hotspots: [
      { productId: "nova-01", top: "35%", left: "45%", label: "پالتو پشمی دست‌دوز" },
      { productId: "nova-02", top: "65%", left: "30%", label: "کیف چرم طبیعی" },
      { productId: "nova-11", top: "25%", left: "55%", label: "شال ترمه و کشمیر" }
    ]
  },
  {
    id: "look-02",
    title: "آرامش مجسمه‌ای در پناه نشیمن معاصر",
    subtitle: "تلفیق پارچه بوکله و نورپردازی بتنی",
    season: "کالکشن دائمی لایف‌استایل",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=85",
    hotspots: [
      { productId: "nova-04", top: "50%", left: "45%", label: "صندلی استراحت مدرن" },
      { productId: "nova-19", top: "75%", left: "75%", label: "شمع معطر مومی سویا" },
      { productId: "nova-16", top: "68%", left: "85%", label: "ماگ سرامیکی استودیویی" }
    ]
  },
  {
    id: "look-03",
    title: "درخشش شبانه در تالار کریستال",
    subtitle: "طراوت ابریشم و طلای ۱۸ عیار",
    season: "بهار ۲۰۲۶",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=85",
    hotspots: [
      { productId: "nova-21", top: "45%", left: "50%", label: "پیراهن ماکسی ابریشمی" },
      { productId: "nova-20", top: "60%", left: "35%", label: "دستبند النگویی طلا ۱۸ عیار" },
      { productId: "nova-03", top: "85%", left: "60%", label: "عطر نیش سنشوال صندل" }
    ]
  },
  {
    id: "look-04",
    title: "مینیمالیسم خنک در بعدازظهرهای آفتابی",
    subtitle: "نخ کتان کانسای و چرم واکس‌خورده",
    season: "بهار / تابستان ۲۰۲۶",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85",
    hotspots: [
      { productId: "nova-09", top: "40%", left: "52%", label: "کت لینن ارگانیک ژاپنی" },
      { productId: "nova-15", top: "88%", left: "50%", label: "کفش چرم دربی واکس‌خورده" },
      { productId: "nova-05", top: "58%", left: "38%", label: "ساعت کلاسیک استیل ۳۱۶" }
    ]
  }
];

class LookbookManager {
  constructor() {
    this.looks = NOVA_LOOKS;
    this.activeProduct = null;
  }

  init() {
    this.renderLooks();
    this.bindKeyboard();
  }

  renderLooks() {
    const grid = document.getElementById('lookbook-grid');
    if (!grid) return;

    grid.innerHTML = this.looks.map((look, idx) => {
      // Calculate total price of look items
      const products = look.hotspots.map(h => window.getProductById ? window.getProductById(h.productId) : null).filter(Boolean);
      const totalPrice = products.reduce((sum, p) => sum + p.price, 0);

      return `
        <article class="lookbook-card reveal-fade-up delay-${(idx % 2) + 1}">
          <div class="lookbook-stage">
            <img src="${look.image}" alt="${look.title}" loading="lazy">
            
            <!-- Hotspots -->
            ${look.hotspots.map(h => `
              <button 
                class="lookbook-hotspot" 
                style="top: ${h.top}; left: ${h.left};" 
                onclick="novaLookbook.openProductDrawer('${h.productId}')"
                aria-label="${h.label}"
                title="${h.label}"
              >
                +
              </button>
            `).join('')}
          </div>

          <div class="lookbook-card-info">
            <span class="section-tag" style="margin-bottom: 0.25rem;">${look.season}</span>
            <h3 style="font-size: var(--text-xl); font-family: var(--font-display); font-weight: bold; margin-bottom: 0.25rem;">
              ${look.title}
            </h3>
            <p style="font-size: var(--text-xs); color: var(--text-secondary); margin-bottom: 0.85rem;">${look.subtitle}</p>

            <div class="lookbook-items-list">
              <strong style="font-size: 0.72rem; text-transform: uppercase; color: var(--text-tertiary);">آیتم‌های تشکیل‌دهنده استایل:</strong>
              ${products.map(p => `
                <div class="lookbook-item-pill" onclick="novaLookbook.openProductDrawer('${p.id}')">
                  <div class="flex items-center gap-sm">
                    <img src="${p.images[0]}" alt="${p.name}" style="width: 32px; height: 32px; object-fit: cover; border-radius: 2px;">
                    <strong>${p.name}</strong>
                  </div>
                  <span style="color: var(--accent); font-weight: bold;">${window.formatPrice ? window.formatPrice(p.price) : p.price}</span>
                </div>
              `).join('')}
            </div>

            <div class="flex justify-between items-center" style="margin-top: 0.5rem; padding-top: 1rem; border-top: 1px solid var(--border-color);">
              <div>
                <span style="font-size: var(--text-xs); color: var(--text-tertiary);">مجموع استایل:</span>
                <strong style="display: block; font-size: var(--text-base); color: var(--text-primary);">${window.formatPrice ? window.formatPrice(totalPrice) : totalPrice}</strong>
              </div>
              <button class="btn btn-primary btn-sm" onclick="novaLookbook.shopEntireLook('${look.id}')">
                خرید کل این استایل 🛍️
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    if (window.initScrollReveal) window.initScrollReveal();
  }

  openProductDrawer(productId) {
    const product = window.getProductById ? window.getProductById(productId) : null;
    if (!product) return;

    this.activeProduct = product;
    let drawer = document.getElementById('look-drawer-backdrop');
    if (!drawer) {
      drawer = document.createElement('div');
      drawer.id = 'look-drawer-backdrop';
      drawer.className = 'look-drawer-backdrop';
      document.body.appendChild(drawer);
    }

    const defaultColor = product.colors && product.colors[0] ? product.colors[0].name : 'استاندارد';
    const defaultSize = product.sizes && product.sizes[0] ? product.sizes[0] : 'استاندارد';

    drawer.innerHTML = `
      <div class="look-drawer-panel" role="dialog" aria-modal="true" aria-labelledby="look-drawer-title">
        <div class="flex justify-between items-center" style="margin-bottom: 1.5rem; padding-bottom: 0.75rem; border-bottom: 1px solid var(--border-color);">
          <span class="section-tag" style="margin: 0;">نمایش سریع آیتم استایل</span>
          <button onclick="novaLookbook.closeProductDrawer()" class="drawer-close" aria-label="بستن">✕</button>
        </div>

        <div class="flex gap-lg" style="margin-bottom: 1.5rem;">
          <img src="${product.images[0]}" alt="${product.name}" style="width: 100px; height: 130px; object-fit: cover; border-radius: var(--radius-xs); border: 1px solid var(--border-color); flex-shrink: 0;">
          <div>
            <span style="font-size: var(--text-xs); color: var(--text-tertiary);">${product.categoryName}</span>
            <h4 id="look-drawer-title" style="font-size: var(--text-md); font-weight: bold; margin-top: 0.25rem; margin-bottom: 0.5rem;">${product.name}</h4>
            <div style="font-size: var(--text-lg); font-weight: 800; color: var(--accent);">${window.formatPrice ? window.formatPrice(product.price) : product.price}</div>
            <p style="font-size: var(--text-xs); color: var(--text-secondary); margin-top: 0.5rem; line-height: 1.5;">${product.description}</p>
          </div>
        </div>

        <div class="flex gap-md">
          <button class="btn btn-primary flex-1" onclick="novaCart.addItem('${product.id}', 1, '${defaultColor}', '${defaultSize}'); novaLookbook.closeProductDrawer();">
            افزودن به سبد خرید
          </button>
          <a href="product.html?id=${product.id}" class="btn btn-outline">
            مشاهده کامل کالا
          </a>
        </div>
      </div>
    `;

    // Click outside to close
    drawer.onclick = (e) => {
      if (e.target === drawer) this.closeProductDrawer();
    };

    void drawer.offsetWidth;
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  closeProductDrawer() {
    const drawer = document.getElementById('look-drawer-backdrop');
    if (drawer) {
      drawer.classList.remove('open');
      document.body.style.removeProperty('overflow');
    }
  }

  shopEntireLook(lookId) {
    const look = this.looks.find(l => l.id === lookId);
    if (!look || !window.novaCart) return;

    let addedCount = 0;
    look.hotspots.forEach(h => {
      const p = window.getProductById ? window.getProductById(h.productId) : null;
      if (p) {
        const color = p.colors && p.colors[0] ? p.colors[0].name : 'استاندارد';
        const size = p.sizes && p.sizes[0] ? p.sizes[0] : 'استاندارد';
        window.novaCart.addItem(p.id, 1, color, size);
        addedCount++;
      }
    });

    if (window.showToast) {
      window.showToast(`تمام ${addedCount.toLocaleString('fa-IR')} آیتم این استایل به سبد خرید اضافه شدند!`, 'success');
    }
  }

  bindKeyboard() {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeProductDrawer();
      }
    });
  }
}

const novaLookbook = new LookbookManager();
window.novaLookbook = novaLookbook;

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('lookbook-grid')) {
    novaLookbook.init();
  }
});
