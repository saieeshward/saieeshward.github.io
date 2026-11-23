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
        Array.prototype.slice.call(cards, 0, 4).forEach(function (card) {
          var item = card.closest(".project-item");
          var clone = card.cloneNode(true);
          var short = item && item.getAttribute("data-short");
          var p = clone.querySelector("p");
          if (short && p) p.textContent = short;
          out.push('<div class="col-md-6 col-lg-3 mb-4">' + clone.outerHTML + '</div>');
        });

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
          '<iframe class="pdf-modal-frame" title="PDF preview"></iframe>' +
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

    function open(href, title) {
      if (!modal) build();
      lastFocus = document.activeElement;
      titleEl.textContent = title;
      openBtn.href = href;
      dlBtn.href = href;
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
      if (e.key === "Escape" && modal && modal.classList.contains("open")) close();
    });

    document.addEventListener("click", function (e) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var a = e.target.closest("a[href]");
      if (!a || a.closest(".pdf-modal")) return;
      var href = a.getAttribute("href");
      if (!/^(?!https?:|\/\/)[^?#]*\.pdf(?:[?#].*)?$/i.test(href)) return;
      if (!canPreview()) return;
      e.preventDefault();
      var card = a.closest(".project-card, .pub-card, .patent-card, .work-card");
      var heading = card && card.querySelector("h3, h4");
      var title = heading ? heading.textContent.trim() : (a.textContent.trim() || "Document");
      open(href, title);
    });
  })();

})(jQuery);
