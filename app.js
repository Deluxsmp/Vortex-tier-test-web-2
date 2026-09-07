const DEFAULT_MODES=[
 {id:'overall',n:'Overall',i:'🏆'},{id:'vanilla',n:'Vanilla',i:'🟪'},{id:'uhc',n:'UHC',i:'❤️'},
 {id:'pot',n:'Pot',i:'🧪'},{id:'nethop',n:'NetHop',i:'🟣'},{id:'smp',n:'SMP',i:'🟢'},
 {id:'sword',n:'Sword',i:'🗡️'},{id:'axe',n:'Axe',i:'🪓'},{id:'mace',n:'Mace',i:'🔨'}
];
let DATA={modes:DEFAULT_MODES,icons:{},site:{siteName:'Vortex Tier',discordUrl:'https://discord.com',serverIp:'mc.vortextier.net'},players:[]};
let active='overall';
const modesEl=document.getElementById('modes'),boardEl=document.getElementById('leaderboard'),search=document.getElementById('search');
const modal=document.getElementById('modal'),modalBody=document.getElementById('playerModalBody');
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
function iconHTML(m,cls='mode-icon-img'){
 const url=DATA.icons?.[m.id]||'';
 return url?`<img class="${cls}" src="${esc(url)}" alt="${esc(m.n)}" loading="eager" onerror="this.style.display='none'">`:'';
}
function skinUrl(p){return p.skinUrl||`https://mc-heads.net/body/${encodeURIComponent(p.name)}/100.png`}
function skinFallback(img){if(img.dataset.failed==='1'){img.src='https://mc-heads.net/body/Steve/100.png';return}img.dataset.failed='1';img.src='https://mc-heads.net/body/Steve/100.png'}
function modeById(id){return DATA.modes.find(m=>m.id===id)||{id:id,n:id,i:'•'}}
function result(p,id){return p.results?.[id]||null}
function isTestedResult(r){return !!r && (r.tier || r.points!==null && r.points!==undefined && r.points!=='')}
function tierNum(t){const m=String(t||'').match(/[1-5]$/);return m?Number(m[0]):null}
function titleFor(pos){return pos===1?'Combat Grandmaster':pos<=3?'Combat Master':'Combat Ace'}
function emojiFor(pos){return pos===1?'👑':pos<=3?'🏅':'⚔️'}
function tierClass(t){return String(t||'').toLowerCase().replace(/[^a-z0-9]/g,'')}
function renderModes(){modesEl.innerHTML=DATA.modes.map(m=>`<button class="mode ${m.id===active?'active':''}" data-id="${m.id}"><span class="ico">${iconHTML(m)}<span class="icon-fallback">${m.i}</span></span>${esc(m.n)}</button>`).join('');document.querySelectorAll('.mode').forEach(b=>b.onclick=()=>{active=b.dataset.id;document.querySelectorAll('.mode').forEach(x=>x.classList.toggle('active',x===b));search.value='';render()})}
function render(){const q=search.value.toLowerCase().trim();active==='overall'?renderOverall(q):renderMode(q)}
function renderOverall(q){
 const arr=DATA.players.filter(p=>p.name.toLowerCase().includes(q));
 if(!arr.length){boardEl.innerHTML='<div class="emptyrow">No players found.</div>';return}
 boardEl.innerHTML='<div class="overall-head"><span>#</span><span>Player</span><span>Region</span><span>Rankings</span></div>';
 const modeIds=['smp','pot','nethop','vanilla','sword','axe','mace','uhc'];
 arr.forEach(p=>{
  const pos=p.position, rankTitle=titleFor(pos), rankEmoji=emojiFor(pos), rankClass=pos===1?'rank-gold':pos===2?'rank-silver':pos===3?'rank-bronze':'rank-normal';
  const cats=modeIds.map(id=>{const m=modeById(id),r=result(p,id),tested=isTestedResult(r),t=r?.tier||'';if(!tested)return `<div class="mini mini-empty"><div class="mini-icon blank-icon"></div><span class="mini-label empty-tier"></span></div>`;return `<div class="mini"><div class="mini-icon">${iconHTML(m,'mini-icon-img')||`<span class="icon-fallback">${m.i}</span>`}</div><span class="mini-label ${tierClass(t)}">${esc(t)}</span></div>`}).join('');
  boardEl.insertAdjacentHTML('beforeend',`<div class="player-row ${rankClass}" data-id="${p.id}"><div class="pos-wrap"><div class="pos">${pos}.</div></div><div class="p-main"><span class="skin-frame"><img class="skin" src="${esc(skinUrl(p))}" alt="${esc(p.name)}" onerror="skinFallback(this)"></span><div><div class="p-name">${esc(p.name)}</div><div class="p-title"><span class="rank-title-emoji">${rankEmoji}</span> ${rankTitle} <span class="points">(${p.totalPoints} points)</span></div></div></div><div class="region ${esc(p.region).toLowerCase()}">${esc(p.region)}</div><div class="mini-tiers">${cats}</div></div>`);
 });
}
function renderMode(q){
 const arr=DATA.players.filter(p=>p.name.toLowerCase().includes(q));
 const filtered={1:[],2:[],3:[],4:[],5:[]};
 arr.forEach(p=>{const r=result(p,active);const n=tierNum(r?.tier);if(n)filtered[n].push(p)});
 boardEl.innerHTML=`<div class="mode-board">${[1,2,3,4,5].map(n=>`<div class="tier-column tier-${n}"><div class="tier-head"><span>🏆</span>Tier ${n}</div><div class="tier-list">${filtered[n].length?filtered[n].map(p=>`<div class="tier-player" data-id="${p.id}"><span class="tier-skin-frame"><img src="${esc(skinUrl(p))}" alt="${esc(p.name)}" onerror="skinFallback(this)"></span><span class="name">${esc(p.name)}</span><span class="up">⌃</span></div>`).join(''):'<div class="tier-player"><span class="name">No players</span></div>'}</div></div>`).join('')}</div>`;
}
function modalFor(p){
 const regionName={NA:'North America',EU:'Europe',ME:'Middle East',AS:'Asia'}[p.region]||p.region;
 const title=titleFor(p.position);
 const testedModes=['smp','pot','nethop','vanilla','sword','axe','mace','uhc'];
 const tiers=testedModes.map(id=>{const m=modeById(id),r=result(p,id);if(!isTestedResult(r))return `<div class="modal-tier modal-tier-empty"><div class="modal-tier-icon"></div><b></b></div>`;return `<div class="modal-tier"><div class="modal-tier-icon">${iconHTML(m,'mini-icon-img')||`<span class="icon-fallback">${m.i}</span>`}</div><b class="${tierClass(r.tier||'')}">${esc(r.tier||'')}</b>${r.points!==null&&r.points!==undefined&&r.points!==''?`<small>${r.points} pts</small>`:''}</div>`}).join('');
 modalBody.innerHTML=`<div class="modal-player-top"><div class="modal-avatar"><img src="${esc(skinUrl(p))}" alt="${esc(p.name)}" onerror="skinFallback(this)"></div><h2>${esc(p.name)}</h2><div class="modal-rank">${emojiFor(p.position)} ${title}</div><div class="modal-region-text">${esc(regionName)}</div><a class="namemc-link" href="https://namemc.com/profile/${encodeURIComponent(p.name)}" target="_blank" rel="noopener">◧ NameMC ↗</a></div><div class="modal-section-title">Position</div><div class="modal-position-box"><span class="modal-position-number">${p.position}.</span><span>🏆 <strong>OVERALL</strong> <small>(${p.totalPoints} points)</small></span></div><div class="modal-section-title">Tiers</div><div class="modal-tiers-grid">${tiers}</div>`;
 modal.classList.remove('hidden');
}
boardEl.addEventListener('click',e=>{const row=e.target.closest('[data-id]');if(!row)return;const p=DATA.players.find(x=>x.id===Number(row.dataset.id));if(p)modalFor(p)});
search.oninput=render;
document.getElementById('info').onclick=()=>modal.classList.remove('hidden');document.getElementById('close').onclick=()=>modal.classList.add('hidden');modal.onclick=e=>{if(e.target===modal)modal.classList.add('hidden')};
(async()=>{try{const r=await fetch('/api/public');if(!r.ok)throw new Error('API unavailable');DATA=await r.json();if(DATA.site?.siteName)document.title=DATA.site.siteName+' — Rankings'; const server=document.querySelector('.server'); if(server&&DATA.site?.serverIp) server.innerHTML='<i></i> '+esc(DATA.site.serverIp); renderModes();render();}catch(e){boardEl.innerHTML='<div class="emptyrow">Could not load rankings. Start the Vortex Tier server first.</div>';renderModes();}})();
