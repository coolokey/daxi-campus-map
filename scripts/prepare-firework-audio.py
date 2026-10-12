"""Reproducible recording edits. No synthesized firework samples are generated."""
import hashlib,json,pathlib,subprocess
ROOT=pathlib.Path(__file__).resolve().parents[1]
SRC=ROOT/'public/campus-explorer/assets/sounds/sources'
OUT=ROOT/'public/campus-explorer/assets/sounds'
SOURCES={
 'stephan':{'author':'Stephan','license':'Public domain (PD-author / PDSounds)','page':'https://commons.wikimedia.org/wiki/File:Fireworks.ogg','original':'stephan-fireworks.ogg'},
 'rubberduck':{'author':'rubberduck','license':'CC0 1.0','page':'https://opengameart.org/node/92774','original':'25-CC0-bang-sfx.zip'},
 'applause':{'author':'eXpl0it3r','license':'CC0 1.0','page':'https://opengameart.org/content/applause-in-a-large-hall-or-church','original':'applause.wav'},
}
def duration(file):
 return float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',str(file)]))
def clip(kind,index,source,file,start,length,filters='',note=''):
 path=SRC/file
 name=f'{kind}-{index:02}.mp3'
 af=','.join(x for x in [filters,'loudnorm=I=-24:TP=-7:LRA=7','afade=t=in:d=0.012',f'afade=t=out:st={max(.02,length-.18):.3f}:d=0.18'] if x)
 subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y','-ss',str(start),'-i',str(path),'-t',str(length),'-af',af,'-ar','44100','-ac','2','-codec:a','libmp3lame','-b:a','112k',str(OUT/name)],check=True)
 return {'file':name,'source':source,'sourceFile':file,'start':start,'duration':duration(OUT/name),'edit':af,'note':note,'sha256':hashlib.sha256((OUT/name).read_bytes()).hexdigest()}
layers={k:[] for k in ['launch','near','far','crackle','tail','crowd']}
for i,t in enumerate([12.2,24.4,45.9],1):layers['launch'].append(clip('launch',i,'stephan','stephan-fireworks.ogg',t,1.4,'highpass=f=1100,lowpass=f=6500','Distinct whistle excerpts from the same live fireworks recording.'))
for i in range(1,4):
 file=f'bangs/fw_0{i}.ogg'
 layers['near'].append(clip('near',i,'rubberduck',file,0,min(3.4,duration(SRC/file)),note='Recorded firework, unpitched edit.'))
 file=f'bangs/fw_0{i+3}.ogg'
 layers['far'].append(clip('far',i,'rubberduck',file,0,min(4,duration(SRC/file)),'lowpass=f=550','Low-pass edit of a distinct recorded firework; simulated distance.'))
 file=f'bangs/fw_0{i}.ogg';d=duration(SRC/file);length=min(1.6,d*.6)
 layers['tail'].append(clip('tail',i,'rubberduck',file,max(.25,d-length),length,'lowpass=f=2400','Recorded decay excerpt, with extra convolution reverb at runtime.'))
for i,t in enumerate([66.5,78.2,86.0],1):layers['crackle'].append(clip('crackle',i,'stephan','stephan-fireworks.ogg',t,2.5,'highpass=f=1700','Distinct cracker excerpts; other live ambience may remain.'))
for i,t in enumerate([2,13,25],1):layers['crowd'].append(clip('crowd',i,'applause','applause.wav',t,7,'highpass=f=150,lowpass=f=6000','Indoor concert applause; not a recording of Daxi students.'))
for source in SOURCES.values():source['sha256']=hashlib.sha256((SRC/source['original']).read_bytes()).hexdigest()
manifest={'version':2,'verifiedDate':'2026-10-12','sources':SOURCES,'layers':layers}
(OUT/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
print('Prepared',sum(map(len,layers.values())),'recording samples. Total bytes:',sum((OUT/e['file']).stat().st_size for v in layers.values() for e in v))
