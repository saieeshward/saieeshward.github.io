# Portfolio Site - Reference / Lookup File

> Lookup catalog of the whole site. Update this whenever content or structure changes.

## Deploy
- **Live URL:** https://saieeshward.github.io
- **Repo:** https://github.com/saieeshward/saieeshward.github.io (branch `main`)
- **Hosting:** GitHub Pages (user site, served directly from `main`, static, no build step)
- Push to `main` = deploy.

## Owner / identity
- **Name:** Sai Eeshwar D - brand alias **"sheesh."** (note the accent dot)
- **Role:** AI Engineer at Napkin Studio, Dublin (exact title "AI Engineer"; no dates shown on site). Leads product on the studio OS: the tools that turn a client brief into research, a brief, a pitch deck and a production plan. Agents do the drafting, people approve every step. Do NOT describe it as an "operating system for ad agencies". Also ML Researcher. 2 IEEE publications, 1 Indian patent application (filed, not issued), 1 live product.
- **Education:** MSc Computer Science (Intelligent Systems), Trinity College Dublin (Sep 2025 to Sep 2026), graduated with Distinction. Dissertation 72%, taught modules 62 to 83%.
- **Based:** Dublin, Ireland.
- **Email:** saieeshwar03@gmail.com
- **Socials:** GitHub `github.com/saieeshward` (all profile/social links: hero, contact, footer),  LinkedIn `linkedin.com/in/eeshward/`, X `x.com/d_eeshwar`, Medium `medium.com/@saieeshwar03`
- **GitHub accounts:** social links use `saieeshward`. Individual older project repo links still point at `EESH-843` (shellock, spotify-viz, math-boolean-gpt, etc.) and stay as they are; newer repos (clan, chika, the site repo) are under `saieeshward`.

## Tech stack
- Plain static HTML + Bootstrap (vendored in `vendor/bootstrap/`), jQuery, Typed.js.
- Fonts: Poppins, Inter, Playfair Display, JetBrains Mono (Google Fonts). Icons: Font Awesome 6.5.1 (CDN).
- No framework, no bundler. Edit HTML/CSS/JS directly.

## File structure
```
index.html         Home (hero, latest work, research, experience with featured Napkin Studio card + timeline, skills, "The Recipe", contact CTA)
projects.html      Projects grid + filter tags
experience.html    Featured current role + work timeline, education, skills, certifications
research.html      Patent, publications, articles, dish gallery, video portfolio
contact.html       Contact card + social grid
404.html           Not-found page (terminal-styled, standalone: loads only style.css)
robots.txt, sitemap.xml
css/style.css      All styling (single file)
js/components.js   Shared navbar + footer (getNavbar / getFooter), edit once, applies everywhere
js/main.js         Page scripts (typed.js init, etc.)
js/neural-bg.js    Faint node-mesh canvas behind the home hero (index.html only)
images/            Dish photos (IMG_*.JPG)
assets/            profile.jpg (og/twitter image), contact.jpg, setup.jpg, favicon.svg, reports/ (PDFs, decks, interactive html)
vendor/            bootstrap, jquery, typed.js
```

## Shared components (js/components.js)
- **Navbar:** `getNavbar('<activePage>')` where activePage ∈ home|projects|experience|research|contact. Pages array drives nav links. Brand = "sheesh.". Includes Resume link to `assets/reports/Resume_Sai_eeshwar_D_.pdf`.
- **Footer:** `getFooter()`, auto year via `new Date().getFullYear()`, social icons (GitHub `saieeshward`, LinkedIn, X). Footer line: "Built by hand. No framework, no build step."
- Every page calls these via `document.write(...)`.
- components.js also prints a "model card" easter egg to the devtools console on every page (includes `deployment: napkin studio`; training data: whale songs, heartbeats, handwriting, brunch orders).

