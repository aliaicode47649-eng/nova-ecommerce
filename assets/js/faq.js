/**
 * NOVA — FAQ Knowledge Center Engine
 * 8 categories, live debounced search, accordion expand/collapse & URL hash deep-linking
 */

const NOVA_FAQS = [
  // 1. Orders
  {
    id: "q-order-track",
    category: "orders",
    categoryLabel: "سفارش و پیگیری",
    question: "چگونه می‌توانم وضعیت لحظه‌ای سفارش خود را رهگیری کنم؟",
    answer: "پس از ثبت سفارش، یک پیامک حاوی شماره پیگیری سفارش (مانند NOVA-84920) و کد رهگیری تیپاکس/پست برای شما ارسال می‌شود. شما می‌توانید در هر زمان با مراجعه به صفحه «رهگیری مرسوله» یا از طریق داشبورد کاربری خود، وضعیت پردازش، بسته‌بندی و موقعیت مکانی بسته را به صورت زنده مشاهده فرمایید."
  },
  {
    id: "q-order-edit",
    category: "orders",
    categoryLabel: "سفارش و پیگیری",
    question: "آیا امکان تغییر آدرس یا اقلام سفارش پس از ثبت نهایی وجود دارد؟",
    answer: "تا زمانی که وضعیت سفارش شما در حالت «ثبت شده» یا «در حال پردازش» است، می‌توانید از طریق تماس با پشتیبانی (۰۲۱-۲۲۰۰۳۳۴۴) درخواست اصلاح آدرس یا افزودن/حذف کالا را ثبت کنید. در صورتی که بسته تحویل پیک یا شرکت پستی شده باشد، امکان تغییر مقدور نخواهد بود."
  },
  {
    id: "q-order-cancel",
    category: "orders",
    categoryLabel: "سفارش و پیگیری",
    question: "فرآیند لغو سفارش و بازگشت وجه چگونه است؟",
    answer: "شما می‌توانید پیش از خروج مرسوله از انبار مرکزی، سفارش خود را از طریق پنل کاربری یا تماس با پشتیبانی لغو فرمایید. مبلغ پرداختی ظرف مدت ۲۴ تا ۴۸ ساعت کاری به همان شماره شبایی که پرداخت از آن صورت گرفته عودت داده خواهد شد."
  },

  // 2. Shipping
  {
    id: "q-shipping-cost",
    category: "shipping",
    categoryLabel: "ارسال و تحویل",
    question: "هزینه و شرایط ارسال رایگان در نُوا چگونه محاسبه می‌شود؟",
    answer: "برای تمامی خریدهای بالای ۳,۰۰۰,۰۰۰ تومان در سراسر کشور، ارسال به صورت کاملاً رایگان و با بسته‌بندی اختصاصی نُوا انجام می‌شود. برای سفارش‌های زیر این مبلغ، هزینه ثابت ۶۵,۰۰۰ تومان به فاکتور نهایی افزوده خواهد شد."
  },
  {
    id: "q-shipping-time",
    category: "shipping",
    categoryLabel: "ارسال و تحویل",
    question: "سفارش‌ها ظرف چه مدتی به دست خریداران می‌رسد؟",
    answer: "سفارش‌های شهر تهران در صورت ثبت تا ساعت ۱۶، در همان روز یا بازه انتخابی شما تحویل می‌شوند. برای سایر شهرهای کشور، ارسال از طریق تیپاکس و پست پیشتاز هوایی انجام شده و تحویل معمولاً بین ۲۴ تا حداکثر ۴۸ ساعت کاری زمان خواهد برد."
  },
  {
    id: "q-shipping-cities",
    category: "shipping",
    categoryLabel: "ارسال و تحویل",
    question: "آیا نُوا به تمامی شهرستان‌ها و روستاهای کشور ارسال دارد؟",
    answer: "بله، به لطف همکاری با شبکه توزیع اختصاصی تیپاکس و شرکت ملی پست جمهوری اسلامی ایران، پوشش ارسال نُوا ۱۰۰٪ جغرافیای کشور را در بر می‌گیرد."
  },

  // 3. Returns
  {
    id: "q-return-eligibility",
    category: "returns",
    categoryLabel: "مرجوعی و تعویض",
    question: "شرایط استفاده از ضمانت ۷ روزه بازگشت کالا چیست؟",
    answer: "تمامی کالاهای خریداری شده (به استثنای عطریات و لوازم مراقبت پوستی که پلمب بهداشتی آنها باز شده باشد) تا ۷ روز پس از تاریخ تحویل، در صورت حفظ سلامت ظاهری، عدم استفاده و باقی ماندن تگ‌ها و شناسنامه کالا، قابل تعویض یا بازگشت بی قید و شرط هستند."
  },
  {
    id: "q-return-process",
    category: "returns",
    categoryLabel: "مرجوعی و تعویض",
    question: "مراحل ثبت درخواست تعویض یا مرجوعی کالا چگونه است؟",
    answer: "کافی است وارد حساب کاربری خود شده، در بخش سفارش‌ها گزینه «درخواست مرجوعی» را انتخاب کنید. کارشناسان ما ظرف ۲ ساعت با شما تماس گرفته و هماهنگی جهت مراجعه سفیر نُوا و دریافت رایگان بسته انجام خواهد شد."
  },

  // 4. Payments
  {
    id: "q-payment-methods",
    category: "payments",
    categoryLabel: "پرداخت و فاکتور",
    question: "چه درگاه‌ها و روش‌های پرداختی در نُوا پشتیبانی می‌شوند؟",
    answer: "پرداخت از طریق تمامی کارت‌های عضو شبکه شتاب با درگاه‌های امن بانکی (بانک سامان و ملت)، پرداخت با کیف پول نُوا و همچنین کارت‌های هدیه شرکتی امکان‌پذیر است."
  },
  {
    id: "q-payment-invoice",
    category: "payments",
    categoryLabel: "پرداخت و فاکتور",
    question: "آیا فاکتور رسمی معتبر شرکتی صادر می‌شود؟",
    answer: "بله، برای تمامی خریداران حقیقی و حقوقی، فاکتور رسمی ممهور به شناسه مالیاتی و مهر شرکت به صورت فیزیکی همراه بسته و نسخه الکترونیکی PDF در پنل کاربری ارائه می‌گردد."
  },

  // 5. Account
  {
    id: "q-account-vip",
    category: "account",
    categoryLabel: "حساب کاربری",
    question: "باشگاه مشتریان نُوا (NOVA Club) چه مزایایی دارد؟",
    answer: "با هر خرید، معادل ۵٪ از مبلغ پرداختی به عنوان امتیاز کلاب ذخیره می‌شود. اعضای طلایی و پلاتین از دسترسی زودهنگام به حراج‌های فصلی، ارسال رایگان همیشگی بدون سقف مبلغ و دعوت‌نامه‌های رونمایی اختصاصی در شوروم بهره‌مند می‌شوند."
  },

  // 6. Products
  {
    id: "q-product-authenticity",
    category: "products",
    categoryLabel: "اصالت کالاها",
    question: "چگونه از اصالت و کیفیت متریال‌های نُوا مطمئن شوم؟",
    answer: "تمام محصولات دارای شناسنامه هولوگرام‌دار اصالت اثر، شامل مشخصات طراح، تاریخ ساخت، سری شماره‌گذاری شده تیراژ محدود و برگه ضمانت فیزیکی هستند."
  },

  // 7. Gift Cards
  {
    id: "q-giftcard-use",
    category: "gift-cards",
    categoryLabel: "کارت هدیه",
    question: "کارت هدیه نُوا چگونه استفاده می‌شود و آیا تاریخ انقضا دارد؟",
    answer: "کارت‌های هدیه نُوا فاقد هرگونه تاریخ انقضا هستند. دارنده کارت می‌تواند در هنگام تسویه حساب، کد اختصاصی درج شده روی کارت را در فیلد کوپن وارد کند تا مبلغ اعتبار بلافاصله از فاکتور کسر گردد."
  },

  // 8. Privacy
  {
    id: "q-privacy-security",
    category: "privacy",
    categoryLabel: "حریم خصوصی",
    question: "اطلاعات شخصی و شماره تماس من چگونه محافظت می‌شوند؟",
    answer: "اطلاعات کاربران مطابق با بالاترین استانداردهای رمزنگاری SSL 256-bit ذخیره شده و تحت هیچ شرایطی در اختیار شرکت‌ها یا اشخاص ثالث برای مقاصد تبلیغاتی قرار نخواهد گرفت."
  }
];

