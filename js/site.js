(function () {
  "use strict";

  var toggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("site-nav");

  function setMenu(open) {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    nav.classList.toggle("is-open", open);
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) setMenu(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        toggle.focus();
      }
    });

    window.addEventListener("resize", function () {
      if (window.matchMedia("(min-width: 960px)").matches) setMenu(false);
    });
  }

  var header = document.getElementById("site-header");
  var heroLogo = document.getElementById("hero-logo");
  var sentinel = document.querySelector(".top-sentinel");
  var logoLink = header ? header.querySelector(".logo") : null;

  function setHeaderLogo(show) {
    if (!header) return;
    header.classList.toggle("has-logo", show);
    if (logoLink) {
      logoLink.setAttribute("aria-hidden", show ? "false" : "true");
      if (show) logoLink.removeAttribute("tabindex");
      else logoLink.setAttribute("tabindex", "-1");
    }
  }

  if (header && "IntersectionObserver" in window) {
    if (sentinel) {
      var solidObserver = new IntersectionObserver(function (entries) {
        header.classList.toggle("is-solid", !entries[0].isIntersecting);
      }, { threshold: 0 });
      solidObserver.observe(sentinel);
    } else {
      header.classList.add("is-solid");
    }
    if (heroLogo) {
      var headerHeight = Math.round(header.getBoundingClientRect().height) || 78;
      var logoObserver = new IntersectionObserver(function (entries) {
        setHeaderLogo(!entries[0].isIntersecting);
      }, { threshold: 0, rootMargin: "-" + headerHeight + "px 0px 0px 0px" });
      logoObserver.observe(heroLogo);
    } else {
      setHeaderLogo(true);
    }
  }

  // Live Open / Closed indicator in Georgia local time (America/New_York)
  var statusEls = document.querySelectorAll("[data-open-status]");
  if (statusEls.length && "Intl" in window && Intl.DateTimeFormat) {
    try {
      var parts = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/New_York",
        weekday: "short",
        hour: "numeric",
        minute: "numeric",
        hour12: false
      }).formatToParts(new Date());
      var map = {};
      parts.forEach(function (part) { map[part.type] = part.value; });
      var day = map.weekday;
      var hour = parseInt(map.hour, 10);
      var isWeekday = day === "Mon" || day === "Tue" || day === "Wed" || day === "Thu" || day === "Fri";
      var isOpenNow = isWeekday && hour >= 8 && hour < 18;

      Array.prototype.forEach.call(statusEls, function (el) {
        el.classList.toggle("is-open", isOpenNow);
        if (isOpenNow) {
          el.textContent = "Open now · Closes 6 PM ET";
        } else if (isWeekday && hour < 8) {
          el.textContent = "Closed now · Opens today at 8 AM";
        } else {
          el.textContent = "Closed now · Mon–Fri 8 AM–6 PM";
        }
      });
    } catch (_) {
      // Leave default static hours text intact if timezone formatting is unavailable.
    }
  }

  // Lazy-load interactive Google Map iframe on user click
  var mapButton = document.querySelector("[data-load-map]");
  if (mapButton) {
    mapButton.addEventListener("click", function () {
      var host = document.querySelector("[data-map-frame]");
      if (!host || host.querySelector("iframe")) return;
      var frame = document.createElement("iframe");
      var query = "Gray Commercial Tire and Auto, 121 Homer Roberts Rd, Gray, GA 31032";
      frame.title = "Map of " + query;
      frame.src = "https://maps.google.com/maps?q=" + encodeURIComponent(query) + "&z=15&output=embed";
      frame.loading = "lazy";
      frame.referrerPolicy = "no-referrer-when-downgrade";
      frame.setAttribute("width", "600");
      frame.setAttribute("height", "360");
      frame.setAttribute("allowfullscreen", "");
      host.appendChild(frame);
      mapButton.hidden = true;
    });
  }

  // Scroll-reveal animation
  var revealNodes = document.querySelectorAll(".reveal");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (revealNodes.length && !reduceMotion && "IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -5% 0px" });
    Array.prototype.forEach.call(revealNodes, function (node) {
      revealObserver.observe(node);
    });
  } else {
    Array.prototype.forEach.call(revealNodes, function (node) {
      node.classList.add("is-in");
    });
  }

  // Pre-select service dropdown when arriving via ?service=...#contact
  var serviceSelect = document.getElementById("quote-service");
  if (serviceSelect && window.location.search) {
    var requestedService = new URLSearchParams(window.location.search).get("service");
    if (requestedService) {
      Array.prototype.some.call(serviceSelect.options, function (opt) {
        if (opt.textContent === requestedService || opt.value === requestedService) {
          serviceSelect.value = opt.value || opt.textContent;
          return true;
        }
        return false;
      });
    }
  }

  // Local preview notice on thanks.html
  var preview = document.getElementById("thanks-preview");
  var live = document.getElementById("thanks-live");
  if (preview && live && new URLSearchParams(window.location.search).get("preview") === "local") {
    live.hidden = true;
    preview.hidden = false;
  }

  // Netlify Forms submission handler
  var form = document.querySelector("form[name='quote']");
  if (!form) return;

  var error = document.getElementById("form-error");
  var button = form.querySelector("[type='submit']");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    Array.prototype.forEach.call(form.querySelectorAll("input, textarea"), function (field) {
      if (field.type !== "hidden" && typeof field.value === "string") {
        field.value = field.value.trim();
      }
    });
    if (!form.reportValidity()) return;

    if (button) button.disabled = true;
    if (error) error.hidden = true;

    var host = window.location.hostname;
    var local = host === "localhost" || host === "127.0.0.1" || host === "[::1]" || host === "";
    if (local) {
      window.location.href = "thanks.html?preview=local";
      return;
    }

    var payload = new URLSearchParams(new FormData(form)).toString();
    var posted = fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: payload
    });
    var timedOut = new Promise(function (_, reject) {
      setTimeout(function () { reject(new Error("timeout")); }, 8000);
    });
    Promise.race([posted, timedOut]).then(function (response) {
      if (!response || !response.ok) throw new Error("not accepted");
      window.location.href = "thanks.html";
    }).catch(function () {
      if (button) button.disabled = false;
      if (error) error.hidden = false;
    });
  });
})();
