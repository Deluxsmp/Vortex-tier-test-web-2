require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const sqlite3 = require('sqlite3').verbose();
const helmet = require('helmet');
const path = require('path');

const app = express();
const PORT = Number(process.env.PORT || 3000);
const db = new sqlite3.Database(process.env.DB_PATH || path.join(__dirname, 'vortex.db'));

const MODES = [
  {id:'overall', name:'Overall', fallback:'🏆'},
  {id:'vanilla', name:'Vanilla', fallback:'🟪'},
  {id:'uhc', name:'UHC', fallback:'❤️'},
  {id:'pot', name:'Pot', fallback:'🧪'},
  {id:'nethop', name:'NetHop', fallback:'🟣'},
  {id:'smp', name:'SMP', fallback:'🟢'},
  {id:'sword', name:'Sword', fallback:'🗡️'},
  {id:'axe', name:'Axe', fallback:'🪓'},
  {id:'mace', name:'Mace', fallback:'🔨'}
];
const TESTED_MODES = MODES.filter(m=>m.id!=='overall').map(m=>m.id);
const VALID_TIERS = /^(HT|LT)[1-5]$/;

function run(sql, params=[]) { return new Promise((resolve,reject)=>db.run(sql,params,function(err){if(err)reject(err);else resolve(this);})); }
function get(sql, params=[]) { return new Promise((resolve,reject)=>db.get(sql,params,(err,row)=>err?reject(err):resolve(row))); }
function all(sql, params=[]) { return new Promise((resolve,reject)=>db.all(sql,params,(err,rows)=>err?reject(err):resolve(rows))); }

async function init(){
  await run(`CREATE TABLE IF NOT EXISTS players (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE COLLATE NOCASE,
    region TEXT NOT NULL DEFAULT 'NA',
    skin_url TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`);
  await run(`CREATE TABLE IF NOT EXISTS results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    player_id INTEGER NOT NULL,
    mode TEXT NOT NULL,
    points INTEGER,
    tier TEXT,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(player_id, mode),
    FOREIGN KEY(player_id) REFERENCES players(id) ON DELETE CASCADE
  )`);
  await run(`CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT NOT NULL)`);
  const defaults = {
    siteName:'Vortex Tier', discordUrl:'https://discord.com', serverIp:'mc.vortextier.net',
    icon_overall:'', icon_vanilla:'', icon_uhc:'', icon_pot:'', icon_nethop:'', icon_smp:'', icon_sword:'', icon_axe:'', icon_mace:''
  };
  for(const [k,v] of Object.entries(defaults)) await run(`INSERT OR IGNORE INTO settings(key,value) VALUES(?,?)`,[k,v]);
  const count = await get(`SELECT COUNT(*) AS c FROM players`);
  if(count.c===0){
    const p=await run(`INSERT INTO players(name,region,skin_url) VALUES(?,?,?)`,['ExamplePlayer','NA','']);
    // One understandable demo player, completely untested by default.
  }
  const adminEmail=process.env.ADMIN_EMAIL || 'dhrhbodhrubo282@gmail.com';
  const adminPass=process.env.ADMIN_PASSWORD || '@dhrubo2a';
  const hash=await bcrypt.hash(adminPass,12);
  const existing=await get(`SELECT value FROM settings WHERE key='admin_email'`);
  if(!existing) await run(`INSERT INTO settings(key,value) VALUES('admin_email',?)`,[adminEmail]);
  const existingHash=await get(`SELECT value FROM settings WHERE key='admin_password_hash'`);
  if(!existingHash) await run(`INSERT INTO settings(key,value) VALUES('admin_password_hash',?)`,[hash]);
}

app.use(helmet({contentSecurityPolicy:false}));
app.use(express.json({limit:'1mb'}));
app.use(express.urlencoded({extended:true}));
app.use(session({
  secret: process.env.SESSION_SECRET || 'change-this-vortex-session-secret',
  resave:false, saveUninitialized:false,
  cookie:{httpOnly:true,sameSite:'lax',secure:process.env.NODE_ENV==='production',maxAge:8*60*60*1000}
}));

