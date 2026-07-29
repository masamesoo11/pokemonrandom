#!/usr/bin/env python3
"""
Generate an Open Graph image (1200x630) for PokeGen.
Also generates a square favicon (512x512) and apple-touch-icon (180x180).
Uses Pillow (PIL).
"""
import os
from PIL import Image, ImageDraw, ImageFont

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public")
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Brand colors
RED = (239, 68, 68)        # pokeball red
YELLOW = (250, 204, 21)    # pikachu yellow
DARK = (28, 25, 23)        # near-black
CREAM = (254, 243, 199)    # cream background

def find_font(size, bold=True):
    candidates = [
        f"/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        f"/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
    ]
    for c in candidates:
        if os.path.exists(c):
            return ImageFont.truetype(c, size)
    return ImageFont.load_default()

def draw_pokeball(draw, cx, cy, r, outline=DARK):
    """Draw a pokeball centered at (cx, cy) with radius r."""
    # Top half (red)
    draw.pieslice([cx - r, cy - r, cx + r, cy + r], 180, 360, fill=RED, outline=outline, width=4)
    # Bottom half (white)
    draw.pieslice([cx - r, cy - r, cx + r, cy + r], 0, 180, fill=(255, 255, 255), outline=outline, width=4)
    # Horizontal line
    draw.line([(cx - r, cy), (cx + r, cy)], fill=outline, width=4)
    # Center button
    button_r = r // 4
    draw.ellipse([cx - button_r, cy - button_r, cx + button_r, cy + button_r], fill=(255, 255, 255), outline=outline, width=4)

def make_og_image():
    """1200x630 OG image"""
    img = Image.new("RGB", (1200, 630), CREAM)
    draw = ImageDraw.Draw(img)

    # Decorative pokeballs in background (large, faded)
    for cx, cy, r in [(1100, 80, 100), (60, 580, 80), (580, 320, 280)]:
        # Use a faded pokeball - we'll just draw the outline since we can't easily set opacity on RGB
        draw_pokeball(draw, cx, cy, r, outline=(220, 200, 150))

    # Overlay a semi-transparent cream rectangle to fade the background pokeballs
    overlay = Image.new("RGBA", (1200, 630), (254, 243, 199, 200))
    img.paste(overlay, (0, 0), overlay)

    # Title
    title_font = find_font(110, bold=True)
    sub_font = find_font(36, bold=False)

    # "Random Pokemon" on first line
    draw.text((80, 180), "Random Pokemon", font=title_font, fill=DARK)

    # "Generator" with red gradient effect (just red color)
    gen_y = 310
    draw.text((80, gen_y), "Generator", font=title_font, fill=RED)

    # Subtitle
    draw.text((84, 460), "Free • No Signup • 9 Generations • 1025+ Pokemon",
              font=sub_font, fill=(120, 113, 108))

    # Pokeball icon on the right
    draw_pokeball(draw, 1020, 315, 130)

    # URL at bottom
    url_font = find_font(28, bold=True)
    draw.text((84, 555), "pokemonrandom.com", font=url_font, fill=RED)

    img.save(os.path.join(OUTPUT_DIR, "og-image.png"), "PNG")
    print("Wrote og-image.png (1200x630)")

def make_favicon(size, name):
    """Square icon"""
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    draw_pokeball(draw, size // 2, size // 2, size // 2 - 10)
    img.save(os.path.join(OUTPUT_DIR, name), "PNG")
    print(f"Wrote {name} ({size}x{size})")

if __name__ == "__main__":
    make_og_image()
    make_favicon(192, "icon-192.png")
    make_favicon(512, "icon-512.png")
    make_favicon(180, "apple-touch-icon.png")
    # Also a 32x32 favicon
    make_favicon(32, "favicon-32.png")
    print("Done.")
