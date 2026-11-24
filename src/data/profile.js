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
  // Depo adı "devrimdaskiran.github.io" olduğu için site alan adının kökünde yayınlanır.
  // Kendi alan adını alırsan: "https://www.devrimdaskiran.com/" (README → "Daha iyi adres")
  url: "https://devrimdaskiran.github.io/",
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
  headline: ["Mekatronik Teknikeri", "Elektrik-Elektronik Teknisyeni", "Otomasyon ve Robotik"],
  location: "Gaziantep, Türkiye",
  // Ana sayfadaki kısa tanıtım
  intro:
    "Elektrik-elektronik temelli eğitim almış bir Mekatronik Teknikeriyim. Endüstriyel otomasyon, elektrik-elektronik sistemler, robotik ve teknik tasarım alanlarında çalışmaya odaklanıyor; Arduino, ESP32 ve ROS tabanlı projeler geliştiriyorum.",
  // Hakkımda bölümündeki paragraflar
  about: [
    "Meslek lisesinde Elektrik-Elektronik Teknolojisi alanında başlayan teknik eğitimimi, Çanakkale Onsekiz Mart Üniversitesi Çan Meslek Yüksekokulu Mekatronik programında tamamladım. Eğitimim boyunca elektronik, mekanik, otomasyon ve teknik sistemler üzerine çalıştım; endüstriyel ortamda iki dönem staj yaptım.",
    "AutoCAD, Proteus ISIS, Arduino IDE, Festo FluidSIM, Tinkercad, EasyEDA, Visual Studio ve Python ile teknik çalışmalar gerçekleştirdim. Güneş takip sisteminden ESP32 tabanlı robot köpeğe, ROS tabanlı robot süpürgeden akıllı atık konteyneri sistemine kadar fikirleri çalışan prototiplere dönüştürmeyi seviyorum.",
    "Teknik problemlere çözüm odaklı yaklaşan, ekip çalışmasına uyumlu ve üretim ortamında kendini geliştirmeye istekli bir çalışma anlayışına sahibim. Hedefim; endüstriyel otomasyon, elektrik-elektronik, bakım/teknik servis, mekatronik ve robotik alanlarında deneyim kazanmak.",
  ],
  // İlgi / odak alanları (Hakkımda bölümünde etiket olarak görünür)
  interests: [
    "Endüstriyel otomasyon",
    "Elektrik-elektronik sistemleri",
    "Mekatronik uygulamaları",
    "Robotik ve ROS",
    "Arduino ve ESP32",
    "Mikrodenetleyici sistemleri",
    "Elektronik devre tasarımı",
    "Bakım ve teknik servis",
    "CAD ve 3D modelleme",
    "Bilgisayar programlama",
    "Yenilenebilir enerji teknolojileri",
  ],
  // İş ilanlarında hedeflediğin pozisyonlar (CV'de görünür)
  targetPositions: ["Endüstriyel Otomasyon", "Elektrik-Elektronik", "Bakım / Teknik Servis", "Mekatronik", "Robotik"],
  // Profil fotoğrafı: public/images/ klasöründeki dosya adları (README → "Fotoğraf değiştirme")
  photo: {
    webp: "images/profil-640.webp",
    jpg: "images/profil-640.jpg",
    small: "images/profil-320.webp",
    alt: "Devrim Daşkıran'ın portre fotoğrafı",
  },
  // CV PDF dosyası (build sırasında otomatik üretilir)
  cvPdf: "cv/devrim-daskiran-cv.pdf",

  // Dil bilgisi
  languages: [{ name: "İngilizce", level: "Okuma: İyi · Yazma: İyi · Konuşma: İyi" }],

  // CV'nin "Ek Bilgiler" kısmında gösterilir. Göstermek istemediğini "" yap.
  extra: {
    drivingLicense: "B / A2 / B1 / F",
    military: "Tecilli",
  },

  // --- Gizli kişisel bilgiler -----------------------------------------
  // Bu alanlar varsayılan olarak SİTEDE GÖSTERİLMEZ.
  // Yayınlamak istersen ilgili "show..." değerini true yap.
  private: {
    birthDate: "",          // ör. "2006-01-01"
    showBirthDate: false,
    phone: "0 551 065 50 47", // CV'de görünür; gizlemek için showPhone: false yap
    showPhone: true,
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
  //  • Şu an FormSubmit (https://formsubmit.co) kullanılıyor: üyelik gerektirmez, mesajlar
  //    doğrudan e-postana gelir. İLK mesajda FormSubmit sana bir onay e-postası gönderir;
  //    içindeki "Activate" bağlantısına bir kez tıklaman gerekir.
  formEndpoint: "https://formsubmit.co/ajax/devrimdaskiran@gmail.com",
};

