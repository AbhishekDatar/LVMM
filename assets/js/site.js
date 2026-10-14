/* Las Vegas Marathi Mandal — shared site script
   - Injects header / footer (single source of truth, works from file://)
   - Icons: <i data-icon="calendar"></i> is replaced with an inline SVG
   - Mobile drawer, scroll state, reveal animations, lightbox, copy buttons
   - Lightweight cart in localStorage (payment integration to be added later)
*/
(function () {
  "use strict";

  /* ---------------- Config ---------------- */
  const SITE = {
    name: "Las Vegas Marathi Mandal",
    nameMr: "लास व्हेगास मराठी मंडळ",
    email: "lasvegasmarathimandal@gmail.com",
    shalaEmail: "lvmmshala@gmail.com",
    zelle: "lasvegasmarathimandal@gmail.com",
    announcement: {
      html: 'दीपोत्सव 2026 · Saturday, Nov 7 — tickets are open and participation is welcome! <a href="events.html">See details →</a>',
    },
  };

  const PRODUCTS = {
    "adult-2026": { name: "2026 Annual Membership — Adult", price: 40, img: "assets/img/logo.png", note: "Over 18 years of age" },
    "child-2026": { name: "2026 Annual Membership — Child", price: 20, img: "assets/img/kids.png", note: "Ages 12–18" },
  };

  const NAV = [
    { href: "index.html", label: "Home", key: "home" },
    { href: "about.html", label: "About", key: "about" },
    { href: "events.html", label: "Events", key: "events" },
    { href: "membership.html", label: "Membership", key: "membership" },
    { href: "marathi-shala.html", label: "Marathi Shala", key: "shala" },
    { href: "gallery.html", label: "Gallery", key: "gallery" },
    {
      label: "Community", key: "community",
      children: [
        { href: "committee.html", label: "Executive Committee", key: "committee" },
        { href: "youth.html", label: "Vegas Yuva — Youth Group", key: "youth" },
        { href: "marathi-vrutta.html", label: "मराठी वृत्त — Marathi Corner", key: "vrutta" },
        { href: "sponsorship.html", label: "Sponsorship & Donations", key: "sponsorship" },
        { href: "bylaws.html", label: "Bylaws", key: "bylaws" },
      ],
    },
  ];

  /* ---------------- Icons (Lucide-style, stroke) ---------------- */
  const P = {
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z"/>',
    cart: '<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    chevronDown: '<path d="m6 9 6 6 6-6"/>',
    chevronLeft: '<path d="m15 18-6-6 6-6"/>',
    chevronRight: '<path d="m9 18 6-6-6-6"/>',
    arrowRight: '<path d="M5 12h14M12 5l7 7-7 7"/>',
    external: '<path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
    user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    heart: '<path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7Z"/>',
    book: '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>',
    music: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
    sparkles: '<path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/><path d="M5 3v4M19 17v4M3 5h4M17 19h4"/>',
    flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.4-.5-2-1-3-1.1-2.1-.2-4 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.2.4-2.3 1-3.3.3 1.6 1.6 2.8 3.5 2.8Z"/>',
    gift: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7M7.5 8a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8s1-5 4.5-5a2.5 2.5 0 0 1 0 5"/>',
    camera: '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z"/><circle cx="12" cy="13" r="3"/>',
    star: '<path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1Z"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
    file: '<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5Z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/>',
    graduation: '<path d="M22 10 12 5 2 10l10 5 10-5Z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z"/>',
    video: '<path d="m22 8-6 4 6 4V8Z"/><rect x="2" y="6" width="14" height="12" rx="2"/>',
    mountain: '<path d="m8 3 4 8 5-5 5 15H2L8 3Z"/>',
    film: '<rect x="2" y="2" width="20" height="20" rx="2"/><path d="M7 2v20M17 2v20M2 12h20M2 7h5M2 17h5M17 17h5M17 7h5"/>',
    trophy: '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.7V17c0 .6-.5 1-1 1.2C7.8 18.8 7 20.2 7 22M14 14.7V17c0 .6.5 1 1 1.2 1.2.6 2 2 2 3.8M18 2H6v7a6 6 0 0 0 12 0V2Z"/>',
    flag: '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7"/>',
    utensils: '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>',
    theater: '<path d="M2 10s3-3 3-8M22 10s-3-3-3-8M10 2c0 4.4-3.6 8-8 8M14 2c0 4.4 3.6 8 8 8M2 10s2 2 2 5M22 10s-2 2-2 5M8 15h8M2 22l1-1M22 22l-1-1"/><path d="M12 22a4 4 0 0 0 4-4H8a4 4 0 0 0 4 4Z"/>',
    copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    bank: '<path d="M3 22h18M6 18v-7M10 18v-7M14 18v-7M18 18v-7M12 2l9 5H3Z"/>',
    send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
    trash: '<path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
    lotus: '<path d="M12 20c-4 0-8-2-9-6 3 0 6 1 9 4 3-3 6-4 9-4-1 4-5 6-9 6Z"/><path d="M12 18c-2-2-3-5-3-8 0-2 1-5 3-7 2 2 3 5 3 7 0 3-1 6-3 8Z"/><path d="M8.5 14C6 12.5 4.5 10 4.5 7c2 .3 3.6 1.2 4.7 2.4M15.5 14c2.5-1.5 4-4 4-7-2 .3-3.6 1.2-4.7 2.4"/>',
    instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
    facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3Z"/>',
    whatsapp: '<path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/>',
  };
  const icon = (name, cls) =>
    `<svg ${cls ? `class="${cls}" ` : ""}viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[name] || P.sparkles}</svg>`;

  /* ---------------- Header ---------------- */
  const page = document.body.dataset.page || "";
  const isActive = (item) => item.key === page || (item.children || []).some((c) => c.key === page);

  function navLinks() {
    return NAV.map((item) => {
      if (item.children) {
        return `<div class="nav-drop${isActive(item) ? " active" : ""}">
          <button type="button" aria-expanded="false" aria-haspopup="true">${item.label}${icon("chevronDown")}</button>
          <div class="nav-menu" role="menu">${item.children
            .map((c) => `<a role="menuitem" href="${c.href}"${c.key === page ? ' aria-current="page"' : ""}>${c.label}</a>`)
            .join("")}</div></div>`;
      }
      return `<a href="${item.href}"${item.key === page ? ' aria-current="page"' : ""}>${item.label}</a>`;
    }).join("");
  }

  function drawerLinks() {
    const flat = [];
    NAV.forEach((i) => (i.children ? flat.push(...i.children) : flat.push(i)));
    return flat
      .map((c) => `<a href="${c.href}"${c.key === page ? ' aria-current="page"' : ""}>${c.label}${icon("chevronRight", "")}</a>`)
      .join("")
      .replace(/<svg /g, '<svg width="18" height="18" ');
  }

  const brand = (extra = "") => `
    <a class="brand" href="index.html" aria-label="${SITE.name} — home" ${extra}>
      <img src="assets/img/logo.png" alt="" width="52" height="52">
      <span class="brand-text"><span class="brand-name">Las Vegas Marathi Mandal</span><span class="brand-sub">लास व्हेगास मराठी मंडळ</span></span>
    </a>`;

  const headerEl = document.getElementById("site-header");
  if (headerEl) {
    headerEl.outerHTML = `
      <a class="skip-link" href="#main">Skip to content</a>
      ${SITE.announcement ? `<div class="announce">${SITE.announcement.html}</div>` : ""}
      <header class="site-header" id="top">
        <div class="container header-inner">
          ${brand()}
          <nav class="nav" aria-label="Primary">${navLinks()}</nav>
          <div class="header-actions">
            <a class="cart-link" href="cart.html" aria-label="Cart">${icon("cart")}<span class="cart-count" data-count="0"></span></a>
            <a class="btn btn-primary btn-sm" href="membership.html">Join LVMM</a>
            <button class="menu-toggle" type="button" aria-label="Open menu" aria-controls="drawer">${icon("menu")}</button>
          </div>
        </div>
      </header>
      <div class="drawer" id="drawer" aria-hidden="true">
        <div class="drawer-backdrop" data-close></div>
        <div class="drawer-panel" role="dialog" aria-modal="true" aria-label="Menu">
          <div class="drawer-head">${brand()}<button class="drawer-close" type="button" data-close aria-label="Close menu">${icon("x")}</button></div>
          <nav aria-label="Mobile">${drawerLinks()}</nav>
          <a class="btn btn-primary btn-block" href="membership.html">Become a member</a>
          <a class="btn btn-outline btn-block" style="margin-top:12px" href="cart.html">${icon("cart")} View cart</a>
        </div>
      </div>`;
  }

  /* ---------------- Footer ---------------- */
  const footerEl = document.getElementById("site-footer");
  if (footerEl) {
    const year = new Date().getFullYear();
    footerEl.outerHTML = `
      <footer class="site-footer">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-brand">
              ${brand()}
              <p>A not-for-profit organization bringing together the Marathi community of Las Vegas through festivals, music, dance, theatre and language.</p>
              <p class="mr" style="color:var(--marigold-300);font-size:1.05rem;margin:0">आपली संस्कृती, आपली माणसं.</p>
            </div>
            <div>
              <h4>Explore</h4>
              <ul>
                <li><a href="about.html">About us</a></li>
                <li><a href="events.html">Events</a></li>
                <li><a href="gallery.html">Gallery</a></li>
                <li><a href="marathi-shala.html">Marathi Shala</a></li>
                <li><a href="youth.html">Youth group</a></li>
              </ul>
            </div>
            <div>
              <h4>Get involved</h4>
              <ul>
                <li><a href="membership.html">Membership & tickets</a></li>
                <li><a href="sponsorship.html">Sponsor & donate</a></li>
                <li><a href="committee.html">Committee</a></li>
                <li><a href="bylaws.html">Bylaws</a></li>
                <li><a href="privacy.html">Privacy notice</a></li>
              </ul>
            </div>
            <div>
              <h4>Contact</h4>
              <ul>
                <li class="contact-line">${icon("mail")}<a href="mailto:${SITE.email}">${SITE.email}</a></li>
                <li class="contact-line">${icon("book")}<span>Marathi Shala: <a href="mailto:${SITE.shalaEmail}">${SITE.shalaEmail}</a></span></li>
                <li class="contact-line">${icon("pin")}<span>Las Vegas &amp; Henderson, Nevada</span></li>
              </ul>
            </div>
          </div>
          <div class="footer-bottom">
            <span>© ${year} Las Vegas Marathi Mandal. All rights reserved.</span>
            <span>Made with ❤ by LVMM volunteers</span>
          </div>
        </div>
      </footer>
      <div class="toast" role="status" aria-live="polite"></div>`;
  }

  /* ---------------- Icons ---------------- */
  document.querySelectorAll("i[data-icon]").forEach((el) => {
    const tmp = document.createElement("span");
    tmp.innerHTML = icon(el.dataset.icon, el.className);
    el.replaceWith(tmp.firstElementChild);
  });

  /* ---------------- Header behaviour ---------------- */
  const header = document.querySelector(".site-header");
  const onScroll = () => header && header.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  document.querySelectorAll(".nav-drop > button").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const drop = btn.parentElement;
      const open = !drop.classList.contains("open");
      drop.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", String(open));
      e.stopPropagation();
    });
  });
  document.addEventListener("click", () =>
    document.querySelectorAll(".nav-drop.open").forEach((d) => {
      d.classList.remove("open");
      d.querySelector("button").setAttribute("aria-expanded", "false");
    })
  );

  const drawer = document.getElementById("drawer");
  const setDrawer = (open) => {
    if (!drawer) return;
    drawer.classList.toggle("open", open);
    drawer.setAttribute("aria-hidden", String(!open));
    document.body.style.overflow = open ? "hidden" : "";
  };
  document.querySelector(".menu-toggle")?.addEventListener("click", () => setDrawer(true));
  drawer?.querySelectorAll("[data-close]").forEach((el) => el.addEventListener("click", () => setDrawer(false)));
  document.addEventListener("keydown", (e) => e.key === "Escape" && setDrawer(false));

  /* ---------------- Reveal on scroll ---------------- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else reveals.forEach((el) => el.classList.add("in"));

  /* ---------------- Toast ---------------- */
  let toastTimer;
  function toast(html) {
    const t = document.querySelector(".toast");
    if (!t) return;
    t.innerHTML = html;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 3200);
  }

  /* ---------------- Copy to clipboard ---------------- */
  document.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(btn.dataset.copy);
        const old = btn.textContent;
        btn.textContent = "Copied!";
        setTimeout(() => (btn.textContent = old), 1600);
      } catch { toast("Copy failed — please select the text manually."); }
    });
  });

  /* ---------------- Lightbox ---------------- */
  const galleryLinks = Array.from(document.querySelectorAll("[data-lightbox]"));
  if (galleryLinks.length) {
    const lb = document.createElement("div");
    lb.className = "lightbox";
    lb.setAttribute("role", "dialog");
    lb.setAttribute("aria-modal", "true");
    lb.setAttribute("aria-label", "Photo viewer");
    lb.innerHTML = `<img alt=""><button class="lb-close" aria-label="Close">${icon("x")}</button>
      <button class="lb-prev" aria-label="Previous photo">${icon("chevronLeft")}</button>
      <button class="lb-next" aria-label="Next photo">${icon("chevronRight")}</button><div class="lb-count"></div>`;
    document.body.appendChild(lb);
    const img = lb.querySelector("img");
    let idx = 0;
    const show = (i) => {
      idx = (i + galleryLinks.length) % galleryLinks.length;
      const a = galleryLinks[idx];
      img.src = a.getAttribute("href");
      img.alt = a.querySelector("img")?.alt || "";
      lb.querySelector(".lb-count").textContent = `${idx + 1} / ${galleryLinks.length}`;
    };
    const close = () => { lb.classList.remove("open"); document.body.style.overflow = ""; };
    galleryLinks.forEach((a, i) => a.addEventListener("click", (e) => { e.preventDefault(); show(i); lb.classList.add("open"); document.body.style.overflow = "hidden"; }));
    lb.querySelector(".lb-close").addEventListener("click", close);
    lb.querySelector(".lb-prev").addEventListener("click", () => show(idx - 1));
    lb.querySelector(".lb-next").addEventListener("click", () => show(idx + 1));
    lb.addEventListener("click", (e) => e.target === lb && close());
    document.addEventListener("keydown", (e) => {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(idx - 1);
      if (e.key === "ArrowRight") show(idx + 1);
    });
  }

  /* ---------------- Cart (localStorage; checkout to be integrated later) ---------------- */
  const CART_KEY = "lvmm-cart";
  const readCart = () => { try { return JSON.parse(localStorage.getItem(CART_KEY)) || {}; } catch { return {}; } };
  const writeCart = (c) => { try { localStorage.setItem(CART_KEY, JSON.stringify(c)); } catch {} updateCount(); };
  function updateCount() {
    const n = Object.values(readCart()).reduce((a, b) => a + b, 0);
    document.querySelectorAll(".cart-count").forEach((el) => { el.textContent = n || ""; el.dataset.count = n; });
  }
  updateCount();

  document.querySelectorAll("[data-add-to-cart]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.addToCart;
      if (!PRODUCTS[id]) return;
      const c = readCart();
      c[id] = (c[id] || 0) + 1;
      writeCart(c);
      renderCart();
      toast(`${icon("check")} Added to cart · <a href="cart.html">View cart</a>`);
    });
  });

  const cartRoot = document.querySelector("[data-cart]");
  function renderCart() {
    if (!cartRoot) return;
    const c = readCart();
    const ids = Object.keys(c).filter((id) => PRODUCTS[id] && c[id] > 0);
    const itemsEl = cartRoot.querySelector("[data-cart-items]");
    const emptyEl = cartRoot.querySelector("[data-cart-empty]");
    const fullEl = cartRoot.querySelector("[data-cart-full]");
    emptyEl.hidden = ids.length > 0;
    fullEl.hidden = ids.length === 0;
    let total = 0;
    itemsEl.innerHTML = ids.map((id) => {
      const p = PRODUCTS[id];
      const line = p.price * c[id];
      total += line;
      return `<div class="cart-item">
        <div class="thumb"><img src="${p.img}" alt=""></div>
        <div><strong style="color:var(--maroon-800)">${p.name}</strong><div class="muted" style="font-size:.88rem">${p.note} · $${p.price.toFixed(2)} each</div>
          <div style="display:flex;gap:14px;align-items:center;margin-top:8px">
            <div class="qty"><button type="button" data-dec="${id}" aria-label="Decrease">−</button><span>${c[id]}</span><button type="button" data-inc="${id}" aria-label="Increase">+</button></div>
            <button class="link-btn" type="button" data-remove="${id}">Remove</button>
          </div></div>
        <strong>$${line.toFixed(2)}</strong></div>`;
    }).join("");
    cartRoot.querySelectorAll("[data-cart-total]").forEach((el) => (el.textContent = `$${total.toFixed(2)}`));
  }
  if (cartRoot) {
    renderCart();
    cartRoot.addEventListener("click", (e) => {
      const t = e.target.closest("button");
      if (!t) return;
      const c = readCart();
      if (t.dataset.inc) c[t.dataset.inc]++;
      if (t.dataset.dec) c[t.dataset.dec] = Math.max(0, c[t.dataset.dec] - 1);
      if (t.dataset.remove) delete c[t.dataset.remove];
      if (t.dataset.inc || t.dataset.dec || t.dataset.remove) { writeCart(c); renderCart(); }
    });
  }

  /* ---------------- Demo forms (backend to be connected later) ---------------- */
  document.querySelectorAll("form[data-demo-form]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      const success = document.getElementById(form.dataset.demoForm);
      form.hidden = true;
      if (success) { success.classList.add("show"); success.scrollIntoView({ behavior: "smooth", block: "center" }); }
    });
  });

  window.LVMM = { SITE, PRODUCTS, icon, toast, readCart, writeCart };
})();
