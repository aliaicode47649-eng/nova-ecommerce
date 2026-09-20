/**
 * NOVA — Product Comparison Matrix
 * Compares specs, prices, stock, ratings, and features across up to 4 items
 */

const COMPARE_STORAGE_KEY = 'nova_compare_ids';
const MAX_COMPARE_ITEMS = 4;

class CompareManager {
  constructor() {
    this.ids = this.loadCompare();
  }

  loadCompare() {
    try {
      const data = localStorage.getItem(COMPARE_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  saveCompare() {
    try {
      localStorage.setItem(COMPARE_STORAGE_KEY, JSON.stringify(this.ids));
      this.updateBadges();
      window.dispatchEvent(new CustomEvent('nova:compare-updated', { detail: { compare: this } }));
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
      this.remove(id);
    } else {
      if (this.ids.length >= MAX_COMPARE_ITEMS) {
        showToast(`حداکثر می‌توانید تا ۴ محصول را مقایسه کنید`, 'warning');
        return;
      }
      this.ids.push(id);
      this.saveCompare();
      showToast(`«${product.name}» به لیست مقایسه اضافه شد`, 'success');
    }
  }

  remove(id) {
    this.ids = this.ids.filter(item => item !== id);
    this.saveCompare();
    const product = getProductById(id);
    if (product) {
      showToast(`«${product.name}» از مقایسه حذف شد`, 'info');
    }
    this.renderPage();
  }

  clear() {
    this.ids = [];
    this.saveCompare();
    this.renderPage();
  }

  updateBadges() {
    const badges = document.querySelectorAll('.compare-count-badge');
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

  renderPage() {
    const tableContainer = document.getElementById('compare-table-container');
    const emptyState = document.getElementById('compare-empty');
    if (!tableContainer) return;

    if (this.ids.length === 0) {
      tableContainer.innerHTML = '';
      if (emptyState) emptyState.style.display = 'block';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';
    const products = this.ids.map(id => getProductById(id)).filter(Boolean);

    let html = `
      <div style="overflow-x: auto; -webkit-overflow-scrolling: touch;">
        <table class="compare-table" style="width: 100%; min-width: 680px; border: 1px solid var(--border-color); background: var(--bg-surface);">
          <tbody>
            <!-- Row: Remove / Actions -->
            <tr style="border-bottom: 1px solid var(--border-color);">
              <th style="padding: 1.2rem; background: var(--bg-surface-subtle); text-align: start; width: 200px; font-weight: var(--fw-bold);">محصول</th>
              ${products.map(p => `
                <td style="padding: 1.2rem; text-align: center; border-inline-start: 1px solid var(--border-color); position: relative;">
                  <button onclick="novaCompare.remove('${p.id}')" style="position: absolute; top: 8px; inset-inline-end: 8px; color: var(--text-tertiary); font-size: 1.2rem;" title="حذف">×</button>
                  <img src="${p.images[0]}" alt="${p.name}" style="width: 120px; height: 150px; object-fit: cover; margin-inline: auto; border-radius: var(--radius-xs); margin-bottom: 0.75rem;">
                  <h4 style="font-size: var(--text-sm); font-weight: var(--fw-bold); margin-bottom: 0.35rem;">${p.name}</h4>
                  <span style="font-size: var(--text-xs); color: var(--text-tertiary);">${p.enName}</span>
                </td>
              `).join('')}
            </tr>

            <!-- Row: Price -->
            <tr style="border-bottom: 1px solid var(--border-color);">
              <th style="padding: 1rem 1.2rem; background: var(--bg-surface-subtle); text-align: start; font-weight: var(--fw-bold);">قیمت</th>
              ${products.map(p => `
                <td style="padding: 1rem 1.2rem; text-align: center; border-inline-start: 1px solid var(--border-color); font-weight: var(--fw-bold); color: var(--text-primary);">
                  ${formatPrice(p.price)}
                  ${p.oldPrice ? `<div style="font-size: var(--text-xs); color: var(--text-tertiary); text-decoration: line-through;">${formatPrice(p.oldPrice)}</div>` : ''}
                </td>
              `).join('')}
            </tr>

            <!-- Row: Category -->
            <tr style="border-bottom: 1px solid var(--border-color);">
              <th style="padding: 1rem 1.2rem; background: var(--bg-surface-subtle); text-align: start; font-weight: var(--fw-bold);">دسته‌بندی</th>
              ${products.map(p => `
                <td style="padding: 1rem 1.2rem; text-align: center; border-inline-start: 1px solid var(--border-color); font-size: var(--text-sm);">
                  ${p.categoryName}
                </td>
              `).join('')}
            </tr>

            <!-- Row: Rating -->
            <tr style="border-bottom: 1px solid var(--border-color);">
              <th style="padding: 1rem 1.2rem; background: var(--bg-surface-subtle); text-align: start; font-weight: var(--fw-bold);">امتیاز خریداران</th>
              ${products.map(p => `
                <td style="padding: 1rem 1.2rem; text-align: center; border-inline-start: 1px solid var(--border-color); color: var(--accent); font-weight: var(--fw-bold);">
                  ★ ${p.rating.toLocaleString('fa-IR')} <span style="font-size: var(--text-xs); color: var(--text-tertiary);">(${p.reviews.toLocaleString('fa-IR')} دیدگاه)</span>
                </td>
              `).join('')}
            </tr>

            <!-- Row: Stock Availability -->
            <tr style="border-bottom: 1px solid var(--border-color);">
              <th style="padding: 1rem 1.2rem; background: var(--bg-surface-subtle); text-align: start; font-weight: var(--fw-bold);">وضعیت انبار</th>
              ${products.map(p => `
                <td style="padding: 1rem 1.2rem; text-align: center; border-inline-start: 1px solid var(--border-color);">
                  <span class="badge ${p.stock > 0 ? 'badge-stock' : 'badge-out'}">${p.stock > 0 ? `موجود در انبار (${p.stock.toLocaleString('fa-IR')} عدد)` : 'ناموجود'}</span>
                </td>
              `).join('')}
            </tr>

            <!-- Row: Features -->
            <tr style="border-bottom: 1px solid var(--border-color);">
              <th style="padding: 1rem 1.2rem; background: var(--bg-surface-subtle); text-align: start; font-weight: var(--fw-bold);">ویژگی‌های برجسته</th>
              ${products.map(p => `
                <td style="padding: 1rem 1.2rem; text-align: start; border-inline-start: 1px solid var(--border-color); font-size: var(--text-xs); line-height: 1.7;">
                  <ul style="list-style: disc; padding-inline-start: 1rem;">
                    ${(p.features || []).map(f => `<li>${f}</li>`).join('')}
                  </ul>
                </td>
              `).join('')}
            </tr>

            <!-- Row: Action -->
            <tr>
              <th style="padding: 1rem 1.2rem; background: var(--bg-surface-subtle);"></th>
              ${products.map(p => `
                <td style="padding: 1rem 1.2rem; text-align: center; border-inline-start: 1px solid var(--border-color);">
                  <button class="btn btn-primary btn-sm btn-block" onclick="novaCart.addItem('${p.id}', 1)">
                    خرید مستقیم
                  </button>
                </td>
              `).join('')}
            </tr>
          </tbody>
        </table>
      </div>
    `;

    tableContainer.innerHTML = html;
  }
}

const novaCompare = new CompareManager();
window.novaCompare = novaCompare;
window.compareManager = novaCompare;
