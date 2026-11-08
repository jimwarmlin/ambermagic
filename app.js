/* 兔兔魔法世界 第一階段 v2 */
(() => {
'use strict';
const W = 1448, H = 1086;
const IMG = Object.assign({
  map: 'img/map.webp', bakery: 'img/bakery.webp', result: 'img/result.webp',
  starA: 'img/star_a.webp', starB: 'img/star_b.webp', bearHappy: 'img/bear_happy.webp', bearWow: 'img/bear_wow.webp',
  bearThink: 'img/bear_think.webp', avatar: 'img/avatar.webp', bearBody: 'img/bear_body.webp', gate: 'img/gate.webp', frameWide: 'img/frame_wide.webp', frameCard: 'img/frame_card.webp', hallChinese: 'img/hall_chinese.webp', hallScience: 'img/hall_science.webp', hallMarket: 'img/hall_market.webp', boss: 'img/boss.webp', forest: 'img/forest.webp', mathMap: 'img/mathmap.webp', music: 'img/music_stage.webp', shopBg: 'img/shop_bg.webp', homeBg: 'img/home_bg.webp', badgeBg: 'img/badge_bg.webp', statusBg: 'img/status_bg.webp'
}, window.INLINE_IMG || {});
const AV = '11081700'; const vq = u => (u && !String(u).startsWith('data:')) ? u + '?v=' + AV : u;
Object.keys(IMG).forEach(k => { IMG[k] = vq(IMG[k]); });
// 道具小圖示（img/icon/）
const icon = (n, cls = 'ic') => `<img class="${cls}" src="${vq('img/icon/' + n + '.webp')}" alt="">`;
const CFG = Object.assign({ sheetCsvUrl: '', subject: '數學' }, window.BUNNY_CONFIG || {});
const WALK = {"g": 12, "rows": ["0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000000000000000000000000000000110011000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000000000000000000000000000000111011000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000000000000000000000000000000011110000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000000000000000000000000000000011000000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000000000000000000000000000000111000000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000000000000000000000000000000111000000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000000000000000000000000000000011110000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000000000000000000000000000000001111000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000000000000000000000000000000001111100000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000000000000000000000000000000000111100000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000000000000000000000000000000000111000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000001100001000000000000000000011110000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000011100001000000000000000011111000000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000011100011100000000000001111100000000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000111111111111000000000111100000000000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000111111111111000000001111000000000000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000000001111111000000001110000000000000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000000001111111000000001110000000000000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000000000001111000000001110000000000000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000011000000001111000000011110000000000000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000011100000000111000000111111000000000000000000011110000000000000000000000000000000000", "0000000000000000000000000000000000000001110000000111111001111111100000000000000000111100000000000000000000000000000000000", "0000000000000000000000000000000000000001110000000001111111111111100000000000000001110000000000000000000000000000000000000", "0000000000000000000000000000000000000011100000000001111111111111111011000000000011110000000000000000000000000000000000000", "0000000000000000000000000000000000000111100000000000111110000000111111000000000001110000000000000000000000000000000000000", "0000000000000000000000000000000000001111000000000000111100000000011111100000000001110000000000000000000000000000000000000", "0000000000000000000000000000000000001110000000000001111100000000011111110000000001111000000000000000000000000000000000000", "0000000000000000000000000000000000001111000000011111111100000000001111111000000000111000000000000000000000000000000000000", "0000000000000000000000000000000000000111000000111111111000000000001111111100000001110000000000000000000000000000000000000", "0000000000000000000000000000000000000011110000111111110000000000000111111111000001110000000000000000000000000000000000000", "0000000000000000000000111100000000000011111100111110010000000000000101111111000111110110000000000000000000000000000000000", "0000000000000000000000011110000000000011111111111110001000000000001000111111111111101111101000000000000000000000000000000", "0000000000000000000000000111100000000111111111111110000000000000000001111111111110000000001000000000000000000000000000000", "0000000000000000000000000011100000001111011101111111000000000000100001111111111100000000011100000000000000000000000000000", "0000000000000000000000000001110000011110011101111111100010111100100011111111111110000000111110000000000000000000000000000", "0000000000000000000000000001111111111110011100000111111111111111111111110011110111000000111111111100000000000000000000000", "0000000000000000000000011111111111110001000000001111111111111111111111110000000111100000111111111100100000000000000000000", "0000000000000000000000000000000000000000000000000100011111111111111100010000000111110000111111110000100000000000000000000", "0000000000000000000000000000000000000000000000000000000111111111110000000000001101111000111111110001111000000000000000000", "0000000000000000000000000000000000000000000000000000000111111111110000000000011000111100111111110111110000000000000000000", "0000000000000000000000000000000000000000000000000000000011111110010000000001110000011111111111111111000000000000000000000", "0000000000000000000000000000000000000000000000110000001011111000010000000011000000000111111111111100000000000000000000000", "0000000000000000000000000000000000000000000000001111111111110000000000000000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000000000000000111111110000000000000000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000000000000000011111000000000000000000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000000000000000111110000000000000000000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000000000000001111100000000000000000000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000000000000011111000000000000000000000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000000000000011111000000000000000000000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000000000000011111100000000000000000000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000000000000001111110000000000000000000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000000000000001111110000000000000000000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000000000000001111111000000000000000000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000000000000000111111110000000000000000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000000000000000111111110000000000000000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000000000000000111111111000000000000000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000000000000000111111110000000000000000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000000000000001111111110000000000000000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000000000000011111111100000000000000000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000000000000111111111000000000000000000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000000000001111111100000000000000000000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000000000011111111000000000000000000000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000000001111111110000000000000000000000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000000111111111100000000000000000000000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000000000110011100000000000000000000000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000000000000010011000000000000000000000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000000000000011111100000000000000000000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000000000000000111100000000000000000000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"]};

/* ---------- helpers ---------- */
const stage = document.getElementById('stage');
const rnd = n => Math.floor(Math.random() * n);
const rr = (a, b) => a + Math.random() * (b - a);
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = rnd(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
function el(tag, cls, parent, html) { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; if (parent) parent.appendChild(e); return e; }
const pctX = x => (x / W * 100) + '%', pctY = y => (y / H * 100) + '%';
function place(e, x, y, w, h) { e.style.left = pctX(x); e.style.top = pctY(y); if (w != null) e.style.width = pctX(w); if (h != null) e.style.height = pctY(h); if (getComputedStyle(e).position === 'static') e.style.position = 'absolute'; return e; }
const circ = (e, cx, cy, r) => place(e, cx - r, cy - r, 2 * r, 2 * r);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
let U = 1; const scalers = [];
function fit() {
  const vw = window.innerWidth, vh = window.innerHeight;
  const s = Math.min(vw / W, vh / H); U = s;
  stage.style.width = W * s + 'px'; stage.style.height = H * s + 'px';
  stage.style.left = (vw - W * s) / 2 + 'px'; stage.style.top = (vh - H * s) / 2 + 'px';
  document.documentElement.style.setProperty('--u', s + 'px'); scalers.forEach(e => e.style.transform = `scale(${s})`);
}
addEventListener('resize', fit); fit();
function toStage(ev) { const r = stage.getBoundingClientRect(); return { x: (ev.clientX - r.left) / r.width * W, y: (ev.clientY - r.top) / r.height * H }; }

const ICON = {
  speaker: '<svg viewBox="0 0 24 24"><path d="M4 9h4l5-4v14l-5-4H4z" fill="#fff" stroke="#7d5aa8" stroke-width="1.8" stroke-linejoin="round"/><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="#7d5aa8" stroke-width="2" stroke-linecap="round"/></svg>',
  lock: '<svg viewBox="0 0 24 24"><rect x="4" y="10" width="16" height="12" rx="3" fill="#c9a24a"/><path d="M8 10V7a4 4 0 0 1 8 0v3" fill="none" stroke="#a07a2a" stroke-width="2.6"/><circle cx="12" cy="16" r="1.8" fill="#7a5a1a"/></svg>',
  back: '<svg viewBox="0 0 24 24"><path d="M14.5 5 7.5 12l7 7" fill="none" stroke="#e1709e" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  check: '<svg viewBox="0 0 24 24"><path d="M5 12.5 10 17 19 7" fill="none" stroke="#3ea561" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  cross: '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18" fill="none" stroke="#d24a66" stroke-width="3.4" stroke-linecap="round"/></svg>',
  del: '<svg viewBox="0 0 24 24"><path d="M8 5h12v14H8l-6-7z" fill="none" stroke="#7d5aa8" stroke-width="2.2" stroke-linejoin="round"/><path d="M11 9l6 6M17 9l-6 6" stroke="#7d5aa8" stroke-width="2.2" stroke-linecap="round"/></svg>',
  bulb: '<svg viewBox="0 0 24 24"><path d="M12 2.5a6.5 6.5 0 0 0-3.8 11.8c.6.5 1 1.2 1 2V17h5.6v-.7c0-.8.4-1.5 1-2A6.5 6.5 0 0 0 12 2.5z" fill="#ffd54a" stroke="#d99a1e" stroke-width="1.2"/><rect x="9.2" y="17.6" width="5.6" height="2" rx=".8" fill="#b9a3d9"/><rect x="10" y="20.2" width="4" height="1.6" rx=".8" fill="#9a82c4"/></svg>',
  fly: c => `<svg viewBox="0 0 34 28"><ellipse cx="9" cy="11" rx="8" ry="9" fill="${c}"/><ellipse cx="25" cy="11" rx="8" ry="9" fill="${c}"/><ellipse cx="10" cy="21" rx="6" ry="5" fill="${c}" opacity=".85"/><ellipse cx="24" cy="21" rx="6" ry="5" fill="${c}" opacity=".85"/><rect x="16" y="6" width="2" height="18" rx="1" fill="#6b4a5a"/></svg>`
};
const starStr = n => '★'.repeat(n);

/* ---------- sound ---------- */
let actx = null;
function AC() { if (!actx) actx = new (window.AudioContext || window.webkitAudioContext)(); if (actx.state === 'suspended') actx.resume(); return actx; }
function tone(seq, type = 'triangle', len = 0.12, vol = 0.16) {
  if (!S.settings.sound) return;
  try {
    const c = AC(), t0 = c.currentTime;
    seq.forEach((f, i) => {
      const o = c.createOscillator(), g = c.createGain(); o.type = type; o.frequency.value = f;
      const t = t0 + i * len; g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.015); g.gain.exponentialRampToValueAtTime(0.0001, t + len * 1.6);
      o.connect(g).connect(c.destination); o.start(t); o.stop(t + len * 1.7);
    });
  } catch (e) {}
}
const SFX = {
  tap: () => tone([660], 'sine', 0.06, 0.08), ok: () => tone([784, 988, 1319]), bad: () => tone([330, 262], 'sine', 0.14, 0.12),
  coin: () => tone([1319, 1760], 'square', 0.06, 0.05), level: () => tone([523, 659, 784, 1047, 1319], 'triangle', 0.11, 0.18),
  star: () => tone([1047, 1568], 'triangle', 0.09, 0.14), step: () => tone([520], 'sine', 0.03, 0.03), door: () => tone([523, 784, 1047], 'sine', 0.09, 0.12)
};

/* ---------- background music (mp3) ---------- */
const TRACKS = Object.assign({
  town: vq('audio/map.mp3'), cafe: vq('audio/cookingmath.mp3'), library: vq('audio/library.mp3'), greenhouse: vq('audio/greenhouse.mp3'),
  market: vq('audio/market.mp3'), birdie: vq('audio/birdie.mp3'), forest: vq('audio/forest.mp3'), dragon: vq('audio/dragon.mp3'),
  home: vq('audio/home.mp3'), shop: vq('audio/shop.mp3')
}, window.INLINE_AUDIO || {});
// 每個場景的背景音樂（兔兔小屋 home 開放後會用到）
const SCENE_TRACK = { map: 'town', result: 'town', bakery: 'cafe', mathmap: 'cafe', hall_chinese: 'library', hall_science: 'greenhouse', hall_literacy: 'market',
  music: 'birdie', badges: 'town', status: 'town', forest: 'forest', boss: 'dragon', shop: 'shop', home: 'home' };
const Music = (() => {
  let unlocked = false, want = '', cur = '', ducked = false, duckLv = 0.35; const base = 0.55; const tr = {};
  function T(name) { if (!tr[name]) { const c = AC(); const g = c.createGain(); g.gain.value = 0.0001; g.connect(c.destination); tr[name] = { g }; } return tr[name]; }
  function fade(name, v, dur) {
    const t = tr[name]; if (!t) return; const c = AC(), g = t.g.gain; v = Math.max(v, 0.0001);
    g.cancelScheduledValues(c.currentTime); g.setValueAtTime(Math.max(g.value, 0.0001), c.currentTime); g.exponentialRampToValueAtTime(v, c.currentTime + dur);
    if (t.mode === 'vol' && t.el) t.el.volume = Math.min(1, v);
  }
  function b64(u) { const bin = atob(u.slice(u.indexOf(',') + 1)); const arr = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i); return arr.buffer; }
  async function start(name) {
    const c = AC(), t = T(name), url = TRACKS[name];
    if (url.startsWith('data:')) {
      if (!t.buf) { t.loading = t.loading || new Promise((res, rej) => c.decodeAudioData(b64(url), res, rej)); try { t.buf = await t.loading; } catch (e) { return; } }
      if (cur !== name || t.src) return;
      const sN = c.createBufferSource(); sN.buffer = t.buf; sN.loop = true; sN.connect(t.g); sN.start(); t.src = sN;
    } else {
      if (!t.el) { const el = new Audio(); el.src = url; el.loop = true; el.preload = 'auto'; el.setAttribute('playsinline', '');
        try { c.createMediaElementSource(el).connect(t.g); t.mode = 'ga'; } catch (e) { t.mode = 'vol'; } t.el = el; }
      const p = t.el.play(); if (p && p.catch) p.catch(() => {});
    }
    fade(name, ducked ? base * duckLv : base, 1.0);
  }
  function stop(name) {
    const t = tr[name]; if (!t) return; fade(name, 0.0001, 0.6);
    setTimeout(() => { if (cur === name) return; if (t.el) t.el.pause(); if (t.src) { try { t.src.stop(); } catch (e) {} t.src = null; } }, 650);
  }
  function apply() {
    if (!unlocked) return;
    if (!S.settings.music) { const p = cur; cur = ''; Object.keys(tr).forEach(stop); return; }
    if (want === cur) return; const prev = cur; cur = want; if (prev) stop(prev); if (cur) start(cur).catch(() => {});
  }
  return {
    want(n) { want = n; apply(); },
    unlock() { if (unlocked) return; unlocked = true; try { AC(); } catch (e) {} apply(); },
    refresh() { if (S.settings.music) cur = ''; apply(); },
    duck(on, lv) { ducked = on; duckLv = lv == null ? 0.35 : lv; if (cur) fade(cur, on ? base * duckLv : base, 0.3); },
    pause() { Object.values(tr).forEach(t => t.el && t.el.pause()); },
    resume() { const t = tr[cur]; if (t && t.el && S.settings.music) { const p = t.el.play(); if (p && p.catch) p.catch(() => {}); } }
  };
})();
document.addEventListener('visibilitychange', () => { if (!actx) return; if (document.hidden) { Music.pause(); actx.suspend(); } else { actx.resume(); Music.resume(); } });
stage.addEventListener('pointerdown', () => Music.unlock(), true);

/* ---------- save (per kid: local cache + cloud) ---------- */
const KEY = 'bunny-world-v1';
const today = () => { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
const fresh = () => ({ v: 2, coins: 0, xp: 0, level: 1, stars: 0, rounds: 0, stats: {}, wrongLog: [], daily: {}, settings: { sound: true, music: true, limit: 0 }, introDone: false, pos: null, focus: null, updatedAt: 0, snapDate: '', inv: { furn: [], hat: [], cape: [], wand: [] }, equip: { hat: '', cape: '', wand: '' }, prog: null, badges: {}, home: { items: [] } });
let S = fresh();
let KID = null;
function normalize() { S.settings = Object.assign({ sound: true, music: true, limit: 0 }, S.settings || {}); S.stats = S.stats || {}; S.wrongLog = S.wrongLog || []; S.daily = S.daily || {};
  S.inv = Object.assign({ furn: [], hat: [], cape: [], wand: [] }, S.inv || {}); S.equip = Object.assign({ hat: '', cape: '', wand: '' }, S.equip || {});
  S.badges = S.badges || {}; S.home = S.home || { items: [] }; S.home.items = S.home.items || [];
  if (!S.prog) { // 第一次：從過去的單元星星推算各科完成回合數
    const r = {}; Object.keys(S.unitStars || {}).forEach(k => { const sj = k.split('|')[0]; r[sj] = (r[sj] || 0) + 1; });
    S.prog = { rounds: r, songs: r['音樂'] || 0, saved: 0, quests: 0 }; }
  S.prog.rounds = S.prog.rounds || {}; }
const rankOf = s => s ? (s.level || 1) * 1e7 + (s.xp || 0) * 100 + (s.rounds || 0) : -1;
let saveT = null;
function save() {
  S.updatedAt = Date.now(); if (!KID) return;
  try { localStorage.setItem('bw-kid-' + KID.id, JSON.stringify(S)); } catch (e) {}
  clearTimeout(saveT); saveT = setTimeout(flushSave, 1500);
}
function flushSave() {
  if (!KID) return; clearTimeout(saveT);
  const st = JSON.parse(JSON.stringify(S));
  BE.saveState(KID.id, st).catch(() => {});
  if (S.snapDate !== today()) { S.snapDate = today(); BE.snapshot(KID.id, today(), st).catch(() => {}); }
}
addEventListener('pagehide', flushSave);
document.addEventListener('visibilitychange', () => { if (document.hidden) flushSave(); });
function D() { if (S.daily.date !== today()) S.daily = { date: today(), rounds: 0, correct: 0, stars: 0, playMs: 0, claimed: [] }; return S.daily; }

/* ---------- levels ---------- */
const TITLES = ['見習魔法', '小小魔法', '勇敢魔法', '聰明魔法', '厲害魔法', '閃亮魔法', '傳說魔法'];
const title = L => TITLES[Math.min(L, TITLES.length) - 1] + animalOf(KID && KID.animal).short;
const need = L => 60 + L * 40;
let pendingLevels = [];
function addXP(n) { S.xp += n; while (S.xp >= need(S.level)) { S.xp -= need(S.level); S.level++; pendingLevels.push(S.level); } save(); }
function addCoins(n) { S.coins += n; save(); }
const STAGES = [
  { key: 'warm', name: '暖身點心', diffs: [1, 2], unlock: 1, bonus: 20, stars: 1, box: [291, 907, 280, 149] },
  { key: 'sign', name: '招牌蛋糕', diffs: [2, 3], unlock: 2, bonus: 40, stars: 2, box: [582, 907, 286, 149] },
  { key: 'chef', name: '大廚挑戰', diffs: [3, 4, 5], unlock: 4, bonus: 80, stars: 3, box: [879, 907, 280, 149] }
];
const UNLOCK_MSG = { 2: '「招牌蛋糕」關卡開放了！', 4: '「大廚挑戰」關卡開放了！' };

/* ---------- questions ---------- */
let BANK = [], BANK_SRC = '內建題庫';
function parseCSV(text) {
  const rows = []; let row = [], cur = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) { if (c === '"') { if (text[i + 1] === '"') { cur += '"'; i++; } else q = false; } else cur += c; }
    else if (c === '"') q = true;
    else if (c === ',') { row.push(cur); cur = ''; }
    else if (c === '\n' || c === '\r') { if (c === '\r' && text[i + 1] === '\n') i++; row.push(cur); rows.push(row); row = []; cur = ''; }
    else cur += c;
  }
  if (cur || row.length) { row.push(cur); rows.push(row); }
  return rows;
}
function fromSheet(rows) {
  const h = rows[0].map(s => s.trim()); const ix = k => h.indexOf(k); const out = [];
  for (const r of rows.slice(1)) {
    const g = k => (ix(k) >= 0 ? (r[ix(k)] || '') : '').trim();
    if (!g('編號')) continue;
    const diff = parseInt(g('難度'), 10) || 1;
    out.push({ id: g('編號'), subject: g('科目'), grade: g('年級'), unit: g('單元'), diff, type: g('題型'), stem: g('題幹'), options: g('選項').split('|').map(s => s.trim()).filter(Boolean),
      answer: g('答案'), hint: g('提示'), explain: g('解答教學'), coins: parseInt(g('金幣'), 10) || diff * 10, image: g('圖片網址') });
  }
  return out;
}
const valid = q => q.stem && q.answer && (q.type === '數字輸入' || ((q.type === '排序' || q.type === '拖拉放置') && q.answer.includes('|')) || (q.type === '情境素養' && (!q.options.length || q.options.includes(q.answer))) || (q.type === '選擇問答' && q.options.includes(q.answer)) || (q.type === '配對消除' && q.options.every(o => o.includes('='))));
async function loadBank() {
  if (window.INLINE_QUESTIONS) { BANK = window.INLINE_QUESTIONS.filter(valid); return; }
  if (CFG.sheetCsvUrl) {
    try {
      const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 6000);
      const res = await fetch(CFG.sheetCsvUrl, { signal: ctl.signal, cache: 'no-store' }); clearTimeout(t);
      const qs = fromSheet(parseCSV(await res.text())).filter(valid);
      if (qs.length >= 10) { BANK = qs; BANK_SRC = 'Google 試算表'; try { localStorage.setItem(KEY + '-bank', JSON.stringify(qs)); } catch (e) {} return; }
    } catch (e) {}
    try { const c = JSON.parse(localStorage.getItem(KEY + '-bank') || 'null'); if (c && c.length) { BANK = c; BANK_SRC = 'Google 試算表（離線備份）'; return; } } catch (e) {}
  }
  try { const r = await fetch(vq('questions.json')); BANK = (await r.json()).filter(valid); } catch (e) { BANK = []; }
}
const isExpr = q => (q.type === '選擇問答' || q.type === '數字輸入') && /^[\d\s×＋－÷]+＝\s*？$/.test(q.stem) && /^\d+$/.test(q.answer);
function weight(q) { const st = S.stats[q.id]; const f = S.focus && q.unit === S.focus ? 3 : 1; if (!st) return 3 * f; if (st.w > st.r) return 4 * f; return Math.max(0.6, 2 - st.r * 0.5) * f; }
function pickWeighted(pool, n, avoid) {
  const out = []; const cand = pool.filter(q => !avoid.has(q.id));
  while (out.length < n && cand.length) {
    const tot = cand.reduce((s, q) => s + weight(q), 0); let x = Math.random() * tot, i = 0;
    for (; i < cand.length; i++) { x -= weight(cand[i]); if (x <= 0) break; }
    i = Math.min(i, cand.length - 1); out.push(cand[i]); avoid.add(cand[i].id); cand.splice(i, 1);
  }
  return out;
}
function buildRound(stg) {
  const inStg = q => (q.subject || '數學') === '數學' && stg.diffs.includes(q.diff) && (!stg.units || stg.units.includes(q.unit));
  const pool = BANK.filter(q => inStg(q) && q.type !== '配對消除');
  const used = new Set(); const qs = pickWeighted(pool, 7, used);
  let match = null;
  const fixed = BANK.filter(q => q.type === '配對消除' && inStg(q));
  const exprs = shuffle(BANK.filter(q => isExpr(q) && inStg(q) && !used.has(q.id) && +q.answer < 1000 && q.stem.replace(/\s/g, '').length <= 8));
  const pairs = [], seen = new Set();
  for (const q of exprs) { if (seen.has(q.answer)) continue; seen.add(q.answer); pairs.push([q.stem.replace(/\s*＝\s*？$/, '').replace(/\s+/g, ' '), q.answer, q]); if (pairs.length === 4) break; }
  if (pairs.length === 4 && (Math.random() < 0.75 || !fixed.length)) {
    const diff = Math.round(pairs.reduce((s, p) => s + p[2].diff, 0) / 4);
    match = { id: 'MATCH', type: '配對消除', diff, unit: '綜合練習', stem: '把算式和答案配對', pairs: pairs.map(p => [p[0], p[1]]),
      hint: '先算出每一張算式卡的答案，再找寫著那個數字的卡片。', explain: pairs.map(p => `${p[0]} ＝ ${p[1]}`).join('，') + '。算式和答案一樣，就是一對！', coins: diff * 10, src: pairs.map(p => p[2].id) };
  } else if (fixed.length) { const f = fixed[rnd(fixed.length)]; match = Object.assign({}, f, { pairs: f.options.map(o => o.split('=')) }); }
  if (match) qs.splice(4, 0, match); else qs.push(...pickWeighted(pool, 1, used));
  return qs.slice(0, 8);
}

/* ---------- scaffolding ---------- */
const screens = {};
function screen(name, bg) {
  const s = el('section', 'screen', stage); s.id = 's-' + name;
  const im = el('img', 'bg', s); im.alt = ''; im.draggable = false; im.decoding = 'async'; s._bg = IMG[bg]; s._im = im; screens[name] = s; return s;
}
let curName = '';
function loadBg(name) { const s = screens[name]; if (s && s._bg && !s._im.src) { s._im.src = s._bg; s.style.setProperty('--src', `url("${s._bg}")`); } }
// 其他場景的背景圖：進到地圖一陣子後，才在背景慢慢下載（不跟地圖搶網路）
let warmed = false;
function warmUp() {
  if (warmed) return; warmed = true;
  const list = ['bakery', 'hallChinese', 'hallScience', 'hallMarket', 'shopBg', 'music', 'forest', 'boss', 'mathMap'].map(k => IMG[k]).filter(Boolean);
  let i = 0; const next = () => { if (i >= list.length) return; const pre = new Image(); try { pre.fetchPriority = 'low'; } catch (e) {} pre.onload = pre.onerror = () => setTimeout(next, 400); pre.src = list[i++]; };
  setTimeout(next, 6000);
}
// 場景第一次進去時才建立（開遊戲時只建地圖和結算畫面，讀取比較快）
const BUILDERS = {};
function ensure(name) {
  if (screens[name] || !BUILDERS[name]) return;
  BUILDERS[name](); fit();
  if (name === 'bakery' && KID && bakeryUI) bakeryUI.setAnimal(KID.animal);
}
function go(name, fade) {
  ensure(name); loadBg(name);
  const sw = () => { Object.values(screens).forEach(s => s.classList.remove('on')); screens[name].classList.add('on'); curName = name; refreshHUD(); Music.want(SCENE_TRACK[name] || 'town'); if (onShow[name]) onShow[name](); if (KID) { checkBadges(); if (SAFE_SCR.includes(name)) setTimeout(showBadgeQueue, name === 'result' ? 2600 : 700); } };
  if (fade) { const c = el('div', 'curtain', stage); setTimeout(sw, 300); setTimeout(() => c.remove(), 720); } else sw();
}
const onShow = {};
function btn(parent, cls, x, y, w, h, onTap, label) { const b = el('button', cls, parent); place(b, x, y, w, h); if (label) b.setAttribute('aria-label', label); b.addEventListener('pointerdown', e => e.stopPropagation()); b.addEventListener('click', e => { e.stopPropagation(); SFX.tap(); onTap(e); }); return b; }
function rbtn(parent, cx, cy, r, onTap, label) { return btn(parent, 'hot', cx - r, cy - r, 2 * r, 2 * r, onTap, label); }
function toast(msg) { const t = el('div', 'toast', stage, esc(msg)); setTimeout(() => t.remove(), 2200); }
function floatText(text, x, y) { const t = String(text); const f = el('div', 'float', stage, t.includes('金幣') ? icon('coin', 'coin') + esc(t.replace(/\s*金幣/, '')) : esc(t)); f.style.left = pctX(x); f.style.top = pctY(y); setTimeout(() => f.remove(), 1300); }
function modal(html, opts = {}) {
  const m = el('div', 'modal', stage); const c = el('div', 'card' + (opts.wide ? ' wide' : ''), m, html);
  m.addEventListener('pointerdown', e => e.stopPropagation());
  if (opts.close !== false) { const x = el('button', 'close', c, ICON.cross); x.setAttribute('aria-label', '關閉'); x.onclick = () => { SFX.tap(); m.remove(); opts.onClose && opts.onClose(); }; }
  return { m, c };
}
const closeModal = m => m.remove();
function on(c, sel, fn) { const e = c.querySelector(sel); if (e) e.addEventListener('click', ev => { SFX.tap(); fn(ev); }); return e; }

