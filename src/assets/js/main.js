// Devrim Daşkıran — küçük, bağımlılıksız etkileşimler
(() => {
  "use strict";

  // Mobil menü
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("menu");
  if (toggle && menu) {
    const setOpen = (open) => {
      menu.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Menüyü kapat" : "Menüyü aç");
    };
    toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
    menu.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menu.classList.contains("open")) { setOpen(false); toggle.focus(); }
    });
    document.addEventListener("click", (e) => {
      if (menu.classList.contains("open") && !e.target.closest(".nav")) setOpen(false);
    });
  }

  // Aktif menü bağlantısını vurgula (ana sayfa)
  const sections = [...document.querySelectorAll("main section[id]")];
  const links = [...document.querySelectorAll(".nav-links a")];
  if ("IntersectionObserver" in window && sections.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        links.forEach((a) => a.classList.toggle("active", a.getAttribute("href").endsWith("#" + en.target.id)));
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach((s) => io.observe(s));
  }

  // Proje filtreleri
  const filters = document.querySelectorAll(".filter");
  filters.forEach((btn) =>
    btn.addEventListener("click", () => {
      const f = btn.dataset.filter;
      filters.forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
      document.querySelectorAll(".projects-grid [data-category]").forEach((el) => {
        const match = f === "all" || el.dataset.category === f;
        if (el.hasAttribute("data-empty")) el.classList.toggle("show", f !== "all" && match);
        else el.classList.toggle("hidden", !match);
      });
    })
  );

  // Hafif giriş animasyonu
  const revealEls = document.querySelectorAll(".section-head, .card, .tl-item");
  if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const ro = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); ro.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach((el) => {
      if (el.closest(".cv-page")) return;
      el.classList.add("reveal");
      ro.observe(el);
    });
  }

  // CV yazdır
  document.querySelectorAll("[data-print]").forEach((b) => b.addEventListener("click", () => window.print()));

  // İletişim formu
  const form = document.getElementById("contact-form");
  if (form) {
    const status = form.querySelector(".form-status");
    const say = (msg, ok) => { status.textContent = msg; status.className = "form-status " + (ok ? "ok" : "err"); };
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      let valid = true;
      form.querySelectorAll("[required]").forEach((f) => {
        const bad = !f.value.trim() || (f.type === "email" && !/^\S+@\S+\.\S+$/.test(f.value.trim()));
        f.setAttribute("aria-invalid", String(bad));
        if (bad) valid = false;
      });
      if (!valid) { say("Lütfen tüm alanları doğru şekilde doldurun.", false); form.querySelector('[aria-invalid="true"]').focus(); return; }

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      if (form.dataset.mode === "endpoint") {
        try {
          const res = await fetch(form.action, { method: "POST", headers: { Accept: "application/json" }, body: new FormData(form) });
          if (!res.ok) throw new Error();
          form.reset();
          say("Teşekkürler! Mesajınız iletildi.", true);
        } catch {
          say("Mesaj gönderilemedi. Lütfen doğrudan e-posta ile ulaşın: " + form.dataset.email, false);
        }
        return;
      }
      const subject = encodeURIComponent("Web sitesi üzerinden mesaj — " + name);
      const body = encodeURIComponent(message + "\n\n—\n" + name + "\n" + email);
      window.location.href = "mailto:" + form.dataset.email + "?subject=" + subject + "&body=" + body;
      say("E-posta uygulamanız açılıyor. Açılmazsa doğrudan " + form.dataset.email + " adresine yazabilirsiniz.", true);
    });
  }
})();
