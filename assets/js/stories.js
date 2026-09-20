/**
 * NOVA E-Commerce — Interactive Instagram-Style Stories Engine
 * High-performance, touch-friendly Story Player with segmented progress bars,
 * pause on hold, slide & story navigation, interactive CTAs, and heart reactions.
 */

(function () {
  'use strict';

  // 1. Stories Data Definition
  const storiesData = [
    {
      id: 'deals',
      title: 'حراج ویژه',
      subtitle: 'پیشنهادات شگفت‌انگیز نُوا',
      avatar: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=150&q=80',
      badge: '🔥 شگفت‌انگیز',
      timeAgo: '۱ ساعت پیش',
      slides: [
        {
          image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=85',
          tag: '🔥 تا ۴۰٪ تخفیف فصل',
          title: 'پالتو و بارانی لوکس زمستانه',
          description: 'طراحی اختصاصی با پارچه‌های پشمی درجه یک ایتالیایی و دوخت دقیق دستی.',
          price: 'از ۲,۴۵۰,۰۰۰ تومان',
          ctaText: 'مشاهده حراج شگفت‌انگیز ↗',
          ctaLink: '#flash-deals',
          ctaAction: null
        },
        {
          image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85',
          tag: '⚡ تخفیف شگفت‌انگیز ۲۴ ساعته',
          title: 'کیف دوشی چرم دست‌دوز ناپولی',
          description: 'تعداد محدود باقی‌مانده در انبار مرکزی — آماده ارسال فوری با بسته‌بندی ویژه.',
          price: '۳,۲۰۰,۰۰۰ تومان (۳۰٪ تخفیف)',
          ctaText: 'خرید فوری با تخفیف ↗',
          ctaLink: 'shop.html?category=accessories',
          ctaAction: null
        }
      ]
    },
    {
      id: 'spin',
      title: 'گردونه شانس',
      subtitle: 'جوایز و کدهای تخفیف روزانه',
      avatar: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=150&q=80',
      avatarIcon: '🎡',
      badge: 'تخفیف',
      timeAgo: 'به‌روزرسانی امروز',
      slides: [
        {
          image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=900&q=85',
          tag: '🎁 جایزه ویژه اعضا',
          title: 'گردونه شانس طلایی نُوا',
          description: 'همین حالا گردونه را بچرخانید و برنده تا ۵۰٪ تخفیف نقدی و ارسال رایگان سفارش شوید!',
          price: '۱۰۰٪ برنده — بدون قرعه‌کشی',
          ctaText: 'همین حالا بچرخان! 🎡',
          ctaLink: 'javascript:void(0)',
          ctaAction: 'spinWheel'
        }
      ]
    },
    {
      id: 'fashion',
      title: 'مد و پوشاک',
      subtitle: 'کالکشن برگزیده ۲۰۲۶',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80',
      badge: 'جدید',
      timeAgo: '۲ ساعت پیش',
      slides: [
        {
          image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=900&q=85',
          tag: '✨ ترند بهار و تابستان ۲۰۲۶',
          title: 'کالکشن مینیمال پشمی و کشمیری',
          description: 'استایلی آرام، مینیمال و فاخر که برای شیوه زیستن مدرن شما خلق شده است.',
          price: 'کالکشن جدید نُوا',
          ctaText: 'مشاهده تمام محصولات پوشاک ↗',
          ctaLink: 'shop.html?category=fashion',
          ctaAction: null
        },
        {
          image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=85',
          tag: '🌿 الیاف پایدار و طبیعی',
          title: 'کت و شلوار اورسایز کتان خالص',
          description: 'تنفس‌پذیری فوق‌العاده با تن‌خور آزاد و دوخت سفارشی برای راحتی تمام‌روز.',
          price: '۴,۸۰۰,۰۰۰ تومان',
          ctaText: 'خرید این ست در فروشگاه ↗',
          ctaLink: 'shop.html?category=fashion',
          ctaAction: null
        }
      ]
    },
    {
      id: 'accessories',
      title: 'اکسسوری لوکس',
      subtitle: 'دست‌سازه‌های چرم و متال',
      avatar: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=150&q=80',
      badge: 'دست‌چین',
      timeAgo: '۴ ساعت پیش',
      slides: [
        {
          image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=85',
          tag: '💎 چرم طبیعی توسکانی ایتالیا',
          title: 'اکسسوری و کیف‌های پول دست‌دوز',
          description: 'هر قطعه با دقت و توسط استادکاران چرم با لبه‌های رنگ‌شده دستی تولید شده است.',
          price: 'از ۱,۴۹۰,۰۰۰ تومان',
          ctaText: 'مشاهده کالکشن اکسسوری ↗',
          ctaLink: 'shop.html?category=accessories',
          ctaAction: null
        },
        {
          image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85',
          tag: '⌚ طراحی مینیمال و ضدآب',
          title: 'ساعت مچی کرونوگراف نُوا سه‌بعدی',
          description: 'موتور دقیق کوارتز سوئیسی به همراه بند چرم گاوی اصل قابل تعویض.',
          price: '۶,۷۵۰,۰۰۰ تومان',
          ctaText: 'مشاهده و سفارش ساعت ↗',
          ctaLink: 'shop.html?category=accessories',
          ctaAction: null
        }
      ]
    },
    {
      id: 'living',
      title: 'خانه و دکور',
      subtitle: 'زیبایی‌شناسی مینیمال نوردیک',
      avatar: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=150&q=80',
      badge: 'مدرن',
      timeAgo: '۵ ساعت پیش',
      slides: [
        {
          image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=85',
          tag: '🛋️ آرامش در فضای خانه',
          title: 'مبلمان و آکسسوار سبک ژاپندی',
          description: 'ترکیب تعادل چوب طبیعی گردو با متریال‌های ارگانیک برای ساخت خانه‌ای گرم و دعوت‌کننده.',
          price: 'محصولات دست‌چین دکور',
          ctaText: 'ورود به دنیای خانه و دکور ↗',
          ctaLink: 'shop.html?category=living',
          ctaAction: null
        },
        {
          image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=85',
          tag: '🏺 سفالینه‌های دست‌ساز هنری',
          title: 'گلدان‌ها و آباژورهای سرامیکی نُوا',
          description: 'روشنایی ملایم محیطی و حس اصالت با فرم‌های هندسی نامتقارن و چشم‌نواز.',
          price: 'از ۸۹۰,۰۰۰ تومان',
          ctaText: 'خرید آنلاین دکوری ↗',
          ctaLink: 'shop.html?category=living',
          ctaAction: null
        }
      ]
    },
    {
      id: 'beauty',
      title: 'زیبایی و عطر',
      subtitle: 'روایح نیش و مراقبت پوست',
      avatar: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=150&q=80',
      badge: 'پرفروش',
      timeAgo: '۶ ساعت پیش',
      slides: [
        {
          image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=85',
          tag: '✨ اکستریت د پرفیوم نیش',
          title: 'عطر اختصاصی نُوا؛ سانتال و امبر',
          description: 'ماندگاری خیره‌کننده بیش از ۴۸ ساعت با نت‌های ابتدایی هل و فلفل سیاه و پایان گرم سدر.',
          price: '۵,۴۰۰,۰۰۰ تومان',
          ctaText: 'سفارش آنلاین عطر نُوا ↗',
          ctaLink: 'shop.html?category=beauty',
          ctaAction: null
        },
        {
          image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=85',
          tag: '🌱 ۱۰۰٪ ارگانیک و کرولتی‌فری',
          title: 'سرم جوانساز و آبرسان هیالورونیک',
          description: 'فرمولاسیون غنی از نیاسینامید و پپتیدهای احیاکننده برای درخشش طبیعی پوست شما.',
          price: '۱,۶۵۰,۰۰۰ تومان',
          ctaText: 'مشاهده محصولات پوستی ↗',
          ctaLink: 'shop.html?category=beauty',
          ctaAction: null
        }
      ]
    },
    {
      id: 'tech',
      title: 'فناوری های-فای',
      subtitle: 'صدا و گجت‌های پریمیوم',
      avatar: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=150&q=80',
      badge: 'Hi-Res',
      timeAgo: '۸ ساعت پیش',
      slides: [
        {
          image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=900&q=85',
          tag: '🎧 صدای کریستالی بدون نویز',
          title: 'هدفون استودیویی بی‌سیم نُوا پرو',
          description: 'مجهز به درایورهای تیتانیومی ۴۰ میلی‌متری و حذف نویز فعال هیبریدی با ماندگاری باتری ۴۵ ساعته.',
          price: '۸,۹۰۰,۰۰۰ تومان',
          ctaText: 'بررسی مشخصات و خرید ↗',
          ctaLink: 'shop.html?category=tech',
          ctaAction: null
        },
        {
          image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=900&q=85',
          tag: '🔊 چوب گردوی دست‌ساز',
          title: 'اسپیکر خانگی بلوتوثی آکوستیک نُوا',
          description: 'باس عمیق با تفکیک فرکانسی استثنایی و اتصال سریع با بلوتوث نسخه ۵.۳ و ورودی اپتیکال.',
          price: '۷,۳۰۰,۰۰۰ تومان',
          ctaText: 'خرید اسپیکر نُوا ↗',
          ctaLink: 'shop.html?category=tech',
          ctaAction: null
        }
      ]
    },
    {
      id: 'club',
      title: 'باشگاه نُوا',
      subtitle: 'مزایای ویژه و کلوپ طلایی',
      avatar: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=150&q=80',
      badge: 'VIP Club',
      timeAgo: 'همیشه فعال',
      slides: [
        {
          image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=85',
          tag: '👑 عضویت طلایی نُوا کلاب',
          title: 'دسترسی زودهنگام به کالکشن‌ها و پرسنال استایلیست',
          description: 'ارسال رایگان دائمی تمامی سفارش‌ها، هدایای سالگرد تولد، و دعوت به ایونت‌های خصوصی برند نُوا.',
          price: 'رایگان برای مشتریان وفادار',
          ctaText: 'آشنایی با باشگاه نُوا ↗',
          ctaLink: 'about.html',
          ctaAction: null
        }
      ]
    }
  ];

  // 2. Engine State
  const SLIDE_DURATION = 4800; // ms per slide
  let currentStoryIndex = 0;
  let currentSlideIndex = 0;
  let isPlaying = false;
  let progressStartTime = 0;
  let progressElapsed = 0;
  let animationFrameId = null;
  let isHoldPaused = false;
  let modalEl = null;

  const STORAGE_KEY = 'nova_viewed_stories';

  function getViewedStories() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  }

  function markStoryAsViewed(id) {
    try {
      const viewed = getViewedStories();
      if (!viewed.includes(id)) {
        viewed.push(id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(viewed));
      }
    } catch (e) {}
    updateStoryRingViewedState(id);
  }

  function updateStoryRingViewedState(id) {
    const item = document.querySelector(`.story-item[data-story-id="${id}"]`);
    if (item) {
      item.classList.add('story-viewed');
    }
  }

  function restoreViewedStates() {
    const viewed = getViewedStories();
    viewed.forEach(id => updateStoryRingViewedState(id));
  }

  // 3. Build & Inject Story Viewer Modal into DOM
  function createModalDOM() {
    if (document.getElementById('story-viewer-modal')) {
      modalEl = document.getElementById('story-viewer-modal');
      return;
    }

    const modal = document.createElement('div');
    modal.id = 'story-viewer-modal';
    modal.className = 'story-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'پخش‌کننده استوری');

    modal.innerHTML = `
      <div class="story-modal-backdrop" id="story-backdrop"></div>
      
      <!-- Outer Desktop Navigation Arrows -->
      <button class="story-nav-btn story-nav-prev" id="story-btn-prev-group" title="استوری قبلی (→)" aria-label="استوری قبلی">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
      </button>

      <div class="story-phone-container" id="story-container">
        <!-- Segmented Progress Bars -->
        <div class="story-progress-bar-container" id="story-progress-container"></div>

        <!-- Story Header -->
        <div class="story-header">
          <div class="story-header-author">
            <div class="story-header-avatar-ring">
              <img src="" alt="" class="story-header-avatar" id="story-header-avatar">
            </div>
            <div class="story-header-meta">
              <div class="story-header-title-row">
                <span class="story-header-title" id="story-header-title"></span>
                <span class="story-verified-badge" title="تأیید شده">✓</span>
              </div>
              <span class="story-header-time" id="story-header-time"></span>
            </div>
          </div>

          <div class="story-header-actions">
            <button class="story-control-btn" id="story-play-pause-btn" title="توقف / پخش (Space)">
              <svg id="story-pause-icon" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
              <svg id="story-play-icon" viewBox="0 0 24 24" fill="currentColor" style="display:none;"><polygon points="6 4 20 12 6 20 6 4"/></svg>
            </button>
            <button class="story-control-btn story-close-btn" id="story-close-btn" title="بستن استوری (Esc)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </div>

        <!-- Main Slide Canvas -->
        <div class="story-canvas" id="story-canvas">
          <div class="story-slide-bg" id="story-slide-bg"></div>
          <div class="story-gradient-top"></div>
          <div class="story-gradient-bottom"></div>

          <!-- Tap Navigation Zones -->
          <div class="story-tap-zone story-tap-left" id="story-tap-left" title="اسلاید بعدی"></div>
          <div class="story-tap-zone story-tap-right" id="story-tap-right" title="اسلاید قبلی"></div>

          <!-- Slide Content Overlay -->
          <div class="story-slide-content" id="story-slide-content">
            <span class="story-content-tag" id="story-content-tag"></span>
            <h2 class="story-content-title" id="story-content-title"></h2>
            <p class="story-content-desc" id="story-content-desc"></p>
            <div class="story-content-price" id="story-content-price"></div>
          </div>
        </div>

        <!-- Interactive Bottom Bar -->
        <div class="story-bottom-bar">
          <a href="#" class="story-cta-button" id="story-cta-button" target="_self">
            <span id="story-cta-text">مشاهده محصول</span>
          </a>
          <button class="story-reaction-btn" id="story-heart-btn" title="ارسال قلب" aria-label="لایک استوری">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="heart-icon">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
        </div>

        <!-- Floating Hearts Layer -->
        <div class="story-floating-hearts" id="story-floating-hearts"></div>
      </div>

      <button class="story-nav-btn story-nav-next" id="story-btn-next-group" title="استوری بعدی (←)" aria-label="استوری بعدی">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
    `;

    document.body.appendChild(modal);
    modalEl = modal;

    bindEvents();
  }

  // 4. Bind Interactions & Event Listeners
  function bindEvents() {
    if (!modalEl) return;

    // Close buttons & backdrop
    const closeBtn = document.getElementById('story-close-btn');
    const backdrop = document.getElementById('story-backdrop');
    closeBtn.addEventListener('click', closeStoryViewer);
    backdrop.addEventListener('click', closeStoryViewer);

    // Group navigation (Outer arrows)
    const prevGroupBtn = document.getElementById('story-btn-prev-group');
    const nextGroupBtn = document.getElementById('story-btn-next-group');
    prevGroupBtn.addEventListener('click', prevStoryGroup);
    nextGroupBtn.addEventListener('click', nextStoryGroup);

    // Play/Pause button
    const playPauseBtn = document.getElementById('story-play-pause-btn');
    playPauseBtn.addEventListener('click', togglePlayPause);

    // Tap zones for slide navigation
    const tapLeft = document.getElementById('story-tap-left');
    const tapRight = document.getElementById('story-tap-right');

    tapLeft.addEventListener('click', (e) => {
      e.stopPropagation();
      nextSlide();
    });

    tapRight.addEventListener('click', (e) => {
      e.stopPropagation();
      prevSlide();
    });

    // Touch / Mouse Hold to Pause
    const container = document.getElementById('story-container');
    const startHold = () => {
      isHoldPaused = true;
      pauseProgress();
    };
    const endHold = () => {
      if (isHoldPaused) {
        isHoldPaused = false;
        if (isPlaying) resumeProgress();
      }
    };

    container.addEventListener('mousedown', (e) => {
      // Don't hold on CTA click or button click
      if (e.target.closest('.story-cta-button, .story-reaction-btn, .story-control-btn')) return;
      startHold();
    });
    window.addEventListener('mouseup', endHold);

    container.addEventListener('touchstart', (e) => {
      if (e.target.closest('.story-cta-button, .story-reaction-btn, .story-control-btn')) return;
      startHold();
    }, { passive: true });
    window.addEventListener('touchend', endHold);

    // CTA button click special handling (e.g. spin wheel)
    const ctaBtn = document.getElementById('story-cta-button');
    ctaBtn.addEventListener('click', (e) => {
      const currentStory = storiesData[currentStoryIndex];
      const currentSlide = currentStory.slides[currentSlideIndex];
      if (currentSlide.ctaAction === 'spinWheel') {
        e.preventDefault();
        closeStoryViewer();
        if (typeof window.openSpinWheel === 'function') {
          setTimeout(() => window.openSpinWheel(), 250);
        }
      } else if (currentSlide.ctaLink && currentSlide.ctaLink.startsWith('#')) {
        closeStoryViewer();
      }
    });

    // Heart reaction button
    const heartBtn = document.getElementById('story-heart-btn');
    heartBtn.addEventListener('click', triggerHeartReaction);

    // Global Keyboard controls
    window.addEventListener('keydown', handleKeyDown);
  }

  function handleKeyDown(e) {
    if (!modalEl || !modalEl.classList.contains('active')) return;

    if (e.key === 'Escape') {
      closeStoryViewer();
    } else if (e.key === ' ' || e.code === 'Space') {
      e.preventDefault();
      togglePlayPause();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      nextSlide();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      prevSlide();
    }
  }

  // 5. Open Story Viewer
  function openStoryViewer(storyIdOrIndex) {
    createModalDOM();

    let targetIndex = 0;
    if (typeof storyIdOrIndex === 'string') {
      const foundIndex = storiesData.findIndex(s => s.id === storyIdOrIndex);
      if (foundIndex !== -1) targetIndex = foundIndex;
    } else if (typeof storyIdOrIndex === 'number') {
      targetIndex = Math.max(0, Math.min(storyIdOrIndex, storiesData.length - 1));
    }

    currentStoryIndex = targetIndex;
    currentSlideIndex = 0;
    progressElapsed = 0;

    modalEl.classList.add('active');
    document.body.style.overflow = 'hidden';

    loadCurrentStory();
    startProgress();
  }

  // 6. Close Story Viewer
  function closeStoryViewer() {
    if (!modalEl) return;
    pauseProgress();
    modalEl.classList.remove('active');
    document.body.style.overflow = '';
  }

  // 7. Load & Render Current Story & Slide
  function loadCurrentStory() {
    const story = storiesData[currentStoryIndex];
    if (!story) return;

    markStoryAsViewed(story.id);

    // Update Header
    const avatarEl = document.getElementById('story-header-avatar');
    const titleEl = document.getElementById('story-header-title');
    const timeEl = document.getElementById('story-header-time');

    avatarEl.src = story.avatar;
    titleEl.textContent = story.title;
    timeEl.textContent = `${story.timeAgo} • ${story.subtitle}`;

    // Render Progress Bar Segments
    renderProgressBars();

    // Render Current Slide
    renderCurrentSlide();

    // Update outer navigation buttons visibility
    const prevBtn = document.getElementById('story-btn-prev-group');
    const nextBtn = document.getElementById('story-btn-next-group');
    if (prevBtn) prevBtn.style.opacity = currentStoryIndex === 0 ? '0.35' : '1';
    if (nextBtn) nextBtn.style.opacity = currentStoryIndex === storiesData.length - 1 ? '0.35' : '1';
  }

  function renderProgressBars() {
    const story = storiesData[currentStoryIndex];
    const container = document.getElementById('story-progress-container');
    container.innerHTML = '';

    story.slides.forEach((_, idx) => {
      const segment = document.createElement('div');
      segment.className = 'story-progress-segment';
      segment.innerHTML = `<div class="story-progress-fill" id="story-progress-fill-${idx}"></div>`;
      container.appendChild(segment);
    });

    updateProgressSegments();
  }

  function updateProgressSegments() {
    const story = storiesData[currentStoryIndex];
    story.slides.forEach((_, idx) => {
      const fillEl = document.getElementById(`story-progress-fill-${idx}`);
      if (!fillEl) return;

      if (idx < currentSlideIndex) {
        fillEl.style.width = '100%';
        fillEl.style.transition = 'none';
      } else if (idx === currentSlideIndex) {
        const percent = Math.min(100, (progressElapsed / SLIDE_DURATION) * 100);
        fillEl.style.width = `${percent}%`;
        fillEl.style.transition = 'none';
      } else {
        fillEl.style.width = '0%';
        fillEl.style.transition = 'none';
      }
    });
  }

  function renderCurrentSlide() {
    const story = storiesData[currentStoryIndex];
    const slide = story.slides[currentSlideIndex];
    if (!slide) return;

    // Background Image
    const bgEl = document.getElementById('story-slide-bg');
    bgEl.style.backgroundImage = `url('${slide.image}')`;

    // Trigger subtle zoom animation
    bgEl.classList.remove('animate-zoom');
    void bgEl.offsetWidth; // Reflow
    bgEl.classList.add('animate-zoom');

    // Slide Content
    const tagEl = document.getElementById('story-content-tag');
    const titleEl = document.getElementById('story-content-title');
    const descEl = document.getElementById('story-content-desc');
    const priceEl = document.getElementById('story-content-price');
    const ctaBtn = document.getElementById('story-cta-button');
    const ctaText = document.getElementById('story-cta-text');

    tagEl.textContent = slide.tag || story.badge;
    titleEl.textContent = slide.title;
    descEl.textContent = slide.description;
    priceEl.textContent = slide.price || '';
    ctaText.textContent = slide.ctaText || 'مشاهده محصول ↗';
    ctaBtn.href = slide.ctaLink || '#';

    // Heart icon reset
    const heartBtn = document.getElementById('story-heart-btn');
    heartBtn.classList.remove('liked');
  }

  // 8. Progress Timer Loop
  function startProgress() {
    isPlaying = true;
    updatePlayPauseIcons();
    progressStartTime = performance.now() - progressElapsed;

    if (animationFrameId) cancelAnimationFrame(animationFrameId);

    function step(timestamp) {
      if (!isPlaying || isHoldPaused) return;

      progressElapsed = timestamp - progressStartTime;
      updateProgressSegments();

      if (progressElapsed >= SLIDE_DURATION) {
        nextSlide();
        return;
      }

      animationFrameId = requestAnimationFrame(step);
    }

    animationFrameId = requestAnimationFrame(step);
  }

  function pauseProgress() {
    isPlaying = false;
    updatePlayPauseIcons();
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  }

  function resumeProgress() {
    if (!modalEl || !modalEl.classList.contains('active')) return;
    startProgress();
  }

  function togglePlayPause() {
    if (isPlaying) {
      pauseProgress();
    } else {
      resumeProgress();
    }
  }

  function updatePlayPauseIcons() {
    const pauseIcon = document.getElementById('story-pause-icon');
    const playIcon = document.getElementById('story-play-icon');
    if (!pauseIcon || !playIcon) return;

    if (isPlaying) {
      pauseIcon.style.display = 'block';
      playIcon.style.display = 'none';
    } else {
      pauseIcon.style.display = 'none';
      playIcon.style.display = 'block';
    }
  }

  // 9. Slide & Story Navigation
  function nextSlide() {
    const story = storiesData[currentStoryIndex];
    if (currentSlideIndex < story.slides.length - 1) {
      currentSlideIndex++;
      progressElapsed = 0;
      renderCurrentSlide();
      updateProgressSegments();
      startProgress();
    } else {
      // Advance to next story group
      nextStoryGroup();
    }
  }

  function prevSlide() {
    if (progressElapsed > 800) {
      // If watched more than 0.8s, restart current slide
      progressElapsed = 0;
      updateProgressSegments();
      startProgress();
    } else if (currentSlideIndex > 0) {
      currentSlideIndex--;
      progressElapsed = 0;
      renderCurrentSlide();
      updateProgressSegments();
      startProgress();
    } else {
      // Go to previous story group
      prevStoryGroup(true);
    }
  }

  function nextStoryGroup() {
    if (currentStoryIndex < storiesData.length - 1) {
      currentStoryIndex++;
      currentSlideIndex = 0;
      progressElapsed = 0;
      loadCurrentStory();
      startProgress();
    } else {
      // Finished all stories
      closeStoryViewer();
      if (typeof window.showToast === 'function') {
        window.showToast('تمامی استوری‌ها مشاهده شدند! ✨', 'info');
      }
    }
  }

  function prevStoryGroup(toLastSlide = false) {
    if (currentStoryIndex > 0) {
      currentStoryIndex--;
      const story = storiesData[currentStoryIndex];
      currentSlideIndex = toLastSlide ? story.slides.length - 1 : 0;
      progressElapsed = 0;
      loadCurrentStory();
      startProgress();
    } else {
      // Restart current slide
      progressElapsed = 0;
      updateProgressSegments();
      startProgress();
    }
  }

  // 10. Floating Heart Reaction Animation
  function triggerHeartReaction() {
    const heartBtn = document.getElementById('story-heart-btn');
    heartBtn.classList.add('liked');

    const heartsLayer = document.getElementById('story-floating-hearts');
    const emojis = ['❤️', '💖', '🔥', '✨', '😍'];

    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const heart = document.createElement('span');
        heart.className = 'story-floating-heart';
        heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        
        // Random horizontal start near the heart button
        const randomX = Math.random() * 60 - 30;
        const randomRotate = Math.random() * 40 - 20;
        const randomScale = 0.8 + Math.random() * 0.6;
        
        heart.style.left = `calc(50px + ${randomX}px)`;
        heart.style.bottom = '30px';
        heart.style.transform = `rotate(${randomRotate}deg) scale(${randomScale})`;
        
        heartsLayer.appendChild(heart);

        setTimeout(() => {
          heart.remove();
        }, 1200);
      }, i * 80);
    }
  }

  // 11. Attach Click Handlers to Homepage Stories Bar
  function initStoriesBar() {
    restoreViewedStates();

    const storyItems = document.querySelectorAll('.stories-bar .story-item');
    storyItems.forEach((item, index) => {
      // Ensure cursor pointer and proper accessibility
      item.setAttribute('role', 'button');
      item.setAttribute('tabindex', '0');

      const storyId = item.getAttribute('data-story-id') || storiesData[index]?.id;
      if (storyId) {
        item.setAttribute('data-story-id', storyId);
      }

      item.addEventListener('click', (e) => {
        e.preventDefault();
        openStoryViewer(storyId || index);
      });

      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openStoryViewer(storyId || index);
        }
      });
    });
  }

  // Expose global API
  window.novaStories = {
    open: openStoryViewer,
    close: closeStoryViewer,
    data: storiesData
  };

  // Initialize on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStoriesBar);
  } else {
    initStoriesBar();
  }
})();
