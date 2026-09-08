const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const REPO = 'Deluxsmp/Vortex-tier-test-web-2';
const BRANCH = 'main';
const DATA_PATH = 'data.json';
const LOCAL_FILE = path.join(__dirname, '..', DATA_PATH);

const MODES = [
  { id: 'overall', n: 'Overall', i: '🏆' },
  { id: 'vanilla', n: 'Vanilla', i: '🟪' },
  { id: 'uhc', n: 'UHC', i: '❤️' },
  { id: 'pot', n: 'Pot', i: '🧪' },
  { id: 'nethop', n: 'NetHop', i: '🟣' },
  { id: 'smp', n: 'SMP', i: '🟢' },
  { id: 'sword', n: 'Sword', i: '🗡️' },
  { id: 'axe', n: 'Axe', i: '🪓' },
  { id: 'mace', n: 'Mace', i: '🔨' }
];
const TESTED_MODES = MODES.filter(m => m.id !== 'overall').map(m => m.id);

function env(name) { return process.env[name] || ''; }
function defaultData() {
  return {
    modes: MODES,
    icons: {},
    site: { siteName: 'Vortex Tier', discordUrl: 'https://discord.com', serverIp: 'mc.vortextier.net' },
    players: []
  };
}
function sessionSecret() {
  const password = env('ADMIN_PASSWORD');
  if (!password) throw new Error('ADMIN_PASSWORD is not configured');
  return password + '|vortex-tier-session-v1';
}
function sign(value) {
  return crypto.createHmac('sha256', sessionSecret()).update(value).digest('hex');
}
function setCookie(res, value, maxAge) {
  res.setHeader('Set-Cookie', `vt_auth=${encodeURIComponent(value)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`);
}
function clearCookie(res) { setCookie(res, '', 0); }
function getCookie(req) {
  const raw = req.headers.cookie || '';
  for (const part of raw.split(';')) {
    const i = part.indexOf('=');
    if (i > -1 && part.slice(0, i).trim() === 'vt_auth') return decodeURIComponent(part.slice(i + 1));
  }
  return '';
}
function isAuthed(req) {
  try {
    const token = getCookie(req);
    const [payload, signature] = token.split('.');
    if (!payload || !signature) return false;
    const expected = sign(payload);
    if (signature.length !== expected.length) return false;
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return false;
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    return data.admin === true && Number(data.exp) > Date.now();
  } catch (_) { return false; }
}
async function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  let text = '';
  for await (const chunk of req) text += chunk;
  return text ? JSON.parse(text) : {};
}
async function github(method, filePath, body) {
  const token = env('GITHUB_TOKEN');
  if (!token) throw new Error('GITHUB_TOKEN is not configured');
  const url = `https://api.github.com/repos/${REPO}/contents/${filePath}`;
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'Content-Type': 'application/json'
  };
  const response = await fetch(url, { method, headers, body: body ? JSON.stringify(body) : undefined });
  if (!response.ok) throw new Error(`GitHub API ${response.status}`);
  return response.json();
}
async function loadData() {
  if (!env('GITHUB_TOKEN')) {
    try { return JSON.parse(fs.readFileSync(LOCAL_FILE, 'utf8')); }
    catch (_) { return defaultData(); }
  }
  try {
    const file = await github('GET', DATA_PATH);
    return JSON.parse(Buffer.from(file.content, 'base64').toString('utf8'));
  } catch (error) {
    if (!String(error.message).includes('GitHub API 404')) throw error;
    const data = defaultData();
    await saveData(data, 'Create Vortex Tier data');
    return data;
  }
}
async function saveData(data, message) {
  if (!env('GITHUB_TOKEN')) {
    fs.writeFileSync(LOCAL_FILE, JSON.stringify(data, null, 2) + '\n', 'utf8');
    return;
  }
  let sha;
  try { sha = (await github('GET', DATA_PATH)).sha; }
  catch (error) {
    if (!String(error.message).includes('GitHub API 404')) throw error;
  }
  const payload = {
    message,
    content: Buffer.from(JSON.stringify(data, null, 2) + '\n').toString('base64'),
    branch: BRANCH
  };
  if (sha) payload.sha = sha;
  await github('PUT', DATA_PATH, payload);
}
function enrich(data) {
  const players = (Array.isArray(data.players) ? data.players : []).map(player => {
    const results = player.results || {};
    const totalPoints = TESTED_MODES.reduce((sum, mode) => {
      const value = results[mode]?.points;
      return sum + (value !== '' && value != null ? Number(value) || 0 : 0);
    }, 0);
    return { ...player, totalPoints };
  }).sort((a, b) => b.totalPoints - a.totalPoints || String(a.name).localeCompare(String(b.name)));
  players.forEach((player, index) => { player.position = index + 1; });
  return { ...data, players };
}
function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(body));
}
async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'same-origin');
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const route = url.pathname.replace(/^\/api/, '') || '/';
  try {
    if (req.method === 'OPTIONS') { res.statusCode = 204; return res.end(); }
    if (route === '/public' && req.method === 'GET') return send(res, 200, enrich(await loadData()));

    if (route === '/admin/login' && req.method === 'POST') {
      const body = await readBody(req);
      const configured = env('ADMIN_PASSWORD');
      if (!configured || String(body.password || '') !== configured) return send(res, 401, { error: 'Invalid password' });
      const payload = Buffer.from(JSON.stringify({ admin: true, exp: Date.now() + 86400000 })).toString('base64url');
      setCookie(res, `${payload}.${sign(payload)}`, 86400);
      return send(res, 200, { ok: true });
    }
    if (route === '/admin/logout' && req.method === 'POST') { clearCookie(res); return send(res, 200, { ok: true }); }
    if (route === '/admin/me' && req.method === 'GET') {
      if (!isAuthed(req)) return send(res, 401, { error: 'Unauthorized' });
      return send(res, 200, { ok: true });
    }
    if (!route.startsWith('/admin/')) return send(res, 404, { error: 'Not found' });
    if (!isAuthed(req)) return send(res, 401, { error: 'Unauthorized' });

    const data = await loadData();
    if (route === '/admin/players' && req.method === 'GET') return send(res, 200, enrich(data));
    if (route === '/admin/players' && req.method === 'POST') {
      const body = await readBody(req);
      const name = String(body.name || '').trim();
      if (!name || name.length > 16) return send(res, 400, { error: 'Player name is required (max 16 characters).' });
      const exists = data.players.find(p => String(p.name).toLowerCase() === name.toLowerCase());
      if (exists) return send(res, 409, { error: 'Player already exists. Edit the existing player instead.' });
      data.players.push({ id: Date.now(), name, region: String(body.region || 'NA'), skin_url: String(body.skinUrl || '').trim(), results: body.results || {} });
      await saveData(data, 'Add player');
      return send(res, 200, enrich(data));
    }
    const match = route.match(/^\/admin\/players\/(\d+)$/);
    if (match) {
      const id = Number(match[1]);
      const index = data.players.findIndex(p => p.id === id);
      if (index < 0) return send(res, 404, { error: 'Player not found' });
      if (req.method === 'PUT') {
        const body = await readBody(req);
        const name = String(body.name || '').trim();
        if (!name || name.length > 16) return send(res, 400, { error: 'Player name is required (max 16 characters).' });
        const duplicate = data.players.find((p, i) => i !== index && String(p.name).toLowerCase() === name.toLowerCase());
        if (duplicate) return send(res, 409, { error: 'Another player already has this name.' });
        data.players[index] = { ...data.players[index], name, region: String(body.region || 'NA'), skin_url: String(body.skinUrl || '').trim(), results: body.results || {} };
        await saveData(data, 'Update player');
        return send(res, 200, enrich(data));
      }
      if (req.method === 'DELETE') {
        data.players.splice(index, 1);
        await saveData(data, 'Delete player');
        return send(res, 200, enrich(data));
      }
    }
    if (route === '/admin/settings' && req.method === 'GET') return send(res, 200, { ...data.icons, site: data.site });
    if (route === '/admin/settings' && req.method === 'PUT') {
      const body = await readBody(req);
      data.icons = {};
      for (const key of Object.keys(body)) if (key.startsWith('icon_')) data.icons[key] = String(body[key] || '').trim();
      if (body.site && typeof body.site === 'object') data.site = { ...data.site, ...body.site };
      await saveData(data, 'Update settings');
      return send(res, 200, { ok: true });
    }
    return send(res, 404, { error: 'Not found' });
  } catch (error) {
    console.error(error);
    return send(res, 500, { error: 'Server error' });
  }
}

module.exports = handler;
module.exports.apiHandler = handler;
