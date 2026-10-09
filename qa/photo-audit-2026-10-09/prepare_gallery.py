from pathlib import Path
from PIL import Image, ImageOps
import json
out=Path('public/campus-explorer/photos');out.mkdir(exist_ok=True)
source=Path(r'F:\1151005---創意教學 - 複製\校園照片')
items={
 'stage-2019':source/'20191022 操場照片'/'_MC_7189.JPG',
 'lanes-2019':source/'20191022 操場照片'/'_MC_7170.JPG',
 'track-2019':source/'20191022 操場照片'/'_MC_7147.JPG',
 'shade-2019':source/'20191022 操場照片'/'_MC_7177.JPG',
 'hill-2019':source/'20191022 操場照片'/'_MC_7167.JPG',
 'admin-front':source/'S__66011285.jpg',
 'admin-entry':source/'S__66011288.jpg',
 'admin-roof':source/'S__66011292.jpg',
 'admin-gallery':source/'S__66011290.jpg',
}
manifest=[]
for name,path in items.items():
    with Image.open(path) as raw:
        im=ImageOps.exif_transpose(raw).convert('RGB');im.thumbnail((1440,1080));im.save(out/(name+'.jpg'),quality=83,optimize=True)
    manifest.append({'asset':name+'.jpg','source':str(path.relative_to(source))})
(out/'sources.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
print('Prepared',len(items),'reference images; originals unchanged')