// ---------------------------------------------------------------------
// EĞİTİM — en yeniden en eskiye doğru sırala
//   status : "Mezun", "Devam ediyor", "Öğrenci" vb. (bilmiyorsan "" bırak)
//   start / end : ör. "2023" veya "Eylül 2023" (bilmiyorsan "" bırak)
// ---------------------------------------------------------------------
export const education = [
  {
    school: "Çanakkale Onsekiz Mart Üniversitesi",
    unit: "Çan Meslek Yüksekokulu",
    program: "Mekatronik",
    type: "Önlisans · Elektronik ve Otomasyon",
    status: "Mezun",
    degree: "Mekatronik Teknikeri",
    gpa: "3,13 / 4,00",
    start: "2024",
    end: "2026",
    description:
      "Elektronik, mekanik, otomasyon ve teknik sistemler üzerine eğitim aldım. Bitirme projesi olarak akıllı çöp konteyneri doluluk ve yönlendirme sistemi geliştirdim.",
  },
  {
    // Güncel CV'de yer almıyor; kayıt durumun değiştiyse bu bloğu silebilir veya status'u güncelleyebilirsin.
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
    school: "Ayvaz Burçkan Çok Programlı Anadolu Lisesi",
    unit: "",
    program: "Elektrik-Elektronik Teknolojisi",
    type: "Mesleki ve Teknik Ortaöğretim",
    status: "Mezun",
    start: "",
    end: "",
    description:
      "Elektrik, elektronik, devreler ve teknik uygulamalar alanlarında mesleki eğitim aldım. Lise projesi olarak akıllı güneş paneli takip sistemini geliştirdim.",
  },
];

// ---------------------------------------------------------------------
// STAJ / İŞ DENEYİMİ — en yeniden en eskiye
// ---------------------------------------------------------------------
export const experience = [
  {
    role: "Mekatronik Teknikeri Stajyeri",
    company: "Asya Suni Dericilik San. ve Tic. Ltd. Şti.",
    location: "Gaziantep",
    start: "07/2025",
    end: "08/2025",
    description: "",
  },
  {
    role: "Elektrik-Elektronik Teknisyeni Stajyeri",
    company: "Asya Suni Dericilik San. ve Tic. Ltd. Şti.",
    location: "Gaziantep",
    start: "06/2023",
    end: "07/2023",
    description: "",
  },
];

