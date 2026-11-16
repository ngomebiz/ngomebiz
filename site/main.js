(function () {
  "use strict";

  var root = document.documentElement;

  // TODO: replace with the real store listings
  var STORE_LINKS = {
    ios: "https://apps.apple.com/app/idXXXXXXXXXX",
    android: "https://play.google.com/store/apps/details?id=app.ngomebiz"
  };

  function save(key, value) {
    try { localStorage.setItem(key, value); } catch (e) {}
  }

  // Store buttons
  document.querySelectorAll("[data-store]").forEach(function (a) {
    a.href = STORE_LINKS[a.getAttribute("data-store")];
  });

  // Theme toggle
  var themeBtn = document.getElementById("theme-toggle");
  function syncThemeLabel() {
    var dark = root.classList.contains("dark");
    themeBtn.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
  }
  themeBtn.addEventListener("click", function () {
    var dark = root.classList.toggle("dark");
    save("ngome-theme", dark ? "dark" : "light");
    syncThemeLabel();
  });
  syncThemeLabel();

  // Language toggle (English / Kiswahili)
  var langBtn = document.getElementById("lang-toggle");
  function syncLangLabel() {
    var sw = root.getAttribute("data-lang") === "sw";
    langBtn.setAttribute("aria-label", sw ? "Badilisha lugha kuwa Kiingereza" : "Switch language to Kiswahili");
  }
  langBtn.addEventListener("click", function () {
    var next = root.getAttribute("data-lang") === "sw" ? "en" : "sw";
    root.setAttribute("data-lang", next);
    save("ngome-lang", next);
    syncLangLabel();
  });
  syncLangLabel();

  // Screenshot carousel: native scroll-snap, buttons just scroll by one slide
  var track = document.getElementById("carousel");
  var prev = document.querySelector("[data-carousel-prev]");
  var next = document.querySelector("[data-carousel-next]");
  var controls = document.querySelector("[data-carousel-controls]");
  if (track && prev && next) {
    var step = function () {
      var slide = track.querySelector("li");
      return slide ? slide.getBoundingClientRect().width + 24 : 300;
    };
    var update = function () {
      var max = track.scrollWidth - track.clientWidth;
      controls.style.visibility = max > 4 ? "visible" : "hidden";
      prev.disabled = track.scrollLeft <= 4;
      next.disabled = track.scrollLeft >= max - 4;
    };
    prev.addEventListener("click", function () { track.scrollBy({ left: -step(), behavior: "smooth" }); });
    next.addEventListener("click", function () { track.scrollBy({ left: step(), behavior: "smooth" }); });
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  document.getElementById("year").textContent = new Date().getFullYear();
})();
