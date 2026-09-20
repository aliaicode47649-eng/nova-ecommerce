/**
 * NOVA — Extended Account Controllers
 * Address Book (localStorage CRUD), Notification Center & Order Details Inspector
 */

// ==========================================================================
// 1. Address Book Engine
// ==========================================================================
const ADDRESSES_STORAGE_KEY = 'nova_addresses';

const INITIAL_ADDRESSES = [
  {
    id: "addr-01",
    title: "منزل شخصی (تهران)",
    recipient: "سارا معتمد",
    phone: "۰۹۱۲۳۴۵۶۷۸۹",
    province: "تهران",
    city: "تهران",
    address: "پاسداران، خیابان گلستان پنجم، برج پارمیس، طبقه ۷، واحد ۲۸",
    postalCode: "۱۹۵۸۴۷۲۶۱۹",
    isDefault: true
  },
  {
    id: "addr-02",
    title: "دفتر کار و آتلیه معماری",
    recipient: "سارا معتمد",
    phone: "۰۹۱۲۳۴۵۶۷۸۹",
    province: "تهران",
    city: "تهران",
    address: "جردن (نلسون ماندلا)، بالاتر از میرداماد، خیابان سلطانی، پلاک ۴۲، طبقه ۳",
    postalCode: "۱۹۶۷۸۱۴۳۲۵",
    isDefault: false
  }
];

class AddressManager {
  constructor() {
    this.addresses = this.loadAddresses();
  }

  loadAddresses() {
    try {
      const data = localStorage.getItem(ADDRESSES_STORAGE_KEY);
      return data ? JSON.parse(data) : INITIAL_ADDRESSES;
    } catch (e) {
      return INITIAL_ADDRESSES;
    }
  }

  saveAddresses() {
    try {
      localStorage.setItem(ADDRESSES_STORAGE_KEY, JSON.stringify(this.addresses));
      this.renderList();
    } catch (e) {
      console.error(e);
    }
  }

  init() {
    this.renderList();
    this.bindModal();
  }

  renderList() {
    const container = document.getElementById('address-cards-container');
    if (!container) return;

    if (this.addresses.length === 0) {
      container.innerHTML = `
        <div class="empty-state" style="grid-column: 1/-1; text-align: center; padding: 3.5rem;">
          <div style="font-size: 2.5rem; margin-bottom: 0.75rem;">📍</div>
          <h4 style="font-size: var(--text-lg); font-weight: bold; margin-bottom: 0.5rem;">دفترچه آدرس شما خالی است</h4>
          <p style="font-size: var(--text-xs); color: var(--text-secondary); margin-bottom: 1.5rem;">با افزودن اولین آدرس، فرآیند تسویه حساب و ارسال سفارش‌های خود را سرعت ببخشید.</p>
          <button class="btn btn-primary btn-sm" onclick="novaAddresses.openModal()">+ افزودن اولین آدرس</button>
        </div>
      `;
      return;
    }

    container.innerHTML = this.addresses.map((addr, idx) => `
      <div class="address-card ${addr.isDefault ? 'default' : ''} reveal-fade-up delay-${(idx % 3) + 1}">
        <div class="address-card-header">
          <div class="address-card-title">
            <span>📍</span>
            <strong>${addr.title}</strong>
          </div>
          ${addr.isDefault ? `<span class="badge badge-hot">پیش‌فرض</span>` : `
            <button class="btn btn-ghost btn-sm" style="font-size: 0.7rem; color: var(--accent);" onclick="novaAddresses.setDefault('${addr.id}')">انتخاب به عنوان پیش‌فرض</button>
          `}
        </div>

        <div class="address-text">
          <div style="font-weight: var(--fw-semibold); color: var(--text-primary); margin-bottom: 0.35rem;">
            تحویل‌گیرنده: ${addr.recipient} (${addr.phone})
          </div>
          <div>${addr.province}، ${addr.city}، ${addr.address}</div>
          <div style="font-size: 0.7rem; color: var(--text-tertiary); margin-top: 0.35rem;">کد پستی: ${addr.postalCode}</div>
        </div>

        <div class="address-actions-row">
          <button class="btn btn-outline btn-sm" onclick="novaAddresses.editAddress('${addr.id}')">ویرایش آدرس</button>
          <button class="btn btn-ghost btn-sm" style="color: var(--error);" onclick="novaAddresses.deleteAddress('${addr.id}')">حذف</button>
        </div>
      </div>
    `).join('');
  }