/* living-scene helpers */
function patch(s, x, y, w, h, anim, origin, extra = '') {
  const p = el('div', 'patch ' + anim + ' ' + extra, s); place(p, x, y, w, h);
  p.style.backgroundSize = `${W / w * 100}% ${H / h * 100}%`;
  p.style.backgroundPosition = `${w >= W ? 0 : x / (W - w) * 100}% ${h >= H ? 0 : y / (H - h) * 100}%`;
  p.style.transformOrigin = origin || '50% 100%';
  p.style.animationDuration = rr(2.8, 4.6).toFixed(2) + 's'; p.style.animationDelay = (-rr(0, 4)).toFixed(2) + 's';
  return p;
}
function glow(s, cx, cy, r, kind) { const g = el('div', 'glowdot ' + (kind || ''), s); circ(g, cx, cy, r); g.style.animationDuration = rr(1.6, 3).toFixed(2) + 's'; g.style.animationDelay = (-rr(0, 3)).toFixed(2) + 's'; return g; }
function twinkle(s, cx, cy) { const t = el('div', 'twinkle', s); place(t, cx - 13, cy - 13); t.style.animationDelay = (-rr(0, 2.4)).toFixed(2) + 's'; t.style.animationDuration = rr(1.8, 3.2).toFixed(2) + 's'; return t; }
function petals(s, n) { for (let i = 0; i < n; i++) { const p = el('div', 'fall', s); p.style.left = rr(0, 100).toFixed(1) + '%'; p.style.animationDuration = rr(9, 16).toFixed(1) + 's'; p.style.animationDelay = (-rr(0, 16)).toFixed(1) + 's'; p.style.opacity = rr(.5, .95).toFixed(2); } }
function fallwater(s, x, y, w, h) { const f = el('div', 'fall-water', s); place(f, x, y, w, h); f.style.animationDuration = rr(.45, .7).toFixed(2) + 's'; }

/* HUD */
const huds = [];
function makeHUD(s, cfg) {
  const h = {};
  if (cfg.lv) { h.lv = el('div', 'lvnum', s); circ(h.lv, cfg.lv[0], cfg.lv[1], 34); }
  if (cfg.xp) { h.xp = el('div', 'xp', s, '<i></i><b></b>'); place(h.xp, ...cfg.xp); }
  if (cfg.coin) { h.coin = el('div', 'cointext', s); place(h.coin, ...cfg.coin); }
  if (cfg.face) { h.face = el('div', 'avface', s); circ(h.face, ...cfg.face); }
  if (cfg.avatar) rbtn(s, ...cfg.avatar, showProfile, '我的角色');
  if (cfg.settings) rbtn(s, ...cfg.settings, showSettings, '設定');
  if (cfg.bag) rbtn(s, ...cfg.bag, () => showBag(), '背包');
  huds.push(h); return h;
}
function refreshHUD() {
  dressAll();
  const pct = Math.min(100, S.xp / need(S.level) * 100);
  huds.forEach(h => {
    if (h.lv) h.lv.textContent = S.level;
    if (h.xp) { h.xp.querySelector('i').style.width = Math.max(6, pct) + '%'; h.xp.querySelector('b').textContent = S.xp + ' / ' + need(S.level); }
    if (h.coin) h.coin.textContent = S.coins;
    if (h.face) { const a = KID && KID.animal; h.face.style.display = (a && a !== 'bunny') || h.face.classList.contains('kitface') ? 'block' : 'none'; if ((a && a !== 'bunny') || h.face.classList.contains('kitface')) h.face.style.backgroundImage = `url("${frURL(POSE(a || 'bunny').idle)}")`; }
  });
  if (bakeryUI) bakeryUI.refresh();
}

/* ---------- UI kit (按鈕與介面元件) ---------- */
const UI_NAMES = ['avatar', 'bag', 'board_medal', 'bubble', 'coinbar', 'dotsbar', 'gear', 'hearts', 'home', 'ic_book', 'ic_bulb', 'ic_check', 'ic_game', 'ic_hanger', 'ic_map', 'laurel', 'panel_ears', 'pause', 'pill_blue', 'pill_cream', 'pill_green', 'pill_pink', 'pill_purple', 'pill_yellow', 'play', 'qframe', 'quest', 'starbadge', 'xpbar'];
const uiURL = n => (window.INLINE_IMG && window.INLINE_IMG['ui_' + n]) || vq(`img/ui/${n}.webp`);
UI_NAMES.forEach(n => stage.style.setProperty('--ui-' + n, `url("${uiURL(n)}")`));
function kitBtn(s, name, x, y, w, h, fn, label, text) {
  const b = btn(s, 'kitbtn', x, y, w, h, fn, label || text || name); b.style.backgroundImage = `var(--ui-${name})`;
  if (text) b.innerHTML = `<span>${esc(text)}</span>`; return b;
}
function kitHUD(s, o) {
  const h = {};
  const fr = el('div', 'kitimg', s); place(fr, 12, 4, 152, 166); fr.style.backgroundImage = 'var(--ui-avatar)';
  h.face = el('div', 'avface kitface', s); circ(h.face, 88, 84, 50); h.face.style.display = 'block';
  rbtn(s, 88, 84, 60, showProfile, '我的角色');
  const sb = el('div', 'kitimg', s); place(sb, 160, 30, 66, 66); sb.style.backgroundImage = 'var(--ui-starbadge)';
  h.lv = el('div', 'lvnum gold', s); circ(h.lv, 193, 63, 30);
  h.xp = el('div', 'xp', s, '<i></i><b></b>'); place(h.xp, 232, 48, 230, 32);
  const cb = el('div', 'kitimg', s); place(cb, 480, 36, 210, 58); cb.style.backgroundImage = 'var(--ui-coinbar)';
  h.coin = el('div', 'cointext', s); place(h.coin, 530, 40, 150, 50);
  const R = [o.home && ['home', () => o.home()], ['bag', () => showBag()], ['quest', openBadges], ['gear', showSettings]].filter(Boolean);
  R.forEach((r, i) => kitBtn(s, r[0], 1394 - (R.length - i) * 98, 14, 88, 88, r[1], { home: '回地圖', bag: '背包', quest: '任務徽章', gear: '設定' }[r[0]]));
  huds.push(h); return h;
}

/* blinking */
function blinker(elm) { (function loop() { setTimeout(() => { elm.classList.add('blink'); setTimeout(() => { elm.classList.remove('blink'); if (Math.random() < .25) setTimeout(() => { elm.classList.add('blink'); setTimeout(() => elm.classList.remove('blink'), 120); }, 180); loop(); }, 130); }, rr(2200, 5200)); })(); }
function lids(parent, list, color) { list.forEach(([l, t, w, h]) => { const d = el('div', 'lid', parent); d.style.cssText += `left:${l}%;top:${t}%;width:${w}%;height:${h}%;background:${color};border-bottom:calc(var(--u)*2.5) solid #5b3424`; }); }

/* play time */
let lastTick = Date.now();
setInterval(() => { const now = Date.now(), dt = now - lastTick; lastTick = now; if (document.visibilityState === 'visible' && ['bakery', 'result'].includes(curName) && dt < 60000) { D().playMs += dt; save(); } }, 15000);
const timeUp = () => S.settings.limit > 0 && D().playMs >= S.settings.limit * 60000;
function showTimeUp() {
  const { c, m } = modal(`<div class="row"><div class="face"><img src="${IMG.bearWow}" alt=""></div><div class="body"><h2>今天的冒險時間到囉！</h2><p>熊大廚說：今天你好努力！明天再來餐廳找我吧。</p></div></div><div class="actions"><button class="pill" data-a="ok">好的</button></div>`, { close: false });
  on(c, '[data-a=ok]', () => { closeModal(m); if (curName !== 'map') go('map', true); });
}

/* ---------- bunny sprite frames ---------- */
const FR_REF = { turn: 506, angry: 361, happy: 319, sad: 391, walk: 346 };
const FR_PX = { turn: [506,510,502,500,485,457,452,474], angry: [361,361,361,367,358,353], happy: [319,320,319,302,313,329], sad: [391,387,386,385,381,364], walk: [346,339,341,348,345,349] };
const frH = n => { if (ANIM_H[n]) return ANIM_H[n]; const [k, i] = n.split('_'); return FR_PX[k][+i] / FR_REF[k] * 100; };
const bunURL = n => (window.INLINE_IMG && window.INLINE_IMG['bun_' + n]) || vq(`img/bunny/${n}.webp`);
const ANIM_H = {"panda_0": 100.0, "panda_1": 99.6, "panda_2": 99.6, "panda_3": 100.0, "panda_4": 99.8, "panda_5": 99.8, "panda_6": 92.1, "panda_7": 100.0, "penguin_0": 100.0, "penguin_1": 99.8, "penguin_2": 100.0, "penguin_3": 100.2, "penguin_4": 100.7, "penguin_5": 100.2, "penguin_6": 94.0, "penguin_7": 100.7, "shiba_0": 100.0, "shiba_1": 101.1, "shiba_2": 94.7, "shiba_3": 99.8, "shiba_4": 104.7, "shiba_5": 102.4, "shiba_6": 95.1, "shiba_7": 100.0, "fawn_0": 100.0, "fawn_1": 99.3, "fawn_2": 98.9, "fawn_3": 95.5, "fawn_4": 101.6, "fawn_5": 99.6, "fawn_6": 94.6, "fawn_7": 101.1};
const ANIMALS = [
  { key: 'bunny', name: '魔法兔兔', short: '兔' }, { key: 'shiba', name: '柴犬', short: '柴' }, { key: 'panda', name: '熊貓', short: '熊貓' },
  { key: 'penguin', name: '企鵝', short: '企鵝' }, { key: 'fawn', name: '小鹿', short: '鹿' }
];
const animalOf = k => ANIMALS.find(a => a.key === k) || ANIMALS[0];
function POSE(k) {
  if (!k || k === 'bunny') return { idle: 'turn_0', walk: ['walk_1', 'walk_2', 'walk_3', 'walk_4', 'walk_5', 'walk_0'], back: 'turn_2', looks: ['turn_3', 'turn_7', 'turn_1'],
    cheer: ['happy_0', 'happy_1', 'happy_2', 'happy_3', 'happy_4', 'happy_5'], cheerMs: 140, oops: ['sad_0', 'sad_1'], cry: ['sad_2', 'sad_3', 'sad_4'], pout: ['angry_1', 'angry_3'], giggle: ['turn_7', 'turn_4', 'turn_3'], sideLeft: false };
  const f = i => k + '_' + i;
  return { idle: f(0), walk: [f(1)], back: f(2), looks: [f(3), f(7), f(1)], cheer: [f(4)], cheerMs: 1100, oops: [f(6)], cry: [f(6)], pout: [f(5)], giggle: [f(7), f(4), f(3)], sideLeft: true };
}
const poseFrames = P => Array.from(new Set([P.idle, ...P.walk, P.back, ...P.looks, ...P.cheer, ...P.oops, ...P.cry, ...P.pout, ...P.giggle]));
const isAnimFrame = n => /^(shiba|panda|penguin|fawn)_\d$/.test(n);
const frURL = n => isAnimFrame(n) ? ((window.INLINE_IMG && window.INLINE_IMG['an_' + n]) || vq(`img/animals/${n.split('_')[0]}/${n.split('_')[1]}.webp`)) : bunURL(n);
const animalImg = a => frURL(POSE(a).idle);
/* ---------- 換裝娃娃：用「動物穿上每件裝備」的原畫組合出角色 ---------- */
// img/doll/{動物}/hat_N.webp、cape_N.webp、base.webp 都放在同一張 420×520 畫布、腳底對齊。
// 戴帽子＝頭部用帽子那張，穿披風＝身體用披風那張，兩張在脖子處接起來；法杖用商店的法杖圖拿在手上。
const DOLL = { bunny: { neck: 60.5, bodyTop: 6.8 }, shiba: { neck: 61.7, bodyTop: 16.9 }, panda: { neck: 62.2, bodyTop: 23.4 }, penguin: { neck: 66.4, bodyTop: 23.6 }, fawn: { neck: 63.8, bodyTop: 22.4 } };
const DOLL_HAS = { bunny: ['hat', 'cape'], shiba: ['hat', 'cape'], panda: ['hat', 'cape'], penguin: ['hat', 'cape'], fawn: ['hat'] };
const dollURL = (an, f) => vq(`img/doll/${an}/${f}.webp`);
const spriteAnimal = names => names.includes('turn_0') ? 'bunny' : String(names[0]).split('_')[0];
const curEquip = () => (typeof S !== 'undefined' && S && S.equip) || {};
const wearing = eq => !!(eq.hat || eq.cape || eq.wand);
// 商店縮圖：有原畫的就顯示「自己的動物穿上它」
function itemThumb(cat, id) { const an = (KID && KID.animal) || 'bunny'; return (DOLL_HAS[an] || []).includes(cat) ? dollURL(an, id) : shopURL(id); }
function dollHTML(an, eq) {
  const D = DOLL[an] || DOLL.bunny, has = DOLL_HAS[an] || [];
  const hat = eq.hat && has.includes('hat') ? eq.hat : '', cape = eq.cape && has.includes('cape') ? eq.cape : '';
  const head = hat || cape || 'base', body = cape || hat || 'base';
  let h = '';
  if (head === body) h += `<img class="dl" src="${dollURL(an, head)}" alt="">`;
  else h += `<img class="dl" src="${dollURL(an, body)}" alt="" style="clip-path:inset(${D.neck}% 0 0 0)"><img class="dl" src="${dollURL(an, head)}" alt="" style="clip-path:inset(0 0 ${(100 - D.neck).toFixed(1)}% 0)">`;
  if (eq.cape && !cape) h += `<img class="dl-cape" src="${shopURL(eq.cape)}" alt="" style="top:${D.neck - 2}%">`; // 沒有原畫的動物：披風疊在身上
  if (eq.wand) h += `<img class="dl-wand" src="${shopURL(eq.wand)}" alt="">`;
  return h;
}
const SPRITES = new Set();
function dressAll() { SPRITES.forEach(sp => { if (!sp.root.isConnected) { SPRITES.delete(sp); return; } sp.dress(); }); }
function makeSprite(parent, names, eyeColor) {
  const root = el('div', 'sprite', parent); const fr = {};
  names.forEach(n => { const d = el('div', 'fr', root); d.style.height = frH(n) + '%'; const im = el('img', '', d); im.src = frURL(n); im.alt = ''; im.draggable = false; fr[n] = d;
    if (n === 'turn_0') lids(d, [[30, 38.3, 11, 7.6], [58.2, 38.3, 11, 7.2]], eyeColor || '#fdf4ef'); });
  let curN = null, timers = [];
  function show(n) { if (curN === n) return; if (curN) fr[curN].style.display = 'none'; fr[n].style.display = 'block'; curN = n; }
  function clear() { timers.forEach(clearTimeout); timers = []; }
  function play(seq, ms, hold, then) { clear(); seq.forEach((n, i) => timers.push(setTimeout(() => show(n), i * ms))); timers.push(setTimeout(() => { if (then) show(then); }, seq.length * ms + (hold || 0))); }
  // 有穿裝備：改用換裝娃娃（原畫組合）；沒穿：用原本會動的角色
  const an = spriteAnimal(names); let dollEl = null, sig0 = null;
  function dress() {
    const eq = curEquip(), on = wearing(eq), sig = on ? [an, eq.hat, eq.cape, eq.wand].join('|') : '';
    if (sig === sig0) return; sig0 = sig; root.classList.toggle('doll', on);
    if (!on) { if (dollEl) dollEl.style.display = 'none'; return; }
    if (!dollEl) { dollEl = el('div', 'dollbox', root); const D = DOLL[an] || DOLL.bunny, k = 82 / (97.7 - D.bodyTop); dollEl.style.height = (k * 100).toFixed(1) + '%'; dollEl.style.bottom = (-2.3 * k).toFixed(1) + '%'; }
    dollEl.style.display = ''; dollEl.innerHTML = dollHTML(an, eq);
  }
  dress();
  const api = { root, show, play, clear, dress, get cur() { return curN; } }; SPRITES.add(api);
  return api;
}

/* ================= MAP ================= */
const GS = WALK.g, GW = WALK.rows[0].length, GH = WALK.rows.length;
const walkable = (cx, cy) => cx >= 0 && cy >= 0 && cx < GW && cy < GH && WALK.rows[cy][cx] === '1';
function nearestCell(x, y) {
  const cx = Math.floor(x / GS), cy = Math.floor(y / GS);
  if (walkable(cx, cy)) return [cx, cy];
  for (let r = 1; r < 40; r++) { let best = null, bd = 1e9;
    for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) { if (Math.max(Math.abs(dx), Math.abs(dy)) !== r) continue; if (walkable(cx + dx, cy + dy)) { const d = dx * dx + dy * dy; if (d < bd) { bd = d; best = [cx + dx, cy + dy]; } } }
    if (best) return best; }
  return null;
}
// A* 尋路：用二元堆積，iPad 上拖曳時也不會卡
const NCELL = GW * GH, AG = new Float32Array(NCELL), AFROM = new Int32Array(NCELL), ASEEN = new Uint32Array(NCELL), ADONE = new Uint32Array(NCELL); let AGEN = 0;
function astar(a, b) {
  AGEN++; const gen = AGEN, sk = a[1] * GW + a[0], tk = b[1] * GW + b[0], bx = b[0], by = b[1];
  const hk = [], hf = [];
  const h = (x, y) => { const dx = Math.abs(x - bx), dy = Math.abs(y - by); return Math.max(dx, dy) + 0.414 * Math.min(dx, dy); };
  function push(k, f) { let i = hk.length; hk.push(k); hf.push(f); while (i > 0) { const p = (i - 1) >> 1; if (hf[p] <= f) break; hk[i] = hk[p]; hf[i] = hf[p]; i = p; } hk[i] = k; hf[i] = f; }
  function pop() { const top = hk[0], lk = hk.pop(), lf = hf.pop(), n = hk.length; if (n) { let i = 0; for (;;) { const l = 2 * i + 1, r = l + 1; let m = -1, mf = lf; if (l < n && hf[l] < mf) { m = l; mf = hf[l]; } if (r < n && hf[r] < mf) { m = r; mf = hf[r]; } if (m < 0) break; hk[i] = hk[m]; hf[i] = hf[m]; i = m; } hk[i] = lk; hf[i] = lf; } return top; }
  ASEEN[sk] = gen; AG[sk] = 0; AFROM[sk] = -1; push(sk, h(a[0], a[1]));
  while (hk.length) {
    const k = pop(); if (ADONE[k] === gen) continue; ADONE[k] = gen;
    if (k === tk) { const path = []; let c = k; while (c !== -1) { path.push([c % GW, Math.floor(c / GW)]); c = AFROM[c]; } return path.reverse(); }
    const x = k % GW, y = (k - x) / GW, gk = AG[k];
    for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) {
      if (!dx && !dy) continue; const nx = x + dx, ny = y + dy; if (!walkable(nx, ny)) continue;
      if (dx && dy && (!walkable(x + dx, y) || !walkable(x, y + dy))) continue;
      const nk = ny * GW + nx; if (ADONE[nk] === gen) continue; const ng = gk + (dx && dy ? 1.414 : 1);
      if (ASEEN[nk] !== gen || ng < AG[nk]) { ASEEN[nk] = gen; AG[nk] = ng; AFROM[nk] = k; push(nk, ng + h(nx, ny)); }
    }
  }
  return null;
}
function los(ax, ay, bx, by) { const d = Math.hypot(bx - ax, by - ay), n = Math.ceil(d / 6); for (let i = 0; i <= n; i++) { const x = ax + (bx - ax) * i / n, y = ay + (by - ay) * i / n; if (!walkable(Math.floor(x / GS), Math.floor(y / GS))) return false; } return true; }
function smooth(pts) { if (pts.length < 3) return pts; const out = [pts[0]]; let i = 0; while (i < pts.length - 1) { let j = pts.length - 1; while (j > i + 1 && !los(pts[i].x, pts[i].y, pts[j].x, pts[j].y)) j--; out.push(pts[j]); i = j; } return out; }

let mapUI = null;
function buildMap() {
  const s = screen('map', 'map');
  // ambient: trees, flags, lights, water
  [[262, 297, 183, 159], [679, 245, 120, 97], [0, 525, 148, 274, '0% 100%'], [0, 947, 183, 139, '0% 100%'], [747, 730, 120, 115], [1346, 787, 102, 194, '100% 100%'],
   [855, 382, 80, 92], [712, 672, 100, 92], [40, 110, 190, 230], [1180, 130, 160, 120], [420, 640, 90, 80]].forEach(t => patch(s, t[0], t[1], t[2], t[3], 'a-sway', t[4] || '50% 100%'));
  [[521, 468, 40, 60], [636, 421, 39, 54], [791, 406, 38, 54], [913, 478, 39, 64]].forEach(b => patch(s, ...b, 'a-flag', '50% 0%', 'rect'));
  patch(s, 778, 6, 40, 34, 'a-flag', '0% 50%', 'rect');
  patch(s, 955, 694, 260, 80, 'a-wave', '50% 0%', 'rect');
  patch(s, 672, 482, 136, 100, 'a-shimmer', '50% 50%', 'soft');
  [[522, 455], [557, 455], [637, 407], [670, 407], [790, 392], [825, 392], [915, 460], [950, 462], [577, 597], [862, 597], [245, 496], [317, 496], [1145, 440], [1004, 720], [1062, 704], [1112, 722], [1180, 712]].forEach(p => glow(s, p[0], p[1], 34));
  glow(s, 730, 455, 50, 'warm'); glow(s, 314, 217, 46, 'magic'); glow(s, 262, 300, 30, 'magic'); glow(s, 513, 82, 55, 'warm');
  [[700, 200, 32, 88], [1350, 172, 48, 104], [1338, 620, 44, 88], [186, 935, 72, 70], [1262, 405, 40, 50]].forEach(f => fallwater(s, ...f));
  [[700, 520], [760, 515], [728, 545], [1240, 470], [520, 70], [470, 200], [900, 260], [1200, 300], [310, 230], [600, 980], [1100, 1040]].forEach(p => twinkle(s, ...p));
  petals(s, 9);
  const bw = el('div', '', s); bw.style.cssText = 'position:absolute;left:0;top:0;width:1448px;height:1086px;transform-origin:0 0;pointer-events:none';
  scalers.push(bw);
  ['#ffd1e6', '#d8c4ff'].forEach((c, i) => {
    const b = el('div', 'butterfly', bw, ICON.fly(c)); b.style.width = '34px'; b.style.height = '28px';
    const d = i ? 'M300,560 C420,480 520,640 640,560 S860,500 980,620 S760,760 520,700 S260,640 300,560' : 'M1000,300 C1100,220 1220,320 1150,420 S960,520 900,420 S880,260 1000,300';
    b.style.offsetPath = `path('${d}')`;
    let t = Math.random(); const sp = 1 / rr(26, 34); let lt = 0;
    (function fly(now) { const dt = Math.min(.05, (now - lt) / 1000 || .016); lt = now; if (curName === 'map' && !document.hidden) { t = (t + sp * dt) % 1; b.style.offsetDistance = (t * 100) + '%'; } requestAnimationFrame(fly); })(0);
  });
  // walk layer
  const layer = el('div', 'walklayer', s);
  const places = [
    { name: '甜甜餐廳', box: [1061, 416, 251, 217], label: [1186, 636], open: true, go: 'bakery', door: [1095, 640] },
    { name: '星語魔法館', box: [394, 63, 245, 300], label: [516, 392], open: true, go: 'hall_chinese', door: [560, 400] },
    { name: '月光藥草館', box: [987, 148, 359, 230], label: [1166, 392], open: true, go: 'hall_science', door: [1065, 420] },
    { name: '星光市集', box: [870, 700, 370, 270], label: [1040, 990], open: true, go: 'hall_literacy', door: [990, 760] },
    { name: '家具店與裝備店', box: [1245, 725, 203, 250], label: [1330, 935], open: true, go: 'shop', door: [1010, 745] },
    { name: '小鳥音樂亭', box: [257, 650, 234, 240], label: [374, 900], open: true, go: 'music', door: [330, 680] },
    { name: '兔兔小屋', box: [97, 331, 251, 240], label: [222, 588], open: true, go: 'home', door: [300, 590] },
    { name: '魔王試煉塔', box: [759, 17, 140, 148], label: [826, 168], open: true, go: 'boss', door: [845, 190] },
    { name: '迷霧森林', box: [0, 150, 300, 170], label: [160, 292], open: true, go: 'forest', door: [120, 560] }
  ];
  for (const p of places) {
    const lab = el('div', 'plate' + (p.go === 'bakery' ? ' hero' : p.open ? '' : ' locked'), s, (p.open ? '' : ICON.lock) + esc(p.name) + (p.go === 'boss' ? '<small class="lvtag">Lv.3</small>' : '')); place(lab, p.label[0], p.label[1]);
    p.plate = lab;
  }
  // 點到建築物或名牌：走到門口再進去
  function placeAt(pt) {
    for (const p of places) { const r = p.plate.getBoundingClientRect(); if (!r.width) continue; const a = toStage({ clientX: r.left, clientY: r.top }), b = toStage({ clientX: r.right, clientY: r.bottom }); if (pt.x >= a.x - 8 && pt.x <= b.x + 8 && pt.y >= a.y - 8 && pt.y <= b.y + 8) return p; }
    for (const p of places) { const [x, y, w, h] = p.box; if (pt.x >= x && pt.x <= x + w && pt.y >= y && pt.y <= y + h) return p; }
    return null;
  }
  function visit(p) { SFX.tap(); walkTo(p.door[0], p.door[1], () => p.open ? enterPlace(p.go) : bunnySay(`${p.name}第二階段開放，敬請期待！`)); }
  // HUD (after layer so it sits on top)
  makeHUD(s, { face: [85, 77, 55], lv: [188, 66], xp: [226, 55, 218, 30], coin: [962, 38, 116, 46], avatar: [85, 77, 62], bag: [1190, 60, 46], settings: [1385, 60, 46] });
  rbtn(s, 1100, 60, 30, () => toast('去各館答題就能賺金幣喔！'), '賺金幣');
  rbtn(s, 1287, 60, 46, openBadges, '任務徽章');

  // the bunny (sprite animation + perspective)
  const BW = 120, BH = 136;
  const wk = el('div', 'walker', s); place(wk, 0, 0, BW, BH);
  wk.innerHTML = '<div class="persp"><div class="shadow"></div><div class="flip"><div class="wbody"></div></div></div>';
  const persp = wk.querySelector('.persp');
  let spr = null, P = POSE('bunny');
  function setAnimal(k) { P = POSE(k); const body = wk.querySelector('.wbody'); body.innerHTML = ''; spr = makeSprite(body, poseFrames(P)); spr.show(P.idle); wk.classList.toggle('single', P.walk.length === 1); }
  setAnimal('bunny'); blinker(wk);
  const say = el('div', 'say follow', s); say.style.display = 'none';
  const start = S.pos && walkable(Math.floor(S.pos[0] / GS), Math.floor(S.pos[1] / GS)) ? S.pos : [665, 890];
  const B = { x: start[0], y: start[1], path: [], onArrive: null, moving: false, k: 1 };
  const depth = y => 0.74 + 0.46 * Math.min(1, Math.max(0, (y - 170) / 820));
  function render() {
    B.k = depth(B.y); persp.style.transform = `scale(${B.k.toFixed(3)})`;
    wk.style.left = pctX(B.x - BW / 2); wk.style.top = pctY(B.y - BH + 4); wk.style.zIndex = 6;
    say.style.left = pctX(B.x); say.style.top = pctY(B.y - BH * B.k - 4);
  }
  render();
  let idleT = null;
  function idleLoop() { clearTimeout(idleT); idleT = setTimeout(() => { if (B.moving) return idleLoop(); const r = Math.random();
    if (r < 0.75) spr.play([P.looks[Math.floor(r / 0.25)]], 1300, 0, P.idle);
    idleLoop(); }, rr(5000, 9000)); }
  idleLoop();
  function cheer() { spr.play(P.cheer, P.cheerMs, 200, P.idle); }
  let sayT = null;
  function bunnySay(t) { say.textContent = t; say.style.display = 'block'; say.classList.remove('pop'); void say.offsetWidth; say.classList.add('pop'); clearTimeout(sayT); sayT = setTimeout(() => say.style.display = 'none', 3000); }
  let raf = null, last = 0, stepT = 0;
  function tick(t) { try { step(t); } catch (err) { B.path = []; B.moving = false; wk.classList.remove('walking'); raf = null; } }
  let walkF = 0, walkAcc = 0, dir = '';
  function setDir(d) { if (dir === d) return; dir = d; wk.classList.toggle('side', d === 'side'); wk.classList.toggle('vert', d !== 'side'); }
  function step(t) {
    const dt = Math.min(0.05, (t - last) / 1000 || 0.016); last = t;
    if (!B.path.length) { B.moving = false; wk.classList.remove('walking', 'side', 'vert'); dir = ''; spr.show(P.idle); raf = null; S.pos = [Math.round(B.x), Math.round(B.y)]; save(); const f = B.onArrive; B.onArrive = null; if (f) f(); return; }
    const tgt = B.path[0], dx = tgt.x - B.x, dy = tgt.y - B.y, d = Math.hypot(dx, dy), sp = 230 * dt * (0.75 + 0.25 * B.k);
    if (d > 0.5) {
      if (Math.abs(dx) >= 0.55 * Math.abs(dy)) { setDir('side'); wk.classList.toggle('left', P.sideLeft ? dx > 0 : dx < 0);
        walkAcc += dt; if (walkAcc > 0.095) { walkAcc = 0; walkF = (walkF + 1) % P.walk.length; spr.show(P.walk[walkF]); } if (P.walk.length === 1) spr.show(P.walk[0]); }
      else if (dy < 0) { setDir('up'); wk.classList.remove('left'); spr.show(P.back); }
      else { setDir('down'); wk.classList.remove('left'); spr.show(P.idle); }
    }
    if (d <= sp) { B.x = tgt.x; B.y = tgt.y; B.path.shift(); } else { B.x += dx / d * sp; B.y += dy / d * sp; }
    stepT += dt; if (stepT > .3) { stepT = 0; SFX.step(); }
    render(); raf = requestAnimationFrame(tick);
  }
  function walkTo(x, y, cb) {
    if (modalOpen()) return;
    const a = nearestCell(B.x, B.y), b = nearestCell(x, y);
    const cells = a && b ? astar(a, b) : null;
    if (!cells) { if (cb && cb !== checkDoor) cb(); else bunnySay('那邊過不去喔～走石板路吧！'); return; }
    let pts = cells.map(([cx, cy]) => ({ x: cx * GS + GS / 2, y: cy * GS + GS / 2 }));
    if (walkable(Math.floor(x / GS), Math.floor(y / GS))) pts.push({ x, y });
    pts = smooth([{ x: B.x, y: B.y }, ...pts]).slice(1);
    B.path = pts; B.onArrive = cb || null;
    // 如果動畫迴圈被 iPad 暫停（切換 App、跳出視窗），重新啟動它
    if (!B.moving || !raf || performance.now() - last > 300) { if (raf) cancelAnimationFrame(raf); B.moving = true; spr.clear(); wk.classList.add('walking'); last = performance.now(); raf = requestAnimationFrame(tick); }
    const end = pts[pts.length - 1] || { x: B.x, y: B.y };
    const r = el('div', 'ripple', s); r.style.left = pctX(end.x); r.style.top = pctY(end.y); setTimeout(() => r.remove(), 650);
  }
  // pointer: tap or drag to move（只跟著第一根手指，其他手指或手掌碰到不會干擾）
  let dragging = false, lastRe = 0, downAt = null, activeId = null, dragTgt = null;
  layer.addEventListener('pointerdown', e => {
    if (activeId !== null && activeId !== e.pointerId) return;
    const p = toStage(e); if (p.y < 130 && (p.x < 470 || p.x > 880)) return;
    e.preventDefault();
    dragging = true; downAt = p; dragTgt = null; activeId = e.pointerId; try { layer.setPointerCapture(e.pointerId); } catch (err) {}
    if (Math.hypot(p.x - B.x, p.y - (B.y - 65 * B.k)) < 62 * B.k) { if (!B.moving) cheer(); bunnySay(LINES()[rnd(LINES().length)]); SFX.ok(); return; }
    const pl = placeAt(p); if (pl) return visit(pl);
    walkTo(p.x, p.y, checkDoor);
  });
  layer.addEventListener('pointermove', e => {
    if (!dragging || e.pointerId !== activeId) return; const now = performance.now(); if (now - lastRe < 120) return;
    const p = toStage(e); if (downAt && Math.hypot(p.x - downAt.x, p.y - downAt.y) < 28) return;
    if (dragTgt && Math.hypot(p.x - dragTgt.x, p.y - dragTgt.y) < 24) return;
    lastRe = now; dragTgt = p; walkTo(p.x, p.y, checkDoor);
  });
  const up = e => { if (e && activeId !== null && e.pointerId !== activeId) return; dragging = false; activeId = null; };
  ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(t => layer.addEventListener(t, up));
  function checkDoor() { const d = places[0].door; if (Math.hypot(B.x - d[0], B.y - d[1]) < 45) enterBakery(); }
  const LINES = () => [`嗨 ${KID ? KID.nick : ''}！我是${title(S.level)}！`, '今天想去哪一館冒險呢？', `我已經有 ${S.coins} 枚金幣了！`, '點地圖，我就會走過去喔！', '答對題目，就能升級喔！'];
  mapUI = { bunnySay, B, reset() { const p = S.pos && walkable(Math.floor(S.pos[0] / GS), Math.floor(S.pos[1] / GS)) ? S.pos : [665, 890]; B.path = []; B.x = p[0]; B.y = p[1]; setAnimal(KID ? KID.animal : 'bunny'); render(); } };
  onShow.map = () => { setTimeout(() => bunnySay(LINES()[rnd(3)]), 500); };
}
const modalOpen = () => !!stage.querySelector('.modal');

