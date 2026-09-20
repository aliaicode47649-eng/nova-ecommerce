/**
 * NOVA — Catalog Filters, Sorters & View Modes
 * Manages category, price slider, colors, sizes, stock, sort dropdown, and grid/list toggles
 */

class CatalogFilterManager {
  constructor() {
    this.allProducts = getAllProducts();
    this.filteredProducts = [...this.allProducts];
    
    // Default Filter State
    this.state = {
      category: 'all',
      badge: 'all',
      collection: null,
      maxPrice: 8000000,
      minPrice: 0,
      colors: [],
      sizes: [],
      inStockOnly: false,
      sortBy: 'featured',
      viewMode: 'grid-4', // 'grid-4', 'grid-2', 'list'
      page: 1,
      perPage: 12
    };

    // Check URL parameters (e.g. ?category=fashion or ?badge=new or ?sort=... or ?collection=monochrome)
    this.readUrlParams();
  }

  readUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('category')) {
      this.state.category = urlParams.get('category');
    }
    if (urlParams.has('sort')) {
      this.state.sortBy = urlParams.get('sort');
    }
    if (urlParams.has('badge')) {
      this.state.badge = urlParams.get('badge');
    }
    if (urlParams.has('collection')) {
      this.state.collection = urlParams.get('collection');
    }
    if (urlParams.has('q')) {
      this.state.searchQuery = urlParams.get('q');
    } else if (urlParams.has('search')) {
      this.state.searchQuery = urlParams.get('search');
    }
  }

  init() {
    const grid = document.getElementById('shop-product-grid');
    if (grid && !grid.children.length && typeof renderSkeletonCardsHTML === 'function') {
      grid.innerHTML = renderSkeletonCardsHTML(6);
    }
    this.bindEvents();
    this.syncUIFromState();
    this.updatePageHeader();
    this.applyFilters();
  }

  updateUrl() {
    const params = new URLSearchParams();
    if (this.state.category && this.state.category !== 'all') {
      params.set('category', this.state.category);
    }
    if (this.state.badge && this.state.badge !== 'all') {
      params.set('badge', this.state.badge);
    }
    if (this.state.collection) {
      params.set('collection', this.state.collection);
    }
    if (this.state.sortBy && this.state.sortBy !== 'featured') {
      params.set('sort', this.state.sortBy);
    }
    if (this.state.searchQuery) {
      params.set('q', this.state.searchQuery);
    }
    const newQuery = params.toString() ? '?' + params.toString() : window.location.pathname;
    try {
      window.history.replaceState(null, '', newQuery);
    } catch (e) {}
  }

  updatePageHeader() {
    const titleEl = document.getElementById('shop-page-title');
    const descEl = document.getElementById('shop-page-desc');
    const breadcrumbEl = document.getElementById('shop-page-breadcrumb');
    if (!titleEl) return;

    const categoryTitles = {
      fashion: {
        title: 'کالکشن مد و پوشاک دست‌دوز',
        desc: 'پالتوها، بارانی‌ها و پوشاک مدرن دست‌دوز با الیاف طبیعی، کشمیر، ابریشم خام و لینن باوقار.',
        breadcrumb: 'مد و پوشاک'
      },
      accessories: {
        title: 'کالکشن اکسسوری و چرم لوکس',
        desc: 'کیف‌های دست‌دوز تمام‌چرم توسکانی، ساعت‌های مینیمال استیل و جزئیات دست‌چین با ظرافت بی‌بدیل.',
        breadcrumb: 'اکسسوری لوکس'
      },
      beauty: {
        title: 'کالکشن زیبایی، عطر نیش و مراقبت پوست',
        desc: 'عصاره‌های خالص روغنی و اکستریت د پرفیوم از گرس فرانسه در کنار اکسیرهای جوانساز پوست سوئیس.',
        breadcrumb: 'زیبایی و عطر نیش'
      },
      living: {
        title: 'کالکشن خانه، روشنایی و دکوراسیون مینیمال',
        desc: 'صندلی‌های ارگونومیک اسکاندیناوی، سرامیک‌های دست‌ساز ژاپنی و آثاری برای خلق هارمونی و آرامش در خانه.',
        breadcrumb: 'خانه و دکوراسیون'
      },
      tech: {
        title: 'کالکشن فناوری، صوت و ابزارهای مینیمال',
        desc: 'اسپیکرهای های-فای سرامیکی، هدفون‌های پیشرفته و تجهیزات مدرن برای شیوه زیستن مدرن شما.',
        breadcrumb: 'فناوری و ابزار'
      }
    };

    const badgeTitles = {
      hot: {
        title: 'پرفروش‌ترین و محبوب‌ترین آثار نُوا',
        desc: 'محصولاتی که بیشترین میزان رضایت و امتیاز را از همراهان وفادار استودیو نُوا کسب کرده‌اند.',
        breadcrumb: 'پرفروش‌ترین‌ها'
      },
      sale: {
        title: 'حراج اختصاصی و تخفیف‌های ویژه نُوا',
        desc: 'فرصت بی‌نظیر خرید آثار برگزیده با تخفیف شگفت‌انگیز و ارسال اکسپرس رایگان.',
        breadcrumb: 'تخفیف‌های ویژه'
      },
      new: {
        title: 'تازه‌ها و جدیدترین آثار کالکشن ۲۰۲۶',
        desc: 'رونمایی از جدیدترین دست‌ساخته‌های پاییز و زمستان با طراحی پیشرو و متریال‌های ناب جهان.',
        breadcrumb: 'کالکشن جدید'
      }
    };

    const collectionTitles = {
      monochrome: {
        title: 'کالکشن پاییزی مونوکروم نُوا (نسخه محدود)',
        desc: 'سایه‌روشن‌های استخوانی، زغالی و شنی. هارمونی بی‌پایان رنگ‌های خام زمین در تلاقی با مرغوب‌ترین الیاف کشمیر و پشم طبیعی.',
        breadcrumb: 'کالکشن مونوکروم'
      },
      artisan: {
        title: 'کالکشن اصیل دست‌ساز و دست‌دوز نُوا',
        desc: 'ساخته شده با اصالت، دقت و نیت. پیوند هنر استادکاران فلورانس، کانسای و گرس در مجموعه‌ای بی‌تکرار.',
        breadcrumb: 'کالکشن اصیل'
      }
    };

    let matched = null;
    if (this.state.collection && collectionTitles[this.state.collection]) {
      matched = collectionTitles[this.state.collection];
    } else if (this.state.category && this.state.category !== 'all' && categoryTitles[this.state.category]) {
      matched = categoryTitles[this.state.category];
    } else if (this.state.badge && this.state.badge !== 'all' && badgeTitles[this.state.badge]) {
      matched = badgeTitles[this.state.badge];
    }

    if (this.state.searchQuery) {
      titleEl.textContent = `نتایج جستجو برای «${this.state.searchQuery}»`;
      if (descEl) descEl.textContent = 'محصولات منطبق بر عبارت جستجوی شما در میان دست‌سازه‌ها و کالکشن‌های لوکس نُوا.';
      if (breadcrumbEl) breadcrumbEl.textContent = `جستجو: ${this.state.searchQuery}`;
      document.title = `نُوا — نتایج جستجو برای ${this.state.searchQuery}`;
    } else if (matched) {
      titleEl.textContent = matched.title;
      if (descEl) descEl.textContent = matched.desc;
      if (breadcrumbEl) breadcrumbEl.textContent = matched.breadcrumb;
      document.title = `نُوا — ${matched.title}`;
    } else {
      titleEl.textContent = 'فروشگاه آنلاین نُوا — تمامی محصولات';
      if (descEl) descEl.textContent = 'مجموعه‌ای دست‌چین از پوشاک دست‌دوز، اکسسوری‌های چرم ایتالیایی، عطر نیش، خانه و دکوراسیون مینیمال.';
      if (breadcrumbEl) breadcrumbEl.textContent = 'فروشگاه';
      document.title = 'فروشگاه نُوا — خرید آنلاین محصولات لوکس | NOVA';
    }
  }

  syncUIFromState() {
    // Sync Category Radio Buttons
    document.querySelectorAll('.filter-category-input').forEach(r => {
      r.checked = (r.value === this.state.category);
    });

    // Sync Badge Radio Buttons
    document.querySelectorAll('.filter-badge-input').forEach(r => {
      r.checked = (r.value === this.state.badge);
    });

    // Sync Sort Select Dropdown
    const sortSelect = document.getElementById('shop-sort-select');
    if (sortSelect) {
      sortSelect.value = this.state.sortBy;
    }

    // Sync Price Slider
    const priceSlider = document.getElementById('filter-price-slider');
    const priceDisplay = document.getElementById('filter-price-display');
    if (priceSlider) priceSlider.value = this.state.maxPrice;
    if (priceDisplay) priceDisplay.textContent = formatPrice(this.state.maxPrice);

    // Sync In Stock Checkbox
    const stockCheckbox = document.getElementById('filter-stock-only');
    if (stockCheckbox) stockCheckbox.checked = this.state.inStockOnly;

    // Sync Color and Size Swatches
    document.querySelectorAll('.filter-swatch-btn').forEach(btn => {
      const color = btn.getAttribute('data-color');
      btn.classList.toggle('active', this.state.colors.includes(color));
    });
    document.querySelectorAll('.filter-size-btn').forEach(btn => {
      const size = btn.getAttribute('data-size');
      btn.classList.toggle('active', this.state.sizes.includes(size));
    });
  }

  bindEvents() {
    // Category Checkboxes / Radios
    document.querySelectorAll('.filter-category-input').forEach(el => {
      el.addEventListener('change', (e) => {
        this.state.category = e.target.value;
        this.state.collection = null; // Clear special collection if explicit category chosen
        this.state.page = 1;
        this.updateUrl();
        this.updatePageHeader();
        this.applyFilters();
      });
    });

    // Badge Checkboxes / Radios
    document.querySelectorAll('.filter-badge-input').forEach(el => {
      el.addEventListener('change', (e) => {
        this.state.badge = e.target.value;
        this.state.page = 1;
        this.updateUrl();
        this.updatePageHeader();
        this.applyFilters();
      });
    });

    // Price Slider
    const priceSlider = document.getElementById('filter-price-slider');
    const priceDisplay = document.getElementById('filter-price-display');
    if (priceSlider && priceDisplay) {
      priceSlider.addEventListener('input', (e) => {
        this.state.maxPrice = parseInt(e.target.value, 10);
        priceDisplay.textContent = formatPrice(this.state.maxPrice);
        this.applyFilters();
      });
    }

    // Color Swatches
    document.querySelectorAll('.filter-swatch-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const color = btn.getAttribute('data-color');
        if (this.state.colors.includes(color)) {
          this.state.colors = this.state.colors.filter(c => c !== color);
          btn.classList.remove('active');
        } else {
          this.state.colors.push(color);
          btn.classList.add('active');
        }
        this.state.page = 1;
        this.applyFilters();
      });
    });

    // Size Buttons
    document.querySelectorAll('.filter-size-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const size = btn.getAttribute('data-size');
        if (this.state.sizes.includes(size)) {
          this.state.sizes = this.state.sizes.filter(s => s !== size);
          btn.classList.remove('active');
        } else {
          this.state.sizes.push(size);
          btn.classList.add('active');
        }
        this.state.page = 1;
        this.applyFilters();
      });
    });

    // In Stock Only Checkbox
    const stockCheckbox = document.getElementById('filter-stock-only');
    if (stockCheckbox) {
      stockCheckbox.addEventListener('change', (e) => {
        this.state.inStockOnly = e.target.checked;
        this.state.page = 1;
        this.applyFilters();
      });
    }

    // Sort Dropdown
    const sortSelect = document.getElementById('shop-sort-select');
    if (sortSelect) {
      sortSelect.value = this.state.sortBy;
      sortSelect.addEventListener('change', (e) => {
        this.state.sortBy = e.target.value;
        this.applySort();
        this.render();
      });
    }

    // View Mode Toggles
    document.querySelectorAll('.view-mode-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const mode = btn.getAttribute('data-mode');
        this.setViewMode(mode);
      });
    });

    // Reset Filters Button
    const resetBtn = document.getElementById('filter-reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => this.resetFilters());
    }

    // Mobile Sidebar Drawer Toggle
    const toggleSidebarBtn = document.getElementById('shop-sidebar-toggle');
    const closeSidebarBtn = document.getElementById('shop-sidebar-close');
    const sidebar = document.getElementById('shop-sidebar');
    const overlay = document.getElementById('global-overlay');

    if (toggleSidebarBtn && sidebar) {
      toggleSidebarBtn.addEventListener('click', () => {
        sidebar.classList.add('active');
        if (overlay) overlay.classList.add('active');
      });
    }

    if (closeSidebarBtn && sidebar) {
      closeSidebarBtn.addEventListener('click', () => {
        sidebar.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
      });
    }
  }

  applyFilters() {
    this.filteredProducts = this.allProducts.filter(product => {
      // Search query check (URL q= / search=)
      if (this.state.searchQuery) {
        const norm = (str) => String(str || '').toLowerCase().replace(/[\u200B-\u200D\uFEFF]/g, '').replace(/[\u200C]/g, ' ').replace(/[ي]/g, 'ی').replace(/[ك]/g, 'ک').replace(/[آأإ]/g, 'ا').replace(/[-_—]/g, ' ').trim();
        const normQ = norm(this.state.searchQuery);
        const normName = norm(product.name);
        const normTags = Array.isArray(product.tags) ? product.tags.map(t => norm(t)).join(' ') : '';
        const normDesc = norm(product.description);
        const normCat = norm(product.categoryName);
        const normBrand = norm(product.brandName);
        const tokens = normQ.split(' ').filter(t => t.length > 0);
        const match = tokens.every(t => normName.includes(t) || normTags.includes(t) || normBrand.includes(t) || normCat.includes(t) || normDesc.includes(t));
        if (!match) return false;
      }

      // Collection check
      if (this.state.collection) {
        if (this.state.collection === 'monochrome') {
          const monochromeIds = ['nova-01', 'nova-02', 'nova-04', 'nova-07', 'nova-09', 'nova-10', 'nova-15', 'nova-18'];
          if (!monochromeIds.includes(product.id) && product.category !== 'fashion') {
            return false;
          }
        } else if (this.state.collection === 'artisan') {
          const desc = (product.description || '') + ' ' + (product.name || '');
          const isArtisan = desc.includes('دست‌') || desc.includes('طبیعی') || desc.includes('اصیل') || desc.includes('چرم') || desc.includes('پشم');
          if (!isArtisan) {
            return false;
          }
        }
      }

      // Category check
      if (this.state.category !== 'all' && product.category !== this.state.category) {
        return false;
      }
      // Badge check (new, hot, sale, etc.)
      if (this.state.badge && this.state.badge !== 'all') {
        if (product.badgeType !== this.state.badge) {
          return false;
        }
      }
      // Price check
      if (product.price > this.state.maxPrice) {
        return false;
      }
      // Stock check
      if (this.state.inStockOnly && product.stock <= 0) {
        return false;
      }
      // Colors check
      if (this.state.colors.length > 0) {
        const productColors = (product.colors || []).map(c => c.name);
        const match = this.state.colors.some(c => productColors.includes(c));
        if (!match) return false;
      }
      // Sizes check
      if (this.state.sizes.length > 0) {
        const productSizes = product.sizes || [];
        const match = this.state.sizes.some(s => productSizes.includes(s));
        if (!match) return false;
      }
      return true;
    });

    this.applySort();
    this.render();
    this.renderActiveFilterChips();
  }

  applySort() {
    switch (this.state.sortBy) {
      case 'price-asc':
        this.filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        this.filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        this.filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'name-asc':
        this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name, 'fa'));
        break;
      case 'featured':
      default:
        // Default list order
        break;
    }
  }

  setViewMode(mode) {
    this.state.viewMode = mode;
    document.querySelectorAll('.view-mode-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-mode') === mode);
    });

    const grid = document.getElementById('shop-product-grid');
    if (!grid) return;

    grid.className = '';
    if (mode === 'grid-4') {
      grid.className = 'product-grid-4';
    } else if (mode === 'grid-2') {
      grid.className = 'product-grid-2';
    } else if (mode === 'list') {
      grid.className = 'flex flex-col gap-lg';
    }

    this.render();
  }

  resetFilters() {
    this.state.category = 'all';
    this.state.badge = 'all';
    this.state.collection = null;
    this.state.maxPrice = 8000000;
    this.state.colors = [];
    this.state.sizes = [];
    this.state.inStockOnly = false;
    this.state.sortBy = 'featured';

    this.updateUrl();
    this.updatePageHeader();
    this.syncUIFromState();
    this.applyFilters();
  }

  renderActiveFilterChips() {
    const container = document.getElementById('active-filters-chips');
    if (!container) return;

    let chipsHtml = '';

    if (this.state.collection) {
      const colLabels = {
        'monochrome': 'کالکشن پاییزی مونوکروم',
        'artisan': 'کالکشن اصیل دست‌دوز'
      };
      const label = colLabels[this.state.collection] || this.state.collection;
      chipsHtml += `<span class="switcher-pill" style="background: var(--accent); color: #fff; font-weight: bold;">کالکشن: ${label} <span onclick="catalogFilters.removeCollectionFilter()" style="cursor:pointer; margin-inline-start:6px;">×</span></span>`;
    }

    if (this.state.category !== 'all') {
      const catObj = this.allProducts.find(p => p.category === this.state.category);
      const name = catObj ? catObj.categoryName : this.state.category;
      chipsHtml += `<span class="switcher-pill">دسته‌بندی: ${name} <span onclick="catalogFilters.removeCategoryFilter()" style="cursor:pointer; margin-inline-start:4px;">×</span></span>`;
    }

    if (this.state.badge && this.state.badge !== 'all') {
      const badgeLabels = {
        'new': 'تازه‌ها و کالکشن جدید',
        'hot': 'پرفروش‌ترین‌ها',
        'sale': 'تخفیف ویژه / حراج'
      };
      const label = badgeLabels[this.state.badge] || this.state.badge;
      chipsHtml += `<span class="switcher-pill">برچسب: ${label} <span onclick="catalogFilters.removeBadgeFilter()" style="cursor:pointer; margin-inline-start:4px;" title="حذف فیلتر">×</span></span>`;
    }

    if (this.state.maxPrice < 8000000) {
      chipsHtml += `<span class="switcher-pill">حداکثر ${formatPrice(this.state.maxPrice)} <span onclick="catalogFilters.removePriceFilter()" style="cursor:pointer; margin-inline-start:4px;">×</span></span>`;
    }

    this.state.colors.forEach(col => {
      chipsHtml += `<span class="switcher-pill">رنگ: ${col} <span onclick="catalogFilters.removeColorFilter('${col}')" style="cursor:pointer; margin-inline-start:4px;">×</span></span>`;
    });

    this.state.sizes.forEach(sz => {
      chipsHtml += `<span class="switcher-pill">سایز: ${sz} <span onclick="catalogFilters.removeSizeFilter('${sz}')" style="cursor:pointer; margin-inline-start:4px;">×</span></span>`;
    });

    if (this.state.inStockOnly) {
      chipsHtml += `<span class="switcher-pill">فقط کالاهای موجود <span onclick="catalogFilters.removeStockFilter()" style="cursor:pointer; margin-inline-start:4px;">×</span></span>`;
    }

    container.innerHTML = chipsHtml;
  }

  removeCollectionFilter() {
    this.state.collection = null;
    this.updateUrl();
    this.updatePageHeader();
    this.applyFilters();
  }

  removeCategoryFilter() {
    this.state.category = 'all';
    this.updateUrl();
    this.updatePageHeader();
    this.syncUIFromState();
    this.applyFilters();
  }

  removeBadgeFilter() {
    this.state.badge = 'all';
    this.updateUrl();
    this.updatePageHeader();
    this.syncUIFromState();
    this.applyFilters();
  }

  removePriceFilter() {
    this.state.maxPrice = 8000000;
    const priceSlider = document.getElementById('filter-price-slider');
    const priceDisplay = document.getElementById('filter-price-display');
    if (priceSlider) priceSlider.value = 8000000;
    if (priceDisplay) priceDisplay.textContent = formatPrice(8000000);
    this.applyFilters();
  }

  removeColorFilter(col) {
    this.state.colors = this.state.colors.filter(c => c !== col);
    document.querySelectorAll(`.filter-swatch-btn[data-color="${col}"]`).forEach(b => b.classList.remove('active'));
    this.applyFilters();
  }

  removeSizeFilter(sz) {
    this.state.sizes = this.state.sizes.filter(s => s !== sz);
    document.querySelectorAll(`.filter-size-btn[data-size="${sz}"]`).forEach(b => b.classList.remove('active'));
    this.applyFilters();
  }

  removeStockFilter() {
    this.state.inStockOnly = false;
    const chk = document.getElementById('filter-stock-only');
    if (chk) chk.checked = false;
    this.applyFilters();
  }

  render() {
    const grid = document.getElementById('shop-product-grid');
    const countEl = document.getElementById('shop-results-count');
    const emptyEl = document.getElementById('shop-empty-state');
    if (!grid) return;

    if (countEl) {
      countEl.textContent = `نمایش ${this.filteredProducts.length.toLocaleString('fa-IR')} از ${this.allProducts.length.toLocaleString('fa-IR')} محصول`;
    }

    if (this.filteredProducts.length === 0) {
      grid.innerHTML = '';
      if (emptyEl) emptyEl.style.display = 'block';
      return;
    }

    if (emptyEl) emptyEl.style.display = 'none';

    const isList = this.state.viewMode === 'list';

    grid.innerHTML = this.filteredProducts.map((p, idx) => {
      if (typeof window.renderProductCardHTML === 'function') {
        return window.renderProductCardHTML(p, isList, idx + 1);
      }
      return renderProductCardHTML(p, isList, idx + 1);
    }).join('');

    // Update wishlist active states on new cards
    if (window.novaWishlist) {
      window.novaWishlist.updateCardButtons();
    }
    if (window.initScrollReveal) {
      window.initScrollReveal();
    }
  }
}

