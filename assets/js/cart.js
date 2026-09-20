/**
 * NOVA — Cart Engine & State Management
 * Persistent localStorage, Free Shipping Bar, Coupons, Drawer & Page Renderers
 */

const CART_STORAGE_KEY = 'nova_cart_items';
const COUPON_STORAGE_KEY = 'nova_applied_coupon';
const FREE_SHIPPING_THRESHOLD = 3000000; // 3,000,000 Tomans
const STANDARD_SHIPPING_COST = 65000;    // 65,000 Tomans

const ACTIVE_COUPONS = {
  'NOVA10': { code: 'NOVA10', rate: 0.10, desc: 'تخفیف ۱۰ درصدی افتتاحیه' },
  'VIP20': { code: 'VIP20', rate: 0.20, desc: 'تخفیف ۲۰ درصدی باشگاه مشتریان نُوا' },
  'SPRING': { code: 'SPRING', rate: 0.15, desc: 'تخفیف ۱۵ درصدی کالکشن جدید' }
};

class CartManager {
  constructor() {
    this.items = this.loadCart();
    this.coupon = this.loadCoupon();
  }

  loadCart() {
    try {
      const data = localStorage.getItem(CART_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Failed to load cart from storage', e);
      return [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.items));
      this.updateBadges();
      this.renderDrawer();
      window.dispatchEvent(new CustomEvent('nova:cart-updated', { detail: { cart: this } }));
    } catch (e) {
      console.error('Failed to save cart to storage', e);
    }
  }

