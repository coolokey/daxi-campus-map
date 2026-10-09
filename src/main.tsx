import {explorerUrl} from './explorer-url';
import './shell.css';
if(new URLSearchParams(window.location.search).get('viewer')==='legacy'){
 void import('./legacy-bootstrap');
}else{
 const shell=document.createElement('main'),frame=document.createElement('iframe');
 shell.className='campus-explorer-shell';frame.className='campus-explorer-frame';
 frame.title='大溪國中立體校園探索';frame.src=explorerUrl(import.meta.env.BASE_URL,window.location.search);frame.allow='fullscreen';
 const loading=document.createElement('div');loading.className='campus-loading';loading.innerHTML='<strong>大溪國中校園導覽</strong><span>場景載入中⋯</span>';
 window.addEventListener('message',event=>{if(event.data?.type==='campus-ready')loading.classList.add('is-ready')});
 window.setTimeout(()=>loading.classList.add('is-ready'),12000);
 shell.append(frame,loading);document.getElementById('root')!.replaceChildren(shell);
}
