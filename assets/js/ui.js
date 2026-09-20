/**
 * NOVA — Global UI Controllers
 * Quick View, Toasts, Dark Mode, Direction/Language, Sticky Observers, Tabs, Accordions
 */

// ==========================================================================
// Toast Notification Engine (Queue-managed, RTL-aware, SVG icons, smooth exit)
// ==========================================================================
const MAX_VISIBLE_TOASTS = 3;
const toastQueue = [];
let activeToastCount = 0;

const TOAST_ICONS = {
  success: `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 10l3.5 3.5L15 6"/></svg>`,
  error: `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="8"/><line x1="13" y1="7" x2="7" y2="13"/><line x1="7" y1="7" x2="13" y2="13"/></svg>`,
  warning: `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 3L2 17h16L10 3z"/><line x1="10" y1="8" x2="10" y2="12"/><circle cx="10" cy="15" r="0.75" fill="currentColor"/></svg>`,
  info: `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="8"/><line x1="10" y1="9" x2="10" y2="14"/><circle cx="10" cy="6.5" r="0.75" fill="currentColor"/></svg>`
};

function ensureToastContainer() {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }
  // Sync RTL/LTR slide direction variable on container
  const isLtr = document.documentElement.getAttribute('dir') === 'ltr';
  container.style.setProperty('--toast-translate-x', isLtr ? '1' : '-1');
  return container;
}

function processToastQueue() {
  if (activeToastCount >= MAX_VISIBLE_TOASTS || toastQueue.length === 0) return;
  const nextToast = toastQueue.shift();
  renderToast(nextToast.message, nextToast.type, nextToast.duration);
}

function renderToast(message, type, duration) {
  const container = ensureToastContainer();
  activeToastCount++;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'polite');

  const iconSvg = TOAST_ICONS[type] || TOAST_ICONS.info;

  toast.innerHTML = `
    <div class="toast-icon" aria-hidden="true">${iconSvg}</div>
    <div class="toast-content">
      <span class="toast-message">${message}</span>
    </div>
    <button class="toast-close" type="button" aria-label="بستن">×</button>
  `;

  let isExiting = false;
  const dismiss = () => {
    if (isExiting) return;
    isExiting = true;
    clearTimeout(autoDismissTimer);
    toast.classList.add('toast-exit');
    const onExitEnd = () => {
      toast.removeEventListener('animationend', onExitEnd);
      toast.remove();
      activeToastCount--;
      processToastQueue();
    };
    toast.addEventListener('animationend', onExitEnd, { once: true });
    // Safety fallback in case animation doesn't fire
    setTimeout(onExitEnd, 350);
  };

  const closeBtn = toast.querySelector('.toast-close');
  if (closeBtn) closeBtn.addEventListener('click', dismiss);

  const autoDismissTimer = setTimeout(dismiss, duration);

  container.appendChild(toast);
}

function showToast(message, type = 'info', duration = 3800) {
  if (activeToastCount >= MAX_VISIBLE_TOASTS) {
    toastQueue.push({ message, type, duration });
  } else {
    renderToast(message, type, duration);
  }
}
window.showToast = showToast;

