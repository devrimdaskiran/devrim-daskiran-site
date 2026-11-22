// =====================================================================
//  DEVRİM DAŞKIRAN — SİTENİN TÜM BİLGİLERİ BU DOSYADA
// ---------------------------------------------------------------------
//  Siteyi güncellemek için yalnızca bu dosyayı düzenlemen yeterli.
//  • Metinleri tırnak işaretleri ("...") içinde değiştir.
//  • Boş bırakılan alanlar ("") sitede otomatik olarak gizlenir.
//  • Her satırın sonundaki virgüllere dikkat et.
//  Ayrıntılı anlatım: README.md → "Kişisel bilgileri güncelleme"
// =====================================================================

export const site = {
  // Sitenin yayınlanacağı tam adres (sonunda / olmalı).
  // Depo adını "devrimdaskiran.github.io" yaparsan: "https://devrimdaskiran.github.io/"
  // Kendi alan adını alırsan:                     "https://www.devrimdaskiran.com/"
  url: "https://devrimdaskiran.github.io/devrim-daskiran-site/",
  language: "tr",
  locale: "tr_TR",
  // Google Search Console "HTML etiketi" doğrulama kodu (yalnızca content="..." içindeki değer).
  googleSiteVerification: "",
};

export const profile = {
  name: "Devrim Daşkıran",
  // Başlıkta ve CV'de görünen ana unvan
  title: "Mekatronik Teknikeri",
  // Ana sayfadaki unvan satırı
  headline: ["Mekatronik Teknikeri", "Elektronik ve Otomasyon", "Yazılım Geliştirme"],
  location: "Türkiye",
  // Ana sayfadaki kısa tanıtım
  intro:
    "Elektronik, mekatronik, otomasyon ve yazılım alanlarında kendini geliştiren bir teknik personelim. Arduino ve ESP32 tabanlı sistemlerden CAD tasarımına, oyun geliştirmeden yazılım projelerine kadar fikirleri çalışan uygulamalara dönüştürmeye odaklanıyorum.",
  // Hakkımda bölümündeki paragraflar
  about: [
    "Mekatronik programında elektronik, mekanik, otomasyon ve teknik sistemler üzerine eğitim aldım. Meslek lisesinde Elektrik-Elektronik Teknolojisi alanında başlayan teknik geçmişimi, Anadolu Üniversitesi Bilgisayar Programcılığı programıyla yazılım tarafında genişletiyorum.",
    "Benim için öğrenmenin en iyi yolu üretmek. Mikrodenetleyicilerle çalışan sistemler kuruyor, AutoCAD ve Fusion 360 ile tasarımlar hazırlıyor, Python, C# ve Godot ile yazılım projeleri geliştiriyorum.",
    "Hedefim; endüstriyel otomasyon, elektronik sistemler ve robotik alanlarında teknik bilgimi ve uygulamalı becerilerimi kullanabileceğim bir ekipte çalışmak, deneyim kazanmak ve kendimi sürekli geliştirmek.",
  ],
  // İlgi / odak alanları (Hakkımda bölümünde etiket olarak görünür)
  interests: [
    "Endüstriyel otomasyon",
    "Elektrik ve elektronik sistemleri",
    "Mekatronik uygulamaları",
    "Robotik teknolojiler",
    "Arduino ve ESP32",
    "Mikrodenetleyici sistemleri",
    "Elektronik devre tasarımı",
    "CAD ve 3D modelleme",
    "Bilgisayar programlama",
    "Teknik proje geliştirme",
    "Yenilenebilir enerji teknolojileri",
    "Araştırma ve geliştirme",
  ],
  // Profil fotoğrafı: public/images/ klasöründeki dosya adları (README → "Fotoğraf değiştirme")
  photo: {
    webp: "images/profil-640.webp",
    jpg: "images/profil-640.jpg",
    small: "images/profil-320.webp",
    alt: "Devrim Daşkıran'ın portre fotoğrafı",
  },
  // CV PDF dosyası (build sırasında otomatik üretilir)
  cvPdf: "cv/devrim-daskiran-cv.pdf",

  // --- Gizli kişisel bilgiler -----------------------------------------
  // Bu alanlar varsayılan olarak SİTEDE GÖSTERİLMEZ.
  // Yayınlamak istersen ilgili "show..." değerini true yap.
  private: {
    birthDate: "",          // ör. "2007-01-01"
    showBirthDate: false,
    phone: "",              // ör. "+90 5xx xxx xx xx"
    showPhone: false,
  },
};

