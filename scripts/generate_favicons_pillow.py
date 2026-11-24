import os
import math
from PIL import Image, ImageDraw

def create_favicon(size=2048):
    # 4x supersampling for ultra crisp edges
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # 1. Background rounded rectangle
    bg_radius = int(size * 0.22)
    bg_color = (15, 23, 42, 255) # slate-900
    border_color = (56, 189, 248, 120) # sky-400 with alpha
    
    draw.rounded_rectangle([(0, 0), (size, size)], radius=bg_radius, fill=bg_color)
    draw.rounded_rectangle([(int(size*0.015), int(size*0.015)), (int(size*0.985), int(size*0.985))], 
                           radius=int(bg_radius*0.95), outline=border_color, width=int(size*0.015))

    # 2. Shield (Crest) Coordinates
    # Top center: (0.5, 0.12), Top left: (0.22, 0.25), Mid left: (0.22, 0.48)
    # Bottom tip: (0.5, 0.88), Mid right: (0.78, 0.48), Top right: (0.78, 0.25)
    w, h = size, size
    shield_pts = [
        (int(w * 0.50), int(h * 0.12)),
        (int(w * 0.22), int(h * 0.25)),
        (int(w * 0.22), int(h * 0.48)),
        (int(w * 0.30), int(h * 0.70)),
        (int(w * 0.50), int(h * 0.88)),
        (int(w * 0.70), int(h * 0.70)),
        (int(w * 0.78), int(h * 0.48)),
        (int(w * 0.78), int(h * 0.25)),
    ]

    # Draw gradient fill for shield
    shield_mask = Image.new("L", (size, size), 0)
    mask_draw = ImageDraw.Draw(shield_mask)
    mask_draw.polygon(shield_pts, fill=255)

    shield_img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(shield_img)
    # Vertical gradient from sky-600 (2, 132, 199) to indigo-700 (67, 56, 202)
    top_y = int(h * 0.12)
    bot_y = int(h * 0.88)
    for y in range(top_y, bot_y + 1):
        ratio = (y - top_y) / max(1, (bot_y - top_y))
        r = int(2 + ratio * (67 - 2))
        g = int(132 + ratio * (56 - 132))
        b = int(199 + ratio * (202 - 199))
        s_draw.line([(0, y), (w, y)], fill=(r, g, b, 255))
    
    img.paste(shield_img, (0, 0), shield_mask)

    # Shield border
    draw.polygon(shield_pts, outline=(56, 189, 248, 255), width=int(size * 0.022))

    # Inner shield accent contour
    inner_pts = [
        (int(w * 0.50), int(h * 0.17)),
        (int(w * 0.26), int(h * 0.28)),
        (int(w * 0.26), int(h * 0.47)),
        (int(w * 0.33), int(h * 0.67)),
        (int(w * 0.50), int(h * 0.82)),
        (int(w * 0.67), int(h * 0.67)),
        (int(w * 0.74), int(h * 0.47)),
        (int(w * 0.74), int(h * 0.28)),
    ]
    draw.polygon(inner_pts, outline=(255, 255, 255, 70), width=int(size * 0.008))

    # 3. Drishti Observability Eye Contour
    # Center is at (0.5, 0.48)
    cx, cy = int(w * 0.50), int(h * 0.48)
    eye_pts_top = []
    eye_pts_bot = []
    eye_w = int(w * 0.23)
    eye_h = int(h * 0.13)
    
    # Elliptical eye opening
    for deg in range(180, 361):
        rad = math.radians(deg)
        x = cx + eye_w * math.cos(rad)
        y = cy + eye_h * math.sin(rad)
        eye_pts_top.append((x, y))
    for deg in range(0, 181):
        rad = math.radians(deg)
        x = cx + eye_w * math.cos(rad)
        y = cy + eye_h * math.sin(rad)
        eye_pts_bot.append((x, y))
    
    eye_contour = eye_pts_top + eye_pts_bot
    draw.polygon(eye_contour, fill=(10, 15, 30, 200), outline=(224, 242, 254, 255), width=int(size * 0.022))

    # 4. Radar Ring
    radar_r = int(w * 0.09)
    draw.ellipse([(cx - radar_r, cy - radar_r), (cx + radar_r, cy + radar_r)], 
                 outline=(56, 189, 248, 200), width=int(size * 0.012))

    # 5. Iris & Pupil Glow
    pupil_r = int(w * 0.055)
    draw.ellipse([(cx - pupil_r, cy - pupil_r), (cx + pupil_r, cy + pupil_r)], fill=(14, 165, 233, 255))
    center_r = int(w * 0.028)
    draw.ellipse([(cx - center_r, cy - center_r), (cx + center_r, cy + center_r)], fill=(255, 255, 255, 255))

    # 6. High-Contrast Verification Checkmark (SLA Compliance)
    # Checkmark coords
    check_pts = [
        (cx - int(w * 0.08), cy + int(h * 0.01)),
        (cx - int(w * 0.02), cy + int(h * 0.07)),
        (cx + int(w * 0.09), cy - int(h * 0.06)),
    ]
    draw.line(check_pts[:2], fill=(255, 255, 255, 255), width=int(size * 0.026))
    draw.line(check_pts[1:], fill=(255, 255, 255, 255), width=int(size * 0.026))

    # Draw rounded joints on checkmark
    for pt in check_pts:
        draw.ellipse([(pt[0] - int(size*0.013), pt[1] - int(size*0.013)),
                      (pt[0] + int(size*0.013), pt[1] + int(size*0.013))],
                     fill=(255, 255, 255, 255))

    return img

if __name__ == "__main__":
    public_dir = os.path.join(os.path.dirname(__file__), "..", "public")
    base_img = create_favicon(2048)
    
    # Save high-res master
    img_512 = base_img.resize((512, 512), Image.Resampling.LANCZOS)
    img_512.save(os.path.join(public_dir, "favicon-512x512.png"))
    print("Generated favicon-512x512.png")

    img_192 = base_img.resize((192, 192), Image.Resampling.LANCZOS)
    img_192.save(os.path.join(public_dir, "favicon-192x192.png"))
    print("Generated favicon-192x192.png")

    img_apple = base_img.resize((180, 180), Image.Resampling.LANCZOS)
    img_apple.save(os.path.join(public_dir, "apple-touch-icon.png"))
    print("Generated apple-touch-icon.png (180x180)")

    img_32 = base_img.resize((32, 32), Image.Resampling.LANCZOS)
    img_32.save(os.path.join(public_dir, "favicon-32x32.png"))
    print("Generated favicon-32x32.png")

    img_16 = base_img.resize((16, 16), Image.Resampling.LANCZOS)
    img_16.save(os.path.join(public_dir, "favicon-16x16.png"))
    print("Generated favicon-16x16.png")

    # Generate multi-size favicon.ico
    sizes = [(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)]
    base_img.save(os.path.join(public_dir, "favicon.ico"), format="ICO", sizes=sizes)
    print("Generated multi-resolution favicon.ico")