// Global helper to render a uniform product card
function renderProductCardHTML(p, isList = false, index = 0) {
  if (typeof window.renderProductCardHTML === 'function' && window.renderProductCardHTML !== renderProductCardHTML) {
    return window.renderProductCardHTML(p, isList, index);
  }
  const isWishlisted = window.novaWishlist && window.novaWishlist.has(p.id);
  const badgeClass = p.badgeType ? `badge-${p.badgeType}` : 'badge-new';
  const delayClass = index > 0 ? `delay-${((index - 1) % 5) + 1}` : '';

  return `
    <article class="product-card ${isList ? 'list-view' : ''} reveal-fade-up ${delayClass}" id="card-${p.id}">
      <div class="product-card-media">
        <a href="product.html?id=${p.id}" style="display:block; width:100%; height:100%;">
          <img src="${p.images[0]}" alt="${p.name}" class="product-card-img primary img-blur-up" width="600" height="800" loading="lazy" onload="this.classList.add('is-loaded')">
          ${p.images[1] ? `<img src="${p.images[1]}" alt="${p.name}" class="product-card-img secondary img-blur-up" width="600" height="800" loading="lazy" onload="this.classList.add('is-loaded')">` : ''}
        </a>

        ${p.badge ? `
          <div class="product-card-badges">
            <span class="badge ${badgeClass}">${p.badge}</span>
          </div>
        ` : ''}

        <div class="product-card-actions">
          <button class="card-action-btn ${isWishlisted ? 'active' : ''}" data-wishlist-id="${p.id}" onclick="novaWishlist.toggle('${p.id}')" title="علاقه‌مندی">
            <svg viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
          </button>
          <button class="card-action-btn" onclick="novaCompare.toggle('${p.id}')" title="مقایسه">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
          </button>
          <button class="card-action-btn" onclick="openQuickView('${p.id}')" title="مشاهده سریع">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
          </button>
        </div>

        <div class="product-card-quick-add">
          <button class="btn btn-primary btn-sm btn-block" onclick="novaCart.addItem('${p.id}', 1)">
            افزودن سریع به سبد
          </button>
        </div>
      </div>

      <div class="product-card-body">
        <span class="product-card-category">${p.categoryName}</span>
        <a href="product.html?id=${p.id}" class="product-card-title">${p.name}</a>
        
        <div class="product-card-rating">
          <span>★</span>
          <span>${p.rating.toLocaleString('fa-IR')}</span>
          <span class="rating-count">(${p.reviews.toLocaleString('fa-IR')})</span>
        </div>

        <div class="product-card-price">
          <span class="current-price">${formatPrice(p.price)}</span>
          ${p.oldPrice ? `<span class="old-price">${formatPrice(p.oldPrice)}</span>` : ''}
        </div>

        ${p.colors && p.colors.length > 1 ? `
          <div class="product-card-colors">
            ${p.colors.map(c => `
              <span class="color-swatch-dot" style="background-color: ${c.hex};" title="${c.name}"></span>
            `).join('')}
          </div>
        ` : ''}
      </div>
    </article>
  `;
}

// Catalog filter instance
let catalogFilters = null;
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('shop-product-grid')) {
    catalogFilters = new CatalogFilterManager();
    catalogFilters.init();
    window.catalogFilters = catalogFilters;
  }
});