// İletişim ve sosyal bağlantılar. Boş bırakılan bağlantı sitede gösterilmez.
export const contact = {
  email: "devrimdaskiran@gmail.com",
  github: "https://github.com/devrimdaskiran",
  linkedin: "https://www.linkedin.com/in/devrim-d-065723332",
  instagram: "https://www.instagram.com/devrimdaskiran",
  x: "https://x.com/Dskrn_Devrim",
  // İletişim formu: GitHub Pages sunucu tarafı kod çalıştıramaz.
  //  • Boş bırakılırsa form, ziyaretçinin e-posta uygulamasında hazır bir e-posta açar.
  //  • Formspree (https://formspree.io) gibi bir servisten aldığın adresi yazarsan
  //    mesajlar doğrudan e-postana gelir. Ör: "https://formspree.io/f/abcdwxyz"
  formEndpoint: "",
};

// ---------------------------------------------------------------------
// EĞİTİM — en yeniden en eskiye doğru sırala
//   status : "Mezun", "Devam ediyor", "Öğrenci" vb. (bilmiyorsan "" bırak)
//   start / end : ör. "2023" veya "Eylül 2023" (bilmiyorsan "" bırak)
// ---------------------------------------------------------------------
export const education = [
  {
    school: "Anadolu Üniversitesi",
    unit: "Açıköğretim Fakültesi",
    program: "Bilgisayar Programcılığı",
    type: "Açıköğretim (Önlisans)",
    status: "Öğrenci",
    start: "",
    end: "",
    description:
      "Bilgisayar programlama, yazılım geliştirme ve bilgisayar teknolojileri alanlarında bilgimi geliştiriyorum.",
  },
  {
    school: "Çanakkale Onsekiz Mart Üniversitesi",
    // Yüksekokulun tam adını yaz: "Çanakkale Teknik Bilimler Meslek Yüksekokulu" veya "Çan Meslek Yüksekokulu"
    unit: "",
    program: "Mekatronik",
    type: "Önlisans · Elektronik ve Otomasyon",
    status: "",
    degree: "Mekatronik Teknikeri",
    start: "",
    end: "",
    description:
      "Elektronik, mekanik, otomasyon ve teknik sistemler üzerine eğitim aldım.",
  },
  {
    school: "Meslek Lisesi", // okulun tam adını buraya yaz
    unit: "",
    program: "Elektrik-Elektronik Teknolojisi",
    type: "Mesleki ve Teknik Ortaöğretim",
    status: "",
    start: "",
    end: "",
    description:
      "Elektrik, elektronik, devreler ve teknik uygulamalar alanlarında temel mesleki bilgiler edindim.",
  },
];

// ---------------------------------------------------------------------
// YETENEKLER
//   level: "İleri düzey" | "Orta düzey" | "Temel düzey" | "Geliştiriyorum" | ""
//   Seviyesini belirtmediğin araçlar seviye etiketi olmadan listelenir.
//   icon: chip | gear | ruler | code | cube | office
// ---------------------------------------------------------------------
export const skills = [
  {
    category: "Elektronik",
    icon: "chip",
    items: [
      { name: "Arduino IDE ve Arduino tabanlı projeler", level: "" },
      { name: "ESP32", level: "" },
      { name: "Mikrodenetleyiciler", level: "" },
      { name: "Elektronik devreler", level: "" },
      { name: "Proteus 8", level: "" },
      { name: "Elektrik-Elektronik sistemleri", level: "" },
    ],
  },
  {
    category: "Otomasyon",
    icon: "gear",
    items: [
      { name: "FluidSIM", level: "" },
      { name: "Temel otomasyon uygulamaları", level: "" },
      { name: "Mekatronik sistemler", level: "" },
    ],
  },
  {
    category: "CAD",
    icon: "ruler",
    items: [
      { name: "AutoCAD", level: "İleri düzey" },
      { name: "Autodesk Fusion 360", level: "" },
    ],
  },
  {
    category: "3D Tasarım",
    icon: "cube",
    items: [
      { name: "Autodesk Fusion 360", level: "" },
      { name: "Autodesk Maya", level: "" },
    ],
  },
  {
    category: "Programlama",
    icon: "code",
    items: [
      { name: "Python", level: "Geliştiriyorum" },
      { name: "C#", level: "Geliştiriyorum" },
      { name: "Visual Studio", level: "" },
      { name: "Arduino (C/C++)", level: "" },
      { name: "Godot 4 (GDScript)", level: "" },
    ],
  },
  {
    category: "Ofis Uygulamaları",
    icon: "office",
    items: [
      { name: "Microsoft Word", level: "" },
      { name: "Microsoft Excel", level: "" },
      { name: "Microsoft PowerPoint", level: "" },
    ],
  },
];