// ==========================================================================
// Dark Mode Manager (localStorage)
// ==========================================================================
function initTheme() {
  let savedTheme = 'light';
  try {
    savedTheme = localStorage.getItem('nova_theme') || 'light';
  } catch (e) {
    // localStorage is blocked (e.g. opened via file://) — fall back to default theme
  }
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeToggleUI(savedTheme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const newTheme = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  try { localStorage.setItem('nova_theme', newTheme); } catch (e) {}
  updateThemeToggleUI(newTheme);
  showToast(`حالت نمایش به ${newTheme === 'dark' ? 'تاریک' : 'روشن'} تغییر یافت`, 'info');
}

function updateThemeToggleUI(theme) {
  const buttons = document.querySelectorAll('.theme-toggle-btn');
  buttons.forEach(btn => {
    if (theme === 'dark') {
      btn.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
      btn.setAttribute('title', 'تغییر به حالت روشن');
    } else {
      btn.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>`;
      btn.setAttribute('title', 'تغییر به حالت تاریک');
    }
  });
}
window.toggleTheme = toggleTheme;

// ==========================================================================
// Direction / RTL / LTR Manager
// ==========================================================================
function initDirection() {
  let savedDir = 'rtl';
  try {
    savedDir = localStorage.getItem('nova_dir') || 'rtl';
  } catch (e) {
    // localStorage is blocked (e.g. opened via file://) — fall back to RTL
  }
  document.documentElement.setAttribute('dir', savedDir);
  document.documentElement.setAttribute('lang', savedDir === 'rtl' ? 'fa' : 'en');
  updateDirToggleUI(savedDir);
}

function toggleDirection() {
  const current = document.documentElement.getAttribute('dir') || 'rtl';
  const newDir = current === 'rtl' ? 'ltr' : 'rtl';
  document.documentElement.setAttribute('dir', newDir);
  document.documentElement.setAttribute('lang', newDir === 'rtl' ? 'fa' : 'en');
  try { localStorage.setItem('nova_dir', newDir); } catch (e) {}
  updateDirToggleUI(newDir);
  showToast(`جهت قالب به ${newDir.toUpperCase()} تغییر یافت`, 'info');
}

function updateDirToggleUI(dir) {
  const buttons = document.querySelectorAll('.dir-toggle-btn');
  buttons.forEach(btn => {
    btn.textContent = dir === 'rtl' ? 'EN / LTR' : 'فارسی / RTL';
  });
}
window.toggleDirection = toggleDirection;

let _qvLastFocused = null;

function handleQuickViewKeydown(e) {
  if (e.key === 'Escape') {
    closeQuickView();
    return;
  }
  if (e.key !== 'Tab') return;

  const modal = document.getElementById('quick-view-modal');
  if (!modal) return;

  const focusables = modal.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])');
  if (focusables.length === 0) return;

  const first = focusables[0];
  const last = focusables[focusables.length - 1];

  if (e.shiftKey) {
    if (document.activeElement === first) {
      e.preventDefault();
      last.focus();
    }
  } else {
    if (document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
}

// ==========================================================================
// Quick View Modal
// ==========================================================================
function openQuickView(productId) {
  const product = getProductById(productId);
  if (!product) return;

  const modal = document.getElementById('quick-view-modal');
  const body = document.getElementById('quick-view-body');
  const overlay = document.getElementById('global-overlay');
  if (!modal || !body || !overlay) return;

  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-label', 'مشاهده سریع محصول');

  let selectedColor = product.colors && product.colors[0] ? product.colors[0].name : '';
  let selectedSize = product.sizes && product.sizes[0] ? product.sizes[0] : '';
  let qty = 1;

  body.innerHTML = `
    <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: var(--space-2xl); padding: var(--space-xl);">
      <div>
        <div style="aspect-ratio: 4/5; border-radius: var(--radius-xs); overflow: hidden; background: var(--bg-surface-subtle); margin-bottom: 0.75rem;">
          <img id="qv-main-img" src="${product.images[0]}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <div style="display: flex; gap: 0.5rem;">
          ${product.images.map((img, i) => `
            <button onclick="document.getElementById('qv-main-img').src='${img}'" style="width: 60px; height: 75px; border-radius: var(--radius-xs); overflow: hidden; border: 1px solid var(--border-color); cursor: pointer;">
              <img src="${img}" style="width: 100%; height: 100%; object-fit: cover;">
            </button>
          `).join('')}
        </div>
      </div>

      <div class="flex flex-col justify-between">
        <div>
          <span class="product-card-category">${product.categoryName}</span>
          <h2 style="font-size: var(--text-xl); font-weight: var(--fw-bold); margin-top: 0.25rem; margin-bottom: 0.5rem;">${product.name}</h2>
          
          <div class="flex items-center gap-md" style="margin-bottom: 0.75rem;">
            <span style="color: var(--accent); font-size: var(--text-sm);">★ ${product.rating.toLocaleString('fa-IR')}</span>
            <span style="color: var(--text-tertiary); font-size: var(--text-xs);">(${product.reviews.toLocaleString('fa-IR')} دیدگاه ثبت‌شده)</span>
          </div>

          <div class="flex items-center gap-md" style="margin-bottom: 1.25rem;">
            <span style="font-size: var(--text-xl); font-weight: var(--fw-black); color: var(--text-primary);">${formatPrice(product.price)}</span>
            ${product.oldPrice ? `<span style="font-size: var(--text-sm); color: var(--text-tertiary); text-decoration: line-through;">${formatPrice(product.oldPrice)}</span>` : ''}
          </div>

          <p style="font-size: var(--text-sm); line-height: var(--lh-relaxed); color: var(--text-secondary); margin-bottom: 1.5rem;">
            ${product.description}
          </p>

          ${product.colors && product.colors.length > 0 ? `
            <div style="margin-bottom: 1rem;">
              <label style="font-size: var(--text-xs); font-weight: var(--fw-bold); display: block; margin-bottom: 0.4rem;">انتخاب رنگ:</label>
              <div class="flex gap-sm">
                ${product.colors.map((c, idx) => `
                  <button class="filter-swatch-btn ${idx === 0 ? 'active' : ''}" style="background-color: ${c.hex};" title="${c.name}" onclick="document.querySelectorAll('#quick-view-body .filter-swatch-btn').forEach(b => b.classList.remove('active')); this.classList.add('active'); window._qvColor='${c.name}';"></button>
                `).join('')}
              </div>
            </div>
          ` : ''}

          ${product.sizes && product.sizes.length > 0 ? `
            <div style="margin-bottom: 1.5rem;">
              <label style="font-size: var(--text-xs); font-weight: var(--fw-bold); display: block; margin-bottom: 0.4rem;">سایز:</label>
              <div class="flex gap-xs">
                ${product.sizes.map((s, idx) => `
                  <button class="filter-size-btn ${idx === 0 ? 'active' : ''}" onclick="document.querySelectorAll('#quick-view-body .filter-size-btn').forEach(b => b.classList.remove('active')); this.classList.add('active'); window._qvSize='${s}';">${s}</button>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>

        <div>
          <div class="flex items-center gap-md" style="margin-bottom: 1rem;">
            <div class="quantity-control">
              <button class="qty-btn" onclick="let inp = document.getElementById('qv-qty'); if(parseInt(inp.value)>1){inp.value=parseInt(inp.value)-1;}">-</button>
              <input type="text" id="qv-qty" class="qty-input" value="1" readonly>
              <button class="qty-btn" onclick="let inp = document.getElementById('qv-qty'); inp.value=parseInt(inp.value)+1;">+</button>
            </div>
            <button class="btn btn-primary btn-block flex-1" onclick="novaCart.addItem('${product.id}', parseInt(document.getElementById('qv-qty').value), window._qvColor || '${selectedColor}', window._qvSize || '${selectedSize}'); closeQuickView();">
              افزودن به سبد خرید
            </button>
          </div>
          <a href="product.html?id=${product.id}" class="btn btn-outline btn-block btn-sm" onclick="closeQuickView()">
            مشاهده صفحه اختصاصی محصول و اطلاعات تکمیلی
          </a>
        </div>
      </div>
    </div>
  `;

  _qvLastFocused = document.activeElement;
  modal.classList.add('active');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';

  document.addEventListener('keydown', handleQuickViewKeydown);

  // Auto-focus first interactive control in modal
  setTimeout(() => {
    const firstFocusable = modal.querySelector('.modal-close, button, input, a');
    if (firstFocusable) firstFocusable.focus();
  }, 60);
}
window.openQuickView = openQuickView;

function closeQuickView() {
  const modal = document.getElementById('quick-view-modal');
  const overlay = document.getElementById('global-overlay');
  const cartDrawer = document.getElementById('cart-drawer');
  document.removeEventListener('keydown', handleQuickViewKeydown);

  if (modal) modal.classList.remove('active');
  if (overlay && !(cartDrawer && cartDrawer.classList.contains('open'))) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (_qvLastFocused && typeof _qvLastFocused.focus === 'function') {
    _qvLastFocused.focus();
    _qvLastFocused = null;
  }
}
window.closeQuickView = closeQuickView;

// ==========================================================================
// Mobile Navigation Drawer
// ==========================================================================
function ensureMobileNavDrawer() {
  let drawer = document.getElementById('mobile-nav-drawer');
  if (!drawer) {
    drawer = document.createElement('div');
    drawer.id = 'mobile-nav-drawer';
    drawer.className = 'drawer drawer-start';
    drawer.innerHTML = `
      <div class="drawer-header">
        <span class="brand-logo" style="font-size: 1.4rem;">NOVA</span>
        <button class="drawer-close" onclick="closeMobileNav()" title="بستن">✕</button>
      </div>
      <div class="drawer-body">
        <div class="flex flex-col gap-md">
          <a href="index.html" class="nav-link" style="font-size: 1.05rem; font-weight: bold;">صفحه نخست</a>
          <a href="shop.html" class="nav-link" style="font-size: 1.05rem; font-weight: bold;">فروشگاه آنلاین</a>
          
          <div style="margin-block: 0.25rem; padding-block: 0.5rem; border-block: 1px solid var(--border-color);">
            <span style="font-size: 0.78rem; color: var(--text-muted); font-weight: 600; display: block; margin-bottom: 0.5rem;">دسته‌بندی محصولات:</span>
            <div class="flex flex-col gap-xs">
              <a href="shop.html?category=fashion" class="nav-link" style="padding-inline-start: 0.75rem; color: var(--text-secondary); font-size: 0.9rem;">— مد و پوشاک دست‌دوز</a>
              <a href="shop.html?category=accessories" class="nav-link" style="padding-inline-start: 0.75rem; color: var(--text-secondary); font-size: 0.9rem;">— اکسسوری و چرم طبیعی</a>
              <a href="shop.html?category=beauty" class="nav-link" style="padding-inline-start: 0.75rem; color: var(--text-secondary); font-size: 0.9rem;">— زیبایی، عطر و مراقبت</a>
              <a href="shop.html?category=living" class="nav-link" style="padding-inline-start: 0.75rem; color: var(--text-secondary); font-size: 0.9rem;">— خانه، دکور و فناوری</a>
            </div>
          </div>

          <a href="collections.html" class="nav-link" style="font-size: 1.05rem; font-weight: bold;">کالکشن‌ها</a>
          <a href="lookbook.html" class="nav-link" style="font-size: 1.05rem; font-weight: bold;">لوک‌بوک</a>
          <a href="brands.html" class="nav-link" style="font-size: 1.05rem; font-weight: bold;">طراحان و برندها</a>
          <a href="index.html#flash-deals" class="nav-link" style="font-size: 1.05rem; font-weight: bold; color: #DC2626;">🔥 حراج شگفت‌انگیز</a>
          
          <div class="flex items-center gap-sm" style="margin-block: 0.5rem; padding: 0.75rem; background: var(--bg-surface-subtle); border-radius: var(--radius-md);">
            <a href="gift-card.html" class="nav-link" style="font-size: 0.9rem; font-weight: bold; color: var(--text-primary);">🎁 کارت هدیه</a>
            <span style="color: var(--border-color);">|</span>
            <a href="tracking.html" class="nav-link" style="font-size: 0.9rem; font-weight: bold; color: var(--accent);">🔍 پیگیری سفارش</a>
          </div>

          <a href="blog.html" class="nav-link" style="font-size: 1.05rem; font-weight: bold;">مجله استایل</a>
          <a href="about.html" class="nav-link" style="font-size: 1.05rem; font-weight: bold;">درباره استودیو نُوا</a>
          <a href="contact.html" class="nav-link" style="font-size: 1.05rem; font-weight: bold;">تماس با ما</a>
        </div>
      </div>
    `;
    document.body.appendChild(drawer);
  }
  return drawer;
}

let _savedNavScrollY = null;

function openMobileNav() {
  const drawer = ensureMobileNavDrawer();
  let overlay = document.getElementById('global-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'global-overlay';
    overlay.className = 'overlay-backdrop';
    document.body.appendChild(overlay);
    overlay.addEventListener('click', () => {
      if (window.novaCart) window.novaCart.closeDrawer();
      if (window.searchEngine) window.searchEngine.closeModal();
      closeQuickView();
      closeMobileNav();
      const shopSidebar = document.getElementById('shop-sidebar');
      if (shopSidebar) shopSidebar.classList.remove('active');
    });
  }
  if (drawer && overlay) {
    _savedNavScrollY = window.scrollY;
    drawer.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}
window.openMobileNav = openMobileNav;

function closeMobileNav() {
  const drawer = document.getElementById('mobile-nav-drawer');
  const overlay = document.getElementById('global-overlay');
  if (drawer) drawer.classList.remove('open');
  if (overlay) overlay.classList.remove('active');
  document.body.style.overflow = '';
  if (typeof _savedNavScrollY === 'number') {
    window.scrollTo(0, _savedNavScrollY);
    _savedNavScrollY = null;
  }
}
window.closeMobileNav = closeMobileNav;

// ==========================================================================
// Unified Header — Mega Menu Trigger
// --------------------------------------------------------------------------
// The mega-menu "دسته‌بندی کالاها" trigger only existed on index.html. On every
// other page the secondary nav bar collapsed into a plain link list, so the
// site's header visibly "changed shape" while navigating. This injects the same
// trigger into any .header-sub-inner that is missing it, so the header is
// identical on every page.
// ==========================================================================
function initUnifiedHeader() {
  // Remove any legacy nav-menu element if present
  document.querySelectorAll('.site-header .nav-menu').forEach(el => el.remove());

  ensureHeaderSearchBar();
  ensureHeaderSubNav();
  // search.js may have run before this injected the bar, so wire the live
  // dropdown now that the bar definitely exists.
  if (window.searchEngine) window.searchEngine.initHeaderSearch();
  document.querySelectorAll('.header-sub-inner').forEach(subInner => {
    if (subInner.querySelector('.category-trigger-btn')) return; // already present
    const navItem = document.createElement('div');
    navItem.className = 'nav-item category-nav-item';
    navItem.innerHTML = `
      <button class="category-trigger-btn">
        <span>☰ دسته‌بندی کالاها</span>
        <span style="font-size: 0.65rem;">▼</span>
      </button>
      <div class="mega-menu">
        <div class="mega-menu-grid">
          <div>
            <a href="shop.html?category=fashion" class="mega-column-title">مد و پوشاک دست‌دوز ←</a>
            <div class="mega-links">
              <a href="product.html?id=nova-01">پالتو پشمی دست‌دوز مینیمال <span class="mega-badge">جدید</span></a>
              <a href="product.html?id=nova-09">کت لینن بهاره ژاپنی</a>
              <a href="product.html?id=nova-21">پیراهن ماکسی ابریشمی شب</a>
              <a href="product.html?id=nova-11">شال ترمه و کشمیر فوق‌سبک</a>
              <a href="product.html?id=nova-15">کفش چرم دربی مینیمال</a>
              <a href="shop.html?category=fashion" class="mega-view-all">مشاهده همه پوشاک ←</a>
            </div>
          </div>
          <div>
            <a href="shop.html?category=accessories" class="mega-column-title">اکسسوری و چرم طبیعی ←</a>
            <div class="mega-links">
              <a href="product.html?id=nova-02">کیف تمام‌چرم توسکانی <span class="mega-badge">پرفروش</span></a>
              <a href="product.html?id=nova-05">ساعت کلاسیک استیل ۳۱۶</a>
              <a href="product.html?id=nova-06">عینک آفتابی استات دست‌ساز</a>
              <a href="product.html?id=nova-18">کیف پول جیبی چرم اسلیم</a>
              <a href="product.html?id=nova-20">دستبند النگویی روکش طلا</a>
              <a href="shop.html?category=accessories" class="mega-view-all">مشاهده همه اکسسوری‌ها ←</a>
            </div>
          </div>
          <div>
            <a href="shop.html?category=beauty" class="mega-column-title">زیبایی، عطر و مراقبت ←</a>
            <div class="mega-links">
              <a href="product.html?id=nova-03">عطر نیش صندل و عنبر <span class="mega-badge">پرفروش</span></a>
              <a href="product.html?id=nova-08">سرم آبرسان جلبک و پپتید <span class="mega-badge">ویژه</span></a>
              <a href="product.html?id=nova-14">روغن خالص آرگان مراکشی</a>
              <a href="product.html?id=nova-19">شمع معطر مومی سویا</a>
              <a href="product.html?id=nova-16">ماگ سرامیک استودیویی</a>
              <a href="shop.html?category=beauty" class="mega-view-all">مشاهده همه محصولات زیبایی ←</a>
            </div>
          </div>
          <div>
            <a href="shop.html?category=living" class="mega-column-title">خانه، دکور و فناوری ←</a>
            <div class="mega-links">
              <a href="product.html?id=nova-04">صندلی استراحت مدرن</a>
              <a href="product.html?id=nova-10">چراغ خواب بتنی دیمردار</a>
              <a href="product.html?id=nova-13">گلدان سرامیکی زاویه‌دار</a>
              <a href="product.html?id=nova-07">اسپیکر سرامیکی های-فای</a>
              <a href="product.html?id=nova-12">هدفون نویزکنسلینگ استودیویی</a>
              <a href="shop.html?category=tech" class="mega-view-all">مشاهده فناوری و ابزار ←</a>
            </div>
          </div>
          <div class="mega-promo-card">
            <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80" alt="کالکشن پاییزه">
            <div class="mega-promo-content">
              <span class="mega-badge" style="margin-bottom: 0.5rem; display: inline-block;">کالکشن انحصاری ۲۰۲۶</span>
              <h4 style="font-size: var(--text-md); font-weight: bold; color: #fff; margin-bottom: 0.5rem;">ظرافت در تار و پود مینیمالیسم</h4>
              <a href="collections.html" class="btn btn-accent btn-sm">مشاهده کالکشن</a>
            </div>
          </div>
        </div>
      </div>
    `;

    // Wrap the existing link list so trigger + links share one row, exactly
    // like the home page header.
    const existingList = subInner.querySelector('.sub-links-list');
    const wrapper = document.createElement('div');
    wrapper.className = 'header-sub-main flex items-center gap-lg';
    subInner.insertBefore(wrapper, existingList || subInner.firstChild);
    wrapper.appendChild(navItem);
    if (existingList) wrapper.appendChild(existingList);

    // Ensure the left-side actions (Gift Card & Order Tracking) are consistently present on every page
    if (!subInner.querySelector('.sub-nav-actions')) {
      const actions = document.createElement('div');
      actions.className = 'sub-nav-actions flex items-center gap-md';
      actions.innerHTML = `
        <a href="gift-card.html" class="sub-nav-action-link" title="کارت هدیه نُوا">
          🎁 کارت هدیه
        </a>
        <span class="sub-nav-divider">|</span>
        <a href="tracking.html" class="sub-nav-action-link tracking-link" title="پیگیری سفارش">
          🔍 پیگیری سفارش
        </a>
      `;
      subInner.appendChild(actions);
    }
  });
}

// Guarantee the secondary nav bar (mega menu + quick links) exists on pages
// built with the older header, which had no sub-nav at all.
function ensureHeaderSubNav() {
  const header = document.querySelector('.site-header');
  if (!header || header.querySelector('.header-sub-nav')) return;

  const subNav = document.createElement('div');
  subNav.className = 'header-sub-nav';
  subNav.innerHTML = `
    <div class="container header-sub-inner">
      <div class="header-sub-main flex items-center gap-lg">
        <div class="sub-links-list">
          <a href="index.html">صفحه نخست</a>
          <a href="shop.html">فروشگاه</a>
          <a href="collections.html">کالکشن‌ها</a>
          <a href="lookbook.html">لوک‌بوک</a>
          <a href="brands.html">طراحان</a>
          <a href="index.html#flash-deals" class="nav-flash-deal">🔥 حراج شگفت‌انگیز</a>
          <a href="blog.html">مجله استایل</a>
          <a href="about.html">درباره ما</a>
          <a href="contact.html">تماس</a>
        </div>
      </div>
      <div class="sub-nav-actions flex items-center gap-md">
        <a href="gift-card.html" class="sub-nav-action-link" title="کارت هدیه نُوا">
          🎁 کارت هدیه
        </a>
        <span class="sub-nav-divider">|</span>
        <a href="tracking.html" class="sub-nav-action-link tracking-link" title="پیگیری سفارش">
          🔍 پیگیری سفارش
        </a>
      </div>
    </div>`;
  header.appendChild(subNav);
}

// On mobile devices, tapping the category trigger button opens the mobile drawer
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.category-trigger-btn');
  if (btn && window.innerWidth <= 1024) {
    e.preventDefault();
    openMobileNav();
  }
});

// Guarantee a long header search bar on every page, even the ones that were
// built with the older header (plain nav + a search icon button). The icon
// button is swapped for the real, long search bar so the header is uniform.
function ensureHeaderSearchBar() {
  const inner = document.querySelector('.header-inner');
  if (!inner || inner.querySelector('.header-search-box')) return;

  const box = document.createElement('div');
  box.className = 'header-search-box';
  box.innerHTML = `
    <svg class="header-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
    <input type="text" class="header-search-input" placeholder="جستجوی محصول، برند، دسته‌بندی و ...">`;

  const actions = inner.querySelector('.header-actions');
  if (actions) {
    inner.insertBefore(box, actions);
  } else if (inner.lastElementChild) {
    // No action cluster: keep the bar in the middle, before the last group.
    inner.insertBefore(box, inner.lastElementChild);
  } else {
    inner.appendChild(box);
  }

  // Drop the now-redundant search icon button from the action cluster.
  inner.querySelectorAll('.header-actions .action-btn[onclick*="openModal"]').forEach(btn => btn.remove());

  // The old header used a plain horizontal nav; the home page uses the mega
  // menu + sub-nav instead. Hide the duplicated plain nav so the header shape
  // matches everywhere.
  const oldNav = inner.querySelector('.nav-menu');
  if (oldNav) oldNav.classList.add('nav-menu-legacy-hidden');
}

// ==========================================================================
// Accordions & Tabs
// ==========================================================================
function initAccordions() {
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.accordion-item');
      if (!item) return;

      const isOpen = item.classList.contains('active');
      // If single-open behavior desired, close siblings:
      const parent = item.parentElement;
      if (parent.dataset.singleOpen === 'true') {
        parent.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
      }
      item.classList.toggle('active', !isOpen);
    });
  });
}

function initTabs() {
  document.querySelectorAll('.tabs-nav').forEach(nav => {
    const buttons = nav.querySelectorAll('.tab-btn');
    const container = nav.closest('.tabs-container') || document;

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-tab');
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        container.querySelectorAll('.tab-pane').forEach(pane => {
          pane.classList.toggle('active', pane.id === targetId);
        });
      });
    });
  });
}

// ==========================================================================
// Back-to-Top Floating Button
// ==========================================================================
function initBackToTop() {
  let backToTopBtn = document.getElementById('back-to-top-btn');
  if (!backToTopBtn) {
    backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'back-to-top-btn';
    backToTopBtn.type = 'button';
    backToTopBtn.setAttribute('aria-label', 'بازگشت به بالا');
    backToTopBtn.setAttribute('title', 'بازگشت به بالا');
    backToTopBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 15l-6-6-6 6"/>
      </svg>
    `;
    document.body.appendChild(backToTopBtn);
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!backToTopBtn._hasClickListener) {
    backToTopBtn.addEventListener('click', scrollToTop);
    backToTopBtn._hasClickListener = true;
  }

  document.querySelectorAll('.floating-scroll-top-btn').forEach(btn => {
    if (!btn._hasClickListener) {
      btn.addEventListener('click', scrollToTop);
      btn._hasClickListener = true;
    }
  });
}
window.initBackToTop = initBackToTop;

// ==========================================================================
// Sticky Header & Sticky Add to Cart Observers
// ==========================================================================
function initScrollListeners() {
  initBackToTop();
  const header = document.querySelector('.site-header');
  const backToTopBtn = document.getElementById('back-to-top-btn');
  const floatingTopBtn = document.querySelector('.floating-scroll-top-btn');

  const syncTopButtons = () => {
    const shouldShow = window.scrollY > 400;
    if (backToTopBtn) backToTopBtn.classList.toggle('visible', shouldShow);
    if (floatingTopBtn) floatingTopBtn.classList.toggle('visible', shouldShow);
  };

  window.addEventListener('scroll', () => {
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 40);
    }

    // Back to Top button: show after scrolling 400px
    syncTopButtons();

    const stickyCart = document.getElementById('sticky-add-to-cart');
    const mainBuyBtn = document.getElementById('main-add-to-cart-btn');
    if (stickyCart && mainBuyBtn) {
      const btnRect = mainBuyBtn.getBoundingClientRect();
      if (btnRect.bottom < 0) {
        stickyCart.classList.add('visible');
      } else {
        stickyCart.classList.remove('visible');
      }
    }
  }, { passive: true });

  // Sync on load too (e.g. browser restores scroll position on refresh)
  syncTopButtons();
}

// Global dismiss announcement bar
function dismissAnnouncement() {
  const bar = document.getElementById('announcement-bar');
  if (bar) bar.classList.add('hidden');
}
window.dismissAnnouncement = dismissAnnouncement;

// ==========================================================================
// Mega Menu (Touch & Click Support)
// ==========================================================================
function initMegaMenu() {
  const catTriggers = document.querySelectorAll('.category-trigger-btn');
  catTriggers.forEach(btn => {
    const parentNavItem = btn.closest('.nav-item');
    if (!parentNavItem) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = parentNavItem.classList.contains('is-open');
      document.querySelectorAll('.nav-item.is-open').forEach(item => {
        if (item !== parentNavItem) item.classList.remove('is-open');
      });
      parentNavItem.classList.toggle('is-open', !isOpen);
    });
  });

  // Close mega menu on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-item')) {
      document.querySelectorAll('.nav-item.is-open').forEach(item => item.classList.remove('is-open'));
    }
  });
}
window.initMegaMenu = initMegaMenu;

