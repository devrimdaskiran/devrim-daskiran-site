# Devrim Daşkıran — Kişisel Web Sitesi ve Teknik Portfolyo

Mekatronik Teknikeri **Devrim Daşkıran**'ın kişisel web sitesi: tanıtım, eğitim, teknik beceriler, proje portfolyosu, CV (web + PDF) ve iletişim.

🌐 Yayın adresi (GitHub Pages etkinleştirildikten sonra): https://devrimdaskiran.github.io/devrim-daskiran-site/

---

## İçindekiler
1. [Kullanılan teknolojiler](#kullanılan-teknolojiler)
2. [Klasör yapısı](#klasör-yapısı)
3. [Kurulum ve yerel ortamda çalıştırma](#kurulum-ve-yerel-ortamda-çalıştırma)
4. [Kişisel bilgileri güncelleme](#kişisel-bilgileri-güncelleme)
5. [Fotoğraf değiştirme](#fotoğraf-değiştirme)
6. [Yeni proje ekleme](#yeni-proje-ekleme)
7. [CV değiştirme](#cv-değiştirme)
8. [İletişim formu](#iletişim-formu)
9. [GitHub Pages'te yayınlama ve GitHub Actions](#github-pageste-yayınlama-ve-github-actions)
10. [SEO ve Google](#seo-ve-google)

---

## Kullanılan teknolojiler

| Parça | Teknoloji |
|---|---|
| Sayfalar | Statik HTML (build sırasında üretilir — Google için ideal) |
| Tasarım | Saf CSS (`src/assets/css/style.css`), Inter yazı tipi (siteyle birlikte barındırılır) |
| Etkileşim | Küçük, bağımlılıksız JavaScript (`src/assets/js/main.js`): mobil menü, proje filtresi, form |
| Build | Node.js betiği (`scripts/build.mjs`) — harici kütüphane yok |
| CV PDF | Playwright + Chromium, CV sayfasını A4 PDF'e dönüştürür (`scripts/cv-pdf.mjs`) |
| Yayın | GitHub Actions → GitHub Pages |

React/Vite gibi ağır araçlar bilinçli olarak kullanılmadı: site hızlı açılır, bakımı kolaydır.

## Klasör yapısı

```
src/
  data/profile.js      ← TÜM BİLGİLERİN BURADA (tek düzenlemen gereken dosya)
  assets/css/style.css ← tasarım ve renkler
  assets/js/main.js    ← menü, filtre, form
  assets/fonts/        ← yazı tipleri
public/                ← olduğu gibi siteye kopyalanan dosyalar
  images/              ← profil fotoğrafı, paylaşım görseli
  images/projeler/     ← proje görselleri
  favicon.svg, favicon.ico, ...
scripts/
  build.mjs            ← siteyi dist/ klasörüne üretir
  cv-pdf.mjs           ← CV PDF'ini üretir
  serve.mjs            ← yerel önizleme sunucusu
  gorseller.py         ← (isteğe bağlı) favicon, paylaşım görseli, fotoğraf kırpma
arsiv/                 ← eski sitenin dosyaları (eski-index.html ve ilk yüklenen zip)
.github/workflows/deploy.yml ← otomatik yayın
```

`dist/` klasörü otomatik üretilir; elle düzenleme ve GitHub'a yükleme gerekmez.

## Kurulum ve yerel ortamda çalıştırma

Gereken: [Node.js 20+](https://nodejs.org/)

```bash
npm install                      # bir kez
npx playwright install chromium  # bir kez (CV PDF için)

npm run dev        # siteyi üretir ve http://localhost:4173 adresinde açar
npm run build      # yalnızca siteyi üretir (dist/)
npm run build:all  # siteyi + CV PDF'ini üretir
```

## Kişisel bilgileri güncelleme

Her şey **`src/data/profile.js`** dosyasındadır. Bölümler:

| Bölüm | Ne içerir |
|---|---|
| `site` | Sitenin adresi, Google doğrulama kodu |
| `profile` | Ad, unvan, kısa tanıtım, Hakkımda paragrafları, ilgi alanları, fotoğraf |
| `profile.private` | Doğum tarihi ve telefon — **varsayılan olarak gizli** |
| `contact` | E-posta, GitHub, LinkedIn, Instagram, X, form servisi |
| `experience` | Staj / iş deneyimleri |
| `certificates` | Kurslar ve sertifikalar |
| `education` | Eğitim bilgileri (okul, program, durum, tarihler) |
| `skills` | Beceri kategorileri ve seviyeleri |
| `projects` | Projeler |

Kurallar:
- Metinleri `"..."` içinde değiştir, satır sonlarındaki virgülleri silme.
- **Boş bırakılan (`""`) alanlar sitede otomatik gizlenir.** Bilmediğin tarihleri boş bırakabilirsin.
- Beceri seviyeleri: `"İleri düzey"`, `"Orta düzey"`, `"Temel düzey"`, `"Geliştiriyorum"` veya `""` (etiketsiz).
- Doğum tarihi / telefonu yayınlamak istersen `showBirthDate` / `showPhone` değerini `true` yap.
- Build betiği veri dosyasında "mühendis" kelimesi geçerse uyarı verip durur (yanlış unvan koruması).

GitHub web arayüzünden de düzenleyebilirsin: dosyayı aç → ✏️ (Edit) → değiştir → **Commit changes**. Birkaç dakika içinde site kendiliğinden güncellenir.

## Fotoğraf değiştirme

**Kolay yol (Python ile):**
```bash
pip install pillow
python scripts/gorseller.py yeni-fotografim.jpg
```
Fotoğrafı kare kırpar, `public/images/profil-640/320` (WebP + JPG) dosyalarını ve paylaşım görselini (`og-image.jpg`) yeniden üretir.

**Elle:** Kare (en az 640×640) bir fotoğrafı `public/images/` klasörüne `profil-640.jpg`, `profil-640.webp`, `profil-320.webp` adlarıyla koy (aynı fotoğrafın üç sürümü). Dosya boyutunu 100 KB altında tutmaya çalış ([squoosh.app](https://squoosh.app) işe yarar).

İpucu: Sade arka planlı, iyi ışıklı bir portre fotoğrafı profesyonel görünümü belirgin şekilde artırır.

## Yeni proje ekleme

1. `src/data/profile.js` içinde `projects` listesindeki bir bloğu kopyala, altına yapıştır ve düzenle:

```js
{
  slug: "akilli-sera",                 // adres: /projeler/akilli-sera/ (küçük harf, rakam, tire)
  title: "Akıllı Sera",
  category: "elektronik",              // oyun | elektronik | cad | yazilim
  context: "Üniversite Projesi",       // Lise / Üniversite / Bitirme / Kişisel Proje veya ""
  status: "Tamamlandı",                // veya "Geliştirme aşamasında", "Prototip", ""
  summary: "Kartta görünen tek cümlelik açıklama.",
  technologies: ["Arduino", "DHT22"],
  image: "images/projeler/akilli-sera.webp",   // yoksa "" (temsili çizim gösterilir)
  imageAlt: "Akıllı sera prototipinin önden görünümü",
  github: "https://github.com/devrimdaskiran/akilli-sera",  // yoksa ""
  demo: "",
  details: ["Detay sayfasındaki 1. paragraf.", "2. paragraf."],
  highlights: [],
},
```

2. Görseli `public/images/projeler/` klasörüne koy (16:9 oran, ~1200×675, WebP veya JPG, tercihen 200 KB altı).
3. Kaydet. Proje kartı, detay sayfası, CV ve site haritası otomatik güncellenir.

CAD ve Yazılım kategorilerinde henüz proje olmadığı için filtre seçildiğinde "yakında eklenecek" kartı görünür; ilk projeyi eklediğinde kendiliğinden kaybolur.

## CV değiştirme

CV'nin hem web sayfası (`/cv/`) hem PDF'i **`profile.js` içeriğinden otomatik** üretilir. Bilgileri orada güncellemen yeterli; GitHub Actions her yayında PDF'i yeniden oluşturur.

- PDF: A4, tek sütun, gerçek (seçilebilir) metin, gömülü Türkçe destekli yazı tipi → ATS uyumlu.
- Yerelde üretmek için: `npm run build:all` → `dist/cv/devrim-daskiran-cv.pdf`
- CV sayfasındaki **Yazdır** düğmesi tarayıcıdan da PDF kaydetmeye olanak verir.

## İletişim formu

GitHub Pages yalnızca statik dosya sunar; sunucu tarafında e-posta gönderemez. Bu yüzden form, üyelik gerektirmeyen **[FormSubmit](https://formsubmit.co)** servisini kullanır (`contact.formEndpoint`). Mesajlar doğrudan `devrimdaskiran@gmail.com` adresine gelir.

⚠️ **Bir kerelik etkinleştirme:** Site yayınlandıktan sonra formdan kendine bir deneme mesajı gönder. FormSubmit e-postana "Confirm your email / Activate form" konulu bir e-posta yollar; içindeki bağlantıya tıkla. Bundan sonra gelen mesajlar doğrudan e-postana düşer. (Gelmezse Spam klasörüne bak.)

Formu kapatmak istersen `formEndpoint: ""` yap: bu durumda "Gönder", ziyaretçinin e-posta uygulamasında hazır bir e-posta açar.

## GitHub Pages'te yayınlama ve GitHub Actions

`.github/workflows/deploy.yml`, `main` dalına her gönderimde şunları yapar: bağımlılıkları yükler → siteyi derler → CV PDF'ini üretir → çıktıyı kontrol eder → GitHub Pages'e yayınlar. Hata olursa yayın yapılmaz.

**Bir kerelik ayar:** GitHub'da depo → **Settings → Pages → Build and deployment → Source: "GitHub Actions"** seç.

Yayın durumunu depo → **Actions** sekmesinden izleyebilirsin. Elle yeniden yayınlamak için: Actions → "Siteyi yayınla" → **Run workflow**.

### Daha iyi adres (önerilir)
- Depo adını **`devrimdaskiran.github.io`** yaparsan site `https://devrimdaskiran.github.io/` adresinde açılır (daha kısa, SEO için daha iyi, `robots.txt` alan adının kökünde çalışır). Ardından `profile.js` → `site.url` değerini buna göre değiştir.
- Kendi alan adını (ör. `devrimdaskiran.com`) alırsan: `public/CNAME` dosyasına alan adını yaz, Settings → Pages'ten ekle ve `site.url`'i güncelle.

## SEO ve Google

Hazır olanlar:
- Her sayfada özgün `<title>`, meta açıklama, canonical adres
- Open Graph + Twitter Card (paylaşım görseli: `public/images/og-image.jpg`)
- Schema.org `Person` (unvan, eğitim kurumları, sosyal profiller), `WebSite`, proje sayfalarında `CreativeWork` ve `BreadcrumbList`
- `sitemap.xml`, `robots.txt`, favicon seti, web manifest, `404.html`
- Semantik HTML, tek `h1`, alt metinler, hızlı yükleme (kütüphanesiz, optimize görseller)

Yayından sonra senin yapman gerekenler:
1. [Google Search Console](https://search.google.com/search-console)'a gir → **Mülk ekle → URL ön eki** → site adresini yaz.
2. Doğrulama yöntemi olarak **HTML etiketi**'ni seç; verilen `content="..."` değerini `profile.js` → `site.googleSiteVerification` alanına yapıştır, kaydet, yayın bitince **Doğrula**'ya bas.
3. **Site haritaları** bölümüne `sitemap.xml` adresini gönder.
4. **URL denetimi** ile ana sayfa için "Dizine eklenmeyi iste".
5. LinkedIn, GitHub profil README'si ve Instagram biyografine site adresini ekle — bu bağlantılar Google'ın siteyi "Devrim Daşkıran" ile ilişkilendirmesine yardım eder.

Not: Google'da görünmek genellikle birkaç gün ile birkaç hafta sürer; sıralama garanti edilemez.