function requireAdmin(req,res,next){ if(req.session && req.session.admin) return next(); return res.status(401).json({error:'Unauthorized'}); }
function sanitizeName(v){return String(v||'').trim().slice(0,16)}
function normalizeTier(v){const s=String(v||'').trim().toUpperCase(); return VALID_TIERS.test(s)?s:null;}
function numOrNull(v){ if(v===null||v===undefined||v==='') return null; const n=Number(v); return Number.isFinite(n)?Math.max(0,Math.round(n)):null; }
function publicSkin(name, custom){ return custom || `https://mc-heads.net/body/${encodeURIComponent(name)}/100.png`; }

app.get('/api/public', async (req,res)=>{
  try{
    const players=await all(`SELECT * FROM players ORDER BY id ASC`);
    const results=await all(`SELECT player_id,mode,points,tier FROM results`);
    const by={}; for(const r of results){(by[r.player_id] ||= {})[r.mode]=r;}
    const list=players.map(p=>({id:p.id,name:p.name,region:p.region,skinUrl:publicSkin(p.name,p.skin_url),customSkinUrl:p.skin_url||'',results:by[p.id]||{}}));
    const active=list.map(p=>{const tested=TESTED_MODES.filter(m=>p.results[m] && (p.results[m].tier || p.results[m].points!==null)); const total=tested.reduce((s,m)=>s+(p.results[m].points||0),0); return {...p,totalPoints:total,testedCount:tested.length};}).filter(p=>p.testedCount>0);
    active.sort((a,b)=>b.totalPoints-a.totalPoints || a.name.localeCompare(b.name));
    active.forEach((p,i)=>p.position=i+1);
    const icons={}; for(const m of MODES) icons[m.id]=(await get(`SELECT value FROM settings WHERE key=?`,[`icon_${m.id}`]))?.value||'';
    const site={}; for(const k of ['siteName','discordUrl','serverIp']) site[k]=(await get(`SELECT value FROM settings WHERE key=?`,[k]))?.value||'';
    res.json({modes,icons,site,players:active});
  }catch(e){res.status(500).json({error:e.message})}
});

app.post('/api/admin/login', async(req,res)=>{
  try{
    const email=String(req.body.email||'').trim().toLowerCase();
    const password=String(req.body.password||'');
    const stored=(await get(`SELECT value FROM settings WHERE key='admin_email'`))?.value?.toLowerCase();
    const hash=(await get(`SELECT value FROM settings WHERE key='admin_password_hash'`))?.value;
    if(email===stored && hash && await bcrypt.compare(password,hash)){
      req.session.admin={email:stored};
      return res.json({ok:true,email:stored});
    }
    res.status(401).json({error:'Invalid email or password'});
  }catch(e){res.status(500).json({error:'Login failed'})}
});
app.post('/api/admin/logout',(req,res)=>req.session.destroy(()=>res.json({ok:true})));
app.get('/api/admin/me',requireAdmin,(req,res)=>res.json({ok:true,email:req.session.admin.email}));

app.get('/api/admin/players',requireAdmin,async(req,res)=>{
  try{
    const players=await all(`SELECT * FROM players ORDER BY name COLLATE NOCASE`);
    const results=await all(`SELECT player_id,mode,points,tier FROM results`);
    const by={}; for(const r of results){(by[r.player_id] ||= {})[r.mode]={points:r.points,tier:r.tier};}
    res.json({players:players.map(p=>({...p,results:by[p.id]||{}}))});
  }catch(e){res.status(500).json({error:e.message})}
});

app.post('/api/admin/players',requireAdmin,async(req,res)=>{
  try{
    const name=sanitizeName(req.body.name); if(!name) return res.status(400).json({error:'Player name is required'});
    if(!/^[A-Za-z0-9_]{3,16}$/.test(name)) return res.status(400).json({error:'Use a valid Minecraft username (3-16 letters, numbers, underscore).'});
    const region=['NA','EU','ME','AS'].includes(req.body.region)?req.body.region:'NA';
    const skin=String(req.body.skinUrl||'').trim().slice(0,500);
    const r=await run(`INSERT INTO players(name,region,skin_url,updated_at) VALUES(?,?,?,CURRENT_TIMESTAMP)`,[name,region,skin]);
    res.json({ok:true,id:r.lastID});
  }catch(e){res.status(400).json({error:e.message.includes('UNIQUE')?'Player already exists':e.message})}
});

