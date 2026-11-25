/* A single credit stays interactive both inside the modal cover and in the scene. */
(()=>{
 const footer=document.getElementById('campus-credits'),cover=document.getElementById('guide-landing');
 if(!footer)return;
 function measure(){const height=Math.ceil(footer.getBoundingClientRect().height);if(height>0)document.documentElement.style.setProperty('--campus-credit-height',height+'px')}
 function place(){const parent=cover?.open?cover:document.body;if(footer.parentElement!==parent)parent.append(footer);measure()}
 if(cover)new MutationObserver(place).observe(cover,{attributes:true,attributeFilter:['open']});
 if(typeof ResizeObserver!=='undefined')new ResizeObserver(measure).observe(footer);
 window.addEventListener('resize',measure,{passive:true});
 place();
})();