function initSectionNavHandlers() {
  function handleSectionNavigation(hash, smooth = true) {
    if (!hash || !hash.startsWith('#')) return;
    const target = document.querySelector(hash);
    if (!target) return;

    if (smooth) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    if (hash === '#new-arrivals') {
      // Automatically activate the "تازه‌ها" tab in the featured products showcase
      const newTabBtn = document.querySelector('#featured-tabs-nav button[data-filter="new"]');
      if (newTabBtn) {
        setTimeout(() => newTabBtn.click(), 150);
      }
    } else if (hash === '#flash-deals') {
      // Trigger glowing pulse animation on the flash-deals box
      const box = document.querySelector('.flash-deals-box');
      if (box) {
        box.classList.remove('highlight-pulse');
        void box.offsetWidth; // force DOM reflow
        box.classList.add('highlight-pulse');
      }
    }
  }

  // Handle in-page clicks on anchor tags pointing to #...
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href || href === '#' || href === '#!') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      try { history.pushState(null, '', href); } catch (_) {}
      handleSectionNavigation(href, true);
    }
  });

  // Handle page load with hash (e.g. index.html#flash-deals or index.html#new-arrivals)
  if (window.location.hash) {
    setTimeout(() => {
      handleSectionNavigation(window.location.hash, true);
    }, 250);
  }

  // Handle hashchange event (browser back/forward navigation)
  window.addEventListener('hashchange', () => {
    handleSectionNavigation(window.location.hash, true);
  });
}
window.initSectionNavHandlers = initSectionNavHandlers;