## Conventions
- **No em dashes or en dashes in text.** Use a spaced hyphen ` - ` for title/label separators (e.g. `Projects - Sai Eeshwar D`), commas/periods in prose. (Date ranges in timelines still use the `&ndash;` HTML entity, e.g. "Dec 2023 &ndash; May 2024"; that is intentional range typography.)
- **Accent dot:** headings end with `<span class="text-accent">.</span>` (the green dot). Keep this pattern.
- **Animations:** add class `fade-up` for entrance animation. A global `prefers-reduced-motion` block at the end of style.css freezes all animations/transitions; JS effects (typed.js, neural-bg) must also check the media query and provide a static fallback.
- **Mono font:** `var(--font-mono)` (JetBrains Mono) is for small labels/metadata under ~0.9rem only (badges, tags, dates, `.card-meta`, `.status-line`, `.skill-group-title`), never headings, nav, buttons, or body text.
- **`.card-meta` rows** on project cards use keys `year / status / stack` (values lowercase); status vocabulary: `active | shipped | published | archived | private | live`. Keep to 2-3 keys. Must be a `<div>` (not `<p>`) so populateLatestWork() ignores it.
- **Open Graph:** `og:image` and `twitter:image` must be absolute on every page: `https://saieeshward.github.io/assets/profile.jpg`.
- **Featured role card:** Napkin Studio is shown once, as `<div class="featured-role fade-up">` (label "Now", h3 "AI Engineer", `.featured-role-company` "Napkin Studio &middot; Dublin", descriptor) directly above `.h-timeline-wrapper` on index.html and experience.html. It is NOT repeated inside the timeline. Styles live in css/style.css.
- **Separators in prose:** no pipes `|`; use periods or `&middot;`.
- **External links:** always `target="_blank" rel="noopener noreferrer"`.
- Separators in meta lines use `&middot;` (·).

## Projects page (projects.html)
Filter categories (data-category / data-filter): `ai`, `systems`, `creative`, `hardware` (+ `all`).
Badges: `badge-current` (In Progress), `badge-live` (Live), `badge-published` (Published). Subtitle: "Things I've built and shipped. Most link to code, a report, or a live demo."
Add-a-project template is in an HTML comment at the bottom of the project grid.

Current projects (newest first):
| Project | Category | Status | Link |
|---|---|---|---|
| VITT - Very Interesting Transaction Tracking (multi-currency expense tracker; Kotlin Multiplatform, Apache-2.0, pre-alpha, local repo `~/Projects/DevTools/Developer/Tracker`) | systems | In Progress | private |
| CLAN - Agent Handoff Format (Context and Live Agent Notation; Rust, MPL-2.0) | systems | - | github.com/saieeshward/clan |
| Chika - Smart Comic Reader (Chitra Katha; Android/Kotlin, on-device YOLO) | ai | - | github.com/saieeshward/chika |
| Improvement of Image to Transcription Process for Documents (MSc dissertation, 2026; reading-order layout engine for multi-column PAGE XML, ARD 22.49 to 0.34, + seanc-has correction tool) | ai | shipped | `assets/reports/image-to-transcription-dissertation.pdf` + live tool `seanc-has/` |
| Shellock CLI | systems | shipped | github.com/saieeshward/Shellock |
| Spotify Audio Feature Viz | creative | - | github.com/EESH-843/spotify-viz |
| Transformers from Scratch | ai | - | github.com/EESH-843/math-boolean-gpt |
| Lucene Search Engine | systems | - | github.com/EESH-843/assignment-two-group-10 |
| ShutterBoxd - Movie Knowledge Graph | systems | - | github.com/EESH-843/knowledge-graph |
| Fencer-PRO Innovation Pitch | creative | - | github.com/EESH-843/fencer-pro |
| Heart Murmur Detection | ai | - | private |
| Is It Legal To | ai | Live | syncwave.co.in |
| Hybrid Time Series Forecasting | ai | Published | IEEE 11158940 |
| WAV2Lip-HQ Inference | ai | - | github.com/saieeshward/Wav2Lip-HQ-inference |
| Cetacean Species Detection | ai | Published | IEEE 10333321 + patent |
| CRISP | systems | shipped (no Published badge) | github.com/saieeshward/CRISP |
| VISU-NG Robot | ai | - | private |
| V-SAT (1U CubeSat) | hardware | - | private |
| HackAP - Dance Floor Energy | hardware | - | private |