/* ================= RESTAURANT (bakery + quiz) ================= */
let bakeryUI = null;
let R = null;
function buildBakery() {
  const s = screen('bakery', 'bakery');
  // ambience
  const rays = el('div', 'rays', s); place(rays, 60, 90, 760, 900);
  for (let i = 0; i < 14; i++) { const m = el('div', 'mote', s); place(m, rr(120, 600), rr(380, 820)); m.style.animationDuration = rr(6, 11).toFixed(1) + 's'; m.style.animationDelay = (-rr(0, 10)).toFixed(1) + 's'; }
  patch(s, 476, 268, 196, 112, 'a-flame', '50% 100%', 'soft');
  glow(s, 573, 330, 150, 'warm'); glow(s, 573, 330, 90, 'warm');
  patch(s, 688, 0, 94, 156, 'a-swing', '50% 0%', 'rect'); glow(s, 735, 100, 95, 'warm');
  [[0, 875, 175, 211, '0% 100%'], [1175, 860, 273, 226, '100% 100%'], [330, 0, 180, 130, '50% 0%'], [0, 90, 95, 160, '0% 0%'], [1020, 90, 120, 120, '50% 0%'], [740, 120, 110, 120, '50% 0%']].forEach(t => patch(s, t[0], t[1], t[2], t[3], 'a-sway', t[4]));
  [[0, 0], [1, 0], [2, 0]].forEach((_, i) => { const st = el('div', 'steam', s); place(st, 770 + i * 60, 250); st.style.animationDelay = (-i * 1).toFixed(1) + 's'; st.style.animationDuration = rr(2.6, 3.6).toFixed(1) + 's'; });
  [[577, 200], [480, 820], [705, 820], [930, 820], [1150, 410], [1390, 410], [1140, 500], [810, 370]].forEach(p => twinkle(s, ...p));
  // bear
  const bear = el('div', 'actor bear', s); place(bear, 30, 238, 390, 451);
  bear.innerHTML = `<div class="body"><img src="${npcURL('bear_full')}" alt="熊大廚"></div>`;
  // bunny (sprite reactions)
  const bun = el('div', 'actor bunbox', s); place(bun, 1190, 720, 250, 330);
  const bodyB = el('div', 'body', bun);
  let bspr = null, BP = POSE('bunny');
  function setBunAnimal(k) { BP = POSE(k); bodyB.innerHTML = ''; bspr = makeSprite(bodyB, poseFrames(BP)); bspr.show(BP.idle); }
  setBunAnimal('bunny'); blinker(bun);
  const bunReact = {
    happy: () => bspr.play(BP.cheer, BP.cheerMs === 140 ? 150 : 1200, 500, BP.idle),
    oops: () => bspr.play(BP.oops, BP.oops.length > 1 ? 260 : 1300, BP.oops.length > 1 ? 1200 : 0, BP.idle),
    cry: () => bspr.play(BP.cry, BP.cry.length > 1 ? 420 : 1800, BP.cry.length > 1 ? 700 : 0, BP.idle),
    pout: () => bspr.play(BP.pout, BP.pout.length > 1 ? 520 : 1300, BP.pout.length > 1 ? 600 : 0, BP.idle),
    giggle: () => bspr.play([BP.giggle[rnd(BP.giggle.length)]], 1300, 0, BP.idle)
  };
  // HUD
  kitHUD(s, { home: () => { if (R) confirmQuit(); else go('map', true); } });
  const starBadge = el('div', 'badge', s); place(starBadge, -300, -300);
  const starHot = rbtn(s, -300, -300, 10, () => toast(`你已經收集了 ${S.stars} 顆星星！`), '星星');
  const hint = kitBtn(s, 'ic_bulb', 1100, 560, 120, 96, () => {}, '提示'); hint.setAttribute('aria-label', '提示'); hint.style.display = 'none';
  hint.addEventListener('click', () => { if (R && R.q) { R.hinted = true; const h = R.q.hint || '慢慢想，你一定可以的！'; bearSay(h, IMG.bearThink); readHint(h); } });
  const bTts = ttsButton(s, () => { if (R && R.q) readQuestion(R.q.stem, R.q.type === '選擇問答' ? R.opts : []); }); place(bTts, 1000, 540, 76, 76); bTts.style.display = 'none';
  const back = el('button', 'backpill', s, ICON.back + '<span>回地圖</span>'); place(back, 22, 182); back.setAttribute('aria-label', '返回');
  back.addEventListener('click', () => { SFX.tap(); if (R) confirmQuit(); else go('map', true); });
  // board, counter, bubble
  const board = el('div', 'board', s); place(board, 1124, 210, 291, 205);
  const mapBtn = el('button', 'pill purple small unitbtn', s, '甜點單元地圖'); place(mapBtn, 1130, 430, 280, 66); mapBtn.addEventListener('click', () => { SFX.tap(); if (!R) go('mathmap', true); });
  const counter = el('div', 'counter', s); place(counter, 342, 532, 742, 162);
  const bubble = el('div', 'bubble2 hide', s); place(bubble, 395, 150, 400);
  let bT = null;
  function bearSay(t, face, ms = 4200) { bubble.innerHTML = (face ? `<img src="${face}" alt="">` : '') + `<span>${esc(t)}</span>`; bubble.classList.remove('hide', 'pop'); void bubble.offsetWidth; bubble.classList.add('pop'); clearTimeout(bT); if (ms) bT = setTimeout(() => bubble.classList.add('hide'), ms); }
  function act(who, cls) { who.classList.remove('cheer', 'no'); void who.offsetWidth; who.classList.add(cls); setTimeout(() => who.classList.remove(cls), 900); }
  // three buttons
  const btns = STAGES.map((st, i) => btn(s, 'stagebtn kp' + i, ...st.box, () => onBtn(i), st.name));
  const keyrow = el('div', 'cover keyrow', s); place(keyrow, 285, 896, 880, 170); keyrow.style.display = 'none';
  const tiles = el('div', 'ctiles', s); place(tiles, 345, 528, 738, 172); tiles.style.display = 'none';
  const greet = ['歡迎光臨甜甜餐廳！\n今天想挑戰哪一種點心呢？', '數學就像做蛋糕，\n一步一步來就會成功喔！', '答對題目，\n就能拿到金幣和經驗值！', '不會的題目可以按右上角的燈泡，\n我會給你提示。'];
  let gi = 0;
  btn(s, 'hot rect', 80, 210, 320, 480, () => { act(bear, 'cheer'); if (!R) { gi = (gi + 1) % greet.length; counter.textContent = greet[gi]; } else bearSay(['加油！', '你做得很好！', '慢慢想沒關係～'][rnd(3)], IMG.bearHappy, 1800); }, '熊大廚');
  btn(s, 'hot rect', 1200, 730, 230, 320, () => { bunReact.giggle(); SFX.ok(); }, '兔兔');

  function menu() {
    R = null; TTS.stop(); mapBtn.style.display = ''; hint.style.display = 'none'; bTts.style.display = 'none'; starHot.style.display = ''; starBadge.style.display = '';
    back.querySelector('span').textContent = '回地圖';
    keyrow.style.display = 'none'; tiles.style.display = 'none'; counter.className = 'counter'; counter.style.display = '';
    counter.textContent = greet[gi];
    starBadge.textContent = S.stars;
    const next = STAGES.find(st => st.unlock > S.level);
    board.innerHTML = `<h3>今日菜單</h3><p>${esc(KID ? KID.nick : '')} Lv.${S.level}</p><p>金幣 ${S.coins}　星星 ${S.stars}</p>${S.focus ? `<p class="small">今日加強：${esc(S.focus)}</p>` : ''}<p class="small">${next ? `升到 Lv.${next.unlock} 開放「${next.name}」` : '所有關卡都開放了！'}</p>`;
    btns.forEach((b, i) => { const st = STAGES[i], ok = S.level >= st.unlock; b.className = 'stagebtn kp' + i + (ok ? '' : ' locked'); b.style.display = ''; place(b, ...st.box);
      b.innerHTML = `${st.name}<small>${ok ? starStr(st.stars) : ICON.lock + ' Lv.' + st.unlock + ' 開放'}</small>`; });
  }
  function boardQuiz() {
    const dots = R.qs.map((_, i) => `<i class="${i < R.i ? (R.results[i] ? 'done' : 'miss') : i === R.i ? 'now' : ''}"></i>`).join('');
    board.innerHTML = `<div class="mini"><h3>${esc(R.st.name)}</h3><p>第 ${R.i + 1} / ${R.qs.length} 題</p><div class="dots">${dots}</div><p class="small">金幣 ${S.coins}　${starStr(R.q.diff)}</p></div>`;
  }
  function startRound(st) {
    if (S.level < st.unlock) { bearSay(`升到 Lv.${st.unlock} 就能挑戰「${st.name}」囉！`, IMG.bearWow, 2600); return; }
    if (timeUp()) return showTimeUp();
    if (!BANK.length) { toast('題庫還沒準備好，請稍後再試。'); return; }
    R = { st, qs: buildRound(st), i: 0, first: 0, coins: 0, xp: 0, results: [] };
    lastRetry = () => { go('bakery'); startRound(st); }; lastBack = st.units || st.key ? 'mathmap' : 'bakery';
    mapBtn.style.display = 'none'; hint.style.display = ''; bTts.style.display = ''; starHot.style.display = 'none'; starBadge.style.display = 'none'; back.querySelector('span').textContent = '離開關卡';
    act(bear, 'cheer'); bearSay('好！我們開始吧！', IMG.bearHappy, 1800);
    showQ();
  }
  function showQ() {
    const q = R.qs[R.i]; R.q = q; R.tries = 0; R.done = false; R.hinted = false; R.qStart = Date.now(); TTS.stop();
    boardQuiz(); keyrow.style.display = 'none'; tiles.style.display = 'none'; tiles.innerHTML = ''; keyrow.innerHTML = '';
    counter.className = 'counter quiz'; counter.style.display = '';
    const len = q.stem.length;
    counter.innerHTML = `<div class="q ${len > 34 ? 'long' : len > 16 ? 'mid' : ''}">${esc(q.stem)}</div>`;
    if (q.type === '數字輸入') renderKeypad(q); else if (q.type === '配對消除') renderMatch(q); else renderOptions(q);
  }
  function renderOptions(q) {
    const wrong = shuffle(q.options.filter(o => o !== q.answer)).slice(0, 2);
    R.opts = shuffle([q.answer, ...wrong]);
    btns.forEach((b, i) => { const o = R.opts[i]; b.style.display = o ? '' : 'none'; b.className = 'stagebtn kp' + i + ' opt3' + (o && o.length > 7 ? ' long' : ''); b.innerHTML = o ? esc(o) : ''; });
  }
  function onBtn(i) {
    if (!R) return startRound(STAGES[i]);
    const q = R.q; if (R.done || q.type !== '選擇問答') return;
    const b = btns[i], o = R.opts[i]; if (b.classList.contains('bad')) return;
    if (o === q.answer) { b.classList.add('ok'); b.insertAdjacentHTML('beforeend', `<span class="mk">${ICON.check}</span>`); answer(true); }
    else {
      b.classList.add('bad'); b.insertAdjacentHTML('beforeend', `<span class="mk">${ICON.cross}</span>`); R.tries++; SFX.bad();
      if (R.tries >= 2 || R.opts.length - R.tries <= 1) { bunReact.cry(); btns[R.opts.indexOf(q.answer)].classList.add('ok'); answer(false); }
      else { bunReact.oops(); bearSay('再想一想～可以按右上角的燈泡看提示喔！', IMG.bearThink); }
    }
  }
  function renderKeypad(q) {
    btns.forEach(b => b.style.display = 'none');
    counter.insertAdjacentHTML('beforeend', '<div class="ansrow"><div class="answerbox">&nbsp;</div></div>');
    const box = counter.querySelector('.answerbox'); let val = '';
    keyrow.style.display = '';
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'del', 'ok'].forEach(k => {
      const b = el('button', 'key' + (k === 'ok' ? ' ok' : k === 'del' ? ' del' : ''), keyrow, k === 'del' ? ICON.del : k === 'ok' ? '確定' : k);
      b.setAttribute('aria-label', k === 'del' ? '刪除' : k === 'ok' ? '確定' : k);
      b.addEventListener('click', () => {
        if (R.done) return; SFX.tap();
        if (k === 'del') val = val.slice(0, -1);
        else if (k === 'ok') {
          if (!val) return;
          if (val === q.answer) { box.classList.add('ok'); answer(true); return; }
          R.tries++; SFX.bad(); (R.tries >= 2 ? bunReact.cry : bunReact.oops)(); box.classList.remove('bad'); void box.offsetWidth; box.classList.add('bad');
          if (R.tries >= 2) { box.textContent = q.answer; answer(false); return; }
          bearSay('不太對喔！再算一次，也可以按燈泡看提示。', IMG.bearThink); val = '';
        } else if (val.length < 6) val += k;
        box.textContent = val || '\u00a0';
      });
    });
  }
  function renderMatch(q) {
    btns.forEach(b => b.style.display = 'none'); counter.style.display = 'none'; tiles.style.display = '';
    bearSay('點一張算式卡，再點它的答案卡，配對成功就會消失！', IMG.bearHappy, 5000);
    const list = shuffle(q.pairs.flatMap((p, i) => [{ t: p[0], k: i, ans: false }, { t: p[1], k: i, ans: true }]));
    let sel = null, left = q.pairs.length, miss = 0;
    list.forEach(t => {
      const b = el('button', 'tile' + (t.ans ? ' ans' : ''), tiles, esc(t.t)); t.b = b;
      b.addEventListener('click', () => {
        if (R.done || b.classList.contains('gone')) return; SFX.tap();
        if (!sel) { sel = t; b.classList.add('sel'); return; }
        if (sel === t) { b.classList.remove('sel'); sel = null; return; }
        if (sel.k === t.k && sel.ans !== t.ans) { SFX.star(); sel.b.classList.add('gone'); b.classList.add('gone'); sel = null; left--; if (!left) { R.tries = miss > 1 ? 1 : 0; answer(miss <= 1, true); } }
        else { miss++; SFX.bad(); bunReact.pout(); const s2 = sel; s2.b.classList.remove('sel'); [s2.b, b].forEach(x => { x.classList.remove('bad'); void x.offsetWidth; x.classList.add('bad'); }); sel = null; bearSay('這兩張不是一對喔，再試試看！', IMG.bearThink, 2200); }
      });
    });
  }
  function answer(right, isMatch) {
    const q = R.q; R.done = true;
    const firstTry = right && R.tries === 0;
    const coins = right ? (firstTry ? q.coins : Math.ceil(q.coins / 2)) : 0;
    const xp = right ? (firstTry ? q.diff * 5 : Math.ceil(q.diff * 5 / 2)) : 0;
    R.results[R.i] = firstTry; if (firstTry) R.first++; R.coins += coins; R.xp += xp;
    if (KID) BE.logAnswer(KID.id, { qid: q.id, unit: q.unit || '', subj: q.subject || '數學', diff: q.diff, first: firstTry, right, tries: R.tries, hint: !!R.hinted, ms: Date.now() - (R.qStart || Date.now()), t: Date.now(), match: !!isMatch }).catch(() => {});
    (q.src || [q.id]).forEach(id => { const st = S.stats[id] || (S.stats[id] = { r: 0, w: 0, n: 0, unit: q.unit }); st.n++; if (firstTry) st.r++; else st.w++; });
    if (!firstTry && !isMatch) { S.wrongLog.unshift({ id: q.id, t: Date.now() }); S.wrongLog = S.wrongLog.slice(0, 40); }
    if (right) { D().correct++; addCoins(coins); addXP(xp); SFX.ok(); setTimeout(SFX.coin, 250); floatText(`+${coins} 金幣`, 1270, 360); act(bear, 'cheer'); bunReact.happy(); bearSay(firstTry ? ['太棒了！', '答對了！好厲害！', '完全正確！'][rnd(3)] : '答對了！下次一定可以一次就對！', IMG.bearHappy, 1800); }
    else { save(); bearSay('沒關係，我們一起看看怎麼算！', IMG.bearThink, 1800); }
    refreshHUD(); boardQuiz();
    setTimeout(() => showExplain(q, right, firstTry, coins, xp), right ? 900 : 1000);
  }
  function showExplain(q, right, firstTry, coins, xp) {
    const last = R.i === R.qs.length - 1;
    const { c, m } = modal(`<div class="row"><div class="face"><img src="${right ? IMG.bearHappy : IMG.bearThink}" alt=""></div><div class="body"><h2>${right ? (firstTry ? '答對了！' : '答對囉！') : '一起來看看'}</h2>` +
      (right ? `<div class="gainline">${icon('coin', 'coin')}+${coins}　${icon('gem', 'coin')}+${xp} 經驗</div>` : '') + (q.type === '配對消除' ? '' : `<div class="ans">答案：${esc(q.answer)}</div>`) +
      `<div class="explain">${esc(q.explain || '仔細看題目，一步一步算就對了！')}</div></div></div><div class="actions"><button class="pill" data-a="next">${last ? '看結果' : '下一題'}</button></div>`, { close: false, wide: true }); Music.duck(true);
    on(c, '[data-a=next]', () => { closeModal(m); Music.duck(false); R.i++; if (R.i >= R.qs.length) finishRound(); else showQ(); });
  }
  function confirmQuit() {
    const { c, m } = modal(`<div class="row"><div class="face"><img src="${IMG.bearWow}" alt=""></div><div class="body"><h2>要離開關卡嗎？</h2><p>現在是第 ${R.i + 1} 題，共 ${R.qs.length} 題。離開的話，這一回合不會拿到星星喔。</p></div></div><div class="actions"><button class="pill" data-a="stay">繼續答題</button><button class="pill cream" data-a="quit">離開關卡</button></div>`, { close: false, wide: true });
    on(c, '[data-a=stay]', () => closeModal(m));
    on(c, '[data-a=quit]', () => { closeModal(m); menu(); bearSay('休息一下也很好，等你回來喔！', IMG.bearHappy, 2400); });
  }
  bakeryUI = { setAnimal: setBunAnimal, refresh() { if (!R) menu(); else boardQuiz(); starBadge.textContent = S.stars; }, menu, startRound, bearSay };
  onShow.bakery = () => { if (!R) { menu(); setTimeout(() => { if (!R) bearSay('歡迎光臨！選一個點心關卡吧！', IMG.bearHappy, 2600); }, 500); } };
}
function enterPlace(k) { if (k === 'bakery') return enterBakery(); if (timeUp()) return showTimeUp(); SFX.door(); go(k, true); }
function enterBakery() { if (timeUp()) return showTimeUp(); SFX.door(); go('bakery', true); }

/* ================= SUBJECT HALLS / MATH MAP / BOSS / FOREST ================= */
let lastRetry = null, lastBack = 'bakery';
const unitKey = (subj, unit) => subj + '|' + unit;
const unitsOf = subj => Array.from(new Set(BANK.filter(q => (q.subject || '數學') === subj).map(q => q.unit)));
function toMC(q) {
  if (q.type !== '數字輸入') return q;
  const a = +q.answer, set = new Set([String(a)]);
  for (const d of shuffle([1, -1, 10, -10, 2, -2, 5, 100])) { if (set.size >= 4) break; const v = a + d; if (v >= 0) set.add(String(v)); }
  return Object.assign({}, q, { type: '選擇問答', options: shuffle(Array.from(set)) });
}
function scoreQ(q, right, tries, isMatch) {
  const firstTry = right && tries === 0;
  const coins = right ? (firstTry ? q.coins : Math.ceil(q.coins / 2)) : 0;
  const xp = right ? (firstTry ? q.diff * 5 : Math.ceil(q.diff * 5 / 2)) : 0;
  if (KID) BE.logAnswer(KID.id, { qid: q.id, unit: q.unit || '', subj: q.subject || '數學', diff: q.diff, first: firstTry, right, tries, hint: false, ms: 0, t: Date.now(), match: !!isMatch }).catch(() => {});
  const st = S.stats[q.id] || (S.stats[q.id] = { r: 0, w: 0, n: 0, unit: q.unit }); st.n++; if (firstTry) st.r++; else st.w++;
  if (!firstTry && !isMatch) { S.wrongLog = S.wrongLog.filter(w => w.id !== q.id); S.wrongLog.unshift({ id: q.id, t: Date.now() }); S.wrongLog = S.wrongLog.slice(0, 60); }
  if (right) { D().correct++; addCoins(coins); addXP(xp); SFX.ok(); setTimeout(SFX.coin, 250); } else { save(); }
  refreshHUD();
  return { firstTry, coins, xp };
}
function explainModal(q, right, sc, lastQ, onNext, face) {
  const { c, m } = modal(`<div class="row"><div class="face"><img src="${face || (right ? IMG.bearHappy : IMG.bearThink)}" alt=""></div><div class="body"><h2>${right ? (sc.firstTry ? '答對了！' : '答對囉！') : '一起來看看'}</h2>` +
    (right && sc.coins ? `<div class="gainline">${icon('coin', 'coin')}+${sc.coins}　${icon('gem', 'coin')}+${sc.xp} 經驗</div>` : '') + (q.type === '配對消除' ? '' : `<div class="ans">答案：${esc(q.answer.split('|').join(' → '))}</div>`) +
    `<div class="explain">${esc(q.explain || '仔細看題目，一步一步想就對了！')}</div></div></div><div class="actions"><button class="pill" data-a="next">${lastQ ? '看結果' : '下一題'}</button></div>`, { close: false, wide: true });
  Music.duck(true);
  on(c, '[data-a=next]', () => { closeModal(m); Music.duck(false); onNext(); });
}
/* a reusable question renderer — one module per 題型. cfg: {s, panel, opts|null, area, say(text, kind)} */
/* ---------- 語音朗讀：題目、選項、提示 ---------- */
const TTS = (() => {
  const ok = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  let voice = null;
  function pick() { if (!ok) return; const vs = speechSynthesis.getVoices(); voice = vs.find(v => /zh[-_]TW/i.test(v.lang)) || vs.find(v => /zh[-_](HK|Hant)/i.test(v.lang)) || vs.find(v => /^zh/i.test(v.lang)) || null; }
  if (ok) { pick(); speechSynthesis.onvoiceschanged = pick; }
  // 把算式符號換成念得出來的字
  function clean(t) {
    return String(t || '').replace(/[×xX＊*](?=\s*\d)/g, '乘以').replace(/×/g, '乘以').replace(/[÷]/g, '除以').replace(/[＝=]/g, '等於')
      .replace(/＋|\+/g, '加').replace(/(\d)\s*[－−-]\s*(\d)/g, '$1減$2').replace(/[□＿_]{1,}|（\s*）|\(\s*\)/g, '空格').replace(/\|/g, '，').replace(/\n/g, '。');
  }
  function stop() { if (ok) { try { speechSynthesis.cancel(); } catch (e) {} } Music.duck(false); }
  function say(text) {
    if (!ok || !text) return false; stop();
    const u = new SpeechSynthesisUtterance(clean(text)); u.lang = voice ? voice.lang : 'zh-TW'; if (voice) u.voice = voice; u.rate = 0.88; u.pitch = 1.05;
    u.onend = u.onerror = () => Music.duck(false); Music.duck(true); speechSynthesis.speak(u); return true;
  }
  return { ok, say, stop };
})();
const NUMS = ['一', '二', '三', '四', '五', '六'];
function readQuestion(stem, opts) {
  const t = stem + (opts && opts.length ? '。選項有：' + opts.map((o, i) => `第${NUMS[i]}個，${o}`).join('。') + '。' : '');
  if (!TTS.say(t)) toast('這台裝置不支援語音朗讀');
}
function readHint(h) { TTS.say('提示：' + h); }
function ttsButton(parent, onTap) { const b = el('button', 'ttsbtn', parent, ICON.speaker); b.setAttribute('aria-label', '聽題目'); b.addEventListener('pointerdown', e => e.stopPropagation()); b.addEventListener('click', e => { e.stopPropagation(); SFX.tap(); onTap(); }); return b; }

