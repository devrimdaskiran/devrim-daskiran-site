// Site üretici: src/data/profile.js içindeki bilgilerden statik HTML sayfaları oluşturur.
// Çalıştırma: npm run build   →   çıktı: dist/
// Harici bağımlılık kullanmaz (yalnızca Node.js).

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { icons, categoryIcon } from "./icons.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");
const data = await import(pathToFileURL(path.join(ROOT, "src/data/profile.js")).href + `?t=${Date.now()}`);
const { site, profile, contact, education, skills, projects, projectCategories } = data;
const experience = data.experience || [];
const certificates = data.certificates || [];

const YEAR = new Date().getFullYear();
const TODAY = new Date().toISOString().slice(0, 10);
const SITE_URL = site.url.endsWith("/") ? site.url : site.url + "/";

// ---------- yardımcılar ----------
const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
const abs = (p = "") => SITE_URL + p.replace(/^\//, "");
const has = (v) => (Array.isArray(v) ? v.length > 0 : Boolean(v && String(v).trim()));
const catName = (id) => projectCategories.find((c) => c.id === id)?.name ?? id;
const levelClass = (lvl) =>
  ({ "İleri düzey": "lvl-4", "Orta düzey": "lvl-3", İyi: "lvl-3", "Temel düzey": "lvl-2", Geliştiriyorum: "lvl-1" })[lvl] || "";

function validate() {
  const errors = [];
  const slugs = new Set();
  for (const p of projects) {
    if (!/^[a-z0-9-]+$/.test(p.slug || "")) errors.push(`Proje "${p.title}": slug yalnızca küçük harf, rakam ve tire içermeli.`);
    if (slugs.has(p.slug)) errors.push(`Proje slug tekrar ediyor: ${p.slug}`);
    slugs.add(p.slug);
    if (!projectCategories.some((c) => c.id === p.category)) errors.push(`Proje "${p.title}": bilinmeyen kategori "${p.category}".`);
  }
  if (!/^https?:\/\//.test(SITE_URL)) errors.push("site.url http(s):// ile başlamalı.");
  const banned = /mühendis/i;
  const text = JSON.stringify({ profile, education, skills, projects });
  if (banned.test(text)) errors.push('Veri dosyasında "mühendis" ifadesi bulundu. Unvanlar Tekniker/Teknisyen olmalı.');
  if (errors.length) {
    console.error("\n✖ Veri dosyasında hata var (src/data/profile.js):\n  - " + errors.join("\n  - ") + "\n");
    process.exit(1);
  }
}

const socialLinks = () =>
  [
    { key: "github", label: "GitHub", url: contact.github },
    { key: "linkedin", label: "LinkedIn", url: contact.linkedin },
    { key: "instagram", label: "Instagram", url: contact.instagram },
    { key: "x", label: "X (Twitter)", url: contact.x },
  ].filter((l) => has(l.url));

// Proje görseli yoksa kategoriye uygun bir SVG çizimi üretir (fotoğraf taklidi değildir)
function projectArt(p, cls = "card-media") {
  if (has(p.image)) {
    return `<img class="${cls}" src="{{base}}${esc(p.image)}" alt="${esc(p.imageAlt || p.title + " proje görseli")}" loading="lazy" decoding="async" width="800" height="450">`;
  }
  const ic = icons[categoryIcon[p.category] || "code"];
  return `<div class="${cls} art art-${esc(p.category)}" role="img" aria-label="${esc(p.title)} için temsili görsel (proje fotoğrafı henüz eklenmedi)"><span class="art-icon">${ic}</span></div>`;
}

// ---------- ortak şablon ----------
function layout({ pagePath, title, description, body, base, type = "website", jsonld = [], bodyClass = "", noindex = false, ogImage = "images/og-image.jpg" }) {
  const url = abs(pagePath);
  const ld = jsonld.map((o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, "\\u003c")}</script>`).join("\n");
  const html = `<!doctype html>
<html lang="${site.language}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="author" content="${esc(profile.name)}">
<meta name="robots" content="${noindex ? "noindex, follow" : "index, follow, max-image-preview:large"}">
${noindex ? "" : `<link rel="canonical" href="${url}">`}
${has(site.googleSiteVerification) ? `<meta name="google-site-verification" content="${esc(site.googleSiteVerification)}">` : "<!-- Google Search Console doğrulama kodu: src/data/profile.js → site.googleSiteVerification -->"}
<meta name="theme-color" content="#070b14">
<meta name="color-scheme" content="dark">
<meta property="og:type" content="${type}">
<meta property="og:site_name" content="${esc(profile.name)}">
<meta property="og:locale" content="${site.locale}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${abs(ogImage)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(profile.name)} — ${esc(profile.title)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${abs(ogImage)}">
<link rel="icon" href="${base}favicon.svg" type="image/svg+xml">
<link rel="icon" href="${base}favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="${base}apple-touch-icon.png">
<link rel="manifest" href="${base}site.webmanifest">
<link rel="preload" href="${base}assets/fonts/inter-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${base}assets/fonts/inter-latin-ext.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${base}assets/css/style.css">
${ld}
<script>document.documentElement.classList.add('js')</script>
</head>
<body class="${bodyClass}">
<a class="skip-link" href="#icerik">İçeriğe geç</a>
${header(base)}
<main id="icerik" tabindex="-1">
${body}
</main>
${footer(base)}
<script src="${base}assets/js/main.js" defer></script>
</body>
</html>
`;
  return html.replaceAll("{{base}}", base);
}

const NAV = [
  ["#anasayfa", "Ana Sayfa"],
  ["#hakkimda", "Hakkımda"],
  ["#egitim", "Eğitim"],
  ["#yetenekler", "Yetenekler"],
  ["#projeler", "Projeler"],
  ["cv/", "CV"],
  ["#iletisim", "İletişim"],
];

function header(base) {
  const links = NAV.map(([href, label]) => {
    const h = href.startsWith("#") ? `${base || "./"}${href}` : base + href;
    return `<li><a href="${h}">${label}</a></li>`;
  }).join("");
  return `<header class="site-header">
  <nav class="nav container" aria-label="Ana menü">
    <a class="brand" href="${base || "./"}#anasayfa" aria-label="${esc(profile.name)} — Ana sayfa"><span class="brand-mark" aria-hidden="true">DD</span><span class="brand-name">${esc(profile.name)}</span></a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="menu" aria-label="Menüyü aç">${icons.menu}${icons.close}</button>
    <ul class="nav-links" id="menu">${links}</ul>
  </nav>
</header>`;
}

function footer(base) {
  const social = socialLinks()
    .map((l) => `<a href="${esc(l.url)}" rel="me noopener" target="_blank" aria-label="${l.label}">${icons[l.key]}</a>`)
    .join("");
  return `<footer class="site-footer">
  <div class="container footer-inner">
    <p>© ${YEAR} ${esc(profile.name)} · ${esc(profile.title)}</p>
    <div class="footer-social">${has(contact.email) ? `<a href="mailto:${esc(contact.email)}" aria-label="E-posta">${icons.mail}</a>` : ""}${social}</div>
  </div>
</footer>`;
}

// ---------- JSON-LD ----------
function personLd() {
  const alumni = education
    .filter((e) => has(e.school) && e.status === "Mezun")
    .map((e) => ({ "@type": /lise/i.test(e.school) ? "HighSchool" : "CollegeOrUniversity", name: e.school + (has(e.unit) ? " " + e.unit : "") }));
  const o = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": SITE_URL + "#person",
    name: profile.name,
    alternateName: ["Devrim Daskiran", "DEVRİM DAŞKIRAN"],
    givenName: "Devrim",
    familyName: "Daşkıran",
    url: SITE_URL,
    mainEntityOfPage: SITE_URL,
    image: abs(profile.photo.jpg),
    jobTitle: profile.title,
    description: profile.intro,
    nationality: { "@type": "Country", name: "Türkiye" },
    address: { "@type": "PostalAddress", addressLocality: profile.location.split(",")[0], addressCountry: "TR" },
    knowsAbout: profile.interests,
    alumniOf: alumni,
    hasCredential: education
      .filter((e) => has(e.degree))
      .map((e) => ({ "@type": "EducationalOccupationalCredential", credentialCategory: "Önlisans", name: e.degree })),
    sameAs: socialLinks().map((l) => l.url),
  };
  if (has(contact.email)) o.email = "mailto:" + contact.email;
  if (profile.private.showBirthDate && has(profile.private.birthDate)) o.birthDate = profile.private.birthDate;
  return o;
}
const websiteLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": SITE_URL + "#website",
  url: SITE_URL,
  name: profile.name,
  inLanguage: "tr-TR",
  author: { "@id": SITE_URL + "#person" },
});
const breadcrumbLd = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map(([name, url], i) => ({ "@type": "ListItem", position: i + 1, name, item: url })),
});

// ---------- bölümler ----------
const btn = (href, label, icon, cls = "btn", extra = "") =>
  `<a class="${cls}" href="${href}"${extra}>${icon ? icons[icon] : ""}<span>${label}</span></a>`;

function heroSection() {
  const ph = profile.photo;
  const photo = has(ph.jpg)
    ? `<picture>
        <source type="image/webp" srcset="${esc(ph.small)} 320w, ${esc(ph.webp)} 640w" sizes="(max-width: 700px) 220px, 340px">
        <img src="${esc(ph.jpg)}" alt="${esc(ph.alt)}" width="640" height="640" fetchpriority="high" decoding="async">
      </picture>`
    : `<div class="portrait-placeholder" role="img" aria-label="Profil fotoğrafı henüz eklenmedi"><span>DD</span></div>`;
  return `<section class="hero" id="anasayfa" aria-labelledby="hero-title">
  <div class="container hero-grid">
    <div class="hero-text">
      <p class="eyebrow"><span class="dot" aria-hidden="true"></span>Teknik Portfolyo · ${esc(profile.location)}</p>
      <h1 id="hero-title">${esc(profile.name)}</h1>
      <p class="headline">${profile.headline.map((h) => `<span>${esc(h)}</span>`).join('<span class="sep" aria-hidden="true">|</span>')}</p>
      <p class="lead">${esc(profile.intro)}</p>
      <div class="actions">
        ${btn("#projeler", "Projelerim", "arrow", "btn btn-primary")}
        ${btn(esc(profile.cvPdf), "CV İndir", "download", "btn", ` download="Devrim-Daskiran-CV.pdf"`)}
        ${btn("#iletisim", "İletişim", "mail", "btn btn-ghost")}
      </div>
    </div>
    <div class="hero-photo">
      <div class="portrait">${photo}</div>
    </div>
  </div>
</section>`;
}

function aboutSection() {
  const facts = [
    ["Unvan", profile.title],
    ["Odak", "Elektronik · Otomasyon · Yazılım"],
    ["Eğitim", "Mekatronik — ÇOMÜ Çan MYO (Mezun)"],
    ["Deneyim", `${experience.length} dönem endüstriyel staj`],
    ["Konum", profile.location],
  ];
  return `<section class="section" id="hakkimda" aria-labelledby="hakkimda-title">
  <div class="container">
    <div class="section-head"><p class="kicker">01 · Hakkımda</p><h2 id="hakkimda-title">Üreterek öğrenen bir teknik personel</h2></div>
    <div class="about-grid">
      <div class="about-text">${profile.about.map((p) => `<p>${esc(p)}</p>`).join("")}</div>
      <aside class="card facts" aria-label="Kısa bilgiler">
        <dl>${facts.map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>
      </aside>
    </div>
    <h3 class="sub-title">İlgi ve odak alanlarım</h3>
    <ul class="tags">${profile.interests.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>
  </div>
</section>`;
}

function educationSection() {
  const items = education
    .map((e) => {
      const dates = [e.start, e.end].filter(has).join(" – ");
      const meta = [
        has(e.type) ? `<span>${esc(e.type)}</span>` : "",
        has(dates) ? `<span>${esc(dates)}</span>` : "",
      ].join("");
      return `<li class="tl-item">
      <span class="tl-dot" aria-hidden="true">${icons.school}</span>
      <article class="card tl-card">
        <div class="tl-top">
          <h3>${esc(e.program)}</h3>
          ${has(e.status) ? `<span class="badge">${esc(e.status)}</span>` : ""}
        </div>
        <p class="tl-school">${esc(e.school)}${has(e.unit) ? ` · ${esc(e.unit)}` : ""}</p>
        <p class="tl-meta">${meta}</p>
        ${has(e.degree) ? `<p class="tl-degree">Mesleki unvan: <strong>${esc(e.degree)}</strong>${has(e.gpa) ? ` · Not ortalaması: <strong>${esc(e.gpa)}</strong>` : ""}</p>` : ""}
        ${has(e.description) ? `<p>${esc(e.description)}</p>` : ""}
      </article>
    </li>`;
    })
    .join("");
  return `<section class="section section-alt" id="egitim" aria-labelledby="egitim-title">
  <div class="container">
    <div class="section-head"><p class="kicker">02 · Eğitim</p><h2 id="egitim-title">Eğitim ve deneyim</h2></div>
    <ol class="timeline">${items}</ol>
    ${experienceBlock()}
    ${certificatesBlock()}
  </div>
</section>`;
}

function experienceBlock() {
  if (!experience.length) return "";
  const items = experience
    .map(
      (x) => `<li class="tl-item">
      <span class="tl-dot" aria-hidden="true">${icons.gear}</span>
      <article class="card tl-card">
        <div class="tl-top"><h4>${esc(x.role)}</h4>${has(x.start) ? `<span class="badge">${esc([x.start, x.end].filter(has).join(" – "))}</span>` : ""}</div>
        <p class="tl-school">${esc(x.company)}${has(x.location) ? ` · ${esc(x.location)}` : ""}</p>
        ${has(x.description) ? `<p>${esc(x.description)}</p>` : ""}
      </article>
    </li>`
    )
    .join("");
  return `<h3 class="sub-title sub-title-lg" id="deneyim">Staj deneyimi</h3><ol class="timeline">${items}</ol>`;
}

function certificatesBlock() {
  if (!certificates.length) return "";
  const groupOf = (c) => (has(c.status) ? "Devam eden eğitimler" : /MEB|Halk Eğitim/i.test(c.issuer || "") ? "MEB · e-Yaygın" : c.issuer || "Diğer");
  const groups = [];
  for (const c of certificates) {
    const g = groupOf(c);
    let grp = groups.find((x) => x.name === g);
    if (!grp) groups.push((grp = { name: g, items: [] }));
    grp.items.push(c);
  }
  const card = (c) =>
    `<li class="card cert"><span class="skill-icon">${icons.file}</span><span><strong>${esc(c.name)}</strong>${
      [c.status ? c.issuer : "", c.year].filter(has).length ? `<span>${esc([c.status ? c.issuer : "", c.year].filter(has).join(" · "))}</span>` : ""
    }${has(c.status) ? `<span class="level lvl-1">${esc(c.status)}</span>` : ""}</span></li>`;
  const done = certificates.filter((c) => !has(c.status)).length;
  return `<h3 class="sub-title sub-title-lg" id="sertifikalar">Kurslar ve sertifikalar <span class="cert-count">(${done})</span></h3>
  ${groups
    .map((g) => {
      const main = g.items.filter((c) => c.cv !== false);
      const rest = g.items.filter((c) => c.cv === false);
      const more = rest.length
        ? `<details class="cert-more"><summary>+${rest.length} diğer sertifika</summary><ul class="cert-mini">${rest
            .map((c) => `<li>${esc(c.name)}${has(c.year) ? ` <span>${esc(c.year)}</span>` : ""}</li>`)
            .join("")}</ul></details>`
        : "";
      return `<h4 class="cert-group">${esc(g.name)} <span class="cert-count">${g.items.length}</span></h4><ul class="cert-grid">${main.map(card).join("")}</ul>${more}`;
    })
    .join("")}`;
}

function skillsSection() {
  const cards = skills
    .map(
      (s) => `<article class="card skill-card">
      <div class="skill-head"><span class="skill-icon">${icons[s.icon] || icons.code}</span><h3>${esc(s.category)}</h3></div>
      <ul class="skill-list">${s.items
        .map((i) => `<li><span>${esc(i.name)}</span>${has(i.level) ? `<span class="level ${levelClass(i.level)}">${esc(i.level)}</span>` : ""}</li>`)
        .join("")}</ul>
    </article>`
    )
    .join("");
  return `<section class="section" id="yetenekler" aria-labelledby="yetenekler-title">
  <div class="container">
    <div class="section-head"><p class="kicker">03 · Yetenekler</p><h2 id="yetenekler-title">Teknik beceriler</h2>
    <p class="section-note">Seviyeler ölçülmemiş yüzdelerle değil, dürüst bir sınıflandırmayla gösterilir: <span class="level lvl-4">İleri düzey</span> <span class="level lvl-3">Orta düzey</span> <span class="level lvl-2">Temel düzey</span> <span class="level lvl-1">Geliştiriyorum</span></p></div>
    <div class="skills-grid">${cards}</div>
  </div>
</section>`;
}

function projectCard(p) {
  return `<article class="card project-card" data-category="${esc(p.category)}">
  <a class="card-media-link" href="{{base}}projeler/${esc(p.slug)}/" tabindex="-1" aria-hidden="true">${projectArt(p)}</a>
  <div class="project-body">
    <div class="project-meta"><span class="cat">${esc(p.context || catName(p.category))}</span>${has(p.status) ? `<span class="badge">${esc(p.status)}</span>` : ""}</div>
    <h3><a href="{{base}}projeler/${esc(p.slug)}/">${esc(p.title)}</a></h3>
    <p>${esc(p.summary)}</p>
    ${has(p.technologies) ? `<ul class="tech" aria-label="Kullanılan teknolojiler">${p.technologies.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>` : ""}
    <div class="project-actions">
      <a class="link" href="{{base}}projeler/${esc(p.slug)}/">Detayları görüntüle ${icons.arrow}</a>
      ${has(p.github) ? `<a class="link" href="${esc(p.github)}" target="_blank" rel="noopener">${icons.github} GitHub</a>` : ""}
    </div>
  </div>
</article>`;
}

function projectsSection() {
  const filters = [{ id: "all", name: "Tümü" }, ...projectCategories]
    .map(
      (c, i) =>
        `<button type="button" class="filter" data-filter="${c.id}" aria-pressed="${i === 0}">${esc(c.name)}${
          c.id !== "all" ? ` <span class="count">${projects.filter((p) => p.category === c.id).length}</span>` : ""
        }</button>`
    )
    .join("");
  const empties = projectCategories
    .filter((c) => !projects.some((p) => p.category === c.id))
    .map(
      (c) => `<div class="card empty-card" data-category="${c.id}" data-empty>
      <span class="skill-icon">${icons[categoryIcon[c.id]]}</span>
      <h3>${esc(c.name)}</h3>
      <p>Bu alandaki çalışmalarım yakında burada yer alacak.</p>
    </div>`
    )
    .join("");
  return `<section class="section section-alt" id="projeler" aria-labelledby="projeler-title">
  <div class="container">
    <div class="section-head"><p class="kicker">04 · Projeler</p><h2 id="projeler-title">Portfolyo</h2>
    <p class="section-note">Oyun geliştirme, elektronik, CAD ve yazılım alanlarında üzerinde çalıştığım projeler.</p></div>
    <div class="filters" role="group" aria-label="Projeleri kategoriye göre filtrele">${filters}</div>
    <div class="projects-grid" aria-live="polite">${projects.map(projectCard).join("")}${empties}</div>
  </div>
</section>`;
}

function cvSection() {
  return `<section class="section" id="cv" aria-labelledby="cv-title">
  <div class="container">
    <div class="card cv-cta">
      <div>
        <p class="kicker">05 · CV</p>
        <h2 id="cv-title">Özgeçmişim</h2>
        <p>Eğitim bilgilerimi, teknik becerilerimi ve projelerimi tek sayfada inceleyebilir ya da A4 PDF olarak indirebilirsiniz.</p>
      </div>
      <div class="actions">
        ${btn("cv/", "CV'yi görüntüle", "file", "btn")}
        ${btn(esc(profile.cvPdf), "PDF indir", "download", "btn btn-primary", ` download="Devrim-Daskiran-CV.pdf"`)}
      </div>
    </div>
  </div>
</section>`;
}

function contactSection() {
  const items = [
    has(contact.email) && { key: "mail", label: "E-posta", value: contact.email, url: "mailto:" + contact.email },
    has(contact.github) && { key: "github", label: "GitHub", value: contact.github.replace(/^https?:\/\/(www\.)?/, ""), url: contact.github },
    has(contact.linkedin) && { key: "linkedin", label: "LinkedIn", value: "LinkedIn profilim", url: contact.linkedin },
    { key: "file", label: "CV", value: "PDF olarak indir", url: profile.cvPdf, download: true },
  ].filter(Boolean);
  const list = items
    .map(
      (i) =>
        `<li><a class="contact-item" href="${esc(i.url)}"${i.download ? ' download="Devrim-Daskiran-CV.pdf"' : i.url.startsWith("http") ? ' target="_blank" rel="me noopener"' : ""}>
        <span class="skill-icon">${icons[i.key]}</span><span><strong>${i.label}</strong><span>${esc(i.value)}</span></span></a></li>`
    )
    .join("");
  const other = socialLinks().filter((l) => !["github", "linkedin"].includes(l.key));
  const formNote = has(contact.formEndpoint)
    ? "Mesajınız doğrudan bana iletilir."
    : "Gönder'e bastığınızda mesajınız, cihazınızdaki e-posta uygulamasında hazır bir e-posta olarak açılır.";
  return `<section class="section section-alt" id="iletisim" aria-labelledby="iletisim-title">
  <div class="container">
    <div class="section-head"><p class="kicker">06 · İletişim</p><h2 id="iletisim-title">Birlikte çalışalım</h2>
    <p class="section-note">İş fırsatları, staj, proje iş birlikleri veya sorularınız için bana ulaşabilirsiniz.</p></div>
    <div class="contact-grid">
      <div>
        <ul class="contact-list">${list}</ul>
        ${other.length ? `<div class="social-row">${other.map((l) => `<a class="btn btn-ghost btn-sm" href="${esc(l.url)}" target="_blank" rel="me noopener">${icons[l.key]}<span>${l.label}</span></a>`).join("")}</div>` : ""}
      </div>
      <form class="card contact-form" id="contact-form" ${has(contact.formEndpoint) ? `action="${esc(contact.formEndpoint)}" method="POST" data-mode="endpoint"` : `action="mailto:${esc(contact.email)}" method="post" enctype="text/plain" data-mode="mailto"`} data-email="${esc(contact.email)}" novalidate>
        ${has(contact.formAccessKey) ? `<input type="hidden" name="access_key" value="${esc(contact.formAccessKey)}">` : ""}
        <input type="hidden" name="subject" value="Web sitesi üzerinden yeni mesaj">
        <input type="hidden" name="from_name" value="devrimdaskiran.github.io">
        <div class="hp" aria-hidden="true"><label for="f-honey">Bu alanı boş bırakın</label><input id="f-honey" type="checkbox" name="botcheck" tabindex="-1" autocomplete="off"></div>
        <div class="field"><label for="f-name">Adınız</label><input id="f-name" name="name" type="text" autocomplete="name" required></div>
        <div class="field"><label for="f-email">E-posta adresiniz</label><input id="f-email" name="email" type="email" autocomplete="email" required></div>
        <div class="field"><label for="f-msg">Mesajınız</label><textarea id="f-msg" name="message" rows="5" required></textarea></div>
        <button class="btn btn-primary" type="submit">${icons.mail}<span>Gönder</span></button>
        <p class="form-note">${formNote}</p>
        <p class="form-status" role="status" aria-live="polite"></p>
      </form>
    </div>
  </div>
</section>`;
}

// ---------- sayfalar ----------
function homePage() {
  const body = [heroSection(), aboutSection(), educationSection(), skillsSection(), projectsSection(), cvSection(), contactSection()].join("\n");
  return layout({
    pagePath: "",
    base: "",
    title: `${profile.name} | ${profile.title} · Elektronik, Otomasyon ve Yazılım`,
    description: `${profile.name} — ${profile.title}. Elektronik, otomasyon, Arduino/ESP32, CAD ve yazılım projelerini içeren kişisel web sitesi ve teknik portfolyo. CV ve iletişim bilgileri.`,
    body,
    type: "profile",
    jsonld: [personLd(), websiteLd()],
    bodyClass: "home",
  });
}

function projectPage(p) {
  const base = "../../";
  const body = `<article class="section project-page">
  <div class="container narrow">
    <nav class="breadcrumb" aria-label="Sayfa yolu"><a href="${base}">Ana Sayfa</a><span aria-hidden="true">/</span><a href="${base}#projeler">Projeler</a><span aria-hidden="true">/</span><span aria-current="page">${esc(p.title)}</span></nav>
    <div class="project-meta"><span class="cat">${esc(catName(p.category))}${has(p.context) ? " · " + esc(p.context) : ""}</span>${has(p.status) ? `<span class="badge">${esc(p.status)}</span>` : ""}</div>
    <h1>${esc(p.title)}</h1>
    <p class="lead">${esc(p.summary)}</p>
    ${projectArt(p, "project-hero-media")}
    <div class="prose">${(p.details || []).map((d) => `<p>${esc(d)}</p>`).join("")}</div>
    ${has(p.highlights) ? `<h2 class="sub-title">Öne çıkan özellikler</h2><ul class="tags">${p.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>` : ""}
    ${has(p.technologies) ? `<h2 class="sub-title">Kullanılan teknolojiler</h2><ul class="tech">${p.technologies.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>` : ""}
    <div class="actions">
      ${btn(base + "#projeler", "Tüm projeler", "back", "btn btn-ghost")}
      ${has(p.github) ? btn(esc(p.github), "GitHub deposu", "github", "btn", ' target="_blank" rel="noopener"') : ""}
      ${has(p.demo) ? btn(esc(p.demo), "Canlı demo", "external", "btn btn-primary", ' target="_blank" rel="noopener"') : ""}
    </div>
  </div>
</article>`;
  const url = abs(`projeler/${p.slug}/`);
  return layout({
    pagePath: `projeler/${p.slug}/`,
    base,
    title: `${p.title} | ${profile.name} Portfolyo`,
    description: `${p.summary} — ${profile.name} tarafından geliştirilen ${catName(p.category).toLowerCase()} projesi.`,
    body,
    type: "article",
    jsonld: [
      {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: p.title,
        description: p.summary,
        url,
        inLanguage: "tr-TR",
        keywords: p.technologies.join(", "),
        creativeWorkStatus: p.status || undefined,
        author: { "@type": "Person", name: profile.name, url: SITE_URL },
      },
      breadcrumbLd([["Ana Sayfa", SITE_URL], ["Projeler", SITE_URL + "#projeler"], [p.title, url]]),
    ],
    bodyClass: "subpage",
  });
}

function cvPage() {
  const base = "../";
  const edu = education
    .map((e) => {
      const dates = [e.start, e.end].filter(has).join(" – ");
      return `<div class="cv-entry">
        <div class="cv-entry-head"><h3>${esc(e.program)}${has(e.degree) ? ` — ${esc(e.degree)}` : ""}</h3>${has(dates) ? `<span>${esc(dates)}</span>` : ""}</div>
        <p class="cv-org">${esc(e.school)}${has(e.unit) ? `, ${esc(e.unit)}` : ""}${has(e.type) ? ` · ${esc(e.type)}` : ""}${has(e.status) ? ` · ${esc(e.status)}` : ""}${has(e.gpa) ? ` · Not ortalaması: ${esc(e.gpa)}` : ""}</p>
      </div>`;
    })
    .join("");
  // CV'de aynı aracın iki kategoride tekrar etmesini önle
  const seen = new Set();
  const sk = skills
    .map((s) => {
      const items = s.items.filter((i) => {
        const key = i.name.replace(/\s*\(.*\)/, "").toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
      return items.length ? `<li><strong>${esc(s.category)}:</strong> ${items.map((i) => esc(i.name) + (has(i.level) ? ` (${esc(i.level)})` : "")).join(", ")}</li>` : "";
    })
    .join("");
  const pr = projects
    .map(
      (p) => `<div class="cv-entry">
        <div class="cv-entry-head"><h3>${esc(p.title)}${has(p.context) ? ` | ${esc(p.context)}` : ""}</h3>${has(p.status) ? `<span>${esc(p.status)}</span>` : ""}</div>
        <p>${esc(p.summary)}</p>
      </div>`
    )
    .join("");
  const exp = experience
    .map(
      (x) => `<div class="cv-entry">
        <div class="cv-entry-head"><h3>${esc(x.role)}</h3><span>${esc([x.start, x.end].filter(has).join(" – "))}</span></div>
        <p class="cv-org">${esc(x.company)}${has(x.location) ? ` · ${esc(x.location)}` : ""}</p>
        ${has(x.description) ? `<p>${esc(x.description)}</p>` : ""}
      </div>`
    )
    .join("");
  const certs = certificates
    .filter((c) => !has(c.status) && c.cv !== false)
    .map((c) => esc(c.name) + (has(c.year) ? ` (${esc(c.year)})` : ""))
    .join(" · ");
  const certsOngoing = certificates
    .filter((c) => has(c.status))
    .map((c) => esc(c.name) + (has(c.issuer) ? ` (${esc(c.issuer)})` : ""))
    .join(" · ");
  const extraLines = [
    ...(profile.languages || []).map((l) => `<li><strong>${esc(l.name)}:</strong> ${esc(l.level)}</li>`),
    has(profile.extra?.drivingLicense) && `<li><strong>Sürücü belgesi:</strong> ${esc(profile.extra.drivingLicense)}</li>`,
    has(profile.extra?.military) && `<li><strong>Askerlik:</strong> ${esc(profile.extra.military)}</li>`,
    has(profile.targetPositions) && `<li><strong>Hedef pozisyonlar:</strong> ${profile.targetPositions.map(esc).join(" · ")}</li>`,
  ].filter(Boolean).join("");
  const contactLines = [
    has(contact.email) && `<li>E-posta: <a href="mailto:${esc(contact.email)}">${esc(contact.email)}</a></li>`,
    profile.private.showPhone && has(profile.private.phone) && `<li>Telefon: ${esc(profile.private.phone)}</li>`,
    `<li>Web: <a href="${SITE_URL}">${SITE_URL.replace(/^https?:\/\//, "").replace(/\/$/, "")}</a></li>`,
    has(contact.github) && `<li>GitHub: <a href="${esc(contact.github)}">${esc(contact.github.replace(/^https?:\/\/(www\.)?/, ""))}</a></li>`,
    has(contact.linkedin) && `<li>LinkedIn: <a href="${esc(contact.linkedin)}">${esc(contact.linkedin.replace(/^https?:\/\/(www\.)?/, ""))}</a></li>`,
    `<li>Konum: ${esc(profile.location)}</li>`,
  ]
    .filter(Boolean)
    .join("");
  const body = `<div class="section cv-page">
  <div class="container narrow">
    <div class="cv-toolbar no-print">
      ${btn(base, "Ana sayfa", "back", "btn btn-ghost btn-sm")}
      <div class="actions">
        <button class="btn btn-sm" type="button" data-print>${icons.file}<span>Yazdır</span></button>
        ${btn("devrim-daskiran-cv.pdf", "PDF indir", "download", "btn btn-primary btn-sm", ' download="Devrim-Daskiran-CV.pdf"')}
      </div>
    </div>
    <article class="cv-sheet" aria-labelledby="cv-name">
      <header class="cv-header">
        <h1 id="cv-name">${esc(profile.name)}</h1>
        <p class="cv-title">${esc(profile.headline.slice(0, 2).join(" | "))}</p>
        <ul class="cv-contact">${contactLines}</ul>
      </header>
      <section><h2>Profil</h2><p>${esc(profile.intro)}</p></section>
      <section><h2>Teknik Beceriler</h2><ul class="cv-skills">${sk}</ul></section>
      ${exp ? `<section><h2>Staj Deneyimi</h2>${exp}</section>` : ""}
      <section><h2>Projeler</h2>${pr}</section>
      <section><h2>Eğitim</h2>${edu}</section>
      ${certs ? `<section><h2>Kurslar ve Sertifikalar</h2><p>${certs}</p>${certsOngoing ? `<p><strong>Devam eden:</strong> ${certsOngoing}</p>` : ""}</section>` : ""}
      ${extraLines ? `<section><h2>Dil ve Ek Bilgiler</h2><ul class="cv-inline">${extraLines}</ul></section>` : ""}
    </article>
  </div>
</div>`;
  return layout({
    pagePath: "cv/",
    base,
    title: `${profile.name} CV | ${profile.title}`,
    description: `${profile.name} özgeçmişi (CV): ${profile.title}; eğitim bilgileri, elektronik, otomasyon, CAD ve yazılım becerileri, projeler ve iletişim bilgileri. PDF olarak indirilebilir.`,
    body,
    type: "profile",
    jsonld: [breadcrumbLd([["Ana Sayfa", SITE_URL], ["CV", abs("cv/")]])],
    bodyClass: "subpage cv",
  });
}

function notFoundPage() {
  // 404 sayfası farklı adreslerde gösterilebildiği için mutlak adresler kullanır
  const base = SITE_URL;
  const body = `<section class="section notfound"><div class="container narrow">
    <p class="kicker">Hata 404</p><h1>Sayfa bulunamadı</h1>
    <p class="lead">Aradığınız sayfa taşınmış veya hiç var olmamış olabilir.</p>
    <div class="actions">${btn(base, "Ana sayfaya dön", "back", "btn btn-primary")}${btn(base + "#projeler", "Projeler", "arrow", "btn")}</div>
  </div></section>`;
  return layout({ pagePath: "404.html", base, title: `Sayfa bulunamadı | ${profile.name}`, description: "Aradığınız sayfa bulunamadı.", body, noindex: true, bodyClass: "subpage" });
}

function sitemap() {
  const urls = [
    { loc: SITE_URL, pr: "1.0" },
    { loc: abs("cv/"), pr: "0.8" },
    ...projects.map((p) => ({ loc: abs(`projeler/${p.slug}/`), pr: "0.6" })),
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u.loc}</loc><lastmod>${TODAY}</lastmod><priority>${u.pr}</priority></url>`).join("\n")}
</urlset>
`;
}

const robots = () => `User-agent: *
Allow: /

Sitemap: ${abs("sitemap.xml")}
`;

const manifest = () =>
  JSON.stringify(
    {
      name: profile.name,
      short_name: "D. Daşkıran",
      description: `${profile.name} — ${profile.title}`,
      start_url: "./",
      display: "standalone",
      background_color: "#070b14",
      theme_color: "#070b14",
      lang: "tr",
      icons: [
        { src: "icon-192.png", sizes: "192x192", type: "image/png" },
        { src: "icon-512.png", sizes: "512x512", type: "image/png" },
      ],
    },
    null,
    2
  );

// ---------- yazma ----------
async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  for (const entry of await fs.readdir(src, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) await copyDir(s, d);
    else await fs.copyFile(s, d);
  }
}
async function write(rel, content) {
  const file = path.join(DIST, rel);
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, content);
}

validate();
// Önceki PDF'i koru (PDF adımı ayrı çalışır)
const pdfRel = profile.cvPdf;
let oldPdf = null;
try { oldPdf = await fs.readFile(path.join(DIST, pdfRel)); } catch {}
await fs.rm(DIST, { recursive: true, force: true });
await copyDir(path.join(ROOT, "public"), DIST);
await copyDir(path.join(ROOT, "src/assets"), path.join(DIST, "assets"));
if (oldPdf) await write(pdfRel, oldPdf);

await write("index.html", homePage());
await write("cv/index.html", cvPage());
for (const p of projects) await write(`projeler/${p.slug}/index.html`, projectPage(p));
await write("404.html", notFoundPage());
await write("sitemap.xml", sitemap());
await write("robots.txt", robots());
await write("site.webmanifest", manifest());
await write(".nojekyll", "");

console.log(`✔ Site oluşturuldu → dist/  (${projects.length} proje sayfası, adres: ${SITE_URL})`);
