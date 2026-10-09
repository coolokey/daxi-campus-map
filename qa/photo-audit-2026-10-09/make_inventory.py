from pathlib import Path
from PIL import Image, ImageOps, ImageDraw
import hashlib, json

source = Path(r'F:\1151005---創意教學 - 複製\校園照片')
out = Path(__file__).parent
seen = {}
records = []
unique = []
for p in sorted(source.rglob('*')):
    if not p.is_file() or p.suffix.lower() not in {'.jpg','.jpeg','.png'}:
        continue
    digest = hashlib.sha256(p.read_bytes()).hexdigest()
    with Image.open(p) as im:
        record = {'path': str(p), 'size': list(im.size), 'sha256': digest, 'duplicate_of': seen.get(digest)}
    records.append(record)
    if digest not in seen:
        seen[digest] = str(p)
        unique.append(p)
for start in range(0, len(unique), 12):
    sheet = Image.new('RGB', (1800, 1260), '#eeeeee')
    draw = ImageDraw.Draw(sheet)
    for i,p in enumerate(unique[start:start+12]):
        x,y = (i%3)*600,(i//3)*315
        with Image.open(p) as im:
            im = ImageOps.exif_transpose(im)
            thumb = ImageOps.contain(im.convert('RGB'), (590,285))
            sheet.paste(thumb,(x+(600-thumb.width)//2,y))
        draw.text((x+8,y+289),f'{start+i+1:02d}  {p.name}',fill='#111111')
    sheet.save(out/f'contact-{start//12+1}.jpg',quality=91)
(out/'inventory.json').write_text(json.dumps(records,ensure_ascii=False,indent=2),encoding='utf-8')
(out/'unique-paths.json').write_text(json.dumps([str(p) for p in unique],ensure_ascii=False,indent=2),encoding='utf-8')
print(f'{len(records)} files, {len(unique)} unique, {len(records)-len(unique)} duplicates')