// ---------------------------------------------------------------------
// KURSLAR VE SERTİFİKALAR
// ---------------------------------------------------------------------
export const certificates = [
  // issuer: kurum adı (sitede bu başlık altında gruplanır)
  // cv: false → yalnızca sitede görünür, CV PDF'ine girmez
  // status: "Devam ediyor" → devam eden eğitim olarak gösterilir
  { name: "ROS ile Robotik Programlama", issuer: "BTK Akademi", year: "2026" },
  { name: "C# Programlama", issuer: "BTK Akademi", year: "2026" },
  { name: "AutoCAD ile 2D Tasarımlar", issuer: "BTK Akademi", year: "2025" },
  { name: "Autocad ile 3B Mimari Tasarım", issuer: "BTK Akademi", year: "2025" },
  { name: "Proteus ile Devre Tasarımı", issuer: "BTK Akademi", year: "2025" },
  { name: "Projelerle Arduino Programlama", issuer: "BTK Akademi", year: "2025" },
  { name: "Temel Elektronik ve Robotiğe Giriş", issuer: "BTK Akademi", year: "2025" },
  { name: "Tinkercad ile Arduino", issuer: "BTK Akademi", year: "2025" },
  { name: "Tinkercad ile Tasarım Dünyasına Giriş", issuer: "BTK Akademi", year: "2025" },
  { name: "Güvenlik Duvarına Giriş", issuer: "BTK Akademi", year: "2025" },
  { name: "Temel Çizim Teknikleri", issuer: "BTK Akademi", year: "2025" },
  { name: "Proje Yönetim Temelleri", issuer: "BTK Akademi", year: "2025" },
  { name: "Ekip Kurma ve Yönetme", issuer: "BTK Akademi", year: "2025" },
  { name: "Etkili İletişim Stratejileri", issuer: "BTK Akademi", year: "2025" },
  { name: "Uygulamalı Canva", issuer: "BTK Akademi", year: "2025", cv: false },
  { name: "İkna Becerileri", issuer: "BTK Akademi", year: "2025", cv: false },
  { name: "Girişimcilikte Sunum Teknikleri ve İletişim Yönetimi", issuer: "BTK Akademi", year: "2025", cv: false },
  { name: "Genç Profesyoneller için Kariyeri Tehdit Eden Yaklaşımlar", issuer: "BTK Akademi", year: "2025", cv: false },
  { name: "Pazar Araştırması ve Fiyatlandırma Stratejileri", issuer: "BTK Akademi", year: "2025", cv: false },
  { name: "Müşteriyi Tanımak", issuer: "BTK Akademi", year: "2025", cv: false },
  { name: "LinkedIn'de Etkili Profil Oluşturma", issuer: "BTK Akademi", year: "2025", cv: false },
  { name: "Oyun Pazarlama Temelleri", issuer: "BTK Akademi", year: "2025", cv: false },
  { name: "Patent ve Faydalı Modellerin Korunması", issuer: "BTK Akademi", year: "2025", cv: false },
  { name: "Tasarımların Korunması", issuer: "BTK Akademi", year: "2025", cv: false },
  { name: "Markaların Korunması", issuer: "BTK Akademi", year: "2025", cv: false },
  { name: "Coğrafi İşaretlerin Korunması", issuer: "BTK Akademi", year: "2025", cv: false },
  { name: "KGM Tarihçesi, Görev, Yetki ve Sorumlulukları", issuer: "BTK Akademi", year: "2025", cv: false },
  { name: "Karayolu Projeleri Fizibilite Etütleri", issuer: "BTK Akademi", year: "2025", cv: false },
  { name: "Karayolu Proje Çalışmaları", issuer: "BTK Akademi", year: "2025", cv: false },
  { name: "Kamulaştırma Süreci", issuer: "BTK Akademi", year: "2025", cv: false },
  { name: "Malzeme Ocakları Yönetim Süreci", issuer: "BTK Akademi", year: "2025", cv: false },
  { name: "Karayolu Yapım Çalışmaları", issuer: "BTK Akademi", year: "2025", cv: false },
  { name: "Yol Yapım, Bakım, Onarım Makine ve Ekipmanları", issuer: "BTK Akademi", year: "2025", cv: false },
  { name: "Karayollarında Trafik Güvenliği Çalışmaları", issuer: "BTK Akademi", year: "2025", cv: false },
  { name: "Devlet ve İl Yollarında Bakım ve İşletme Sürecine Giriş", issuer: "BTK Akademi", year: "2025", cv: false },
  { name: "Özel ve Tarihi Köprüler", issuer: "BTK Akademi", year: "2025", cv: false },
  { name: "Microsoft Word Temelleri", issuer: "BTK Akademi", year: "2024" },
  { name: "Microsoft Excel Temelleri", issuer: "BTK Akademi", year: "2024" },
  { name: "Microsoft PowerPoint", issuer: "BTK Akademi", year: "2024" },
  { name: "İlk Yardım", issuer: "Çan Halk Eğitimi Merkezi (MEB)", year: "2025" },
  { name: "Afet ve Acil Durum Farkındalık Eğitimi", issuer: "MEB Hayat Boyu Öğrenme", year: "2025" },
  { name: "Bilgisayarda Hızlı Klavye Kullanımı", issuer: "MEB Hayat Boyu Öğrenme", year: "2025" },
  { name: "Meslek Etiği", issuer: "MEB Hayat Boyu Öğrenme", year: "2026" },
  { name: "Diksiyon Eğitimi", issuer: "MEB Hayat Boyu Öğrenme", year: "2026" },
  { name: "Genel Sağlık Tarama ve Kontrol Farkındalık Eğitimi", issuer: "MEB Hayat Boyu Öğrenme", year: "2026", cv: false },
  { name: "Ulaşım Sektöründe Mikro İşletmeler İçin Hijyen Eğitimi (İşimiz Temiz)", issuer: "MEB Hayat Boyu Öğrenme", year: "2026", cv: false },
  { name: "Bilgisayar İşletmenliği", issuer: "GASMEK", year: "", status: "Devam ediyor" },
  { name: "Klavye Teknikleri", issuer: "GASMEK", year: "", status: "Devam ediyor" },
  { name: "İHA-1 (Drone) Pilot Ehliyeti", issuer: "SHGM", year: "", status: "Devam ediyor" },
];

