// ===== THEME =====
// Pick one theme at random per visit and keep it for the session, so pages don't
// change colour as you click around. Runs in <head>, before the page paints.
var SITE_THEMES = [
  { id: "mint",   name: "Mint",   color: "#5eead4" },
  { id: "blue",   name: "Electric blue", color: "#60a5fa" },
  { id: "amber",  name: "Amber",  color: "#fb923c" },
  { id: "violet", name: "Violet", color: "#a78bfa" },
  { id: "lime",   name: "Lime",   color: "#a3e635" }
];
(function () {
  var ids = SITE_THEMES.map(function (t) { return t.id; });
  var theme = null;
  try { theme = sessionStorage.getItem("siteTheme"); } catch (e) {}
  if (ids.indexOf(theme) < 0) {
    theme = ids[Math.floor(Math.random() * ids.length)];
    try { sessionStorage.setItem("siteTheme", theme); } catch (e) {}
  }
  document.documentElement.setAttribute("data-theme", theme);

  // Local preview only: a picker to try each theme.
  var host = location.hostname;
  var showPicker = host === "localhost" || host === "127.0.0.1" || /[?&]themes\b/.test(location.search);
  if (!showPicker) return;
  document.addEventListener("DOMContentLoaded", function () {
    var bar = document.createElement("div");
    bar.className = "theme-picker";
    bar.setAttribute("role", "group");
    bar.setAttribute("aria-label", "Theme");
    bar.innerHTML = '<span class="theme-picker-label">Theme</span>';
    SITE_THEMES.forEach(function (t) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "theme-swatch";
      b.style.background = t.color;
      b.title = t.name;
      b.setAttribute("aria-label", t.name);
      b.setAttribute("aria-pressed", String(document.documentElement.getAttribute("data-theme") === t.id));
      b.addEventListener("click", function () {
        document.documentElement.setAttribute("data-theme", t.id);
        try { sessionStorage.setItem("siteTheme", t.id); } catch (e) {}
        bar.querySelectorAll(".theme-swatch").forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
        b.setAttribute("aria-pressed", "true");
      });
      bar.appendChild(b);
    });
    document.body.appendChild(bar);
  });
})();

/* ========================================
   COMPONENTS.JS - Shared Navbar & Footer
   Edit here to update across ALL pages.
   ======================================== */

function getNavbar(activePage) {
  const pages = [
    { id: 'home',       label: 'Home',       href: 'index.html' },
    { id: 'projects',   label: 'Projects',   href: 'projects.html' },
    { id: 'experience', label: 'Experience', href: 'experience.html' },
    { id: 'research',   label: 'Research',   href: 'research.html' },
    { id: 'contact',    label: 'Contact',    href: 'contact.html' }
  ];

  const navItems = pages.map(p =>
    `<li class="nav-item${p.id === activePage ? ' active' : ''}">` +
      `<a class="nav-link" href="${p.href}">${p.label}</a>` +
    `</li>`
  ).join('\n          ');

  return `
  <nav class="navbar navbar-expand-lg navbar-dark fixed-top" id="topNav">
    <div class="container">
      <a class="navbar-brand" href="index.html"><span class="brand-name">sheesh<span class="text-accent">.</span></span></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav">
          ${navItems}
          <li class="nav-item"><a class="nav-link nav-resume" href="assets/reports/Resume_Sai_Eeshwar_D.pdf" target="_blank" rel="noopener noreferrer">Resume</a></li>
        </ul>
      </div>
    </div>
  </nav>`;
}

function getFooter() {
  return `
  <footer class="site-footer">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-6">
          <p class="footer-text"><span class="brand-name-sm">sheesh<span class="text-accent">.</span></span> &copy; ${new Date().getFullYear()} Sai Eeshwar D. Built by hand. Static HTML, no build step.</p>
        </div>
        <div class="col-md-6 text-md-right">
          <div class="social-icons social-icons-sm">
            <a href="https://github.com/saieeshward" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><i class="fab fa-github" aria-hidden="true"></i></a>
            <a href="https://www.linkedin.com/in/eeshward/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i class="fab fa-linkedin-in" aria-hidden="true"></i></a>
            <a href="https://x.com/d_eeshwar" target="_blank" rel="noopener noreferrer" aria-label="X"><i class="fab fa-x-twitter" aria-hidden="true"></i></a>
          </div>
        </div>
      </div>
    </div>
  </footer>`;
}

// Model card for anyone curious enough to open devtools.
if (typeof console !== "undefined" && console.log) {
  console.log("%csheesh.", "color:#5eead4;font-size:22px;font-weight:700;font-family:Poppins,sans-serif");
  console.log(
    "model card\n" +
    "  type: human, dublin based\n" +
    "  weights: closed source\n" +
    "  deployment: napkin studio\n" +
    "  training data: whale songs, heartbeats, handwriting, brunch orders\n" +
    "  contact: saieeshwar03@gmail.com\n" +
    "  source: https://github.com/saieeshward/saieeshward.github.io"
  );
}