function makeQuiz(cfg) {
  const s = cfg.s;
  const qbox = el('div', 'hq', s); place(qbox, ...cfg.panel);
  const optBtns = (cfg.opts || []).map(bx => { const b = el('button', 'hopt', s); place(b, ...bx); b.style.display = 'none'; return b; });
  const area = el('div', 'harea', s); place(area, ...cfg.area); area.style.display = 'none';
  let cur = null;
  function clear() { qbox.innerHTML = ''; area.innerHTML = ''; area.style.display = 'none'; area.className = 'harea'; optBtns.forEach(b => { b.style.display = 'none'; b.className = 'hopt'; b.innerHTML = ''; b.onclick = null; }); }
  // drag helper: follows the finger, calls onDrop(targetElement, x) when released
  function draggable(elm, onDrop, onTap) {
    elm.addEventListener('pointerdown', e => {
      if (cur.done) return; e.preventDefault();
      const r0 = elm.getBoundingClientRect(), ghost = elm.cloneNode(true); ghost.classList.add('ghost');
      Object.assign(ghost.style, { position: 'fixed', left: r0.left + 'px', top: r0.top + 'px', width: r0.width + 'px', height: r0.height + 'px', zIndex: 99, pointerEvents: 'none', margin: 0 });
      document.body.appendChild(ghost); elm.classList.add('lift');
      const dx = e.clientX - r0.left, dy = e.clientY - r0.top, sx = e.clientX, sy = e.clientY;
      const mv = ev => { ghost.style.left = (ev.clientX - dx) + 'px'; ghost.style.top = (ev.clientY - dy) + 'px'; };
      const up = ev => {
        removeEventListener('pointermove', mv); removeEventListener('pointerup', up); ghost.remove(); elm.classList.remove('lift');
        if (Math.hypot(ev.clientX - sx, ev.clientY - sy) < 8) { if (onTap) onTap(); return; }
        const t = document.elementFromPoint(ev.clientX, ev.clientY); onDrop(t, ev.clientX);
      };
      addEventListener('pointermove', mv); addEventListener('pointerup', up);
    });
  }
  function show(q, onDone, extraHead) {
    clear(); cur = { q, tries: 0, done: false };
    const kind = q.type === '情境素養' ? (q.options && q.options.length ? '選擇問答' : '數字輸入') : (q.type === '數字輸入' && cfg.noKeypad ? '選擇問答' : q.type);
    const qq = kind === '選擇問答' && q.type === '數字輸入' ? toMC(q) : q;
    let stemHTML = esc(q.stem);
    if (q.type === '情境素養' && q.stem.includes('\n')) { const i = q.stem.lastIndexOf('\n'); stemHTML = `<span class="passage">${esc(q.stem.slice(0, i))}</span><b class="qline">${esc(q.stem.slice(i + 1))}</b>`; }
    const len = q.stem.length;
    qbox.innerHTML = `<div class="hmeta">${extraHead ? esc(extraHead) + '　' : ''}${esc(q.unit || '')}　<span class="stars">${starStr(q.diff)}</span></div><div class="htext ${len > 60 ? 'xl' : len > 30 ? 'long' : len > 16 ? 'mid' : ''}">${stemHTML}</div>`;
    TTS.stop(); cur.readOpts = [];
    ttsButton(qbox, () => readQuestion(q.stem, cur.readOpts));
    const finish = (right, isMatch) => { cur.done = true; onDone(q, right, cur.tries, isMatch); };
    const wrongOnce = () => { cur.tries++; SFX.bad(); cfg.say('再想一想～可以按提示喔！', 'oops'); };
    const lastTry = () => cur.tries >= 1;
    if (kind === '選擇問答') {
      const opts = shuffle(qq.options).slice(0, 4); cur.readOpts = opts;
      const useBaked = optBtns.length && opts.length <= optBtns.length;
      let btns;
      if (useBaked) { btns = optBtns.slice(0, opts.length); optBtns.forEach((b, i) => { b.style.display = ''; b.classList.add('kp' + i); if (i >= opts.length) b.className = 'hopt off'; }); }
      else { area.style.display = ''; area.className = 'harea pills'; btns = opts.map((o, i) => el('button', 'hpill kp' + i, area)); }
      btns.forEach((b, i) => {
        const o = opts[i]; b.innerHTML = esc(o); if (o.length > 8) b.classList.add('long');
        b.onclick = () => {
          if (cur.done || b.classList.contains('bad')) return;
          if (o === qq.answer) { b.classList.add('ok'); finish(true); }
          else { b.classList.add('bad'); if (lastTry() || opts.length <= 2) { cur.tries++; SFX.bad(); btns.find(x => x.textContent === qq.answer).classList.add('ok'); finish(false); } else wrongOnce(); }
        };
      });
    } else if (kind === '數字輸入') {
      area.style.display = ''; area.className = 'harea keys';
      qbox.insertAdjacentHTML('beforeend', '<div class="answerbox small">&nbsp;</div>'); const box = qbox.querySelector('.answerbox'); let val = '';
      ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'del', 'ok'].forEach(k => {
        const b = el('button', 'key' + (k === 'ok' ? ' ok' : k === 'del' ? ' del' : ''), area, k === 'del' ? ICON.del : k === 'ok' ? '確定' : k);
        b.onclick = () => { if (cur.done) return; SFX.tap();
          if (k === 'del') val = val.slice(0, -1);
          else if (k === 'ok') { if (!val) return; if (val === q.answer) { box.classList.add('ok'); return finish(true); }
            if (lastTry()) { cur.tries++; SFX.bad(); box.textContent = q.answer; return finish(false); } wrongOnce(); box.classList.remove('bad'); void box.offsetWidth; box.classList.add('bad'); val = ''; }
          else if (val.length < 6) val += k;
          box.textContent = val || '\u00a0'; };
      });
    } else if (kind === '排序') {
      // 拖拉排順序：卡片排成一列，拖到想要的位置；排好按「確定」
      area.style.display = ''; area.className = 'harea sorter';
      const row = el('div', 'htiles', area), bar = el('div', 'hbar', area);
      let order = shuffle(q.options.slice()); if (order.join('|') === q.answer) order.reverse();
      el('span', 'tip', bar, '把卡片拖到正確的位置'); const ok = el('button', 'pill small', bar, '確定');
      function draw() {
        row.innerHTML = '';
        order.forEach((t, i) => { const b = el('button', 'htile', row, `<i>${i + 1}</i>${esc(t)}`); b.dataset.i = i;
          draggable(b, (target, x) => { const tile = target && target.closest && target.closest('.htile'); if (!tile || !row.contains(tile)) return; let j = +tile.dataset.i; const r = tile.getBoundingClientRect(); if (x > r.left + r.width / 2) j++; const item = order.splice(i, 1)[0]; if (j > i) j--; order.splice(j, 0, item); SFX.tap(); draw(); }); });
      }
      ok.onclick = () => { if (cur.done) return; if (order.join('|') === q.answer) return finish(true); if (lastTry()) { cur.tries++; SFX.bad(); order = q.answer.split('|'); draw(); return finish(false); } wrongOnce(); row.classList.add('bad'); setTimeout(() => row.classList.remove('bad'), 500); };
      draw();
    } else if (kind === '拖拉放置') {
      // 把卡片拖進上方的空格（也可以點卡片放進下一個空格，點空格把卡片拿回來）
      area.style.display = ''; area.className = 'harea sorter';
      const items = q.options.slice(), n = q.answer.split('|').length;
      const slotsEl = el('div', 'hslots', qbox), pool = el('div', 'htiles', area), bar = el('div', 'hbar', area);
      el('span', 'tip', bar, '把卡片拖進上面的空格'); const ok = el('button', 'pill small', bar, '確定');
      let slots = Array(n).fill(null);
      function draw() {
        slotsEl.innerHTML = ''; slots.forEach((t, i) => { const d = el('div', 'hslot' + (t ? ' full' : ''), slotsEl, t ? esc(t) : ''); d.dataset.s = i; d.onclick = () => { if (cur.done || !t) return; slots[i] = null; SFX.tap(); draw(); }; });
        pool.innerHTML = ''; items.filter(t => !slots.includes(t)).forEach(t => { const b = el('button', 'htile', pool, esc(t));
          draggable(b, target => { const sl = target && target.closest && target.closest('.hslot'); if (!sl) return; const i = +sl.dataset.s; slots[i] = t; SFX.tap(); draw(); },
            () => { const i = slots.indexOf(null); if (i >= 0) { slots[i] = t; SFX.tap(); draw(); } }); });
      }
      ok.onclick = () => { if (cur.done) return; if (slots.includes(null)) return cfg.say('還有空格沒放喔！', 'hi', 1500);
        if (slots.join('|') === q.answer) return finish(true); if (lastTry()) { cur.tries++; SFX.bad(); slots = q.answer.split('|'); draw(); return finish(false); } wrongOnce(); slots = Array(n).fill(null); draw(); };
      draw();
    } else if (kind === '配對消除') {
      area.style.display = ''; area.className = 'harea matcher';
      const pairs = q.pairs || q.options.map(o => o.split('='));
      const list = shuffle(pairs.flatMap((p, i) => [{ t: p[0], k: i, a: false }, { t: p[1], k: i, a: true }]));
      let sel = null, left = pairs.length, miss = 0;
      list.forEach(t => { const b = el('button', 'tile' + (t.a ? ' ans' : ''), area, esc(t.t)); t.b = b;
        b.onclick = () => { if (cur.done || b.classList.contains('gone')) return; SFX.tap();
          if (!sel) { sel = t; b.classList.add('sel'); return; } if (sel === t) { b.classList.remove('sel'); sel = null; return; }
          if (sel.k === t.k && sel.a !== t.a) { SFX.star(); sel.b.classList.add('gone'); b.classList.add('gone'); sel = null; if (!--left) { cur.tries = miss > 1 ? 1 : 0; finish(miss <= 1, true); } }
          else { miss++; SFX.bad(); sel.b.classList.remove('sel'); [sel.b, b].forEach(x => { x.classList.remove('bad'); void x.offsetWidth; x.classList.add('bad'); }); sel = null; cfg.say('這兩張不是一對喔！', 'pout'); } }; });
    }
  }
  return { show, clear, get q() { return cur && cur.q; } };
}
function kidFace(kind) { const P = POSE(KID && KID.animal); const f = { happy: P.cheer[Math.min(2, P.cheer.length - 1)], oops: P.oops[0], cry: P.cry[0], pout: P.pout[0], hi: P.idle }[kind] || P.idle; return frURL(f); }
function hallBubble(s, x, y, w) {
  const b = el('div', 'bubble2 hide', s); place(b, x, y, w); let t = null;
  return (text, kind, ms = 3200) => { b.innerHTML = `<img src="${kidFace(kind)}" alt=""><span>${esc(text)}</span>`; b.classList.remove('hide', 'pop'); void b.offsetWidth; b.classList.add('pop'); clearTimeout(t); if (ms) t = setTimeout(() => b.classList.add('hide'), ms); };
}
function backPill(s, label, fn) { const b = el('button', 'backpill', s, ICON.back + `<span>${label}</span>`); place(b, 22, 182); b.addEventListener('click', () => { SFX.tap(); fn(); }); return b; }
function lbl(s, x, y, w, text) { const d = el('div', 'btnlabel', s, esc(text)); place(d, x, y, w, 40); return d; }

const npcURL = n => (window.INLINE_IMG && window.INLINE_IMG['npc_' + n]) || vq(`img/npc/${n}.webp`);
function groupPick(pool, n) {
  const keyOf = q => q.type === '情境素養' && q.stem.includes('\n') ? 'P:' + q.stem.slice(0, q.stem.lastIndexOf('\n')) : 'Q:' + q.id;
  const groups = {}; pool.forEach(q => { (groups[keyOf(q)] = groups[keyOf(q)] || []).push(q); });
  const keys = shuffle(Object.keys(groups)).sort((a, b) => weight(groups[b][0]) - weight(groups[a][0]) + (Math.random() - 0.5) * 3);
  const out = []; for (const k of keys) { if (out.length >= n) break; out.push(...groups[k].slice(0, 3)); }
  return out.slice(0, n + 2);
}
const HALLS = {
  chinese: { subj: '國語', name: '星語魔法館', bg: 'hallChinese', custom: true, frame: [395, 128, 870, 400], panel: [480, 292, 700, 215], opts: null, area: [470, 575, 720, 235],
    main: [555, 950, 340, 100], mainKit: 'pill_pink', mainText: '選擇單元', hint: [930, 950, 124, 100], bub: [330, 190, 380], greet: '歡迎來到星語魔法館！字詞就是魔法咒語喔。', face: 'cat',
    npc: { img: 'cat_full', box: [10, 380, 380, 520] },
    amb: s => { patch(s, 405, 295, 210, 120, 'a-float', '50% 50%', 'soft'); patch(s, 795, 375, 160, 100, 'a-float', '50% 50%', 'soft'); patch(s, 1015, 305, 215, 110, 'a-float', '50% 50%', 'soft');
      const ring = el('div', 'magicring', s); place(ring, 370, 590, 800, 240); glow(s, 722, 110, 130, 'warm'); glow(s, 262, 215, 40, 'warm'); glow(s, 1190, 215, 40, 'warm'); glow(s, 1300, 600, 70, 'magic'); glow(s, 60, 790, 60, 'warm'); glow(s, 1420, 620, 40, 'warm');
      for (let i = 0; i < 16; i++) { const m = el('div', 'mote', s); place(m, rr(200, 1200), rr(300, 900)); m.style.animationDuration = rr(6, 11).toFixed(1) + 's'; m.style.animationDelay = (-rr(0, 10)).toFixed(1) + 's'; } } },
  science: { subj: '自然', name: '月光藥草館', bg: 'hallScience', panel: [385, 545, 670, 175], opts: [[180, 885, 260, 110], [455, 885, 260, 110], [730, 885, 260, 110], [1005, 885, 260, 110]], area: [180, 862, 1085, 160],
    main: [1290, 880, 130, 130], mainKit: 'play', hint: [30, 890, 140, 112], bub: [560, 190, 400], greet: '歡迎來到月光藥草館！一起來觀察大自然吧。', face: 'hedgehog',
    npc: { img: 'hedgehog_full', box: [1085, 300, 340, 520] },
    amb: s => { const r = el('div', 'rays', s); place(r, 300, 0, 900, 700); glow(s, 722, 130, 70, 'warm'); glow(s, 408, 405, 40, 'warm'); glow(s, 973, 395, 40, 'warm'); patch(s, 1190, 110, 250, 230, 'a-sway', '50% 0%'); patch(s, 0, 870, 200, 216, 'a-sway', '0% 100%'); for (let i = 0; i < 12; i++) { const m = el('div', 'mote', s); place(m, rr(300, 1100), rr(250, 700)); m.style.animationDuration = rr(6, 11).toFixed(1) + 's'; m.style.animationDelay = (-rr(0, 10)).toFixed(1) + 's'; } } },
  literacy: { subj: '素養', name: '星光市集', bg: 'hallMarket', panel: [505, 335, 440, 345], opts: null, area: [300, 705, 850, 170],
    main: [300, 892, 170, 138], mainKit: 'ic_book', play: [520, 900, 400, 118], hint: [975, 892, 170, 138], bub: [260, 190, 380], greet: '歡迎光臨星光市集！生活裡的問題，一起來解決。', face: 'fox',
    npc: { img: 'fox_full', box: [40, 300, 300, 400] },
    amb: s => { [[330, 215], [445, 160], [418, 440], [1000, 440], [1410, 400]].forEach(p => glow(s, p[0], p[1], 40, 'warm')); patch(s, 0, 140, 420, 200, 'a-wave', '50% 0%', 'rect'); patch(s, 1270, 520, 180, 160, 'a-wave', '50% 0%', 'rect'); patch(s, 1180, 620, 268, 300, 'a-sway', '50% 100%'); petals(s, 6); } }
};
const hallUI = {};
function buildHall(key) {
  const H = HALLS[key], s = screen('hall_' + key, H.bg);
  if (H.amb) H.amb(s);
  for (let i = 0; i < 10; i++) { const tw = twinkle(s, rr(80, 1380), rr(120, 820)); }
  let npcEl = null;
  if (H.npc) { npcEl = el('div', 'actor npc', s); place(npcEl, ...H.npc.box); npcEl.innerHTML = `<div class="body"><img src="${npcURL(H.npc.img)}" alt=""></div>`; }
  else if (H.npcPatch) { npcEl = patch(s, ...H.npcPatch, 'a-breathe', '50% 100%', 'soft npcp'); }
  const npcAct = cls => { if (!npcEl) return; npcEl.classList.remove('cheer', 'no'); void npcEl.offsetWidth; npcEl.classList.add(cls); setTimeout(() => npcEl.classList.remove(cls), 900); };
  if (H.custom) { const fr = el('div', 'kitimg', s); place(fr, ...H.frame); fr.style.backgroundImage = 'var(--ui-qframe)';
  }
  const hud = kitHUD(s, { home: () => { if (R2) confirmLeave(); else leave(); } });
  const say = hallBubble(s, ...H.bub);
    const board = el('div', 'hboard', s); place(board, ...H.panel);
  if (!H.custom && H.panel[3] < 200) board.classList.add('tight');
  const Q = makeQuiz({ s, panel: H.panel, opts: H.opts, area: H.area, say });
  const mainBtn = kitBtn(s, H.mainKit, ...H.main, () => { if (!R2) unitPicker(); else confirmLeave(); }, '選擇單元', H.mainText);
  const mainLbl = H.mainText ? mainBtn.querySelector('span') : lbl(s, H.main[0] - 30, H.main[1] + H.main[3] - 4, H.main[2] + 60, '選擇單元');
  if (H.play) { kitBtn(s, 'pill_pink', ...H.play, () => { if (!R2) startHall(null); }, '綜合練習', '綜合練習'); }
  if (H.hint) { kitBtn(s, 'ic_bulb', ...H.hint, giveHint, '提示'); lbl(s, H.hint[0] - 20, H.hint[1] + H.hint[3] - 4, H.hint[2] + 40, '提示'); }
  let R2 = null;
  function giveHint() { if (R2 && Q.q) { const h = Q.q.hint || '慢慢想，你一定可以的！'; say(h, 'hi', 6000); readHint(h); } else say('先選一個單元開始吧！', 'hi'); }
  function leave() { R2 = null; Q.clear(); go('map', true); }
  function confirmLeave() { const { c, m } = modal(`<h2>要離開嗎？</h2><p>這一回合還沒完成，離開不會拿到星星喔。</p><div class="actions"><button class="pill" data-a="stay">繼續</button><button class="pill cream" data-a="go">離開</button></div>`, { close: false }); on(c, '[data-a=stay]', () => closeModal(m)); on(c, '[data-a=go]', () => { closeModal(m); R2 = null; menu(); }); }
  function menu() { R2 = null; Q.clear(); board.style.display = '';  board.innerHTML = `<div class="hgreet"><b>${esc(H.name)}</b><p>${esc(H.greet)}</p><p class="small">按「選擇單元」開始，每個單元 8 題。</p></div>`; mainLbl.textContent = '選擇單元'; }
  function unitPicker() {
    const us = unitsOf(H.subj);
    const chips = us.map(u => { const b = (S.unitStars || {})[unitKey(H.subj, u)] || 0; return `<button class="uchip" data-u="${esc(u)}"><b>${esc(u)}</b><small>${b ? starStr(b) : '尚未挑戰'}</small></button>`; }).join('');
    const { c, m } = modal(`<h2>${esc(H.name)}・選擇單元</h2><div class="uchips">${chips}<button class="uchip mix" data-u=""><b>綜合練習</b><small>各單元混合</small></button></div>`, { wide: true });
    c.querySelectorAll('[data-u]').forEach(b => b.onclick = () => { SFX.tap(); closeModal(m); startHall(b.dataset.u || null); });
  }
  function startHall(unit) {
    if (timeUp()) return showTimeUp();
    const pool = BANK.filter(q => q.subject === H.subj && (!unit || q.unit === unit));
    if (!pool.length) return toast('這個單元還沒有題目');
    const qs = groupPick(pool, 8);
    R2 = { unit, qs, i: 0, first: 0, coins: 0, xp: 0 };
    lastRetry = () => { go('hall_' + key); startHall(unit); }; lastBack = 'hall_' + key;
    board.style.display = 'none'; mainLbl.textContent = '離開這回合'; say(unit ? `「${unit}」開始囉！` : '綜合練習開始囉！', 'happy', 1800); next();
  }
  function next() {
    const q = R2.qs[R2.i];
    Q.show(q, (qq, right, tries, isMatch) => {
      const sc = scoreQ(qq, right, tries, isMatch); npcAct(right ? 'cheer' : 'no');
      if (sc.firstTry) R2.first++; R2.coins += sc.coins; R2.xp += sc.xp;
      say(right ? ['太棒了！', '答對了！', '好厲害！'][rnd(3)] : '沒關係，一起看看！', right ? 'happy' : 'cry', 1600);
      if (right) floatText(`+${sc.coins} 金幣`, 724, 300);
      setTimeout(() => explainModal(qq, right, sc, R2.i === R2.qs.length - 1, () => { R2.i++; if (R2.i >= R2.qs.length) done(); else next(); }, H.face ? npcURL(H.face + (right ? '_happy' : '_think')) : kidFace(right ? 'happy' : 'cry')), 800);
    }, `第 ${R2.i + 1} / ${R2.qs.length} 題`);
  }
  function done() {
    const r = R2; R2 = null; Q.clear();
    finishGeneric({ n: r.qs.length, first: r.first, coins: r.coins, xp: r.xp, bonus: 40, key: r.unit ? unitKey(H.subj, r.unit) : null, subj: H.subj });
  }
  hallUI[key] = { menu };
  onShow['hall_' + key] = () => { if (!R2) { menu(); setTimeout(() => say(H.greet, 'hi', 3000), 400); } };
}
function finishGeneric(o) {
  const n = o.n, f = o.first; const stars = f >= n ? 3 : f >= n - 2 ? 2 : 1;
  const bonus = o.bonus + (stars === 3 ? o.bonus : 0);
  addCoins(bonus); addXP(20 + stars * 10);
  S.stars += stars; S.rounds++; const d = D(); d.rounds++; d.stars += stars;
  if (o.key) { S.unitStars = S.unitStars || {}; S.unitStars[o.key] = Math.max(S.unitStars[o.key] || 0, stars); }
  const sj = o.subj || (o.key ? o.key.split('|')[0] : ''); if (sj) S.prog.rounds[sj] = (S.prog.rounds[sj] || 0) + 1;
  save();
  showResult({ f, n, coins: o.coins + bonus, xp: o.xp + 20 + stars * 10, stars });
}

/* ---------- 甜點單元地圖（數學） ---------- */
const MATH_NODES = [
  { label: '10000以內的數', units: ['10000以內的數'], xy: [315, 935] }, { label: '四位數的加減', units: ['四位數的加減'], xy: [575, 925] },
  { label: '長度與圓', units: ['長度（公分與毫米）', '圓'], xy: [860, 862] }, { label: '乘法', units: ['乘法'], xy: [1100, 755] },
  { label: '除法', units: ['除法'], xy: [1025, 600] }, { label: '分數', units: ['分數'], xy: [745, 565] }, { label: '時間', units: ['時間'], xy: [440, 545] },
  { label: '容量與重量', units: ['容量與重量'], xy: [425, 385] }, { label: '面積與小數', units: ['面積', '小數'], xy: [690, 340] }, { label: '兩步驟應用題', units: ['兩步驟應用題'], xy: [960, 340] }
];
function buildMathMap() {
  const s = screen('mathmap', 'mathMap');
  backPill(s, '回餐廳', () => go('bakery', true));
  const title = el('div', 'gatesub', s, '甜點單元地圖'); title.style.top = '2%';
  const nodes = MATH_NODES.map((n, i) => { const b = btn(s, 'mnode', n.xy[0] - 68, n.xy[1] - 52, 136, 104, () => openNode(i), n.label); return b; });
  const castle = btn(s, 'mnode castle', 1110, 120, 160, 150, () => openNode(10), '數學大挑戰');
  function starsOf(i) { if (i === 10) return (S.unitStars || {})['數學|大挑戰'] || 0; return (S.unitStars || {})['數學|' + MATH_NODES[i].label] || 0; }
  function unlocked(i) { return i === 0 || starsOf(i - 1) > 0; }
  function refresh() {
    nodes.forEach((b, i) => { const st = starsOf(i), ok = unlocked(i); b.classList.toggle('locked', !ok); b.innerHTML = `<b>${i + 1}</b><span>${esc(MATH_NODES[i].label)}</span><small>${ok ? (st ? starStr(st) : '☆☆☆') : ICON.lock}</small>`; });
    const ok = starsOf(9) > 0; castle.classList.toggle('locked', !ok); castle.innerHTML = `<span>數學大挑戰</span><small>${ok ? (starsOf(10) ? starStr(starsOf(10)) : '全部單元混合') : ICON.lock + ' 完成第 10 關開放'}</small>`;
  }
  function openNode(i) {
    if (i < 10 && !unlocked(i)) { toast('先完成前一關，才能挑戰這一關喔！'); return; }
    if (i === 10 && starsOf(9) === 0) { toast('完成第 10 關，城堡大門就會打開！'); return; }
    const st = i === 10 ? { name: '數學大挑戰', diffs: [2, 3, 4, 5], unlock: 1, bonus: 100, stars: 3, key: '數學|大挑戰' } : { name: MATH_NODES[i].label, diffs: [1, 2, 3, 4, 5], units: MATH_NODES[i].units, unlock: 1, bonus: 40, stars: 2, key: '數學|' + MATH_NODES[i].label };
    go('bakery'); bakeryUI.startRound(st);
  }
  onShow.mathmap = refresh;
}