class FAQManager {
  constructor() {
    this.faqs = NOVA_FAQS;
    this.activeCategory = 'all';
    this.searchQuery = '';
  }

  init() {
    this.bindEvents();
    this.renderFAQs();
    this.handleHashDeepLink();
  }

  bindEvents() {
    // Search input with debounce
    const searchInp = document.getElementById('faq-search-input');
    if (searchInp) {
      let timeout = null;
      searchInp.addEventListener('input', (e) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          this.searchQuery = e.target.value.trim().toLowerCase();
          this.renderFAQs();
        }, 200);
      });
    }

    // Category chips
    const chips = document.querySelectorAll('.faq-cat-chip');
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        this.activeCategory = chip.getAttribute('data-cat') || 'all';
        this.renderFAQs();
      });
    });

    // Hash change listener
    window.addEventListener('hashchange', () => this.handleHashDeepLink());
  }

  renderFAQs() {
    const container = document.getElementById('faq-items-container');
    if (!container) return;

    let filtered = this.faqs.filter(f => {
      if (this.activeCategory !== 'all' && f.category !== this.activeCategory) return false;
      if (this.searchQuery) {
        const matchQ = f.question.toLowerCase().includes(this.searchQuery);
        const matchA = f.answer.toLowerCase().includes(this.searchQuery);
        if (!matchQ && !matchA) return false;
      }
      return true;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="empty-state" style="text-align: center; padding: 4rem 1rem;">
          <div style="font-size: 2.5rem; margin-bottom: 1rem;">❔</div>
          <h4 style="font-size: var(--text-lg); font-weight: bold; margin-bottom: 0.5rem;">پرسشی مطابق با جستجوی شما یافت نشد</h4>
          <p style="font-size: var(--text-sm); color: var(--text-secondary); margin-bottom: 1.5rem;">کلمات کلیدی دیگری را جستجو کنید یا مستقیماً با کارشناسان ما تماس بگیرید.</p>
          <button class="btn btn-outline btn-sm" onclick="novaFAQ.resetSearch()">مشاهده همه پرسش‌ها</button>
        </div>
      `;
      return;
    }

    // Group by category if viewing 'all' and not searching, otherwise render flat
    container.innerHTML = filtered.map((f, idx) => `
      <div class="faq-accordion-item" id="${f.id}">
        <button class="faq-accordion-header" onclick="novaFAQ.toggleAccordion('${f.id}')" aria-expanded="false">
          <span style="display: flex; align-items: center; gap: 0.75rem;">
            <span style="font-size: 0.7rem; padding: 0.2rem 0.5rem; background: var(--bg-surface-subtle); border-radius: 4px; color: var(--text-tertiary); font-weight: normal;">
              ${f.categoryLabel}
            </span>
            <span>${f.question}</span>
          </span>
          <span class="faq-accordion-icon">+</span>
        </button>
        <div class="faq-accordion-body">
          <div class="faq-accordion-content">
            <p>${f.answer}</p>
          </div>
        </div>
      </div>
    `).join('');
  }

  toggleAccordion(id) {
    const item = document.getElementById(id);
    if (!item) return;

    const isActive = item.classList.contains('active');
    
    // Close other open accordions
    document.querySelectorAll('.faq-accordion-item').forEach(i => {
      i.classList.remove('active');
      const btn = i.querySelector('.faq-accordion-header');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });

    if (!isActive) {
      item.classList.add('active');
      const btn = item.querySelector('.faq-accordion-header');
      if (btn) btn.setAttribute('aria-expanded', 'true');
    }
  }

  handleHashDeepLink() {
    const hash = window.location.hash.replace('#', '');
    if (!hash) return;

    // Check if hash matches an FAQ ID
    const targetItem = document.getElementById(hash);
    if (targetItem) {
      this.toggleAccordion(hash);
      setTimeout(() => {
        targetItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 150);
      return;
    }

    // Check if hash matches a category slug
    const catChip = document.querySelector(`.faq-cat-chip[data-cat="${hash}"]`);
    if (catChip) {
      catChip.click();
    }
  }

  resetSearch() {
    this.activeCategory = 'all';
    this.searchQuery = '';
    const searchInp = document.getElementById('faq-search-input');
    if (searchInp) searchInp.value = '';
    const chips = document.querySelectorAll('.faq-cat-chip');
    chips.forEach(c => c.classList.toggle('active', c.getAttribute('data-cat') === 'all'));
    this.renderFAQs();
  }
}

const novaFAQ = new FAQManager();
window.novaFAQ = novaFAQ;

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('faq-items-container')) {
    novaFAQ.init();
  }
});