// ---------------------------------------------------------------------
// YETENEKLER
//   level: "İleri düzey" | "Orta düzey" | "Temel düzey" | "Geliştiriyorum" | "İyi" | ""
//   Seviyesini belirtmediğin araçlar seviye etiketi olmadan listelenir.
//   icon: chip | gear | ruler | code | cube | office
// ---------------------------------------------------------------------
export const skills = [
  {
    category: "Elektronik",
    icon: "chip",
    items: [
      { name: "Arduino IDE ve Arduino tabanlı projeler", level: "İleri düzey" },
      { name: "ESP32", level: "İleri düzey" },
      { name: "Tinkercad", level: "İleri düzey" },
      { name: "EasyEDA", level: "İleri düzey" },
      { name: "Proteus ISIS", level: "" },
      { name: "Mikrodenetleyiciler ve sensörler", level: "" },
      { name: "Servo / step motor ve sürücüler", level: "" },
    ],
  },
  {
    category: "Otomasyon ve Robotik",
    icon: "gear",
    items: [
      { name: "Festo FluidSIM", level: "" },
      { name: "ROS ve RViz", level: "Geliştiriyorum" },
      { name: "Raspberry Pi 5", level: "" },
      { name: "LiDAR ile haritalama", level: "" },
      { name: "Temel otomasyon uygulamaları", level: "" },
    ],
  },
  {
    category: "CAD",
    icon: "ruler",
    items: [
      { name: "AutoCAD (2D teknik çizim)", level: "İleri düzey" },
      { name: "Autodesk Fusion 360", level: "Temel düzey" },
    ],
  },
  {
    category: "3D Tasarım",
    icon: "cube",
    items: [
      { name: "Tinkercad (3D tasarım)", level: "İleri düzey" },
      { name: "Autodesk Fusion 360", level: "Temel düzey" },
      { name: "Autodesk Maya", level: "Temel düzey" },
    ],
  },
  {
    category: "Programlama",
    icon: "code",
    items: [
      { name: "Arduino (C/C++)", level: "İleri düzey" },
      { name: "Python", level: "Geliştiriyorum" },
      { name: "C#", level: "Geliştiriyorum" },
      { name: "Visual Studio", level: "" },
      { name: "Godot 4 (GDScript)", level: "" },
    ],
  },
  {
    category: "Ofis ve Dil",
    icon: "office",
    items: [
      { name: "Microsoft Word", level: "" },
      { name: "Microsoft Excel", level: "" },
      { name: "Microsoft PowerPoint", level: "" },
      { name: "İngilizce (okuma, yazma, konuşma)", level: "İyi" },
    ],
  },
];