// ==========================================================================
// All Categories Modal Functions
// ==========================================================================
function openAllCategoriesModal() {
  const modal = document.getElementById('categories-modal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeAllCategoriesModal() {
  const modal = document.getElementById('categories-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}
window.openAllCategoriesModal = openAllCategoriesModal;
window.closeAllCategoriesModal = closeAllCategoriesModal;

// Global DOM Ready Init
document.addEventListener('DOMContentLoaded', () => {
  const safeInit = (name, fn) => {
    try { fn(); } catch (err) { console.error(`[NOVA] ${name} failed:`, err); }
  };

  safeInit('initTheme', initTheme);
  safeInit('initDirection', initDirection);
  safeInit('initUnifiedHeader', initUnifiedHeader);
  safeInit('initMegaMenu', initMegaMenu);
  safeInit('initAccordions', initAccordions);
  safeInit('initTabs', initTabs);
  safeInit('initScrollListeners', initScrollListeners);
  safeInit('initSectionNavHandlers', initSectionNavHandlers);

  // Overlay click to close all active drawers/modals.
  let overlay = document.getElementById('global-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'global-overlay';
    overlay.className = 'overlay-backdrop';
    document.body.appendChild(overlay);
  }
  overlay.addEventListener('click', () => {
    if (window.novaCart) window.novaCart.closeDrawer();
    if (window.searchEngine) window.searchEngine.closeModal();
    closeQuickView();
    closeMobileNav();
    closeAllCategoriesModal();
    document.querySelectorAll('.nav-item.is-open').forEach(item => item.classList.remove('is-open'));
    const shopSidebar = document.getElementById('shop-sidebar');
    if (shopSidebar) shopSidebar.classList.remove('active');
  });

  // Escape key closes open drawers & modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (window.novaCart) window.novaCart.closeDrawer();
      if (window.searchEngine) window.searchEngine.closeModal();
      closeQuickView();
      closeMobileNav();
      closeAllCategoriesModal();
      document.querySelectorAll('.nav-item.is-open').forEach(item => item.classList.remove('is-open'));
      const shopSidebar = document.getElementById('shop-sidebar');
      if (shopSidebar) shopSidebar.classList.remove('active');
    }
  });
});
