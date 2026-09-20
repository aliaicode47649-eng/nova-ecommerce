/**
 * NOVA — Master Application Coordinator
 * Boots all pages, initializes dynamic homepage widgets, and renders product pages
 */

document.addEventListener('DOMContentLoaded', () => {
  // Sync global badges across header
  if (window.novaCart) window.novaCart.updateBadges();
  if (window.novaWishlist) window.novaWishlist.updateBadges();
  if (window.novaCompare) window.novaCompare.updateBadges();

  // Route page-specific bootloaders
  initHomepageSections();
  initCartPage();
  initCheckoutPage();
  initProductDetailPage();
  initWishlistPage();
  initComparePage();
});

// ==========================================================================
// Homepage Dynamic Section Initializations
// ==========================================================================
function initHomepageSections() {
  const featuredGrid = document.getElementById('home-featured-grid');
  const bestSellersGrid = document.getElementById('home-bestsellers-grid');

  if (featuredGrid) {
    // Pick 4 standout items
    const featuredItems = getAllProducts().slice(0, 4);
    featuredGrid.innerHTML = featuredItems.map((p, idx) => renderProductCardHTML(p, false, idx + 1)).join('');
  }

  if (bestSellersGrid) {
    // Pick 4 hot items
    const bestItems = getAllProducts().filter(p => p.badgeType === 'hot' || p.badgeType === 'sale').slice(0, 4);
    bestSellersGrid.innerHTML = bestItems.map((p, idx) => renderProductCardHTML(p, false, idx + 1)).join('');
  }

  if (window.initScrollReveal) {
    window.initScrollReveal();
  }

  // Render recently viewed section if user has browsed products before
  if (typeof renderRecentlyViewedSection === 'function') {
    renderRecentlyViewedSection(null);
  }

  // Interactive Product Showcase Thumbnail switch
  const showcaseThumbs = document.querySelectorAll('.showcase-thumb-btn');
  const showcaseMainImg = document.getElementById('showcase-main-img');
  if (showcaseThumbs.length > 0 && showcaseMainImg) {
    showcaseThumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        showcaseThumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        const src = thumb.getAttribute('data-img');
        if (src) showcaseMainImg.src = src;
      });
    });
  }

  // Update card action buttons (like wishlist hearts) on initial render
  if (window.novaWishlist) {
    window.novaWishlist.updateCardButtons();
  }
}