## Research / publications (research.html)
- **Patent application (filed, NOT issued/granted; never write "Issued"):** Application No. 202341063223, "A System and a Method for Classification of Marine Animal Species Using Deep Learning Techniques" (Indian Patent Office, filed Oct 6, 2023). Shown as "Application No. 202341063223 &middot; Filed Oct 6, 2023 &middot; Indian Patent Office".
- **IEEE CSITSS 2023:** Cetacean Family Species Detection (CRNN architecture, not RCNN). DOI 10.1109/CSITSS60515.2023.10333321
- **IEEE ICCTDC 2025:** Hybrid Time Series Forecasting with ARIMA, ESN, LSTM. DOI 10.1109/ICCTDC64446.2025.11158940
- **MSc Dissertation (TCD 2026, supervisor Declan O'Sullivan):** "Improvement of Image to Transcription Process for Documents". PDF at `assets/reports/image-to-transcription-dissertation.pdf`. Shown on research.html under its own "MSc Dissertation (Distinction)" label, not as a publication. Card CTA: "Read the Dissertation". NOT an LLM-vs-CNN study: it is a geometric reading-order engine (4 column-detection strategies) + seanc-has review app.
- **Article:** "Tithe" on Medium.
- Dish gallery (`images/`), video portfolio (Google Drive embeds, DaVinci Resolve).

## Experience (experience.html / index.html)
Featured card above the timeline (not repeated in it):
- **Napkin Studio** - AI Engineer, Dublin (current; no dates shown). Descriptor: "At Napkin Studio, an Irish AI creative studio, I lead product on the studio OS: the tools that turn a client brief into research, a brief, a pitch deck and a production plan. Agents do the drafting, and people approve every step."

Timeline, newest first:
- Koffee & Kale - Sous Chef, Dublin (past tense, no dates shown; cooked there through the MSc)
- Virginia Tech India - ML Research Intern (Mar&ndash;May 2025), Chennai (heart murmur, reaching 87%)
- Syncwave Automation - Co-founder / Data Scientist (Jan&ndash;Sep 2025), "Is It Legal To"
- Freelance Video Editor - Early 2025 (DaVinci Resolve, short film for bob_2.3); no "(one-time)" or "Open to freelance work."
- GoWarm - Generative AI Intern (Oct 2024&ndash;Jan 2025), Hyderabad (WAV2Lip-HQ)
- OSCOWL & Co - Research Intern (Dec 2023&ndash;May 2024), Hyderabad. Did BOTH computer vision / image classification AND StreamLingo voice work (95% voice fidelity); index and experience pages must agree.

## Education
- Trinity College Dublin - MSc CS (Intelligent Systems), Sep 2025 to Sep 2026, Distinction
- Vellore Institute of Technology - B.Tech CS (AI & ML), 2021 to 2025, CGPA 8.72
- National Public School, Bangalore - CBSE XII 92.4% / X 91.4%, 2015 to 2020

## Skills (added/changed)
Rust, TypeScript, React, Kotlin, Evals (alongside RAG), Agent Systems, On-Device ML, Product are listed in sensible groups. "Node.js CLI" is now "Node.js".

## Certifications
Kept: HACCP Food Safety, Postman API Fundamentals Student Expert. Removed: Joy of Computing using Python, Programming For Everybody (Python), Python Data Structures, the unnamed IBM Certification.

## Copy notes
- Hero status line: "AI Engineer @ Napkin Studio". Typed strings: an AI Engineer, an ML Researcher, an Agent Builder, a Video Editor.
- Recipe: serves "Teams who ship"; currently "AI Engineer @ Napkin Studio"; closing "Plate it up. Code on GitHub, papers on IEEE Xplore, food on the plate. Serve warm."
- Contact page: "Currently" uses `fa-briefcase`; subtitle "Always up for a chat. Pick a channel."


## Nov 2026 round 2 changes
- **Latest Work (home)** is 4 cards pulled from the first 4 `.project-item`s of projects.html by `populateLatestWork()` in js/main.js, in this order: MSc Dissertation, CLAN, Chika, VITT. Optional attributes on a `.project-item`: `data-label` (badge text), `data-short` (plain-text blurb for home). A link can carry `data-cta` to override the card CTA. Static fallback cards live in index.html and must be kept in sync.
- **Syncwave / Is It Legal To** is deliberately de-emphasised: not on the home page, not in the bio, one short line on experience.html, card kept lower on projects.html. Do not add "live legal product" claims to the bio or meta tags.
- **Bio** now says "a dissertation worked on with the Virtual Record Treasury of Ireland" (virtualtreasury.ie).
- **chika.html** is a standalone Android download page: pinned APK link `https://github.com/batunii/chika/releases/download/v0.2.2-beta/app-release.apk` (GitHub `releases/latest` points at an iOS tag, so it is pinned; bump the tag when a newer Android build ships). . Chika upstream is `batunii/chika` (another GitHub user, Shreyansh Soni); `saieeshward/chika` is only a fork. Website: https://batunii.github.io/chika/. GitHub reports 3,134 total release downloads (checked Nov 2026).
- **CLAN:** website https://saieeshward.github.io/clan/; backed by a EUR 10,000 Enterprise Ireland Innovation Voucher (stated by owner, unverified).
- **VITT:** public repo saieeshward/vitt, website https://saieeshward.github.io/vitt/.
- **Dissertation code:** github.com/saieeshward/Disseration (sic). Live tool is the `seanc-has/` folder of this site. No separate Pages site.
- **Home timeline** shows only OSCOWL, GoWarm and Virginia Tech India; Koffee & Kale and Syncwave live on experience.html only. The freelance video entry moved to a "Side work" line under Creative skills. HACCP cert is Level 2.
- **Napkin card** includes the Deck Maker outcome line (supplied by owner; "client-by-client home" is worded as built, not shipped, because the source notes said it awaited approval).
- **Resume:** navbar links `assets/reports/Resume_Sai_Eeshwar_D.pdf`, a public version built from the Master (no phone number, no immigration status, no job-search line; Napkin entry has no dates). Do NOT publish `assets/reports/resumes/` (tailored private versions with phone number and work-authorisation/visa details; untracked on purpose). Stale unlinked `assets/reports/resume.pdf` still exists and contains an old phone number.
- **Dissertation PDF** replaced with the owner-supplied final version (125 pages, Aug 2026, supervisor Declan O'Sullivan), same path `assets/reports/image-to-transcription-dissertation.pdf`.
- **Co-author:** CLAN and Chika are both built with Shreyansh Soni (GitHub `batunii`); the credit "Built with Shreyansh Soni" appears on both cards (projects.html, home fallback) and on chika.html. Keep it when editing those cards.
- **Chika download stat:** site says "2,900+ APK downloads" (GitHub API, Nov 2026: APK 2,984, .aab 58, IPA 92, total 3,134). These are raw download counts, not users (1,998 are the v0.1.0 APK; all releases dated 2026-07-08). Do not say "3,000+" or imply user counts.
- **Round 3:** projects.html now has the first 6 cards in the main grid and the rest inside a collapsed `<details class="earlier-work">` (Is It Legal To card unchanged, just moved there). New projects go at the top of the first grid. Filter buttons open the Earlier work section when a category is chosen.
- **Chika iOS:** site says iOS is "coming soon to the App Store". The unsigned IPA download and sideload steps were removed from chika.html; Chika's home/projects cards no longer claim iOS availability.
- **Napkin cost figures** (60% per-call cost cut via Sonnet 5.5 + prompt caching, ~93% cache hits in testing, cheaper model dropped ~75% of facts so stronger model kept, 82% saving traded for quality) were supplied by the owner and confirmed OK to publish by Napkin.
- **Shellock:** shipped, but no one uses it yet; do not add usage or adoption claims.
- **Round 4 (recruiter review fixes):** removed 5 dead `EESH-843/...` GitHub buttons (spotify-viz, math-boolean-gpt, assignment-two-group-10, knowledge-graph, fencer-pro; repos not public). Shellock, CRISP and Wav2Lip now link to `saieeshward`. Poster file renamed `hybrid-forecast-poster.pdf` and labelled "View Poster". Typed strings no longer include "a Video Editor". Pages wrap content in `<main id="main">`; nav toggler, footer icons, filter buttons and the Drive iframe have accessible names. Koffee & Kale card shows "Part-time" in the date slot (not a date). Gallery photos resized to ~700px JPEGs. Footer says "Static HTML, no build step" (site still ships Bootstrap 4 beta + jQuery). `populateLatestWork()` fetches projects.html with `cache: "no-cache"`.
- **Virginia Tech India internship** was in collaboration with IIT Madras; stated on the resume, experience.html, the home timeline and the Heart Murmur card.
