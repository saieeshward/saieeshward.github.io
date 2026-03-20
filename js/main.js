/* ========================================
   MAIN.JS — Portfolio Scripts (Multi-Page)
   ======================================== */

(function ($) {
  "use strict";

  // --- Typed.js (Home page only) ---
  if (document.getElementById("typed")) {
    new Typed("#typed", {
      strings: [
        "an AI Engineer ^3000",
        "an ML Researcher",
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
