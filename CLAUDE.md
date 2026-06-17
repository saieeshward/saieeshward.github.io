# Portfolio Site — Reference / Lookup File

> Lookup catalog of the whole site. Update this whenever content or structure changes.

## Deploy
- **Live URL:** https://saieeshward.github.io
- **Repo:** https://github.com/saieeshward/saieeshward.github.io (branch `main`)
- **Hosting:** GitHub Pages (user site — served directly from `main`, static, no build step)
- Push to `main` = deploy.

## Owner / identity
- **Name:** Sai Eeshwar D — brand alias **"sheesh."** (note the accent dot)
- **Role:** ML Researcher & AI Engineer. 2 IEEE publications, 1 Indian patent, 1 live product.
- **Education:** MSc Computer Science (Intelligent Systems), Trinity College Dublin (Sep 2025–present).
- **Based:** Dublin, Ireland.
- **Email:** saieeshwar03@gmail.com
- **Socials:** GitHub `github.com/EESH-843`, LinkedIn `linkedin.com/in/eeshward/`, X `x.com/d_eeshwar`, Medium `medium.com/@saieeshwar03`

## Tech stack
- Plain static HTML + Bootstrap (vendored in `vendor/bootstrap/`), jQuery, Typed.js.
- Fonts: Poppins, Inter, Playfair Display (Google Fonts). Icons: Font Awesome 6.5.1 (CDN).
- No framework, no bundler. Edit HTML/CSS/JS directly.

## File structure
```
index.html         Home (hero, latest work, research, experience preview, skills, "The Recipe", contact CTA)
projects.html      Projects grid + filter tags
experience.html    Work timeline, education, skills, certifications
research.html      Patent, publications, articles, dish gallery, video portfolio
contact.html       Contact card + social grid
404.html           Not-found page
robots.txt, sitemap.xml
css/style.css      All styling (single file)
js/components.js   Shared navbar + footer (getNavbar / getFooter) — edit once, applies everywhere
js/main.js         Page scripts (typed.js init, etc.)
images/            Dish photos (IMG_*.JPG)
assets/            profile.png, favicon.svg, reports/ (PDFs, decks, interactive html)
vendor/            bootstrap, jquery, typed.js
```

## Shared components (js/components.js)
- **Navbar:** `getNavbar('<activePage>')` where activePage ∈ home|projects|experience|research|contact. Pages array drives nav links. Brand = "sheesh.". Includes Resume link → `assets/reports/Resume_Sai_eeshwar_D_.pdf`.
- **Footer:** `getFooter()` — auto year via `new Date().getFullYear()`, social icons.
- Every page calls these via `document.write(...)`.

## Conventions
- **No em dashes (—) or en dashes (–) in text.** Use a spaced hyphen ` - ` for title/label separators (e.g. `Projects - Sai Eeshwar D`), commas/periods in prose. (Date ranges in timelines still use the `&ndash;` HTML entity, e.g. "Dec 2023 &ndash; May 2024" — that's intentional range typography.)
- **Accent dot:** headings end with `<span class="text-accent">.</span>` (the green dot). Keep this pattern.
- **Animations:** add class `fade-up` for entrance animation.
- **External links:** always `target="_blank" rel="noopener noreferrer"`.
- Separators in meta lines use `&middot;` (·).

## Projects page (projects.html)
Filter categories (data-category / data-filter): `ai`, `systems`, `creative`, `hardware` (+ `all`).
Badges: `badge-current` (In Progress), `badge-live` (Live), `badge-published` (Published).
Add-a-project template is in an HTML comment at the bottom of the project grid.

Current projects (newest first):
| Project | Category | Status | Link |
|---|---|---|---|
| CLAN - Agent Handoff Format (Context and Live Agent Notation; Rust, MPL-2.0) | systems | — | github.com/saieeshward/clan |
| Chika - Smart Comic Reader (Chitra Katha; Android/Kotlin, on-device YOLO) | ai | — | github.com/saieeshward/chika |
| Historical Document Transcription (MSc dissertation) | ai | In Progress | private |
| Shellock CLI | systems | In Progress | github.com/EESH-843/shellock |
| Spotify Audio Feature Viz | creative | — | github.com/EESH-843/spotify-viz |
| Transformers from Scratch | ai | — | github.com/EESH-843/math-boolean-gpt |
| Lucene Search Engine | systems | — | github.com/EESH-843/assignment-two-group-10 |
| ShutterBoxd - Movie Knowledge Graph | systems | — | github.com/EESH-843/knowledge-graph |
| Fencer-PRO Innovation Pitch | creative | — | github.com/EESH-843/fencer-pro |
| Heart Murmur Detection | ai | — | private |
| Is It Legal To | ai | Live | syncwave.co.in |
| Hybrid Time Series Forecasting | ai | Published | IEEE 11158940 |
| WAV2Lip-HQ Inference | ai | — | github.com/EESH-843/Wav2Lip-HQ-inference |
| Cetacean Species Detection | ai | Published | IEEE 10333321 + patent |
| CRISP | systems | Published | github.com/EESH-843/CRISP |
| VISU-NG Robot | ai | — | private |
| V-SAT (1U CubeSat) | hardware | — | private |
| HackAP - Dance Floor Energy | hardware | — | private |

## Research / publications (research.html)
- **Patent:** No. 202341063223, "A System and a Method for Classification of Marine Animal Species Using Deep Learning Techniques" (Indian Patent Office, Oct 6 2023).
- **IEEE CSITSS 2023:** Cetacean Family Species Detection... DOI 10.1109/CSITSS60515.2023.10333321
- **IEEE ICCTDC 2025:** Hybrid Time Series Forecasting with ARIMA, ESN, LSTM. DOI 10.1109/ICCTDC64446.2025.11158940
- **Article:** "Tithe" on Medium.
- Dish gallery (`images/`), video portfolio (Google Drive embeds, DaVinci Resolve).

## Experience timeline (experience.html / index.html preview)
- OSCOWL & Co — Research Intern (Dec 2023–May 2024), Hyderabad
- GoWarm — Generative AI Intern (Oct 2024–Jan 2025), Hyderabad (WAV2Lip-HQ)
- Freelance Video Editor — Early 2025 (DaVinci Resolve, short film for bob_2.3)
- Syncwave Automation — Co-founder / Data Scientist (Jan–Sep 2025), "Is It Legal To"
- Virginia Tech India — ML Research Intern (Mar–May 2025), Chennai (heart murmur, 87%)
- Koffee & Kale — Sous Chef (Dec 2025–present), Dublin

## Education
- Trinity College Dublin — MSc CS (Intelligent Systems), Sep 2025–present
- Vellore Institute of Technology — B.Tech CS (AI & ML), 2021–2025, CGPA 8.72
- National Public School, Bangalore — CBSE XII 92.4% / X 91.4%, 2015–2020