  openModal(addressToEdit = null) {
    let modal = document.getElementById('address-modal-backdrop');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'address-modal-backdrop';
      modal.className = 'overlay-backdrop';
      modal.style.display = 'flex';
      modal.style.alignItems = 'center';
      modal.style.justifyContent = 'center';
      modal.style.padding = '1rem';
      document.body.appendChild(modal);
    }

    const isEdit = !!addressToEdit;
    const addr = addressToEdit || {
      id: "addr-" + Date.now(),
      title: "",
      recipient: "سارا معتمد",
      phone: "۰۹۱۲۳۴۵۶۷۸۹",
      province: "تهران",
      city: "تهران",
      address: "",
      postalCode: "",
      isDefault: false
    };

    modal.innerHTML = `
      <div style="background: var(--bg-surface-elevated); border: 1px solid var(--border-color); border-radius: var(--radius-xs); padding: 2rem; max-width: 520px; width: 100%; box-shadow: var(--shadow-xl); position: relative; z-index: var(--z-modal);" role="dialog">
        <div class="flex justify-between items-center" style="margin-bottom: 1.5rem; padding-bottom: 0.75rem; border-bottom: 1px solid var(--border-color);">
          <h4 style="font-size: var(--text-md); font-weight: bold;">${isEdit ? 'ویرایش آدرس تحویل' : 'افزودن آدرس جدید'}</h4>
          <button onclick="novaAddresses.closeModal()" class="drawer-close">✕</button>
        </div>

        <form id="address-form-modal" onsubmit="event.preventDefault(); novaAddresses.handleSave('${addr.id}', ${isEdit});">
          <div class="form-group" style="margin-bottom: 1rem;">
            <label class="form-label">عنوان آدرس (مثال: منزل، دفتر کار)</label>
            <input type="text" id="modal-addr-title" class="form-input" value="${addr.title}" placeholder="منزل شخصی" required>
          </div>

          <div class="grid form-row-grid-2" style="margin-bottom: 1rem;">
            <div class="form-group">
              <label class="form-label">استان</label>
              <select id="modal-addr-province" class="form-input">
                <option value="تهران" ${addr.province === 'تهران' ? 'selected' : ''}>تهران</option>
                <option value="اصفهان" ${addr.province === 'اصفهان' ? 'selected' : ''}>اصفهان</option>
                <option value="فارس" ${addr.province === 'فارس' ? 'selected' : ''}>فارس</option>
                <option value="خراسان رضوی" ${addr.province === 'خراسان رضوی' ? 'selected' : ''}>خراسان رضوی</option>
                <option value="آذربایجان شرقی" ${addr.province === 'آذربایجان شرقی' ? 'selected' : ''}>آذربایجان شرقی</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">شهر</label>
              <input type="text" id="modal-addr-city" class="form-input" value="${addr.city}" required>
            </div>
          </div>

          <div class="form-group" style="margin-bottom: 1rem;">
            <label class="form-label">نشانی دقیق پستی</label>
            <textarea id="modal-addr-address" class="form-input" rows="2" placeholder="خیابان، کوچه، پلاک، واحد..." required>${addr.address}</textarea>
          </div>

          <div class="grid form-row-grid-2" style="margin-bottom: 1.5rem;">
            <div class="form-group">
              <label class="form-label">کد پستی ۱۰ رقمی</label>
              <input type="text" id="modal-addr-postal" class="form-input" value="${addr.postalCode}" placeholder="۱۹۵۸۴۷۲۶۱۹" required>
            </div>
            <div class="form-group">
              <label class="form-label">شماره تماس تحویل‌گیرنده</label>
              <input type="tel" id="modal-addr-phone" class="form-input" value="${addr.phone}" placeholder="۰۹۱۲۳۴۵۶۷۸۹" required>
            </div>
          </div>

          <div class="flex gap-md justify-end">
            <button type="button" class="btn btn-outline" onclick="novaAddresses.closeModal()">انصراف</button>
            <button type="submit" class="btn btn-primary">ثبت و ذخیره آدرس</button>
          </div>
        </form>
      </div>
    `;