/* ---------- 魔王試煉塔 ---------- */
function buildBoss() {
  const s = screen('boss', 'boss');
  kitHUD(s, { home: () => { if (B2) return toast('打完這場再回家吧！'); go('map', true); } });
  const say = hallBubble(s, 230, 150, 360);
  glow(s, 722, 70, 110, 'magic'); glow(s, 40, 300, 50, 'warm'); glow(s, 1410, 300, 50, 'warm'); glow(s, 100, 690, 60, 'magic');
  patch(s, 380, 160, 110, 180, 'a-flag', '50% 0%', 'rect'); patch(s, 670, 160, 110, 180, 'a-flag', '50% 0%', 'rect'); patch(s, 1280, 190, 110, 200, 'a-flag', '50% 0%', 'rect');
  const dragon = el('div', 'actor npc', s); place(dragon, 860, 250, 420, 420); dragon.innerHTML = `<div class="body"><img src="${npcURL('dragon_full')}" alt=""></div>`;
  const hero = el('div', 'actor', s); place(hero, 330, 330, 240, 340); const heroBody = el('div', 'body', hero); let heroSpr = null, HP0 = null;
  const heartRow = el('div', 'hearts', s); place(heartRow, 860, 180, 420, 60); const hearts = Array.from({ length: 6 }, () => el('i', '', heartRow, '<svg viewBox="0 0 24 22"><path d="M12 21C5 15 1 11 1 6.5A5.5 5.5 0 0 1 12 4a5.5 5.5 0 0 1 11 2.5C23 11 19 15 12 21z"/></svg>'));
  const qf = el('div', 'kitimg', s); place(qf, 240, 680, 970, 390); qf.style.backgroundImage = 'var(--ui-qframe)';
  const board = el('div', 'hboard', s); place(board, 330, 790, 790, 240);
  const Q = makeQuiz({ s, panel: [330, 775, 790, 95], opts: null, area: [330, 872, 790, 160], say });
  let B2 = null;
  function setHearts(n) { hearts.forEach((h, i) => h.classList.toggle('off', i >= n)); }
  function menu() {
    B2 = null; Q.clear(); setHearts(6); board.style.display = '';
    if (!heroSpr || HP0 !== (KID && KID.animal)) { HP0 = KID && KID.animal; heroBody.innerHTML = ''; heroSpr = makeSprite(heroBody, poseFrames(POSE(HP0))); heroSpr.show(POSE(HP0).idle); }
    const ok = S.level >= 3;
    board.innerHTML = `<div class="hgreet"><b>魔王試煉塔</b><p>${ok ? '迷糊小龍有 6 顆愛心。10 題裡答對就能打掉一顆，把愛心全部打掉就勝利！' : '升到 Lv.3 才能挑戰小龍喔！'}</p>${ok ? '<button class="pill" data-a="go">開始挑戰</button>' : ''}</div>`;
    on(board, '[data-a=go]', start);
  }
  function start() {
    if (timeUp()) return showTimeUp();
    const lv = Math.min(5, 1 + Math.floor(S.level / 2)); const diffs = [Math.max(1, lv - 1), lv, Math.min(5, lv + 1)];
    const subs = ['數學', '國語', '自然', '素養'];
    const qs = []; const used = new Set();
    for (let i = 0; i < 10; i++) { const pool = BANK.filter(q => q.subject === subs[i % 4] && diffs.includes(q.diff) && q.type !== '配對消除'); qs.push(...pickWeighted(pool, 1, used)); }
    B2 = { qs, i: 0, hp: 6, coins: 0, xp: 0, first: 0 }; board.style.display = 'none'; say('小龍，接招吧！', 'happy', 1500); next();
  }
  function next() {
    Q.show(B2.qs[B2.i], (q, right, tries, isMatch) => {
      const sc = scoreQ(q, right, tries, isMatch); B2.coins += sc.coins; B2.xp += sc.xp;
      if (right) { B2.hp--; B2.first++; setHearts(B2.hp); dragon.classList.remove('hit'); void dragon.offsetWidth; dragon.classList.add('hit'); const P = POSE(HP0); heroSpr.play(P.cheer, P.cheerMs === 140 ? 140 : 900, 200, P.idle); SFX.star(); say(B2.hp ? `打中了！小龍還剩 ${B2.hp} 顆愛心` : '小龍投降了！', 'happy', 1600); }
      else say('小龍躲開了！沒關係，下一題！', 'oops', 1600);
      setTimeout(() => explainModal(q, right, sc, B2.hp === 0 || B2.i === B2.qs.length - 1, () => { B2.i++; if (B2.hp === 0 || B2.i >= B2.qs.length) end(); else next(); }, npcURL(right ? 'dragon_wow' : 'dragon_happy')), 900);
    });
  }
  function end() {
    const win = B2.hp === 0; const r = B2; B2 = null; Q.clear();
    const bonus = win ? 150 : 30; addCoins(bonus); addXP(win ? 80 : 20);
    if (win) { S.stars += 3; S.bossWins = (S.bossWins || 0) + 1; } save(); refreshHUD();
    const { c, m } = modal(`<div class="cert" style="background-image:url('${IMG.frameWide}')"><div class="certin"><h2>${win ? '打倒迷糊小龍！' : '差一點點！'}</h2><p>${esc(KID ? KID.nick : '')}　${win ? '成功通過魔王試煉' : `打掉了 ${6 - r.hp} 顆愛心`}</p><p class="gainline">${icon('coin', 'coin')}+${r.coins + bonus}　${icon('gem', 'coin')}+${r.xp + (win ? 80 : 20)} 經驗${win ? '　+3 星星' : ''}</p></div></div><div class="actions"><button class="pill" data-a="ok">${win ? '太棒了！' : '再接再厲'}</button></div>`, { close: false, wide: true }); c.classList.add('certcard');
    if (win) SFX.level();
    on(c, '[data-a=ok]', () => { closeModal(m); menu(); if (pendingLevels.length) showLevelUps(); });
  }
  onShow.boss = () => { if (!B2) menu(); };
}

/* ---------- 迷霧森林（錯題複習） ---------- */
function buildForest() {
  const s = screen('forest', 'forest');
  kitHUD(s, { home: () => { if (F2) return toast('先把這幾隻小精靈救回來吧！'); go('map', true); } });
  const say = hallBubble(s, 820, 160, 420);
  [[150, 320], [1350, 520], [140, 640], [1380, 280], [600, 600]].forEach(p => glow(s, p[0], p[1], 40, 'magic')); glow(s, 440, 200, 60, 'warm'); glow(s, 1000, 540, 50, 'warm');
  const turtle = el('div', 'actor npc', s); place(turtle, 890, 270, 300, 360); turtle.innerHTML = `<div class="body"><img src="${npcURL('turtle_full')}" alt=""></div>`; patch(s, 0, 0, 460, 330, 'a-sway', '20% 0%'); patch(s, 1250, 250, 198, 200, 'a-sway', '50% 100%'); petals(s, 5);
  for (let i = 0; i < 18; i++) { const m = el('div', 'mote', s); place(m, rr(100, 1300), rr(200, 800)); m.style.animationDuration = rr(7, 12).toFixed(1) + 's'; m.style.animationDelay = (-rr(0, 10)).toFixed(1) + 's'; }
  kitBtn(s, 'ic_book', 120, 890, 170, 138, list, '錯題本'); lbl(s, 100, 1024, 210, '錯題本');
  kitBtn(s, 'pill_pink', 470, 900, 500, 118, () => { if (!F2) start(); }, '開始複習', '開始複習');
  kitBtn(s, 'ic_bulb', 1150, 890, 170, 138, () => { if (F2 && Q.q) { const h = Q.q.hint || '慢慢想～'; say(h, 'hi', 6000); readHint(h); } else say('有迷路的小精靈嗎？按「開始複習」看看！', 'hi'); }, '提示'); lbl(s, 1130, 1024, 210, '提示');
  const card = el('div', 'framecard forestcard', s); place(card, 250, 150, 950, 700); card.style.backgroundImage = `url("${IMG.frameWide}")`; card.style.display = 'none';
  const Q = makeQuiz({ s, panel: [350, 335, 750, 150], opts: null, area: [340, 492, 770, 250], say });
  let F2 = null;
  const wrongQs = () => S.wrongLog.map(w => BANK.find(q => q.id === w.id)).filter(Boolean);
  function list() {
    const ws = wrongQs().slice(0, 30);
    modal(`<h2>錯題本</h2>${ws.length ? `<table class="stats"><tr><th>科目</th><th>題目</th></tr>${ws.map(q => `<tr><td>${esc(q.subject)}</td><td>${esc(q.stem.replace(/\n/g, ' ').slice(0, 40))}</td></tr>`).join('')}</table>` : '<p>目前沒有答錯的題目，太厲害了！</p>'}`, { wide: true });
  }
  function start() {
    const ws = wrongQs().slice(0, 8);
    if (!ws.length) { say('森林裡沒有迷路的小精靈，你真棒！', 'happy'); return; }
    F2 = { qs: ws, i: 0, saved: 0 }; card.style.display = ''; say(`有 ${ws.length} 隻小精靈迷路了，一起救回牠們！`, 'hi', 2400); next();
  }
  function next() {
    Q.show(F2.qs[F2.i], (q, right, tries, isMatch) => {
      const sc = scoreQ(q, right, tries, isMatch);
      if (right) { S.wrongLog = S.wrongLog.filter(w => w.id !== q.id); F2.saved++; save(); say('救回一隻小精靈！', 'happy', 1500); } else say('小精靈還在迷路，下次再試試！', 'oops', 1500);
      setTimeout(() => explainModal(q, right, sc, F2.i === F2.qs.length - 1, () => { F2.i++; if (F2.i >= F2.qs.length) end(); else next(); }, npcURL(right ? 'turtle_happy' : 'turtle_think')), 800);
    });
  }
  function end() {
    const r = F2; F2 = null; Q.clear(); card.style.display = 'none';
    const bonus = r.saved * 5; addCoins(bonus); S.prog.saved += r.saved; save(); refreshHUD();
    modal(`<h2 class="center">複習完成！</h2><p class="center">救回了 ${r.saved} / ${r.qs.length} 隻小精靈，烏龜爺爺送你 ${bonus} 枚金幣。</p>`);
  }
  onShow.forest = () => { if (!F2) setTimeout(() => say(`歡迎來到迷霧森林，有 ${wrongQs().length} 題等你複習。`, 'hi', 3000), 400); };
}

/* ---------- 小鳥音樂亭（音樂節拍） ---------- */
const SONGS2 = [
  { id: 'x2', name: '二的乘法', bpm: 100, lines: ['二一得二', '二二得四', '二三得六', '二四得八', '二五一十', '二六十二', '二七十四', '二八十六', '二九十八'] },
  { id: 'x3', name: '三的乘法', bpm: 100, lines: ['三一得三', '三二得六', '三三得九', '三四十二', '三五十五', '三六十八', '三七二一', '三八二四', '三九二七'] },
  { id: 'x5', name: '五的乘法', bpm: 108, lines: ['五一得五', '五二一十', '五三十五', '五四二十', '五五二五', '五六三十', '五七三五', '五八四十', '五九四五'] },
  { id: 'idiom', name: '成語拍拍手', bpm: 96, lines: ['一心一意', '守株待兔', '對牛彈琴', '井底之蛙', '亡羊補牢', '畫蛇添足', '五顏六色', '七嘴八舌'] }
];
function buildMusic() {
  const s = screen('music', 'music');
  // 背景沒有畫小鳥，三隻小鳥是獨立角色，分開站在舞台上，不會再重疊
  [[45, 265], [80, 320], [125, 250], [165, 200], [262, 370], [350, 352], [455, 345], [570, 352], [690, 352], [745, 370], [222, 648], [890, 648], [1400, 400]].forEach(p => glow(s, p[0], p[1], 24, 'warm'));
  petals(s, 7);
  const BX = [250, 455, 662], BY = [470, 455, 470];
  const BIRDS = ['pink', 'yellow', 'blue'].map((k, i) => {
    const b = el('div', 'actor bird', s); place(b, BX[i], BY[i], 190, 230);
    b.innerHTML = `<div class="body"><img src="${vq('img/birds/' + k + '_front.webp')}" alt=""></div>`;
    b.querySelector('.body').style.animationDelay = (-i * 0.4) + 's';
    btn(s, 'hot rect', BX[i], BY[i], 190, 230, () => { hopBird(i); SFX.ok(); say(['啾啾！我是鼓手小粉！', '嗶～我最會吹笛子！', '叮叮噹，我負責鈴鼓！'][i], 'happy', 2200); }, ['小粉', '小黃', '小藍'][i]);
    return { el: b, img: b.querySelector('img'), k };
  });
  function birdPose(play) { BIRDS.forEach(b => { b.img.src = vq('img/birds/' + b.k + (play ? '_play' : '_front') + '.webp'); b.el.classList.toggle('playing', play); }); }
  function hopBird(i) { const b = BIRDS[i].el; b.classList.remove('hop'); void b.offsetWidth; b.classList.add('hop'); }
  // 節奏軌道與打擊圈（新背景沒有畫，用程式畫）
  const track = el('div', 'rtrack', s); place(track, 60, 812, 1340, 130);
  const hitRing = el('div', 'rhit', s); place(hitRing, 135 - 62, 877 - 62, 124, 124);
  backPill(s, '回地圖', () => { if (G3) stopSong(true); go('map', true); });
  const chip = el('div', 'hallchip', s); place(chip, 1080, 24, 340, 64);
  const say = hallBubble(s, 820, 150, 400);
  const lane = el('div', 'lane', s); place(lane, 0, 0, W, H); lane.style.pointerEvents = 'none';
  const judge = el('div', 'judge', s); place(judge, 60, 690, 300, 80);
  const scoreEl = el('div', 'rscore', s); place(scoreEl, 470, 960, 500, 70);
  const startBtn = el('button', 'pill', s, '選歌開始'); place(startBtn, 554, 960, 340, 96); startBtn.onclick = () => { SFX.tap(); pickSong(); };
  const HIT = { x: 135, y: 877 }, SPAWN_X = 1390, LEAD = 4;
  let G3 = null;
  function pickSong() {
    const { c, m } = modal(`<h2>小鳥音樂亭・選一首歌</h2><p class="muted">音符跑到左邊的圓圈時，點一下螢幕！越準越好：<b class="gP">Perfect</b>＞<b class="gG">Good</b>＞<b class="gB">Bad</b>，沒點到是 Miss。<b>有長尾巴的音符要按住不放</b>，等尾巴跑完再放開。跟著節奏唸出來會更準喔。</p><div class="uchips">${SONGS2.map(sg => `<button class="uchip" data-s="${sg.id}"><b>${sg.name}</b><small>${(S.unitStars || {})['音樂|' + sg.id] ? starStr(S.unitStars['音樂|' + sg.id]) : '尚未挑戰'}</small></button>`).join('')}</div>`, { wide: true });
    c.querySelectorAll('[data-s]').forEach(b => b.onclick = () => { closeModal(m); startSong(SONGS2.find(x => x.id === b.dataset.s)); });
  }
  const PENTA = [523, 587, 659, 784, 880, 1047, 1175, 1319];
  function ping(f, t, v = 0.12, len = 0.25, type = 'triangle') { try { const c = AC(), o = c.createOscillator(), g = c.createGain(); o.type = type; o.frequency.value = f; g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(v, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + len); o.connect(g).connect(c.destination); o.start(t); o.stop(t + len + 0.05); } catch (e) {} }
  function startSong(sg) {
    if (timeUp()) return showTimeUp();
    Music.duck(true, 0);
    const c = AC(), beat = 60 / sg.bpm, t0 = c.currentTime + 0.4 + LEAD * beat;
    const notes = []; let b = 0;
    sg.lines.forEach(line => { const chs = [...line]; chs.forEach((ch, j) => { notes.push({ t: t0 + b * beat, ch, hit: false, miss: false, dur: j === chs.length - 1 ? beat * 1.5 : 0 }); b++; }); b++; });
    const end = t0 + b * beat + 1;
    for (let i = 0; i < LEAD; i++) ping(i === LEAD - 1 ? 1047 : 784, c.currentTime + 0.4 + i * beat, 0.1, 0.12, 'square');
    for (let k = 0; k < b; k++) ping(110, t0 + k * beat, k % 4 === 0 ? 0.18 : 0.09, 0.12, 'sine');
    const travel = 2.6, PXS = (SPAWN_X - HIT.x) / travel; // 音符每秒移動的距離
    notes.forEach(n => { n.el = el('div', 'rnote' + (n.dur ? ' hold' : ''), lane, (n.dur ? `<i class="tail" style="width:calc(var(--u)*${Math.round(n.dur * PXS)})"></i>` : '') + `<span>${esc(n.ch)}</span>`); n.el.style.display = 'none'; n.tail = n.el.querySelector('.tail'); });
    G3 = { sg, notes, beat, end, perfect: 0, good: 0, bad: 0, miss: 0, holdOK: 0, raf: 0, holding: null, lastBeat: -1, PXS };
    lane.style.pointerEvents = 'auto'; startBtn.style.display = 'none'; say(`「${sg.name}」準備，3、2、1！`, 'happy', 2200); birdPose(true);
    (function frame() {
      if (!G3) return; const now = c.currentTime;
      const bt = Math.floor((now - t0) / beat); if (bt >= 0 && bt !== G3.lastBeat) { G3.lastBeat = bt; hopBird(bt % 3); }
      const hd = G3.holding;
      if (hd) { const left = hd.t + hd.dur - now; if (left <= 0) holdDone(true); else { hd.el.style.left = pctX(HIT.x - 42); hd.tail.style.width = `calc(var(--u)*${Math.round(left * PXS)})`; } }
      if (!G3) return;
      for (const n of G3.notes) {
        if (n.hit || n.miss) continue;
        const dt = n.t - now;
        if (dt < -WIN.bad) { n.miss = true; G3.miss++; n.el.classList.add('gone'); flash('Miss', 'miss'); setTimeout(() => n.el.remove(), 300); continue; }
        if (dt > travel) { n.el.style.display = 'none'; continue; }
        const x = HIT.x + (SPAWN_X - HIT.x) * (dt / travel);
        n.el.style.display = 'flex'; n.el.style.left = pctX(x - 42); n.el.style.top = pctY(HIT.y - 42);
      }
      scoreEl.textContent = `Perfect ${G3.perfect}　Good ${G3.good}　Bad ${G3.bad}　Miss ${G3.miss}　長按 ${G3.holdOK}`;
      if (now > G3.end) return finishSong();
      G3.raf = requestAnimationFrame(frame);
    })();
  }
  // 判定區間（秒）：差距越小越準
  const WIN = { perfect: 0.06, good: 0.13, bad: 0.22 };
  function flash(t, cls, sub) { judge.innerHTML = esc(t) + (sub ? `<small>${esc(sub)}</small>` : ''); judge.className = 'judge show ' + cls; hitRing.dataset.g = cls; hitRing.classList.remove('flash'); void hitRing.offsetWidth; hitRing.classList.add('flash'); clearTimeout(judge._t); judge._t = setTimeout(() => judge.className = 'judge', 450); }
  function holdDone(ok) {
    const h = G3 && G3.holding; if (!h) return; G3.holding = null; hitRing.classList.remove('holding'); h.el.classList.remove('held');
    if (ok) { G3.holdOK++; flash('長按成功！', 'perfect'); const t = AC().currentTime; ping(1047, t, 0.14, 0.4); ping(1319, t + 0.06, 0.12, 0.4); BIRDS.forEach((b, i) => hopBird(i)); }
    else { G3[h.grade]--; G3.miss++; flash('放太早了', 'miss'); }
    h.el.classList.add('pop2'); setTimeout(() => h.el.remove(), 300);
  }
  function tap() {
    if (!G3) return; const now = AC().currentTime;
    let best = null, bd = 9; for (const n of G3.notes) { if (n.hit || n.miss) continue; const d = Math.abs(n.t - now); if (d < bd) { bd = d; best = n; } }
    if (!best || bd > WIN.bad) return;
    const early = now < best.t;
    best.hit = true; best.el.classList.add('pop2');
    const idx = G3.notes.indexOf(best);
    best.grade = bd <= WIN.perfect ? 'perfect' : bd <= WIN.good ? 'good' : 'bad';
    const side = early ? '快了一點' : '慢了一點';
    if (best.grade === 'perfect') { G3.perfect++; flash('Perfect!', 'perfect'); ping(PENTA[idx % PENTA.length], now, 0.16, 0.3); }
    else if (best.grade === 'good') { G3.good++; flash('Good', 'good', side); ping(PENTA[idx % PENTA.length], now, 0.1, 0.25); }
    else { G3.bad++; flash('Bad', 'bad', side); ping(PENTA[idx % PENTA.length] / 2, now, 0.07, 0.18, 'sine'); }
    hopBird(idx % 3);
    if (best.dur) { best.el.classList.remove('pop2'); best.el.classList.add('held'); G3.holding = best; hitRing.classList.add('holding'); return; }
    best.el.classList.add('pop2'); setTimeout(() => best.el.remove(), 300);
  }
  // 按下＝打擊；長按音符要一直按著，尾巴剩不到 0.15 秒時放開也算成功，太早放開算失誤
  let downId = null;
  lane.addEventListener('pointerdown', e => { if (!G3) return; e.preventDefault(); if (G3.holding) return; downId = e.pointerId; try { lane.setPointerCapture(e.pointerId); } catch (err) {} tap(); });
  const release = e => { if (e.pointerId !== downId) return; downId = null; const h = G3 && G3.holding; if (h) holdDone(h.t + h.dur - AC().currentTime < 0.15); };
  lane.addEventListener('pointerup', release); lane.addEventListener('pointercancel', release);
  function stopSong(silent) { if (!G3) return; cancelAnimationFrame(G3.raf); lane.innerHTML = ''; lane.style.pointerEvents = 'none'; G3 = null; downId = null; hitRing.classList.remove('holding'); startBtn.style.display = ''; scoreEl.textContent = ''; birdPose(false); Music.duck(false); }
  function finishSong() {
    const g = G3, n = g.notes.length, hits = g.perfect + g.good + g.bad; stopSong();
    const ratio = (g.perfect + g.good * 0.6 + g.bad * 0.2) / n; const stars = ratio >= 0.9 ? 3 : ratio >= 0.65 ? 2 : 1;
    const coins = g.perfect * 3 + g.good * 2 + g.holdOK * 2, bonus = 20 * stars, xp = 10 + stars * 10;
    addCoins(coins + bonus); addXP(xp); S.stars += stars; S.rounds++; const d = D(); d.rounds++; d.stars += stars;
    S.unitStars = S.unitStars || {}; S.unitStars['音樂|' + g.sg.id] = Math.max(S.unitStars['音樂|' + g.sg.id] || 0, stars); S.prog.songs++; S.prog.rounds['音樂'] = (S.prog.rounds['音樂'] || 0) + 1; save();
    lastRetry = () => { go('music'); startSong(g.sg); }; lastBack = 'music';
    showResult({ f: hits, n, coins: coins + bonus, xp, stars });
    setTimeout(() => { resultUI.banner.textContent = `打中 ${hits} / ${n} 個音符`; resultUI.back.textContent = '回音樂亭'; }, 400);
  }
  onShow.music = () => { chip.innerHTML = `${esc(KID ? KID.nick : '')}　Lv.${S.level}　金幣 ${S.coins}`; if (!G3) setTimeout(() => say('啾啾！一起來打節拍吧！', 'happy', 2600), 400); };
}

/* ================= SHOP（家具店與裝備店） ================= */
const shopURL = id => vq(`img/shop/${id}.webp`);
const mkItems = (prefix, list) => list.map(([name, price], i) => ({ id: prefix + '_' + i, name, price }));
const SHOP = {
  furn: { name: '家具', items: mkItems('fa', [['星星小床', 120], ['魔法書桌', 100], ['紫絨椅子', 60], ['花藤書櫃', 110], ['星星衣櫥', 120], ['星花地毯', 50], ['星光立燈', 60], ['粉紅盆花', 40], ['花朵沙發', 130], ['下午茶桌', 80], ['玩具寶箱', 90], ['月亮掛鐘', 70], ['彩虹城堡畫', 70], ['紫絨坐墊', 40], ['水晶床頭櫃', 80], ['星星窗簾', 70]])
      .concat(mkItems('fb', [['小小廚房', 150], ['石窯烤爐', 160], ['花朵餐桌組', 120], ['蛋糕展示架', 90], ['星星茶具組', 60], ['蝴蝶結花瓶', 50], ['星星檯燈', 60], ['兔兔音樂盒', 100], ['魔法地球儀', 80], ['小畫架', 70], ['兔兔布偶', 60], ['小魚水族箱', 120], ['搖搖木馬', 110], ['星星懶骨頭', 90], ['星星串燈', 40], ['星星信箱', 60]])) },
  hat: { name: '魔法帽', slot: '帽子', items: mkItems('hat', [['星星兔耳帽', 120], ['草莓蛋糕帽', 140], ['彩虹雲朵帽', 140], ['櫻花蝴蝶結帽', 130], ['棒棒糖帽', 130], ['鈴蘭森林帽', 130], ['月亮夜空帽', 160], ['草莓奶油帽', 150], ['藍條紋兔兔帽', 140], ['愛心天使帽', 180]]) },
  cape: { name: '披風', slot: '披風', items: mkItems('cape', [['星星魔法披風', 150], ['櫻花瓣披風', 150], ['草莓毛毛披風', 170], ['雲朵月亮披風', 170], ['愛心蕾絲披風', 160], ['彩虹糖果披風', 180], ['綠葉鈴蘭披風', 160], ['公主皇冠披風', 220], ['糖果條紋披風', 180], ['紫花花瓣披風', 170]]) },
  wand: { name: '法杖', slot: '法杖', items: mkItems('wand', [['胡蘿蔔法杖', 120], ['拐杖糖法杖', 140], ['閃亮星星法杖', 180], ['紫陽花法杖', 150], ['愛心皇冠法杖', 220], ['月亮兔兔法杖', 180], ['莓果籃法杖', 160], ['星星藥水法杖', 170], ['兔兔水晶球法杖', 200], ['杯子蛋糕法杖', 160]]) }
};
const GEAR = ['hat', 'cape', 'wand'];
const itemOf = (cat, id) => SHOP[cat].items.find(x => x.id === id);
const owns = (cat, id) => (S.inv[cat] || []).includes(id);
const coinIc = icon('coin', 'coin');
function wear(cat, id) { S.equip[cat] = S.equip[cat] === id ? '' : id; save(); dressAll(); }
function outfitRow() {
  const cells = GEAR.map(k => { const it = S.equip && S.equip[k] ? itemOf(k, S.equip[k]) : null; return `<div class="ofit">${it ? `<img src="${shopURL(it.id)}" alt="">` : '<span>＋</span>'}<small>${it ? esc(it.name) : SHOP[k].slot}</small></div>`; }).join('');
  return `<div class="ofrow">${cells}</div>`;
}
function showBag(tab) {
  tab = tab || 'gear';
  const cats = tab === 'gear' ? GEAR : ['furn'];
  const owned = cats.flatMap(k => (S.inv[k] || []).map(id => ({ k, it: itemOf(k, id) })).filter(x => x.it));
  const grid = owned.length ? `<div class="bgrid">${owned.map(({ k, it }) => { const on = S.equip[k] === it.id; return `<button class="bitem ${on ? 'worn' : ''}" data-k="${k}" data-id="${it.id}"><img src="${k === 'furn' ? shopURL(it.id) : itemThumb(k, it.id)}" alt=""><b>${esc(it.name)}</b>${k === 'furn' ? '' : `<small>${on ? '穿戴中' : '點一下穿上'}</small>`}</button>`; }).join('')}</div>`
    : `<p class="center muted">${tab === 'gear' ? '還沒有裝備喔！' : '還沒有家具喔！'}到地圖右下角的「家具店與裝備店」用金幣買吧。</p>`;
  const { c, m } = modal(`<h2 class="ichead">${icon('chest', 'hic')}我的背包</h2><div class="tabs"><button class="tab ${tab === 'gear' ? 'on' : ''}" data-t="gear">裝備</button><button class="tab ${tab === 'furn' ? 'on' : ''}" data-t="furn">家具</button></div>` +
    (tab === 'gear' ? outfitRow() : '<p class="muted center">到兔兔小屋按「擺家具」，就能把家具擺進家裡喔！</p>') + grid, { wide: true });
  c.querySelectorAll('[data-t]').forEach(b => b.onclick = () => { SFX.tap(); closeModal(m); showBag(b.dataset.t); });
  c.querySelectorAll('.bitem').forEach(b => b.onclick = () => { if (b.dataset.k === 'furn') return; SFX.ok(); wear(b.dataset.k, b.dataset.id); closeModal(m); showBag('gear'); if (shopUI) shopUI.render(); });
}
let shopUI = null;
function buildShop() {
  const s = screen('shop', 'shopBg');
  // ambience: lanterns, flowers, magic circle
  glow(s, 80, 270, 70, 'warm'); glow(s, 722, 100, 80, 'warm'); glow(s, 230, 495, 45, 'magic'); glow(s, 722, 1000, 120, 'magic');
  [[0, 860, 240, 226, '0% 100%'], [1230, 870, 218, 216, '100% 100%'], [880, 0, 260, 200, '50% 0%'], [80, 0, 300, 150, '50% 0%']].forEach(t => patch(s, t[0], t[1], t[2], t[3], 'a-sway', t[4]));
  patch(s, 980, 320, 90, 260, 'a-flag', '50% 0%', 'rect'); patch(s, 400, 330, 90, 250, 'a-flag', '50% 0%', 'rect');
  for (let i = 0; i < 8; i++) twinkle(s, rr(480, 1400), rr(140, 600));
  petals(s, 5);
  kitHUD(s, { home: () => go('map', true) });
  backPill(s, '回地圖', () => go('map', true));
  // 浣熊木匠 阿木
  const npc = el('div', 'actor npc', s); place(npc, 30, 455, 380, 480);
  npc.innerHTML = `<div class="body"><img src="${npcURL('raccoon_full')}" alt="浣熊木匠阿木"></div>`;
  const tag = el('div', 'plate shoptag', s, '浣熊木匠・阿木'); place(tag, 220, 945);
  const bub = el('div', 'bubble2 hide', s); place(bub, 30, 268, 430); let bT = null;
  function say(text, face = 'happy', ms = 3800) { bub.innerHTML = `<img src="${npcURL('raccoon_' + face)}" alt=""><span>${esc(text)}</span>`; bub.classList.remove('hide', 'pop'); void bub.offsetWidth; bub.classList.add('pop'); clearTimeout(bT); if (ms) bT = setTimeout(() => bub.classList.add('hide'), ms); }
  const act = cls => { npc.classList.remove('cheer', 'no'); void npc.offsetWidth; npc.classList.add(cls); setTimeout(() => npc.classList.remove(cls), 900); };
  btn(s, 'hot rect', 60, 470, 320, 460, () => { act('cheer'); say(['每一件家具都是我親手做的喔！', '金幣不夠的話，去各館答題就能賺金幣！', '買了的東西都會放進背包裡。', '棉花的裁縫攤還在準備中，帽子、披風和法杖今天先由我幫忙賣！'][rnd(4)], 'happy'); }, '阿木');
  // 商品櫃
  const panel = el('div', 'shoppanel', s); place(panel, 470, 128, 958, 940);
  const PER = 8; let cat = 'furn', page = 0;
  function render() {
    const items = SHOP[cat].items, pages = Math.ceil(items.length / PER); page = Math.min(page, pages - 1);
    const tabs = Object.keys(SHOP).map(k => `<button class="stab ${k === cat ? 'on' : ''}" data-cat="${k}">${SHOP[k].name}</button>`).join('');
    const cards = items.slice(page * PER, page * PER + PER).map(it => {
      const own = owns(cat, it.id), on = cat !== 'furn' && S.equip[cat] === it.id;
      return `<button class="sitem ${own ? 'owned' : ''} ${on ? 'worn' : ''}" data-id="${it.id}"><img src="${cat === 'furn' ? shopURL(it.id) : itemThumb(cat, it.id)}" alt="" loading="lazy"><b>${esc(it.name)}</b>` +
        (own ? `<span class="tagown">${cat === 'furn' ? '已擁有' : on ? '穿戴中' : '點一下穿上'}</span>` : `<span class="price">${coinIc}${it.price}</span>`) + '</button>';
    }).join('');
    const foot = cat === 'furn' ? `<span class="shint">家具會放進背包，回兔兔小屋就能擺進家裡！</span>` : `<span class="shint">穿戴中</span>${outfitRow()}`;
    panel.innerHTML = `<div class="stabs">${tabs}</div><div class="sgrid">${cards}</div><div class="sfoot"><button class="spg" data-pg="-1" ${page ? '' : 'disabled'} aria-label="上一頁">◀</button><div class="smid">${foot}</div><span class="spn">${page + 1} / ${pages}</span><button class="spg" data-pg="1" ${page < pages - 1 ? '' : 'disabled'} aria-label="下一頁">▶</button></div>`;
    panel.querySelectorAll('[data-cat]').forEach(b => b.onclick = () => { SFX.tap(); cat = b.dataset.cat; page = 0; render();
      if (cat === 'furn') say('這些都是我做的家具，慢慢挑喔！', 'happy'); else say('棉花的裁縫攤還在準備中，今天由我幫她顧店！', 'wow'); });
    panel.querySelectorAll('[data-pg]').forEach(b => b.onclick = () => { SFX.tap(); page += +b.dataset.pg; render(); });
    panel.querySelectorAll('.sitem').forEach(b => b.onclick = () => { SFX.tap(); pick(itemOf(cat, b.dataset.id)); });
  }
  function pick(it) {
    if (owns(cat, it.id)) {
      if (cat === 'furn') return say('這個已經是你的囉！回兔兔小屋就能擺進家裡。', 'happy');
      wear(cat, it.id); SFX.ok(); render(); act('cheer'); return say(S.equip[cat] === it.id ? `穿上「${it.name}」了，好可愛！` : `先把「${it.name}」收起來囉。`, 'happy');
    }
    const lack = it.price - S.coins;
    const { c, m } = modal(`<div class="center"><img class="buyimg" src="${cat === 'furn' ? shopURL(it.id) : itemThumb(cat, it.id)}" alt=""><h2>${esc(it.name)}</h2><p>要用 ${coinIc}<b>${it.price}</b> 枚金幣買下嗎？</p><p class="muted">你現在有 ${S.coins} 枚金幣</p>` +
      (lack > 0 ? `<p class="err">還差 ${lack} 枚金幣喔！</p>` : '') +
      `<div class="actions"><button class="pill cream" data-a="no">再想想</button><button class="pill" data-a="buy" ${lack > 0 ? 'disabled' : ''}>買下來！</button></div></div>`);
    on(c, '[data-a=no]', () => closeModal(m));
    if (lack > 0) say(`還差 ${lack} 枚金幣，去各館答題就能賺到喔！`, 'think');
    on(c, '[data-a=buy]', () => {
      if (S.coins < it.price || owns(cat, it.id)) return closeModal(m);
      S.coins -= it.price; S.inv[cat] = (S.inv[cat] || []).concat(it.id);
      if (cat !== 'furn') { S.equip[cat] = it.id; dressAll(); }
      save(); flushSave(); refreshHUD(); closeModal(m);
      SFX.coin(); setTimeout(SFX.level, 200); act('cheer'); floatText(`-${it.price} 金幣`, 950, 120);
      say(cat === 'furn' ? `謝謝惠顧！「${it.name}」已經放進你的背包囉！` : `謝謝惠顧！已經幫你穿上「${it.name}」囉！`, 'happy', 4200);
      render();
    });
  }
  shopUI = { render };
  onShow.shop = () => { render(); setTimeout(() => say(`歡迎光臨！我是木匠阿木。${KID ? KID.nick + '，' : ''}今天想買什麼呢？`, 'happy', 3600), 400); };
}

