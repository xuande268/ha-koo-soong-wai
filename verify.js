/* ==========================================================================
   Headless verification harness. Zero dependencies — Node 24 ships fetch and
   WebSocket, and Chrome ships the DevTools Protocol.

   It launches Chrome, walks every route plus the full golden path (train →
   certify → check in → escalate → nurse triage), and measures what actually
   rendered: console errors, horizontal overflow, sub-44px hit targets,
   clipped text, and colour contrast.

   Usage: node verify.js [--shots]
   ========================================================================== */
const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const ROOT = __dirname;
const FILE_URL = 'file:///' + path.join(ROOT, 'index.html').replace(/\\/g, '/').replace(/ /g, '%20');
const PORT = 9222;
const WANT_SHOTS = process.argv.includes('--shots');
const SHOT_DIR = path.join(ROOT, 'shots');

const CHROME = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
].find(p => fs.existsSync(p));

const sleep = ms => new Promise(r => setTimeout(r, ms));
const problems = [];
const note = m => problems.push(m);

/* Clear storage and reload WITHOUT touching the hash: assigning location.hash
   fires hashchange, the app re-renders and saves, and the state we just cleared
   is written straight back. Navigate only after this has settled. */
async function freshState() {
  await evalJS(`localStorage.clear(); location.reload()`);
  await sleep(1000);
}

/* --- CDP plumbing ------------------------------------------------------- */
let ws, msgId = 0;
const pending = new Map();
const consoleErrors = [];

function send(method, params = {}) {
  const id = ++msgId;
  ws.send(JSON.stringify({ id, method, params }));
  return new Promise((res, rej) => {
    pending.set(id, { res, rej });
    setTimeout(() => { if (pending.has(id)) { pending.delete(id); rej(new Error('timeout ' + method)); } }, 15000);
  });
}

async function evalJS(expression) {
  const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (r.exceptionDetails) throw new Error('JS threw: ' + (r.exceptionDetails.exception?.description || r.exceptionDetails.text));
  return r.result.value;
}

async function click(sel) {
  const out = await evalJS(`(() => {
    const e = document.querySelector(${JSON.stringify(sel)});
    if (!e) return 'MISSING';
    e.click();
    return 'ok';
  })()`);
  if (out === 'MISSING') note(`click target not found: ${sel}`);
  await sleep(120);
  return out;
}

/* --- probes ------------------------------------------------------------- */
const PROBE = `(() => {
  const screen = document.querySelector('.phone__screen');
  const view = document.getElementById('view');
  const sr = screen.getBoundingClientRect();
  const all = [...screen.querySelectorAll('*')];

  // anything painted outside the phone's screen box
  const oob = all.filter(el => {
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) return false;
    return r.right > sr.right + 1.5 || r.left < sr.left - 1.5;
  }).slice(0, 8).map(el => (el.className || el.tagName).toString().slice(0, 46));

  // hit targets smaller than 44px in either axis
  const taps = [...screen.querySelectorAll('button, a[href], input, textarea, summary')];
  const small = taps.filter(el => {
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) return false;
    if (el.closest('[aria-hidden="true"]')) return false;
    return r.height < 44 || r.width < 44;
  }).map(el => {
    const r = el.getBoundingClientRect();
    return ((el.className || el.tagName).toString().slice(0, 34)) + ' ' + Math.round(r.width) + 'x' + Math.round(r.height);
  }).slice(0, 10);

  // text that overflows its own box and gets cut (.sr is clipped on purpose)
  const clipped = all.filter(el => {
    if (el.children.length) return false;
    if (el.classList.contains('sr')) return false;
    const t = (el.textContent || '').trim();
    if (!t) return false;
    const cs = getComputedStyle(el);
    if (cs.overflow === 'visible' || cs.textOverflow === 'ellipsis') return false;
    return el.scrollWidth > el.clientWidth + 2 || el.scrollHeight > el.clientHeight + 2;
  }).slice(0, 8).map(el => (el.className || el.tagName).toString().slice(0, 40) + ' :: ' + (el.textContent || '').trim().slice(0, 34));

  // overlapping siblings would be a layout bug; check the tab bar labels fit
  const tabs = [...document.querySelectorAll('.tabbar button')];
  const tabOverflow = tabs.some(b => b.scrollWidth > b.clientWidth + 2);

  return {
    route: location.hash || '#/home',
    // a screen that threw leaves the *previous* markup in the view; comparing
    // what rendered against where we are catches that instead of passing on stale content
    rendered: view.dataset.rendered || '',
    title: (document.querySelector('.appbar__title') || {}).textContent || '',
    viewScrollW: view.scrollWidth,
    viewClientW: view.clientWidth,
    hOverflow: view.scrollWidth > view.clientWidth + 2,
    screenScrollW: screen.scrollWidth,
    screenClientW: screen.clientWidth,
    oob, small, clipped, tabOverflow,
    chars: (view.innerText || '').length,
    tabs: tabs.length,
    activeTab: (document.querySelector('.tabbar [aria-current]') || {}).textContent || '',
  };
})()`;

