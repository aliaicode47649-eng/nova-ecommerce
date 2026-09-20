/**
 * NOVA — Digital Luxury Gift Card Engine
 * Real-time card preview, preset & custom amount calculation, themes & cart integration
 */

class GiftCardManager {
  constructor() {
    this.amount = 2500000;
    this.theme = 'gold';
    this.recipientName = 'دوست گرامی';
    this.senderName = 'شما';
    this.message = 'با عشق تقدیم به شما برای تجربه‌ای ماندگار از انتخابی ناب در استودیو نُوا.';
    this.cardCode = this.generateCardCode();

    this.minAmount = 500000;
    this.maxAmount = 50000000;
  }

  generateCardCode() {
    const part1 = Math.floor(1000 + Math.random() * 9000);
    const part2 = Math.floor(1000 + Math.random() * 9000);
    return `NOVA-${part1}-${part2}`;
  }

  init() {
    this.bindInputs();
    this.updatePreview();
  }

  bindInputs() {
    // Preset buttons
    const presetBtns = document.querySelectorAll('.amount-preset-btn');
    presetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        presetBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.amount = parseInt(btn.getAttribute('data-amount'), 10);
        const customInp = document.getElementById('giftcard-custom-amount');
        if (customInp) customInp.value = '';
        this.updatePreview();
      });
    });

    // Custom amount input
    const customInp = document.getElementById('giftcard-custom-amount');
    if (customInp) {
      customInp.addEventListener('input', (e) => {
        const raw = e.target.value.replace(/[^0-9]/g, '');
        if (raw) {
          presetBtns.forEach(b => b.classList.remove('active'));
          this.amount = parseInt(raw, 10);
        }
        this.updatePreview();
      });
    }

    // Theme pickers
    const themeBtns = document.querySelectorAll('.giftcard-theme-btn');
    themeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        themeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.theme = btn.getAttribute('data-theme') || 'gold';
        this.updatePreview();
      });
    });

    // Text inputs
    const recipientInp = document.getElementById('giftcard-recipient-name');
    if (recipientInp) {
      recipientInp.addEventListener('input', (e) => {
        this.recipientName = e.target.value.trim() || 'دوست گرامی';
        this.updatePreview();
      });
    }

    const senderInp = document.getElementById('giftcard-sender-name');
    if (senderInp) {
      senderInp.addEventListener('input', (e) => {
        this.senderName = e.target.value.trim() || 'شما';
        this.updatePreview();
      });
    }

    const msgInp = document.getElementById('giftcard-message');
    if (msgInp) {
      msgInp.addEventListener('input', (e) => {
        this.message = e.target.value.trim() || 'با عشق تقدیم به شما برای تجربه‌ای ماندگار از انتخابی ناب در استودیو نُوا.';
        this.updatePreview();
      });
    }

    // Form submission
    const form = document.getElementById('giftcard-order-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleAddToCart();
      });
    }
  }

  updatePreview() {
    const cardEl = document.getElementById('giftcard-preview-target');
    if (!cardEl) return;

    // Update classes for theme
    cardEl.className = `giftcard-card giftcard-theme-${this.theme}`;

    // Update amount display
    const amountEl = document.getElementById('preview-card-amount');
    if (amountEl) {
      amountEl.textContent = this.amount ? this.amount.toLocaleString('fa-IR') + ' تومان' : '۰ تومان';
    }

    // Update names & code
    const recipientEl = document.getElementById('preview-card-recipient');
    if (recipientEl) recipientEl.textContent = this.recipientName;

    const senderEl = document.getElementById('preview-card-sender');
    if (senderEl) senderEl.textContent = this.senderName;

    const codeEl = document.getElementById('preview-card-code');
    if (codeEl) codeEl.textContent = this.cardCode;
  }

  handleAddToCart() {
    if (this.amount < this.minAmount) {
      if (window.showToast) window.showToast(`حداقل مبلغ کارت هدیه ۵۰۰,۰۰۰ تومان است`, 'error');
      return;
    }
    if (this.amount > this.maxAmount) {
      if (window.showToast) window.showToast(`حداکثر مبلغ کارت هدیه ۵۰,۰۰۰,۰۰۰ تومان است`, 'error');
      return;
    }

    const recipientContact = document.getElementById('giftcard-recipient-contact');
    if (!recipientContact || !recipientContact.value.trim()) {
      if (window.showToast) window.showToast('لطفاً شماره تماس یا ایمیل گیرنده را وارد فرمایید', 'error');
      if (recipientContact) recipientContact.focus();
      return;
    }

    const giftCardItem = {
      key: `giftcard_${this.theme}_${this.amount}_${Date.now()}`,
      id: "gift-card",
      name: `کارت هدیه دیجیتال نُوا (${this.amount.toLocaleString('fa-IR')} تومان)`,
      price: this.amount,
      image: "assets/images/placeholder.svg",
      color: `تم ${this.getThemeTitle(this.theme)}`,
      size: `گیرنده: ${this.recipientName}`,
      quantity: 1,
      isGiftCard: true,
      cardCode: this.cardCode,
      recipientContact: recipientContact.value.trim()
    };

    if (window.novaCart) {
      window.novaCart.items.push(giftCardItem);
      window.novaCart.saveCart();
      if (window.showToast) {
        window.showToast(`کارت هدیه ${this.amount.toLocaleString('fa-IR')} تومانی با موفقیت به سبد خرید اضافه شد!`, 'success');
      }
      window.novaCart.openDrawer();
    }
  }

  getThemeTitle(theme) {
    const map = {
      gold: 'طلایی شامپاینی',
      onyx: 'ابسیدیان مشکی',
      emerald: 'زمردی اشرافی',
      rose: 'رز مخملی'
    };
    return map[theme] || 'طلایی';
  }
}

const novaGiftCard = new GiftCardManager();
window.novaGiftCard = novaGiftCard;

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('giftcard-preview-target')) {
    novaGiftCard.init();
  }
});