/* ================= 任務徽章 ================= */
const SAFE_SCR = ['map', 'result', 'shop', 'home', 'badges', 'status'];
const subjRounds = sj => (S.prog && S.prog.rounds[sj]) || 0;
const BADGES = [
  { id: 'book', name: '國語小魔法師', desc: '在星語魔法館完成 3 回合', goal: 3, v: () => subjRounds('國語') },
  { id: 'leaf', name: '自然小藥師', desc: '在月光藥草館完成 3 回合', goal: 3, v: () => subjRounds('自然') },
  { id: 'cake', name: '數學小廚師', desc: '在甜甜餐廳完成 3 回合', goal: 3, v: () => subjRounds('數學') },
  { id: 'bunny', name: '兔兔的家', desc: '在兔兔小屋擺好 3 件家具', goal: 3, v: () => S.home.items.length },
  { id: 'star', name: '星星收集家', desc: '收集 30 顆星星', goal: 30, v: () => S.stars },
  { id: 'music', name: '節拍小歌手', desc: '在小鳥音樂亭唱完 3 首歌', goal: 3, v: () => S.prog.songs },
  { id: 'butterfly', name: '森林救援隊', desc: '在迷霧森林救回 10 隻小精靈', goal: 10, v: () => S.prog.saved },
  { id: 'hat', name: '魔法造型師', desc: '帽子、披風、法杖都穿上', goal: 3, v: () => GEAR.filter(k => S.equip[k]).length },
  { id: 'potion', name: '任務小達人', desc: '領取 10 次今日任務獎勵', goal: 10, v: () => S.prog.quests },
  { id: 'crystal', name: '閃亮魔法師', desc: '升到 Lv.5', goal: 5, v: () => S.level },
  { id: 'crown', name: '小龍的好朋友', desc: '在魔王試煉塔打敗迷糊小龍', goal: 1, v: () => S.bossWins || 0, reward: 100 },
  { id: 'bow', name: '市集小幫手', desc: '在星光市集完成 3 回合', goal: 3, v: () => subjRounds('素養') }
];
const badgeURL = (b, on) => vq(`img/badge/${b.id}${on ? '' : '_off'}.webp`);
let badgeQueue = [];
function checkBadges() {
  if (!KID) return; let got = false;
  BADGES.forEach(b => { if (S.badges[b.id]) return; let v = 0; try { v = b.v(); } catch (e) {} if (v >= b.goal) { S.badges[b.id] = Date.now(); addCoins(b.reward || 50); badgeQueue.push(b); got = true; } });
  if (got) { save(); refreshHUD(); if (badgeUI) badgeUI.render(); }
}
function showBadgeQueue() {
  if (!badgeQueue.length || !SAFE_SCR.includes(curName)) return;
  if (modalOpen()) return setTimeout(showBadgeQueue, 1500);
  const list = badgeQueue.splice(0); SFX.level();
  const { c, m } = modal(`<div class="center"><h2 class="ichead">${icon('crown', 'hic')}得到新徽章！</h2><div class="newbadges">${list.map(b => `<div><img src="${badgeURL(b, true)}" alt=""><b>${esc(b.name)}</b><small>${coinIc}+${b.reward || 50} 金幣</small></div>`).join('')}</div>` +
    `<div class="actions"><button class="pill cream" data-a="ok">好棒！</button><button class="pill" data-a="see">看徽章冊</button></div></div>`);
  on(c, '[data-a=ok]', () => closeModal(m)); on(c, '[data-a=see]', () => { closeModal(m); openBadges(); });
}
let backFrom = 'map';
function openBadges() { if (!KID) return; if (!SAFE_SCR.includes(curName)) return showQuests(); if (!['badges', 'status'].includes(curName)) backFrom = curName; go('badges', true); }
function openStatus() { if (!['badges', 'status'].includes(curName)) backFrom = curName; go('status', true); }
let badgeUI = null;
function buildBadges() {
  const s = screen('badges', 'badgeBg');
  for (let i = 0; i < 8; i++) twinkle(s, rr(260, 1200), rr(250, 900));
  petals(s, 5);
  const back = el('button', 'backpill', s, ICON.back + '<span>返回</span>'); place(back, 24, 26); back.addEventListener('click', () => { SFX.tap(); go(backFrom || 'map', true); });
  const chip = el('div', 'hallchip bchip', s); place(chip, 524, 30, 400, 76);
  const qb = el('button', 'pill small', s, '今日任務'); place(qb, 1160, 28, 250, 80); qb.addEventListener('click', () => { SFX.tap(); showQuests(); });
  const kid = el('div', 'actor bunbox', s); place(kid, -10, 790, 230, 300); const kb = el('div', 'body', kid); let ksp = null, KA = null;
  btn(s, 'hot rect', 0, 800, 210, 280, () => { if (ksp) { const P = POSE(KA); ksp.play(P.cheer, P.cheerMs === 140 ? 150 : 1000, 300, P.idle); SFX.ok(); } }, '我的角色');
  const grid = el('div', 'bgrid2', s); place(grid, 300, 262, 880, 650);
  function render() {
    const n = BADGES.filter(b => S.badges[b.id]).length;
    chip.innerHTML = `魔法徽章冊　<b>${n}</b> / ${BADGES.length}`;
    grid.innerHTML = BADGES.map(b => { const on = !!S.badges[b.id]; return `<button class="bdg ${on ? 'on' : ''}" data-b="${b.id}"><img src="${badgeURL(b, on)}" alt=""><b>${on ? esc(b.name) : '？？？'}</b></button>`; }).join('');
    grid.querySelectorAll('[data-b]').forEach(e => e.onclick = () => { SFX.tap(); detail(BADGES.find(b => b.id === e.dataset.b)); });
    if (KA !== (KID && KID.animal)) { KA = KID && KID.animal; kb.innerHTML = ''; ksp = makeSprite(kb, poseFrames(POSE(KA))); ksp.show(POSE(KA).idle); }
  }
  function detail(b) {
    const on = !!S.badges[b.id]; let v = 0; try { v = Math.min(b.v(), b.goal); } catch (e) {}
    modal(`<div class="center"><img class="buyimg" src="${badgeURL(b, on)}" alt=""><h2>${esc(b.name)}</h2><p>${esc(b.desc)}</p>` +
      (on ? `<p class="muted">${new Date(S.badges[b.id]).toLocaleDateString('zh-TW')} 得到的，好厲害！</p>` :
        `<div class="pbar"><i style="width:${v / b.goal * 100}%"></i></div><p class="muted">目前 ${v} / ${b.goal}　得到徽章可以拿 ${coinIc}${b.reward || 50} 枚金幣</p>`) + '</div>');
  }
  badgeUI = { render };
  onShow.badges = () => { checkBadges(); render(); };
}

/* ================= 小朋友的狀態 ================= */
const STATUS_ROWS = [
  { subj: '國語', y: 380, go: 'hall_chinese' }, { subj: '自然', y: 490, go: 'hall_science' }, { subj: '素養', y: 600, go: 'hall_literacy' },
  { subj: '數學', y: 710, go: 'bakery' }, { subj: '音樂', y: 820, go: 'music' }
];
const CHEERS = ['今天也一起加油吧！', '每答對一題，魔法就變強一點！', '錯了也沒關係，迷霧森林可以複習喔。', '收集徽章，變成傳說魔法師！', '慢慢想，你一定可以的！'];
function buildStatus() {
  const s = screen('status', 'statusBg');
  const face = el('div', 'avface stface', s); circ(face, 102, 80, 56);
  const xp = el('div', 'xp stxp', s, '<i></i><b></b>'); place(xp, 186, 54, 268, 40);
  rbtn(s, 1142, 70, 50, () => go(backFrom || 'map', true), '返回'); rbtn(s, 1258, 70, 50, () => showBag(), '背包'); rbtn(s, 1373, 70, 50, showSettings, '設定');
  const rows = STATUS_ROWS.map(r => { const d = el('button', 'strow', s); place(d, 335, r.y - 40, 320, 80); d.addEventListener('click', () => { SFX.tap(); go(r.go, true); }); return d; });
  const name = el('div', 'stname', s); place(name, 905, 298, 200, 56);
  const sprBox = el('div', 'actor bunbox stspr', s); place(sprBox, 905, 372, 210, 250); const sb = el('div', 'body', sprBox); let sp = null, SA = null;
  btn(s, 'hot rect', 905, 372, 210, 250, () => { if (sp) { const P = POSE(SA); sp.play([P.giggle[rnd(P.giggle.length)]], 1200, 0, P.idle); SFX.ok(); say(); } }, '我的角色');
  const gear = el('div', 'stgear', s); place(gear, 808, 380, 80, 240);
  const info = el('div', 'stinfo', s); place(info, 810, 618, 400, 92);
  const cheer = el('div', 'stcheer', s); place(cheer, 300, 868, 380, 44);
  const sw = el('div', 'stsw', s, '換別的小朋友'); place(sw, 852, 884, 312, 36);
  btn(s, 'hot rect', 852, 762, 312, 118, () => { flushSave(); switchKid(); }, '換別的小朋友');
  [['徽章', 1325, 357, openBadges], ['背包', 1325, 450, () => showBag()], ['小屋', 1330, 612, () => go('home', true)], ['任務', 1325, 675, showQuests]].forEach(([t, x, y, fn]) => {
    const l = el('div', 'sttab', s, t); place(l, x - 32, y - 18, 64, 36); rbtn(s, x, t === '小屋' ? 565 : y, t === '小屋' ? 55 : 38, fn, t); });
  function say() { cheer.textContent = CHEERS[rnd(CHEERS.length)]; }
  function render() {
    const A = KID ? KID.animal : 'bunny';
    face.style.backgroundImage = `url("${frURL(POSE(A).idle)}")`;
    const pct = Math.min(100, S.xp / need(S.level) * 100);
    xp.querySelector('i').style.width = Math.max(6, pct) + '%'; xp.querySelector('b').textContent = `Lv.${S.level}　${S.xp} / ${need(S.level)}`;
    rows.forEach((d, i) => {
      const sj = STATUS_ROWS[i].subj, rounds = subjRounds(sj);
      const keys = Object.keys(S.unitStars || {}).filter(k => k.startsWith(sj + '|'));
      const total = Math.max(sj === '音樂' ? SONGS2.length : unitsOf(sj).length, keys.length, 1);
      const stars = keys.reduce((a, k) => a + (S.unitStars[k] || 0), 0);
      d.innerHTML = `<b>${sj}</b><div class="sti"><span>完成 ${rounds} 回合　★ ${stars}</span><div class="strbar"><div class="pbar sm"><i style="width:${keys.length / total * 100}%"></i></div><small>單元 ${keys.length}/${total}</small></div></div>`;
    });
    name.textContent = KID ? KID.nick : '';
    if (SA !== A) { SA = A; sb.innerHTML = ''; sp = makeSprite(sb, poseFrames(POSE(A))); sp.show(POSE(A).idle); }
    gear.innerHTML = GEAR.map(k => { const it = S.equip[k] ? itemOf(k, S.equip[k]) : null; return `<div class="sgi">${it ? `<img src="${shopURL(it.id)}" alt="">` : `<span>${SHOP[k].slot}</span>`}</div>`; }).join('');
    const nb = BADGES.filter(b => S.badges[b.id]).length;
    info.innerHTML = `<b>${esc(title(S.level))}</b><span>${coinIc}${S.coins}　★ ${S.stars}　徽章 ${nb} / ${BADGES.length}</span>`;
    say();
  }
  onShow.status = render;
}

/* ================= 兔兔小屋 ================= */
const FURN_W = { fa_0: 250, fa_1: 210, fa_2: 120, fa_3: 200, fa_4: 210, fa_5: 260, fa_6: 120, fa_7: 120, fa_8: 240, fa_9: 170, fa_10: 170, fa_11: 110, fa_12: 150, fa_13: 120, fa_14: 140, fa_15: 190,
  fb_0: 250, fb_1: 230, fb_2: 230, fb_3: 140, fb_4: 120, fb_5: 100, fb_6: 120, fb_7: 110, fb_8: 110, fb_9: 140, fb_10: 110, fb_11: 200, fb_12: 170, fb_13: 170, fb_14: 200, fb_15: 120 };
const HOME_BOX = { x0: 70, x1: 1380, y0: 150, y1: 1060 };
function buildHome() {
  const s = screen('home', 'homeBg');
  glow(s, 712, 120, 70, 'warm'); glow(s, 840, 270, 50, 'warm');
  [[0, 0, 260, 330, '0% 0%'], [520, 0, 360, 200, '50% 0%'], [0, 690, 170, 396, '0% 100%'], [1230, 720, 218, 366, '100% 100%']].forEach(t => patch(s, t[0], t[1], t[2], t[3], 'a-sway', t[4]));
  for (let i = 0; i < 6; i++) twinkle(s, rr(280, 540), rr(110, 300));
  const room = el('div', 'roomlayer', s);
  kitHUD(s, { home: () => { if (edit) setEdit(false); go('map', true); } });
  const kid = el('div', 'roomkid', room); const kb = el('div', 'wbody', el('div', 'flip', kid)); let ksp = null, KA = null, K = { x: 720, y: 820 }, walkT = null;
  const bub = el('div', 'say follow', s); bub.style.display = 'none'; let bT = null;
  function say(t) { bub.textContent = t; bub.style.display = 'block'; bub.classList.remove('pop'); void bub.offsetWidth; bub.classList.add('pop'); placeBub(); clearTimeout(bT); bT = setTimeout(() => bub.style.display = 'none', 3000); }
  function placeBub() { bub.style.left = pctX(K.x); bub.style.top = pctY(K.y - 245); }
  function putKid() { kid.style.left = pctX(K.x); kid.style.top = pctY(K.y); kid.style.zIndex = Math.round(K.y); placeBub(); }
  function moveKid(x, y) {
    const P = POSE(KA); const dx = x - K.x; if (Math.abs(dx) > 4) kid.classList.toggle('left', P.sideLeft ? dx > 0 : dx < 0);
    const dist = Math.hypot(x - K.x, y - K.y), ms = Math.max(250, dist / 0.42);
    kid.style.transition = `left ${ms}ms linear, top ${ms}ms linear`; K.x = x; K.y = y; putKid();
    clearInterval(walkT); let f = 0; kid.classList.add('walking'); walkT = setInterval(() => { f = (f + 1) % P.walk.length; ksp.show(P.walk[f]); }, 110);
    setTimeout(() => { clearInterval(walkT); kid.classList.remove('walking'); ksp.show(P.idle); S.home.kid = [Math.round(K.x), Math.round(K.y)]; save(); }, ms + 20);
  }
  // furniture
  const els = new Map(); let edit = false, sel = null;
  function itemEl(it) {
    let e = els.get(it);
    if (!e) { e = el('div', 'furn', room); e.innerHTML = `<img src="${shopURL(it.id)}" alt="" draggable="false">`; els.set(it, e); bindDrag(e, it); }
    e.style.left = pctX(it.x); e.style.top = pctY(it.y); e.style.width = pctX(FURN_W[it.id] || 160); e.style.zIndex = Math.round(it.y);
    e.classList.toggle('flip', !!it.f); e.classList.toggle('sel', sel === it); return e;
  }
  function drawAll() { els.forEach((e, it) => { if (!S.home.items.includes(it)) { e.remove(); els.delete(it); } }); S.home.items.forEach(itemEl); }
  function bindDrag(e, it) {
    let st = null;
    e.addEventListener('pointerdown', ev => { if (!edit) return; ev.stopPropagation(); ev.preventDefault(); const p = toStage(ev); st = { id: ev.pointerId, dx: it.x - p.x, dy: it.y - p.y, p0: p, moved: false }; try { e.setPointerCapture(ev.pointerId); } catch (er) {} select(it); });
    e.addEventListener('pointermove', ev => { if (!st || ev.pointerId !== st.id) return; const p = toStage(ev); if (!st.moved && Math.hypot(p.x - st.p0.x, p.y - st.p0.y) < 8) return; st.moved = true;
      it.x = Math.round(Math.min(HOME_BOX.x1, Math.max(HOME_BOX.x0, p.x + st.dx))); it.y = Math.round(Math.min(HOME_BOX.y1, Math.max(HOME_BOX.y0, p.y + st.dy))); itemEl(it); tools(); });
    const end = ev => { if (!st || ev.pointerId !== st.id) return; const mv = st.moved; st = null; if (mv) { save(); SFX.step(); } };
    e.addEventListener('pointerup', end); e.addEventListener('pointercancel', end);
  }
  const tb = el('div', 'furntools', s); tb.style.display = 'none';
  tb.innerHTML = `<button data-t="flip">翻轉</button><button data-t="back">往後</button><button data-t="put">收起來</button>`;
  tb.addEventListener('pointerdown', e => e.stopPropagation());
  tb.querySelectorAll('button').forEach(b => b.addEventListener('click', e => { e.stopPropagation(); SFX.tap(); if (!sel) return; const t = b.dataset.t;
    if (t === 'flip') { sel.f = !sel.f; itemEl(sel); }
    if (t === 'back') { sel.y = Math.max(HOME_BOX.y0, sel.y - 30); itemEl(sel); tools(); }
    if (t === 'put') { S.home.items = S.home.items.filter(x => x !== sel); sel = null; drawAll(); tray(); tools(); }
    save(); }));
  function select(it) { sel = it; els.forEach((e, x) => e.classList.toggle('sel', x === it)); tools(); }
  function tools() { if (!edit || !sel) { tb.style.display = 'none'; return; } tb.style.display = 'flex'; const r = els.get(sel).getBoundingClientRect(), a = toStage({ clientX: r.left + r.width / 2, clientY: r.top }), b = toStage({ clientX: r.left, clientY: r.bottom });
    tb.style.left = pctX(Math.min(1250, Math.max(200, a.x))); tb.style.top = pctY(a.y - 80 > 120 ? a.y - 80 : Math.min(860, b.y + 10)); }
  // edit tray
  const editBtn = el('button', 'pill homebtn', s, '擺家具'); place(editBtn, 1130, 966, 290, 96);
  editBtn.addEventListener('click', () => { SFX.tap(); setEdit(!edit); });
  const trayEl = el('div', 'hometray', s); place(trayEl, 30, 940, 1080, 140); trayEl.style.display = 'none';
  trayEl.addEventListener('pointerdown', e => e.stopPropagation());
  let tp = 0; const TPP = 6;
  function freeItems() { const used = {}; S.home.items.forEach(x => { used[x.id] = (used[x.id] || 0) + 1; }); return (S.inv.furn || []).filter(id => { if (used[id]) { used[id]--; return false; } return true; }); }
  function tray() {
    if (!edit) return; const free = freeItems(); const pages = Math.max(1, Math.ceil(free.length / TPP)); tp = Math.min(tp, pages - 1);
    trayEl.innerHTML = free.length ? `<button class="spg" data-p="-1" ${tp ? '' : 'disabled'}>◀</button><div class="trayitems">${free.slice(tp * TPP, tp * TPP + TPP).map(id => `<button class="titem" data-id="${id}"><img src="${shopURL(id)}" alt=""><small>${esc(itemOf('furn', id).name)}</small></button>`).join('')}</div><button class="spg" data-p="1" ${tp < pages - 1 ? '' : 'disabled'}>▶</button>`
      : `<p class="traynote">${(S.inv.furn || []).length ? '家具都擺好了！按家具可以移動、翻轉或收起來。' : '還沒有家具喔！到地圖右下角的家具店買吧。'}</p>`;
    trayEl.querySelectorAll('[data-p]').forEach(b => b.onclick = () => { SFX.tap(); tp += +b.dataset.p; tray(); });
    trayEl.querySelectorAll('.titem').forEach(b => b.onclick = () => { SFX.ok(); const sp = freeSpot(); const it = { id: b.dataset.id, x: sp[0], y: sp[1], f: false }; S.home.items.push(it); drawAll(); select(it); tray(); save(); checkBadges(); setTimeout(showBadgeQueue, 600); });
  }
  // 新家具放在地板上最空的位置，不會全部疊在中間、也不會擋住角色
  function freeSpot() {
    const spots = [[430, 840], [1010, 840], [600, 950], [860, 950], [1160, 720], [300, 760], [760, 600], [1040, 610], [520, 640], [1230, 900]];
    const taken = S.home.items.map(x => [x.x, x.y]).concat([[K.x, K.y]]);
    let best = spots[0], bd = -1;
    spots.forEach(p => { const d = Math.min(...taken.map(t => Math.hypot(p[0] - t[0], (p[1] - t[1]) * 1.4))); if (d > bd) { bd = d; best = p; } });
    return [best[0] + rr(-20, 20) | 0, best[1] + rr(-12, 12) | 0];
  }
  function setEdit(on) { edit = on; s.classList.toggle('editing', on); editBtn.textContent = on ? '完成' : '擺家具'; trayEl.style.display = on ? 'flex' : 'none'; if (!on) { sel = null; drawAll(); } tools(); tray(); if (on) say('拖拉家具，擺到喜歡的地方吧！'); else { save(); flushSave(); } }
  // tap the floor: walk there / deselect
  room.addEventListener('pointerdown', e => {
    const p = toStage(e); if (p.y < 130) return;
    if (edit) { sel = null; els.forEach(x => x.classList.remove('sel')); tools(); return; }
    if (Math.hypot(p.x - K.x, p.y - (K.y - 100)) < 90) { const P = POSE(KA); ksp.play(P.cheer, P.cheerMs === 140 ? 150 : 1000, 300, P.idle); SFX.ok(); return say(['這是我的家！', '我好喜歡這裡！', `我有 ${S.home.items.length} 件家具了！`][rnd(3)]); }
    moveKid(Math.min(1330, Math.max(110, p.x)), Math.min(1040, Math.max(470, p.y)));
  });
  onShow.home = () => {
    if (KA !== (KID && KID.animal)) { KA = KID && KID.animal; kb.innerHTML = ''; ksp = makeSprite(kb, poseFrames(POSE(KA))); ksp.show(POSE(KA).idle); }
    if (S.home.kid) { K.x = S.home.kid[0]; K.y = S.home.kid[1]; } kid.style.transition = 'none'; putKid();
    els.forEach(e => e.remove()); els.clear(); drawAll(); if (edit) setEdit(false);
    setTimeout(() => say((S.inv.furn || []).length > S.home.items.length ? '按右下角「擺家具」，把新家具放進來吧！' : '回到家了！'), 500);
  };
}

