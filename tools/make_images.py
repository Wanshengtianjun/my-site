"""Make the pictures for Small Web: the hero, the Open Graph image and the icons.

Everything is drawn from rectangles and circles with Pillow — no stock images,
no textures. Run from the site folder:

    python tools/make_images.py
"""

from __future__ import annotations

import os

from PIL import Image, ImageDraw, ImageFont

PAPER = (247, 241, 228)
CREAM = (255, 253, 246)
INK = (25, 23, 18)
ACCENT = (194, 71, 43)
LINE = (221, 209, 186)

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "..", "images")

SERIF_BOLD = r"C:\Windows\Fonts\georgiab.ttf"
SERIF = r"C:\Windows\Fonts\georgia.ttf"
SERIF_ITALIC = r"C:\Windows\Fonts\georgiai.ttf"
MONO = r"C:\Windows\Fonts\consola.ttf"
MONO_BOLD = r"C:\Windows\Fonts\consolab.ttf"


def load_font(path: str, size: int) -> ImageFont.FreeTypeFont:
    if os.path.exists(path):
        return ImageFont.truetype(path, size)
    return ImageFont.load_default(size)


def rounded(draw: ImageDraw.ImageDraw, box, radius, fill=None, outline=None, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def switch(draw: ImageDraw.ImageDraw, x, y, w, h, track, knob, knob_in=None):
    """Draw a toggle switch: a track with a round knob at its right end."""
    rounded(draw, (x, y, x + w, y + h), radius=h // 2, fill=track)
    pad = h * 0.14
    r = (h - 2 * pad) / 2
    cx = x + w - pad - r
    cy = y + h / 2
    draw.ellipse((cx - r, cy - r, cx + r, cy + r), fill=knob)
    if knob_in:
        r2 = r * 0.45
        draw.ellipse((cx - r2, cy - r2, cx + r2, cy + r2), fill=knob_in)


def make_hero() -> Image.Image:
    """1600 x 900: a quotation mark, a bulb on a red disc, and a switch."""
    scale = 2
    w, h = 1600 * scale, 900 * scale
    img = Image.new("RGB", (w, h), PAPER)
    d = ImageDraw.Draw(img)

    # a faint paper grid
    grid = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    gd = ImageDraw.Draw(grid)
    step = 100 * scale
    for x in range(step, w, step):
        gd.line([(x, 0), (x, h)], fill=LINE + (90,), width=scale)
    for y in range(step, h, step):
        gd.line([(0, y), (w, y)], fill=LINE + (90,), width=scale)
    img = Image.alpha_composite(img.convert("RGBA"), grid).convert("RGB")
    d = ImageDraw.Draw(img)

    # frame
    d.rectangle((48 * scale, 48 * scale, w - 48 * scale, h - 48 * scale), outline=LINE, width=2 * scale)

    # the quotation mark
    quote_font = load_font(SERIF_BOLD, 520 * scale)
    d.text((120 * scale, 70 * scale), "\u201c", font=quote_font, fill=INK)

    # the red disc and the bulb
    cx, cy, r = 900 * scale, 330 * scale, 235 * scale
    d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=ACCENT)

    br = 118 * scale
    d.ellipse((cx - br, cy - br, cx + br, cy + br), outline=CREAM, width=5 * scale)
    # screw base
    d.rectangle(
        (cx - 34 * scale, cy + br - 6 * scale, cx + 34 * scale, cy + br + 58 * scale),
        outline=CREAM,
        width=5 * scale,
    )
    for i in range(2):
        yy = cy + br + 14 * scale + i * 16 * scale
        d.line([(cx - 30 * scale, yy), (cx + 30 * scale, yy)], fill=CREAM, width=3 * scale)

    # the switch
    switch(d, 1010 * scale, 660 * scale, 330 * scale, 150 * scale, CREAM, ACCENT)

    img = img.resize((1600, 900), Image.LANCZOS)
    return img


def make_og() -> Image.Image:
    """1200 x 630: title, one line, one visual. Readable at thumbnail size."""
    scale = 2
    w, h = 1200 * scale, 630 * scale
    img = Image.new("RGB", (w, h), PAPER)
    d = ImageDraw.Draw(img)

    d.rectangle((0, 0, 26 * scale, h), fill=ACCENT)
    d.rectangle((64 * scale, 64 * scale, w - 64 * scale, h - 64 * scale), outline=LINE, width=2 * scale)

    title = load_font(SERIF_BOLD, 150 * scale)
    d.text((110 * scale, 120 * scale), "Small Web", font=title, fill=INK)

    d.rectangle((112 * scale, 330 * scale, 312 * scale, 336 * scale), fill=ACCENT)

    line_font = load_font(MONO, 34 * scale)
    d.text((110 * scale, 385 * scale), "Quotes, five project ideas, and", font=line_font, fill=(58, 53, 43))
    d.text((110 * scale, 435 * scale), "a machine that switches itself off.", font=line_font, fill=(58, 53, 43))

    switch(d, 900 * scale, 470 * scale, 190 * scale, 88 * scale, ACCENT, CREAM)

    img = img.resize((1200, 630), Image.LANCZOS)
    return img


def make_icon() -> Image.Image:
    """512 x 512: one shape, readable at 32 pixels."""
    size = 512
    img = Image.new("RGB", (size, size), ACCENT)
    d = ImageDraw.Draw(img)
    switch(d, 96, 186, 320, 140, CREAM, ACCENT)
    return img


def main() -> None:
    os.makedirs(OUT, exist_ok=True)

    hero = make_hero()
    hero.save(os.path.join(OUT, "hero.jpg"), "JPEG", quality=88, optimize=True, progressive=True)

    og = make_og()
    og.save(os.path.join(OUT, "og-image.jpg"), "JPEG", quality=88, optimize=True, progressive=True)

    icon = make_icon()
    icon.save(os.path.join(OUT, "icon-512.png"), "PNG", optimize=True)
    icon.resize((180, 180), Image.LANCZOS).save(
        os.path.join(OUT, "apple-touch-icon.png"), "PNG", optimize=True
    )
    icon.resize((32, 32), Image.LANCZOS).save(
        os.path.join(OUT, "favicon-32.png"), "PNG", optimize=True
    )

    for name in ("hero.jpg", "og-image.jpg", "icon-512.png", "apple-touch-icon.png", "favicon-32.png"):
        path = os.path.join(OUT, name)
        print(f"{name}: {os.path.getsize(path)} bytes")


if __name__ == "__main__":
    main()
