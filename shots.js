/* Captures the phone screen at 2x for a set of routes, from a baked demo state,
   so the interesting screens (certified, escalated, triaged) can be looked at.
   Usage: node shots.js */
const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const ROOT = __dirname;
const FILE_URL = 'file:///' + path.join(ROOT, 'index.html').replace(/\\/g, '/').replace(/ /g, '%20');
const PORT = 9333;
const OUT = path.join(ROOT, 'shots');

const CHROME = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
].find(p => fs.existsSync(p));

const sleep = ms => new Promise(r => setTimeout(r, ms));
let ws, id = 0;
const pending = new Map();
const send = (method, params = {}) => {
  const i = ++id;
  ws.send(JSON.stringify({ id: i, method, params }));
  return new Promise((res, rej) => {
    pending.set(i, { res, rej });
    setTimeout(() => { if (pending.has(i)) { pending.delete(i); rej(new Error('timeout ' + method)); } }, 20000);
  });
};
const evalJS = async e => (await send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true })).result.value;

/* a state that exercises every interesting screen at once */
const STATE = {
  role: 'mentor', fs: 1,
  certified: ['vitals', 'falls'],
  progress: { vitals: 3, falls: 3, mind: 1, move: 0, meds: 0 },
  quiz: { vitals: { picked: [1, 2, 0], passed: true }, falls: { picked: [0, 1, 2], passed: true } },
  circle: ['prasert', 'malee', 'boonmee', 'somchai'],
  joined: ['chair', 'walk'],
  checkins: [
    { id: 'ci-1', seniorId: 'prasert', date: '12 Sep', time: '10:14',
      sys: 168, dia: 104, pulse: 88, mood: 'low', appetite: 'fair', sleep: 'broken',
      meds: 'partly', dizzy: 'yes', fallen: 'yes', homeSafe: 'no',
      note: 'Said the morning tablets make him dizzy when he stands. Ate only rice at lunch. Rug by the bathroom door is loose.',
      flags: [['Blood pressure well above target', 'crit'], ['Dizzy on standing — fall risk', 'crit'], ['A fall since the last visit', 'crit'], ['Medication taken irregularly', 'warn']],
      level: 'crit', escalated: true },
  ],
  sessions: [{ activityId: 'chair', present: ['boonmee', 'somchai', 'malee'], date: 'Today', time: '09:58', hours: 1, completed: true }],
  cases: [
    { id: 'c-new', seniorId: 'prasert', mentor: 'Mrs. Somsri, 68', raised: '20 minutes ago',
      severity: 'crit', reason: 'Blood pressure well above target',
      detail: 'Said the morning tablets make him dizzy when he stands. Ate only rice at lunch. Rug by the bathroom door is loose.',
      vitals: { sys: 168, dia: 104, pulse: 88 }, status: 'open', action: null, raisedByMentor: true },
    { id: 'c-1041', seniorId: 'boonmee', mentor: 'Uncle Chai, 71', raised: '2 hours ago',
      severity: 'warn', reason: 'Weight up 2.1 kg in three days',
      detail: 'Mr. Boonmee reported no new symptoms. He says his rings feel tight. Daughter is away until Friday.',
      vitals: { sys: 132, dia: 84, pulse: 76 }, status: 'open', action: null },
    { id: 'c-1038', seniorId: 'wilai', mentor: 'Auntie Malee, 72', raised: 'Yesterday',
      severity: 'warn', reason: 'Low mood noted on two consecutive visits',
      detail: 'Auntie Malee sat with her for an hour.',
      vitals: { sys: 124, dia: 78, pulse: 72 }, status: 'closed',
      action: 'Routine. Mentor to continue weekly check-ins and report any change.' },
    { id: 'c-1030', seniorId: 'malee', mentor: 'Mrs. Somsri, 68', raised: '3 days ago',
      severity: 'warn', reason: 'Knees sore after gardening',
      detail: 'Swelling in both knees after two hours in the garden.',
      vitals: { sys: 128, dia: 78, pulse: 70 }, status: 'closed',
      action: 'Booked a home visit for Thursday 10:00. Mentor asked to attend.', raisedByMentor: true },
  ],
  hours: { weeks: [3.5, 4, 5.5, 4.5, 6, 7, 6.5, 8.5] },
  counters: { mentors: 319, checkins: 6847, flags: 514, hours: 1288.5 },
};

const SHOTS = [
  ['home', '#/home'],
  ['train', '#/train'],
  ['course', '#/course/vitals'],
  ['lesson-thresholds', '#/lesson/vitals/2'],
  ['quiz', '#/quiz/vitals'],
  ['certificate', '#/certificate/vitals'],
  ['circle-need', '#/circle'],
  ['circle-act', '#/circle/act'],
  ['senior-prasert', '#/senior/prasert'],
  ['checkin', '#/checkin/prasert'],
  ['result-crit', '#/result/prasert'],
  ['impact', '#/impact'],
  ['profile', '#/profile'],
  ['nurse-inbox', '#/nurse'],
  ['nurse-case', '#/case/c-new'],
  ['nurse-mentors', '#/mentors'],
  ['nurse-impact', '#/nurse-impact'],
];

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'hksw-shots-'));
  const chrome = spawn(CHROME, [
    '--headless=new', '--disable-gpu', '--no-first-run', '--hide-scrollbars',
    `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`,
    '--window-size=1440,1000', 'about:blank',
  ], { stdio: 'ignore' });

  let target = null;
  for (let i = 0; i < 60 && !target; i++) {
    await sleep(250);
    try {
      const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
      target = list.find(t => t.type === 'page');
    } catch (e) {}
  }
  ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
  ws.onmessage = ev => {
    const m = JSON.parse(ev.data);
    if (m.id && pending.has(m.id)) {
      const { res, rej } = pending.get(m.id);
      pending.delete(m.id);
      m.error ? rej(new Error(m.error.message)) : res(m.result);
    }
  };
  await send('Runtime.enable');
  await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 2, mobile: false });
  await send('Page.navigate', { url: FILE_URL });
  await sleep(1800);

  await evalJS(`localStorage.setItem('hksw.v1', ${JSON.stringify(JSON.stringify(STATE))}); location.reload()`);
  await sleep(1500);

  for (const [name, route] of SHOTS) {
    await evalJS(`location.hash = ${JSON.stringify(route)}`);
    await sleep(320);
    const box = await evalJS(`(() => {
      const r = document.querySelector('.phone').getBoundingClientRect();
      return { x: Math.round(r.x), y: Math.round(r.y), width: Math.round(r.width), height: Math.round(r.height) };
    })()`);
    const shot = await send('Page.captureScreenshot', {
      format: 'png',
      clip: { x: box.x, y: box.y, width: box.width, height: box.height, scale: 1.6 },
      captureBeyondViewport: true,
    });
    fs.writeFileSync(path.join(OUT, name + '.png'), Buffer.from(shot.data, 'base64'));
    console.log(`  ${name.padEnd(20)} ${route}`);
  }

  // the full stage, so the rail can be reviewed too
  await evalJS(`location.hash = '#/impact'`);
  await sleep(400);
  const full = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
  fs.writeFileSync(path.join(OUT, 'stage-desktop.png'), Buffer.from(full.data, 'base64'));
  console.log('  stage-desktop        (entire page)');

  console.log(`\n${SHOTS.length + 1} shots written to shots/`);
  ws.close(); chrome.kill();
  await sleep(300); process.exit(0);
})().catch(e => { console.error(e.message); process.exit(1); });
