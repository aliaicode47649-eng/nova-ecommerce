/**
 * NOVA — Wishlist Manager
 * Persistent wishlist storage, heart toggles, count badges & page renderer
 */

const WISHLIST_STORAGE_KEY = 'nova_wishlist_ids';

class WishlistManager {
  constructor() {
    this.ids = this.loadWishlist();
  }

  loadWishlist() {
    try {
      const data = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  saveWishlist() {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(this.ids));
      this.updateBadges();
      this.updateCardButtons();
      window.dispatchEvent(new CustomEvent('nova:wishlist-updated', { detail: { wishlist: this } }));
    } catch (e) {
      console.error(e);
    }
  }

  has(id) {
    return this.ids.includes(id);
  }

  toggle(id) {
    const product = getProductById(id);
    if (!product) return;

    if (this.has(id)) {
      this.ids = this.ids.filter(item => item !== id);
      this.saveWishlist();
      showToast(`«${product.name}» از لیست علاقه‌مندی‌ها حذف شد`, 'info');
    } else {
      this.ids.push(id);
      this.saveWishlist();
      showToast(`«${product.name}» به لیست علاقه‌مندی‌ها اضافه شد`, 'success');
    }
  }

  remove(id) {
    this.ids = this.ids.filter(item => item !== id);
    this.saveWishlist();
    const product = getProductById(id);
    if (product) {
      showToast(`«${product.name}» از علاقه‌مندی‌ها حذف شد`, 'info');
    }
  }

  moveToCart(id) {
    const product = getProductById(id);
    if (!product) return;

    if (window.novaCart) {
      window.novaCart.addItem(id, 1);
      this.remove(id);
    }
  }

  updateBadges() {
    const badges = document.querySelectorAll('.wishlist-count-badge');
    badges.forEach(badge => {
      const prevCount = badge.textContent;
      const nextCount = this.ids.length > 0 ? this.ids.length.toLocaleString('fa-IR') : '۰';
      badge.textContent = nextCount;
      badge.style.display = this.ids.length > 0 ? 'flex' : 'none';

      if (this.ids.length > 0 && prevCount !== nextCount) {
        badge.classList.remove('badge-bump', 'badge-num-update');
        void badge.offsetWidth;
        badge.classList.add('badge-bump', 'badge-num-update');
        badge.addEventListener('animationend', () => badge.classList.remove('badge-bump', 'badge-num-update'), { once: true });
      }
    });
  }

  updateCardButtons() {
    document.querySelectorAll('[data-wishlist-id]').forEach(btn => {
      const id = btn.getAttribute('data-wishlist-id');
      if (this.has(id)) {
        btn.classList.add('active');
        btn.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
      } else {
        btn.classList.remove('active');
        btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>`;
      }
    });
  }

  renderPage() {
    const container = document.getElementById('wishlist-grid');
    const emptyState = document.getElementById('wishlist-empty');
    if (!container) return;

    if (this.ids.length === 0) {
      container.innerHTML = '';
      if (emptyState) emptyState.style.display = 'block';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';
    const products = this.ids.map(id => getProductById(id)).filter(Boolean);

    container.innerHTML = products.map((product, idx) => `
      <div class="product-card reveal-fade-up delay-${(idx % 5) + 1}" id="wishlist-item-${product.id}">
        <div class="product-card-media">
          <img src="${product.images[0]}" alt="${product.name}" class="product-card-img primary img-blur-up" width="600" height="800" loading="lazy" onload="this.classList.add('is-loaded')">
          ${product.images[1] ? `<img src="${product.images[1]}" alt="${product.name}" class="product-card-img secondary img-blur-up" width="600" height="800" loading="lazy" onload="this.classList.add('is-loaded')">` : ''}
          <div class="product-card-actions" style="opacity:1; transform:none;">
            <button class="card-action-btn active" onclick="novaWishlist.remove('${product.id}')" title="حذف از لیست">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
            </button>
            <button class="card-action-btn" onclick="openQuickView('${product.id}')" title="مشاهده سریع">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
            </button>
          </div>
        </div>
        <div class="product-card-body">
          <span class="product-card-category">${product.categoryName}</span>
          <a href="product.html?id=${product.id}" class="product-card-title">${product.name}</a>
          <div class="product-card-price">
            <span class="current-price">${formatPrice(product.price)}</span>
            ${product.oldPrice ? `<span class="old-price">${formatPrice(product.oldPrice)}</span>` : ''}
          </div>
          <button class="btn btn-primary btn-sm btn-block mt-3" onclick="novaWishlist.moveToCart('${product.id}')" style="margin-top: 0.75rem;">
            انتقال به سبد خرید
          </button>
        </div>
      </div>
    `).join('');
    if (window.initScrollReveal) window.initScrollReveal();
  }
}

const novaWishlist = new WishlistManager();
window.novaWishlist = novaWishlist;
window.wishlistManager = novaWishlist;
