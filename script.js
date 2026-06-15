/* ============================================================
   LUMINARY MARKET GROUP — script.js
   ------------------------------------------------------------
   Vanilla JS, no dependencies. Handles:
     1. Mobile nav toggle (hamburger)
     2. Sticky-header shadow on scroll
     3. Smooth scroll for # links (with fixed-header offset)
     4. Scroll-reveal animations (IntersectionObserver)
     5. Auto-updating copyright year
   All effects degrade gracefully and respect reduced-motion.
   ============================================================ */
(function () {
  "use strict";

  /* Honor the OS "reduce motion" accessibility setting */
  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---------- 1. MOBILE NAV TOGGLE ---------- */
  var navToggle = document.getElementById("navToggle");
  var primaryNav = document.getElementById("primaryNav");

  function closeNav() {
    if (!primaryNav || !navToggle) return;
    primaryNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
  }

  function openNav() {
    if (!primaryNav || !navToggle) return;
    primaryNav.classList.add("is-open");
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Close menu");
  }

  if (navToggle && primaryNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = primaryNav.classList.contains("is-open");
      isOpen ? closeNav() : openNav();
    });

    /* Close the menu after tapping any link inside it */
    primaryNav.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeNav();
    });

    /* Close on Escape for keyboard users */
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
  }

  /* ---------- 2. STICKY-HEADER SHADOW ON SCROLL ---------- */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- 3. SMOOTH SCROLL WITH HEADER OFFSET ----------
     CSS handles smooth scrolling, but we add JS so the target
     clears the fixed header precisely and we manage focus for
     accessibility. */
  var headerHeight = header ? header.offsetHeight : 70;

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var id = link.getAttribute("href");
      if (id === "#" || id.length < 2) return;

      var target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      var top =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerHeight -
        12;

      window.scrollTo({
        top: top,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });

      /* Move keyboard focus to the section for screen readers */
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });

      /* Keep the URL hash in sync without an extra jump */
      if (history.replaceState) history.replaceState(null, "", id);
    });
  });

  /* ---------- 4. SCROLL-REVEAL ANIMATIONS ----------
     Adds .is-visible as each .reveal element scrolls into view.
     Falls back to simply showing everything if unsupported or
     reduced-motion is requested. */
  var revealEls = document.querySelectorAll(".reveal");

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else {
    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target); /* animate once, then stop watching */
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach(function (el, i) {
      /* Tiny stagger so grouped items cascade in nicely */
      el.style.transitionDelay = (i % 6) * 60 + "ms";
      observer.observe(el);
    });
  }

  /* ---------- 5. AUTO-UPDATING COPYRIGHT YEAR ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
