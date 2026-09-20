/**
 * NOVA — Search Engine
 * Instant live search modal, recent searches history, dedicated search.html results
 */

const RECENT_SEARCHES_KEY = 'nova_recent_searches';

class SearchEngine {
  constructor() {
    this.products = getAllProducts();
    this.recentSearches = this.loadRecentSearches();
  }

  loadRecentSearches() {
    try {
      const data = localStorage.getItem(RECENT_SEARCHES_KEY);
      return data ? JSON.parse(data) : ['پالتو پشمی', 'عطر نیش', 'چرم ایتالیایی', 'اسپیکر سرامیکی'];
    } catch (e) {
      return ['پالتو پشمی', 'عطر نیش', 'چرم ایتالیایی'];
    }
  }

  saveRecentSearch(term) {
    if (!term || term.trim().length < 2) return;
    const cleanTerm = term.trim();
    this.recentSearches = [cleanTerm, ...this.recentSearches.filter(t => t !== cleanTerm)].slice(0, 6);
    try {
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(this.recentSearches));
    } catch (e) {}
  }

  normalizeText(str) {
    if (!str) return '';
    return String(str)
      .toLowerCase()
      .replace(/[\u200B-\u200D\uFEFF]/g, '')
      .replace(/[\u200C]/g, ' ') // half-space to space
      .replace(/[ي]/g, 'ی')
      .replace(/[ك]/g, 'ک')
      .replace(/[آأإ]/g, 'ا')
      .replace(/[ة]/g, 'ه')
      .replace(/[-_—]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  query(searchTerm) {
    if (!searchTerm || searchTerm.trim() === '') return [];
    const rawTerm = searchTerm.trim();
    const normalizedTerm = this.normalizeText(rawTerm);
    if (!normalizedTerm) return [];

    const tokens = normalizedTerm.split(' ').filter(t => t.length > 0);

    const scored = this.products.map(p => {
      const normName = this.normalizeText(p.name);
      const normEn = this.normalizeText(p.enName);
      const normCat = this.normalizeText(p.categoryName);
      const normDesc = this.normalizeText(p.description);
      const normBrand = this.normalizeText(p.brandName);
      const normTags = Array.isArray(p.tags) ? p.tags.map(t => this.normalizeText(t)).join(' ') : '';
      const normMaterials = Array.isArray(p.materials) ? p.materials.map(m => this.normalizeText(m)).join(' ') : '';
      const normFeatures = Array.isArray(p.features) ? p.features.map(f => this.normalizeText(f)).join(' ') : '';

      let score = 0;

      // Exact phrase matches
      if (normName === normalizedTerm) score += 120;
      else if (normName.startsWith(normalizedTerm)) score += 80;
      else if (normName.includes(normalizedTerm)) score += 60;

      if (normTags.includes(normalizedTerm)) score += 45;
      if (normEn.includes(normalizedTerm)) score += 40;
      if (normBrand.includes(normalizedTerm)) score += 35;
      if (normMaterials.includes(normalizedTerm)) score += 25;
      if (normFeatures.includes(normalizedTerm)) score += 20;

      // Token match checks across name, tags, description
      const allTokensInName = tokens.every(t => normName.includes(t));
      if (allTokensInName) score += 50;

      const allTokensInTags = tokens.every(t => normTags.includes(t));
      if (allTokensInTags) score += 35;

      const allTokensInAll = tokens.every(t =>
        normName.includes(t) || normTags.includes(t) || normBrand.includes(t) ||
        normCat.includes(t) || normDesc.includes(t)
      );
      if (allTokensInAll) score += 20;

      // Low priority description match
      if (normDesc.includes(normalizedTerm)) score += 10;
      if (normCat.includes(normalizedTerm)) score += 8;

      return { product: p, score };
    });

    return scored
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(item => item.product);
  }

  initModal() {
    const searchModal = document.getElementById('search-modal');
    const searchInput = document.getElementById('search-modal-input');
    const searchResults = document.getElementById('search-live-results');
    const recentContainer = document.getElementById('search-recent-tags');

    if (recentContainer) {
      recentContainer.innerHTML = this.recentSearches.map(term => `
        <button class="switcher-pill" onclick="searchEngine.executeSearchTag('${term}')">
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 15"/></svg>
          ${term}
        </button>
      `).join('');
    }

    if (searchInput && searchResults) {
      let debounceTimer = null;

      searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        const term = e.target.value;

        debounceTimer = setTimeout(() => {
          if (!term.trim()) {
            searchResults.innerHTML = '';
            searchResults.style.display = 'none';
            return;
          }

          const results = this.query(term);
          this.renderLiveDropdown(results, term);
        }, 200);
      });

      // Handle Enter key submit
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const term = searchInput.value.trim();
          if (term) {
            this.saveRecentSearch(term);
            window.location.href = `search.html?q=${encodeURIComponent(term)}`;
          }
        }
      });
    }
  }

  executeSearchTag(term) {
    const searchInput = document.getElementById('search-modal-input');
    if (searchInput) {
      searchInput.value = term;
      searchInput.dispatchEvent(new Event('input'));
    }
  }

  renderLiveDropdown(results, term) {
    const searchResults = document.getElementById('search-live-results');
    if (!searchResults) return;

    searchResults.style.display = 'block';

    if (results.length === 0) {
      searchResults.innerHTML = `
        <div style="padding: var(--space-xl); text-align: center; color: var(--text-secondary);">
          <p style="font-weight: var(--fw-bold); margin-bottom: 0.25rem;">نتیجه‌ای برای «${term}» یافت نشد</p>
          <p style="font-size: var(--text-xs); color: var(--text-tertiary);">عبارت دیگری را امتحان کنید یا از دسته‌بندی‌ها بازدید فرمایید.</p>
        </div>
      `;
      return;
    }

    searchResults.innerHTML = `
      <div style="padding: var(--space-sm) var(--space-md); font-size: var(--text-xs); font-weight: var(--fw-bold); color: var(--text-tertiary); border-bottom: 1px solid var(--border-color);">
        ${results.length.toLocaleString('fa-IR')} محصول یافت شد
      </div>
      <div style="max-height: 360px; overflow-y: auto;">
        ${results.slice(0, 5).map(p => `
          <a href="product.html?id=${p.id}" class="flex items-center gap-md" style="padding: 0.75rem 1rem; border-bottom: 1px solid var(--border-color); transition: background-color var(--transition-fast);" onmouseover="this.style.backgroundColor='var(--bg-surface-subtle)'" onmouseout="this.style.backgroundColor='transparent'">
            <img src="${p.images[0]}" alt="${p.name}" style="width: 50px; height: 60px; object-fit: cover; border-radius: var(--radius-xs);">
            <div style="flex: 1;">
              <h5 style="font-size: var(--text-sm); font-weight: var(--fw-semibold); color: var(--text-primary); margin-bottom: 0.2rem;">${p.name}</h5>
              <div style="font-size: var(--text-xs); color: var(--text-tertiary);">${p.categoryName}</div>
            </div>
            <div style="font-weight: var(--fw-bold); font-size: var(--text-sm); color: var(--text-primary);">
              ${formatPrice(p.price)}
            </div>
          </a>
        `).join('')}
      </div>
      <div style="padding: 0.75rem; text-align: center; background: var(--bg-surface-subtle);">
        <a href="search.html?q=${encodeURIComponent(term)}" class="btn btn-outline btn-sm btn-block" onclick="searchEngine.saveRecentSearch('${term}')">
          مشاهده تمام نتایج (${results.length.toLocaleString('fa-IR')})
        </a>
      </div>
    `;
  }

  // Dedicated search.html page handler
  initPage() {
    const pageInput = document.getElementById('search-page-input');
    const pageGrid = document.getElementById('search-page-grid');
    const countEl = document.getElementById('search-page-count');
    const emptyEl = document.getElementById('search-page-empty');
    if (!pageGrid) return;

    const urlParams = new URLSearchParams(window.location.search);
    const initialQuery = urlParams.get('q') || '';

    if (pageInput) {
      pageInput.value = initialQuery;
      pageInput.addEventListener('input', (e) => {
        this.renderDedicatedResults(e.target.value);
      });
    }

    this.renderDedicatedResults(initialQuery);
  }

  renderDedicatedResults(query) {
    const pageGrid = document.getElementById('search-page-grid');
    const countEl = document.getElementById('search-page-count');
    const emptyEl = document.getElementById('search-page-empty');
    const titleEl = document.getElementById('search-page-title');
    if (!pageGrid) return;

    const results = query.trim() ? this.query(query) : this.products;

    if (titleEl) {
      titleEl.textContent = query.trim() ? `نتایج جستجو برای «${query}»` : 'جستجوی تمام محصولات کالکشن نُوا';
    }

    if (countEl) {
      countEl.textContent = `${results.length.toLocaleString('fa-IR')} محصول یافت شد`;
    }

    if (results.length === 0) {
      pageGrid.innerHTML = '';
      if (emptyEl) emptyEl.style.display = 'block';
      return;
    }

    if (emptyEl) emptyEl.style.display = 'none';
    pageGrid.innerHTML = results.map((p, idx) => renderProductCardHTML(p, false, idx + 1)).join('');

    if (window.novaWishlist) {
      window.novaWishlist.updateCardButtons();
    }
    if (window.initScrollReveal) {
      window.initScrollReveal();
    }
  }

  // ==========================================================================
  // Inline Header Search Bar
  // --------------------------------------------------------------------------
  // The header search is a real, long search bar. Typing shows a live results
  // dropdown directly beneath it — no modal and no navigation to another page.
  // Pressing Enter (or "view all results") opens the dedicated results page.
  // ==========================================================================
  initHeaderSearch() {
    const box = document.querySelector('.header-search-box');
    if (!box) return;
    if (box.dataset.searchWired === 'true') return; // idempotent
    const input = box.querySelector('.header-search-input');
    if (!input) return;
    box.dataset.searchWired = 'true';

    // The legacy markup opened the modal on focus/click; drop those handlers.
    input.removeAttribute('onclick');
    input.removeAttribute('onfocus');

    // One shared dropdown panel per bar.
    let panel = box.querySelector('.header-search-dropdown');
    if (!panel) {
      panel = document.createElement('div');
      panel.className = 'header-search-dropdown';
      box.appendChild(panel);
    }

    const hidePanel = () => {
      panel.classList.remove('active');
      panel.innerHTML = '';
    };

    let debounceTimer = null;
    input.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      const term = e.target.value;
      debounceTimer = setTimeout(() => {
        if (!term.trim()) { hidePanel(); return; }
        this.renderHeaderDropdown(this.query(term), term);
      }, 180);
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const term = input.value.trim();
        if (term) {
          this.saveRecentSearch(term);
          window.location.href = `search.html?q=${encodeURIComponent(term)}`;
        }
      } else if (e.key === 'Escape') {
        hidePanel();
        input.blur();
      }
    });

    // Close when clicking outside the search bar
    document.addEventListener('click', (e) => {
      if (!box.contains(e.target)) hidePanel();
    });
  }

  renderHeaderDropdown(results, term) {
    const panel = document.querySelector('.header-search-dropdown');
    if (!panel) return;
    panel.classList.add('active');

    if (results.length === 0) {
      panel.innerHTML = `
        <div class="header-search-empty">
          نتیجه‌ای برای «${term}» یافت نشد. عبارت دیگری را امتحان کنید.
        </div>`;
      return;
    }

    panel.innerHTML = `
      <div class="header-search-count">
        ${results.length.toLocaleString('fa-IR')} محصول یافت شد
      </div>
      <div class="header-search-list">
        ${results.slice(0, 5).map(p => `
          <a href="product.html?id=${p.id}" class="header-search-item">
            <img src="${p.images[0]}" alt="${p.name}">
            <div class="header-search-item-info">
              <h5>${p.name}</h5>
              <span>${p.categoryName}</span>
            </div>
            <div class="header-search-item-price">${formatPrice(p.price)}</div>
          </a>
        `).join('')}
      </div>
      <a href="search.html?q=${encodeURIComponent(term)}" class="header-search-all">
        مشاهده تمام نتایج (${results.length.toLocaleString('fa-IR')}) ←
      </a>`;
  }

  openModal() {
    const modal = document.getElementById('search-modal');
    const backdrop = document.getElementById('global-overlay');
    const input = document.getElementById('search-modal-input');
    if (modal && backdrop) {
      modal.classList.add('active');
      backdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (input) setTimeout(() => input.focus(), 100);
    } else {
      // Graceful fallback for pages without inline search modal
      window.location.href = 'search.html';
    }
  }

  closeModal() {
    const modal = document.getElementById('search-modal');
    const backdrop = document.getElementById('global-overlay');
    if (modal) modal.classList.remove('active');
    if (backdrop) backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }
}

const searchEngine = new SearchEngine();
window.searchEngine = searchEngine;

document.addEventListener('DOMContentLoaded', () => {
  searchEngine.initHeaderSearch();
  searchEngine.initModal();
  searchEngine.initPage();
});
