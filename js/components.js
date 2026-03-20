/* ========================================
   COMPONENTS.JS — Shared Navbar & Footer
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
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"><span class="navbar-toggler-icon"></span></button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav">
          ${navItems}
          <li class="nav-item"><a class="nav-link nav-resume" href="assets/reports/Resume_Sai_eeshwar_D_.pdf" target="_blank" rel="noopener noreferrer">Resume</a></li>
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
          <p class="footer-text"><span class="brand-name-sm">sheesh<span class="text-accent">.</span></span> &copy; ${new Date().getFullYear()} Sai Eeshwar D. Built with purpose.</p>
        </div>
        <div class="col-md-6 text-md-right">
          <div class="social-icons social-icons-sm">
            <a href="https://github.com/EESH-843" target="_blank" rel="noopener noreferrer"><i class="fab fa-github"></i></a>
            <a href="https://www.linkedin.com/in/eeshward/" target="_blank" rel="noopener noreferrer"><i class="fab fa-linkedin-in"></i></a>
            <a href="https://x.com/d_eeshwar" target="_blank" rel="noopener noreferrer"><i class="fab fa-x-twitter"></i></a>
          </div>
        </div>
      </div>
    </div>
  </footer>`;
}
