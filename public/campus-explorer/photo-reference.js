/* Source-specific gallery. Historical surfaces are evidence, not present-day claims. */
(()=>{
 const panel=document.getElementById('reference-panel'),api=window.campusExplorer;
 const opener=[...document.querySelectorAll('#scene-toolbar button')].find(b=>b.textContent==='實景對照');if(!panel||!opener)return;
 const oldDate='2019 年 10 月 22 日・EXIF 拍攝日期',unknown='拍攝日期未提供';
 const groups={
  sports:{label:'操場與司令台',items:[
   ['stage-2019','司令台正面',oldDate,'舞台凹口、黃色收分階梯與同側三旗桿。階梯配色取自舊照，現況及尺寸仍待量定。','grandstand'],
   ['lanes-2019','六道與起跑標記',oldDate,'可讀到 1–6 道編號及斜向標記；場景標記位置為示意。','track'],
   ['track-2019','跑道與彎道內鋪面',oldDate,'這張舊照呈現紅跑道和藍色鋪面；其他來源呈黑灰跑道。現版保留黑灰來源，尚未認定目前顏色。','track'],
   ['shade-2019','林蔭步道與座位',oldDate,'低磚花台、樹穴與沿跑道外緣的步道；樹種與距離未經測量。','track'],
   ['hill-2019','後山與擋土牆',oldDate,'斜面分段擋土牆及林木邊界；地形高度為示意。','track']
  ]},
  admin:{label:'行政前棟',items:[
   ['admin-front','前立面與花園',unknown,'與全區空拍 05／11 的凹廊、樹列及活動中心相鄰關係交叉定位為行政前棟；不是由招牌直接辨識。','admin-g89-staff'],
   ['admin-entry','門廊與坡道',unknown,'玻璃門、低台階、右側坡道與金屬扶手。入口高度採導覽示意，不代表實測無障礙路線。','admin-g89-staff'],
   ['admin-roof','屋面與窗組',unknown,'紅瓦主坡面、藍綠檐口與成組窗框；房名及樓層沿用 115 平面圖。','admin-g89-staff'],
   ['admin-gallery','連廊與側牆',unknown,'抬高連廊及柱框可供外觀對照；黃色框架設備用途未確認。','academic']
  ]}
 };
 let active='sports',index=0;
 panel.setAttribute('aria-modal','true');panel.setAttribute('aria-labelledby','photo-title');
 panel.innerHTML='<header class="photo-header"><div><span class="photo-eyebrow">大溪國中・實景紀錄</span><h2 id="photo-title">從照片認識校園</h2></div><button id="photo-close" type="button" aria-label="關閉實景對照">關閉 ×</button></header><p class="photo-intro">115 平面圖校對樓層與配置；不同年代照片校對外觀。尺寸與路徑距離為示意。</p><nav class="photo-tabs" aria-label="實景照片區域"></nav><figure class="photo-figure"><img id="photo-image" alt=""><figcaption><span id="photo-date"></span><h3 id="photo-caption"></h3><p id="photo-evidence"></p></figcaption></figure><footer class="photo-footer"><div><button id="photo-prev" type="button">← 上一張</button><span id="photo-count" aria-live="polite"></span><button id="photo-next" type="button">下一張 →</button></div><button id="photo-go" type="button">查看此地點</button></footer>';
 const links=document.createElement('p');links.className='photo-source-links';links.innerHTML='<a href="campus_plan_115.jpg" target="_blank" rel="noopener">115 學年度平面圖</a>　<a href="reference-aerial.jpg" target="_blank" rel="noopener">全校空拍</a>　<a href="campus-illustration.png" target="_blank" rel="noopener">校園美術圖</a>';panel.append(links);
 const tabs=panel.querySelector('.photo-tabs');
 for(const [key,g] of Object.entries(groups)){const button=document.createElement('button');button.type='button';button.dataset.photoGroup=key;button.textContent=g.label;button.onclick=()=>{active=key;index=0;render()};tabs.append(button)}
 function render(){const items=groups[active].items,item=items[index],image=panel.querySelector('#photo-image');image.src=`photos/${item[0]}.jpg`;image.alt=item[1];panel.querySelector('#photo-date').textContent=item[2];panel.querySelector('#photo-caption').textContent=item[1];panel.querySelector('#photo-evidence').textContent=item[3];panel.querySelector('#photo-count').textContent=`${index+1} / ${items.length}`;for(const b of tabs.children)b.setAttribute('aria-pressed',String(b.dataset.photoGroup===active));}
 function close(){panel.classList.remove('open');opener.focus()}
 opener.onclick=()=>{render();api.manualTakeover?.();api.resetManualInput?.();panel.classList.add('open');panel.querySelector('#photo-close').focus()};
 panel.querySelector('#photo-close').onclick=close;
 panel.querySelector('#photo-prev').onclick=()=>{index=(index-1+groups[active].items.length)%groups[active].items.length;render()};
 panel.querySelector('#photo-next').onclick=()=>{index=(index+1)%groups[active].items.length;render()};
 panel.querySelector('#photo-go').onclick=()=>{const id=groups[active].items[index][4];close();api.navigateToRoom(id)};
 panel.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();close()}else if(e.key==='Tab'){const controls=[...panel.querySelectorAll('button,a[href]')],first=controls[0],last=controls.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
})();
