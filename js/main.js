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
          "a Systems Builder",
          "a Sous Chef",
          "a Video Editor"
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

    fetch("projects.html")
      .then(function (res) { return res.text(); })
      .then(function (html) {
        var doc = new DOMParser().parseFromString(html, "text/html");
        var cards = doc.querySelectorAll(".project-grid .project-item .project-card");
        if (!cards.length) return;

        var catLabels = { ai: "AI / ML", systems: "Systems", creative: "Creative", hardware: "Hardware" };
        var out = [];

        Array.prototype.slice.call(cards, 0, 3).forEach(function (card) {
          var item = card.closest(".project-item");
          var cat = item ? item.getAttribute("data-category") : "";
          var titleEl = card.querySelector("h4");
          var descEl = card.querySelector("p");
          var title = titleEl ? titleEl.textContent : "";
          var desc = descEl ? descEl.innerHTML : "";
          var badge = card.querySelector(".badge");
          var link = card.querySelector(".project-links a");
          var label = badge ? badge.textContent.trim() : (catLabels[cat] || "Project");

          if (link) {
            var href = link.getAttribute("href");
            var cta = "View Project";
            if (link.querySelector(".fa-globe") || /syncwave|\/live/i.test(href)) cta = "Visit Live Site";
            else if (/github\.com/i.test(href)) cta = "View on GitHub";
            var liveClass = (badge && badge.classList.contains("badge-live")) ? " work-type-live" : "";
            out.push(
              '<div class="col-md-4 mb-4">' +
                '<a href="' + href + '" target="_blank" rel="noopener noreferrer" class="work-card">' +
                  '<span class="work-type' + liveClass + '">' + label + '</span>' +
                  '<h4>' + title + '</h4>' +
                  '<p>' + desc + '</p>' +
                  '<span class="work-cta">' + cta + ' <i class="fas fa-arrow-right"></i></span>' +
                '</a>' +
              '</div>'
            );
          } else {
            var muted = card.querySelector(".text-muted");
            var mutedHtml = muted ? muted.innerHTML : '<i class="fas fa-lock"></i> Private';
            out.push(
              '<div class="col-md-4 mb-4">' +
                '<div class="work-card">' +
                  '<span class="work-type">' + label + '</span>' +
                  '<h4>' + title + '</h4>' +
                  '<p>' + desc + '</p>' +
                  '<span class="text-muted">' + mutedHtml + '</span>' +
                '</div>' +
              '</div>'
            );
          }
        });

        if (out.length) container.innerHTML = out.join("");
      })
      .catch(function () { /* keep static fallback cards */ });
  }
  populateLatestWork();

  // --- Project filter (Projects page) ---
  $(".filter-btn").on("click", function () {
    var filter = $(this).data("filter");

    $(".filter-btn").removeClass("active");
    $(this).addClass("active");

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

})(jQuery);
