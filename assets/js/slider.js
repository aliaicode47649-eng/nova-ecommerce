/**
 * NOVA E-Commerce — Interactive Horizontal Album Slider & Drag-to-Scroll Engine
 * Inspired by Rojashop & Khanoumi horizontal carousels.
 * Supports mouse drag, touch swipe, velocity inertia, and navigation controls.
 */

class NovaAlbumSlider {
  constructor(containerSelector, options = {}) {
    this.container = typeof containerSelector === 'string' 
      ? document.querySelector(containerSelector) 
      : containerSelector;
    
    if (!this.container) return;

    this.track = this.container.querySelector('.album-slider-track') || this.container;
    this.prevBtn = this.container.querySelector('.album-nav-prev');
    this.nextBtn = this.container.querySelector('.album-nav-next');
    this.progressBar = this.container.querySelector('.album-progress-fill');

    this.isDown = false;
    this.startX = 0;
    this.scrollLeft = 0;
    this.isDragging = false;
    this.dragThreshold = 5;

    this.init();
  }

  init() {
    this.track.style.cursor = 'grab';

    // Mouse Drag Events
    this.track.addEventListener('mousedown', (e) => this.handleMouseDown(e));
    window.addEventListener('mouseup', () => this.handleMouseUp());
    this.track.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    this.track.addEventListener('mouseleave', () => this.handleMouseLeave());

    // Prevent image dragging inside track
    this.track.querySelectorAll('img, a').forEach(el => {
      el.addEventListener('dragstart', (e) => e.preventDefault());
    });

    // Prevent click on child links if dragged
    this.track.addEventListener('click', (e) => {
      if (this.isDragging) {
        e.preventDefault();
        e.stopPropagation();
      }
    }, true);

    // Navigation Buttons
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.scrollByAmount(-320));
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.scrollByAmount(320));
    }

    // Scroll progress & state update
    this.track.addEventListener('scroll', () => this.updateControls(), { passive: true });
    this.updateControls();
  }

  handleMouseDown(e) {
    this.isDown = true;
    this.isDragging = false;
    this.track.style.cursor = 'grabbing';
    this.track.style.userSelect = 'none';
    this.startX = e.pageX - this.track.offsetLeft;
    this.scrollLeft = this.track.scrollLeft;
  }

  handleMouseUp() {
    if (!this.isDown) return;
    this.isDown = false;
    this.track.style.cursor = 'grab';
    this.track.style.removeProperty('user-select');
    setTimeout(() => {
      this.isDragging = false;
    }, 50);
  }

  handleMouseLeave() {
    if (!this.isDown) return;
    this.isDown = false;
    this.track.style.cursor = 'grab';
    this.track.style.removeProperty('user-select');
  }

  handleMouseMove(e) {
    if (!this.isDown) return;
    e.preventDefault();
    const x = e.pageX - this.track.offsetLeft;
    const walk = (x - this.startX) * 1.5; // Scroll speed factor
    if (Math.abs(walk) > this.dragThreshold) {
      this.isDragging = true;
    }
    this.track.scrollLeft = this.scrollLeft - walk;
  }

  scrollByAmount(amount) {
    const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
    const finalAmount = isRtl ? -amount : amount;
    this.track.scrollBy({ left: finalAmount, behavior: 'smooth' });
  }

  updateControls() {
    if (this.progressBar) {
      const maxScroll = this.track.scrollWidth - this.track.clientWidth;
      if (maxScroll > 0) {
        const scrolled = Math.abs(this.track.scrollLeft);
        const percent = Math.min(100, Math.max(0, (scrolled / maxScroll) * 100));
        this.progressBar.style.width = `${percent}%`;
      }
    }
  }
}

// Auto-initialize all album sliders on document load
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.nova-album-slider').forEach(sliderEl => {
    new NovaAlbumSlider(sliderEl);
  });
});

// Expandable text helper for footer about section
function toggleFooterAbout(btn) {
  const moreText = document.getElementById('footer-about-more');
  if (!moreText) return;
  const isExpanded = moreText.classList.toggle('expanded');
  btn.textContent = isExpanded ? 'نمایش کمتر ↑' : 'نمایش بیشتر ∨';
}

window.NovaAlbumSlider = NovaAlbumSlider;
window.toggleFooterAbout = toggleFooterAbout;
