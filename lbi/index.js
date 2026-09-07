const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const DEFAULT_MODES=[
 {id:'overall',n:'Overall',i:'🏆'},{id:'vanilla',n:'Vanilla',i:'🟪'},{id:'uhc',n:'UHC',i:'❤️'},
 {id:'pot',n:'Pot',i:'🧪'},{id:'nethop',n:'NetHop',i:'🟣'},{id:'smp',n:'SMP',i:'🟢'},
 {id:'sword',n:'Sword',i:'🗡️'},{id:'axe',n:'Axe',i:'🪓'},{id:'mace',n:'Mace',i:'🔨'}
];
const modes=DEFAULT_MODES.filter(x=>x.id!=='overall').map(x=>x.id);
const defaultData=()=>({modes:DEFAULT_MODES,icons:{},site:{siteName:'Vortex Tier',discordUrl:'https://discord.com',serverIp:'mc.vortextier.net'},players:[]});
const localFile=path.join(__dirname,'..','data.json');
function env(name,fallback=''){return process.env[name]||fallback}
function secret(){return env('SESSION_SECRET','change-this-secret-in-vercel')}
function sign(v){return crypto.createHmac('sha256',secret()).update(v).digest('hex')}
function setCookie(res,name,value,maxAge){res.setHeader('Set-Cookie',`${name}=${encodeURIComponent(value)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`)}
function clearCookie(res,name){setCookie(res,name,'',0)}
function cookies(req){const out={};(req.headers.cookie||'').split(';').forEach(x=>{const i=x.indexOf('=');if(i>0)out[x.slice(0,i).trim()]=decodeURIComponent(x.slice(i+1))});return out}
function isAuthed(req){const v=cookies(req).vt_auth;if(!v)return false;const [payload,sig]=v.split('.');return !!payload&&!!sig&&crypto.timingSafeEqual(Buffer.from(sig),Buffer.from(sign(payload))) && JSON.parse(Buffer.from(payload,'base64url').toString()).exp>Date.now()}
async function body(req){if(req.body&&typeof req.body==='object')return req.body;let s='';for await(const c of req)s+=c;return s?JSON.parse(s):{}}
async function github(method,apiPath,bodyObj){
 const token=env('GITHUB_TOKEN'); if(!token)throw new Error('GITHUB_TOKEN is not configured');
 const repo=env('GITHUB_REPO'); const branch=env('GITHUB_BRANCH','main'); if(!repo)throw new Error('GITHUB_REPO is not configured');
 const r=await fetch(`https://api.github.com/repos/${repo}/contents/data.json`,{method,headers:{Authorization:`Bearer ${token}`,Accept:'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28','Content-Type':'application/json'},body:bodyObj?JSON.stringify(bodyObj):undefined});
 if(!r.ok)throw new Error(`GitHub API ${r.status}: ${await r.text()}`); return r.json();
}
async function loadData(){
 if(!env('GITHUB_TOKEN')||!env('GITHUB_REPO')){try{return JSON.parse(fs.readFileSync(localFile,'utf8'))}catch{return defaultData()}}
 try{const x=await github('GET','contents/data.json');return JSON.parse(Buffer.from(x.content,'base64').toString('utf8'))}catch(e){if(String(e.message).includes('404')){await saveData(defaultData(),'Create Vortex Tier data');return defaultData()}throw e}
}
async function saveData(data,message){
 if(!env('GITHUB_TOKEN')||!env('GITHUB_REPO')){fs.writeFileSync(localFile,JSON.stringify(data,null,2));return}
 let sha;try{sha=(await github('GET','contents/data.json')).sha}catch(e){if(!String(e.message).includes('404'))throw e}
 const payload={message,content:Buffer.from(JSON.stringify(data,null,2)+'\n').toString('base64'),branch:env('GITHUB_BRANCH','main')};if(sha)payload.sha=sha;await github('PUT','contents/data.json',payload)
}
function enrich(data){const players=(data.players||[]).map(p=>{const results=p.results||{};const total=modes.reduce((s,m)=>{const v=results[m]?.points;return s+(v!==''&&v!=null?Number(v)||0:0)},0);return {...p,totalPoints:total}}).sort((a,b)=>b.totalPoints-a.totalPoints||String(a.name).localeCompare(String(b.name)));players.forEach((p,i)=>p.position=i+1);return {...data,players}}
function send(res,status,obj){res.statusCode=status;res.setHeader('Content-Type','application/json; charset=utf-8');res.end(JSON.stringify(obj))}
async function handler(req,res){res.setHeader('Access-Control-Allow-Origin','*');res.setHeader('Cache-Control','no-store');const url=new URL(req.url,`http://${req.headers.host||'localhost'}`);const p=url.pathname.replace(/^\/api/,'')||'/';try{
 if(req.method==='OPTIONS'){res.statusCode=204;return res.end()}
 if(p==='/public'&&req.method==='GET')return send(res,200,enrich(await loadData()));
 if(p==='/admin/login'&&req.method==='POST'){const b=await body(req);if(String(b.email||'').toLowerCase()!==env('ADMIN_EMAIL','dhrhbodhrubo282@gmail.com').toLowerCase()||String(b.password||'')!==env('ADMIN_PASSWORD','@dhrubo2a'))return send(res,401,{error:'Invalid email or password'});const payload=Buffer.from(JSON.stringify({email:env('ADMIN_EMAIL','dhrhbodhrubo282@gmail.com'),exp:Date.now()+86400000})).toString('base64url');setCookie(res,'vt_auth',`${payload}.${sign(payload)}`,86400);return send(res,200,{ok:true,email:env('ADMIN_EMAIL','dhrhbodhrubo282@gmail.com')})}
 if(p==='/admin/logout'&&req.method==='POST'){clearCookie(res,'vt_auth');return send(res,200,{ok:true})}
 if(p==='/admin/me'&&req.method==='GET'){if(!isAuthed(req))return send(res,401,{error:'Unauthorized'});return send(res,200,{email:env('ADMIN_EMAIL','dhrhbodhrubo282@gmail.com')})}
 if(p.startsWith('/admin/')){if(!isAuthed(req))return send(res,401,{error:'Unauthorized'});const data=await loadData();
  if(p==='/admin/players'&&req.method==='GET')return send(res,200,enrich(data));
  if(p==='/admin/players'&&req.method==='POST'){const b=await body(req);const existing=data.players.find(x=>x.name.toLowerCase()===String(b.name||'').trim().toLowerCase());if(existing)return send(res,409,{error:'Player already exists. Edit the existing player instead.'});const id=Date.now();data.players.push({id,name:String(b.name||'').trim(),region:String(b.region||'NA').trim(),skin_url:String(b.skinUrl||'').trim(),results:b.results||{}});await saveData(data,'Add player');return send(res,200,enrich(data))}
  const match=p.match(/^\/admin\/players\/(\d+)$/);if(match){const id=Number(match[1]);const idx=data.players.findIndex(x=>x.id===id);if(idx<0)return send(res,404,{error:'Player not found'});if(req.method==='PUT'){const b=await body(req);const dup=data.players.find((x,i)=>i!==idx&&x.name.toLowerCase()===String(b.name||'').trim().toLowerCase());if(dup)return send(res,409,{error:'Another player already has this name'});data.players[idx]={...data.players[idx],name:String(b.name||'').trim(),region:String(b.region||'NA').trim(),skin_url:String(b.skinUrl||'').trim(),results:b.results||{}};await saveData(data,'Update player');return send(res,200,enrich(data))}if(req.method==='DELETE'){data.players.splice(idx,1);await saveData(data,'Delete player');return send(res,200,enrich(data))}}
  if(p==='/admin/settings'&&req.method==='GET')return send(res,200,{...data.icons,site:data.site});
  if(p==='/admin/settings'&&req.method==='PUT'){const b=await body(req);data.icons={};Object.keys(b).filter(k=>k.startsWith('icon_')).forEach(k=>data.icons[k]=String(b[k]||'').trim());if(b.site) data.site={...data.site,...b.site};await saveData(data,'Update settings');return send(res,200,{ok:true})}
  if(p==='/admin/change-password'&&req.method==='POST')return send(res,400,{error:'Password is controlled by Vercel environment variable ADMIN_PASSWORD. Change it there.'});
 }
 return send(res,404,{error:'Not found'});
 }catch(e){console.error(e);return send(res,500,{error:e.message||'Server error'})}}
module.exports=handler;module.exports.apiHandler=handler;
