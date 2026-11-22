"""Favicon, uygulama ikonları, paylaşım (Open Graph) görseli ve profil fotoğrafı boyutlarını üretir.

Bu betik isteğe bağlıdır; çıktıları zaten public/ klasöründedir.
Yeni bir profil fotoğrafı eklediğinde veya unvan değiştiğinde yeniden çalıştırabilirsin:

    pip install pillow
    python scripts/gorseller.py                       # ikonlar + paylaşım görseli
    python scripts/gorseller.py yeni-fotograf.jpg     # + profil fotoğrafını kırpıp optimize eder
"""
import sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parent.parent
PUB = ROOT / "public"
IMG = PUB / "images"

NAME = "Devrim Daşkıran"
TITLE = "Mekatronik Teknikeri"
SUB = "Elektronik ve Otomasyon  ·  Yazılım Geliştirme"

BG = (7, 11, 20)
ACCENT = (59, 130, 246)
CYAN = (34, 211, 238)


def font(size, weight="Bold"):
    for p in [
        f"/usr/share/fonts/opentype/inter/Inter-{weight}.otf",
        f"/usr/share/fonts/truetype/inter/Inter-{weight}.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
        "C:/Windows/Fonts/segoeuib.ttf",
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
    ]:
        if Path(p).exists():
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()


def gradient(size, c1, c2):
    w, h = size
    g = Image.new("RGB", size)
    d = ImageDraw.Draw(g)
    for i in range(w + h):
        t = i / (w + h)
        c = tuple(int(c1[k] + (c2[k] - c1[k]) * t) for k in range(3))
        d.line([(i, 0), (0, i)], fill=c)
    return g


def icon(size):
    s = size * 4
    img = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    mask = Image.new("L", (s, s), 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, s - 1, s - 1], radius=int(s * 0.24), fill=255)
    img.paste(gradient((s, s), ACCENT, CYAN), (0, 0), mask)
    d = ImageDraw.Draw(img)
    f = font(int(s * 0.44), "ExtraBold")
    d.text((s / 2, s / 2 + s * 0.02), "DD", font=f, fill=(4, 16, 31), anchor="mm")
    return img.resize((size, size), Image.LANCZOS)


def og_image(photo):
    W, H = 1200, 630
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img, "RGBA")
    for x in range(0, W, 44):
        d.line([(x, 0), (x, H)], fill=(148, 170, 220, 14))
    for y in range(0, H, 44):
        d.line([(0, y), (W, y)], fill=(148, 170, 220, 14))
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    for r in range(380, 0, -8):
        a = int(46 * (1 - r / 380))
        gd.ellipse([930 - r, 315 - r, 930 + r, 315 + r], fill=(59, 130, 246, a))
    img.paste(glow, (0, 0), glow)
    d = ImageDraw.Draw(img, "RGBA")
    d.rounded_rectangle([80, 120, 80 + 290, 120 + 44], radius=22, outline=(148, 170, 220, 70), width=2)
    d.ellipse([100, 136, 112, 148], fill=CYAN)
    d.text((124, 142), "Teknik Portfolyo", font=font(24, "SemiBold"), fill=(154, 167, 192), anchor="lm")
    d.text((80, 200), NAME, font=font(78, "ExtraBold"), fill=(238, 242, 250))
    d.text((80, 310), TITLE, font=font(40, "Bold"), fill=(96, 165, 250))
    d.text((80, 370), SUB, font=font(28, "Medium"), fill=(154, 167, 192))
    d.rectangle([80, 450, 200, 455], fill=ACCENT)
    if photo and photo.exists():
        p = Image.open(photo).convert("RGB")
        size = 330
        p = ImageOps.fit(p, (size, size), Image.LANCZOS)
        ring = gradient((size + 16, size + 16), ACCENT, CYAN)
        m = Image.new("L", ring.size, 0)
        ImageDraw.Draw(m).ellipse([0, 0, ring.size[0] - 1, ring.size[1] - 1], fill=255)
        cx, cy = 930, 315
        img.paste(ring, (cx - ring.size[0] // 2, cy - ring.size[1] // 2), m)
        m2 = Image.new("L", (size, size), 0)
        ImageDraw.Draw(m2).ellipse([0, 0, size - 1, size - 1], fill=255)
        img.paste(p, (cx - size // 2, cy - size // 2), m2)
    img.convert("RGB").save(IMG / "og-image.jpg", quality=86, optimize=True)


def profile_photo(src):
    im = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
    im = ImageOps.fit(im, (min(im.size),) * 2, Image.LANCZOS, centering=(0.5, 0.4))
    for s in (640, 320):
        r = im.resize((s, s), Image.LANCZOS)
        r.save(IMG / f"profil-{s}.webp", quality=82, method=6)
        r.save(IMG / f"profil-{s}.jpg", quality=84, optimize=True, progressive=True)


if __name__ == "__main__":
    IMG.mkdir(parents=True, exist_ok=True)
    if len(sys.argv) > 1:
        profile_photo(sys.argv[1])
    icon(32).save(PUB / "favicon-32.png")
    icon(180).convert("RGB").save(PUB / "apple-touch-icon.png")
    icon(192).save(PUB / "icon-192.png")
    icon(512).save(PUB / "icon-512.png")
    icon(48).save(PUB / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
    og_image(IMG / "profil-640.jpg")
    print("Görseller oluşturuldu: public/")