// ---------------------------------------------------------------------
// PROJELER
//   category : "oyun" | "elektronik" | "cad" | "yazilim"
//   context  : "Lise Projesi" | "Üniversite Projesi" | "Bitirme Projesi" | "Kişisel Proje" | ""
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
    slug: "akilli-cop-konteyneri",
    title: "Akıllı Çöp Kutusu — IoT Tabanlı Atık İzleme Sistemi",
    category: "elektronik",
    context: "Bitirme Projesi",
    status: "Tamamlandı",
    summary:
      "ESP32 mesh ağı ve Raspberry Pi 5 ile çöp kutularının doluluğunu, yerinde olup olmadığını ve arızalarını uzaktan izleyen sistem.",
    technologies: ["ESP32", "painlessMesh", "HC-SR04", "Hall sensörü", "DS3231 RTC", "Raspberry Pi 5", "Python", "Flask", "SQLite", "Leaflet"],
    image: "images/projeler/akilli-cop-kutusu.webp",
    imageAlt: "Akıllı çöp kutusu yönetim paneli: dolu, sorunlu ve normal kutuları gösteren renk kodlu kartlar",
    github: "https://github.com/devrimdaskiran/akilli-cop-kutusu",
    demo: "",
    details: [
      "Her çöp kutusundaki ESP32, 4 ultrasonik sensörle doluluğu, iki hall sensörüyle kapağın ve kutunun durumunu izliyor. Kutular painlessMesh ile çok sıçramalı bir kablosuz ağ kuruyor; köprüye uzak kalan kutu, diğer kutuyu aracı olarak kullanıyor.",
      "Veriler ESP32-S3 köprü üzerinden USB ile Raspberry Pi 5'e aktarılıyor. Pi'de Python dinleyici, SQLite veritabanı ve Flask + Leaflet harita paneli systemd servisi olarak çalışıyor. Sistem dolu kutu, yabancı cisim, sensör arızası, kutunun yerinde olmaması, 2 gündür kullanılmama ve RTC hatası dahil 8 durumu otomatik tespit ediyor.",
      "Geliştirme sırasında LoRa yerine WiFi mesh'e geçildi, deep sleep yerine sürekli açık mimari seçildi ve güç, röle ve RTC sorunları sahada test edilerek çözüldü. Süreç, kodlar ve karşılaşılan sorunlar GitHub deposunda belgelendi.",
      "Proje ekibi: Devrim Daşkıran, Abdulsamet Korkmaz, Arda Kora, Bedirhan Omurca ve Yiğitcan Arka. Danışman: Yakup Kılıçarslan; projeyi değerlendiren öğretim elemanları: Recep Yavuz Turan, Adem Yavuz Vural, Memduh Emrah Özcan ve Sevcan Turan.",
    ],
    highlights: ["3 kutu + 1 köprü", "Multi-hop mesh", "8 durum kodu", "Harita tabanlı panel"],
  },
  {
    slug: "akilli-sera-ros2",
    title: "Akıllı Sera — ROS 2 Tabanlı Sera Otomasyonu",
    category: "elektronik",
    context: "Üniversite Projesi",
    status: "Tamamlandı",
    summary:
      "Raspberry Pi ve ROS 2 Humble ile sıcaklık/nem ölçüp seçilen bitkiye göre fan ve sulama pompasını otomatik yöneten sera sistemi.",
    technologies: ["ROS 2 Humble", "Raspberry Pi", "Python", "SHT30 (I2C)", "Röle", "FastAPI", "WebSocket", "Chart.js", "RViz2", "systemd"],
    image: "images/projeler/akilli-sera-ros2.webp",
    imageAlt: "Akıllı sera prototipi: ahşap çerçeve, pleksi duvarlar, damla sulama hortumu ve fideler",
    github: "https://github.com/devrimdaskiran/akilli-sera-ros2",
    demo: "",
    details: [
      "SHT30 sensörü I2C üzerinden sıcaklık ve nem ölçüyor; 12 V fan ve 12 V su pompası aktif-LOW röle modülüyle sürülüyor. Sensör okuma, pompa ve fan kontrolü ayrı ROS 2 node'larında çalışıyor; fan için özel bir servis (SetFan), sulama için geri bildirimli bir aksiyon (Irrigate) tanımlandı.",
      "FastAPI + WebSocket tabanlı web panelinde 15 hazır bitki profili, kullanıcı tanımlı bitki ekleme, Manuel / Sunum (2 dk) / Gerçekçi (60 dk) çalışma modları, canlı grafik ve Raspberry Pi sağlık göstergeleri bulunuyor. Sistem systemd ile açılışta kendiliğinden başlıyor, RViz2'de 3B olarak da izlenebiliyor.",
      "Proje ekibi: Devrim Daşkıran, Abdulsamet Korkmaz, Arda Kora, Nilşan Küçükler ve Fatma Serra Yeşilçayır. Ders hocası: Recep Yavuz Turan (ROS 2).",
    ],
    highlights: ["5 ROS 2 node", "Özel service + action", "15 bitki profili", "Fişe tak, çalışsın"],
  },
  {
    slug: "dert-yenilenebilir-enerji",
    title: "DERT — Kentsel Mikro Rüzgâr Enerjisi Hasadı",
    category: "cad",
    context: "Üniversite Projesi",
    status: "Prototip",
    summary:
      "Taşıt geçişlerinin oluşturduğu hava akışından enerji üretmek için önce mazgal altı türbin, ardından refüje yerleştirilen Savonius türbini geliştirildi.",
    technologies: ["3D baskı (PLA)", "CAD", "Savonius VAWT", "DC jeneratör", "Arduino", "LED"],
    image: "images/projeler/dert-yenilenebilir-enerji.webp",
    imageAlt: "Mazgal altı türbin ve refüje entegre Savonius türbininin kavramsal çizimi",
    github: "https://github.com/devrimdaskiran/dert-yenilenebilir-enerji",
    demo: "",
    details: [
      "İlk prototipte yol kenarı mazgalının altına Venturi etkili huni ve turbo kanatlı bir türbin yerleştirildi. Düşük başlangıç torku, türbülans ve sürtünme kayıpları nedeniyle bu tasarımın kent koşullarında yetersiz kaldığı görüldü.",
      "Geliştirilen tasarımda her yönden gelen rüzgârı alabilen, düşük hızda yüksek tork üreten dikey eksenli Savonius türbini yol ortası refüjüne entegre edildi. 3D baskıyla üretilen türbin, karton/strafor yol-refüj maketinde döndürüldüğünde DC motor üzerinden Arduino devresindeki LED'leri yaktı.",
      "Proje ekibi: Abdulsamet Korkmaz, Devrim Daşkıran, Arda Kora ve Bedirhan Omurca. Yenilenebilir Enerji Kaynakları dersi projesi.",
    ],
    highlights: ["2 prototip aşaması", "3D baskı", "Savonius VAWT", "4 kişilik ekip"],
  },
  {
    slug: "ros-robot-supurge",
    title: "SLAM Robot Süpürge — ROS ve LiDAR ile Haritalama",
    category: "elektronik",
    context: "Üniversite Projesi",
    status: "Tamamlandı",
    summary: "LiDAR ile ortamı tarayıp ROS üzerinde SLAM ile haritasını çıkaran, NEMA 17 step motorlarla hareket eden robot süpürge platformu.",
    technologies: ["ROS", "SLAM", "LiDAR", "RViz", "Raspberry Pi 5", "NEMA 17", "ESP32"],
    image: "images/projeler/slam-robot-supurge.webp",
    imageAlt: "İki katlı şasi üzerinde LiDAR bulunan robot süpürge prototipi",
    github: "https://github.com/devrimdaskiran/slam-robot-supurge",
    demo: "",
    details: [
      "Raspberry Pi 5, 360° LiDAR ve iki adet NEMA 17 step motorla diferansiyel sürüşlü, iki katlı bir mobil robot platformu geliştirildi.",
      "LiDAR taramaları ROS üzerinde SLAM ile birleştirilerek ortamın haritası çıkarıldı; robotun harita üzerindeki konumu ve hareketi RViz'de canlı izlendi.",
      "Gömülü Sistemler dersi kapsamında 3. dönemde geliştirildi. Proje ekibi: Alparslan Kılıçarslan, Abdulsamet Korkmaz, Devrim Daşkıran, Mustafa Çakıcı, Ali Ekinci, Fedai Koyun, Abdussamed Orhan ve Hakan Cem Tapu. Ders hocası: Recep Yavuz Turan.",
    ],
    highlights: ["LiDAR", "SLAM haritalama", "RViz", "Diferansiyel sürüş"],
  },
  {
    slug: "robotik-kopek",
    title: "ESP32 Tabanlı Akıllı Robot Köpek",
    category: "elektronik",
    context: "Üniversite Projesi",
    status: "Tamamlandı",
    summary: "ESP32, PCA9685 ve 8 adet MG90S servo motor ile Wi-Fi üzerinden kontrol edilen dört ayaklı robotik platform.",
    technologies: ["ESP32", "PCA9685", "MG90S servo", "Wi-Fi"],
    image: "",
    imageAlt: "",
    github: "",
    demo: "",
    details: [
      "ESP32 tabanlı dört ayaklı bir robotik platform geliştirildi. Servo motorların kontrolü, hareket mekanizması ve mikrodenetleyici tabanlı elektronik sistem üzerinde çalışıldı.",
      "Bacak hareketleri, PCA9685 PWM sürücü kartı üzerinden yönetilen 8 adet MG90S servo motorla sağlanıyor; robot Wi-Fi üzerinden kontrol ediliyor.",
    ],
    highlights: [],
  },
  {
    slug: "akilli-gunes-takip-paneli",
    title: "Akıllı Güneş Paneli Takip Sistemi",
    category: "elektronik",
    context: "Lise Projesi",
    status: "Tamamlandı",
    summary: "Güneşin konumuna göre panelin yönünü otomatik olarak değiştiren, sensör ve motor kontrollü takip sistemi.",
    technologies: ["Mikrodenetleyici", "Işık sensörleri", "Motor kontrolü", "Yenilenebilir enerji"],
    image: "",
    imageAlt: "",
    github: "",
    demo: "",
    details: [
      "Güneşin konumuna göre panelin yönünü otomatik olarak değiştiren bir sistem geliştirildi. Sensör, mikrodenetleyici ve motor kontrollü mekanik bir yapı kullanıldı.",
      "Proje TEKNOFEST başvurusunda kullanıldı.",
    ],
    highlights: [],
  },
  {
    slug: "damla-damla-gol-olur",
    title: "Damla Damla Göl Olur",
    category: "oyun",
    context: "Kişisel Proje",
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
];
