/* ========================================
   MAIN.JS - Portfolio Scripts (Multi-Page)
   ======================================== */

(function ($) {
  "use strict";

  // --- Typed.js (Home page only) ---
  if (document.getElementById("typed")) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.getElementById("typed").textContent = "an AI Engineer";
    } else {
      new Typed("#typed", {
        strings: [
          "an AI Engineer ^3000",
          "an ML Researcher",
          "an Agent Builder"
        ],
        typeSpeed: 55,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
        smartBackspace: true
      });
    }
  }

  // --- Navbar shrink on scroll ---
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 50) {
      $("#topNav").addClass("scrolled");
    } else {
      $("#topNav").removeClass("scrolled");
    }
  });

  // --- Collapse mobile nav on link click ---
  $(".navbar-nav .nav-link").on("click", function () {
    $(".navbar-collapse").collapse("hide");
  });

  // --- Scroll reveal ---
  function revealElements() {
    $(".fade-up").each(function () {
      var elementTop = $(this).offset().top;
      var viewportBottom = $(window).scrollTop() + $(window).height();
      if (elementTop < viewportBottom - 60) {
        $(this).addClass("visible");
      }
    });
  }

  $(window).on("scroll", revealElements);
  // Trigger on load with slight delay for page paint
  setTimeout(revealElements, 100);

  // --- Latest Work auto-populate (Home page) ---
  // Single source of truth = projects.html (ordered newest-first). Takes the
  // top 3 project cards and renders them as Latest Work cards. The static cards
  // in #latestWork are a fallback if the fetch/parse fails (e.g. file://).
  function populateLatestWork() {
    var container = document.getElementById("latestWork");
    if (!container) return;

    fetch("projects.html", { cache: "no-cache" })
      .then(function (res) { return res.text(); })
      .then(function (html) {
        var doc = new DOMParser().parseFromString(html, "text/html");
        var cards = doc.querySelectorAll(".project-grid .project-item .project-card");
        if (!cards.length) return;

        var out = [];

        // Reuse the exact Projects-page card so the home page matches it; only the
        // long description is swapped for the short data-short blurb.
        // The full card (long description) is kept so a click opens the full details.
        var fullCards = [];
        Array.prototype.slice.call(cards, 0, 4).forEach(function (card, idx) {
          var item = card.closest(".project-item");
          var clone = card.cloneNode(true);
          var short = item && item.getAttribute("data-short");
          var p = clone.querySelector("p");
          if (short && p) p.textContent = short;
          fullCards.push(card.cloneNode(true));
          clone.setAttribute("data-qv", String(idx));
          out.push('<div class="col-md-6 col-lg-3 mb-4">' + clone.outerHTML + '</div>');
        });
        window.__qvFullCards = fullCards;

        if (out.length) container.innerHTML = out.join("");
      })
      .catch(function () { /* keep static fallback cards */ });
  }
  populateLatestWork();

  // --- Timeline scroll affordance: fade + hint only while there is more to scroll ---
  $(".h-timeline-wrapper").each(function () {
    var el = this;
    function update() {
      var overflow = el.scrollWidth - el.clientWidth;
      el.classList.toggle("can-scroll", overflow > 4);
      el.classList.toggle("fade-r", overflow - el.scrollLeft > 4);
    }
    $(el).on("scroll", update);
    $(window).on("resize load", update);
    update();
  });

  // --- Project filter (Projects page) ---
  $(".filter-btn").on("click", function () {
    var filter = $(this).data("filter");

    $(".filter-btn").removeClass("active").attr("aria-pressed", "false");
    $(this).addClass("active").attr("aria-pressed", "true");

    $(".earlier-work").prop("open", filter !== "all");

    if (filter === "all") {
      $(".project-item").fadeIn(300);
    } else {
      $(".project-item").each(function () {
        if ($(this).data("category") === filter) {
          $(this).fadeIn(300);
        } else {
          $(this).fadeOut(200);
        }
      });
    }
  });


  // --- In-site PDF viewer ---
  // On-site PDFs (assets/...pdf) open in an overlay instead of leaving the site.
  // Phones and browsers without a built-in PDF viewer keep the normal link.
  (function () {
    var canPreview = function () {
      if (window.matchMedia("(max-width: 767px)").matches) return false;
      if (typeof navigator.pdfViewerEnabled === "boolean") return navigator.pdfViewerEnabled;
      return true;
    };

    var modal, frame, titleEl, openBtn, dlBtn, lastFocus;

    function build() {
      modal = document.createElement("div");
      modal.className = "pdf-modal";
      modal.setAttribute("role", "dialog");
      modal.setAttribute("aria-modal", "true");
      modal.setAttribute("aria-labelledby", "pdfModalTitle");
      modal.innerHTML =
        '<div class="pdf-modal-backdrop" data-close></div>' +
        '<div class="pdf-modal-panel">' +
          '<div class="pdf-modal-bar">' +
            '<span class="pdf-modal-title" id="pdfModalTitle"></span>' +
            '<div class="pdf-modal-actions">' +
              '<a class="pdf-modal-btn" data-open target="_blank" rel="noopener noreferrer"><i class="fas fa-up-right-from-square"></i> Open in new tab</a>' +
              '<a class="pdf-modal-btn" data-download download><i class="fas fa-download"></i> Download</a>' +
              '<button type="button" class="pdf-modal-close" data-close aria-label="Close"><i class="fas fa-xmark"></i></button>' +
            '</div>' +
          '</div>' +
          '<iframe class="pdf-modal-frame" title="Document preview"></iframe>' +
        '</div>';
      document.body.appendChild(modal);
      frame = modal.querySelector("iframe");
      titleEl = modal.querySelector(".pdf-modal-title");
      openBtn = modal.querySelector("[data-open]");
      dlBtn = modal.querySelector("[data-download]");
      modal.addEventListener("click", function (e) {
        if (e.target.closest("[data-close]")) close();
      });
    }

    function open(href, title, isPdf) {
      if (!modal) build();
      lastFocus = document.activeElement;
      titleEl.textContent = title;
      openBtn.href = href;
      dlBtn.href = href;
      dlBtn.style.display = isPdf === false ? "none" : "";
      frame.src = href;
      modal.classList.add("open");
      document.body.style.overflow = "hidden";
      modal.querySelector(".pdf-modal-close").focus();
    }

    function close() {
      modal.classList.remove("open");
      frame.src = "about:blank";
      document.body.style.overflow = "";
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal && modal.classList.contains("open")) { e.preventDefault(); e.stopImmediatePropagation(); close(); }
    });

    document.addEventListener("click", function (e) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var a = e.target.closest("a[href]");
      if (!a || a.closest(".pdf-modal")) return;
      var href = a.getAttribute("href");
      var isPdf = /^(?!https?:|\/\/)[^?#]*\.pdf(?:[?#].*)?$/i.test(href);
      var isReport = /^assets\/reports\/[^?#]*\.html?$/i.test(href);
      if (!isPdf && !isReport) return;
      if (isReport && window.matchMedia("(max-width: 767px)").matches) return;
      if (isPdf && !canPreview()) return;
      e.preventDefault();
      var card = a.closest(".project-card, .pub-card, .patent-card, .work-card");
      var heading = card && card.querySelector("h3, h4");
      var title = heading ? heading.textContent.trim() : (a.textContent.trim() || "Document");
      open(href, title, isPdf);
    });
  })();

  // --- Photo lightbox (Research page kitchen strip) ---
  // Click or press Enter on a dish photo to view it large; arrows/swipe to move, Esc to close.
  (function () {
    var rawImgs = document.querySelectorAll(".gallery-track img");
    if (!rawImgs.length) return;

    var track = document.querySelector(".gallery-track");
    var items = [];
    var srcMap = {};
    var lastFocused = null;
    var currentIndex = 0;

    for (var i = 0; i < rawImgs.length; i++) {
      var img = rawImgs[i];
      var src = img.getAttribute("src") || img.src;
      var alt = img.getAttribute("alt") || "";
      if (!Object.prototype.hasOwnProperty.call(srcMap, src)) {
        srcMap[src] = items.length;
        items.push({ src: src, alt: alt });
      }
      img.setAttribute("tabindex", "0");
      img.setAttribute("role", "button");
      img.setAttribute("aria-label", "View photo: " + alt);
      (function (el, targetIndex) {
        function trigger() { lastFocused = el; open(targetIndex); }
        el.addEventListener("click", trigger);
        el.addEventListener("keydown", function (e) {
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); trigger(); }
        });
      })(img, srcMap[src]);
    }

    var lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("aria-label", "Photo viewer");
    lightbox.innerHTML =
      '<div class="lightbox-backdrop"></div>' +
      '<button type="button" class="lightbox-close" aria-label="Close"><i class="fas fa-xmark"></i></button>' +
      '<button type="button" class="lightbox-prev" aria-label="Previous photo"><i class="fas fa-chevron-left"></i></button>' +
      '<button type="button" class="lightbox-next" aria-label="Next photo"><i class="fas fa-chevron-right"></i></button>' +
      '<img class="lightbox-img" src="" alt="" />' +
      '<div class="lightbox-caption"></div>';
    document.body.appendChild(lightbox);

    var lightboxImg = lightbox.querySelector(".lightbox-img");
    var caption = lightbox.querySelector(".lightbox-caption");
    var closeBtn = lightbox.querySelector(".lightbox-close");

    function render(index) {
      currentIndex = (index + items.length) % items.length;
      var item = items[currentIndex];
      lightboxImg.src = item.src;
      lightboxImg.alt = item.alt;
      caption.textContent = (item.alt ? item.alt + " · " : "") + (currentIndex + 1) + " / " + items.length;
    }

    function open(index) {
      render(index);
      lightbox.classList.add("open");
      if (track) track.classList.add("is-paused");
      document.body.style.overflow = "hidden";
      closeBtn.focus();
    }

    function close() {
      lightbox.classList.remove("open");
      if (track) track.classList.remove("is-paused");
      document.body.style.overflow = "";
      if (lastFocused && lastFocused.focus) lastFocused.focus();
    }

    lightbox.querySelector(".lightbox-backdrop").addEventListener("click", close);
    closeBtn.addEventListener("click", close);
    lightbox.querySelector(".lightbox-prev").addEventListener("click", function () { render(currentIndex - 1); });
    lightbox.querySelector(".lightbox-next").addEventListener("click", function () { render(currentIndex + 1); });

    document.addEventListener("keydown", function (e) {
      if (!lightbox.classList.contains("open")) return;
      if (e.key === "Escape") { e.preventDefault(); close(); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); render(currentIndex - 1); }
      else if (e.key === "ArrowRight") { e.preventDefault(); render(currentIndex + 1); }
    });

    var touchStartX = 0, touchStartY = 0;
    lightbox.addEventListener("touchstart", function (e) {
      touchStartX = e.changedTouches[0].clientX;
      touchStartY = e.changedTouches[0].clientY;
    }, { passive: true });
    lightbox.addEventListener("touchend", function (e) {
      var dx = e.changedTouches[0].clientX - touchStartX;
      var dy = e.changedTouches[0].clientY - touchStartY;
      if (Math.abs(dx) >= 40 && Math.abs(dx) > Math.abs(dy)) render(dx > 0 ? currentIndex - 1 : currentIndex + 1);
    });
  })();

  // --- Project filter counts ---
  $(".filter-btn").each(function () {
    var f = $(this).data("filter");
    var n = f === "all" ? $(".project-item").length
      : $(".project-item").filter(function () { return $(this).data("category") === f; }).length;
    if (n) $(this).append('<span class="filter-count">' + n + '</span>');
  });

  // --- Copy to clipboard (email, BibTeX) ---
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise(function (resolve, reject) {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy") ? resolve() : reject(); } catch (e) { reject(e); }
      document.body.removeChild(ta);
    });
  }
  function flash(btn, label) {
    var original = btn.getAttribute("data-label") || btn.innerHTML;
    btn.setAttribute("data-label", original);
    btn.innerHTML = label;
    btn.classList.add("is-copied");
    clearTimeout(btn._t);
    btn._t = setTimeout(function () { btn.innerHTML = original; btn.classList.remove("is-copied"); }, 1800);
  }

  var BIBTEX = {
    csitss2023:
      "@inproceedings{saieeshwar2023cetacean,\n" +
      "  title     = {An Analytical Approach for Cetacean Family Species Detection Using Auditory Hybrid Algorithms for Multi-Class Classification},\n" +
      "  author    = {D, Sai Eeshwar and Pande, Sagar Dhanraj},\n" +
      "  booktitle = {IEEE CSITSS 2023},\n" +
      "  year      = {2023},\n" +
      "  doi       = {10.1109/CSITSS60515.2023.10333321}\n" +
      "}",
    icctdc2025:
      "@inproceedings{saieeshwar2025hybrid,\n" +
      "  title     = {Hybrid Time Series Forecasting with ARIMA, Echo State Networks, and LSTM},\n" +
      "  author    = {D, Sai Eeshwar and Talupuri, Pranavesh Kumar and Shivkumar, Aarush and Naseeba, Beebi},\n" +
      "  booktitle = {IEEE ICCTDC 2025},\n" +
      "  year      = {2025},\n" +
      "  doi       = {10.1109/ICCTDC64446.2025.11158940}\n" +
      "}"
  };

  document.addEventListener("click", function (e) {
    var btn = e.target.closest(".copy-btn, .cite-btn, .contact-copy");
    if (!btn) return;
    e.preventDefault();
    var text = btn.classList.contains("cite-btn") ? BIBTEX[btn.getAttribute("data-cite")] : btn.getAttribute("data-copy");
    if (!text) return;
    copyText(text).then(function () {
      flash(btn, btn.classList.contains("cite-btn") ? '<i class="fas fa-check"></i> BibTeX copied' : '<i class="fas fa-check"></i> Copied');
    }, function () { flash(btn, "Copy failed"); });
  });

  // --- Project quick view (home page "Details" button) ---
  // Shows the full Projects-page card in an overlay. Esc, backdrop or close button to dismiss.
  (function () {
    var modal, panel, closeBtn, bodyContainer, activeTrigger;

    function initModal() {
      if (modal) return;
      modal = document.createElement("div");
      modal.className = "qv-modal";
      modal.setAttribute("role", "dialog");
      modal.setAttribute("aria-modal", "true");
      modal.setAttribute("aria-labelledby", "qvTitle");
      modal.innerHTML =
        '<div class="qv-backdrop"></div>' +
        '<div class="qv-panel">' +
          '<button type="button" class="qv-close" aria-label="Close"><i class="fas fa-xmark"></i></button>' +
          '<div class="qv-body"></div>' +
          '<div class="qv-actions" hidden></div>' +
        '</div>';
      document.body.appendChild(modal);
      panel = modal.querySelector(".qv-panel");
      closeBtn = modal.querySelector(".qv-close");
      bodyContainer = modal.querySelector(".qv-body");
      modal.querySelector(".qv-backdrop").addEventListener("click", closeQuickView);
      closeBtn.addEventListener("click", closeQuickView);

      document.addEventListener("keydown", function (e) {
        if (!modal.classList.contains("open")) return;
        // Let the PDF viewer handle Esc first when it is open on top
        var pdf = document.querySelector(".pdf-modal.open");
        if (e.key === "Escape") { if (!pdf) closeQuickView(); return; }
        if (e.key === "Tab" && !pdf) {
          var f = panel.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])');
          if (!f.length) return;
          var first = f[0], last = f[f.length - 1];
          if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
          else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      });
    }

    function closeQuickView() {
      if (!modal || !modal.classList.contains("open")) return;
      modal.classList.remove("open");
      document.body.style.overflow = "";
      bodyContainer.innerHTML = "";
      if (activeTrigger && activeTrigger.focus) activeTrigger.focus();
      activeTrigger = null;
    }

    window.openProjectQuickView = function (cardElement, triggerButton) {
      initModal();
      activeTrigger = triggerButton;
      bodyContainer.innerHTML = "";
      var clone = cardElement.cloneNode(true);
      clone.className += " qv-card";
      clone.removeAttribute("tabindex");
      clone.removeAttribute("role");
      clone.removeAttribute("aria-label");
      clone.removeAttribute("data-qv");
      var h4 = clone.querySelector("h4");
      if (h4) h4.id = "qvTitle";
      bodyContainer.appendChild(clone);
      // Links go in a bar pinned to the bottom of the overlay so they are always visible.
      var bar = panel.querySelector(".qv-actions");
      bar.innerHTML = "";
      var links = clone.querySelector(".project-links");
      if (links && links.children.length) {
        while (links.firstChild) bar.appendChild(links.firstChild);
        links.parentNode.removeChild(links);
        var first = bar.querySelector("a");
        if (first) first.classList.add("is-primary");
        bar.hidden = false;
      } else {
        bar.hidden = true;
      }
      modal.classList.add("open");
      if (window.__addThumbHints) window.__addThumbHints(bodyContainer);
      document.body.style.overflow = "hidden";
      panel.scrollTop = 0;
      closeBtn.focus();
    };
  })();

  // --- Project cards open their details view ---
  // Clicking (or Enter/Space on) a project card opens the full details overlay,
  // where the visitor picks a link. Links inside a card still work directly.
  function cardTitle(card) { var h = card.querySelector("h4"); return h ? h.textContent.trim() : "project"; }
  function prepCards(root) {
    (root || document).querySelectorAll(".project-card").forEach(function (card) {
      if (card.closest(".qv-modal") || card.hasAttribute("tabindex")) return;
      card.setAttribute("tabindex", "0");
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", "Open details: " + cardTitle(card));
    });
  }
  function openCard(card) {
    if (!window.openProjectQuickView) return;
    var full = card.hasAttribute("data-qv") && window.__qvFullCards
      ? window.__qvFullCards[+card.getAttribute("data-qv")] : card;
    window.openProjectQuickView(full, card);
  }
  prepCards();
  // Home cards are rendered later from projects.html; prepare them when they appear.
  var lw = document.getElementById("latestWork");
  if (lw && window.MutationObserver) new MutationObserver(function () { prepCards(lw); }).observe(lw, { childList: true });
  function mainLink(card) {
    return card.querySelector(".project-links a") ||
      (card.closest(".qv-modal") ? card.closest(".qv-modal").querySelector(".qv-actions a") : null);
  }
  function addThumbHints(root) {
    (root || document).querySelectorAll(".project-card").forEach(function (card) {
      var thumb = card.querySelector(".project-thumb");
      var link = mainLink(card);
      if (!thumb || !link || card.querySelector(".thumb-hint")) return;
      card.classList.add("thumb-links");
      var hint = document.createElement("span");
      hint.className = "thumb-hint";
      hint.setAttribute("aria-hidden", "true");
      hint.innerHTML = '<i class="fas fa-arrow-up-right-from-square"></i> ' + link.textContent.trim();
      thumb.insertAdjacentElement("afterend", hint);
    });
  }
  window.__addThumbHints = addThumbHints;
  addThumbHints();
  if (lw && window.MutationObserver) new MutationObserver(function () { addThumbHints(lw); }).observe(lw, { childList: true });

  document.addEventListener("click", function (e) {
    var card = e.target.closest(".project-card");
    if (!card || e.target.closest("a, button")) return;
    // The picture opens the project's main link (card or details view)
    if (e.target.closest(".project-thumb")) {
      var link = mainLink(card);
      if (link) { e.preventDefault(); link.click(); return; }
    }
    if (card.closest(".qv-modal")) return;
    openCard(card);
  });
  document.addEventListener("keydown", function (e) {
    if ((e.key === "Enter" || e.key === " ") && e.target.classList && e.target.classList.contains("project-card") && !e.target.closest(".qv-modal")) {
      e.preventDefault();
      openCard(e.target);
    }
  });

})(jQuery);
