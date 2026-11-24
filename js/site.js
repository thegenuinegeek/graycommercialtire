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
      var headerHeight = Math.round(header.getBoundingClientRect().height) || 80;
      var logoObserver = new IntersectionObserver(function (entries) {
        setHeaderLogo(!entries[0].isIntersecting);
      }, { threshold: 0, rootMargin: "-" + headerHeight + "px 0px 0px 0px" });
      logoObserver.observe(heroLogo);
    } else {
      setHeaderLogo(true);
    }
  }

  var mapButton = document.querySelector("[data-load-map]");
  if (mapButton) {
    mapButton.addEventListener("click", function () {
      var host = document.querySelector("[data-map-frame]");
      if (!host || host.querySelector("iframe")) return;
      var frame = document.createElement("iframe");
      var query = "121 Homer Roberts Rd, Gray, GA 31032";
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

  var preview = document.getElementById("thanks-preview");
  var live = document.getElementById("thanks-live");
  if (preview && live && new URLSearchParams(window.location.search).get("preview") === "local") {
    live.hidden = true;
    preview.hidden = false;
  }

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
