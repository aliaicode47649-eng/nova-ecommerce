/**
 * NOVA — Promotional, Interactive & Gamification Engine
 * Handles rotating announcement bar, live countdown, social proof toasts,
 * spin-to-win wheel, exit-intent modal, and animated counters.
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initAnnouncementSlider();
  initFlashDealsCountdown();
  initAnimatedCounters();
  initSocialProofPopups();
  initFloatingContactHub();
  initSpinToWinWheel();
  initExitIntentModal();
  initSlidingTabShowcase();
  initProductLiveViewers();
});

// ==========================================================================
// 1. Lightweight Scroll Reveal (Intersection Observer)
// ==========================================================================
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-fade-up, .reveal-fade-in, .reveal-scale-in, .reveal-slide-right, .reveal-slide-left');
  if (!elements.length) return;

  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    elements.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => {
    if (!el.classList.contains('is-revealed')) {
      observer.observe(el);
    }
  });
}
window.initScrollReveal = initScrollReveal;

// ==========================================================================
// 2. Rotating Multi-Message Announcement Bar
// ==========================================================================
function initAnnouncementSlider() {
  const slider = document.getElementById('announcement-slider');
  if (!slider) return;

  const messages = slider.querySelectorAll('.announcement-msg');
  if (messages.length <= 1) return;

  let currentIndex = 0;
  let timer = null;

  function showNext() {
    messages[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % messages.length;
    messages[currentIndex].classList.add('active');
  }

  function start() {
    if (timer) clearInterval(timer); // prevent duplicate intervals on re-entry
    timer = setInterval(showNext, 4000);
  }

  function stop() {
    clearInterval(timer);
    timer = null;
  }

  start();
  slider.addEventListener('mouseenter', stop);
  slider.addEventListener('mouseleave', start);
}

// ==========================================================================
// 3. Live Flash Deals Countdown Timer
// ==========================================================================
function initFlashDealsCountdown() {
  const hoursEl = document.getElementById('deal-countdown-hours');
  const minsEl = document.getElementById('deal-countdown-mins');
  const secsEl = document.getElementById('deal-countdown-secs');
  if (!hoursEl || !minsEl || !secsEl) return;

  // Persist countdown target in localStorage so refresh doesn't reset the timer
  const DEAL_KEY = 'nova_deal_countdown_target';
  let target;
  try {
    const saved = localStorage.getItem(DEAL_KEY);
    const savedTime = saved ? new Date(parseInt(saved, 10)) : null;
    if (savedTime && savedTime > new Date()) {
      target = savedTime;
    } else {
      target = new Date();
      target.setHours(target.getHours() + 11);
      target.setMinutes(42);
      target.setSeconds(18);
      localStorage.setItem(DEAL_KEY, target.getTime().toString());
    }
  } catch (e) {
    target = new Date();
    target.setHours(target.getHours() + 11);
  }

  function update() {
    const now = new Date();
    const diff = Math.max(0, target - now);

    const h = Math.floor(diff / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    hoursEl.textContent = h.toString().padStart(2, '0').toLocaleString('fa-IR');
    minsEl.textContent = m.toString().padStart(2, '0').toLocaleString('fa-IR');
    secsEl.textContent = s.toString().padStart(2, '0').toLocaleString('fa-IR');
  }

  update();
  setInterval(update, 1000);
}

// ==========================================================================
// 4. Animated Statistical Counters
// ==========================================================================
function initAnimatedCounters() {
  const counterEls = document.querySelectorAll('[data-counter-target]');
  if (!counterEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  counterEls.forEach(el => observer.observe(el));

  function animateCounter(el) {
    const target = parseFloat(el.getAttribute('data-counter-target'));
    const isFloat = el.getAttribute('data-counter-float') === 'true';
    const prefix = el.getAttribute('data-counter-prefix') || '';
    const suffix = el.getAttribute('data-counter-suffix') || '';
    const duration = 1800;
    const start = performance.now();

    function step(now) {
      const progress = Math.min(1, (now - start) / duration);
      // FIX: Use easeOut curve for smooth deceleration (was using raw linear 'progress')
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = easeOut * target;

      const formatted = isFloat ? current.toFixed(1) : Math.floor(current).toLocaleString('fa-IR');
      el.textContent = `${prefix}${formatted}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        const finalVal = isFloat ? target.toFixed(1) : target.toLocaleString('fa-IR');
        el.textContent = `${prefix}${finalVal}${suffix}`;
      }
    }

    requestAnimationFrame(step);
  }
}

// ==========================================================================
// 5. Live Social Proof Toast Notification (Mock Purchases)
// ==========================================================================
function initSocialProofPopups() {
  // Mock recent customer orders (for conversion demonstration)
  const mockPurchases = [
    { name: 'فاطمه از تهران', product: 'پالتو پشمی دست‌دوز نُوا', time: '۲ دقیقه پیش', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&q=80' },
    { name: 'امیرعلی از اصفهان', product: 'کیف تمام‌چرم توسکانی', time: '۴ دقیقه پیش', img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=120&q=80' },
    { name: 'شیدا از شیراز', product: 'ساعت استیل مینیمال نُوا', time: '۷ دقیقه پیش', img: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=120&q=80' },
    { name: 'نیما از تبریز', product: 'عطر نیش صندل و عنبر', time: '۱۱ دقیقه پیش', img: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=120&q=80' },
    { name: 'روژان از مشهد', product: 'صندلی مدرن استراحت', time: '۱۵ دقیقه پیش', img: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=120&q=80' }
  ];

  let container = document.getElementById('social-proof-popup');
  if (!container) {
    container = document.createElement('div');
    container.id = 'social-proof-popup';
    container.className = 'social-proof-popup';
    document.body.appendChild(container);
  }

  let index = 0;
  let isPaused = false;

  function showPurchase() {
    if (isPaused) return;
    const p = mockPurchases[index];
    index = (index + 1) % mockPurchases.length;

    container.innerHTML = `
      <img src="${p.img}" alt="${p.product}" class="social-proof-img">
      <div>
        <div class="social-proof-text">
          <strong>${p.name}</strong> همین الان <strong>«${p.product}»</strong> را سفارش داد.
        </div>
        <span class="social-proof-time">${p.time} • خرید تایید شده</span>
      </div>
      <button class="social-proof-close" onclick="closeSocialProof()" title="بستن">✕</button>
    `;

    container.classList.add('visible');

    setTimeout(() => {
      container.classList.remove('visible');
    }, 5500);
  }

  container.addEventListener('mouseenter', () => isPaused = true);
  container.addEventListener('mouseleave', () => isPaused = false);

  window.closeSocialProof = () => {
    container.classList.remove('visible');
    isPaused = true;
    setTimeout(() => isPaused = false, 30000); // pause for 30s after close
  };

  // Trigger initial notification after 5 seconds, then every 16 seconds
  setTimeout(showPurchase, 5000);
  setInterval(showPurchase, 16000);
}

// ==========================================================================
// 6. Floating Contact & Social Hub
// ==========================================================================
function initFloatingContactHub() {
  let hub = document.getElementById('floating-contact-hub');
  if (!hub) {
    hub = document.createElement('div');
    hub.id = 'floating-contact-hub';
    hub.className = 'floating-contact-hub';
    hub.innerHTML = `
      <button class="floating-trigger-btn" onclick="toggleFloatingContact()" title="ارتباط با پشتیبانی و شبکه‌ها">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
      </button>

      <div class="floating-menu-items">
        <a href="https://t.me/" target="_blank" rel="noopener" class="floating-sub-btn" style="color: #229ED9;">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>
          کانال تلگرام نُوا
        </a>
        <a href="https://wa.me/" target="_blank" rel="noopener" class="floating-sub-btn" style="color: #25D366;">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2z"/></svg>
          مشاوره واتساپ VIP
        </a>
        <a href="https://instagram.com/" target="_blank" rel="noopener" class="floating-sub-btn" style="color: #DD2A7B;">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          اینستاگرام استودیو
        </a>
        <a href="tel:02122003344" class="floating-sub-btn" style="color: var(--accent);">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          تماس تلفنی مستقیم
        </a>
      </div>
    `;
    document.body.appendChild(hub);
  }

  window.toggleFloatingContact = () => {
    hub.classList.toggle('active');
  };
}

// ==========================================================================
// 7. Spin-to-Win Gamification Discount Wheel
// ==========================================================================
function initSpinToWinWheel() {
  const HAS_SPUN_KEY = 'nova_wheel_spun_v1';
  let hasSpun = false;
  try {
    hasSpun = localStorage.getItem(HAS_SPUN_KEY) === 'true';
  } catch (e) {}

  let modal = document.getElementById('spin-wheel-overlay');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'spin-wheel-overlay';
    modal.className = 'spin-wheel-overlay';
    modal.innerHTML = `
      <div class="spin-wheel-card">
        <button class="modal-close-btn" onclick="closeSpinWheel()" style="top: 1rem; inset-inline-end: 1rem;">✕</button>
        <span class="section-tag" style="margin-bottom: 0.25rem;">گیمیفیکیشن نُوا</span>
        <h3 style="font-size: var(--text-xl); font-weight: bold;">گردونه شانس خرید اختصاصی</h3>
        <p style="font-size: var(--text-xs); color: var(--text-secondary); margin-top: 0.25rem;">
          گردونه را بچرخانید و کد تخفیف شانس خود را دریافت نمایید!
        </p>

        <div class="wheel-graphic-wrapper">
          <div class="wheel-pointer"></div>
          <canvas id="wheel-canvas" class="wheel-canvas" width="300" height="300"></canvas>
        </div>

        <button id="spin-wheel-btn" class="btn btn-primary btn-block btn-shine" onclick="executeWheelSpin()">
          چرخاندن گردونه شانس
        </button>

        <div id="wheel-result-msg" style="display: none; margin-top: 1rem; padding: 0.75rem; background: var(--bg-surface-subtle); border-radius: var(--radius-xs); font-size: var(--text-sm); font-weight: bold; color: var(--accent);"></div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  // Draw slices on canvas
  const canvas = document.getElementById('wheel-canvas');
  if (canvas) {
    drawWheelCanvas(canvas);
  }

  window.openSpinWheel = () => {
    modal.classList.add('active');
  };

  window.closeSpinWheel = () => {
    modal.classList.remove('active');
  };

  let isSpinning = false;
  window.executeWheelSpin = () => {
    if (isSpinning) return;
    isSpinning = true;
    const btn = document.getElementById('spin-wheel-btn');
    if (btn) btn.disabled = true;

    const spins = 5;
    const targetSlice = 2; // VIP20 - 20% discount
    const degreesPerSlice = 360 / 6;
    const targetDeg = (spins * 360) + (targetSlice * degreesPerSlice) + (degreesPerSlice / 2);

    canvas.style.transform = `rotate(${targetDeg}deg)`;

    setTimeout(() => {
      isSpinning = false;
      try { localStorage.setItem(HAS_SPUN_KEY, 'true'); } catch (e) {}

      const resEl = document.getElementById('wheel-result-msg');
      if (resEl) {
        resEl.innerHTML = '🎉 تبریک! شما برنده ۲۰٪ تخفیف با کد <strong>VIP20</strong> شدید!';
        resEl.style.display = 'block';
      }

      if (window.showToast) {
        showToast('کد تخفیف ۲۰٪ ویژه نُوا با موفقیت به شما اختصاص یافت!', 'success');
      }

      // Auto copy or save
      if (window.novaCart) {
        window.novaCart.applyCouponCode('VIP20');
      }
    }, 4200);
  };

  // Show wheel automatically after 12s on first visit if not spun
  if (!hasSpun && window.location.pathname.endsWith('index.html')) {
    setTimeout(() => {
      openSpinWheel();
    }, 12000);
  }
}

function drawWheelCanvas(canvas) {
  const ctx = canvas.getContext('2d');
  const slices = [
    { label: '۱۰٪ تخفیف', bg: '#B08D57' },
    { label: 'ارسال رایگان', bg: '#245A66' },
    { label: '۲۰٪ تخفیف VIP', bg: '#C85A48' },
    { label: '۱۵٪ تخفیف', bg: '#6C4A8D' },
    { label: 'هدیه خرید', bg: '#B08D57' },
    { label: '۵٪ تخفیف', bg: '#245A66' }
  ];

  const total = slices.length;
  const arc = (2 * Math.PI) / total;
  const radius = canvas.width / 2;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  slices.forEach((slice, i) => {
    const angle = i * arc;
    ctx.beginPath();
    ctx.fillStyle = slice.bg;
    ctx.moveTo(radius, radius);
    ctx.arc(radius, radius, radius, angle, angle + arc);
    ctx.lineTo(radius, radius);
    ctx.fill();
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Text
    ctx.save();
    ctx.translate(radius, radius);
    ctx.rotate(angle + arc / 2);
    ctx.textAlign = 'right';
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 12px Vazirmatn, sans-serif';
    ctx.fillText(slice.label, radius - 24, 4);
    ctx.restore();
  });

  // Center Gold Pin
  ctx.beginPath();
  ctx.arc(radius, radius, 18, 0, 2 * Math.PI);
  ctx.fillStyle = '#111111';
  ctx.fill();
  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 3;
  ctx.stroke();
}

// ==========================================================================
// 8. Exit-Intent Newsletter Discount Modal
// ==========================================================================
function initExitIntentModal() {
  let shown = false;
  try {
    shown = sessionStorage.getItem('nova_exit_modal_shown') === 'true';
  } catch (e) {}
  if (shown) return;

  let modal = document.getElementById('exit-intent-overlay');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'exit-intent-overlay';
    modal.className = 'spin-wheel-overlay';
    modal.innerHTML = `
      <div class="spin-wheel-card" style="max-width: 440px;">
        <button class="modal-close-btn" onclick="closeExitIntent()" style="top: 1rem; inset-inline-end: 1rem;">✕</button>
        <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">✨</div>
        <span class="section-tag">پیشنهاد پیش از رفتن</span>
        <h3 style="font-size: var(--text-xl); font-weight: bold; margin-top: 0.25rem;">قبل از رفتن، هدیه خود را تحویل بگیرید!</h3>
        <p style="font-size: var(--text-xs); color: var(--text-secondary); margin-top: 0.5rem; line-height: 1.6;">
          با ثبت ایمیل خود، کد تخفیف فوری <strong>NOVA10</strong> و دسترسی زودهنگام به حراج‌های خصوصی را هدیه بگیرید.
        </p>

        <form class="newsletter-form" style="margin-top: 1.5rem; display: flex; flex-direction: column; gap: 0.75rem;" onsubmit="handleExitIntentSubmit(event)">
          <input type="text" class="form-input" placeholder="شماره موبایل یا ایمیل شما (مثال: 0912... یا info@domain.com)" required style="height: 48px; padding-inline: 1.25rem; font-size: 0.95rem; border-radius: var(--radius-sm); border: 1.5px solid var(--border-color); background: var(--bg-surface-elevated); color: var(--text-primary); text-align: start;">
          <button type="submit" class="btn btn-primary btn-block btn-shine" style="height: 48px; font-size: var(--text-sm); font-weight: bold;">دریافت کد تخفیف ۱۰٪ نُوا</button>
        </form>
      </div>
    `;
    document.body.appendChild(modal);
  }

  window.closeExitIntent = () => {
    modal.classList.remove('active');
  };

  window.handleExitIntentSubmit = (e) => {
    e.preventDefault();
    if (window.showToast) {
      showToast('کد تخفیف NOVA10 برای شما فعال شد!', 'success');
    }
    closeExitIntent();
  };

  // Detect mouse leaving window at the top on desktop
  document.addEventListener('mouseleave', (e) => {
    if (e.clientY <= 5 && !shown) {
      shown = true;
      try { sessionStorage.setItem('nova_exit_modal_shown', 'true'); } catch (err) {}
      modal.classList.add('active');
    }
  });
}

// ==========================================================================
// 9. Interactive Tabbed Product Showcase
// ==========================================================================
function initSlidingTabShowcase() {
  const nav = document.getElementById('featured-tabs-nav');
  const indicator = document.getElementById('featured-tab-indicator');
  const grid = document.getElementById('home-featured-grid');
  if (!nav || !indicator || !grid) return;

  const buttons = nav.querySelectorAll('.tab-slider-btn');

  function updateIndicator(btn) {
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    indicator.style.width = `${btn.offsetWidth}px`;
    indicator.style.left = `${btn.offsetLeft}px`;
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      updateIndicator(btn);
      const filterType = btn.getAttribute('data-filter');
      const all = getAllProducts();
      let filtered = [];

      if (filterType === 'all') {
        filtered = all.slice(0, 4);
      } else if (filterType === 'hot') {
        filtered = all.filter(p => p.badgeType === 'hot' || p.rating >= 4.8).slice(0, 4);
      } else if (filterType === 'sale') {
        filtered = all.filter(p => p.oldPrice || p.badgeType === 'sale').slice(0, 4);
      } else if (filterType === 'new') {
        filtered = all.filter(p => p.badgeType === 'new').slice(0, 4);
      }

      grid.innerHTML = filtered.map((p, idx) => renderProductCardHTML(p, false, idx + 1)).join('');
      if (window.novaWishlist) window.novaWishlist.updateCardButtons();
      if (window.initScrollReveal) window.initScrollReveal();
    });
  });

  // Init indicator position
  if (buttons[0]) {
    setTimeout(() => updateIndicator(buttons[0]), 50);
  }
}

// ==========================================================================
// 10. Live Viewing Counter (product.html)
// ==========================================================================
function initProductLiveViewers() {
  const el = document.getElementById('product-live-viewers-count');
  if (!el) return;

  // Random realistic viewer fluctuation
  let viewers = Math.floor(Math.random() * 9) + 12; // 12 to 20
  el.textContent = viewers.toLocaleString('fa-IR');

  setInterval(() => {
    const delta = Math.random() > 0.5 ? 1 : -1;
    viewers = Math.max(8, Math.min(26, viewers + delta));
    el.textContent = viewers.toLocaleString('fa-IR');
  }, 6000);
}
