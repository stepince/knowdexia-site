"""Generate favicon.ico and apple-touch-icon.png matching favicon.svg."""
from PIL import Image, ImageDraw

S = 1024  # supersampled canvas; SVG viewBox is 32 units
k = S / 32

def icon(rounded=True):
    im = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    if rounded:
        d.rounded_rectangle([0, 0, S - 1, S - 1], radius=7 * k, fill="#315bda")
    else:
        d.rectangle([0, 0, S, S], fill="#315bda")
    w = int(2.5 * k)
    def line(a, b):
        d.line([(a[0] * k, a[1] * k), (b[0] * k, b[1] * k)], fill="white", width=w)
        for p in (a, b):
            r = w / 2
            d.ellipse([p[0] * k - r, p[1] * k - r, p[0] * k + r, p[1] * k + r], fill="white")
    line((10, 8), (10, 24))
    line((10, 16), (20, 8))
    line((10, 16), (20, 24))
    r = 2 * k
    d.ellipse([25 * k - r, 7 * k - r, 25 * k + r, 7 * k + r], fill="#b9d9fc")
    return im

icon().resize((256, 256), Image.LANCZOS).save(
    "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
icon(rounded=False).resize((180, 180), Image.LANCZOS).convert("RGB").save("apple-touch-icon.png")
