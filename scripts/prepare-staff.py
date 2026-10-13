"""Prepare only explicitly name-labelled staff portraits; never crop student pages.
Run with the local staff source directory as the first argument.
"""
from pathlib import Path
from zipfile import ZipFile
from xml.etree import ElementTree as ET
from PIL import Image, ImageOps, ImageDraw
import json, re, sys

source=Path(sys.argv[1]); root=Path(__file__).resolve().parents[1]
dest=root/'public/campus-explorer/assets/staff'; dest.mkdir(parents=True,exist_ok=True)
ns={'w':'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
with ZipFile(next(source.glob('*.docx'))) as z: doc=ET.fromstring(z.read('word/document.xml'))
people=[]
for row in doc.findall('.//w:tbl/w:tr',ns)[1:]:
    # Read only w:t, excluding formatting/metadata.
    cells=[''.join(t.text or '' for t in c.findall('.//w:t',ns)) for c in row.findall('./w:tc',ns)]
    for a,b in [(0,1),(4,5),(8,9)]:
        if len(cells)<=b: continue
        raw=cells[b].replace(' ',''); title=cells[a].replace(' ','').replace('　','')
        gender='female' if re.search(r'女\d*$',raw) else 'male' if re.search(r'男\d*$',raw) else None
        name=re.sub(r'[男女]\d*$','',raw)
        if not title or not name or name in ['歷史','女26','男13','男14']: continue
        title=(title+' 導師') if re.fullmatch(r'[789]0[1-9]',title) else re.sub(r'^\d+','',title)
        title=re.sub(r'\(.*?\)|約\d+','',title)
        target='academic'
        if title=='校長': target='principal'
        elif any(x in title for x in ['總務','人事','會計','出納','文書']):target='general'
        elif any(x in title for x in ['輔導','特教','資源班']):target='counseling'
        elif any(x in title for x in ['體育','運動','教練']):target='pe-office'
        elif title=='護理師':target='health'
        elif '導師' in title and title[:3].isdigit():
            # Find actual room IDs later; office routing remains explicit and conservative.
            target='academic'
        people.append(dict(id=f'staff-{len(people)+1:03}',name=name,title=title,gender=gender,portrait=None,destination=target))

# Coordinates are visually verified portrait frames, normalized against original spreads.
# Each entry: name, file, bounds, glasses, hair color, shirt color.
matches=[]
def add(name,file,box,glasses=False,hair='3e332e',shirt='6c8a87'):
    matches.append((name,file,box,glasses,hair,shirt))
add('林晏瑄','002+003.jpg',(.69,.15,.82,.40),True,'634236','91aaa0')
for name,box,glasses,hair,shirt in [
 ('韓美瑛',(.035,.215,.15,.445),True,'352d29','516e81'),
 ('黃文昌',(.34,.215,.465,.445),True,'3a342c','9b706c'),
 ('游家興',(.035,.58,.15,.82),False,'77716b','807b8b'),
 ('陳古學',(.19,.58,.305,.82),True,'28272b','8e877e'),
 ('吳玉珍',(.34,.58,.465,.82),False,'4b352d','8ba0ae'),
 ('李昱瑩',(.90,.26,.975,.445),False,'3e2c27','7b8e81'),
 ('游貿仁',(.525,.51,.605,.66),False,'292626','787e88'),
 ('林耀明',(.715,.51,.79,.66),True,'3a322d','91897a'),
 ('林佳均',(.90,.51,.976,.66),False,'9c805f','b5a58f'),
 ('陳淑惠',(.715,.75,.79,.90),True,'34312c','a08d85'),
 ('吳承翰',(.808,.75,.885,.90),True,'3f3128','7b889e'),
 ('葉思妘',(.90,.75,.976,.90),False,'3a2925','969288')]:add(name,'008+009.jpg',box,glasses,hair,shirt)

# Counselling staff: five portrait columns and three rows on the left page.
for row,names in enumerate([
 ['侯玓妤','孫凱琳','曹淑珍','邱采薇','蕭安彤'],
 ['簡嘉慧','鄒蜀美','鄭涵文','吳嘉祥','李雅婷'],
 ['蘇彥如','游敬亷',None,'黃鳳敏']]):
    for col,name in enumerate(names):
        if name:
            x=.024+col*.093; y=[.342,.562,.782][row]
            add(name,'012+013.jpg',(x,y,x+.075,y+.152),name in ['孫凱琳','曹淑珍','簡嘉慧','吳嘉祥','蘇彥如','游敬亷'])
for row,names in enumerate([['劉惠珠','羅培瑛','陳惠晶'],['張一梅','蔡淑禎',None],['謝如琳','陳毅宏','陳秋梅']]):
    for col,name in enumerate(names):
        if name:
            x=.566+col*.143;y=[.16,.435,.713][row]
            add(name,'012+013.jpg',(x,y,x+.087,y+.183),name in ['劉惠珠','羅培瑛','蔡淑禎'])
for row,names in enumerate([['康嘉玲','陳建生','劉信志'],['林璟薇','張秀萍','周育秀'],['文明慧','潘建銘','陳麗芳']]):
    for col,name in enumerate(names):
        x=.06+col*.145;y=[.16,.435,.714][row]
        add(name,'014+015.jpg',(x,y,x+.085,y+.18),name in ['劉信志','林璟薇','潘建銘','陳麗芳'])
for name,box,glasses in [
 ('王明貴',(.548,.332,.626,.484),True),('余婉如',(.888,.332,.966,.484),True),
 ('張雅琪',(.548,.771,.626,.920),True),('張銘峰',(.66,.771,.739,.920),False),
 ('許晏聆',(.775,.771,.851,.920),True)]:add(name,'014+015.jpg',box,glasses)
add('陳小鈴','016+017.jpg',(.04,.11,.117,.26),False,'2b2729','8b738a')
# Clearly labelled class-adviser portraits supplement staff pages.
add('徐君萍','030+031.jpg',(.075,.13,.20,.34),False,'3d2926','a58e82')
add('吳佳蓉','038+039.jpg',(.335,.125,.43,.295),False,'65503e','b9a68f')
add('莊玉如','046+047.jpg',(.055,.14,.21,.31),True,'42312a','b4a087')
# 054+055 labels 方廷榕 but its large portrait is an illustration, not a verified photo.
# 吳美青 shares a portrait with another person; await an individual photo.
add('黃瓘婷','070+071.jpg',(.105,.12,.225,.39),True,'3c2b24','8c9d8a')
add('邱顯徽','078+079.jpg',(.08,.14,.185,.35),False,'292624','74777e')
add('林堯仁','086+087.jpg',(.025,.11,.16,.35),True,'39312a','788c96')

byname={p['name']:p for p in people}; register=[]
for name,file,box,glasses,hair,shirt in matches:
    if name not in byname: raise ValueError('Photo name not in current roster: '+name)
    person=byname[name]; im=ImageOps.exif_transpose(Image.open(source/file)).convert('RGB');w,h=im.size
    bounds=tuple(round(v*(w if i%2==0 else h)) for i,v in enumerate(box))
    portrait=ImageOps.fit(im.crop(bounds),(240,300),method=Image.Resampling.LANCZOS)
    portrait.save(dest/(person['id']+'.jpg'),quality=90,optimize=True)
    person['portrait']='assets/staff/'+person['id']+'.jpg'
    person['appearance']={'gender':person['gender'] or ('male' if name in ['陳古學','游貿仁','游家興','林耀明','吳承翰'] else 'female'),'glasses':glasses,'hairColor':int(hair,16),'shirtColor':int(shirt,16)}
    # Hair is a visual feature, independent of roster gender.
    if name in ['林晏瑄','韓美瑛','黃文昌','游家興','陳古學','游貿仁','吳美青','林耀明','吳嘉祥','游敬亷','黃鳳敏','劉惠珠','羅培瑛','陳惠晶','謝如琳','陳毅宏','陳建生','劉信志','蘇彥如','林佳均','陳淑惠','吳承翰','王明貴','張銘峰','邱顯徽','林堯仁']:
        person['appearance']['hairStyle']='short'
    register.append({'id':person['id'],'name':name,'source':file,'crop':bounds,'currentTitle':person['title'],'status':'name-labelled-photo'})
data={'year':115,'people':people}
(root/'public/campus-explorer/staff-data.js').write_text('/* Current titles from 115-1 roster. Photos separately name-verified; no student identities. */\nwindow.CampusStaffData='+json.dumps(data,ensure_ascii=False,indent=2)+';\n',encoding='utf-8')
local=root/'docs/staff';local.mkdir(parents=True,exist_ok=True)
(local/'photo-register.json').write_text(json.dumps(register,ensure_ascii=False,indent=2),encoding='utf-8')
print(f'{len(people)} staff, {len(register)} matched portraits, {len(people)-len(register)} awaiting photos')
# Local visual inspection sheet, outside public delivery.
out=root/'qa/staff-2026-10-13';out.mkdir(parents=True,exist_ok=True)
for start in range(0,len(register),20):
    sheet=Image.new('RGB',(1200,1360),'#eeeae0');draw=ImageDraw.Draw(sheet)
    for j,entry in enumerate(register[start:start+20]):
        im=Image.open(dest/(entry['id']+'.jpg'));im.thumbnail((210,263));x=(j%5)*240+15;y=(j//5)*340+24
        sheet.paste(im,(x,y));draw.text((x,y+269),entry['id'],fill='black')
    sheet.save(out/f'portraits-{start//20+1}.jpg',quality=92)