    modal.classList.add('active');
  }

  closeModal() {
    const modal = document.getElementById('address-modal-backdrop');
    if (modal) modal.classList.remove('active');
  }

  handleSave(id, isEdit) {
    const title = document.getElementById('modal-addr-title').value.trim();
    const province = document.getElementById('modal-addr-province').value.trim();
    const city = document.getElementById('modal-addr-city').value.trim();
    const address = document.getElementById('modal-addr-address').value.trim();
    const postalCode = document.getElementById('modal-addr-postal').value.trim();
    const phone = document.getElementById('modal-addr-phone').value.trim();

    if (!title || !address || !postalCode) {
      if (window.showToast) window.showToast('لطفاً تمام فیلدهای الزامی را پر فرمایید', 'error');
      return;
    }

    if (isEdit) {
      const idx = this.addresses.findIndex(a => a.id === id);
      if (idx > -1) {
        this.addresses[idx] = { ...this.addresses[idx], title, province, city, address, postalCode, phone };
      }
    } else {
      const newAddr = {
        id,
        title,
        recipient: "سارا معتمد",
        phone,
        province,
        city,
        address,
        postalCode,
        isDefault: this.addresses.length === 0
      };
      this.addresses.push(newAddr);
    }

    this.saveAddresses();
    this.closeModal();
    if (window.showToast) {
      window.showToast(isEdit ? 'آدرس با موفقیت ویرایش شد' : 'آدرس جدید با موفقیت ثبت شد', 'success');
    }
  }

  setDefault(id) {
    this.addresses = this.addresses.map(a => ({
      ...a,
      isDefault: a.id === id
    }));
    this.saveAddresses();
    if (window.showToast) window.showToast('آدرس پیش‌فرض تغییر یافت', 'info');
  }

  editAddress(id) {
    const addr = this.addresses.find(a => a.id === id);
    if (addr) this.openModal(addr);
  }

  deleteAddress(id) {
    if (!confirm('آیا از حذف این آدرس اطمینان دارید؟')) return;
    this.addresses = this.addresses.filter(a => a.id !== id);
    if (this.addresses.length > 0 && !this.addresses.some(a => a.isDefault)) {
      this.addresses[0].isDefault = true;
    }
    this.saveAddresses();
    if (window.showToast) window.showToast('آدرس حذف گردید', 'info');
  }

  bindModal() {
    const addBtn = document.getElementById('btn-add-new-address');
    if (addBtn) {
      addBtn.addEventListener('click', () => this.openModal());
    }
  }
}

// ==========================================================================
// 2. Notification Center Engine
// ==========================================================================
const NOTIFICATIONS_STORAGE_KEY = 'nova_notifications';

const INITIAL_NOTIFICATIONS = [
  {
    id: "notif-01",
    category: "orders",
    categoryLabel: "سفارش",
    icon: "📦",
    title: "مرسوله سفارش #NOVA-84920 تحویل تیپاکس شد",
    desc: "بسته پالتو پشمی شما با بارنامه شماره ۹۸۲۳۷۴۱ به مرکز توزیع تهران تحویل داده شد و تخمین تحویل فردا می‌باشد.",
    time: "۱ ساعت پیش",
    unread: true
  },
  {
    id: "notif-02",
    category: "promotions",
    categoryLabel: "باشگاه مشتریان",
    icon: "✨",
    title: "ارتقای سطح به VIP Gold و دریافت ۱,۸۵۰ امتیاز نُوا",
    desc: "سپاس از همراهی شما. ۵٪ تخفیف مازاد بر روی سبد خرید بعدی شما به صورت خودکار لحاظ گردید.",
    time: "دیروز",
    unread: true
  },
  {
    id: "notif-03",
    category: "wishlist",
    categoryLabel: "علاقه‌مندی‌ها",
    icon: "🏷️",
    title: "تخفیف شگفت‌انگیز روی کالای نشان‌شده شما",
    desc: "«پالتو پشمی دست‌دوز مینیمال» در لیست علاقه‌مندی شما مشمول حراج فصلی گردید.",
    time: "۳ روز پیش",
    unread: false
  },
  {
    id: "notif-04",
    category: "account",
    categoryLabel: "امنیت حساب",
    icon: "🛡️",
    title: "ورود موفق به حساب کاربری از مرورگر جدید",
    desc: "ورود از سیستم‌عامل Windows با آی‌پی تهران ثبت گردید.",
    time: "۵ روز پیش",
    unread: false
  }
];

