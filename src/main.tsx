import {explorerUrl} from './explorer-url';
import './shell.css';
if(new URLSearchParams(window.location.search).get('viewer')==='legacy'){
 void import('./legacy-bootstrap');
}else{
 const shell=document.createElement('main'),frame=document.createElement('iframe');
 shell.className='campus-explorer-shell';frame.className='campus-explorer-frame';
 frame.title='大溪國中立體校園探索';frame.src=explorerUrl(import.meta.env.BASE_URL,window.location.search);frame.allow='fullscreen';
 const loading=document.createElement('div');loading.className='campus-loading';loading.setAttribute('role','status');loading.setAttribute('aria-live','polite');
 loading.innerHTML='<strong>大溪國中校園導覽</strong><span class="campus-loading-caption">正在整理校園地圖</span><span class="campus-loading-dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="campus-loading-note">請稍候，即將走進校園</span>';
 const slowTimer=window.setTimeout(()=>{const note=loading.querySelector('.campus-loading-note');if(note)note.textContent='載入時間較長，請稍候；若畫面未出現，請重新整理。'},12000);
 const onReady=(event:MessageEvent)=>{if(event.source!==frame.contentWindow||event.data?.type!=='campus-ready')return;window.clearTimeout(slowTimer);loading.classList.add('is-ready');window.removeEventListener('message',onReady)};
 window.addEventListener('message',onReady);
 shell.append(frame,loading);document.getElementById('root')!.replaceChildren(shell);
}
