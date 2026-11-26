(function () {
  "use strict";

  document.documentElement.classList.add("js");

  // Mobile Menu Toggle
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
      if (window.matchMedia("(min-width: 980px)").matches) setMenu(false);
    });
  }

  // Hide duplicate header logo while centered hero logo is in view on homepage
  var header = document.getElementById("site-header");
  var heroLogo = document.getElementById("hero-logo");
  var headerLogoLink = header ? header.querySelector(".logo") : null;
  if (header && heroLogo && "IntersectionObserver" in window) {
    var setHeaderLogoHidden = function (hide) {
      header.classList.toggle("hide-header-logo", hide);
      if (headerLogoLink) {
        headerLogoLink.setAttribute("aria-hidden", hide ? "true" : "false");
        if (hide) headerLogoLink.setAttribute("tabindex", "-1");
        else headerLogoLink.removeAttribute("tabindex");
      }
    };
    setHeaderLogoHidden(window.scrollY < 120);
    var heroLogoObserver = new IntersectionObserver(function (entries) {
      setHeaderLogoHidden(entries[0].isIntersecting);
    }, { threshold: 0.1 });
    heroLogoObserver.observe(heroLogo);
  }

  // Midas-Style Hero Action Stack Accordion
  var drawers = document.querySelectorAll(".action-drawer");
  if (drawers.length) {
    Array.prototype.forEach.call(drawers, function (drawer) {
      var btn = drawer.querySelector(".drawer-toggle");
      var body = drawer.querySelector(".drawer-body");
      var sign = drawer.querySelector(".drawer-sign");
      if (!btn || !body) return;

      btn.addEventListener("click", function () {
        var isExpanded = btn.getAttribute("aria-expanded") === "true";
        Array.prototype.forEach.call(drawers, function (other) {
          var oBtn = other.querySelector(".drawer-toggle");
          var oBody = other.querySelector(".drawer-body");
          var oSign = other.querySelector(".drawer-sign");
          if (!oBtn || !oBody) return;
          var shouldOpen = other === drawer ? !isExpanded : false;
          oBtn.setAttribute("aria-expanded", shouldOpen ? "true" : "false");
          oBody.hidden = !shouldOpen;
          if (oSign) oSign.textContent = shouldOpen ? "−" : "+";
        });
      });
    });
  }

  // Hero Quick Quote Launcher -> smoothly jumps to #contact & pre-fills service + vehicle
  var quickForm = document.getElementById("hero-quick-quote");
  if (quickForm) {
    quickForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var quickService = document.getElementById("quick-service");
      var quickVehicle = document.getElementById("quick-vehicle");
      var mainService = document.getElementById("quote-service");
      var mainVehicle = document.getElementById("quote-vehicle");
      var mainName = document.getElementById("quote-name");
      var contactSection = document.getElementById("contact");

      if (quickService && mainService && quickService.value) {
        mainService.value = quickService.value;
      }
      if (quickVehicle && mainVehicle && quickVehicle.value.trim()) {
        mainVehicle.value = quickVehicle.value.trim();
      }
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
      if (mainName) {
        setTimeout(function () { mainName.focus({ preventScroll: true }); }, 350);
      }
    });
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
          el.textContent = "Open Now · Closes 6 PM ET";
        } else if (isWeekday && hour < 8) {
          el.textContent = "Closed · Opens Today 8 AM";
        } else {
          el.textContent = "Closed · Mon–Fri 8 AM–6 PM";
        }
      });
    } catch (_) {
      // Leave static hours text intact if timezone formatting is unavailable.
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