/* ================= RESULT ================= */
let resultUI = null;
const STAR_POS = [['starA', 499, 173, 147, 139], ['starB', 648, 143, 154, 143], ['starA', 802, 168, 147, 139]];
function buildResult() {
  const s = screen('result', 'result');
  patch(s, 520, 330, 380, 470, 'a-float', '50% 100%', 'soft');
  [[300, 250], [1150, 250], [420, 600], [1050, 560], [700, 120], [180, 420], [1290, 430], [600, 700], [880, 700]].forEach(p => twinkle(s, ...p));
  petals(s, 7);
  const rh = makeHUD(s, { face: [96, 63, 47], lv: [200, 73], xp: [238, 58, 292, 37], coin: [995, 50, 175, 62], bag: [1253, 71, 48], settings: [1374, 71, 48] }); rh.lv.classList.add('gold');
  const stars = STAR_POS.map(([k, x, y, w, h]) => { const im = el('img', 'rstar', s); im.src = IMG[k]; im.alt = ''; place(im, x, y, w, h); return im; });
  const banner = el('div', 'banner rbanner', s); place(banner, 724, 748); // 放在獎勵上方，不會被星星蓋住
  const gain = el('div', 'gain', s); place(gain, 724, 812);
  const again = btn(s, 'bigbtn pink', 257, 896, 428, 154, () => { if (lastRetry) lastRetry(); }, '再玩一次'); again.textContent = '再玩一次';
  const back = btn(s, 'bigbtn cream', 753, 896, 428, 154, () => { go(lastBack || 'bakery', true); }, '回餐廳'); back.textContent = '回餐廳';
  resultUI = { stars, banner, gain, back };
}
function finishRound() {
  const st0 = R.st; const r = R; R = null;
  if (st0.key) { /* unit-map round */ }
  finishGeneric({ n: r.qs.length, first: r.first, coins: r.coins, xp: r.xp, bonus: st0.bonus, key: st0.key || null, subj: '數學' });
}
function showResult(res) {
  go('result', true);
  setTimeout(() => {
    resultUI.banner.textContent = `一次答對 ${res.f} / ${res.n} 題`;
    resultUI.gain.innerHTML = `<span>${icon('coin', 'coin')}+${res.coins} 金幣</span><span>${icon('gem', 'coin')}+${res.xp} 經驗</span>`;
    resultUI.back.textContent = lastBack === 'bakery' ? '回餐廳' : lastBack === 'mathmap' ? '回單元地圖' : '回到館內';
    resultUI.stars.forEach(st => st.classList.remove('on'));
    for (let i = 0; i < res.stars; i++) setTimeout(() => { resultUI.stars[i].classList.add('on'); SFX.star(); }, 500 + i * 450);
    setTimeout(() => { if (pendingLevels.length) showLevelUps(); }, 800 + res.stars * 450);
  }, 320);
}
function showLevelUps() {
  const L = pendingLevels.shift(); if (!L) return; SFX.level();
  const { c, m } = modal(`<img class="avatar" src="${IMG.avatar}" alt=""><div class="lvbig">Lv.${L}</div><h2 class="center">升級了！你現在是「${esc(title(L))}」</h2><p class="center">${UNLOCK_MSG[L] || '題目會越來越有挑戰性，金幣也會越來越多喔！'}</p><div class="actions"><button class="pill" data-a="ok">太棒了！</button></div>`, { close: false });
  on(c, '[data-a=ok]', () => { closeModal(m); refreshHUD(); if (pendingLevels.length) showLevelUps(); });
}

/* ================= quests / profile / settings ================= */
const QUESTS = [
  { id: 'r1', text: '完成 1 回合挑戰', goal: 1, key: 'rounds', reward: 30, ic: 'book' },
  { id: 'c15', text: '今天答對 15 題', goal: 15, key: 'correct', reward: 50, ic: 'gem' },
  { id: 's5', text: '今天收集 5 顆星星', goal: 5, key: 'stars', reward: 50, ic: 'wand' }
];
function showQuests() {
  const d = D();
  const rows = QUESTS.map(q => { const v = Math.min(d[q.key], q.goal), done = v >= q.goal, cl = d.claimed.includes(q.id);
    return `<div class="quest">${icon(q.ic, 'qic')}<div class="qt">${q.text}<div class="bar"><i style="width:${v / q.goal * 100}%"></i></div><small>${v} / ${q.goal}　獎勵 ${coinIc}${q.reward} 金幣</small></div><button class="pill small" data-q="${q.id}" ${!done || cl ? 'disabled' : ''}>${cl ? '已領取' : done ? '領取' : '進行中'}</button></div>`; }).join('');
  const { c } = modal(`<h2 class="ichead">${icon('scroll', 'hic')}今日任務</h2>${rows}<p class="muted" style="margin-top:calc(var(--u)*16)">每天都會有新的任務喔！</p>`);
  c.querySelectorAll('[data-q]').forEach(b => b.addEventListener('click', () => { const q = QUESTS.find(x => x.id === b.dataset.q); if (d.claimed.includes(q.id)) return; d.claimed.push(q.id); S.prog.quests++; addCoins(q.reward); SFX.coin(); refreshHUD(); b.textContent = '已領取'; b.disabled = true; floatText(`+${q.reward} 金幣`, 724, 420); toast(`拿到 ${q.reward} 枚金幣！`); }));
}
function showProfile() { if (KID && SAFE_SCR.includes(curName)) return openStatus(); showProfileModal(); }
function showProfileModal() { const { c, m } = modal(`<img class="avatar" src="${animalImg(KID && KID.animal)}" alt=""><h2 class="center">${esc(KID ? KID.nick : '')}　Lv.${S.level} ${esc(title(S.level))}</h2><p class="center">${coinIc}${S.coins}　★ ${S.stars}　完成 ${S.rounds} 回合</p><p class="center muted">再拿 ${need(S.level) - S.xp} 點經驗就能升級！</p>${outfitRow()}<div class="actions"><button class="pill cream" data-a="bag">我的背包</button><button class="pill cream" data-a="sw">換別的小朋友</button></div>`); on(c, '[data-a=sw]', () => { closeModal(m); switchKid(); }); on(c, '[data-a=bag]', () => { closeModal(m); showBag(); }); }
function showSettings() {
  const { c, m } = modal(`<h2>設定</h2><div class="setrow"><span>音效</span><div class="seg"><button data-s="1" class="${S.settings.sound ? 'on' : ''}">開</button><button data-s="0" class="${S.settings.sound ? '' : 'on'}">關</button></div></div><div class="setrow"><span>背景音樂</span><div class="seg"><button data-m="1" class="${S.settings.music ? 'on' : ''}">開</button><button data-m="0" class="${S.settings.music ? '' : 'on'}">關</button></div></div><div class="actions"><button class="pill purple" data-a="parent">家長專區</button></div>`);
  c.querySelectorAll('[data-m]').forEach(b => b.addEventListener('click', () => { S.settings.music = b.dataset.m === '1'; save(); c.querySelectorAll('[data-m]').forEach(x => x.classList.toggle('on', x === b)); SFX.tap(); Music.refresh(); }));
  c.querySelectorAll('[data-s]').forEach(b => b.addEventListener('click', () => { S.settings.sound = b.dataset.s === '1'; save(); c.querySelectorAll('[data-s]').forEach(x => x.classList.toggle('on', x === b)); SFX.tap(); }));
  on(c, '[data-a=parent]', () => { closeModal(m); adultGate(() => adminPanel('report')); });
}
/* ================= ACCOUNTS / CLOUD ================= */
const code = n => { const a = 'abcdefghjkmnpqrstuvwxyz23456789'; let s = ''; for (let i = 0; i < n; i++) s += a[rnd(a.length)]; return s; };
const QS = new URLSearchParams(location.search);
const USE_LOCAL = !!window.INLINE_QUESTIONS || QS.has('local');
const FB = (() => {
  if (USE_LOCAL || !window.firebase || !CFG.firebase) return null;
  try { firebase.initializeApp(CFG.firebase); } catch (e) {}
  const auth = firebase.auth(), db = firebase.firestore();
  try { db.enablePersistence({ synchronizeTabs: true }).catch(() => {}); } catch (e) {}
  const fam = () => db.collection('families').doc(auth.currentUser.uid);
  const kids = () => fam().collection('kids');
  const grp = gid => db.collection('groups').doc(gid);
  return {
    kind: 'cloud',
    onAuth: cb => auth.onAuthStateChanged(u => cb(u ? { uid: u.uid, email: u.email } : null)),
    register: (e, p, name) => auth.createUserWithEmailAndPassword(e, p).then(() => fam().set({ email: e, name, createdAt: Date.now() }, { merge: true })),
    login: (e, p) => auth.signInWithEmailAndPassword(e, p),
    reset: e => auth.sendPasswordResetEmail(e),
    logout: () => { parentOkUntil = 0; return auth.signOut(); },
    reauth: p => { const u = auth.currentUser; return u.reauthenticateWithCredential(firebase.auth.EmailAuthProvider.credential(u.email, p)); },
    family: () => fam().get().then(d => d.exists ? d.data() : {}),
    setFamily: f => fam().set(f, { merge: true }),
    listKids: () => kids().get().then(q => q.docs.map(d => Object.assign({ id: d.id }, d.data()))),
    addKid: k => kids().add(Object.assign({ createdAt: Date.now() }, k)).then(r => r.id),
    updateKid: (id, f) => kids().doc(id).set(f, { merge: true }),
    deleteKid: id => kids().doc(id).delete(),
    loadKid: id => kids().doc(id).get().then(d => d.exists ? d.data() : null),
    saveState: (id, st) => kids().doc(id).set({ state: st, updatedAt: Date.now() }, { merge: true }),
    snapshot: (id, date, st) => kids().doc(id).collection('snapshots').doc(date).set({ state: st, t: Date.now() }),
    logAnswer: (id, r) => kids().doc(id).collection('answers').add(r),
    answers: (id, n) => kids().doc(id).collection('answers').orderBy('t', 'desc').limit(n).get().then(q => q.docs.map(d => d.data())),
    group: gid => grp(gid).get().then(d => d.exists ? Object.assign({ id: gid }, d.data()) : null),
    createGroup: name => { const gid = code(8); return grp(gid).set({ owner: auth.currentUser.uid, name, createdAt: Date.now() }).then(() => gid); },
    setMember: (gid, data) => grp(gid).collection('members').doc(auth.currentUser.uid).set(data, { merge: true }),
    members: gid => grp(gid).collection('members').get().then(q => q.docs.map(d => Object.assign({ uid: d.id }, d.data()))),
    approve: (gid, uid) => grp(gid).collection('members').doc(uid).set({ status: 'approved' }, { merge: true }),
    removeMember: (gid, uid) => grp(gid).collection('members').doc(uid).delete(),
    uid: () => auth.currentUser && auth.currentUser.uid,
    listFamilies: () => db.collection('families').get().then(q => q.docs.map(d => Object.assign({ uid: d.id }, d.data()))),
    kidsOf: uid => db.collection('families').doc(uid).collection('kids').get().then(q => q.docs.map(d => Object.assign({ id: d.id }, d.data()))),
    setFamilyOf: (uid, f) => db.collection('families').doc(uid).set(f, { merge: true }),
    deleteFamily: async uid => {
      const famRef = db.collection('families').doc(uid); const ks = await famRef.collection('kids').get();
      for (const k of ks.docs) { for (const sub of ['answers', 'snapshots']) { let q; do { q = await k.ref.collection(sub).limit(300).get(); const b = db.batch(); q.docs.forEach(d => b.delete(d.ref)); if (q.size) await b.commit(); } while (q.size); } await k.ref.delete(); }
      await famRef.delete();
    }
  };
})();
const LOCALBE = (() => {
  const K = 'bw-local-db'; let db; try { db = JSON.parse(localStorage.getItem(K)) || {}; } catch (e) { db = {}; }
  db.kids = db.kids || {}; db.answers = db.answers || {}; db.family = db.family || {};
  const sv = () => { try { localStorage.setItem(K, JSON.stringify(db)); } catch (e) {} };
  const ok = v => Promise.resolve(v);
  return {
    kind: 'local', onAuth: cb => setTimeout(() => cb({ uid: 'local', email: '這台裝置' }), 0),
    register: () => ok(), login: () => ok(), reset: () => ok(), logout: () => ok(), reauth: () => ok(),
    family: () => ok(db.family), setFamily: f => { Object.assign(db.family, f); sv(); return ok(); },
    listKids: () => ok(Object.entries(db.kids).map(([id, k]) => Object.assign({ id }, k))),
    addKid: k => { const id = code(10); db.kids[id] = Object.assign({ createdAt: Date.now() }, k); sv(); return ok(id); },
    updateKid: (id, f) => { if (db.kids[id]) { Object.keys(f).forEach(k => { db.kids[id][k] = f[k]; }); sv(); } return ok(); },
    deleteKid: id => { delete db.kids[id]; delete db.answers[id]; sv(); return ok(); },
    loadKid: id => ok(db.kids[id] ? JSON.parse(JSON.stringify(db.kids[id])) : null),
    saveState: (id, st) => { if (db.kids[id]) { db.kids[id].state = st; db.kids[id].updatedAt = Date.now(); sv(); } return ok(); },
    snapshot: () => ok(),
    logAnswer: (id, r) => { const a = db.answers[id] = db.answers[id] || []; a.push(r); if (a.length > 3000) a.shift(); sv(); return ok(); },
    answers: (id, n) => ok((db.answers[id] || []).slice(-n).reverse()),
    group: () => ok(null), createGroup: () => Promise.reject(new Error('local')), setMember: () => ok(), members: () => ok([]),
    approve: () => ok(), removeMember: () => ok(), uid: () => 'local',
    listFamilies: () => ok([Object.assign({ uid: 'local', email: '這台裝置' }, db.family)]), kidsOf: () => ok(Object.entries(db.kids).map(([id, k]) => Object.assign({ id }, k))),
    setFamilyOf: (u, f) => { Object.assign(db.family, f); sv(); return ok(); }, deleteFamily: () => { db.kids = {}; db.answers = {}; sv(); return ok(); }
  };
})();
const BE = FB || LOCALBE;
async function hashPin(salt, pin) {
  const txt = salt + ':' + pin + ':ambermagic';
  try { const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(txt)); return Array.from(new Uint8Array(b)).map(x => x.toString(16).padStart(2, '0')).join(''); }
  catch (e) { let h = 0; for (const ch of txt) h = (h * 31 + ch.charCodeAt(0)) | 0; return 'h' + h; }
}
const errMsg = e => {
  const c = (e && e.code) || '';
  return ({ 'auth/invalid-email': 'Email 格式不正確', 'auth/email-already-in-use': '這個 Email 已經註冊過了，請直接登入', 'auth/weak-password': '密碼至少要 6 個字',
    'auth/invalid-credential': 'Email 或密碼不正確', 'auth/wrong-password': 'Email 或密碼不正確', 'auth/user-not-found': '找不到這個帳號', 'auth/too-many-requests': '嘗試太多次，請稍後再試',
    'auth/network-request-failed': '網路連線有問題，請檢查網路' })[c] || ('發生錯誤：' + (c || (e && e.message) || '請稍後再試'));
};
if (QS.get('invite')) { try { localStorage.setItem('bw-invite', QS.get('invite')); } catch (e) {} }
const pendingInvite = () => { try { return localStorage.getItem('bw-invite'); } catch (e) { return null; } };
const clearInvite = () => { try { localStorage.removeItem('bw-invite'); } catch (e) {} };

let FAMILY = {}, USER = null;
const isAdmin = () => !!(USER && USER.email && (CFG.adminEmails || []).map(x => x.toLowerCase()).includes(USER.email.toLowerCase())) || (BE.kind === 'local' && QS.has('admin'));
const gate = el('div', 'gate', stage); gate.style.setProperty('--src', `url("${IMG.gate}")`);
const gateSign = el('div', 'gatesign', gate); place(gateSign, 505, 84, 450, 92);
const gateLayer = el('div', 'gatelayer', gate);
let gateCard = null;
function showGate(html, free, sign, box) {
  gate.style.display = 'block'; gateLayer.innerHTML = '';
  gateSign.textContent = sign || (FAMILY && FAMILY.name) || '兔兔魔法世界';
  if (free) { gateCard = el('div', 'gatefree', gateLayer, html); }
  else {
    const fr = el('div', 'framecard', gateLayer); place(fr, ...(box || [314, 205, 820, 640])); fr.style.backgroundImage = `url("${IMG.frameWide}")`;
    gateCard = el('div', 'frameinner', fr, html);
  }
  gateCard.classList.add('pop');
}
function hideGate() { gate.style.display = 'none'; if (gate._stop) { gate._stop(); gate._stop = null; } }
function busy(btnEl, on) { if (!btnEl) return; btnEl.disabled = on; if (on) { btnEl.dataset.t = btnEl.textContent; btnEl.textContent = '請稍候…'; } else if (btnEl.dataset.t) btnEl.textContent = btnEl.dataset.t; }

function showAuth(mode = 'login', msg = '') {
  const inv = pendingInvite();
  const title2 = { login: '家長登入', register: '建立家庭帳號', reset: '忘記密碼' }[mode];
  showGate(``+
    (inv ? `<p class="note">你收到好友圈的邀請，登入或註冊後就會送出加入申請。</p>` : '') +
    (mode === 'register' ? `<label class="fl">家庭名稱<input id="g-name" maxlength="12" placeholder="例如：小安家"></label>` : '') +
    `<label class="fl">家長 Email<input id="g-email" type="email" autocomplete="email" inputmode="email" autocapitalize="off" autocorrect="off" spellcheck="false"></label>` +
    (mode !== 'reset' ? `<label class="fl">密碼<input id="g-pw" type="password" autocomplete="${mode === 'register' ? 'new-password' : 'current-password'}" placeholder="至少 6 個字"></label>` : '') +
    (mode === 'register' ? `<label class="fl">再輸入一次密碼<input id="g-pw2" type="password" autocomplete="new-password"></label>` : '') +
    `<p class="err">${esc(msg)}</p><button class="pill" id="g-go">${{ login: '登入', register: '註冊', reset: '寄送重設密碼信' }[mode]}</button>` +
    `<div class="links">${mode !== 'login' ? '<a data-m="login">已有帳號？登入</a>' : '<a data-m="register">還沒有帳號？註冊</a><a data-m="reset">忘記密碼</a>'}</div>` +
    `<p class="tiny">帳號由家長註冊管理。孩子只用暱稱遊玩，不需要填寫真實姓名。</p>`, false, title2, mode === 'register' ? [314, 182, 820, 896] : [344, 200, 760, 740]);
  gateCard.parentNode.classList.add('auth');
  gateCard.querySelectorAll('[data-m]').forEach(a => a.onclick = () => { SFX.tap(); showAuth(a.dataset.m); });
  const go = gateCard.querySelector('#g-go'), q = id => (gateCard.querySelector(id) || {}).value || '';
  const err = t => { gateCard.querySelector('.err').textContent = t; };
  go.onclick = async () => {
    SFX.tap(); const email = q('#g-email').trim();
    if (!email) return err('請輸入 Email');
    busy(go, true);
    try {
      if (mode === 'login') await BE.login(email, q('#g-pw'));
      else if (mode === 'register') {
        if (q('#g-pw') !== q('#g-pw2')) { busy(go, false); return err('兩次輸入的密碼不一樣'); }
        window.__justRegistered = true; await BE.register(email, q('#g-pw'), q('#g-name').trim() || '我的家');
      } else { await BE.reset(email); busy(go, false); return showAuth('login', '重設密碼的信已寄出，請到信箱收信。'); }
    } catch (e) { busy(go, false); err(errMsg(e)); }
  };
  // iPad 鍵盤按「前往／Enter」也能直接登入
  gateCard.querySelectorAll('input').forEach(i => i.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); if (!go.disabled) go.onclick(); } }));
}

async function handleInvite() {
  const gid = pendingInvite(); if (!gid || BE.kind !== 'cloud') return;
  try {
    if (FAMILY.groupId) { clearInvite(); return; }
    const g = await BE.group(gid); clearInvite();
    if (!g) { toast('邀請連結已失效'); return; }
    if (g.owner === USER.uid) return;
    await new Promise(res => {
      const { c, m } = modal(`<h2>加入好友圈</h2><p>你收到「${esc(g.name)}」的邀請。加入後，孩子們可以互相拜訪小屋、留言和送禮。</p><p class="muted">管理者同意後才會正式加入，只有好友圈裡的人看得到彼此的暱稱。</p><div class="actions"><button class="pill cream" data-a="no">先不要</button><button class="pill" data-a="yes">申請加入</button></div>`, { close: false });
      on(c, '[data-a=no]', () => { closeModal(m); res(); });
      on(c, '[data-a=yes]', async () => { closeModal(m); await BE.setMember(gid, { status: 'pending', family: FAMILY.name || '新朋友', kids: [], at: Date.now() }); await BE.setFamily({ groupId: gid }); FAMILY.groupId = gid; toast('已送出申請，等待管理者同意'); res(); });
    });
  } catch (e) { toast('邀請處理失敗，請稍後再試'); }
}
async function syncMemberKids() {
  if (!FAMILY.groupId || BE.kind !== 'cloud') return;
  try { const ks = await BE.listKids(); await BE.setMember(FAMILY.groupId, { family: FAMILY.name || '', kids: ks.map(k => ({ nick: k.nick, animal: k.animal || 'bunny' })) }); } catch (e) {}
}

async function showKids() {
  KID = null; Music.want('town');
  showGate('<p>讀取中…</p>');
  let ks = [];
  try { ks = await BE.listKids(); } catch (e) { showGate(`<h3 class="ftitle">連線失敗</h3><p>${esc(errMsg(e))}</p><button class="pill" id="g-re">重試</button>`); gateCard.querySelector('#g-re').onclick = showKids; return; }
  const cards = ks.map(k => `<button class="kidcard2" data-k="${k.id}" style="background-image:url('${IMG.frameCard}')"><img src="${animalImg(k.animal)}" alt=""><b>${esc(k.nick)}</b><small>Lv.${(k.state && k.state.level) || 1}</small></button>`).join('');
  showGate(`<div class="gatesub">今天是誰要來冒險呢？</div><div class="kidrow">${cards}<button class="kidcard2 add" data-a="add" style="background-image:url('${IMG.frameCard}')"><span>＋</span><b>新增小朋友</b></button></div>` +
    `<div class="gatelinks"><button class="pill cream small" data-a="admin">家長後台</button>${BE.kind === 'cloud' ? '<button class="pill cream small" data-a="out">登出</button>' : ''}</div>`, true);
  gateCard.querySelectorAll('[data-k]').forEach(b => b.onclick = () => { SFX.tap(); pinPad(ks.find(k => k.id === b.dataset.k)); });
  gateCard.querySelector('[data-a=add]').onclick = () => { SFX.tap(); adultGate(() => kidForm(ks.length === 0)); };
  gateCard.querySelector('[data-a=admin]').onclick = () => { SFX.tap(); adultGate(() => adminPanel('report')); };
  const out = gateCard.querySelector('[data-a=out]'); if (out) out.onclick = () => { SFX.tap(); adultGate(() => BE.logout()); };
  if (!ks.length) { if (window.__justRegistered || BE.kind === 'local') { window.__justRegistered = false; kidForm(true); } else setTimeout(() => adultGate(() => kidForm(true), '先由家長幫小朋友建立角色'), 300); }
}
function pinPad(k, title2, onOk) {
  let v = '';
  const { c, m } = modal(`<div class="center"><img class="avatar" src="${animalImg(k.animal)}" alt=""><h2>${esc(title2 || ('嗨，' + k.nick + '！'))}</h2><p>請輸入你的 4 位數密碼</p><div class="pindots"><i></i><i></i><i></i><i></i></div><p class="err"></p>` +
    `<div class="pinpad">${[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, 'del'].map(x => x === '' ? '<span></span>' : `<button class="key${x === 'del' ? ' del' : ''}" data-v="${x}">${x === 'del' ? ICON.del : x}</button>`).join('')}</div></div>`);
  const dots = c.querySelectorAll('.pindots i');
  c.querySelectorAll('[data-v]').forEach(b => b.onclick = async () => {
    SFX.tap(); const x = b.dataset.v;
    if (x === 'del') v = v.slice(0, -1); else if (v.length < 4) v += x;
    dots.forEach((d, i) => d.classList.toggle('on', i < v.length));
    if (v.length === 4) {
      const h = await hashPin(k.pinSalt || k.id, v);
      if (onOk) { closeModal(m); onOk(v); return; }
      if (h === k.pinHash) { closeModal(m); enterKid(k); }
      else { SFX.bad(); c.querySelector('.err').textContent = '密碼不對喔，再試一次（忘記的話請家長到後台重設）'; v = ''; dots.forEach(d => d.classList.remove('on')); c.querySelector('.pindots').classList.add('bad'); setTimeout(() => c.querySelector('.pindots').classList.remove('bad'), 400); }
    }
  });
}
// 家長密碼：第一次使用時設定（雲端版要先輸入登入密碼確認是家長），之後用密碼進入
let parentOkUntil = 0;
function adultGate(fn, note) {
  if (Date.now() < parentOkUntil) return fn();
  const pp = FAMILY && FAMILY.parentPin;
  if (!pp || !pp.hash) return setParentPin(fn, note);
  const { c, m } = modal(`<h2>家長密碼</h2>${note ? `<p class="muted">${esc(note)}</p>` : ''}<p>請輸入家長密碼${BE.kind === 'cloud' ? '<br><small class="muted">（也可以輸入家長帳號的登入密碼）</small>' : ''}</p>` +
    `<div class="actions"><input class="gatein pw" type="password" maxlength="64" autocomplete="off" autocapitalize="off" autocorrect="off" aria-label="家長密碼"><button class="pill" data-a="go">確認</button></div>` +
    `<p class="err center"></p><p class="center"><button class="linkbtn" data-a="forgot">忘記家長密碼？</button></p>`);
  const inp = c.querySelector('input'), er = c.querySelector('.err'); setTimeout(() => inp.focus(), 100);
  const go2 = async () => {
    const v = inp.value.trim(); if (!v) return;
    if (adultGate.lockUntil && Date.now() < adultGate.lockUntil) { er.textContent = '嘗試太多次，請等 30 秒再試'; return; }
    const pass = () => { adultGate.fails = 0; parentOkUntil = Date.now() + 5 * 60000; closeModal(m); fn(); };
    if (await hashPin(pp.salt, v) === pp.hash) return pass();
    // 家長常把「帳號登入密碼」打在這裡：雲端版也接受帳號登入密碼
    if (BE.kind === 'cloud' && v.length >= 6) { er.textContent = '確認中…'; try { await BE.reauth(inp.value); return pass(); } catch (e) { er.textContent = ''; } }
    inp.value = ''; SFX.bad(); adultGate.fails = (adultGate.fails || 0) + 1;
    if (adultGate.fails >= 5) { adultGate.fails = 0; adultGate.lockUntil = Date.now() + 30000; er.textContent = '嘗試太多次，請等 30 秒再試'; } else er.textContent = '密碼不正確';
  };
  on(c, '[data-a=go]', go2); inp.addEventListener('keydown', e => { if (e.key === 'Enter') go2(); });
  on(c, '[data-a=forgot]', () => { closeModal(m); setParentPin(fn, '輸入家長帳號的登入密碼，就能重新設定家長密碼。', true); });
}
function setParentPin(fn, note, reset) {
  const needAcct = BE.kind === 'cloud';
  const { c, m } = modal(`<h2>${reset ? '重新設定家長密碼' : '設定家長密碼'}</h2><p class="muted">${esc(note || '第一次使用家長功能，請設定一組家長密碼（4～8 位數字）。之後進入家長後台、新增小朋友、登出都要輸入這組密碼。')}</p>` +
    (needAcct ? `<label class="frm">家長帳號的登入密碼（${esc(USER && USER.email || '')}）<input id="pp-acct" type="password" autocomplete="current-password"></label>` : '') +
    `<label class="frm">新的家長密碼<input id="pp-1" type="password" inputmode="numeric" pattern="[0-9]*" maxlength="8" autocomplete="new-password"></label>` +
    `<label class="frm">再輸入一次<input id="pp-2" type="password" inputmode="numeric" pattern="[0-9]*" maxlength="8" autocomplete="new-password"></label>` +
    `<p class="err"></p><div class="actions"><button class="pill" data-a="ok">儲存並進入</button></div>`);
  const er = c.querySelector('.err');
  on(c, '[data-a=ok]', async ev => {
    const p1 = c.querySelector('#pp-1').value.trim(), p2 = c.querySelector('#pp-2').value.trim();
    if (!/^\d{4,8}$/.test(p1)) return er.textContent = '家長密碼要是 4～8 個數字';
    if (p1 !== p2) return er.textContent = '兩次輸入的密碼不一樣';
    busy(ev.target, true);
    try {
      if (needAcct) await BE.reauth(c.querySelector('#pp-acct').value);
      const salt = code(10), parentPin = { salt, hash: await hashPin(salt, p1), at: Date.now() };
      await BE.setFamily({ parentPin }); FAMILY.parentPin = parentPin;
      parentOkUntil = Date.now() + 5 * 60000; closeModal(m); toast('家長密碼已設定'); fn();
    } catch (e) { busy(ev.target, false); er.textContent = errMsg(e); }
  });
}
function kidForm(first) {
  let animal = 'bunny';
  let oldSave = null; try { oldSave = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) {}
  const canMigrate = first && oldSave && !localStorage.getItem(KEY + '-migrated') && (oldSave.level > 1 || oldSave.coins > 0);
  const back = gate.style.display === 'block' ? null : 'game';
  showGate(`<div class="cstage"><div class="cglow"></div><div class="cspr"></div><div class="cname">新朋友</div></div>` +
    `<div class="framecard cform" style="background-image:url('${IMG.frameWide}')"><div class="frameinner">` +
    `<label class="fl">暱稱（不要用真實全名）<input id="k-nick" maxlength="8" placeholder="例如：小安"></label>` +
    `<p class="fl">選一個主角</p><div class="animals2">${ANIMALS.map(a => `<button class="animal2 ${a.key === 'bunny' ? 'on' : ''}" data-an="${a.key}" style="background-image:url('${IMG.frameCard}')"><img src="${animalImg(a.key)}" alt=""><span>${a.name}</span></button>`).join('')}</div>` +
    `<label class="fl">4 位數密碼（讓小朋友記得）<input id="k-pin" inputmode="numeric" pattern="[0-9]*" maxlength="4"></label>` +
    (canMigrate ? `<label class="chk"><input type="checkbox" id="k-mig" checked> 把這台裝置原本的進度（Lv.${oldSave.level}、金幣 ${oldSave.coins}）給這位小朋友</label>` : '') +
    `<p class="err"></p><div class="actions"><button class="pill cream" data-a="cancel">取消</button><button class="pill" data-a="ok">建立角色</button></div></div></div>`, true, '建立你的角色');
  const c = gateCard, sprBox = c.querySelector('.cspr'), nameTag = c.querySelector('.cname');
  let pv = null, PP = null, loopT = null;
  function preview(k, celebrate) {
    PP = POSE(k); sprBox.innerHTML = ''; pv = makeSprite(sprBox, poseFrames(PP)); pv.show(PP.idle);
    if (celebrate) pv.play(PP.cheer, PP.cheerMs === 140 ? 140 : 1000, 300, PP.idle);
  }
  function idleLoop() { clearTimeout(loopT); loopT = setTimeout(() => { if (pv) pv.play([PP.looks[rnd(PP.looks.length)]], 1300, 0, PP.idle); idleLoop(); }, rr(2600, 4200)); }
  preview('bunny'); idleLoop();
  gate._stop = () => clearTimeout(loopT);
  c.querySelector('#k-nick').addEventListener('input', e => { nameTag.textContent = e.target.value.trim() || '新朋友'; });
  c.querySelectorAll('[data-an]').forEach(b => b.onclick = () => { animal = b.dataset.an; c.querySelectorAll('[data-an]').forEach(x => x.classList.toggle('on', x === b)); SFX.ok(); preview(animal, true); });
  c.querySelector('.cstage').onclick = () => { if (pv) { pv.play([PP.giggle[rnd(PP.giggle.length)]], 1200, 0, PP.idle); SFX.tap(); } };
  on(c, '[data-a=cancel]', () => { clearTimeout(loopT); showKids(); });
  on(c, '[data-a=ok]', async ev => {
    const nick = c.querySelector('#k-nick').value.trim(), pin = c.querySelector('#k-pin').value.trim(), er = c.querySelector('.err');
    if (!nick) return er.textContent = '請輸入暱稱';
    if (!/^\d{4}$/.test(pin)) return er.textContent = '密碼要是 4 個數字';
    busy(ev.target, true);
    try {
      const salt = code(10), st = fresh();
      if (canMigrate && c.querySelector('#k-mig') && c.querySelector('#k-mig').checked) { Object.assign(st, oldSave, { v: 2 }); try { localStorage.setItem(KEY + '-migrated', '1'); } catch (e) {} }
      await BE.addKid({ nick, animal, pin, pinSalt: salt, pinHash: await hashPin(salt, pin), state: st, updatedAt: Date.now() });
      clearTimeout(loopT); toast(`歡迎 ${nick}！`); syncMemberKids(); SFX.level();
      showKids();
    } catch (e) { busy(ev.target, false); er.textContent = errMsg(e); }
  });
}
async function enterKid(k) {
  loadBg('map'); warmUp();
  showGate('<p>正在準備冒險…</p>');
  let doc = k && k.state ? k : null; if (!doc) { try { doc = await BE.loadKid(k.id); } catch (e) {} }
  let cloudSt = doc && doc.state, localSt = null;
  try { localSt = JSON.parse(localStorage.getItem('bw-kid-' + k.id) || 'null'); } catch (e) {}
  let st = cloudSt;
  if (localSt && (!cloudSt || rankOf(localSt) > rankOf(cloudSt) || (rankOf(localSt) === rankOf(cloudSt) && (localSt.updatedAt || 0) > (cloudSt.updatedAt || 0)))) st = localSt;
  S = Object.assign(fresh(), st || {}); normalize(); D();
  KID = { id: k.id, nick: k.nick, animal: k.animal || 'bunny' };
  if (st === localSt && localSt) flushSave();
  hideGate();
  if (mapUI) mapUI.reset();
  if (bakeryUI) bakeryUI.setAnimal(KID.animal);
  go('map'); refreshHUD();
  intro();
}
function switchKid() { flushSave(); Object.values(screens).forEach(s => s.classList.remove('on')); showKids(); }