// ---------------------------------------------------------------------
// PROJELER
//   category : "oyun" | "elektronik" | "cad" | "yazilim"
//   status   : "Geliştirme aşamasında" | "Tamamlandı" | "Prototip" | "" (boşsa gösterilmez)
//   image    : public/images/projeler/ içindeki dosya (boşsa kategoriye uygun bir görsel çizilir)
//   github / demo : bağlantı yoksa "" bırak
//   details  : detay sayfasında görünen paragraflar
//   Yeni proje eklemek için bir bloğu kopyalayıp düzenle. slug benzersiz olmalı
//   (yalnızca küçük harf, rakam ve tire).
// ---------------------------------------------------------------------
export const projectCategories = [
  { id: "oyun", name: "Oyun Geliştirme" },
  { id: "elektronik", name: "Elektronik ve Arduino" },
  { id: "cad", name: "CAD ve 3D Tasarım" },
  { id: "yazilim", name: "Yazılım" },
];

export const projects = [
  {
    slug: "damla-damla-gol-olur",
    title: "Damla Damla Göl Olur",
    category: "oyun",
    status: "Geliştirme aşamasında",
    summary:
      "Küçük miktarlarda su toplayarak bir göl oluşturmayı hedefleyen, ilerlemeye dayalı bir oyun.",
    technologies: ["Godot 4", "GDScript"],
    image: "",
    imageAlt: "",
    github: "",
    demo: "",
    details: [
      "Damla Damla Göl Olur, Godot 4 oyun motoruyla geliştirdiğim bir oyun projesi. Oyuncu başlangıçta çok küçük miktarlarda su taşıyarak işe başlar ve amacı zamanla bir göl oluşturmaktır.",
      "Oyun ilerledikçe kaşık, bardak, kova ve el arabası gibi taşıma araçlarının yanı sıra boru sistemleri, hidrofor ve otomasyon sistemleri gibi geliştirmeler açılır. Projenin amacı, su toplama ve göl oluşturma sürecini adım adım büyüyen bir ilerleme deneyimine dönüştürmek.",
    ],
    highlights: ["Kaşık", "Bardak", "Kova", "El arabası", "Boru sistemleri", "Hidrofor", "Otomasyon sistemleri"],
  },
  {
    slug: "robotik-kopek",
    title: "Robotik Köpek",
    category: "elektronik",
    status: "",
    summary: "ESP32, PCA9685 ve 8 adet MG90S servo motor ile Wi-Fi üzerinden kontrol edilen dört ayaklı robot.",
    technologies: ["ESP32", "PCA9685", "MG90S servo", "Wi-Fi"],
    image: "",
    imageAlt: "",
    github: "",
    demo: "",
    details: [
      "ESP32 mikrodenetleyicisi ile Wi-Fi üzerinden kontrol edilen dört ayaklı bir robot projesi. Bacak hareketleri, PCA9685 PWM sürücü kartı üzerinden yönetilen 8 adet MG90S servo motorla sağlanıyor.",
    ],
    highlights: [],
  },
  {
    slug: "akilli-gunes-takip-paneli",
    title: "Akıllı Güneş Takip Paneli",
    category: "elektronik",
    status: "",
    summary: "Güneş ışığının yönünü izleyerek panelden daha yüksek verim almayı amaçlayan güneş takip sistemi.",
    technologies: ["Elektronik", "Yenilenebilir enerji"],
    image: "",
    imageAlt: "",
    github: "",
    demo: "",
    details: [
      "Güneş ışığının yönünü izleyerek paneli güneşe doğru konumlandıran ve böylece daha yüksek verim elde etmeyi amaçlayan bir güneş takip paneli projesi.",
    ],
    highlights: [],
  },
];
