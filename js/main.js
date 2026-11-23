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

        var catLabels = { ai: "AI / ML", systems: "Systems", creative: "Creative", hardware: "Hardware" };
        var out = [];

        Array.prototype.slice.call(cards, 0, 4).forEach(function (card) {
          var item = card.closest(".project-item");
          var cat = item ? item.getAttribute("data-category") : "";
          var titleEl = card.querySelector("h4");
          var descEl = card.querySelector("p");
          var title = titleEl ? titleEl.textContent : "";
          var desc = (item && item.getAttribute("data-short")) || (descEl ? descEl.innerHTML : "");
          var badge = card.querySelector(".badge");
          var link = card.querySelector(".project-links a");
          var label = (item && item.getAttribute("data-label")) || (badge ? badge.textContent.trim() : (catLabels[cat] || "Project"));

          if (link) {
            var href = link.getAttribute("href");
            var cta = link.getAttribute("data-cta") || "View Project";
            if (!link.getAttribute("data-cta")) {
              if (/syncwave|\/live/i.test(href)) cta = "Visit Live Site";
              else if (link.querySelector(".fa-globe") || /github\.io/i.test(href)) cta = "Visit Website";
              else if (/\.pdf$/i.test(href)) cta = "Read the Dissertation";
              else if (/github\.com/i.test(href)) cta = "View on GitHub";
            }
            var isExternal = /^https?:/i.test(href);
            var cta2 = item && item.getAttribute("data-cta2");
            var href2 = item && item.getAttribute("data-cta2-href");
            if (cta2 && href2) {
              var tgt = ' target="_blank" rel="noopener noreferrer"';
              out.push(
                '<div class="col-md-6 col-lg-3 mb-4">' +
                  '<div class="work-card">' +
                    '<span class="work-type">' + label + '</span>' +
                    '<h4>' + title + '</h4>' +
                    '<p>' + desc + '</p>' +
                    '<div class="work-links">' +
                      '<a href="' + href + '"' + tgt + ' class="work-cta">' + cta + ' <i class="fas fa-arrow-right"></i></a>' +
                      '<a href="' + href2 + '"' + tgt + ' class="work-cta">' + cta2 + ' <i class="fas fa-arrow-right"></i></a>' +
                    '</div>' +
                  '</div>' +
                '</div>'
              );
              return;
            }
            // Green only when the label is the "Live" badge itself; a custom data-label stays teal like the others.
            var liveClass = (badge && badge.classList.contains("badge-live") && !(item && item.getAttribute("data-label"))) ? " work-type-live" : "";
            out.push(
              '<div class="col-md-6 col-lg-3 mb-4">' +
                '<a href="' + href + '"' + (isExternal || /\.pdf$/i.test(href) ? ' target="_blank" rel="noopener noreferrer"' : '') + ' class="work-card">' +
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
              '<div class="col-md-6 col-lg-3 mb-4">' +
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

})(jQuery);
