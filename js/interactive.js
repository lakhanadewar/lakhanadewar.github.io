/**
 * ═══════════════════════════════════════════════════════════════════════════
 * INTERACTIVE FEATURES SYSTEM (PERFORMANCE OPTIMIZED)
 * ═══════════════════════════════════════════════════════════════════════════
 * Optional interactive enhancements with lazy loading and minimal overhead
 * Features ONLY load when user explicitly enables them
 * Zero performance impact when features are disabled
 */

(() => {
  'use strict';

  const STORAGE_KEY = 'portfolio_interactive_settings';
  const features = {};
  let settings = {};
  let settingsModalCreated = false;

  // ═══════════════════════════════════════════════════════════════════════
  // PERFORMANCE UTILITIES
  // ═══════════════════════════════════════════════════════════════════════

  // Throttle function to limit execution rate
  function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  // Request Idle Callback polyfill for better performance
  const requestIdleCallback = window.requestIdleCallback || function(cb) {
    const start = Date.now();
    return setTimeout(() => {
      cb({
        didTimeout: false,
        timeRemaining: () => Math.max(0, 50 - (Date.now() - start))
      });
    }, 1);
  };

  // ═══════════════════════════════════════════════════════════════════════
  // 1. SETTINGS MANAGEMENT (LIGHTWEIGHT)
  // ═══════════════════════════════════════════════════════════════════════

  function loadSettings() {
    const data = window.PORTFOLIO_DATA?.interactiveFeatures;
    if (!data) return {};

    // Initialize default settings (all disabled)
    const defaults = {};
    Object.keys(data).forEach(key => {
      defaults[key] = data[key].defaultEnabled || false;
    });

    // Load from localStorage or use defaults
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? { ...defaults, ...JSON.parse(stored) } : defaults;
  }

  function saveSettings(newSettings) {
    settings = { ...settings, ...newSettings };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    applySettings();
  }

  function applySettings() {
    Object.keys(settings).forEach(key => {
      if (features[key]) {
        settings[key] ? features[key].enable() : features[key].disable();
      }
    });
  }

  // ═══════════════════════════════════════════════════════════════════════
  // 2. SETTINGS PANEL UI (LAZY LOADED)
  // ═══════════════════════════════════════════════════════════════════════

  function createSettingsPanel() {
    if (settingsModalCreated) return; // Already created
    
    const data = window.PORTFOLIO_DATA?.interactiveFeatures;
    if (!data) return;

    // Settings modal (created once on first open)
    const modal = document.createElement('div');
    modal.className = 'settings-modal';
    modal.innerHTML = `
      <div class="settings-modal__overlay"></div>
      <div class="settings-modal__content">
        <div class="settings-modal__header">
          <h2><i class="fa-solid fa-sliders"></i> Interactive Features</h2>
          <button class="settings-modal__close" aria-label="Close settings">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div class="settings-modal__body">
          <p class="settings-modal__desc">Enable optional interactive features to enhance your experience. All features respect system accessibility preferences.</p>
          <div class="settings-list">
            ${Object.keys(data).map(key => {
              const feat = data[key];
              const checked = settings[key] ? 'checked' : '';
              return `
                <div class="settings-item">
                  <div class="settings-item__info">
                    <div class="settings-item__icon"><i class="${feat.icon}"></i></div>
                    <div>
                      <h3 class="settings-item__label">${feat.label}</h3>
                      <p class="settings-item__desc">${feat.description}</p>
                    </div>
                  </div>
                  <label class="settings-toggle">
                    <input type="checkbox" data-feature="${feat.id}" ${checked}>
                    <span class="settings-toggle__slider"></span>
                  </label>
                </div>
              `;
            }).join('')}
          </div>
        </div>
        <div class="settings-modal__footer">
          <button class="btn btn-secondary settings-modal__reset">Reset to Defaults</button>
          <button class="btn btn-primary settings-modal__save">Save & Close</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    settingsModalCreated = true;

    // Event listeners
    modal.querySelector('.settings-modal__overlay').addEventListener('click', () => {
      modal.classList.remove('is-open');
    });
    
    modal.querySelector('.settings-modal__close').addEventListener('click', () => {
      modal.classList.remove('is-open');
    });

    modal.querySelector('.settings-modal__save').addEventListener('click', () => {
      const newSettings = {};
      modal.querySelectorAll('input[type="checkbox"]').forEach(input => {
        newSettings[input.dataset.feature] = input.checked;
      });
      saveSettings(newSettings);
      modal.classList.remove('is-open');
      
      // Show success toast
      showToast('Settings saved successfully!', 'success');
    });

    modal.querySelector('.settings-modal__reset').addEventListener('click', () => {
      if (confirm('Reset all interactive features to default (off)?')) {
        const defaults = {};
        Object.keys(data).forEach(key => {
          defaults[key] = false;
        });
        saveSettings(defaults);
        modal.querySelectorAll('input[type="checkbox"]').forEach(input => {
          input.checked = false;
        });
        showToast('Settings reset to defaults', 'info');
      }
    });

    // ESC to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) {
        modal.classList.remove('is-open');
      }
    });

    return modal;
  }

  function createFloatingButton() {
    // Lightweight floating button (always present)
    const btn = document.createElement('button');
    btn.className = 'settings-float-btn';
    btn.innerHTML = '<i class="fa-solid fa-sliders" aria-hidden="true"></i>';
    btn.setAttribute('aria-label', 'Open settings');
    btn.title = 'Interactive Features';

    btn.addEventListener('click', () => {
      // Lazy create settings modal on first click
      const modal = document.querySelector('.settings-modal') || createSettingsPanel();
      modal.classList.add('is-open');
    });

    document.body.appendChild(btn);
  }

  // Simple toast notification
  function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `settings-toast settings-toast--${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('is-visible'), 10);
    setTimeout(() => {
      toast.classList.remove('is-visible');
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }

  // ═══════════════════════════════════════════════════════════════════════
  // 3. FEATURE: 3D CARD TILT (OPTIMIZED)
  // ═══════════════════════════════════════════════════════════════════════

  features.cardTilt = {
    enabled: false,
    cards: [],

    enable() {
      if (this.enabled) return;
      this.enabled = true;
      
      // Use idle callback to avoid blocking main thread
      requestIdleCallback(() => {
        this.cards = Array.from(document.querySelectorAll('.project-card, .cert-card, .blog-card'));
        
        this.cards.forEach(card => {
          card.addEventListener('mousemove', this.handleMouseMove);
          card.addEventListener('mouseleave', this.handleMouseLeave);
          card.style.transformStyle = 'preserve-3d';
        });
      });
    },

    disable() {
      if (!this.enabled) return;
      this.enabled = false;
      
      this.cards.forEach(card => {
        card.removeEventListener('mousemove', this.handleMouseMove);
        card.removeEventListener('mouseleave', this.handleMouseLeave);
        card.style.transform = '';
      });
      this.cards = [];
    },

    handleMouseMove(e) {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    },

    handleMouseLeave(e) {
      const card = e.currentTarget;
      card.style.transform = '';
    }
  };

  // ═══════════════════════════════════════════════════════════════════════
  // 4. FEATURE: CURSOR TRAIL (OPTIMIZED WITH RAF)
  // ═══════════════════════════════════════════════════════════════════════

  features.cursorTrail = {
    enabled: false,
    particles: [],
    canvas: null,
    ctx: null,
    animationId: null,
    mouse: { x: 0, y: 0 },
    isAnimating: false,

    enable() {
      if (this.enabled) return;
      this.enabled = true;
      
      // Use idle callback for non-critical setup
      requestIdleCallback(() => {
        // Create canvas
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'cursor-trail-canvas';
        this.canvas.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 9999;';
        document.body.appendChild(this.canvas);
        
        this.ctx = this.canvas.getContext('2d', { alpha: true, desynchronized: true });
        this.resize();
        
        // Event listeners
        window.addEventListener('resize', this.resize.bind(this));
        document.addEventListener('mousemove', this.handleMouseMove.bind(this));
        
        this.animate();
      });
    },

    disable() {
      if (!this.enabled) return;
      this.enabled = false;
      
      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
        this.animationId = null;
      }
      
      if (this.canvas) {
        this.canvas.remove();
        this.canvas = null;
      }
      
      this.particles = [];
      this.isAnimating = false;
    },

    resize() {
      if (!this.canvas) return;
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    },

    handleMouseMove(e) {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      
      // Throttled particle creation (max 50 particles)
      if (this.particles.length < 50 && Math.random() > 0.5) {
        this.particles.push({
          x: this.mouse.x,
          y: this.mouse.y,
          size: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          life: 1
        });
      }
    },

    animate() {
      if (!this.enabled || !this.ctx) return;
      
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      // Update and draw particles (optimized loop)
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        
        p.x += p.speedX;
        p.y += p.speedY;
        p.life -= 0.025;
        
        if (p.life <= 0) {
          this.particles.splice(i, 1);
          continue;
        }
        
        // Cache accent color
        if (!this.accentColor) {
          this.accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent') || '#7209b7';
        }
        
        this.ctx.fillStyle = this.accentColor + Math.floor(p.life * 255).toString(16).padStart(2, '0');
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        this.ctx.fill();
      }
      
      this.animationId = requestAnimationFrame(this.animate.bind(this));
    }
  };

  // ═══════════════════════════════════════════════════════════════════════
  // 5. FEATURE: READING PROGRESS BAR (THROTTLED)
  // ═══════════════════════════════════════════════════════════════════════

  features.readingProgress = {
    enabled: false,
    bar: null,
    throttledUpdate: null,

    enable() {
      if (this.enabled) return;
      this.enabled = true;
      
      // Create progress bar
      this.bar = document.createElement('div');
      this.bar.className = 'reading-progress-bar';
      document.body.appendChild(this.bar);
      
      // Throttled scroll handler for performance
      this.throttledUpdate = throttle(this.updateProgress.bind(this), 16); // ~60fps
      window.addEventListener('scroll', this.throttledUpdate, { passive: true });
      this.updateProgress();
    },

    disable() {
      if (!this.enabled) return;
      this.enabled = false;
      
      if (this.throttledUpdate) {
        window.removeEventListener('scroll', this.throttledUpdate);
      }
      
      if (this.bar) {
        this.bar.remove();
        this.bar = null;
      }
    },

    updateProgress() {
      if (!this.bar) return;
      
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
      this.bar.style.width = Math.min(scrollPercent, 100) + '%';
    }
  };

  // ═══════════════════════════════════════════════════════════════════════
  // 6. FEATURE: SOUND EFFECTS (LAZY AUDIO CONTEXT)
  // ═══════════════════════════════════════════════════════════════════════

  features.soundEffects = {
    enabled: false,
    audioContext: null,
    listeners: [],

    enable() {
      if (this.enabled) return;
      this.enabled = true;
      
      // Add listeners to interactive elements (lazy)
      requestIdleCallback(() => {
        const clickHandler = () => this.play('click');
        const hoverHandler = () => this.play('hover');
        
        document.querySelectorAll('button, a, .filter-pill').forEach(el => {
          el.addEventListener('click', clickHandler);
          this.listeners.push({ el, type: 'click', handler: clickHandler });
        });
        
        document.querySelectorAll('.skill-pill, .project-card, .cert-card').forEach(el => {
          el.addEventListener('mouseenter', hoverHandler);
          this.listeners.push({ el, type: 'mouseenter', handler: hoverHandler });
        });
      });
    },

    disable() {
      if (!this.enabled) return;
      this.enabled = false;
      
      // Remove all listeners
      this.listeners.forEach(({ el, type, handler }) => {
        el.removeEventListener(type, handler);
      });
      this.listeners = [];
      
      // Close audio context to free resources
      if (this.audioContext && this.audioContext.state !== 'closed') {
        this.audioContext.close();
        this.audioContext = null;
      }
    },

    play(type) {
      if (!this.enabled) return;
      
      // Lazy create audio context (needs user interaction)
      if (!this.audioContext) {
        try {
          this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
          console.log('Web Audio API not supported');
          return;
        }
      }
      
      const ctx = this.audioContext;
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      // Different sounds for different interactions (optimized)
      if (type === 'click') {
        oscillator.frequency.value = 800;
        gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.08);
      } else if (type === 'hover') {
        oscillator.frequency.value = 600;
        gainNode.gain.setValueAtTime(0.04, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.04);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.04);
      }
    }
  };

  // ═══════════════════════════════════════════════════════════════════════
  // 7. INITIALIZATION (MINIMAL OVERHEAD)
  // ═══════════════════════════════════════════════════════════════════════

  function init() {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      console.log('Interactive features disabled: user prefers reduced motion');
      return;
    }

    // Load settings (lightweight)
    settings = loadSettings();
    
    // Only create floating button (deferred)
    requestIdleCallback(() => {
      createFloatingButton();
    });
    
    // Apply saved settings (features load lazily only if enabled)
    const hasEnabledFeatures = Object.values(settings).some(v => v === true);
    if (hasEnabledFeatures) {
      // Defer feature activation slightly to avoid blocking initial page load
      requestIdleCallback(() => {
        applySettings();
      });
    }
  }

  // Initialize when DOM is ready (non-blocking)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // If already loaded, use idle callback
    requestIdleCallback(init);
  }

  // Expose for debugging (optional)
  if (typeof window !== 'undefined') {
    window.InteractiveFeatures = { features, settings, saveSettings };
  }

})();
