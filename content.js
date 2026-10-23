/* ChatGPT Date Cleaner v1.2.0 — unofficial. No external scripts or telemetry.
 * Uses undocumented ChatGPT endpoints, which may change without warning.
 */
(() => {
  'use strict';
  if (globalThis.__chatgptDateCleanerLoaded) return;
  globalThis.__chatgptDateCleanerLoaded = true;

  const locales = globalThis.__chatCleanerLocales;
  if (!locales) return;
  const allowedLangs = ['it','en','es','ru','ja','zh','ar','fr'];
  const storageKey = 'chatgpt_date_cleaner_language_v120';
  let lang = null;
  let languageReturn = 'date';
  const t = (key, vals = {}) => {
    const raw = (locales[lang] && locales[lang][key]) || locales.en[key] || key;
    return raw.replace(/\{(\w+)\}/g, (_, k) => String(vals[k] ?? ''));
  };

  const TZ = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  const dayParts = new Intl.DateTimeFormat('en-US', {timeZone:TZ, year:'numeric',month:'2-digit',day:'2-digit'});
  const dayKey = ms => { const p = Object.fromEntries(dayParts.formatToParts(new Date(ms)).map(x=>[x.type,x.value])); return `${p.year}-${p.month}-${p.day}`; };
  const isoLabel = iso => iso ? iso.split('-').reverse().join('/') : '—';
  const validISO = iso => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(iso || '')) return false;
    const d = new Date(iso+'T12:00:00Z');
    return Number.isFinite(d.getTime()) && d.toISOString().slice(0,10)===iso;
  };
  const safeText = value => String(value == null ? '' : value);
  const formatDate = ms => new Date(ms).toLocaleDateString({it:'it-IT',en:'en-GB',es:'es-ES',ru:'ru-RU',ja:'ja-JP',zh:'zh-CN',ar:'ar',fr:'fr-FR'}[lang] || 'en-GB', {timeZone:TZ,year:'numeric',month:'2-digit',day:'2-digit'});
  const sleep = ms => new Promise(resolve => setTimeout(resolve,ms));
  const API = '/backend-api';
  const DELAY_MS = 8000;
  const PAGE_SIZE = 100;
  const MAX_PAGES = 1000;
  let token = null;
  let cutoffISO = null;
  let scanCutoffISO = null;
  let candidates = [];
  let selectedIds = new Set();
  let scanComplete = false;
  let exported = false;
  let running = false;
  let cancelRequested = false;
  let counter = {scanned:0, protected:0, unknown:0, projects:0};
  let lastStatus = {key:'idle',values:{}};
  let modalResolve = null;

  const host = document.createElement('div');
  host.id = 'chatgpt-date-cleaner-extension';
  host.style.cssText = 'position:fixed;z-index:2147483647;right:16px;bottom:16px;font-family:Arial,system-ui,sans-serif;direction:ltr;';
  document.documentElement.appendChild(host);
  const root = host.attachShadow({mode:'open'});
  root.innerHTML = `
  <style>
    :host {all:initial} *, *::before, *::after {box-sizing:border-box}
    button, input {font:inherit} button {cursor:pointer}
    .opener {background:#135e4d;color:#fff;border:1px solid #0a483c;border-radius:24px;min-height:44px;padding:10px 16px;font-size:13px;font-weight:700;box-shadow:0 6px 24px #0005;white-space:nowrap}
    .opener.icon-only {width:48px;height:48px;padding:0;border-radius:50%;font-size:23px;touch-action:none;cursor:grab}
    .opener.icon-only:active {cursor:grabbing}
    .panel {display:none;width:min(640px,calc(100vw - 24px));height:min(78vh,750px);min-height:340px;max-height:calc(100vh - 16px);background:#fff;color:#202225;border:1px solid #90a09c;border-radius:14px;box-shadow:0 10px 42px #0005;overflow:hidden;font-size:13px;flex-direction:column}
    .panel.visible {display:flex}
    header {display:flex;align-items:center;justify-content:space-between;background:#114f43;color:#fff;min-height:52px;padding:7px 10px 7px 14px;gap:8px;direction:ltr;touch-action:none;cursor:grab;user-select:none}
    header:active {cursor:grabbing}
    header strong {font-size:15px;line-height:1.2;flex:1;min-width:0}
    header button {border:0;border-radius:6px;background:#ffffff24;color:#fff;padding:4px 8px;font-size:13px;min-height:30px;cursor:pointer}
    header button:hover {background:#ffffff45}
    #minimize {font-size:21px;line-height:20px;min-width:33px}
    #close {font-size:22px;line-height:20px;min-width:33px}
    main {padding:14px;overflow:auto;min-height:0;flex:1;overscroll-behavior:contain}
    h2 {margin:0 0 12px;font-size:18px;color:#114f43}
    p {margin:0 0 10px;line-height:1.45}
    .muted {color:#666;font-size:12px}
    .warning {background:#fff7e7;border:1px solid #efd6a0;border-radius:8px;padding:10px;margin:9px 0;line-height:1.45}
    .row {display:flex;flex-wrap:wrap;gap:9px;align-items:center;margin:10px 0}
    label {cursor:pointer;line-height:1.45}
    input[type=checkbox] {margin-inline-end:4px;vertical-align:middle}
    button {border:1px solid #999;background:#f5f5f5;color:#202225;padding:8px 10px;border-radius:8px;font-size:13px}
    button.primary {background:#145f51;color:#fff;border-color:#145f51}
    button.danger {background:#a92828;color:#fff;border-color:#a92828}
    button:disabled {cursor:not-allowed;opacity:.45}
    #status {font-size:12px;white-space:pre-wrap;line-height:1.55;margin:10px 0;color:#374151}
    #tablewrap {max-height:250px;overflow:auto;border:1px solid #ddd;border-radius:8px;margin:10px 0}
    table {width:100%;border-collapse:collapse;font-size:12px;direction:ltr}
    th {position:sticky;top:0;background:#edf2f1;text-align:start}
    th,td {padding:7px;border-bottom:1px solid #eee;vertical-align:top}
    td:nth-child(2) {word-break:break-word;max-width:300px}
    a {color:#145f51}
    .footer {font-size:11px;color:#777;margin-top:8px;line-height:1.5}
    [hidden] {display:none !important}
    .card {border:1px solid #c9ddd7;border-radius:12px;background:#f4f9f7;padding:14px;margin-bottom:12px}
    .card label.block {display:block;font-weight:700;margin-bottom:8px}
    input[type=date], input[type=text] {min-height:38px;padding:7px;border:1px solid #899b96;border-radius:8px;color:#202225;background:#fff;max-width:100%}
    input[type=date] {font-size:16px;min-width:180px}
    input[type=text] {width:100%;font-size:14px}
    .date-help {font-size:12px;line-height:1.5;margin:9px 0;color:#42534d}
    .chosen-date {display:flex;align-items:center;gap:12px;flex-wrap:wrap;padding:9px 12px;background:#e2eee9;border-radius:8px;margin:4px 0 12px}
    .error {color:#a42727;font-size:12px;margin-top:8px}
    .lang-grid {display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px;margin:14px 0}
    .lang-grid button {padding:12px 6px;border-color:#b5cbc3;background:#fff}
    .lang-grid button:hover {background:#e2eee9}
    .backdrop {position:absolute;inset:0;background:#0009;display:none;align-items:center;justify-content:center;padding:12px;z-index:2;border-radius:14px}
    .backdrop.visible {display:flex}
    .dialog {background:#fff;border-radius:12px;padding:18px;width:min(540px,100%);max-height:calc(100% - 8px);overflow-y:auto;box-shadow:0 10px 35px #0005}
    .dialog h2 {color:#9b2020;margin-bottom:10px}
    .dialog label {display:block;margin:12px 0}
    .dialog strong {font-weight:700}
    .dialog .row {justify-content:flex-end}
    .dialog .risk {border-left:4px solid #a92828;padding:9px 12px;background:#fff2f2;line-height:1.55;margin:10px 0}
    .panel[dir=rtl] main {direction:rtl;text-align:right}
    .panel[dir=rtl] table {direction:rtl}
    .panel[dir=rtl] th {text-align:right}
    @media(max-width:480px) {main{padding:10px}.lang-grid{grid-template-columns:1fr}.panel{height:min(86vh,750px)}header strong{font-size:13px}}
    @media(prefers-reduced-motion:reduce) {* {scroll-behavior:auto!important}}
  </style>
  <button id="open" class="opener" type="button" aria-label="Open">◧</button>
  <section class="panel" id="panel" role="region" aria-label="ChatGPT Date Cleaner">
    <header id="handle"><strong id="windowTitle"></strong><button type="button" id="switchLanguage" data-nodrag title="Language" aria-label="Language">🌐</button><button type="button" id="minimize" data-nodrag aria-label="Minimize">−</button><button type="button" id="close" data-nodrag aria-label="Close">×</button></header>
    <main>
      <section id="langStep"><div class="card"><h2 id="langTitle">Choose your language / Scegli la lingua</h2><p id="langIntro">Select the interface language. You can change it later. / Seleziona la lingua dell'interfaccia.</p><div class="lang-grid" id="languageButtons"></div></div></section>
      <section id="dateStep" hidden><div class="card"><h2 id="dateTitle"></h2><label class="block" for="keepFrom" id="datePrompt"></label><input type="date" id="keepFrom" required><p class="date-help" id="dateHint"></p><p class="date-help" id="zoneLabel"></p><button class="primary" type="button" id="chooseDate"></button><div id="dateError" class="error" role="alert"></div></div><p class="warning" id="initialWarning"></p></section>
      <section id="workStep" hidden>
        <div class="chosen-date"><span id="chosenText"></span><button type="button" id="changeDate"></button></div>
        <p id="ruleText"></p><div class="warning" id="backupWarning"></div>
        <div class="row"><label><input type="checkbox" id="archived" checked><span id="archivedLabel"></span></label><label><input type="checkbox" id="projects"><span id="projectsLabel"></span></label></div>
        <div class="row"><button type="button" id="scan" class="primary"></button><button type="button" id="export" disabled></button></div>
        <div id="status" role="status"></div>
        <div id="tablewrap" hidden><table><thead><tr><th><input type="checkbox" id="all" aria-label="All"></th><th id="thTitle"></th><th id="thCreated"></th><th id="thUpdated"></th></tr></thead><tbody id="tbody"></tbody></table></div>
        <div id="tableinfo" class="muted"></div>
        <div class="row"><label><input type="checkbox" id="backup"><span id="backupLabel"></span></label></div>
        <div class="row"><button type="button" class="danger" id="test" disabled></button><button type="button" class="danger" id="delete" disabled></button><button type="button" id="stop" disabled></button></div>
        <p class="footer" id="footer"></p>
      </section>
    </main>
    <div id="modalBackdrop" class="backdrop" aria-hidden="true">
      <section id="modal" class="dialog" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
        <h2 id="modalTitle"></h2><p id="modalLead"></p><div class="risk" id="modalRisk"></div>
        <p id="modalIndependence"></p><p id="modalLiability"></p><p id="modalRights" class="muted"></p>
        <label><input type="checkbox" id="modalAccept"><span id="modalAcceptLabel"></span></label>
        <label for="modalPhrase" id="modalPhraseLabel"></label><input type="text" id="modalPhrase" spellcheck="false" autocomplete="off" autocapitalize="off">
        <div class="error" id="modalError" role="alert"></div>
        <div class="row"><button type="button" id="modalCancel"></button><button type="button" class="danger" id="modalSubmit" disabled></button></div>
      </section>
    </div>
  </section>`;

  const $ = id => root.getElementById(id);
  function setStatus(key,values={}) {lastStatus={key,values};$('status').textContent=t(key,values);}
  function localize() {
    const map={open:'appShort',windowTitle:'appTitle',langTitle:'langTitle',langIntro:'langIntro',dateTitle:'dateTitle',datePrompt:'datePrompt',dateHint:'dateHint',chooseDate:'chooseDate',initialWarning:'backupWarning',changeDate:'changeDate',backupWarning:'backupWarning',archivedLabel:'archived',projectsLabel:'projects',scan:'scan',export:'export',thTitle:'thTitle',thCreated:'thCreated',thUpdated:'thUpdated',backupLabel:'backupAgree',test:'test',delete:'delete',stop:'stop',footer:'footer',modalTitle:'modalTitle',modalIndependence:'modalIndependence',modalLiability:'modalLiability',modalRights:'modalRights',modalAcceptLabel:'modalAccept',modalCancel:'modalCancel',modalSubmit:'modalSubmit'};
    for(const [id,key] of Object.entries(map)) { if(id==='open' && $('open').classList.contains('icon-only')) continue; $(id).textContent=t(key); }
    $('switchLanguage').title=t('switchLanguage');$('switchLanguage').setAttribute('aria-label',t('switchLanguage'));
    $('minimize').title=t('minimize');$('minimize').setAttribute('aria-label',t('minimize'));
    $('close').title=t('close');$('close').setAttribute('aria-label',t('close'));
    $('open').title=t('restore');$('open').setAttribute('aria-label',t('restore'));
    $('all').setAttribute('aria-label',t('selectAll'));
    $('panel').setAttribute('dir',lang==='ar'?'rtl':'ltr');
    $('zoneLabel').textContent=t('zoneLabel',{tz:TZ});
    if(cutoffISO){$('chosenText').textContent=t('chosenDate',{date:isoLabel(cutoffISO)});$('ruleText').textContent=t('ruleText',{date:isoLabel(cutoffISO)});}
    $('status').textContent=t(lastStatus.key,lastStatus.values);
    if(candidates.length) { renderRows(); } else updateInfo();
    $('modalLead').textContent=t('modalLead',{count:pendingTargets?.length||0, date:isoLabel(cutoffISO)});
  }

  let visibleStep = 'lang';
  function showStep(step){visibleStep=step;$('langStep').hidden=step!=='lang';$('dateStep').hidden=step!=='date';$('workStep').hidden=step!=='work';}
  function openPanel(){$('open').hidden=true;$('panel').classList.add('visible');clamp();if(!lang)showStep('lang');}
  function hidePanel(minimized) {
    if(modalResolve) return;
    if(running && !minimized) return;
    $('panel').classList.remove('visible');$('open').hidden=false;
    $('open').classList.toggle('icon-only',minimized);
    $('open').textContent=minimized?'🧹':t('appShort');
    $('open').setAttribute('aria-label',t('restore'));
    clamp();
  }

  // Both the title bar and the minimized icon can be dragged, with viewport bounds.
  let dragging=null;
  function positionHost(x,y){
    const rect=host.getBoundingClientRect();
    const maxX=Math.max(4,window.innerWidth-rect.width-4),maxY=Math.max(4,window.innerHeight-rect.height-4);
    host.style.left=Math.min(maxX,Math.max(4,x))+'px';
    host.style.top=Math.min(maxY,Math.max(4,y))+'px';
    host.style.right='auto';host.style.bottom='auto';
  }
  function clamp(){const r=host.getBoundingClientRect();positionHost(r.left,r.top);}
  function setupDrag(target,isIcon){
    target.addEventListener('pointerdown',e=>{
      if(e.button!==0 || e.target.closest('[data-nodrag]'))return;
      dragging={id:e.pointerId,x:e.clientX,y:e.clientY,left:host.getBoundingClientRect().left,top:host.getBoundingClientRect().top,moved:false,icon:isIcon};
      target.setPointerCapture(e.pointerId);
    });
    target.addEventListener('pointermove',e=>{
      if(!dragging || dragging.id!==e.pointerId)return;
      const dx=e.clientX-dragging.x,dy=e.clientY-dragging.y;
      if(Math.abs(dx)+Math.abs(dy)>5)dragging.moved=true;
      if(dragging.moved)positionHost(dragging.left+dx,dragging.top+dy);
    });
    target.addEventListener('pointerup',e=>{if(dragging?.id===e.pointerId){if(dragging.icon && dragging.moved)ignoreOpenerClickUntil=performance.now()+350;dragging=null;}});
    target.addEventListener('pointercancel',()=>{dragging=null;});
  }
  let ignoreOpenerClickUntil=0;
  setupDrag($('handle'),false);setupDrag($('open'),true);
  window.addEventListener('resize',clamp);

  const getTs = (o,keys) => {
    for(const key of keys){ const v=o[key];if(v===undefined||v===null||v==='')continue;let ms=null;
      if(typeof v==='number')ms=v>1e12?v:v*1000;
      else if(typeof v==='string' && /^\d+(\.\d+)?$/.test(v.trim())){const n=Number(v);ms=n>1e12?n:n*1000;}
      else if(typeof v==='string')ms=Date.parse(v);
      if(Number.isFinite(ms)&&ms>0)return ms;
    }return null;
  };
  const created=o=>getTs(o,['create_time','created_time','created_at','createdAt','createTime']);
  const updated=o=>getTs(o,['update_time','updated_time','updated_at','updatedAt','updateTime']);
  async function request(path,opts={}){
    if(!token){const r=await fetch('/api/auth/session',{credentials:'include',headers:{Accept:'application/json'}});
      if(!r.ok)throw new Error(t('sessionError',{status:r.status}));
      token=(await r.json())?.accessToken;
      if(!token)throw new Error(t('tokenError'));
    }
    const r=await fetch(path,{method:opts.method||'GET',credentials:'include',headers:{Accept:'application/json',Authorization:'Bearer '+token,...(opts.body?{'Content-Type':'application/json'}:{})},body:opts.body?JSON.stringify(opts.body):undefined});
    if(!r.ok)throw new Error(t('apiError',{status:r.status})+(r.status===429?' '+t('rateLimit'):''));
    return r;
  }
  async function listPages(archived){
    let offset=0, out=[],seen=new Set();
    for(let i=0;i<MAX_PAGES;i++){
      if(cancelRequested)throw new Error(t('stopped'));
      const q=new URLSearchParams({offset:String(offset),limit:String(PAGE_SIZE),order:'updated'});
      if(archived)q.set('is_archived','true');
      const data=await (await request(API+'/conversations?'+q)).json();
      const arr=Array.isArray(data)?data:(Array.isArray(data.items)?data.items:data.conversations);
      if(!Array.isArray(arr))throw new Error(t('formatError'));
      if(!arr.length)return out;
      let unique=0;
      for(const c of arr){if(c&&typeof c.id==='string'&&!seen.has(c.id)){seen.add(c.id);out.push(c);unique++;}}
      setStatus('scanningProgress',{type:t(archived?'archiveType':'regularType'),count:out.length});
      if(unique===0)throw new Error(t('paginationError'));
      offset+=arr.length;
      if(data&&(data.has_more===false||data.hasMore===false||(Number.isFinite(data.total)&&offset>=data.total)))return out;
      await sleep(900);
    }throw new Error(t('pageLimitError'));
  }
  function updateButtons(){
    const ready=scanComplete&&scanCutoffISO===cutoffISO&&!running;
    $('chooseDate').disabled=running;$('changeDate').disabled=running;
    $('scan').disabled=running||!validISO(cutoffISO);$('archived').disabled=running;$('projects').disabled=running;
    $('export').disabled=!ready||!candidates.length;$('all').disabled=!ready;
    const mayDelete=ready&&exported&&$('backup').checked&&selectedIds.size>0;
    $('test').disabled=!mayDelete;$('delete').disabled=!mayDelete;$('stop').disabled=!running;
  }
  function updateInfo(){
    $('tableinfo').textContent=t('selectedInfo',{selected:selectedIds.size,total:candidates.length})+' '+t(candidates.length>350?'limitedRows':'selectRows');
  }
  function renderRows(){
    const body=$('tbody');body.replaceChildren();
    for(const c of candidates.slice(0,350)){
      const tr=document.createElement('tr'),td0=document.createElement('td'),cb=document.createElement('input');
      cb.type='checkbox';cb.checked=selectedIds.has(c.id);cb.setAttribute('aria-label',t('selectChat',{title:c.title}));
      cb.addEventListener('change',()=>{cb.checked?selectedIds.add(c.id):selectedIds.delete(c.id);exported=false;updateButtons();updateInfo();setStatus('selectionChanged');});
      td0.appendChild(cb);const td1=document.createElement('td'),link=document.createElement('a');
      link.textContent=c.title||t('noTitle');link.href='https://chatgpt.com/c/'+encodeURIComponent(c.id);link.target='_blank';link.rel='noopener noreferrer';td1.appendChild(link);
      const td2=document.createElement('td');td2.textContent=formatDate(c.created);
      const td3=document.createElement('td');td3.textContent=formatDate(c.updated);
      tr.append(td0,td1,td2,td3);body.appendChild(tr);
    }
    $('tablewrap').hidden=!candidates.length;
    $('all').checked=candidates.length>0&&selectedIds.size===candidates.length;
    updateInfo();updateButtons();
  }
  function invalidateScan(key='settingsChanged'){
    if(running)return;
    candidates=[];selectedIds=new Set();scanComplete=false;scanCutoffISO=null;exported=false;
    $('tbody').replaceChildren();$('tablewrap').hidden=true;$('tableinfo').textContent='';
    setStatus(key,{date:isoLabel(cutoffISO)});updateButtons();
  }
  function chooseDate(){
    if(running)return;
    const value=$('keepFrom').value;
    if(!validISO(value)){$('dateError').textContent=t('invalidDate');return;}
    $('dateError').textContent='';
    const changed=value!==cutoffISO;cutoffISO=value;
    if(changed)invalidateScan('dateSet');
    showStep('work');localize();updateButtons();
  }
  async function scan(){
    if(running||!validISO(cutoffISO))return;
    running=true;cancelRequested=false;candidates=[];selectedIds=new Set();scanComplete=false;scanCutoffISO=null;exported=false;
    counter={scanned:0,protected:0,unknown:0,projects:0};$('tbody').replaceChildren();$('tablewrap').hidden=true;updateButtons();
    try{
      setStatus('connecting');const a=await listPages(false),b=$('archived').checked?await listPages(true):[],unique=new Map();
      for(const c of [...a,...b])unique.set(c.id,c);
      counter.scanned=unique.size;
      for(const c of unique.values()){
        const a=created(c),b=updated(c);
        if(a===null||b===null){counter.unknown++;continue;}
        if(dayKey(a)>=cutoffISO||dayKey(b)>=cutoffISO){counter.protected++;continue;}
        if((c.project_id||c.projectId)&&!$('projects').checked){counter.projects++;continue;}
        candidates.push({id:c.id,title:safeText(c.title||t('noTitle')),created:a,updated:b});
      }
      candidates.sort((a,b)=>a.created-b.created);
      selectedIds=new Set(candidates.map(c=>c.id));scanCutoffISO=cutoffISO;scanComplete=true;
      setStatus('scanResult',{scanned:counter.scanned,date:isoLabel(cutoffISO),count:candidates.length,protected:counter.protected,unknown:counter.unknown,projects:counter.projects});
    }catch(e){scanComplete=false;setStatus('scanFailed',{message:safeText(e.message)});}
    finally{running=false;renderRows();}
  }
  function csvDownload(){
    if(!scanComplete||!candidates.length)return;
    const esc=v=>'"'+safeText(v).replace(/"/g,'""')+'"';
    const rows=[[t('csvSelected'),t('thTitle'),t('csvCreated'),t('csvUpdated'),'URL',t('csvCutoff')].map(esc).join(';')];
    const safeCsvTitle = v => /^[\s]*[=+@\-\t\r]/.test(v) ? '\''+v : v;
    for(const c of candidates)rows.push([selectedIds.has(c.id)?t('yes'):t('no'),safeCsvTitle(c.title),formatDate(c.created),formatDate(c.updated),'https://chatgpt.com/c/'+c.id,isoLabel(scanCutoffISO)].map(esc).join(';'));
    const blob=new Blob(['\ufeff'+rows.join('\r\n')],{type:'text/csv;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');
    a.href=url;a.download='chatgpt_date_cleaner_before_'+scanCutoffISO+'.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),5000);
    exported=true;setStatus('csvReady',{date:isoLabel(scanCutoffISO)});updateButtons();
  }

  let pendingTargets=null;
  function consentDialog(targets){
    return new Promise(resolve=>{
      if(modalResolve){resolve(false);return;}
      modalResolve=resolve;pendingTargets=targets;
      const count=targets.length;
      $('modalLead').textContent=t('modalLead',{count,date:isoLabel(scanCutoffISO)});
      $('modalRisk').textContent=t('modalRisk');
      $('modalPhraseLabel').textContent=t('modalPhraseLabel',{phrase:t('keyword',{count})});
      $('modalPhrase').value='';$('modalAccept').checked=false;$('modalError').textContent='';$('modalSubmit').disabled=true;
      $('modalBackdrop').classList.add('visible');$('modalBackdrop').setAttribute('aria-hidden','false');
      $('modalAccept').focus();
    });
  }
  function completeDialog(approved){
    if(!modalResolve)return;
    const resolve=modalResolve;modalResolve=null;pendingTargets=null;
    $('modalBackdrop').classList.remove('visible');$('modalBackdrop').setAttribute('aria-hidden','true');
    $('modalAccept').checked=false;$('modalPhrase').value='';$('modalSubmit').disabled=true;
    resolve(approved);
  }
  function verifyConsent(){
    const valid=$('modalAccept').checked&&$('modalPhrase').value.trim()===t('keyword',{count:pendingTargets?.length||0});
    $('modalSubmit').disabled=!valid;
    $('modalError').textContent='';
  }
  async function deleteCandidates(oneOnly){
    if(running||!scanComplete||scanCutoffISO!==cutoffISO||!exported||!$('backup').checked)return;
    const todo=candidates.filter(c=>selectedIds.has(c.id));if(!todo.length)return;
    const targets=oneOnly?todo.slice(0,1):todo;
    if(!await consentDialog(targets)){setStatus('deleteCancelled');return;}
    // Guard against changes during the consent process.
    if(running||!scanComplete||scanCutoffISO!==cutoffISO||!exported||!$('backup').checked){setStatus('settingsChanged');return;}
    running=true;cancelRequested=false;updateButtons();
    let done=0;
    try{
      for(let i=0;i<targets.length;i++){
        if(cancelRequested)break;
        const c=targets[i];
        if(!validISO(scanCutoffISO)||dayKey(c.created)>=scanCutoffISO||dayKey(c.updated)>=scanCutoffISO)throw new Error(t('dateSafetyError'));
        setStatus('deletingProgress',{current:i+1,total:targets.length,title:c.title,done});
        // Recheck server metadata immediately before this irreversible operation.
        const current=await (await request(API+'/conversation/'+encodeURIComponent(c.id))).json();
        const actualCreated=created(current),actualUpdated=updated(current);
        if(actualCreated===null||actualUpdated===null||dayKey(actualCreated)>=scanCutoffISO||dayKey(actualUpdated)>=scanCutoffISO){
          throw new Error(t('freshSafetyError'));
        }
        if((current.project_id||current.projectId)&&!$('projects').checked)throw new Error(t('projectSafetyError'));
        if(cancelRequested)break;
        await request(API+'/conversation/'+encodeURIComponent(c.id),{method:'PATCH',body:{is_visible:false}});
        done++;selectedIds.delete(c.id);candidates=candidates.filter(x=>x.id!==c.id);
        if(i<targets.length-1&&!cancelRequested)await sleep(DELAY_MS);
      }
      setStatus('deleteComplete',{done,left:candidates.length});
    }catch(e){setStatus('deleteFailed',{done,message:safeText(e.message)});}
    finally{running=false;scanComplete=false;scanCutoffISO=null;exported=false;renderRows();}
  }

  $('open').addEventListener('click',()=>{if(performance.now()<ignoreOpenerClickUntil)return;openPanel();});
  $('minimize').addEventListener('click',()=>hidePanel(true));
  $('close').addEventListener('click',()=>hidePanel(false));
  $('switchLanguage').addEventListener('click',()=>{if(modalResolve||running)return;languageReturn=visibleStep==='work'?'work':'date';showStep('lang');});
  $('chooseDate').addEventListener('click',chooseDate);
  $('keepFrom').addEventListener('keydown',e=>{if(e.key==='Enter')chooseDate();});
  $('changeDate').addEventListener('click',()=>{if(running)return;showStep('date');$('keepFrom').focus();});
  $('archived').addEventListener('change',()=>invalidateScan());
  $('projects').addEventListener('change',()=>invalidateScan());
  $('scan').addEventListener('click',scan);$('export').addEventListener('click',csvDownload);
  $('backup').addEventListener('change',updateButtons);
  $('test').addEventListener('click',()=>deleteCandidates(true));$('delete').addEventListener('click',()=>deleteCandidates(false));
  $('stop').addEventListener('click',()=>{cancelRequested=true;setStatus('stopRequest');});
  $('all').addEventListener('change',e=>{selectedIds=e.target.checked?new Set(candidates.map(c=>c.id)):new Set();exported=false;renderRows();setStatus('selectionChanged');});
  $('modalAccept').addEventListener('change',verifyConsent);$('modalPhrase').addEventListener('input',verifyConsent);
  $('modalCancel').addEventListener('click',()=>completeDialog(false));$('modalSubmit').addEventListener('click',()=>{if(!$('modalSubmit').disabled)completeDialog(true);});
  $('modal').addEventListener('keydown',e=>{
    if(e.key==='Escape'){e.preventDefault();completeDialog(false);}
    if(e.key==='Tab'){const list=Array.from($('modal').querySelectorAll('input,button')).filter(el=>!el.disabled),first=list[0],last=list[list.length-1];if(e.shiftKey&&root.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&root.activeElement===last){e.preventDefault();first.focus();}}
  });

  const names={it:'Italiano',en:'English',es:'Español',ru:'Русский',ja:'日本語',zh:'中文（简体）',ar:'العربية',fr:'Français'};
  for(const code of allowedLangs){
    const btn=document.createElement('button');btn.textContent=names[code];btn.type='button';btn.setAttribute('lang',code);
    btn.addEventListener('click',async()=>{
      lang=code;
      try {await chrome.storage.local.set({[storageKey]:code});}
      catch(err){console.warn('ChatGPT Date Cleaner: language could not be saved',err);}
      showStep(languageReturn==='work'&&cutoffISO?'work':'date');localize();updateButtons();
    });
    $('languageButtons').appendChild(btn);
  }
  // Read language settings from extension-owned storage, never from the ChatGPT website.
  (async()=>{
    try{
      const stored=await chrome.storage.local.get(storageKey);
      if(allowedLangs.includes(stored[storageKey])){lang=stored[storageKey];showStep('date');}
      else{lang=null;showStep('lang');}
    }catch(err){lang=null;showStep('lang');console.warn('ChatGPT Date Cleaner: language settings unavailable',err);}
    localize();updateButtons();$('open').hidden=false;
  })();
  $('open').hidden=true;
})();
