import {explorerUrl} from './explorer-url';
import './shell.css';
import {attachCampusLoading} from './loading-state';
if(new URLSearchParams(window.location.search).get('viewer')==='legacy'){
 void import('./legacy-bootstrap');
}else{
 const shell=document.createElement('main'),frame=document.createElement('iframe');
 shell.className='campus-explorer-shell';frame.className='campus-explorer-frame';
 frame.title='大溪國中立體校園探索';frame.src=explorerUrl(import.meta.env.BASE_URL,window.location.search);frame.allow='fullscreen';
 const loading=document.createElement('div');loading.className='campus-loading';loading.setAttribute('role','status');loading.setAttribute('aria-live','polite');
 attachCampusLoading(frame,loading);
 shell.append(frame,loading);document.getElementById('root')!.replaceChildren(shell);
}