/* ---------- 家長後台 ---------- */
const MASTERY = r => r.n < 5 ? ['資料還不夠', 'm0'] : r.rate >= 0.9 ? ['精熟', 'm4'] : r.rate >= 0.75 ? ['熟練', 'm3'] : r.rate >= 0.5 ? ['練習中', 'm2'] : ['需要加強', 'm1'];
function analyze(ans) {
  const units = {}; let n = 0, first = 0, hint = 0, ms = 0;
  const days = {}; const now = new Date();
  for (let i = 6; i >= 0; i--) { const d = new Date(now - i * 864e5); const key = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); days[key] = { n: 0, f: 0, label: `${d.getMonth() + 1}/${d.getDate()}` }; }
  for (const a of ans) {
    n++; if (a.first) first++; if (a.hint) hint++; ms += Math.min(a.ms || 0, 180000);
    const u = units[a.unit || '其他'] = units[a.unit || '其他'] || { unit: a.unit || '其他', n: 0, f: 0, hint: 0, ms: 0, recent: [] };
    u.n++; if (a.first) u.f++; if (a.hint) u.hint++; u.ms += Math.min(a.ms || 0, 180000); if (u.recent.length < 6) u.recent.push(a.first ? 1 : 0);
    const dk = (() => { const d = new Date(a.t); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); })();
    if (days[dk]) { days[dk].n++; if (a.first) days[dk].f++; }
  }
  const list = Object.values(units).map(u => Object.assign(u, { rate: u.f / u.n, hintRate: u.hint / u.n, avg: u.ms / u.n / 1000, recentRate: u.recent.length ? u.recent.reduce((s, x) => s + x, 0) / u.recent.length : 0 }));
  const enough = list.filter(u => u.n >= 5);
  const strong = enough.filter(u => u.rate >= 0.8).sort((a, b) => b.rate - a.rate).slice(0, 3);
  const weak = enough.filter(u => u.rate < 0.75).sort((a, b) => a.rate - b.rate).slice(0, 3);
  return { n, rate: n ? first / n : 0, hintRate: n ? hint / n : 0, avg: n ? ms / n / 1000 : 0, list: list.sort((a, b) => a.rate - b.rate), strong, weak, days: Object.values(days) };
}
function advice(u) {
  const tips = [];
  const pct = Math.round(u.rate * 100);
  tips.push(`「${u.unit}」一次答對率 ${pct}%（${u.n} 題）。`);
  if (u.hintRate >= 0.4) tips.push('常需要看提示才答得出來，觀念可能還不太熟。建議陪孩子一起看幾題的「解答教學」，請孩子用自己的話說一次為什麼。');
  if (u.avg >= 45) tips.push(`平均每題要 ${Math.round(u.avg)} 秒，計算還不夠熟練。可以先從暖身點心的簡單題多練幾次，建立速度和信心。`);
  if (u.recentRate > u.rate + 0.15) tips.push('最近幾題的表現明顯變好，正在進步中，繼續保持！');
  else if (u.recentRate < u.rate - 0.15) tips.push('最近幾題反而比較常錯，可能是遇到比較難的題型，留意孩子是否覺得挫折。');
  if (tips.length === 1) tips.push('建議把這個單元設為「今日加強」，讓它在答題時多出現幾次。');
  return tips;
}
async function adminPanel(tab, kidId) {
  let ks = []; try { ks = await BE.listKids(); } catch (e) {}
  const tabs = [['report', '學習報告'], ['kids', '小朋友'], ['group', '好友圈'], ['set', '設定']].concat(isAdmin() ? [['users', '使用者管理']] : []).map(([k, t]) => `<button class="tab ${tab === k ? 'on' : ''}" data-t="${k}">${t}</button>`).join('');
  let body = '<p>讀取中…</p>';
  const { c, m } = modal(`<h2>家長後台</h2><div class="tabs">${tabs}</div><div class="abody">${body}</div>`, { wide: true });
  c.classList.add('admin');
  const ab = c.querySelector('.abody');
  c.querySelectorAll('[data-t]').forEach(b => b.onclick = () => { SFX.tap(); closeModal(m); adminPanel(b.dataset.t, kidId); });
  const reopen = (t, id) => { closeModal(m); adminPanel(t || tab, id || kidId); };
  if (tab === 'report') {
    if (!ks.length) { ab.innerHTML = '<p class="muted">還沒有小朋友的資料。</p>'; return; }
    const kid = ks.find(k => k.id === kidId) || (KID && ks.find(k => k.id === KID.id)) || ks[0];
    const pick = `<div class="seg">${ks.map(k => `<button data-kid="${k.id}" class="${k.id === kid.id ? 'on' : ''}">${esc(k.nick)}</button>`).join('')}</div>`;
    let ans = []; try { ans = await BE.answers(kid.id, 1500); } catch (e) {}
    const st = (KID && KID.id === kid.id) ? S : (kid.state || {});
    const A = analyze(ans);
    const maxN = Math.max(1, ...A.days.map(d => d.n));
    const bars = A.days.map(d => `<div class="bar"><i style="height:${d.n / maxN * 100}%"></i><b>${d.n}</b><small>${d.label}</small></div>`).join('');
    const rows = A.list.map(u => { const [lab, cls] = MASTERY(u); return `<tr><td>${esc(u.unit)}</td><td>${u.n}</td><td>${Math.round(u.rate * 100)}%</td><td>${Math.round(u.hintRate * 100)}%</td><td>${Math.round(u.avg)} 秒</td><td><span class="mb ${cls}">${lab}</span></td><td>${u.n >= 3 ? `<button class="mini-btn" data-focus="${esc(u.unit)}">${st.focus === u.unit ? '加強中' : '設為加強'}</button>` : ''}</td></tr>`; }).join('');
    const wrong = ans.filter(a => !a.first && !a.match).slice(0, 8).map(a => { const q = BANK.find(x => x.id === a.qid); return q ? `<tr><td>${esc(q.stem.replace(/\n/g, ' '))}</td><td>${esc(q.answer)}</td><td>${esc(q.unit)}</td></tr>` : ''; }).join('');
    ab.innerHTML = pick +
      `<div class="kpis"><div><b>Lv.${st.level || 1}</b><small>等級</small></div><div><b>${st.coins || 0}</b><small>金幣</small></div><div><b>${A.n}</b><small>累計作答</small></div><div><b>${Math.round(A.rate * 100)}%</b><small>一次答對率</small></div><div><b>${Math.round(A.hintRate * 100)}%</b><small>使用提示</small></div><div><b>${Math.round(((st.daily && st.daily.date === today()) ? st.daily.playMs : 0) / 60000)} 分</b><small>今天遊玩</small></div></div>` +
      `<h3>最近 7 天作答量</h3><div class="bars">${bars}</div>` +
      (st.focus ? `<p class="note">今日加強單元：<b>${esc(st.focus)}</b>　<button class="mini-btn" data-focus="">取消加強</button></p>` : '') +
      `<h3>強項</h3>${A.strong.length ? `<ul>${A.strong.map(u => `<li>「${esc(u.unit)}」一次答對率 ${Math.round(u.rate * 100)}%，表現很穩定。</li>`).join('')}</ul>` : '<p class="muted">每個單元答滿 5 題後，就會開始分析。</p>'}` +
      `<h3>需要加強與建議</h3>${A.weak.length ? A.weak.map(u => `<div class="advice"><b>${esc(u.unit)}</b>${advice(u).map(t => `<p>${esc(t)}</p>`).join('')}<button class="mini-btn" data-focus="${esc(u.unit)}">設為今日加強</button></div>`).join('') : '<p class="muted">目前沒有明顯的弱項，繼續保持！</p>'}` +
      `<h3>各單元熟練度</h3><div class="tblwrap"><table class="stats"><tr><th>單元</th><th>作答</th><th>一次答對</th><th>看提示</th><th>平均時間</th><th>熟練度</th><th></th></tr>${rows || '<tr><td colspan="7">還沒有作答紀錄</td></tr>'}</table></div>` +
      (wrong ? `<h3>最近答錯的題目</h3><div class="tblwrap"><table class="stats"><tr><th>題目</th><th>答案</th><th>單元</th></tr>${wrong}</table></div>` : '');
    ab.querySelectorAll('[data-kid]').forEach(b => b.onclick = () => { SFX.tap(); reopen('report', b.dataset.kid); });
    ab.querySelectorAll('[data-focus]').forEach(b => b.onclick = async () => {
      SFX.tap(); const f = b.dataset.focus || null;
      if (KID && KID.id === kid.id) { S.focus = f; save(); flushSave(); }
      else { const d = await BE.loadKid(kid.id); const s2 = Object.assign(fresh(), (d && d.state) || {}); s2.focus = f; await BE.saveState(kid.id, s2); }
      toast(f ? `已把「${f}」設為今日加強` : '已取消加強'); reopen('report', kid.id);
    });
  } else if (tab === 'kids') {
    ab.innerHTML = `<div class="tblwrap"><table class="stats"><tr><th>暱稱</th><th>主角</th><th>等級</th><th>密碼</th><th>每日時間</th><th></th></tr>${ks.map(k => { const st = k.state || {}; const lim = (st.settings && st.settings.limit) || 0;
      return `<tr><td>${esc(k.nick)}</td><td>${(ANIMALS.find(a => a.key === (k.animal || 'bunny')) || ANIMALS[0]).name}</td><td>Lv.${st.level || 1}</td><td><button class="mini-btn pinshow" data-p="${esc(k.pin || '')}">顯示</button></td><td><div class="seg small">${[0, 20, 30, 45, 60].map(v => `<button data-lim="${k.id}:${v}" class="${lim === v ? 'on' : ''}">${v ? v + '分' : '不限'}</button>`).join('')}</div></td>` +
      `<td><button class="mini-btn" data-pin="${k.id}">改密碼</button> <button class="mini-btn warn" data-del="${k.id}">刪除</button></td></tr>`; }).join('')}</table></div><div class="actions"><button class="pill" data-a="add">新增小朋友</button></div>`;
    ab.querySelectorAll('.pinshow').forEach(b => b.onclick = () => { b.textContent = b.textContent === '顯示' ? (b.dataset.p || '未記錄，請按改密碼') : '顯示'; });
    on(ab, '[data-a=add]', () => { closeModal(m); if (KID) { flushSave(); Object.values(screens).forEach(x => x.classList.remove('on')); KID = null; } kidForm(!ks.length); });
    ab.querySelectorAll('[data-lim]').forEach(b => b.onclick = async () => {
      SFX.tap(); const [id, v] = b.dataset.lim.split(':');
      if (KID && KID.id === id) { S.settings.limit = +v; save(); flushSave(); }
      else { const d = await BE.loadKid(id); const s2 = Object.assign(fresh(), (d && d.state) || {}); s2.settings = Object.assign({}, s2.settings, { limit: +v }); await BE.saveState(id, s2); }
      reopen('kids');
    });
    ab.querySelectorAll('[data-pin]').forEach(b => b.onclick = () => { SFX.tap(); const k = ks.find(x => x.id === b.dataset.pin);
      pinPad(k, `設定 ${k.nick} 的新密碼`, async pin => { const salt = code(10); await BE.updateKid(k.id, { pin, pinSalt: salt, pinHash: await hashPin(salt, pin) }); toast('密碼已更新'); reopen('kids'); }); });
    ab.querySelectorAll('[data-del]').forEach(b => b.onclick = () => { SFX.tap(); const k = ks.find(x => x.id === b.dataset.del);
      const d2 = modal(`<h2>刪除「${esc(k.nick)}」？</h2><p>這位小朋友的等級、金幣和學習紀錄都會刪除，無法復原。</p><div class="actions"><button class="pill cream" data-a="no">取消</button><button class="pill" data-a="yes">確定刪除</button></div>`);
      on(d2.c, '[data-a=no]', () => closeModal(d2.m));
      on(d2.c, '[data-a=yes]', async () => { await BE.deleteKid(k.id); try { localStorage.removeItem('bw-kid-' + k.id); } catch (e) {} closeModal(d2.m); syncMemberKids(); if (KID && KID.id === k.id) { closeModal(m); switchKid(); } else reopen('kids'); });
    });
  } else if (tab === 'group') {
    if (BE.kind !== 'cloud') { ab.innerHTML = '<p class="muted">試玩版沒有連線功能。正式網站登入後就能建立好友圈。</p>'; return; }
    try { FAMILY = await BE.family(); } catch (e) {}
    const gid = FAMILY.groupId; const g = gid ? await BE.group(gid).catch(() => null) : null;
    if (!g) {
      ab.innerHTML = `<p>還沒有加入好友圈。建立好友圈後，把邀請連結傳給朋友，朋友用連結註冊後會送出加入申請，你同意後孩子們就能互相拜訪小屋、留言和送禮（第二階段開放）。</p><label class="frm">好友圈名稱<input id="gname" maxlength="12" value="${esc((FAMILY.name || '我的') + '的好友圈')}"></label><div class="actions"><button class="pill" data-a="mk">建立好友圈</button></div><p class="muted">如果朋友已經傳邀請連結給你，用那個連結打開遊戲就會自動申請加入。</p>`;
      on(ab, '[data-a=mk]', async ev => { busy(ev.target, true); try { const id = await BE.createGroup(ab.querySelector('#gname').value.trim() || '好友圈'); await BE.setFamily({ groupId: id }); FAMILY.groupId = id; await BE.setMember(id, { status: 'approved', family: FAMILY.name || '', kids: ks.map(k => ({ nick: k.nick, animal: k.animal || 'bunny' })), at: Date.now() }); reopen('group'); } catch (e) { busy(ev.target, false); toast(errMsg(e)); } });
      return;
    }
    const owner = g.owner === USER.uid;
    let mem = []; try { mem = await BE.members(gid); } catch (e) {}
    const me = mem.find(x => x.uid === USER.uid);
    const link = location.origin + location.pathname + '?invite=' + gid;
    const pend = mem.filter(x => x.status === 'pending'), appr = mem.filter(x => x.status === 'approved');
    const kidsTxt = x => (x.kids || []).map(k => esc(k.nick)).join('、') || '（還沒有小朋友）';
    ab.innerHTML = `<h3>${esc(g.name)}</h3>` +
      (owner ? `<p>邀請連結（傳給朋友，用這個連結註冊就會申請加入）：</p><div class="linkbox"><input readonly value="${esc(link)}"><button class="mini-btn" data-a="copy">複製</button></div>` +
        `<h3>等待同意（${pend.length}）</h3>${pend.length ? `<table class="stats">${pend.map(x => `<tr><td>${esc(x.family || '新朋友')}</td><td>${kidsTxt(x)}</td><td><button class="mini-btn" data-ok="${x.uid}">同意</button> <button class="mini-btn warn" data-rm="${x.uid}">拒絕</button></td></tr>`).join('')}</table>` : '<p class="muted">目前沒有待處理的申請。</p>'}`
        : `<p>${me && me.status === 'approved' ? '你已經是這個好友圈的成員。' : '已送出加入申請，等待管理者同意。'}</p>`) +
      `<h3>成員（${appr.length}）</h3>${(owner || (me && me.status === 'approved')) ? `<table class="stats">${appr.map(x => `<tr><td>${esc(x.family || '')}${x.uid === g.owner ? '（管理者）' : ''}</td><td>${kidsTxt(x)}</td><td>${owner && x.uid !== g.owner ? `<button class="mini-btn warn" data-rm="${x.uid}">移除</button>` : ''}</td></tr>`).join('')}</table>` : '<p class="muted">加入後就能看到成員。</p>'}` +
      (!owner ? '<div class="actions"><button class="pill cream" data-a="leave">退出好友圈</button></div>' : '');
    on(ab, '[data-a=copy]', () => { const i = ab.querySelector('.linkbox input'); i.select(); try { navigator.clipboard.writeText(i.value); } catch (e) { document.execCommand('copy'); } toast('已複製邀請連結'); });
    ab.querySelectorAll('[data-ok]').forEach(b => b.onclick = async () => { SFX.tap(); await BE.approve(gid, b.dataset.ok); reopen('group'); });
    ab.querySelectorAll('[data-rm]').forEach(b => b.onclick = async () => { SFX.tap(); await BE.removeMember(gid, b.dataset.rm); reopen('group'); });
    on(ab, '[data-a=leave]', async () => { await BE.removeMember(gid, USER.uid).catch(() => {}); await BE.setFamily({ groupId: null }); FAMILY.groupId = null; reopen('group'); });
  } else if (tab === 'users' && isAdmin()) {
    let fams = []; try { fams = await BE.listFamilies(); } catch (e) { ab.innerHTML = `<p class="err">讀取失敗：${esc(errMsg(e))}（請確認已更新 Firestore 規則）</p>`; return; }
    fams.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    const rows = await Promise.all(fams.map(async f => { let ks = []; try { ks = await BE.kidsOf(f.uid); } catch (e) {} return { f, ks }; }));
    ab.innerHTML = `<p class="muted">共 ${fams.length} 個家庭帳號。家長密碼經過加密，任何人都看不到，只能寄送重設密碼信。小朋友的 4 位數密碼可按「顯示」查看。</p>` +
      `<div class="tblwrap"><table class="stats"><tr><th>家庭</th><th>家長 Email</th><th>註冊日</th><th>小朋友（等級／密碼）</th><th></th></tr>${rows.map(({ f, ks }) => `<tr class="${f.disabled ? 'dis' : ''}"><td>${esc(f.name || '')}${f.disabled ? '（已停用）' : ''}</td><td>${esc(f.email || '')}</td><td>${f.createdAt ? new Date(f.createdAt).toLocaleDateString('zh-TW') : ''}</td>` +
        `<td>${ks.map(k => `${esc(k.nick)} Lv.${(k.state && k.state.level) || 1} <button class="mini-btn pinshow" data-p="${esc(k.pin || '')}">顯示</button>`).join('<br>') || '—'}</td>` +
        `<td><button class="mini-btn" data-rs="${esc(f.email || '')}">寄重設密碼信</button> <button class="mini-btn" data-ds="${f.uid}" data-v="${f.disabled ? 0 : 1}">${f.disabled ? '啟用' : '停用'}</button> ${f.uid === (USER && USER.uid) ? '' : `<button class="mini-btn warn" data-del="${f.uid}" data-n="${esc(f.name || f.email || '')}">刪除</button>`}</td></tr>`).join('')}</table></div>` +
      `<p class="muted">「刪除」會清除該家庭在遊戲裡的所有資料。若要連登入帳號一起移除，請再到 Firebase 主控台 → Authentication → 使用者，刪除該 Email。</p>`;
    ab.querySelectorAll('.pinshow').forEach(b => b.onclick = () => { b.textContent = b.textContent === '顯示' ? (b.dataset.p || '未記錄') : '顯示'; });
    ab.querySelectorAll('[data-rs]').forEach(b => b.onclick = async () => { if (!b.dataset.rs) return; try { await BE.reset(b.dataset.rs); toast('已寄出重設密碼信'); } catch (e) { toast(errMsg(e)); } });
    ab.querySelectorAll('[data-ds]').forEach(b => b.onclick = async () => { await BE.setFamilyOf(b.dataset.ds, { disabled: b.dataset.v === '1' }); reopen('users'); });
    ab.querySelectorAll('[data-del]').forEach(b => b.onclick = () => {
      const d2 = modal(`<h2>刪除「${esc(b.dataset.n)}」？</h2><p>這個家庭所有小朋友的等級、金幣、作答紀錄都會刪除，無法復原。</p><div class="actions"><button class="pill cream" data-a="no">取消</button><button class="pill" data-a="yes">確定刪除</button></div>`);
      on(d2.c, '[data-a=no]', () => closeModal(d2.m));
      on(d2.c, '[data-a=yes]', async ev => { busy(ev.target, true); try { await BE.deleteFamily(b.dataset.del); closeModal(d2.m); toast('已刪除'); reopen('users'); } catch (e) { busy(ev.target, false); toast(errMsg(e)); } });
    });
  } else {
    ab.innerHTML = `<div class="setrow"><span>帳號</span><span>${esc(USER ? USER.email : '')}</span></div>` +
      `<div class="setrow"><span>題庫來源</span><span>${esc(BANK_SRC)}，數學 ${BANK.length} 題</span></div>` +
      `<div class="setrow"><span>雲端存檔</span><span>${BE.kind === 'cloud' ? '已開啟，每次答題自動同步，每天另存一份備份' : '試玩版只存在這台裝置'}</span></div>` +
      `<div class="setrow"><span>家長密碼</span><span>${FAMILY.parentPin ? '已設定' : '尚未設定'}</span></div>` +
      `<div class="actions"><button class="pill cream" data-a="pp">變更家長密碼</button>${BE.kind === 'cloud' ? '<button class="pill cream" data-a="rst">寄送重設密碼信</button>' : ''}${KID ? '<button class="pill cream" data-a="exp">匯出目前小朋友的備份</button>' : ''}${BE.kind === 'cloud' ? '<button class="pill purple" data-a="out">登出家長帳號</button>' : ''}</div>`;
    on(ab, '[data-a=pp]', () => { closeModal(m); setParentPin(() => adminPanel('set'), '輸入家長帳號的登入密碼，再設定新的家長密碼。', true); });
    on(ab, '[data-a=rst]', async () => { try { await BE.reset(USER.email); toast('已寄出重設密碼信到 ' + USER.email); } catch (e) { toast(errMsg(e)); } });
    on(ab, '[data-a=exp]', () => { const blob = new Blob([JSON.stringify({ kid: KID, state: S }, null, 1)], { type: 'application/json' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `ambermagic-${KID.nick}-${today()}.json`; a.click(); });
    on(ab, '[data-a=out]', async () => { flushSave(); closeModal(m); KID = null; await BE.logout(); });
  }
}

function intro() {
  if (S.introDone) return;
  const { c, m } = modal(`<div class="row"><div class="face"><img src="${IMG.bearWow}" alt=""></div><div class="body"><h2>歡迎 ${esc(KID ? KID.nick : '')} 來到兔兔魔法世界！</h2><p>用手指點地圖，或按住拖曳，兔兔就會走過去。</p><p>魔法世界裡每一館都有不同的題目，答對就能拿到金幣、一直升級喔。金幣可以到「家具店與裝備店」買東西！</p></div></div><div class="actions"><button class="pill" data-a="go">出發！</button></div>`, { close: false, wide: true });
  on(c, '[data-a=go]', () => { S.introDone = true; save(); closeModal(m); mapUI.bunnySay('一起去冒險吧！'); });
}

/* ---------- boot ---------- */
Object.assign(BUILDERS, { bakery: buildBakery, hall_chinese: () => buildHall('chinese'), hall_science: () => buildHall('science'), hall_literacy: () => buildHall('literacy'),
  mathmap: buildMathMap, boss: buildBoss, forest: buildForest, music: buildMusic, shop: buildShop, home: buildHome, badges: buildBadges, status: buildStatus });
buildMap(); buildResult(); fit();
document.addEventListener('gesturestart', e => e.preventDefault()); document.addEventListener('gesturechange', e => e.preventDefault());
document.addEventListener('dblclick', e => e.preventDefault(), { passive: false });
loadBank();
if (!FB && !USE_LOCAL) {
  showGate('<h2>需要網路連線</h2><p>第一次使用需要連上網路才能登入。請確認網路後重新整理。</p><button class="pill" onclick="location.reload()">重新整理</button>');
} else {
  showGate('<p class="loading">正在打開魔法世界…</p>');
  BE.onAuth(async u => {
    USER = u;
    if (QS.has('authdemo')) { showAuth(QS.get('authdemo') || 'login'); return; }
    if (!u) { KID = null; Object.values(screens).forEach(s => s.classList.remove('on')); showAuth(pendingInvite() ? 'register' : 'login'); return; }
    try { FAMILY = await BE.family(); } catch (e) { FAMILY = {}; }
    if (FAMILY.disabled && !isAdmin()) { showGate('<h3 class="ftitle">帳號已停用</h3><p>這個家庭帳號目前已停用，請聯絡遊戲管理者。</p><button class="pill" id="g-out">登出</button>'); gateCard.querySelector('#g-out').onclick = () => BE.logout(); return; }
    await handleInvite();
    showKids();
  });
}
{ const bootEl = document.getElementById('boot'); if (bootEl) { bootEl.classList.add('hide'); setTimeout(() => bootEl.remove(), 500); } }
if ('serviceWorker' in navigator && location.protocol === 'https:' && !window.INLINE_QUESTIONS) navigator.serviceWorker.register('sw.js').catch(() => {});
})();