  loadCoupon() {
    try {
      const data = localStorage.getItem(COUPON_STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }

  saveCoupon(coupon) {
    this.coupon = coupon;
    try {
      if (coupon) {
        localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(coupon));
      } else {
        localStorage.removeItem(COUPON_STORAGE_KEY);
      }
    } catch (e) {
      console.warn('localStorage inaccessible for coupon', e);
    }
    this.saveCart();
  }

  addItem(productId, quantity = 1, color = null, size = null) {
    const product = getProductById(productId);
    if (!product) {
      showToast('محصول مورد نظر یافت نشد', 'error');
      return false;
    }

    const selectedColor = color || (product.colors && product.colors[0] ? product.colors[0].name : 'استاندارد');
    const selectedSize = size || (product.sizes && product.sizes[0] ? product.sizes[0] : 'استاندارد');
    const itemKey = `${productId}_${selectedColor}_${selectedSize}`;

    const existingIndex = this.items.findIndex(item => item.key === itemKey);
    if (existingIndex > -1) {
      this.items[existingIndex].quantity += quantity;
    } else {
      this.items.push({
        key: itemKey,
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        color: selectedColor,
        size: selectedSize,
        quantity: quantity
      });
    }

    this.saveCart();
    showToast(`«${product.name}» به سبد خرید اضافه شد`, 'success');
    this.openDrawer();
    return true;
  }

  updateQuantity(itemKey, newQty) {
    const item = this.items.find(i => i.key === itemKey);
    if (!item) return;

    if (newQty <= 0) {
      this.removeItem(itemKey);
      return;
    }
    item.quantity = newQty;
    this.saveCart();
  }

  removeItem(itemKey) {
    const item = this.items.find(i => i.key === itemKey);
    this.items = this.items.filter(i => i.key !== itemKey);
    this.saveCart();
    if (item) {
      showToast(`«${item.name}» از سبد خرید حذف شد`, 'info');
    }
  }

  clear() {
    this.items = [];
    this.saveCoupon(null);
    this.saveCart();
  }

  applyCouponCode(rawCode) {
    const code = (rawCode || '').trim().toUpperCase();
    if (!code) {
      return { success: false, message: 'لطفاً کد تخفیف را وارد کنید' };
    }
    if (ACTIVE_COUPONS[code]) {
      this.saveCoupon(ACTIVE_COUPONS[code]);
      return { success: true, message: `کد تخفیف ${ACTIVE_COUPONS[code].desc} اعمال شد` };
    } else {
      return { success: false, message: 'کد تخفیف وارد شده معتبر نیست یا منقضی شده است' };
    }
  }

  removeCoupon() {
    this.saveCoupon(null);
    showToast('کد تخفیف حذف شد', 'info');
  }

  getTotals() {
    const subtotal = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = this.items.reduce((sum, item) => sum + item.quantity, 0);
    
    let discount = 0;
    if (this.coupon && subtotal > 0) {
      discount = Math.round(subtotal * this.coupon.rate);
    }

    const shipping = (subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0) ? 0 : STANDARD_SHIPPING_COST;
    const total = Math.max(0, subtotal - discount + shipping);

    const remainingForFree = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
    const shippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

    return {
      subtotal,
      itemCount,
      discount,
      shipping,
      total,
      remainingForFree,
      shippingProgress,
      isFreeShipping: subtotal >= FREE_SHIPPING_THRESHOLD && subtotal > 0
    };
  }

  updateBadges() {
    const totals = this.getTotals();
    const badges = document.querySelectorAll('.cart-count-badge');
    badges.forEach(badge => {
      const prevCount = badge.textContent;
      const nextCount = totals.itemCount > 0 ? totals.itemCount.toLocaleString('fa-IR') : '۰';
      badge.textContent = nextCount;
      badge.style.display = totals.itemCount > 0 ? 'flex' : 'none';

      if (totals.itemCount > 0 && prevCount !== nextCount) {
        badge.classList.remove('badge-bump', 'badge-num-update');
        void badge.offsetWidth; // force reflow
        badge.classList.add('badge-bump', 'badge-num-update');
        badge.addEventListener('animationend', () => badge.classList.remove('badge-bump', 'badge-num-update'), { once: true });
      }
    });

    if (totals.itemCount > 0) {
      document.querySelectorAll('.header-btn-pill.btn-cart-active, .action-btn[onclick*="openDrawer"]').forEach(btn => {
        btn.classList.remove('cart-icon-bump');
        void btn.offsetWidth;
        btn.classList.add('cart-icon-bump');
        btn.addEventListener('animationend', () => btn.classList.remove('cart-icon-bump'), { once: true });
      });
    }
  }

  renderDrawer() {
    const drawerContainer = document.getElementById('cart-drawer-items');
    if (!drawerContainer) return;

    const totals = this.getTotals();
    const shippingProgressEl = document.getElementById('cart-shipping-progress');
    const shippingTextEl = document.getElementById('cart-shipping-text');
    const subtotalEl = document.getElementById('cart-drawer-subtotal');
    const emptyStateEl = document.getElementById('cart-drawer-empty');
    const footerEl = document.getElementById('cart-drawer-footer');

    // Free shipping threshold bar
    if (shippingProgressEl && shippingTextEl) {
      shippingProgressEl.style.width = `${totals.shippingProgress}%`;
      if (totals.isFreeShipping) {
        shippingTextEl.innerHTML = 'تبریک! ارسال سفارش شما <strong>رایگان</strong> است.';
      } else {
        shippingTextEl.innerHTML = `تنها <strong>${formatPrice(totals.remainingForFree)}</strong> دیگر تا ارسال رایگان!`;
      }
    }

    if (subtotalEl) {
      subtotalEl.textContent = formatPrice(totals.subtotal);
    }

    if (this.items.length === 0) {
      if (emptyStateEl) emptyStateEl.style.display = 'flex';
      if (footerEl) footerEl.style.display = 'none';
      drawerContainer.innerHTML = '';
      return;
    }

    if (emptyStateEl) emptyStateEl.style.display = 'none';
    if (footerEl) footerEl.style.display = 'block';

    drawerContainer.innerHTML = this.items.map(item => `
      <div class="drawer-cart-item flex gap-md items-center py-3 border-b border-color" data-key="${item.key}" style="padding-block: 0.85rem; border-bottom: 1px solid var(--border-color);">
        <img src="${item.image}" alt="${item.name}" style="width: 72px; height: 90px; object-fit: cover; border-radius: var(--radius-xs);">
        <div class="flex-1">
          <h4 style="font-size: var(--text-sm); font-weight: var(--fw-semibold); margin-bottom: 0.25rem;">${item.name}</h4>
          <div style="font-size: var(--text-xs); color: var(--text-tertiary); margin-bottom: 0.4rem;">
            <span>رنگ: ${item.color}</span> | <span>سایز: ${item.size}</span>
          </div>
          <div class="flex items-center justify-between">
            <div class="quantity-control" style="height: 32px;">
              <button class="qty-btn" onclick="novaCart.updateQuantity('${item.key}', ${item.quantity - 1})">-</button>
              <span class="qty-input" style="width: 32px; font-size: 0.8rem;">${item.quantity.toLocaleString('fa-IR')}</span>
              <button class="qty-btn" onclick="novaCart.updateQuantity('${item.key}', ${item.quantity + 1})">+</button>
            </div>
            <span style="font-weight: var(--fw-bold); font-size: var(--text-sm);">${formatPrice(item.price * item.quantity)}</span>
          </div>
        </div>
        <button onclick="novaCart.removeItem('${item.key}')" title="حذف کالا" style="color: var(--text-tertiary); padding: 0.5rem; font-size: 1.1rem; line-height: 1;" onmouseover="this.style.color='var(--error)'" onmouseout="this.style.color='var(--text-tertiary)'">×</button>
      </div>
    `).join('');
  }

  openDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('global-overlay');
    if (drawer && backdrop) {
      drawer.classList.add('open');
      backdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    } else {
      // Graceful fallback for pages without an inline slide drawer
      window.location.href = 'cart.html';
    }
  }

  closeDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('global-overlay');
    if (drawer) drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Global instance
const novaCart = new CartManager();
window.novaCart = novaCart;
// Aliases so inline onclick handlers resolve on every page (even those not loading app.js)
window.cartManager = novaCart;
window.novaProductsData = (typeof NOVA_PRODUCTS !== 'undefined') ? NOVA_PRODUCTS : [];