// ==========================================================================
// Product Details Page (product.html?id=nova-01)
// ==========================================================================
function initProductDetailPage() {
  const container = document.getElementById('product-detail-container');
  if (!container) return;

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id') || 'nova-01';
  const product = getProductById(productId) || getAllProducts()[0];

  // Track this page view for Recently Viewed feature
  if (typeof trackRecentlyViewed === 'function') {
    trackRecentlyViewed(product.id);
  }

  let selectedColor = product.colors && product.colors[0] ? product.colors[0].name : 'استاندارد';
  let selectedSize = product.sizes && product.sizes[0] ? product.sizes[0] : 'استاندارد';
  let qty = 1;

  // Set document title
  document.title = `${product.name} | فروشگاه نُوا`;

  // Render Product Page DOM
  container.innerHTML = `
    <!-- Breadcrumb -->
    <div class="breadcrumbs">
      <a href="index.html">صفحه اصلی</a>
      <span class="breadcrumb-sep">/</span>
      <a href="shop.html?category=${product.category}">${product.categoryName}</a>
      <span class="breadcrumb-sep">/</span>
      <span class="current">${product.name}</span>
    </div>

    <div class="product-detail-layout">
      <!-- Left: Interactive Gallery Sticky -->
      <div class="product-gallery-sticky reveal-fade-up">
        <div class="product-gallery-main" id="pdp-zoom-box" onclick="openFullscreenImage(this)">
          <img id="pdp-main-image" src="${product.images[0]}" alt="${product.name}">
          ${product.badge ? `<span class="badge badge-${product.badgeType || 'new'}" style="position: absolute; top: 1rem; inset-inline-start: 1rem; z-index: 2;">${product.badge}</span>` : ''}
        </div>
        <div class="product-gallery-thumbs">
          ${product.images.map((img, idx) => `
            <div class="showcase-thumb-btn ${idx === 0 ? 'active' : ''}" onclick="switchPdpImage('${img}', this)">
              <img src="${img}" alt="${product.name}">
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Right: Product Purchase Info Panel -->
      <div class="product-info-panel reveal-fade-up delay-1">
        <span class="product-card-category">${product.categoryName}</span>
        <h1>${product.name}</h1>
        <div style="font-size: var(--text-xs); color: var(--text-tertiary); margin-bottom: 0.75rem;">${product.enName}</div>

        <div class="product-meta-row">
          <div style="color: var(--accent); font-weight: bold; font-size: var(--text-sm);">★ ${product.rating.toLocaleString('fa-IR')}</div>
          <span style="color: var(--text-tertiary); font-size: var(--text-xs);">(${product.reviews.toLocaleString('fa-IR')} دیدگاه خریداران)</span>
          <span style="color: var(--border-color);">|</span>
          <span class="badge ${product.stock > 0 ? 'badge-stock' : 'badge-out'}">${product.stock > 0 ? `موجود در انبار (${product.stock.toLocaleString('fa-IR')} عدد)` : 'ناموجود'}</span>
        </div>

        <div class="flex items-center gap-lg" style="margin-bottom: 1.5rem;">
          <span style="font-size: var(--text-2xl); font-weight: var(--fw-black); color: var(--text-primary);">${formatPrice(product.price)}</span>
          ${product.oldPrice ? `
            <span style="font-size: var(--text-base); color: var(--text-tertiary); text-decoration: line-through;">${formatPrice(product.oldPrice)}</span>
            <span class="badge badge-sale">تخفیف ویژه</span>
          ` : ''}
        </div>

        <p style="font-size: var(--text-base); line-height: var(--lh-relaxed); color: var(--text-secondary); margin-bottom: 2rem;">
          ${product.description}
        </p>

        <!-- Color Swatches -->
        ${product.colors && product.colors.length > 0 ? `
          <div class="variant-picker-section">
            <div class="flex justify-between items-center" style="margin-bottom: 0.75rem;">
              <span class="form-label">رنگ انتخابی: <strong id="selected-color-label" style="color: var(--text-primary);">${selectedColor}</strong></span>
            </div>
            <div class="flex gap-sm">
              ${product.colors.map((c, i) => `
                <button class="filter-swatch-btn ${i === 0 ? 'active' : ''}" style="background-color: ${c.hex};" title="${c.name}" onclick="selectPdpColor('${c.name}', this)"></button>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Size Selection -->
        ${product.sizes && product.sizes.length > 0 ? `
          <div class="variant-picker-section" style="border-top: none;">
            <div class="flex justify-between items-center" style="margin-bottom: 0.75rem;">
              <span class="form-label">سایز: <strong id="selected-size-label" style="color: var(--text-primary);">${selectedSize}</strong></span>
              <a href="size-guide.html" target="_blank" style="font-size: var(--text-xs); color: var(--accent); text-decoration: underline;">راهنمای سایز</a>
            </div>
            <div class="flex gap-xs">
              ${product.sizes.map((s, i) => `
                <button class="filter-size-btn ${i === 0 ? 'active' : ''}" onclick="selectPdpSize('${s}', this)">${s}</button>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Purchase Action Buttons -->
        <div class="purchase-actions-group">
          <div class="quantity-control">
            <button class="qty-btn" onclick="let inp=document.getElementById('pdp-qty'); if(parseInt(inp.value)>1){inp.value=parseInt(inp.value)-1;}">-</button>
            <input type="text" id="pdp-qty" class="qty-input" value="1" readonly>
            <button class="qty-btn" onclick="let inp=document.getElementById('pdp-qty'); inp.value=parseInt(inp.value)+1;">+</button>
          </div>

          <button id="main-add-to-cart-btn" class="btn btn-primary flex-1 btn-lg" onclick="executePdpAddToCart('${product.id}')">
            افزودن به سبد خرید
          </button>

          <button class="btn btn-outline btn-icon" onclick="novaWishlist.toggle('${product.id}')" title="افزودن به علاقه‌مندی‌ها">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
          </button>

          <button class="btn btn-outline btn-icon" onclick="novaCompare.toggle('${product.id}')" title="مقایسه محصول">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
          </button>
        </div>

        <!-- Benefits Highlights -->
        <div style="background-color: var(--bg-surface-subtle); padding: var(--space-lg); border-radius: var(--radius-xs); margin-bottom: 2rem;">
          <div class="flex items-center gap-sm" style="font-size: var(--text-xs); margin-bottom: 0.5rem; color: var(--text-primary);">
            <span>✓</span> <strong>ارسال رایگان اکسپرس</strong> برای خریدهای بالای ۳ میلیون تومان
          </div>
          <div class="flex items-center gap-sm" style="font-size: var(--text-xs); margin-bottom: 0.5rem; color: var(--text-primary);">
            <span>✓</span> <strong>۷ روز ضمانت تعویض و بازگشت</strong> بی قید و شرط کالا
          </div>
          <div class="flex items-center gap-sm" style="font-size: var(--text-xs); color: var(--text-primary);">
            <span>✓</span> <strong>تضمین اصالت ۱۰۰٪</strong> با شناسنامه انحصاری محصول
          </div>
        </div>

        <!-- Accordions for Specs, Care, Shipping -->
        <div class="accordion">
          <div class="accordion-item active">
            <button class="accordion-header">
              <span>ویژگی‌ها و جزئیات تخصصی</span>
              <span class="accordion-icon">+</span>
            </button>
            <div class="accordion-body">
              <div class="accordion-body-inner">
                <ul style="list-style: disc; padding-inline-start: 1.25rem;">
                  ${(product.features || []).map(f => `<li style="margin-bottom: 0.4rem;">${f}</li>`).join('')}
                </ul>
              </div>
            </div>
          </div>

          <div class="accordion-item">
            <button class="accordion-header">
              <span>دستورالعمل نگهداری و شستشو</span>
              <span class="accordion-icon">+</span>
            </button>
            <div class="accordion-body">
              <div class="accordion-body-inner">
                برای حفظ درخشندگی و کیفیت بافت، شستشو را با آب ولرم یا به روش خشکشویی تخصصی انجام دهید. از قرار دادن طولانی‌مدت در برابر تابش شدید مستقیم خورشید خودداری فرمایید.
              </div>
            </div>
          </div>

          <div class="accordion-item">
            <button class="accordion-header">
              <span>نحوه ارسال و رویه بازگشت کالا</span>
              <span class="accordion-icon">+</span>
            </button>
            <div class="accordion-body">
              <div class="accordion-body-inner">
                سفارش‌های شهر تهران طی حداکثر ۲۴ ساعت کاری توسط پیک اختصاصی نُوا و سایر استان‌ها ظرف ۲ الی ۳ روز کاری از طریق تیپاکس و پست پیشتاز تحویل داده می‌شوند.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Sticky Add to Cart Bar for Mobile & Desktop -->
    <div id="sticky-add-to-cart" class="sticky-add-to-cart">
      <div class="container sticky-cart-inner">
        <div class="sticky-product-info">
          <img src="${product.images[0]}" alt="${product.name}" class="sticky-product-img">
          <div>
            <strong style="display:block; font-size: var(--text-sm);">${product.name}</strong>
            <span style="font-size: var(--text-xs); color: var(--text-tertiary);" id="sticky-variant-summary">رنگ: ${selectedColor} | سایز: ${selectedSize}</span>
          </div>
        </div>
        <div class="flex items-center gap-md">
          <span style="font-weight: var(--fw-bold); font-size: var(--text-md);">${formatPrice(product.price)}</span>
          <button class="btn btn-primary btn-sm" onclick="executePdpAddToCart('${product.id}')">
            افزودن به سبد
          </button>
        </div>
      </div>
    </div>
  `;

  // Global helper functions for PDP interaction
  window._pdpSelectedColor = selectedColor;
  window._pdpSelectedSize = selectedSize;

  window.switchPdpImage = (imgSrc, btn) => {
    document.getElementById('pdp-main-image').src = imgSrc;
    document.querySelectorAll('.product-gallery-thumbs .showcase-thumb-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  };

  window.selectPdpColor = (col, btn) => {
    window._pdpSelectedColor = col;
    document.getElementById('selected-color-label').textContent = col;
    document.querySelectorAll('.variant-picker-section .filter-swatch-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    updateStickySummary();
  };

  window.selectPdpSize = (sz, btn) => {
    window._pdpSelectedSize = sz;
    document.getElementById('selected-size-label').textContent = sz;
    document.querySelectorAll('.variant-picker-section .filter-size-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    updateStickySummary();
  };

  window.executePdpAddToCart = (id) => {
    const qty = parseInt(document.getElementById('pdp-qty').value, 10) || 1;
    novaCart.addItem(id, qty, window._pdpSelectedColor, window._pdpSelectedSize);
  };

  function updateStickySummary() {
    const el = document.getElementById('sticky-variant-summary');
    if (el) el.textContent = `رنگ: ${window._pdpSelectedColor} | سایز: ${window._pdpSelectedSize}`;
  }

  // Render matching category related products (excluding current item)
  const relatedGrid = document.getElementById('home-featured-grid');
  if (relatedGrid) {
    let related = getAllProducts().filter(p => p.category === product.category && p.id !== product.id);
    if (related.length < 4) {
      const others = getAllProducts().filter(p => p.id !== product.id && !related.some(r => r.id === p.id));
      related = related.concat(others);
    }
    relatedGrid.innerHTML = related.slice(0, 4).map((p, idx) => renderProductCardHTML(p, false, idx + 1)).join('');
    if (window.initScrollReveal) window.initScrollReveal();
  }

  // Render recently viewed products on PDP (excluding current item)
  if (typeof renderRecentlyViewedSection === 'function') {
    renderRecentlyViewedSection(product.id);
  }

  // Re-bind accordions on this dynamically rendered content
  initAccordions();
  if (window.initScrollReveal) window.initScrollReveal();
}

// ==========================================================================
// Fullscreen Image Lightbox (called from PDP gallery)
// FIX: This function was referenced but never defined — caused ReferenceError
// ==========================================================================
window.openFullscreenImage = function(boxEl) {
  const img = boxEl ? boxEl.querySelector('img') : null;
  if (!img) return;

  let lightbox = document.getElementById('nova-lightbox');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.id = 'nova-lightbox';
    lightbox.style.cssText = `
      position: fixed; inset: 0; z-index: 10000;
      background: rgba(0,0,0,0.92); backdrop-filter: blur(12px);
      display: flex; align-items: center; justify-content: center;
      cursor: zoom-out; opacity: 0; transition: opacity 0.25s ease;
    `;
    lightbox.innerHTML = `
      <button style="position:absolute;top:1.25rem;inset-inline-end:1.5rem;color:#fff;font-size:2rem;line-height:1;background:none;border:none;cursor:pointer;" title="بستن">✕</button>
      <img id="nova-lightbox-img" style="max-width:92vw;max-height:92vh;object-fit:contain;border-radius:4px;box-shadow:0 24px 80px rgba(0,0,0,0.6);" alt="">
    `;
    document.body.appendChild(lightbox);

    const closeBtn = lightbox.querySelector('button');
    const closeLightbox = () => {
      lightbox.style.opacity = '0';
      setTimeout(() => { lightbox.style.display = 'none'; document.body.style.overflow = ''; }, 250);
    };
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox || e.target === closeBtn) closeLightbox(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
  }

  const lbImg = document.getElementById('nova-lightbox-img');
  lbImg.src = img.src;
  lbImg.alt = img.alt;
  lightbox.style.display = 'flex';
  requestAnimationFrame(() => { lightbox.style.opacity = '1'; });
  document.body.style.overflow = 'hidden';
};

// ==========================================================================
// Cart Page (cart.html)
// ==========================================================================
function initCartPage() {
  const container = document.getElementById('cart-page-content');
  if (!container) return;

  function renderPage() {
    const totals = window.novaCart.getTotals();
    const items = window.novaCart.items;

    if (items.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: var(--space-4xl) var(--space-xl);">
          <div style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;">🛍️</div>
          <h2 style="font-size: var(--text-2xl); margin-bottom: 0.5rem;">سبد خرید شما در حال حاضر خالی است</h2>
          <p style="color: var(--text-secondary); margin-bottom: 2rem;">مجموعه جدیدترین کالکشن‌های لوکس نُوا را بررسی فرمایید و محصولات مورد علاقه خود را اضافه کنید.</p>
          <a href="shop.html" class="btn btn-primary btn-lg">ورود به فروشگاه و خرید</a>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <!-- Free shipping alert -->
      <div class="shipping-progress">
        <div class="shipping-progress-text">
          ${totals.isFreeShipping ? 'تبریک! ارسال کلیه اقلام این سفارش کاملاً <strong>رایگان</strong> محاسبه می‌شود.' : `تنها <strong>${formatPrice(totals.remainingForFree)}</strong> دیگر تا دریافت ارسال اکسپرس رایگان`}
        </div>
        <div class="shipping-progress-track">
          <div class="shipping-progress-fill" style="width: ${totals.shippingProgress}%;"></div>
        </div>
      </div>

      <div class="cart-grid grid" style="grid-template-columns: 2fr 1fr; gap: var(--space-3xl); align-items: flex-start;">
        <!-- Left: Cart Items Table -->
        <div class="reveal-fade-up" style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-xs); overflow: hidden;">
          <table style="width: 100%;">
            <thead>
              <tr style="background: var(--bg-surface-subtle); border-bottom: 1px solid var(--border-color); font-size: var(--text-xs); font-weight: bold; text-transform: uppercase;">
                <th style="padding: 1rem 1.25rem; text-align: start;">کالای انتخابی</th>
                <th style="padding: 1rem; text-align: center;">قیمت واحد</th>
                <th style="padding: 1rem; text-align: center;">تعداد</th>
                <th style="padding: 1rem; text-align: end;">مجموع</th>
                <th style="padding: 1rem; text-align: center;"></th>
              </tr>
            </thead>
            <tbody>
              ${items.map(item => `
                <tr style="border-bottom: 1px solid var(--border-color);">
                  <td style="padding: 1.25rem; display: flex; align-items: center; gap: 1rem;">
                    <img src="${item.image}" alt="${item.name}" style="width: 70px; height: 85px; object-fit: cover; border-radius: var(--radius-xs);">
                    <div>
                      <a href="product.html?id=${item.id}" style="font-weight: var(--fw-bold); font-size: var(--text-sm); display: block; margin-bottom: 0.25rem;">${item.name}</a>
                      <div style="font-size: var(--text-xs); color: var(--text-tertiary);">رنگ: ${item.color} | سایز: ${item.size}</div>
                    </div>
                  </td>
                  <td style="padding: 1rem; text-align: center; font-size: var(--text-sm);">${formatPrice(item.price)}</td>
                  <td style="padding: 1rem; text-align: center;">
                    <div class="quantity-control" style="height: 36px; margin-inline: auto;">
                      <button class="qty-btn" onclick="novaCart.updateQuantity('${item.key}', ${item.quantity - 1})">-</button>
                      <span class="qty-input" style="width: 36px;">${item.quantity.toLocaleString('fa-IR')}</span>
                      <button class="qty-btn" onclick="novaCart.updateQuantity('${item.key}', ${item.quantity + 1})">+</button>
                    </div>
                  </td>
                  <td style="padding: 1rem; text-align: end; font-weight: var(--fw-bold); font-size: var(--text-sm);">${formatPrice(item.price * item.quantity)}</td>
                  <td style="padding: 1rem; text-align: center;">
                    <button onclick="novaCart.removeItem('${item.key}')" style="color: var(--text-tertiary); font-size: 1.3rem; line-height: 1;" title="حذف">×</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <!-- Coupon input box -->
          <div style="padding: 1.25rem; display: flex; gap: 0.75rem; border-top: 1px solid var(--border-color); background: var(--bg-surface-subtle); align-items: center;">
            <input type="text" id="cart-coupon-input" class="form-input" placeholder="کد تخفیف (مثال: NOVA10)" style="max-width: 260px; text-transform: uppercase;" value="${window.novaCart.coupon ? window.novaCart.coupon.code : ''}">
            <button class="btn btn-outline btn-sm" onclick="handleApplyCoupon()">اعمال کد تخفیف</button>
            ${window.novaCart.coupon ? `<button class="btn btn-ghost btn-sm" onclick="novaCart.removeCoupon()" style="color: var(--error);">حذف کوپن</button>` : ''}
          </div>
        </div>

        <!-- Right: Order Summary Card -->
        <div class="reveal-fade-up delay-1" style="background: var(--bg-surface); border: 1px solid var(--border-color); padding: var(--space-2xl); border-radius: var(--radius-xs);">
          <h3 style="font-size: var(--text-lg); margin-bottom: 1.5rem; padding-bottom: 0.75rem; border-bottom: 1px solid var(--border-color);">خلاصه فاکتور سفارش</h3>
          
          <div class="flex justify-between items-center" style="margin-bottom: 0.85rem; font-size: var(--text-sm);">
            <span style="color: var(--text-secondary);">مجموع اقلام (${totals.itemCount.toLocaleString('fa-IR')} کالا)</span>
            <span style="font-weight: var(--fw-semibold);">${formatPrice(totals.subtotal)}</span>
          </div>

          ${totals.discount > 0 ? `
            <div class="flex justify-between items-center" style="margin-bottom: 0.85rem; font-size: var(--text-sm); color: var(--success);">
              <span>تخفیف (${window.novaCart.coupon.code})</span>
              <span style="font-weight: var(--fw-bold);">- ${formatPrice(totals.discount)}</span>
            </div>
          ` : ''}

          <div class="flex justify-between items-center" style="margin-bottom: 1.5rem; font-size: var(--text-sm);">
            <span style="color: var(--text-secondary);">هزینه ارسال</span>
            <span style="font-weight: var(--fw-semibold);">${totals.shipping === 0 ? '<span style="color: var(--success);">رایگان</span>' : formatPrice(totals.shipping)}</span>
          </div>

          <div class="flex justify-between items-center" style="padding-top: 1rem; border-top: 1px solid var(--border-color); margin-bottom: 1.5rem;">
            <span style="font-size: var(--text-md); font-weight: var(--fw-bold);">مبلغ نهایی قابل پرداخت</span>
            <span style="font-size: var(--text-xl); font-weight: var(--fw-black); color: var(--text-primary);">${formatPrice(totals.total)}</span>
          </div>

          <a href="checkout.html" class="btn btn-primary btn-block btn-lg" style="margin-bottom: 0.75rem;">
            ادامه و ثبت سفارش
          </a>
          <a href="shop.html" class="btn btn-ghost btn-block btn-sm" style="text-align: center;">
            ← بازگشت و افزودن کالاهای بیشتر
          </a>
        </div>
      </div>
    `;
  }

  window.handleApplyCoupon = () => {
    const input = document.getElementById('cart-coupon-input');
    if (!input) return;
    const res = window.novaCart.applyCouponCode(input.value);
    showToast(res.message, res.success ? 'success' : 'error');
  };

  renderPage();
  if (window.initScrollReveal) window.initScrollReveal();
  window.addEventListener('nova:cart-updated', () => {
    renderPage();
    if (window.initScrollReveal) window.initScrollReveal();
  });
}

// ==========================================================================
// Checkout Page (checkout.html)
// ==========================================================================
function initCheckoutPage() {
  const summaryEl = document.getElementById('checkout-order-summary');
  if (!summaryEl) return;

  function renderSummary() {
    const totals = window.novaCart.getTotals();
    const items = window.novaCart.items;

    if (!items || items.length === 0) {
      summaryEl.innerHTML = `
        <div style="text-align: center; padding: 2rem 1rem;">
          <div style="font-size: 2.5rem; margin-bottom: 0.75rem; opacity: 0.5;">🛍️</div>
          <h4 style="font-size: var(--text-md); margin-bottom: 0.5rem;">سبد خرید شما در حال حاضر خالی است</h4>
          <p style="font-size: var(--text-xs); color: var(--text-secondary); margin-bottom: 1.25rem;">برای ادامه فرآیند تسویه حساب، ابتدا محصولات دلخواه خود را انتخاب کنید.</p>
          <a href="shop.html" class="btn btn-primary btn-sm">ورود به فروشگاه آنلاین</a>
        </div>
      `;
      return;
    }

    summaryEl.innerHTML = `
      <div class="flex items-center justify-between" style="margin-bottom: 1.25rem; padding-bottom: 0.75rem; border-bottom: 1px solid var(--border-color);">
        <h3 style="font-size: var(--text-lg); font-weight: bold; margin: 0;">کالاهای سفارش (${totals.itemCount.toLocaleString('fa-IR')})</h3>
        <span style="font-size: var(--text-xs); color: var(--text-tertiary);">${items.length.toLocaleString('fa-IR')} ردیف محصول</span>
      </div>
      
      <div style="max-height: 280px; overflow-y: auto; margin-bottom: 1.5rem; padding-inline-end: 0.25rem;">
        ${items.map(item => `
          <div class="flex items-center gap-md" style="margin-bottom: 0.85rem; padding-bottom: 0.85rem; border-bottom: 1px solid var(--border-color);">
            <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 60px; object-fit: cover; border-radius: var(--radius-xs);">
            <div style="flex: 1; min-width: 0;">
              <h5 style="font-size: var(--text-sm); font-weight: var(--fw-semibold); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${item.name}</h5>
              <div style="font-size: var(--text-xs); color: var(--text-tertiary);">تعداد: ${item.quantity.toLocaleString('fa-IR')} | ${item.color}</div>
            </div>
            <span style="font-size: var(--text-sm); font-weight: var(--fw-bold); white-space: nowrap;">${formatPrice(item.price * item.quantity)}</span>
          </div>
        `).join('')}
      </div>

      <div class="flex justify-between items-center" style="margin-bottom: 0.75rem; font-size: var(--text-sm);">
        <span style="color: var(--text-secondary);">مجموع اقلام</span>
        <span>${formatPrice(totals.subtotal)}</span>
      </div>

      ${totals.discount > 0 ? `
        <div class="flex justify-between items-center" style="margin-bottom: 0.75rem; font-size: var(--text-sm); color: var(--success);">
          <span>تخفیف</span>
          <span>- ${formatPrice(totals.discount)}</span>
        </div>
      ` : ''}

      <div class="flex justify-between items-center" style="margin-bottom: 1.25rem; font-size: var(--text-sm);">
        <span style="color: var(--text-secondary);">هزینه ارسال</span>
        <span>${totals.shipping === 0 ? '<span style="color:var(--success);">رایگان</span>' : formatPrice(totals.shipping)}</span>
      </div>

      <div class="flex justify-between items-center" style="padding-top: 1rem; border-top: 1px solid var(--border-color); margin-bottom: 1.5rem;">
        <span style="font-size: var(--text-md); font-weight: var(--fw-bold);">مبلغ قابل پرداخت</span>
        <span style="font-size: var(--text-xl); font-weight: var(--fw-black); color: var(--text-primary);">${formatPrice(totals.total)}</span>
      </div>
    `;
  }

  renderSummary();
  window.addEventListener('nova:cart-updated', renderSummary);
}

// ==========================================================================
// Wishlist Page (wishlist.html)
// ==========================================================================
function initWishlistPage() {
  if (document.getElementById('wishlist-grid')) {
    window.novaWishlist.renderPage();
    window.addEventListener('nova:wishlist-updated', () => window.novaWishlist.renderPage());
  }
}

// ==========================================================================
// Compare Page (compare.html)
// ==========================================================================
function initComparePage() {
  if (document.getElementById('compare-table-container')) {
    window.novaCompare.renderPage();
    window.addEventListener('nova:compare-updated', () => window.novaCompare.renderPage());
  }
}