class NotificationManager {
  constructor() {
    this.notifications = this.loadNotifications();
    this.activeCategory = 'all';
  }

  loadNotifications() {
    try {
      const data = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
      return data ? JSON.parse(data) : INITIAL_NOTIFICATIONS;
    } catch (e) {
      return INITIAL_NOTIFICATIONS;
    }
  }

  saveNotifications() {
    try {
      localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(this.notifications));
      this.updateBadges();
      this.renderList();
    } catch (e) {
      console.error(e);
    }
  }

  init() {
    this.updateBadges();
    this.renderList();
    this.bindFilters();
  }

  updateBadges() {
    const unreadCount = this.notifications.filter(n => n.unread).length;
    const badges = document.querySelectorAll('.notification-count-badge');
    badges.forEach(b => {
      b.textContent = unreadCount.toLocaleString('fa-IR');
      b.style.display = unreadCount > 0 ? 'inline-flex' : 'none';
    });
  }

  bindFilters() {
    const tabs = document.querySelectorAll('.notif-filter-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.activeCategory = tab.getAttribute('data-cat') || 'all';
        this.renderList();
      });
    });

    const markAllBtn = document.getElementById('btn-mark-all-read');
    if (markAllBtn) {
      markAllBtn.addEventListener('click', () => this.markAllAsRead());
    }
  }

  renderList() {
    const container = document.getElementById('notifications-list-container');
    if (!container) return;

    let filtered = this.notifications.filter(n => {
      if (this.activeCategory !== 'all' && n.category !== this.activeCategory) return false;
      return true;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="empty-state" style="text-align: center; padding: 4rem 1rem;">
          <div style="font-size: 2.5rem; margin-bottom: 0.75rem;">🔔</div>
          <h4 style="font-size: var(--text-lg); font-weight: bold; margin-bottom: 0.5rem;">پیامی در این دسته‌بندی وجود ندارد</h4>
          <p style="font-size: var(--text-xs); color: var(--text-secondary);">تمام اعلان‌های سفارش و رویدادهای مهم اینجا نمایش داده می‌شوند.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(n => `
      <div class="notification-item ${n.unread ? 'unread' : ''}" id="${n.id}">
        <div class="notification-icon-box">${n.icon}</div>
        <div class="notification-body">
          <div class="flex items-center justify-between">
            <h4 class="notification-title">${n.title}</h4>
            <button class="btn btn-ghost btn-sm" style="color: var(--text-tertiary); padding: 0;" onclick="novaNotifications.deleteNotification('${n.id}')" title="حذف اعلان">×</button>
          </div>
          <p class="notification-desc">${n.desc}</p>
          <div class="flex items-center justify-between" style="margin-top: 0.5rem;">
            <span class="notification-time">${n.time} • دسته‌بندی: ${n.categoryLabel}</span>
            ${n.unread ? `
              <button class="btn btn-ghost btn-sm" style="font-size: 0.7rem; color: var(--accent); padding: 0;" onclick="novaNotifications.markAsRead('${n.id}')">
                خواندن ✓
              </button>
            ` : ''}
          </div>
        </div>
        ${n.unread ? `<div class="notification-dot"></div>` : ''}
      </div>
    `).join('');
  }

  markAsRead(id) {
    const idx = this.notifications.findIndex(n => n.id === id);
    if (idx > -1) {
      this.notifications[idx].unread = false;
      this.saveNotifications();
    }
  }

  markAllAsRead() {
    this.notifications = this.notifications.map(n => ({ ...n, unread: false }));
    this.saveNotifications();
    if (window.showToast) window.showToast('تمام پیام‌ها خوانده شدند', 'info');
  }

  deleteNotification(id) {
    this.notifications = this.notifications.filter(n => n.id !== id);
    this.saveNotifications();
  }
}

// ==========================================================================
// 3. Order Details Inspector (order-details.html?order=NOVA-84920)
// ==========================================================================
const MOCK_ORDERS = {
  "NOVA-84920": {
    orderNumber: "NOVA-84920",
    date: "۲۲ شهریور ۱۴۰۵ - ساعت ۱۴:۳۰",
    status: "در حال حمل توسط تیپاکس",
    statusCode: "shipping",
    trackingCode: "۹۸۲۳۷۴۱",
    paymentMethod: "درگاه پرداخت آنلاین سامان (موفق)",
    recipient: "سارا معتمد",
    phone: "۰۹۱۲۳۴۵۶۷۸۹",
    address: "تهران، پاسداران، خیابان گلستان پنجم، برج پارمیس، طبقه ۷، واحد ۲۸",
    postalCode: "۱۹۵۸۴۷۲۶۱۹",
    items: [
      {
        id: "nova-01",
        name: "پالتو پشمی دست‌دوز مینیمال",
        color: "شنی طبیعی",
        size: "M",
        price: 4850000,
        qty: 1,
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80"
      }
    ],
    subtotal: 4850000,
    discount: 0,
    shippingFee: 0,
    tax: 0,
    total: 4850000
  },
  "NOVA-79104": {
    orderNumber: "NOVA-79104",
    date: "۱۵ مرداد ۱۴۰۵ - ساعت ۱۸:۱۰",
    status: "تحویل داده شده به مشتری",
    statusCode: "delivered",
    trackingCode: "۸۴۱۷۵۲۹",
    paymentMethod: "درگاه پرداخت آنلاین سامان (موفق)",
    recipient: "سارا معتمد",
    phone: "۰۹۱۲۳۴۵۶۷۸۹",
    address: "تهران، پاسداران، خیابان گلستان پنجم، برج پارمیس، طبقه ۷، واحد ۲۸",
    postalCode: "۱۹۵۸۴۷۲۶۱۹",
    items: [
      {
        id: "nova-03",
        name: "عطر نیش سنشوال چوب صندل و عنبر",
        color: "شیشه‌ای کریستال",
        size: "100ml",
        price: 2950000,
        qty: 1,
        image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=400&q=80"
      },
      {
        id: "nova-14",
        name: "روغن تغذیه‌کننده مو و پوست آرگان خالص",
        color: "طلایی کهربایی",
        size: "50ml",
        price: 980000,
        qty: 1,
        image: "https://images.unsplash.com/photo-1608248597359-00f72384c45b?auto=format&fit=crop&w=400&q=80"
      }
    ],
    subtotal: 3930000,
    discount: 0,
    shippingFee: 0,
    tax: 0,
    total: 3930000
  },
  "NOVA-65231": {
    orderNumber: "NOVA-65231",
    date: "۰۴ اردیبهشت ۱۴۰۵ - ساعت ۱۱:۴۵",
    status: "تحویل داده شده به مشتری",
    statusCode: "delivered",
    trackingCode: "۷۱۸۲۹۴۰",
    paymentMethod: "درگاه پرداخت آنلاین ملت (موفق)",
    recipient: "سارا معتمد",
    phone: "۰۹۱۲۳۴۵۶۷۸۹",
    address: "تهران، پاسداران، خیابان گلستان پنجم، برج پارمیس، طبقه ۷، واحد ۲۸",
    postalCode: "۱۹۵۸۴۷۲۶۱۹",
    items: [
      {
        id: "nova-02",
        name: "کیف دوشی چرم طبیعی ایتالیایی",
        color: "عسلی کاراملی",
        size: "تک‌سایز",
        price: 3600000,
        qty: 1,
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=400&q=80"
      }
    ],
    subtotal: 3600000,
    discount: 0,
    shippingFee: 0,
    tax: 0,
    total: 3600000
  }
};

class OrderDetailsManager {
  init() {
    const container = document.getElementById('order-details-stage');
    if (!container) return;

    const params = new URLSearchParams(window.location.search);
    const orderKey = params.get('order') || 'NOVA-84920';
    const order = MOCK_ORDERS[orderKey] || MOCK_ORDERS["NOVA-84920"];

    document.title = `جزئیات سفارش #${order.orderNumber} | نُوا`;

    container.innerHTML = `
      <div class="reveal-fade-up">
        <div class="breadcrumbs" style="margin-bottom: 1.5rem;">
          <a href="index.html">صفحه اصلی</a>
          <span class="breadcrumb-sep">/</span>
          <a href="account.html">حساب کاربری</a>
          <span class="breadcrumb-sep">/</span>
          <a href="orders.html">سفارش‌ها</a>
          <span class="breadcrumb-sep">/</span>
          <span class="current">${order.orderNumber}</span>
        </div>

        <div class="order-details-card">
          <div class="order-header-strip">
            <div>
              <span class="section-tag" style="margin-bottom: 0.25rem;">اطلاعات فاکتور</span>
              <h2 style="font-size: var(--text-2xl); font-weight: bold;">سفارش #${order.orderNumber}</h2>
              <div style="font-size: var(--text-xs); color: var(--text-tertiary); margin-top: 0.25rem;">
                ثبت شده در ${order.date}
              </div>
            </div>

            <div class="flex items-center gap-md">
              <span class="badge ${order.statusCode === 'delivered' ? 'badge-new' : 'badge-stock'}" style="font-size: 0.85rem; padding: 0.45rem 0.85rem;">
                ${order.status}
              </span>
              <button class="btn btn-outline btn-sm no-print" onclick="window.print()">
                🖨️ چاپ فاکتور رسمی
              </button>
            </div>
          </div>

          <!-- Timeline -->
          <div class="tracking-timeline" style="margin-block: 2rem;">
            <div class="tracking-step completed">
              <div class="tracking-step-dot">✓</div>
              <div class="tracking-step-title">ثبت سفارش</div>
              <div class="tracking-step-date">پرداخت موفق</div>
            </div>
            <div class="tracking-step completed">
              <div class="tracking-step-dot">✓</div>
              <div class="tracking-step-title">بسته‌بندی اختصاصی</div>
              <div class="tracking-step-date">استودیو نُوا</div>
            </div>
            <div class="tracking-step ${order.statusCode === 'shipping' ? 'active' : 'completed'}">
              <div class="tracking-step-dot">${order.statusCode === 'shipping' ? '۳' : '✓'}</div>
              <div class="tracking-step-title">تحویل به تیپاکس</div>
              <div class="tracking-step-date">کد: ${order.trackingCode}</div>
            </div>
            <div class="tracking-step ${order.statusCode === 'delivered' ? 'completed' : ''}">
              <div class="tracking-step-dot">${order.statusCode === 'delivered' ? '✓' : '۴'}</div>
              <div class="tracking-step-title">تحویل به مشتری</div>
              <div class="tracking-step-date">${order.statusCode === 'delivered' ? 'انجام شد' : 'در راه توزیع'}</div>
            </div>
          </div>

          <div class="grid" style="grid-template-columns: 2fr 1fr; gap: var(--space-2xl); margin-top: 2rem;">
            <!-- Items List -->
            <div>
              <h4 style="font-size: var(--text-base); font-weight: bold; margin-bottom: 1rem;">اقلام این سفارش (${order.items.length.toLocaleString('fa-IR')} کالا)</h4>
              <div class="order-items-list">
                ${order.items.map(item => `
                  <div class="order-product-row">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="order-product-info">
                      <h5><a href="product.html?id=${item.id}">${item.name}</a></h5>
                      <span>رنگ: ${item.color} | سایز: ${item.size} | تعداد: ${item.qty.toLocaleString('fa-IR')}</span>
                    </div>
                    <div style="font-size: var(--text-base); font-weight: bold; color: var(--text-primary);">
                      ${window.formatPrice ? window.formatPrice(item.price * item.qty) : item.price}
                    </div>
                  </div>
                `).join('')}
              </div>

              <!-- Shipping Info Box -->
              <div style="background: var(--bg-surface-subtle); border: 1px solid var(--border-color); border-radius: var(--radius-xs); padding: 1.5rem; margin-top: 1.5rem;">
                <h5 style="font-size: var(--text-sm); font-weight: bold; margin-bottom: 0.75rem;">اطلاعات تحویل و نشانی مقصد</h5>
                <p style="font-size: var(--text-xs); color: var(--text-secondary); line-height: 1.8;">
                  <strong>تحویل‌گیرنده:</strong> ${order.recipient} (${order.phone})<br>
                  <strong>آدرس پستی:</strong> ${order.address}<br>
                  <strong>کد پستی:</strong> ${order.postalCode} | <strong>روش ارسال:</strong> اکسپرس تیپاکس (کد مرسوله: ${order.trackingCode})
                </p>
              </div>
            </div>

            <!-- Billing Breakdown -->
            <div class="billing-breakdown-card">
              <h4 style="font-size: var(--text-base); font-weight: bold; margin-bottom: 1.25rem;">صورتحساب مالی</h4>
              
              <div class="billing-line">
                <span style="color: var(--text-secondary);">جمع اقلام:</span>
                <span>${window.formatPrice ? window.formatPrice(order.subtotal) : order.subtotal}</span>
              </div>
              <div class="billing-line">
                <span style="color: var(--text-secondary);">هزینه ارسال اکسپرس:</span>
                <span style="color: var(--success); font-weight: bold;">رایگان</span>
              </div>
              <div class="billing-line">
                <span style="color: var(--text-secondary);">مالیات بر ارزش افزوده:</span>
                <span>۰ تومان (محاسبه در قیمت)</span>
              </div>
              <div class="billing-line total">
                <span>مبلغ نهایی پرداختی:</span>
                <span style="color: var(--text-primary); font-weight: 900;">${window.formatPrice ? window.formatPrice(order.total) : order.total}</span>
              </div>

              <div style="font-size: 0.7rem; color: var(--text-tertiary); margin-block: 1rem; line-height: 1.5;">
                شیوه پرداخت: ${order.paymentMethod}
              </div>

              <div class="flex flex-col gap-sm no-print">
                <button class="btn btn-primary btn-block" onclick="novaOrderDetails.reorder('${order.orderNumber}')">
                  سفارش مجدد تمام اقلام 🛍️
                </button>
                <a href="tracking.html?order=${order.orderNumber}" class="btn btn-outline btn-block btn-sm" style="text-align: center;">
                  پیگیری آنلاین مرسوله
                </a>
                <a href="contact.html" class="btn btn-ghost btn-block btn-sm" style="text-align: center; color: var(--text-tertiary);">
                  نیاز به پشتیبانی در خصوص این سفارش دارید؟
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  reorder(orderNumber) {
    const order = MOCK_ORDERS[orderNumber];
    if (!order || !window.novaCart) return;

    order.items.forEach(item => {
      window.novaCart.addItem(item.id, item.qty, item.color, item.size);
    });

    if (window.showToast) {
      window.showToast(`اقلام سفارش #${orderNumber} به سبد خرید اضافه شدند`, 'success');
    }
  }
}

const novaAddresses = new AddressManager();
const novaNotifications = new NotificationManager();
const novaOrderDetails = new OrderDetailsManager();

window.novaAddresses = novaAddresses;
window.novaNotifications = novaNotifications;
window.novaOrderDetails = novaOrderDetails;

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('address-cards-container')) {
    novaAddresses.init();
  }
  if (document.getElementById('notifications-list-container')) {
    novaNotifications.init();
  }
  if (document.getElementById('order-details-stage')) {
    novaOrderDetails.init();
  }
});
