// ─── Shared across all pages ──────────────────────────────────────────────────
// Depends on content.js being loaded first.

const data = window.PORTFOLIO_DATA;

// ─── Theme ────────────────────────────────────────────────────────────────────
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  // Update the theme toggle icon (FA sun / moon)
  const icon = document.querySelector(".theme-toggle i");
  if (icon) icon.className = theme === "dark" ? "fa-solid fa-moon" : "fa-solid fa-sun";
}

function initTheme() {
  const stored = localStorage.getItem("theme");
  const preferred = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  applyTheme(stored || preferred);
}

function bindThemeToggle() {
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const cur = document.documentElement.getAttribute("data-theme");
    applyTheme(cur === "dark" ? "light" : "dark");
  });
}

// ─── Hamburger (mobile nav) ───────────────────────────────────────────────────
function initHamburger() {
  const btn = document.getElementById("nav-hamburger");
  const header = document.querySelector(".navbar");
  if (!btn || !header) return;

  function openMenu() {
    header.classList.add("navbar--open");
    btn.setAttribute("aria-expanded", "true");
    const icon = btn.querySelector("i");
    if (icon) icon.className = "fa-solid fa-xmark";
  }
  function closeMenu() {
    header.classList.remove("navbar--open");
    btn.setAttribute("aria-expanded", "false");
    const icon = btn.querySelector("i");
    if (icon) icon.className = "fa-solid fa-bars";
  }

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    header.classList.contains("navbar--open") ? closeMenu() : openMenu();
  });

  // Close when a link is clicked
  document.getElementById("nav-links")?.addEventListener("click", closeMenu);

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (!header.contains(e.target)) closeMenu();
  });

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
}

// ─── Navigation ───────────────────────────────────────────────────────────────
function renderNavigation() {
  const parts = window.location.pathname.split("/");
  const path = parts[parts.length - 1] || "index.html";

  const brand = document.getElementById("brand-name");
  if (brand) brand.textContent = data.profile.name;

  const navEl = document.getElementById("nav-links");
  if (!navEl) return;

  navEl.innerHTML = data.navigation
    .map((item) => {
      const active = item.href === path || (path === "" && item.href === "index.html");
      const icon = item.faIcon ? `<i class="${item.faIcon}" aria-hidden="true"></i>` : "";
      return `<li><a href="${item.href}"${active ? ' class="is-active"' : ""}>${icon}<span>${item.label}</span></a></li>`;
    })
    .join("");
}

// ─── Reveal animation ─────────────────────────────────────────────────────────
function setupReveal() {
  const obs = new IntersectionObserver(
    (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("is-visible"); }),
    { threshold: 0.05 }
  );
  document.querySelectorAll(".reveal:not(.is-visible)").forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.classList.add("is-visible");
    } else {
      obs.observe(el);
    }
  });
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function setFooter() {
  const fn = document.getElementById("footer-name");
  const fy = document.getElementById("footer-year");
  if (fn) fn.textContent = data.profile.name;
  if (fy) fy.textContent = new Date().getFullYear();
}

// ─── Page init ────────────────────────────────────────────────────────────────
function initPage(title) {
  initTheme();
  renderNavigation();
  bindThemeToggle();
  initHamburger();
  setFooter();
  if (title) document.title = `${data.profile.name} | ${title}`;
}
