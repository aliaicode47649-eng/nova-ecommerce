/**
 * NOVA — Client-Side Form Validation & User Feedback
 * Handles Newsletter, Contact, Checkout, Auth & Order Tracking validation
 */

class FormValidator {
  constructor() {
    this.emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.iranPhoneRegex = /^09[0-9]{9}$/;
    this.iranPostalRegex = /^[0-9]{10}$/;
  }

  init() {
    this.bindNewsletter();
    this.bindContactForm();
    this.bindCheckoutForm();
    this.bindAuthForms();
    this.bindTrackingForm();
  }

  bindNewsletter() {
    document.querySelectorAll('.newsletter-form').forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('.newsletter-input');
        if (!input) return;

        const val = input.value.trim();
        if (!this.emailRegex.test(val)) {
          showToast('لطفاً یک آدرس ایمیل معتبر وارد فرمایید', 'error');
          input.focus();
          return;
        }

        showToast('سپاس! عضویت شما در خبرنامه نُوا با موفقیت ثبت شد.', 'success');
        input.value = '';
      });
    });
  }

  bindContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const nameInp = document.getElementById('contact-name');
      const emailInp = document.getElementById('contact-email');
      const phoneInp = document.getElementById('contact-phone');
      const msgInp = document.getElementById('contact-message');

      if (!nameInp.value.trim()) {
        this.setError(nameInp, 'لطفاً نام و نام خانوادگی خود را وارد کنید');
        isValid = false;
      } else {
        this.clearError(nameInp);
      }

      if (!this.emailRegex.test(emailInp.value.trim())) {
        this.setError(emailInp, 'ایمیل وارد شده معتبر نمی‌باشد');
        isValid = false;
      } else {
        this.clearError(emailInp);
      }

      if (phoneInp && phoneInp.value.trim() && !this.iranPhoneRegex.test(phoneInp.value.trim())) {
        this.setError(phoneInp, 'شماره موبایل باید ۱۱ رقم و با ۰۹ آغاز شود');
        isValid = false;
      } else if (phoneInp) {
        this.clearError(phoneInp);
      }

      if (!msgInp.value.trim() || msgInp.value.trim().length < 10) {
        this.setError(msgInp, 'پیام شما باید حداقل ۱۰ کاراکتر باشد');
        isValid = false;
      } else {
        this.clearError(msgInp);
      }

      if (isValid) {
        showToast('پیام شما با موفقیت ارسال شد. کارشناسان ما به زودی با شما تماس خواهند گرفت.', 'success');
        form.reset();
      }
    });
  }

  bindCheckoutForm() {
    const form = document.getElementById('checkout-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const fields = [
        { id: 'checkout-name', msg: 'نام و نام خانوادگی الزامی است' },
        { id: 'checkout-phone', regex: this.iranPhoneRegex, msg: 'شماره موبایل معتبر (۱۱ رقم با ۰۹) وارد نمایید' },
        { id: 'checkout-province', msg: 'انتخاب استان الزامی است' },
        { id: 'checkout-city', msg: 'نام شهر الزامی است' },
        { id: 'checkout-postal', regex: this.iranPostalRegex, msg: 'کد پستی باید ۱۰ رقم باشد' },
        { id: 'checkout-address', msg: 'آدرس پستی کامل الزامی است' }
      ];

      fields.forEach(f => {
        const el = document.getElementById(f.id);
        if (!el) return;

        const val = el.value.trim();
        if (!val || (f.regex && !f.regex.test(val))) {
          this.setError(el, f.msg);
          isValid = false;
        } else {
          this.clearError(el);
        }
      });

      if (isValid) {
        const cartTotals = window.novaCart.getTotals();
        if (cartTotals.itemCount === 0) {
          showToast('سبد خرید شما خالی است!', 'error');
          return;
        }

        showToast('سفارش شما با موفقیت ثبت شد! در حال هدایت به درگاه پرداخت...', 'success');
        setTimeout(() => {
          window.novaCart.clear();
          window.location.href = 'tracking.html?order=NOVA-84920';
        }, 1500);
      }
    });
  }

  bindAuthForms() {
    // Login Form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('login-user');
        const pass = document.getElementById('login-pass');
        let valid = true;

        if (!username.value.trim()) {
          this.setError(username, 'شماره موبایل یا ایمیل را وارد کنید');
          valid = false;
        } else {
          this.clearError(username);
        }

        if (!pass.value.trim() || pass.value.length < 6) {
          this.setError(pass, 'رمز عبور باید حداقل ۶ کاراکتر باشد');
          valid = false;
        } else {
          this.clearError(pass);
        }

        if (valid) {
          showToast('خوش آمدید! ورود با موفقیت انجام شد.', 'success');
          setTimeout(() => { window.location.href = 'account.html'; }, 1000);
        }
      });
    }

    // Register Form
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
      registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('reg-name');
        const phone = document.getElementById('reg-phone');
        const pass = document.getElementById('reg-pass');
        const terms = document.getElementById('reg-terms');
        let valid = true;

        if (!name.value.trim()) {
          this.setError(name, 'نام و نام خانوادگی الزامی است');
          valid = false;
        } else {
          this.clearError(name);
        }

        if (!this.iranPhoneRegex.test(phone.value.trim())) {
          this.setError(phone, 'شماره موبایل نامعتبر است (۰۹xxxxxxxxx)');
          valid = false;
        } else {
          this.clearError(phone);
        }

        if (!pass.value || pass.value.length < 6) {
          this.setError(pass, 'رمز عبور باید حداقل ۶ کاراکتر باشد');
          valid = false;
        } else {
          this.clearError(pass);
        }

        if (terms && !terms.checked) {
          showToast('پذیرش قوانین و مقررات الزامی است', 'error');
          valid = false;
        }

        if (valid) {
          showToast('حساب کاربری شما با موفقیت ایجاد شد!', 'success');
          setTimeout(() => { window.location.href = 'account.html'; }, 1000);
        }
      });
    }
  }

  bindTrackingForm() {
    const trackForm = document.getElementById('tracking-search-form');
    if (!trackForm) return;

    trackForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const inp = document.getElementById('tracking-code-input');
      if (!inp || !inp.value.trim()) {
        showToast('لطفاً شماره سفارش یا کد رهگیری را وارد فرمایید', 'error');
        return;
      }
      showToast(`در حال استعلام وضعیت سفارش «${inp.value.trim()}»...`, 'info');
      const details = document.getElementById('tracking-result-details');
      if (details) {
        details.style.display = 'block';
        details.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  setError(element, msg) {
    element.classList.add('is-invalid');
    let errEl = element.parentElement.querySelector('.form-error');
    if (!errEl) {
      errEl = document.createElement('div');
      errEl.className = 'form-error';
      element.parentElement.appendChild(errEl);
    }
    errEl.textContent = msg;
    errEl.style.display = 'block';
  }

  clearError(element) {
    element.classList.remove('is-invalid');
    const errEl = element.parentElement.querySelector('.form-error');
    if (errEl) errEl.style.display = 'none';
  }
}

const formValidator = new FormValidator();
document.addEventListener('DOMContentLoaded', () => formValidator.init());
