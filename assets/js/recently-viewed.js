/**
 * NOVA — Recently Viewed History Page Controller
 * Dedicated page engine for recently-viewed.html with item removal & bulk actions
 */

class RecentlyViewedPageManager {
  init() {
    this.render();
    this.bindClear();
  }

  render() {
    const grid = document.getElementById('recently-viewed-full-grid');
    const emptyBox = document.getElementById('recently-viewed-empty');
    const countBadge = document.getElementById('recently-viewed-count');
    const controlsBar = document.getElementById('recently-viewed-controls');

    if (!grid) return;

    const ids = window.getRecentlyViewed ? window.getRecentlyViewed() : [];
    const products = ids.map(id => window.getProductById ? window.getProductById(id) : null).filter(Boolean);

    if (countBadge) {
      countBadge.textContent = `${products.length.toLocaleString('fa-IR')} محصول`;
    }

    if (products.length === 0) {
      grid.style.display = 'none';
      if (controlsBar) controlsBar.style.display = 'none';
      if (emptyBox) {
        emptyBox.style.display = 'block';
        const recGrid = document.getElementById('recently-recommendations-grid');
        if (recGrid && window.getAllProducts) {
          const recs = window.getAllProducts().slice(0, 4);
          recGrid.innerHTML = recs.map((p, idx) => window.renderProductCardHTML(p, false, idx + 1)).join('');
          if (window.novaWishlist) window.novaWishlist.updateCardButtons();
        }
      }
      return;
    }

    if (emptyBox) emptyBox.style.display = 'none';
    if (controlsBar) controlsBar.style.display = 'flex';
    grid.style.display = 'grid';

    grid.innerHTML = products.map((p, idx) => {
      return `
        <div style="position: relative;" id="rv-wrap-${p.id}">
          <button 
            class="recently-card-remove-btn" 
            onclick="novaRecentlyViewedPage.removeItem('${p.id}')"
            title="حذف از تاریخچه"
            aria-label="حذف ${p.name} از تاریخچه"
          >
            ✕
          </button>
          ${window.renderProductCardHTML(p, false, idx + 1)}
        </div>
      `;
    }).join('');

    if (window.novaWishlist) window.novaWishlist.updateCardButtons();
    if (window.initScrollReveal) window.initScrollReveal();
  }

  removeItem(productId) {
    let viewed = window.getRecentlyViewed ? window.getRecentlyViewed() : [];
    viewed = viewed.filter(id => id !== productId);
    try {
      localStorage.setItem('nova_recently_viewed', JSON.stringify(viewed));
    } catch (e) {}

    const el = document.getElementById(`rv-wrap-${productId}`);
    if (el) {
      el.style.transition = 'all 0.3s ease';
      el.style.opacity = '0';
      el.style.transform = 'scale(0.9)';
      setTimeout(() => {
        this.render();
      }, 300);
    } else {
      this.render();
    }

    if (window.showToast) window.showToast('کالا از تاریخچه بازدید حذف شد', 'info');
  }

  clearAll() {
    if (!confirm('آیا از پاکسازی کامل تاریخچه بازدیدهای خود اطمینان دارید؟')) return;
    try {
      localStorage.removeItem('nova_recently_viewed');
    } catch (e) {}
    this.render();
    if (window.showToast) window.showToast('تاریخچه بازدیدهای اخیر پاکسازی شد', 'info');
  }

  bindClear() {
    const clearBtn = document.getElementById('btn-clear-recently-viewed');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => this.clearAll());
    }
  }
}

const novaRecentlyViewedPage = new RecentlyViewedPageManager();
window.novaRecentlyViewedPage = novaRecentlyViewedPage;

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('recently-viewed-full-grid')) {
    novaRecentlyViewedPage.init();
  }
});