app.put('/api/admin/players/:id',requireAdmin,async(req,res)=>{
  try{
    const id=Number(req.params.id); const p=await get(`SELECT * FROM players WHERE id=?`,[id]); if(!p) return res.status(404).json({error:'Player not found'});
    const name=sanitizeName(req.body.name)||p.name; const region=['NA','EU','ME','AS'].includes(req.body.region)?req.body.region:p.region; const skin=String(req.body.skinUrl??p.skin_url).trim().slice(0,500);
    await run(`UPDATE players SET name=?,region=?,skin_url=?,updated_at=CURRENT_TIMESTAMP WHERE id=?`,[name,region,skin,id]);
    if(req.body.results && typeof req.body.results==='object'){
      for(const mode of TESTED_MODES){
        if(!(mode in req.body.results)) continue;
        const x=req.body.results[mode]||{}; const points=numOrNull(x.points); const tier=normalizeTier(x.tier);
        await run(`INSERT INTO results(player_id,mode,points,tier,updated_at) VALUES(?,?,?,?,CURRENT_TIMESTAMP)
          ON CONFLICT(player_id,mode) DO UPDATE SET points=excluded.points,tier=excluded.tier,updated_at=CURRENT_TIMESTAMP`,[id,mode,points,tier]);
      }
    }
    res.json({ok:true});
  }catch(e){res.status(400).json({error:e.message.includes('UNIQUE')?'Player already exists':e.message})}
});

app.delete('/api/admin/players/:id',requireAdmin,async(req,res)=>{
  try{const id=Number(req.params.id); await run(`DELETE FROM results WHERE player_id=?`,[id]); await run(`DELETE FROM players WHERE id=?`,[id]); res.json({ok:true});}catch(e){res.status(500).json({error:e.message})}
});

app.get('/api/admin/settings',requireAdmin,async(req,res)=>{
  const rows=await all(`SELECT key,value FROM settings WHERE key NOT LIKE 'admin_%'`); res.json(Object.fromEntries(rows.map(r=>[r.key,r.value])));
});
app.put('/api/admin/settings',requireAdmin,async(req,res)=>{
  try{
    for(const [k,v] of Object.entries(req.body||{})){
      if(!/^(siteName|discordUrl|serverIp|icon_(overall|vanilla|uhc|pot|nethop|smp|sword|axe|mace))$/.test(k)) continue;
      await run(`INSERT INTO settings(key,value) VALUES(?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value`,[k,String(v||'').slice(0,1000)]);
    }
    res.json({ok:true});
  }catch(e){res.status(500).json({error:e.message})}
});

app.post('/api/admin/change-password',requireAdmin,async(req,res)=>{
  try{
    const current=String(req.body.currentPassword||''); const next=String(req.body.newPassword||'');
    const hash=(await get(`SELECT value FROM settings WHERE key='admin_password_hash'`)).value;
    if(!await bcrypt.compare(current,hash)) return res.status(401).json({error:'Current password is incorrect'});
    if(next.length<8) return res.status(400).json({error:'New password must be at least 8 characters'});
    await run(`UPDATE settings SET value=? WHERE key='admin_password_hash'`,[await bcrypt.hash(next,12)]);
    res.json({ok:true});
  }catch(e){res.status(500).json({error:e.message})}
});

app.get('/admin',(req,res)=>res.sendFile(path.join(__dirname,'admin.html')));
app.use(express.static(__dirname,{extensions:['html']}));
app.use((req,res)=>res.status(404).send('Not found'));

init().then(()=>app.listen(PORT,()=>console.log(`Vortex Tier running on http://localhost:${PORT}`))).catch(err=>{console.error(err);process.exit(1)});