/* --- route walk --------------------------------------------------------- */
const ROUTES = [
  '#/home', '#/train', '#/course/vitals', '#/lesson/vitals/0', '#/lesson/vitals/2',
  '#/lesson/falls/1', '#/quiz/vitals', '#/circle', '#/circle/mine', '#/circle/act',
  '#/senior/prasert', '#/senior/somchai', '#/activity/walk', '#/session/chair',
  '#/checkin/prasert', '#/impact', '#/profile',
  '#/nurse', '#/mentors', '#/nurse-impact', '#/case/c-1041',
];

async function walk() {
  const seen = [];
  for (const r of ROUTES) {
    await evalJS(`location.hash = ${JSON.stringify(r)}`);
    await sleep(200);
    const p = await evalJS(PROBE);
    seen.push(p);
    if (p.rendered !== r) note(`${r}: screen did not render — view still holds ${p.rendered || '(nothing)'}`);
    if (p.hOverflow) note(`${r}: horizontal overflow in #view (${p.viewScrollW} > ${p.viewClientW})`);
    if (p.screenScrollW > p.screenClientW + 2) note(`${r}: phone screen scrolls sideways (${p.screenScrollW} > ${p.screenClientW})`);
    if (p.oob.length) note(`${r}: ${p.oob.length} element(s) painted outside the screen — ${p.oob.join(', ')}`);
    if (p.small.length) note(`${r}: hit target under 44px — ${p.small.join(' | ')}`);
    if (p.clipped.length) note(`${r}: clipped text — ${p.clipped.join(' | ')}`);
    if (p.tabOverflow) note(`${r}: a tab label overflows its button`);
    if (p.chars < 120) note(`${r}: screen rendered almost nothing (${p.chars} chars)`);
    if (WANT_SHOTS) await shot(r.replace(/[#/]/g, '_') || '_home');
  }
  return seen;
}

/* --- golden path -------------------------------------------------------- */
async function goldenPath() {
  console.log('\n— golden path: train, certify, check in, escalate, triage —');
  await freshState();

  const step = async (label, fn) => {
    const r = await fn();
    console.log(`  ${r === false ? '✗' : '·'} ${label}${r && r !== true ? ' → ' + r : ''}`);
    if (r === false) note(`golden path broke at: ${label}`);
    return r;
  };

  await step('home shows a trainee banner', async () =>
    (await evalJS(`document.body.innerText.includes('Finish your first module')`)) || false);

  await step('open the academy from the home quick actions', async () => {
    const r = await evalJS(`(() => {
      const b = [...document.querySelectorAll('[data-act="nav"]')].find(x => x.dataset.to === '#/train');
      if (!b) return 'no academy link on home';
      b.click();
      return 'ok';
    })()`);
    await sleep(200);
    return r;
  });

  await step('open the blood pressure module', () =>
    click('[data-act="nav"][data-to="#/course/vitals"]'));

  await step('read lesson 1', () => click('[data-act="nav"][data-to="#/lesson/vitals/0"]'));
  await step('next lesson', () => click('[data-act="next-lesson"]'));
  await step('next lesson', () => click('[data-act="next-lesson"]'));
  await step('take the quiz', () => click('[data-act="finish-lessons"]'));
  await step('quiz: answer all three correctly', async () => {
    const answers = await evalJS(`(async () => {
      const key = [1, 2, 0];
      for (let q = 0; q < key.length; q++) {
        const b = document.querySelector('[data-act="answer"][data-q="' + q + '"][data-k="' + key[q] + '"]');
        if (!b) return 'missing q' + q;
        b.click();
        await new Promise(r => setTimeout(r, 90));
      }
      return document.querySelector('[data-act="certify"]') ? 'pass state reached' : 'no certify button';
    })()`);
    return answers;
  });

  await step('certify', () => click('[data-act="certify"]'));
  await step('certificate issued', async () => {
    const d = await evalJS(`(() => {
      const e = document.querySelector('.cert__eyebrow');
      return { eyebrow: e ? e.textContent : 'NO .cert__eyebrow', hasName: document.body.innerText.includes('Somsri') };
    })()`);
    return /certificate of competency/i.test(d.eyebrow) && d.hasName ? 'issued to Mrs. Somsri' : 'got: ' + JSON.stringify(d);
  });
  await step('save to profile', () => click('[data-act="save-cert"]'));
  await step('profile lists the credential', async () => {
    const d = await evalJS(`(() => {
      const st = JSON.parse(localStorage.getItem('hksw.v1'));
      const t = document.getElementById('view').innerText;
      return { certified: st.certified, title: t.includes('Checking blood pressure'),
               chip: t.includes('Certified mentor'), chars: t.length, head: t.slice(0, 70).replace(/\\n/g, ' | ') };
    })()`);
    return d.certified.length && d.title && d.chip ? 'credential card present' : 'got: ' + JSON.stringify(d);
  });
  await step('the rail marks stages 1 and 2 done and stands on stage 3', async () => {
    const d = await evalJS(`(() => {
      const a = document.querySelector('.loop__item.is-active .loop__text');
      return { done: document.querySelectorAll('.loop__item.is-done').length, active: a ? a.textContent : 'none' };
    })()`);
    return d.done === 2 && /Certified as a mentor/.test(d.active)
      ? '2 done, standing on "certified"'
      : 'got: ' + JSON.stringify(d);
  });

  await step('open Mr. Prasert from the circle', async () => {
    await evalJS(`location.hash = '#/senior/prasert'`);
    await sleep(250);
    return 'ok';
  });

  await step('start a check-in', () =>
    click('[data-act="nav"][data-to="#/checkin/prasert"]'));

  await step('raise the systolic reading', async () =>
    evalJS(`(async () => {
      for (let i = 0; i < 16; i++) {
        document.querySelector('[data-act="ci-bp"][data-field="sys"][data-op="1"]').click();
        await new Promise(r => setTimeout(r, 25));
      }
      return document.querySelector('input[aria-label="Systolic"]').value;
    })()`));

  await step('advance to wellbeing', () => click('[data-act="ci-next"]'));
  await step('answer mood', () => click('[data-act="ci-set"][data-field="mood"][data-value="low"]'));
  await step('advance to medication', () => click('[data-act="ci-next"]'));
  await step('report a fall', () => click('[data-act="ci-set"][data-field="fallen"][data-value="yes"]'));
  await step('advance to notes', () => click('[data-act="ci-next"]'));
  await step('submit', () => click('[data-act="submit-checkin"]'));

  await step('result flags the fall and the reading', async () => {
    const t = await evalJS(`document.querySelector('.triage').className`);
    return t.includes('crit') ? 'critical triage' : 'WRONG TONE: ' + t;
  });
  await step('escalate to the nurse', () => click('[data-act="escalate"]'));
  await step('the flag is now in the case list', async () =>
    (await evalJS(`JSON.parse(localStorage.getItem('hksw.v1')).cases.filter(c => c.raisedByMentor).length`)) === 1 ? '1 case' : false);

  await step('switch to the professional view', () =>
    click('[data-act="switch-role"][data-role="nurse"]'));
  await step('inbox shows the new flag', async () =>
    (await evalJS(`document.body.innerText.includes('Mr. Prasert') && document.querySelectorAll('.card').length > 1`)) || false);

  await step('open the case', async () => {
    const r = await evalJS(`(() => {
      const b = [...document.querySelectorAll('[data-act="nav"]')].find(x => (x.dataset.to || '').startsWith('#/case/'));
      if (!b) return 'no case link';
      b.click();
      return 'opened ' + b.dataset.to;
    })()`);
    await sleep(200);
    return r;
  });
  await step('triage the case', () =>
    click('[data-act="nurse-act"][data-do*="Booked a home visit"]'));
  // textContent, not innerText: innerText applies text-transform, which uppercases
  // the callout eyebrows and makes plain substring checks fail
  await step('case closed with a decision', async () =>
    (await evalJS(`(() => {
      const t = document.getElementById('view').textContent;
      return t.includes('Your decision') && t.includes('Booked a home visit');
    })()`)) || false);

  await step('back to the mentor', () => click('[data-act="switch-role"][data-role="mentor"]'));
  await step('the mentor is told the nurse replied', async () =>
    (await evalJS(`!!document.querySelector('.appbar__dot')`)) || false);
  await step("the mentor's view of Prasert carries the nurse's answer", async () => {
    await evalJS(`location.hash = '#/senior/prasert'`);
    await sleep(250);
    return (await evalJS(`(() => {
      const t = document.getElementById('view').textContent;
      return t.includes('Nurse Anong') && t.includes('Booked a home visit');
    })()`)) ? 'loop closed' : false;
  });

  await step('impact counters moved', async () => {
    await evalJS(`location.hash = '#/impact'`);
    await sleep(250);
    return evalJS(`document.querySelector('.hero-fig b').textContent`);
  });

  await step('state survives a reload', async () => {
    const before = await evalJS(`JSON.parse(localStorage.getItem('hksw.v1')).checkins.length`);
    await evalJS(`location.reload()`);
    await sleep(900);
    const after = await evalJS(`JSON.parse(localStorage.getItem('hksw.v1')).checkins.length`);
    return before === after && before > 0 ? `${before} check-in(s) persisted` : `FAILED ${before} vs ${after}`;
  });
}

/* --- the other things a judge will click -------------------------------- */
async function secondaryFlows() {
  console.log('\n— secondary flows —');
  await freshState();

  const step = async (label, fn) => {
    const r = await fn();
    console.log(`  ${r === false ? '✗' : '·'} ${label}${r && r !== true ? ' → ' + r : ''}`);
    if (r === false) note(`secondary flow broke at: ${label}`);
  };
  const st = () => evalJS(`JSON.parse(localStorage.getItem('hksw.v1'))`);

  await step('offer support to a neighbour not yet in the circle', async () => {
    await evalJS(`location.hash = '#/circle'`);
    await sleep(250);
    const before = (await st()).circle.length;
    await click('[data-act="offer"][data-id="somchai"]');
    const after = (await st()).circle.length;
    return after === before + 1 ? `circle grew ${before} → ${after}` : false;
  });

  await step('remove that neighbour again', async () => {
    await click('[data-act="remove"]');
    return (await st()).circle.includes('somchai') ? false : 'removed';
  });

  await step('join a group', async () => {
    await evalJS(`location.hash = '#/circle/act'`);
    await sleep(250);
    await click('[data-act="join"][data-id="walk"]');
    return (await st()).joined.includes('walk') ? 'joined the walking group' : false;
  });

  await step('it appears on the home screen', async () => {
    await evalJS(`location.hash = '#/home'`);
    await sleep(250);
    return (await evalJS(`document.getElementById('view').textContent.includes('Morning walking group')`)) || false;
  });

  await step('log a session and count the attendance', async () => {
    await evalJS(`location.hash = '#/session/walk'`);
    await sleep(250);
    const before = (await st()).counters.hours;
    await click('[data-act="toggle-att"][data-sid="prasert"]');
    const mid = (await st()).counters.hours;
    await click('[data-act="complete-session"]');
    const after = (await st()).counters.hours;
    const sess = (await st()).sessions.find(x => x.activityId === 'walk');
    if (!sess || sess.hours !== 1) return 'no completed session';
    if (mid !== before) return `ticking attendance wrongly moved hours ${before} → ${mid}`;
    if (Math.abs((after - before) - 1) > 0.001) return `completing moved hours by ${(after - before).toFixed(2)}, expected 1`;
    return `${sess.present.length} present, counter ${before} → ${after}`;
  });

  await step('the text-size control scales type without breaking layout', async () => {
    await evalJS(`location.hash = '#/profile'`);
    await sleep(250);
    await click('[data-act="set-fs"][data-v="1.25"]');
    await sleep(200);
    const d = await evalJS(`(() => {
      const fs = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--fs'));
      const view = document.getElementById('view');
      const de = document.documentElement;
      return { fs, hOver: view.scrollWidth > view.clientWidth + 2, pageOver: de.scrollWidth > de.clientWidth + 1,
               tabOver: [...document.querySelectorAll('.tabbar button')].some(b => b.scrollWidth > b.clientWidth + 2) };
    })()`);
    if (d.hOver || d.pageOver) { note('125% text overflows'); return false; }
    if (d.tabOver) { note('125% text overflows a tab label'); return false; }
    return d.fs === 1.25 ? 'no overflow at 125%' : false;
  });

  await step('back to normal text size', async () => {
    await click('[data-act="set-fs"][data-v="1"]');
    return (await evalJS(`parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--fs'))`)) === 1 ? 'restored' : false;
  });

  await step('the bell reports what is waiting', async () => {
    await click('[data-act="notify"]');
    return (await evalJS(`!!document.querySelector('.toast')`)) || false;
  });

  await step('the demo resets', async () => {
    await evalJS(`location.hash = '#/profile'`);
    await sleep(250);
    await click('[data-act="reset"]');
    const s = await st();
    return s.checkins.length === 0 && s.certified.length === 0 ? 'back to a fresh state' : false;
  });
}

/* --- contrast ----------------------------------------------------------- */
/* Reads the palette out of the live page and measures it, so this check can
   never drift from the stylesheet the way a hardcoded table would. */
async function contrast() {
  const WHITE = '#FFFFFF';
  const vars = await evalJS(`(() => {
    const cs = getComputedStyle(document.documentElement);
    const names = ['maroon-700','maroon-200','ink-900','ink-600','ink-500','ink-400','ink-300',
      'paper','canvas','canvas-2','blush-50','maroon-100',
      'good-500','good-700','good-100','warn-500','warn-700','warn-100',
      'crit-500','crit-700','crit-100','info-700','info-100',
      'triage-good-b','triage-warn-b','triage-crit-b'];
    const o = {};
    names.forEach(n => { o[n] = cs.getPropertyValue('--' + n).trim(); });
    return o;
  })()`);
  const v = vars;
  const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16) / 255);
  const lum = h => hex(h).map(c => c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
    .reduce((a, c, i) => a + c * [0.2126, 0.7152, 0.0722][i], 0);
  const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };

  const pairs = [
    ['ink-900 on paper', v['ink-900'], v.paper, 4.5],
    ['ink-600 on paper', v['ink-600'], v.paper, 4.5],
    ['ink-500 on paper', v['ink-500'], v.paper, 4.5],
    ['ink-500 on canvas', v['ink-500'], v.canvas, 4.5],
    ['ink-400 on paper', v['ink-400'], v.paper, 4.5],
    ['ink-400 on canvas', v['ink-400'], v.canvas, 4.5],
    ['ink-300 chevron on paper', v['ink-300'], v.paper, 3.0],
    ['maroon-700 on paper', v['maroon-700'], v.paper, 4.5],
    ['maroon-700 on blush-50', v['maroon-700'], v['blush-50'], 4.5],
    ['ink-500 on blush-50', v['ink-500'], v['blush-50'], 4.5],
    ['white on maroon-700', WHITE, v['maroon-700'], 4.5],
    ['white on good-500', WHITE, v['good-500'], 4.5],
    ['white on crit-500', WHITE, v['crit-500'], 4.5],
    ['white on warn-500', WHITE, v['warn-500'], 4.5],
    ['good-700 on good-100', v['good-700'], v['good-100'], 4.5],
    ['warn-700 on warn-100', v['warn-700'], v['warn-100'], 4.5],
    ['crit-700 on crit-100', v['crit-700'], v['crit-100'], 4.5],
    ['info-700 on info-100', v['info-700'], v['info-100'], 4.5],
    ['maroon-700 on maroon-100', v['maroon-700'], v['maroon-100'], 4.5],
  ];

  // the triage panels are white-on-gradient; the lighter end is the worst case
  for (const k of ['good', 'warn', 'crit']) {
    pairs.push([`white on triage ${k} (light end)`, WHITE, v[`triage-${k}-b`], 4.5]);
  }

  console.log('\n— contrast, read from the live stylesheet (AA body text needs 4.5) —');
  for (const [label, fg, bg, min] of pairs) {
    if (!fg || !bg) { note(`contrast: could not resolve ${label}`); continue; }
    const r = ratio(fg, bg);
    const ok = r >= min;
    if (!ok) note(`contrast ${label} = ${r.toFixed(2)}:1, below ${min}:1`);
    console.log(`  ${ok ? '✓' : '✗'} ${label.padEnd(32)} ${r.toFixed(2)}:1`);
  }
}

/* --- chrome lifecycle --------------------------------------------------- */
async function main() {
  if (!CHROME) { console.error('No Chrome or Edge found.'); process.exit(1); }
  if (WANT_SHOTS) fs.mkdirSync(SHOT_DIR, { recursive: true });

  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'hksw-'));
  const chrome = spawn(CHROME, [
    '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
    '--disable-extensions', '--hide-scrollbars', '--force-device-scale-factor=1',
    `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`,
    '--window-size=1440,980', 'about:blank',
  ], { stdio: 'ignore' });

  let target = null;
  for (let i = 0; i < 60 && !target; i++) {
    await sleep(250);
    try {
      const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
      target = list.find(t => t.type === 'page');
    } catch (e) { /* not up yet */ }
  }
  if (!target) { chrome.kill(); console.error('Chrome did not expose a page target.'); process.exit(1); }

  ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });

  ws.onmessage = ev => {
    const m = JSON.parse(ev.data);
    if (m.id && pending.has(m.id)) {
      const { res, rej } = pending.get(m.id);
      pending.delete(m.id);
      m.error ? rej(new Error(m.error.message)) : res(m.result);
      return;
    }
    if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') {
      consoleErrors.push(m.params.args.map(a => a.value ?? a.description ?? '').join(' '));
    }
    if (m.method === 'Runtime.exceptionThrown') {
      consoleErrors.push('UNCAUGHT: ' + (m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text));
    }
    if (m.method === 'Log.entryAdded' && m.params.entry.level === 'error') {
      consoleErrors.push('LOG: ' + m.params.entry.text + ' @ ' + (m.params.entry.url || ''));
    }
  };

  await send('Runtime.enable');
  await send('Log.enable');
  await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 980, deviceScaleFactor: 1, mobile: false });

  console.log('— loading', FILE_URL);
  await send('Page.navigate', { url: FILE_URL });
  await sleep(1600);

  const boot = await evalJS(`({ rails: !!document.querySelector('.loop__item'), tabs: document.querySelectorAll('.tabbar button').length, title: document.title })`);
  console.log('  boot:', JSON.stringify(boot));

  await goldenPath();
  await secondaryFlows();

  console.log('\n— every route —');
  await freshState();
  const seen = await walk();
  for (const p of seen) {
    const flags = [];
    if (p.rendered !== p.route) flags.push('STALE:' + p.rendered);
    if (p.hOverflow) flags.push('h-overflow');
    if (p.oob.length) flags.push('oob:' + p.oob.length);
    if (p.small.length) flags.push('small:' + p.small.length);
    if (p.clipped.length) flags.push('clipped:' + p.clipped.length);
    console.log(`  ${flags.length ? '✗' : '✓'} ${(p.route || '').padEnd(22)} ${String(p.chars).padStart(5)} chars  ${p.title.slice(0, 30).padEnd(30)} ${flags.join(' ')}`);
  }

  // narrow viewport: the app must work as a plain phone-sized page
  console.log('\n— narrow viewport (390 x 844) —');
  await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await sleep(300);
  for (const r of ['#/home', '#/train', '#/impact', '#/circle', '#/checkin/prasert', '#/profile']) {
    await evalJS(`location.hash = ${JSON.stringify(r)}`);
    await sleep(220);
    const d = await evalJS(`(() => {
      const de = document.documentElement;
      const btn = [...document.querySelectorAll('button')].filter(b => {
        const x = b.getBoundingClientRect();
        return x.width > 0 && x.height > 0 && x.height < 44;
      }).map(b => ((b.className||'').toString().slice(0,30)) + ' ' + Math.round(b.getBoundingClientRect().height));
      return { over: de.scrollWidth > de.clientWidth + 1, sw: de.scrollWidth, cw: de.clientWidth, small: btn.slice(0,6) };
    })()`);
    if (d.over) note(`390px ${r}: page scrolls sideways (${d.sw} > ${d.cw})`);
    if (d.small.length) note(`390px ${r}: small targets ${d.small.join(' | ')}`);
    console.log(`  ${d.over ? '✗' : '✓'} ${r.padEnd(18)} ${d.over ? 'overflows ' + d.sw + '>' + d.cw : 'fits'}`);
    if (WANT_SHOTS) await shot('narrow' + r.replace(/[#/]/g, '_'));
  }

  await contrast();

  if (consoleErrors.length) {
    console.log('\n— console errors —');
    [...new Set(consoleErrors)].slice(0, 30).forEach(e => { console.log('  ' + e.slice(0, 220)); note('console: ' + e.slice(0, 160)); });
  } else {
    console.log('\n— console: clean, no errors or uncaught exceptions —');
  }

  console.log('\n' + '='.repeat(64));
  if (problems.length) {
    console.log(`FAIL — ${problems.length} problem(s):`);
    [...new Set(problems)].forEach(p => console.log('  • ' + p));
  } else {
    console.log('PASS — no overflow, no clipped text, all targets >= 44px, contrast holds, no console errors.');
  }
  console.log('='.repeat(64));

  ws.close();
  chrome.kill();
  await sleep(300);
  process.exit(problems.length ? 1 : 0);
}

async function shot(name) {
  try {
    const r = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
    fs.writeFileSync(path.join(SHOT_DIR, name + '.png'), Buffer.from(r.data, 'base64'));
  } catch (e) { /* non-fatal */ }
}

main().catch(e => { console.error('harness error:', e.message); process.exit(1); });
