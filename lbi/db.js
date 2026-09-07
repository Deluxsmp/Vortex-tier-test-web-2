const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const { Pool } = require('pg');

let sqlite;
let pgPool;
const DATABASE_URL = process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.POSTGRES_URL_NON_POOLING || process.env.DATABASE_URL_UNPOOLED || '';
const isPg = !!DATABASE_URL;

function sqliteDb(){
  if(!sqlite) sqlite = new sqlite3.Database(process.env.DB_PATH || path.join(process.cwd(),'vortex.db'));
  return sqlite;
}
function pg(){
  if(!pgPool) pgPool = new Pool({connectionString:DATABASE_URL, ssl:DATABASE_URL.includes('localhost')?false:{rejectUnauthorized:false}, max:5});
  return pgPool;
}
function adapt(sql){
  if(isPg){ let i=0; return sql.replace(/\?/g,()=>`$${++i}`); }
  return sql;
}
async function run(sql, params=[]){
  if(isPg){ const r=await pg().query(adapt(sql),params); return {lastID:r.rows[0]?.id,rowCount:r.rowCount}; }
  return new Promise((resolve,reject)=>sqliteDb().run(sql,params,function(err){err?reject(err):resolve({lastID:this.lastID,rowCount:this.changes});}));
}
async function get(sql, params=[]){
  if(isPg){ const r=await pg().query(adapt(sql),params); return r.rows[0]; }
  return new Promise((resolve,reject)=>sqliteDb().get(sql,params,(err,row)=>err?reject(err):resolve(row)));
}
async function all(sql, params=[]){
  if(isPg){ const r=await pg().query(adapt(sql),params); return r.rows; }
  return new Promise((resolve,reject)=>sqliteDb().all(sql,params,(err,rows)=>err?reject(err):resolve(rows)));
}
async function init(){
  if(isPg){
    await run(`CREATE TABLE IF NOT EXISTS players (id BIGSERIAL PRIMARY KEY,name TEXT NOT NULL UNIQUE,region TEXT NOT NULL DEFAULT 'NA',skin_url TEXT NOT NULL DEFAULT '',created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW())`);
    await run(`CREATE TABLE IF NOT EXISTS results (id BIGSERIAL PRIMARY KEY,player_id BIGINT NOT NULL REFERENCES players(id) ON DELETE CASCADE,mode TEXT NOT NULL,points INTEGER,tier TEXT,updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),UNIQUE(player_id,mode))`);
    await run(`CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY,value TEXT NOT NULL)`);
  } else {
    await run(`PRAGMA foreign_keys = ON`);
    await run(`CREATE TABLE IF NOT EXISTS players (id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT NOT NULL UNIQUE COLLATE NOCASE,region TEXT NOT NULL DEFAULT 'NA',skin_url TEXT NOT NULL DEFAULT '',created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)`);
    await run(`CREATE TABLE IF NOT EXISTS results (id INTEGER PRIMARY KEY AUTOINCREMENT,player_id INTEGER NOT NULL,mode TEXT NOT NULL,points INTEGER,tier TEXT,updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,UNIQUE(player_id,mode),FOREIGN KEY(player_id) REFERENCES players(id) ON DELETE CASCADE)`);
    await run(`CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY,value TEXT NOT NULL)`);
  }
  const defaults={siteName:'Vortex Tier',discordUrl:'https://discord.com',serverIp:'mc.vortextier.net',icon_overall:'',icon_vanilla:'',icon_uhc:'',icon_pot:'',icon_nethop:'',icon_smp:'',icon_sword:'',icon_axe:'',icon_mace:''};
  for(const [k,v] of Object.entries(defaults)) await run(`INSERT INTO settings(key,value) VALUES(?,?) ON CONFLICT(key) DO NOTHING`,[k,v]);
  const adminEmail=(process.env.ADMIN_EMAIL||'dhrhbodhrubo282@gmail.com').trim().toLowerCase();
  const adminPass=process.env.ADMIN_PASSWORD||'@dhrubo2a';
  const existingEmail=await get(`SELECT value FROM settings WHERE key='admin_email'`);
  if(!existingEmail) await run(`INSERT INTO settings(key,value) VALUES(?,?)`,['admin_email',adminEmail]);
  const existingHash=await get(`SELECT value FROM settings WHERE key='admin_password_hash'`);
  if(!existingHash){
    const bcrypt=require('bcryptjs');
    await run(`INSERT INTO settings(key,value) VALUES(?,?)`,['admin_password_hash',await bcrypt.hash(adminPass,12)]);
  }
}
module.exports={run,get,all,init,isPg};
