"""Produce web-sized derivatives; keep all originals unchanged."""
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parent
workspace = root.parent
source = workspace / 'future-campus-rpg/public/assets/maps/daxi-future-campus-rpg-v1.png'
image = Image.open(source).convert('RGB')
image.save(source.with_suffix('.webp'), quality=86, method=6)
(root / 'assets').mkdir(exist_ok=True)
for width in (480, 960):
    resized = image.copy()
    resized.thumbnail((width, width), Image.Resampling.LANCZOS)
    output = root / f'assets/campus-map-{width}.webp'
    resized.save(output, quality=82, method=6)
    print(f'{output.name}: {output.stat().st_size} bytes')
print(f'RPG map: {source.with_suffix(".webp").stat().st_size} bytes (original {source.stat().st_size})')
cover = workspace / 'daxi-campus-map/public/campus-explorer/reference-aerial.jpg'
photo = Image.open(cover).convert('RGB')
photo.thumbnail((1280, 1280), Image.Resampling.LANCZOS)
photo.save(cover.with_suffix('.webp'), quality=82, method=6)
print(f'Campus cover: {cover.with_suffix(".webp").stat().st_size} bytes (original {cover.stat().st_size})')
