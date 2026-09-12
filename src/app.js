/* ==========================================================================
   Ha Koo Soong Wai — Senior-to-Senior Health Network
   Prototype application logic. No framework, no build, no network calls.
   ========================================================================== */

/* --- icons -------------------------------------------------------------- */
const ICONS = {
  home: '<path d="M3 10.2 12 3l9 7.2"/><path d="M5.5 9.2V20h13V9.2"/><path d="M9.8 20v-5.4h4.4V20"/>',
  book: '<path d="M4 5.2A2.2 2.2 0 0 1 6.2 3H19v15.5H6.2A2.2 2.2 0 0 0 4 20.7z"/><path d="M4 18.5A2.2 2.2 0 0 1 6.2 16.3H19"/>',
  users: '<circle cx="9" cy="8" r="3.3"/><path d="M2.8 20a6.4 6.4 0 0 1 12.4 0"/><path d="M16.4 5.2a3.3 3.3 0 0 1 0 6.4"/><path d="M17.6 14.4A6.4 6.4 0 0 1 21.4 20"/>',
  chart: '<path d="M4 20V10"/><path d="M10 20V4"/><path d="M16 20v-7"/><path d="M22 20H2"/>',
  user: '<circle cx="12" cy="8" r="3.8"/><path d="M4.5 20.5a7.5 7.5 0 0 1 15 0"/>',
  'chev-left': '<path d="M15 5l-7 7 7 7"/>',
  'chev-right': '<path d="M9 5l7 7-7 7"/>',
  'chev-down': '<path d="M5 9l7 7 7-7"/>',
  bell: '<path d="M18 9a6 6 0 1 0-12 0c0 5-2 6-2 6h16s-2-1-2-6"/><path d="M13.7 20a2 2 0 0 1-3.4 0"/>',
  heart: '<path d="M12 20s-7.5-4.4-7.5-9.3A4.2 4.2 0 0 1 12 8a4.2 4.2 0 0 1 7.5 2.7C19.5 15.6 12 20 12 20z"/>',
  plus: '<path d="M12 5v14"/><path d="M5 12h14"/>',
  check: '<path d="M4.5 12.5 9.5 17.5 19.5 7"/>',
  'check-circle': '<circle cx="12" cy="12" r="9"/><path d="M8 12.4l2.8 2.8L16 9.6"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5.2l3.2 2"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 9.8h17"/><path d="M8 3v3.6"/><path d="M16 3v3.6"/>',
  'map-pin': '<path d="M12 21s6.5-5.6 6.5-10.4A6.5 6.5 0 0 0 5.5 10.6C5.5 15.4 12 21 12 21z"/><circle cx="12" cy="10.4" r="2.4"/>',
  phone: '<path d="M6.4 3.5h3l1.6 4-2 1.4a11.5 11.5 0 0 0 5.6 5.6l1.4-2 4 1.6v3a2 2 0 0 1-2.2 2A16.6 16.6 0 0 1 4.4 5.7a2 2 0 0 1 2-2.2z"/>',
  alert: '<path d="M12 4.2 2.8 20h18.4z"/><path d="M12 10v4"/><path d="M12 17.2h.01"/>',
  shield: '<path d="M12 3 5 6v5.5c0 4.4 3 8 7 9.5 4-1.5 7-5.1 7-9.5V6z"/><path d="M9.2 12.2l2 2 3.6-3.8"/>',
  pulse: '<path d="M2.5 12.5h4L9 6.5l3.4 11 2.6-5h6.5"/>',
  walk: '<circle cx="13" cy="4.4" r="1.9"/><path d="M12 8.2 9.5 11l1.2 4.2-2 6"/><path d="M10.7 15.2 15 17l1.4 4.4"/><path d="M12 8.2 15.6 10l2.4-.8"/>',
  pill: '<rect x="2.6" y="9" width="18.8" height="6.6" rx="3.3" transform="rotate(-45 12 12.3)"/><path d="M8.8 8.2l6.6 6.6"/>',
  leaf: '<path d="M20 4c0 9-5 12.5-10.5 12.5"/><path d="M4 20c1-6 4-9.5 9-11"/><path d="M9.5 16.5C5 16.5 4 20 4 20"/>',
  pot: '<path d="M4.5 9.5h15l-1.4 8.2a2.5 2.5 0 0 1-2.5 2h-7.2a2.5 2.5 0 0 1-2.5-2z"/><path d="M9 9.5V7a3 3 0 0 1 6 0v2.5"/>',
  moon: '<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"/>',
  smile: '<circle cx="12" cy="12" r="9"/><path d="M8.4 14.2a4.4 4.4 0 0 0 7.2 0"/><path d="M9.2 9.6h.01"/><path d="M14.8 9.6h.01"/>',
  award: '<circle cx="12" cy="9.2" r="5.7"/><path d="M8.5 14 7 21.5l5-2.6 5 2.6L15.5 14"/>',
  play: '<path d="M7 4.8 19 12 7 19.2z"/>',
  refresh: '<path d="M20 11.5a8 8 0 1 0-.7 4.5"/><path d="M20 5.5v6h-6"/>',
  x: '<path d="M6 6l12 12"/><path d="M18 6 6 18"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5"/><path d="M12 7.8h.01"/>',
  'arrow-right': '<path d="M4 12h15"/><path d="M13 6l6 6-6 6"/>',
  stethoscope: '<path d="M5 3v5a4 4 0 0 0 8 0V3"/><path d="M9 12v3.5a5.5 5.5 0 0 0 5.5 5.5 5.5 5.5 0 0 0 5.5-5.5V13"/><circle cx="20" cy="10.5" r="2.2"/>',
  trend: '<path d="M3 17.5 9.5 11l4 4L21 7.5"/><path d="M21 12.5v-5h-5"/>',
  droplet: '<path d="M12 3.5s5.5 5.4 5.5 9.3A5.5 5.5 0 0 1 6.5 12.8C6.5 8.9 12 3.5 12 3.5z"/>',
  utensils: '<path d="M6 3v7.5a2.6 2.6 0 0 0 5.2 0V3"/><path d="M8.6 13.5V21"/><path d="M16.5 3v18"/><path d="M16.5 3c2.4 1 3.2 3.4 3.2 6h-3.2"/>',
  scale: '<path d="M12 4v16"/><path d="M6 8h12"/><path d="M6 8 3 14.5h6z"/><path d="M18 8l-3 6.5h6z"/>',
  clipboard: '<rect x="5.5" y="4.5" width="13" height="16.5" rx="2.4"/><path d="M9.2 4.5V3.4A1.4 1.4 0 0 1 10.6 2h2.8a1.4 1.4 0 0 1 1.4 1.4v1.1z"/><path d="M9 11h6"/><path d="M9 15h4"/>',
  send: '<path d="M21 3 10.5 13.5"/><path d="M21 3l-6.8 18-3.7-7.5L3 9.8z"/>',
  lock: '<rect x="4.5" y="10.5" width="15" height="10" rx="2.4"/><path d="M8 10.5V7.6a4 4 0 0 1 8 0v2.9"/>',
  eye: '<path d="M2.5 12S6 5.8 12 5.8 21.5 12 21.5 12 18 18.2 12 18.2 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="2.9"/>',
};

function ic(name, size = 22, sw = 1.8, cls = '') {
  const d = ICONS[name] || ICONS.info;
  return `<svg class="${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"
    aria-hidden="true">${d}</svg>`;
}

/* --- brand mark --------------------------------------------------------- */
function mark(size = 40) {
  return `<svg class="rail__mark" width="${size}" height="${size}" viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <rect width="48" height="48" rx="13" fill="#9B1B3A"/>
    <path d="M24 37.5s-11-6.6-11-14a6.1 6.1 0 0 1 11-3.4 6.1 6.1 0 0 1 11 3.4c0 7.4-11 14-11 14z" fill="#fff" fill-opacity=".95"/>
    <circle cx="18.2" cy="17.4" r="3.1" fill="#9B1B3A"/>
    <circle cx="29.8" cy="17.4" r="3.1" fill="#9B1B3A"/>
    <path d="M21.1 26.4h5.8M24 23.4v6" stroke="#9B1B3A" stroke-width="1.9" stroke-linecap="round"/>
  </svg>`;
}

/* --- state -------------------------------------------------------------- */
const KEY = 'hksw.v1';

function seedState() {
  return {
    role: 'mentor',
    fs: 1,
    certified: [],
    progress: {},          // courseId -> number of lessons read
    quiz: {},              // courseId -> { picked: [], passed: false }
    circle: ['prasert', 'malee', 'boonmee'],
    joined: ['chair'],
    checkins: [],          // completed check-ins
    sessions: [],          // completed activity sessions
    cases: DATA.cases.map(c => ({ ...c })),
    hours: { weeks: [3.5, 4, 5.5, 4.5, 6, 7, 6.5, 8.5] },
    counters: {
      mentors: DATA.district.mentors,
      mentorsTrained: DATA.district.mentorsTrained,
      checkins: DATA.district.checkins,
      flags: DATA.district.flags,
      hours: DATA.district.profHours,
    },
  };
}

let S = load();

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return seedState();
    const parsed = JSON.parse(raw);
    const base = seedState();
    // merge so a schema change never breaks a stored session
    return { ...base, ...parsed, counters: { ...base.counters, ...(parsed.counters || {}) } };
  } catch (e) {
    return seedState();
  }
}
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* private mode */ }
}
function resetDemo() {
  S = seedState();
  save();
  draft = null;
  bump = null;
  go('#/home');
  render();
  toast('Demo reset to its starting state.', 'refresh');
}

/* --- helpers ------------------------------------------------------------ */
const $ = (sel, root = document) => root.querySelector(sel);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const senior = id => DATA.seniors.find(s => s.id === id);
const course = id => DATA.courses.find(c => c.id === id);
const activity = id => DATA.activities.find(a => a.id === id);
const num = n => n.toLocaleString('en-US');
const oneDp = n => (Math.round(n * 10) / 10).toFixed(1).replace(/\.0$/, '');

function av(person, size = 48, extra = '') {
  const cls = `av av--${size} ${person.av || 'av--g1'} ${extra}`;
  return `<span class="${cls}" aria-hidden="true">${person.initials}</span>`;
}
function avWrap(person, size = 48, verified = false) {
  return `<span class="av-wrap">${av(person, size)}${verified ? `<span class="av-wrap__badge">${ic('check', 12, 3)}</span>` : ''}</span>`;
}
function chip(text, tone = '', icon = '') {
  return `<span class="chip ${tone ? 'chip--' + tone : ''}">${icon ? ic(icon, 13, 2.2) : ''}${esc(text)}</span>`;
}
function row({ icon = '', tone = '', title, sub = '', chev = true, act = '', data = '', tag = 'button', pressed = null }) {
  const inner = `
    ${icon ? `<span class="row__ic ${tone ? 'row__ic--' + tone : ''}">${ic(icon, 21)}</span>` : ''}
    <span class="row__b">
      <span class="row__t">${title}</span>
      ${sub ? `<span class="row__s">${sub}</span>` : ''}
    </span>
    ${chev ? `<span class="row__chev">${ic('chev-right', 19, 2.2)}</span>` : ''}`;
  if (tag === 'div') return `<div class="row">${inner}</div>`;
  return `<button class="row" data-act="${act}" ${data} ${pressed !== null ? `aria-pressed="${pressed}"` : ''}>${inner}</button>`;
}
function sectionHead(title, sub = '') {
  return `<div class="section-head"><h2>${esc(title)}</h2>${sub ? `<p>${esc(sub)}</p>` : ''}</div>`;
}
function appbar() {
  return `<header class="appbar" id="appbar"></header>`;
}
function statusbar() {
  return `<div class="statusbar">
    <span class="tnum">9:41</span>
    <span class="statusbar__notch"></span>
    <span class="statusbar__right">
      ${ic('chart', 15, 2.4)}
      <svg width="17" height="12" viewBox="0 0 17 12" fill="none" aria-hidden="true">
        <rect x=".7" y=".7" width="13.6" height="10.6" rx="3" stroke="currentColor" stroke-width="1.2" opacity=".45"/>
        <rect x="2.4" y="2.4" width="10.2" height="7.2" rx="1.8" fill="currentColor"/>
        <path d="M15.9 4.4v3.2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" opacity=".45"/>
      </svg>
    </span>
  </div>`;
}

/* --- toast & sheet ------------------------------------------------------ */
let toastTimer = null;
function toast(msg, icon = 'check-circle') {
  const host = $('#toast-host');
  if (!host) return;
  host.innerHTML = `<div class="toast" role="status">${ic(icon, 19, 2.2)}<span>${msg}</span></div>`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { host.innerHTML = ''; }, 3800);
}
function closeSheet() { $('#sheet-host').innerHTML = ''; }

/* ==========================================================================
   Check-in draft + triage rules
   ========================================================================== */
let draft = null;

function newDraft(seniorId) {
  const s = senior(seniorId);
  const last = s.history[0];
  return {
    seniorId,
    step: 0,
    sys: last ? last.sys : 130,
    dia: last ? last.dia : 80,
    pulse: last ? last.pulse : 74,
    mood: '', appetite: '', sleep: '',
    meds: '', dizzy: '', fallen: '', homeSafe: '',
    note: '',
  };
}

/* Thresholds mirror the academy content and are the clinic's, not the mentor's. */
function triage(d) {
  const flags = [];
  let level = 'good';
  const up = l => { if (l === 'crit') level = 'crit'; else if (level !== 'crit') level = 'warn'; };

  if (d.sys >= 180 || d.dia >= 120) { flags.push(['Blood pressure at emergency level', 'crit']); up('crit'); }
  else if (d.sys >= 160 || d.dia >= 100) { flags.push(['Blood pressure well above target', 'crit']); up('crit'); }
  else if (d.sys >= 140 || d.dia >= 90) { flags.push(['Blood pressure above target', 'warn']); up('warn'); }
  if (d.sys < 90 || d.dia < 60) { flags.push(['Blood pressure unusually low', 'warn']); up('warn'); }
  if (d.pulse > 110 || d.pulse < 50) { flags.push(['Pulse outside the usual range', 'warn']); up('warn'); }
  if (d.dizzy === 'yes') { flags.push(['Dizzy on standing — fall risk', 'crit']); up('crit'); }
  if (d.fallen === 'yes') { flags.push(['A fall since the last visit', 'crit']); up('crit'); }
  if (d.meds === 'no') { flags.push(['Medication not taken', 'warn']); up('warn'); }
  else if (d.meds === 'partly') { flags.push(['Medication taken irregularly', 'warn']); up('warn'); }
  if (d.mood === 'low') { flags.push(['Low mood reported', 'warn']); up('warn'); }
  if (d.appetite === 'poor') { flags.push(['Eating poorly', 'warn']); up('warn'); }
  if (d.homeSafe === 'no') { flags.push(['Home safety concern', 'warn']); up('warn'); }
  if (d.note && /chest pain|can\'t breathe|cannot breathe|fell|bleeding|unconscious|weak(ness)? on one side/i.test(d.note)) {
    flags.push(['Your note mentions something urgent', 'crit']); up('crit');
  }
  return { level, flags };
}

/* ==========================================================================
   Router
   ========================================================================== */
let bump = null;   // which counter to animate on the next rail render

function go(hash) {
  if (location.hash === hash) render();
  else location.hash = hash;
}

function parse() {
  const raw = location.hash.replace(/^#\/?/, '');
  const [head, a, b] = (raw || 'home').split('/');
  return { head: head || 'home', a, b, depth: (raw || 'home').split('/').length - 1 };
}

const TABS = {
  mentor: [
    { id: 'home', label: 'Home', icon: 'home', to: '#/home' },
    { id: 'train', label: 'Academy', icon: 'book', to: '#/train' },
    { id: 'circle', label: 'Circle', icon: 'users', to: '#/circle' },
    { id: 'impact', label: 'Impact', icon: 'chart', to: '#/impact' },
    { id: 'profile', label: 'Profile', icon: 'user', to: '#/profile' },
  ],
  nurse: [
    { id: 'nurse', label: 'Inbox', icon: 'clipboard', to: '#/nurse' },
    { id: 'mentors', label: 'Mentors', icon: 'users', to: '#/mentors' },
    { id: 'nurse-impact', label: 'Impact', icon: 'chart', to: '#/nurse-impact' },
  ],
};

/* The role is derived from the route, never carried alongside it, so a deep
   link can't render one role's screens inside the other role's chrome. */
const NURSE_ROUTES = ['nurse', 'mentors', 'nurse-impact', 'case'];
const TAB_ROOTS = ['home', 'train', 'circle', 'impact', 'profile', 'nurse', 'mentors', 'nurse-impact'];

/* stage index (1-5) for the loop diagram */
const STAGE_OF = {
  home: 1, train: 2, course: 2, lesson: 2, quiz: 2,
  certificate: 3, profile: 3,
  circle: 4, senior: 4, checkin: 4, result: 4, activity: 4, session: 4,
  impact: 5, nurse: 5, case: 5, mentors: 5, 'nurse-impact': 5,
};
const NOTE_OF = {
  home: 'home', train: 'train', course: 'train', lesson: 'lesson', quiz: 'quiz',
  certificate: 'certificate', profile: 'profile',
  circle: 'circle', senior: 'senior', checkin: 'checkin', result: 'result',
  activity: 'activity', session: 'session', impact: 'impact',
  nurse: 'nurse', case: 'case', mentors: 'mentors', 'nurse-impact': 'mentors',
};

/* ==========================================================================
   Screens
   ========================================================================== */
const V = {};

/* ---- mentor: home ------------------------------------------------------ */
V.home = () => {
  const m = DATA.mentor;
  const certified = S.certified.length > 0;
  const due = DATA.seniors.filter(s => S.circle.includes(s.id) && s.nextDue.startsWith('Today'));
  const today = DATA.activities.filter(a => S.joined.includes(a.id) && a.day.includes('Tuesday'));
  const circle = DATA.seniors.filter(s => S.circle.includes(s.id));

  return `
  <div class="hero">
    <div class="hero__top">
      ${av(m, 56)}
      <div style="flex:1;min-width:0">
        <div class="hero__name">${esc(m.name)}</div>
        <div class="hero__meta">
          <span class="pill-verified">${ic(certified ? 'shield' : 'clock', 13, 2.4)}
          ${certified ? `Certified mentor · ${S.certified.length} module${S.certified.length > 1 ? 's' : ''}` : 'Trainee mentor'}</span>
        </div>
      </div>
    </div>
    <div class="hero__strip">
      <div class="hero__stat"><b class="tnum">${oneDp(weekHours())}</b><span>hours this week</span></div>
      <div class="hero__stat"><b class="tnum">${S.circle.length}</b><span>people you support</span></div>
      <div class="hero__stat"><b class="tnum">${S.checkins.length}</b><span>check-ins logged</span></div>
    </div>
  </div>

  <div class="pad">
    ${!certified ? `
    <button class="card card--pad" data-act="nav" data-to="#/train" style="text-align:left;display:flex;gap:13px;align-items:center;width:100%">
      <span class="row__ic row__ic--warn">${ic('award', 21)}</span>
      <span class="row__b">
        <span class="row__t">Finish your first module to be certified</span>
        <span class="row__s">Nurse Anong can only assign you a neighbour once you hold a certificate.</span>
      </span>
      <span class="row__chev">${ic('chev-right', 19, 2.2)}</span>
    </button>` : ''}

    ${due.length ? `
    <div class="card card--pad" style="border-left:3px solid var(--warn-500)">
      <div class="row-between" style="align-items:flex-start">
        <div style="display:flex;gap:12px;align-items:flex-start">
          <span class="row__ic row__ic--warn">${ic('bell', 21)}</span>
          <div>
            <div class="row__t">Check-in due today</div>
            <div class="row__s">${due.map(s => esc(s.name)).join(', ')} — last visit was a week ago.</div>
          </div>
        </div>
      </div>
      <div class="stack stack--sm" style="margin-top:13px">
        ${due.map(s => `<button class="btn btn--primary btn--block" data-act="nav" data-to="#/checkin/${s.id}">
          ${ic('clipboard', 18, 2.1)} Check in on ${esc(s.name.split(' ')[1] || s.name)}</button>`).join('')}
      </div>
    </div>` : ''}

    ${sectionHead('Today')}
    ${today.length ? `<div class="card">${today.map(a => `
      <button class="row" data-act="nav" data-to="#/activity/${a.id}">
        <span class="row__ic">${ic(a.icon, 21)}</span>
        <span class="row__b">
          <span class="row__t">${esc(a.title)}</span>
          <span class="row__s">${esc(a.time)} · ${esc(a.place)}</span>
        </span>
        <span class="chip chip--good">${ic('check', 12, 3)}Going</span>
      </button>`).join('')}</div>`
      : `<div class="card card--pad center"><div class="row__s" style="margin:0">Nothing scheduled today. Your next group is on Thursday.</div></div>`}

    ${sectionHead('Quick actions')}
    <div class="quick">
      <button data-act="nav" data-to="#/circle">
        <span class="quick__ic">${ic('clipboard', 20)}</span>
        <span class="quick__t">Log a check-in</span>
        <span class="quick__s">Visit and record</span>
      </button>
      <button data-act="nav" data-to="#/train">
        <span class="quick__ic">${ic('book', 20)}</span>
        <span class="quick__t">Academy</span>
        <span class="quick__s">${S.certified.length} of ${DATA.courses.length} done</span>
      </button>
      <button data-act="nav" data-to="#/circle">
        <span class="quick__ic">${ic('users', 20)}</span>
        <span class="quick__t">Find someone to help</span>
        <span class="quick__s">${DATA.seniors.filter(s => !S.circle.includes(s.id)).length} nearby</span>
      </button>
      <button data-act="nav" data-to="#/activity/walk">
        <span class="quick__ic">${ic('walk', 20)}</span>
        <span class="quick__t">Walking group</span>
        <span class="quick__s">Thursday 6:30</span>
      </button>
    </div>

    ${sectionHead('Your circle', `${circle.length} people`)}
    <div class="card">
      ${circle.map(s => row({
        icon: 'user', title: esc(s.name) + `, ${s.age}`,
        sub: `${esc(s.area)} · next visit: ${esc(s.nextDue.toLowerCase())}`,
        act: 'nav', data: `data-to="#/senior/${s.id}"`,
      })).join('')}
    </div>
  </div>`;
};

function weekHours() { return S.hours.weeks[S.hours.weeks.length - 1]; }

/* ---- mentor: academy --------------------------------------------------- */
V.train = () => {
  const done = S.certified.length;
  const pct = Math.round((done / DATA.courses.length) * 100);
  return `
  <div class="pad">
    <div class="card card--pad" style="display:flex;gap:16px;align-items:center">
      <div class="ring">
        <svg width="74" height="74" viewBox="0 0 74 74">
          <circle class="ring__c" cx="37" cy="37" r="31" stroke="#EDC6D2" stroke-width="7"/>
          <circle class="ring__v" cx="37" cy="37" r="31" stroke="#9B1B3A" stroke-width="7"
            stroke-dasharray="${2 * Math.PI * 31}" stroke-dashoffset="${2 * Math.PI * 31 * (1 - (done ? pct / 100 : 0.02))}"/>
        </svg>
        <span class="ring__label" style="color:var(--maroon-700)">${pct}%</span>
      </div>
      <div style="flex:1">
        <div class="row__t">${done ? `Certified in ${done} module${done > 1 ? 's' : ''}` : 'Not yet certified'}</div>
        <div class="row__s">Every module is written and signed off by a clinician at Bang Kapi Community Health Centre.</div>
      </div>
    </div>

    ${done ? `<div class="card card--pad" style="display:flex;gap:12px;align-items:center;background:var(--good-50);box-shadow:none">
      <span class="row__ic row__ic--good">${ic('shield', 21)}</span>
      <div style="flex:1">
        <div class="row__t" style="color:var(--good-700)">You are a certified mentor</div>
        <div class="row__s">Nurse Anong can assign neighbours to you.</div>
      </div>
    </div>` : ''}

    ${sectionHead('Modules', `${DATA.courses.length} available`)}
    <div class="stack">
      ${DATA.courses.map(c => {
        const read = S.progress[c.id] || 0;
        const q = S.quiz[c.id];
        const complete = S.certified.includes(c.id);
        const started = read > 0 && !complete;
        return `
        <button class="card course" data-act="nav" data-to="#/course/${c.id}" style="text-align:left;width:100%">
          <span class="course__cover ${c.cover}">
            ${ic(c.icon, 30, 1.7)}
            ${c.recommended && !complete ? `<span class="chip" style="background:rgba(255,255,255,.24);color:#fff;position:absolute;left:15px;top:12px">Start here</span>` : ''}
          </span>
          <span class="course__body">
            <span class="course__t">${esc(c.title)}</span>
            <span class="course__by">${esc(c.by)} · ${esc(c.org)}</span>
            <span class="course__foot">
              <span class="course__meta">${ic('clock', 13, 2.2)}${c.minutes} min · ${c.lessons.length} lessons</span>
              ${complete ? chip('Certified', 'good', 'check')
                : started ? chip(`${read}/${c.lessons.length} read`, 'brand')
                : q && !q.passed ? chip('Retake quiz', 'warn')
                : chip('Not started')}
            </span>
            ${started ? `<span class="bar bar--thin"><span class="bar__f" style="width:${(read / c.lessons.length) * 100}%"></span></span>` : ''}
          </span>
        </button>`;
      }).join('')}
    </div>
  </div>`;
};

/* ---- mentor: course detail --------------------------------------------- */
V.course = ({ a: id }) => {
  const c = course(id);
  if (!c) return V.train();
  const read = S.progress[c.id] || 0;
  const complete = S.certified.includes(c.id);
  const q = S.quiz[c.id];
  const next = Math.min(read, c.lessons.length - 1);
  return `
  <div class="pad">
    <div class="card course">
      <div class="course__cover ${c.cover}" style="height:112px">
        ${ic(c.icon, 36, 1.7)}
        <span class="course__t" style="color:#fff;font-size:var(--t-19);max-width:74%">${esc(c.title)}</span>
      </div>
      <div class="course__body">
        <div class="course__by">Written by ${esc(c.by)}<br>${esc(c.org)}</div>
        <div class="course__meta">${ic('clock', 13, 2.2)}${c.minutes} min · ${c.lessons.length} lessons · certificate on completion</div>
      </div>
    </div>

    <div class="callout callout--key">
      <div class="callout__t">${ic('award', 14, 2.2)}By the end you can</div>
      ${esc(c.outcome)}
    </div>

    ${sectionHead('Lessons')}
    <div class="card">
      ${c.lessons.map((l, i) => {
        const isRead = i < read;
        return `
        <button class="row" data-act="nav" data-to="#/lesson/${c.id}/${i}">
          <span class="row__ic ${isRead ? 'row__ic--good' : ''}">${isRead ? ic('check', 19, 2.6) : `<b class="tnum">${i + 1}</b>`}</span>
          <span class="row__b">
            <span class="row__t">${esc(l.t)}</span>
            <span class="row__s">${l.m} min read${l.crit ? ' · safety critical' : ''}</span>
          </span>
          <span class="row__chev">${ic('chev-right', 19, 2.2)}</span>
        </button>`;
      }).join('')}
    </div>

    <div class="stack stack--sm">
      ${complete
        ? `<button class="btn btn--ghost btn--block" data-act="nav" data-to="#/certificate/${c.id}">${ic('award', 18, 2.1)} View your certificate</button>`
        : `<button class="btn btn--primary btn--block" data-act="nav" data-to="#/lesson/${c.id}/${next}">
            ${ic('play', 17, 2.1)} ${read === 0 ? 'Start the first lesson' : 'Continue where you left off'}</button>
           <button class="btn btn--soft btn--block" data-act="nav" data-to="#/quiz/${c.id}">
            ${ic('clipboard', 18, 2.1)} Go to the quiz</button>`}
    </div>
    <p class="muted" style="font-size:var(--t-12);text-align:center;line-height:1.5">
      The quiz needs ${Math.ceil(c.quiz.length * 2 / 3)} of ${c.quiz.length} correct to pass.
    </p>
  </div>`;
};

/* ---- mentor: lesson ---------------------------------------------------- */
V.lesson = ({ a: id, b: idx }) => {
  const c = course(id);
  if (!c) return V.train();
  const i = Math.max(0, Math.min(Number(idx) || 0, c.lessons.length - 1));
  const l = c.lessons[i];
  const last = i === c.lessons.length - 1;
  const isCert = S.certified.includes(c.id);
  return `
  <div class="pad">
    <div class="dots">
      ${c.lessons.map((_, k) => `<i class="${k === i ? 'on' : k < i ? 'done' : ''}"></i>`).join('')}
    </div>
    <div>
      <div class="row__s" style="margin:0 0 6px">${esc(c.title)} · lesson ${i + 1} of ${c.lessons.length}</div>
      <h1 style="font-size:var(--t-26);font-weight:700;letter-spacing:-.025em;line-height:1.2">${esc(l.t)}</h1>
    </div>

    <div class="lesson-body">
      ${l.body.map(p => `<p>${p}</p>`).join('')}
    </div>

    ${l.key ? `<div class="callout callout--key">
      <div class="callout__t">${ic('check-circle', 14, 2.2)}Remember this</div>${esc(l.key)}</div>` : ''}
    ${l.warn ? `<div class="callout callout--warn">
      <div class="callout__t">${ic('alert', 14, 2.2)}Caution</div>${esc(l.warn)}</div>` : ''}
    ${l.crit ? `<div class="callout callout--crit">
      <div class="callout__t">${ic('alert', 14, 2.2)}Safety critical</div>${esc(l.crit)}</div>` : ''}

    ${l.levels ? `<div class="card" style="margin-top:4px">
      <div class="card--pad" style="padding-bottom:6px"><div class="row__t">The clinic's thresholds</div></div>
      ${l.levels.map(v => `<div class="row" style="min-height:auto;padding:9px 16px">
        <span class="dot" style="width:9px;height:9px;border-radius:50%;background:var(--${v.tone === 'good' ? 'good-500' : v.tone === 'warn' ? 'warn-500' : 'crit-500'});flex:none"></span>
        <span class="row__b"><span class="row__t" style="font-size:var(--t-14)">${esc(v.range)}</span></span>
        <span class="chip chip--${v.tone}">${esc(v.label)}</span>
      </div>`).join('')}
    </div>` : ''}

    <div class="stack stack--sm" style="margin-top:4px">
      ${i > 0 ? `<button class="btn btn--ghost btn--block" data-act="nav" data-to="#/lesson/${c.id}/${i - 1}">${ic('chev-left', 18, 2.2)} Previous lesson</button>` : ''}
      ${last
        ? `<button class="btn btn--primary btn--block" data-act="finish-lessons" data-id="${c.id}">
            ${ic('clipboard', 18, 2.1)} Take the quiz</button>`
        : `<button class="btn btn--primary btn--block" data-act="next-lesson" data-id="${c.id}" data-i="${i}">
            Next lesson ${ic('arrow-right', 18, 2.2)}</button>`}
    </div>
    ${isCert ? `<p class="muted center" style="font-size:var(--t-12)">You are already certified in this module. Reading it again never removes the certificate.</p>` : ''}
  </div>`;
};

/* ---- mentor: quiz ------------------------------------------------------ */
V.quiz = ({ a: id }) => {
  const c = course(id);
  if (!c) return V.train();
  const q = S.quiz[c.id] || { picked: [], passed: false };
  // questions can be answered in any order, so count real answers, not array slots
  const answered = q.picked.filter(p => p !== undefined).length;
  const score = q.picked.filter((p, i) => p === c.quiz[i].a).length;
  const allDone = answered === c.quiz.length;
  const need = Math.ceil(c.quiz.length * 2 / 3);

  return `
  <div class="pad">
    <div class="card card--pad">
      <div class="row__t">${esc(c.title)}</div>
      <div class="row__s">${allDone
        ? `You scored ${score} of ${c.quiz.length}. ${score >= need ? 'That is a pass.' : `You need ${need} to pass.`}`
        : `${answered} of ${c.quiz.length} answered · ${need} correct needed to pass`}</div>
    </div>

    ${c.quiz.map((item, qi) => {
      const picked = q.picked[qi];
      const done = picked !== undefined;
      return `
      <div class="card card--pad">
        <div class="row-between" style="align-items:flex-start;margin-bottom:12px">
          <div class="row__t" style="flex:1">${qi + 1}. ${esc(item.q)}</div>
        </div>
        <div class="stack stack--sm">
          ${item.options.map((o, k) => {
            let cls = '';
            if (done) cls = k === item.a ? 'is-correct' : (k === picked ? 'is-wrong' : '');
            return `<button class="opt ${cls}" ${done ? 'disabled' : ''}
              data-act="answer" data-id="${c.id}" data-q="${qi}" data-k="${k}">
              <span class="opt__k">${done && k === item.a ? ic('check', 14, 3) : done && k === picked ? ic('x', 14, 3) : String.fromCharCode(65 + k)}</span>
              <span>${esc(o)}</span>
            </button>`;
          }).join('')}
        </div>
        ${done ? `<div class="callout ${picked === item.a ? 'callout--key' : 'callout--warn'}" style="margin-top:12px">
          <div class="callout__t">${picked === item.a ? ic('check-circle', 14, 2.2) + 'Correct' : ic('alert', 14, 2.2) + 'Not quite'}</div>
          ${esc(item.why)}</div>` : ''}
      </div>`;
    }).join('')}

    ${allDone ? (score >= need
      ? `<button class="btn btn--good btn--block" data-act="certify" data-id="${c.id}">
          ${ic('award', 19, 2.1)} Issue my certificate</button>`
      : `<button class="btn btn--primary btn--block" data-act="retake" data-id="${c.id}">
          ${ic('refresh', 18, 2.1)} Try the quiz again</button>`)
      : `<p class="muted center" style="font-size:var(--t-13)">Answer every question to finish.</p>`}
  </div>`;
};

/* ---- mentor: certificate ----------------------------------------------- */
V.certificate = ({ a: id }) => {
  const c = course(id);
  if (!c || !S.certified.includes(c.id)) return V.train();
  const m = DATA.mentor;
  const d = new Date(2026, 8, 12);
  const dateStr = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  return `
  <div class="pad">
    <div class="cert">
      <div style="display:flex;justify-content:center;margin-bottom:10px">${mark(44)}</div>
      <div class="cert__eyebrow">Certificate of competency</div>
      <div class="cert__name">${esc(m.name)} ${esc(m.surname)}</div>
      <div class="cert__course">${esc(c.title)}</div>
      <div class="cert__rule"></div>
      <div class="cert__grid">
        <div><div class="cert__k">Issued by</div><div class="cert__v">${esc(c.by)}</div></div>
        <div><div class="cert__k">Date</div><div class="cert__v">${dateStr}</div></div>
        <div><div class="cert__k">Mentor ID</div><div class="cert__v tnum">${esc(m.mentorId)}</div></div>
        <div><div class="cert__k">Valid until</div><div class="cert__v">September 2028</div></div>
      </div>
    </div>

    <div class="callout callout--key">
      <div class="callout__t">${ic('shield', 14, 2.2)}What this certifies</div>
      Nurse Anong has confirmed you can ${esc(c.outcome.charAt(0).toLowerCase() + c.outcome.slice(1))} It does not authorise you to diagnose, to advise on medication, or to act in an emergency beyond calling for help.
    </div>

    <div class="stack stack--sm">
      <button class="btn btn--primary btn--block" data-act="save-cert" data-id="${c.id}">
        ${ic('check', 18, 2.4)} Save to my profile</button>
      <button class="btn btn--ghost btn--block" data-act="nav" data-to="#/train">
        ${ic('book', 18, 2.1)} Back to the academy</button>
    </div>
  </div>`;
};

/* ---- mentor: circle ---------------------------------------------------- */
V.circle = ({ a: seg }) => {
  const tab = seg || 'need';
  const mine = DATA.seniors.filter(s => S.circle.includes(s.id));
  const others = DATA.seniors.filter(s => !S.circle.includes(s.id));
  return `
  <div class="pad">
    <div class="roles" style="gap:5px">
      <button aria-selected="${tab === 'need'}" data-act="nav" data-to="#/circle/need">Needs support</button>
      <button aria-selected="${tab === 'mine'}" data-act="nav" data-to="#/circle/mine">My circle</button>
      <button aria-selected="${tab === 'act'}" data-act="nav" data-to="#/circle/act">Activities</button>
    </div>

    ${tab === 'need' ? `
      <p class="muted" style="font-size:var(--t-13);margin-top:-4px">
        ${others.length === 1
          ? '1 older adult within 2 km has asked for a trained visitor.'
          : `${others.length} older adults within 2 km have asked for a trained visitor.`}
      </p>
      <div class="stack">
        ${others.map(s => `
        <div class="card card--pad">
          <div style="display:flex;gap:13px;align-items:flex-start">
            ${av(s, 48)}
            <div style="flex:1;min-width:0">
              <div class="row__t">${esc(s.name)}, ${s.age}</div>
              <div class="row__s">${esc(s.area)}</div>
            </div>
            <span class="chip chip--brand">${s.interest}% match</span>
          </div>
          <div class="chips" style="margin-top:12px">
            ${s.needs.slice(0, 3).map(n => chip(n)).join('')}
          </div>
          <div class="stack stack--sm" style="margin-top:13px">
            <button class="btn btn--soft btn--block" data-act="offer" data-id="${s.id}">
              ${ic('users', 18, 2.1)} Offer to support ${esc(s.name.split(' ').slice(-1)[0])}</button>
          </div>
        </div>`).join('')}
      </div>`
    : tab === 'mine' ? `
      <div class="card">
        ${mine.map(s => row({
          icon: 'user', title: `${esc(s.name)}, ${s.age}`,
          sub: `${esc(s.area)} · next visit ${esc(s.nextDue.toLowerCase())}`,
          act: 'nav', data: `data-to="#/senior/${s.id}"`,
        })).join('')}
      </div>
      <div class="callout callout--key">
        <div class="callout__t">${ic('info', 14, 2.2)}Your caseload</div>
        Four to six neighbours is the recommended maximum. Beyond that, visits become rushed and the early signals get missed.
      </div>`
    : `
      <p class="muted" style="font-size:var(--t-13);margin-top:-4px">Groups you can join or lead. Attendance is logged like any other record.</p>
      <div class="stack">
        ${DATA.activities.map(a => {
          const joined = S.joined.includes(a.id);
          const doneSessions = S.sessions.filter(x => x.activityId === a.id && x.completed).length;
          return `
          <div class="card card--pad">
            <div class="act" style="padding:0">
              <span class="act__date"><b>${esc(a.day.split(' ')[0].slice(0, 3))}</b><span>${esc(a.time.split(' ')[0])}</span></span>
              <span style="flex:1;min-width:0">
                <span class="row__t">${esc(a.title)}</span>
                <span class="row__s">${esc(a.place)}<br>${esc(a.day)} · ${esc(a.time)}</span>
              </span>
            </div>
            <div class="row-between" style="margin-top:13px">
              <span class="act__stack">
                ${a.attendees.slice(0, 4).map(id => { const s = senior(id); return s ? av(s, 40) : ''; }).join('')}
                ${a.attendees.length > 4 ? `<span class="av av--40" style="background:var(--canvas-2);color:var(--ink-600)">+${a.attendees.length - 4}</span>` : ''}
              </span>
              <span class="course__meta">${ic('users', 13, 2.2)}${a.attendees.length}/${a.capacity}</span>
            </div>
            ${doneSessions ? `<div class="chip chip--good" style="margin-top:11px">${ic('check', 12, 3)}${doneSessions} session${doneSessions > 1 ? 's' : ''} led</div>` : ''}
            <div class="stack stack--sm" style="margin-top:12px">
              ${joined
                ? `<button class="btn btn--primary btn--block" data-act="nav" data-to="#/session/${a.id}">${ic('play', 17, 2.1)} Start today's session</button>
                   <button class="btn btn--ghost btn--block" data-act="leave" data-id="${a.id}">Leave group</button>`
                : `<button class="btn btn--soft btn--block" data-act="join" data-id="${a.id}">${ic('plus', 18, 2.3)} Join this group</button>`}
            </div>
          </div>`;
        }).join('')}
      </div>`}
  </div>`;
};

/* ---- mentor: senior detail --------------------------------------------- */
V.senior = ({ a: id }) => {
  const s = senior(id);
  if (!s) return V.circle({});
  const mine = S.circle.includes(s.id);
  const myChecks = S.checkins.filter(c => c.seniorId === s.id);
  const hist = [...myChecks.map(c => ({
    d: c.date, sys: c.sys, dia: c.dia, pulse: c.pulse, tone: c.level, note: c.note || 'No note left.',
  })), ...s.history];
  const cases = S.cases.filter(c => c.seniorId === s.id);

  return `
  <div class="pad">
    <div class="card card--pad">
      <div style="display:flex;gap:14px;align-items:flex-start">
        ${avWrap(s, 72, mine)}
        <div style="flex:1;min-width:0">
          <div style="font-size:var(--t-22);font-weight:700;letter-spacing:-.02em">${esc(s.name)}, ${s.age}</div>
          <div class="row__s">${esc(s.area)}</div>
          <div class="chips" style="margin-top:9px">
            ${s.livesAlone ? chip('Lives alone') : chip('Lives with family')}
            ${mine ? chip('In your circle', 'good', 'check') : chip('Not yet assigned', 'warn')}
          </div>
        </div>
      </div>
      <p class="row__s" style="margin-top:14px;line-height:1.55">${esc(s.notes)}</p>
    </div>

    ${sectionHead('What they need')}
    <div class="card">${s.needs.map(n => row({ icon: 'check-circle', title: esc(n), chev: false, tag: 'div' })).join('')}</div>

    ${sectionHead('Health notes')}
    <div class="chips">${s.conditions.map(c => chip(c, 'info')).join('')}</div>

    ${cases.length ? `
    ${sectionHead('Raised to the nurse')}
    <div class="stack stack--sm">
      ${cases.map(c => `
      <div class="card card--pad" style="border-left:3px solid var(--${c.status === 'open' ? (c.severity === 'crit' ? 'crit-500' : 'warn-500') : 'good-500'})">
        <div class="row-between">
          <span class="chip chip--${c.status === 'open' ? c.severity : 'good'}">
            ${ic(c.status === 'open' ? 'alert' : 'check', 12, 2.6)}${c.status === 'open' ? 'With the nurse' : 'Answered'}</span>
          <span class="row__s" style="margin:0">${esc(c.raised)}</span>
        </div>
        <div class="row__t" style="margin-top:9px;font-size:var(--t-14)">${esc(c.reason)}</div>
        ${c.action ? `<div class="callout callout--key" style="margin-top:11px">
          <div class="callout__t">${ic('stethoscope', 14, 2.2)}Nurse Anong</div>${esc(c.action)}</div>`
          : `<div class="row__s" style="margin-top:6px">Waiting for the nurse to review.</div>`}
      </div>`).join('')}
    </div>` : ''}

    ${sectionHead('Visit history', hist.length ? `${hist.length} recorded` : '')}
    ${hist.length ? `<div class="card card--pad"><div class="tl">
      ${hist.map(v => `
      <div class="tl__i">
        <span class="tl__dot tl__dot--${v.tone === 'good' ? 'good' : v.tone === 'warn' ? 'warn' : 'crit'}">
          ${ic(v.tone === 'good' ? 'check' : 'alert', 15, 2.6)}</span>
        <span>
          <span class="tl__t">${esc(v.d)} · ${v.sys}/${v.dia} · pulse ${v.pulse}</span>
          <span class="tl__s">${esc(v.note)}</span>
        </span>
      </div>`).join('')}
    </div></div>` : `<div class="card"><div class="empty">
      <div class="empty__ic">${ic('clipboard', 26)}</div>
      <div class="empty__t">No visits recorded yet</div>
      <div class="empty__s">Your first check-in will start the history for ${esc(s.name)}. A single reading says little — a trend is what the nurse needs.</div>
    </div></div>`}

    <div class="stack stack--sm">
      ${mine ? `<button class="btn btn--primary btn--block" data-act="nav" data-to="#/checkin/${s.id}">
        ${ic('clipboard', 18, 2.1)} Log a check-in</button>` : ''}
      <button class="btn btn--ghost btn--block" data-act="call" data-id="${s.id}">
        ${ic('phone', 18, 2.1)} Call ${esc(s.name)}</button>
      ${mine ? `<button class="btn btn--ghost btn--block" data-act="remove" data-id="${s.id}">
        ${ic('x', 18, 2.2)} Remove from my circle</button>` : ''}
    </div>
  </div>`;
};

/* ---- mentor: check-in form --------------------------------------------- */
V.checkin = ({ a: id }) => {
  if (!draft || draft.seniorId !== id) draft = newDraft(id);
  const s = senior(id);
  const d = draft;
  const steps = ['Vital signs', 'Wellbeing', 'Medication & safety', 'Notes'];
  const pct = ((d.step + 1) / steps.length) * 100;

  const yn = (field, opts) => `
    <div class="opt-${opts.length === 2 ? '2' : '3'}">
      ${opts.map(o => `<button class="pick ${o.tone ? 'is-' + o.tone : ''}" aria-pressed="${d[field] === o.v}"
        data-act="ci-set" data-field="${field}" data-value="${o.v}">${esc(o.label)}</button>`).join('')}
    </div>`;

  let body = '';
  if (d.step === 0) {
    body = `
      <div class="card card--pad">
        <div class="field" style="margin-bottom:18px">
          <div class="field__label">Systolic — the top number</div>
          <div class="stepper">
            <button data-act="ci-bp" data-field="sys" data-op="-1" aria-label="Lower systolic">${ic('chev-down', 20, 2.4)}</button>
            <input class="input input--num" type="number" inputmode="numeric" value="${d.sys}" readonly aria-label="Systolic">
            <button data-act="ci-bp" data-field="sys" data-op="1" aria-label="Raise systolic">${ic('chev-right', 20, 2.4)}</button>
          </div>
        </div>
        <div class="field" style="margin-bottom:18px">
          <div class="field__label">Diastolic — the bottom number</div>
          <div class="stepper">
            <button data-act="ci-bp" data-field="dia" data-op="-1" aria-label="Lower diastolic">${ic('chev-down', 20, 2.4)}</button>
            <input class="input input--num" type="number" inputmode="numeric" value="${d.dia}" readonly aria-label="Diastolic">
            <button data-act="ci-bp" data-field="dia" data-op="1" aria-label="Raise diastolic">${ic('chev-right', 20, 2.4)}</button>
          </div>
        </div>
        <div class="field">
          <div class="field__label">Pulse, beats per minute</div>
          <div class="stepper">
            <button data-act="ci-bp" data-field="pulse" data-op="-1" aria-label="Lower pulse">${ic('chev-down', 20, 2.4)}</button>
            <input class="input input--num" type="number" inputmode="numeric" value="${d.pulse}" readonly aria-label="Pulse">
            <button data-act="ci-bp" data-field="pulse" data-op="1" aria-label="Raise pulse">${ic('chev-right', 20, 2.4)}</button>
          </div>
        </div>
      </div>
      <div class="callout callout--key">
        <div class="callout__t">${ic('info', 14, 2.2)}Before you record</div>
        Both feet flat, back supported, arm resting at heart level on a bare arm. Five minutes of quiet rest first, and no talking during the reading.
      </div>`;
  } else if (d.step === 1) {
    body = `
      <div class="card card--pad stack" style="gap:20px">
        <div class="field">
          <div class="field__label">How has their mood been?</div>
          <div class="field__hint">Ask openly. "How have the mornings been?" works better than "Are you okay?"</div>
          ${yn('mood', [{ v: 'good', label: 'Bright', tone: 'good' }, { v: 'flat', label: 'Flat' }, { v: 'low', label: 'Low', tone: 'warn' }])}
        </div>
        <div class="field">
          <div class="field__label">Appetite and eating</div>
          ${yn('appetite', [{ v: 'good', label: 'Eating well', tone: 'good' }, { v: 'fair', label: 'Fair' }, { v: 'poor', label: 'Poor', tone: 'warn' }])}
        </div>
        <div class="field">
          <div class="field__label">Sleep</div>
          ${yn('sleep', [{ v: 'good', label: 'Sleeping well', tone: 'good' }, { v: 'broken', label: 'Broken' }, { v: 'poor', label: 'Barely sleeping', tone: 'warn' }])}
        </div>
      </div>`;
  } else if (d.step === 2) {
    body = `
      <div class="card card--pad stack" style="gap:20px">
        <div class="field">
          <div class="field__label">Have they taken their medication as prescribed?</div>
          <div class="field__hint">Check the pill organiser rather than asking. People often say yes to be polite.</div>
          ${yn('meds', [{ v: 'yes', label: 'Yes', tone: 'good' }, { v: 'partly', label: 'Some doses missed', tone: 'warn' }, { v: 'no', label: 'No', tone: 'warn' }])}
        </div>
        <div class="field">
          <div class="field__label">Any dizziness when standing up?</div>
          <div class="field__hint">Ask them to stand and watch. Dizziness on standing is a leading cause of falls.</div>
          ${yn('dizzy', [{ v: 'no', label: 'No', tone: 'good' }, { v: 'yes', label: 'Yes', tone: 'crit' }])}
        </div>
        <div class="field">
          <div class="field__label">Has there been a fall since your last visit?</div>
          ${yn('fallen', [{ v: 'no', label: 'No', tone: 'good' }, { v: 'yes', label: 'Yes', tone: 'crit' }])}
        </div>
        <div class="field">
          <div class="field__label">Does the home look safe to walk through?</div>
          <div class="field__hint">Loose rugs, cables across a path, the route to the toilet at night.</div>
          ${yn('homeSafe', [{ v: 'yes', label: 'Yes', tone: 'good' }, { v: 'no', label: 'No — hazards', tone: 'warn' }])}
        </div>
      </div>`;
  } else {
    const t = triage(d);
    body = `
      <div class="card card--pad">
        <div class="field">
          <div class="field__label">Anything else you noticed?</div>
          <div class="field__hint">Write what you saw and what they said. Do not write what you think it means — the nurse will decide that.</div>
          <textarea class="input" rows="4" style="padding:13px 15px;height:auto;font-weight:400;resize:vertical"
            data-act="ci-note" placeholder="e.g. Said the tablets make her dizzy in the morning. Ate only rice at lunch.">${esc(d.note)}</textarea>
        </div>
      </div>
      <div class="card card--pad">
        <div class="row__t" style="margin-bottom:12px">Summary</div>
        <div class="vitals">
          <div class="vital ${d.sys >= 160 || d.dia >= 100 ? 'vital--crit' : d.sys >= 140 || d.dia >= 90 ? 'vital--warn' : 'vital--good'}">
            <b>${d.sys}/${d.dia}</b><span>blood pressure</span></div>
          <div class="vital"><b>${d.pulse}</b><span>pulse</span></div>
          <div class="vital ${t.level === 'good' ? 'vital--good' : t.level === 'warn' ? 'vital--warn' : 'vital--crit'}">
            <b>${t.flags.length}</b><span>flag${t.flags.length === 1 ? '' : 's'}</span></div>
        </div>
        ${t.flags.length ? `<div class="chips" style="margin-top:13px">
          ${t.flags.map(f => chip(f[0], f[1] === 'crit' ? 'crit' : 'warn', 'alert')).join('')}</div>`
          : `<div class="callout callout--key" style="margin-top:13px">
              <div class="callout__t">${ic('check-circle', 14, 2.2)}Nothing flagged</div>
              This visit sits inside the clinic's normal range. It will be filed as a routine check-in.</div>`}
      </div>`;
  }

  return `
  <div class="pad">
    <div class="card card--pad" style="display:flex;gap:12px;align-items:center;padding:13px 15px">
      ${av(s, 48)}
      <div style="flex:1;min-width:0">
        <div class="row__t">${esc(s.name)}, ${s.age}</div>
        <div class="row__s">${esc(s.area)}</div>
      </div>
    </div>

    <div>
      <div class="row-between" style="margin-bottom:7px">
        <span class="row__s" style="margin:0">Step ${d.step + 1} of ${steps.length} · ${esc(steps[d.step])}</span>
        <span class="row__s" style="margin:0">${Math.round(pct)}%</span>
      </div>
      <div class="bar"><span class="bar__f" style="width:${pct}%"></span></div>
    </div>

    ${body}

    <div class="stack stack--sm">
      ${d.step === steps.length - 1
        ? `<button class="btn btn--primary btn--block" data-act="submit-checkin">${ic('check', 19, 2.4)} Save check-in</button>`
        : `<button class="btn btn--primary btn--block" data-act="ci-next">Continue ${ic('arrow-right', 18, 2.2)}</button>`}
      ${d.step > 0 ? `<button class="btn btn--ghost btn--block" data-act="ci-prev">${ic('chev-left', 18, 2.2)} Back</button>` : ''}
    </div>
  </div>`;
};

/* ---- mentor: check-in result ------------------------------------------- */
V.result = ({ a: id }) => {
  const rec = S.checkins.filter(c => c.seniorId === id).slice(-1)[0];
  if (!rec) return V.circle({});
  const s = senior(id);
  const tone = rec.level;
  const head = tone === 'good' ? 'All within range'
    : tone === 'warn' ? 'Worth watching' : 'Needs a nurse today';
  const sub = tone === 'good'
    ? `Filed as a routine check-in. Next visit in seven days.`
    : tone === 'warn'
      ? `Recorded and sent to Nurse Anong for review. Nothing needs to happen tonight.`
      : `Nurse Anong has been alerted. She will decide what happens next.`;

  return `
  <div class="pad">
    <div class="triage triage--${tone}">
      <div class="triage__ic">${ic(tone === 'good' ? 'check' : 'alert', 26, 2.4)}</div>
      <div class="triage__t">${esc(head)}</div>
      <div class="triage__s">${esc(sub)}</div>
      ${rec.flags.length ? `<ul class="triage__list">
        ${rec.flags.map(f => `<li>${ic('alert', 15, 2.4)}<span>${esc(f[0])}</span></li>`).join('')}
      </ul>` : ''}
    </div>

    <div class="card card--pad" style="display:flex;gap:13px;align-items:center">
      ${av(s, 48)}
      <div style="flex:1;min-width:0">
        <div class="row__t">${esc(s.name)}, ${s.age}</div>
        <div class="row__s">Checked at ${esc(rec.time)} · ${esc(rec.date)}</div>
      </div>
    </div>

    <div class="vitals">
      <div class="vital ${rec.sys >= 160 ? 'vital--crit' : rec.sys >= 140 ? 'vital--warn' : 'vital--good'}">
        <b>${rec.sys}/${rec.dia}</b><span>blood pressure</span></div>
      <div class="vital"><b>${rec.pulse}</b><span>pulse</span></div>
      <div class="vital"><b>${rec.flags.length}</b><span>flags raised</span></div>
    </div>

    ${rec.note ? `<div class="card card--pad">
      <div class="row__s" style="margin:0 0 6px">Your note</div>
      <div style="font-size:var(--t-14);line-height:1.55">${esc(rec.note)}</div>
    </div>` : ''}

    ${tone !== 'good' && !rec.escalated ? `
      <button class="btn btn--danger btn--block" data-act="escalate" data-id="${rec.id}">
        ${ic('send', 18, 2.2)} Send this to Nurse Anong</button>` : ''}

    ${rec.escalated ? `
      <div class="callout callout--key">
        <div class="callout__t">${ic('check-circle', 14, 2.2)}Sent to Nurse Anong</div>
        She has it in her inbox now. You will be told what she decides. You do not need to do anything else.
      </div>
      <button class="btn btn--ghost btn--block" data-act="switch-role" data-role="nurse">
        ${ic('eye', 18, 2.1)} See it arrive in the nurse's inbox</button>` : ''}

    <div class="stack stack--sm">
      <button class="btn btn--ghost btn--block" data-act="nav" data-to="#/senior/${s.id}">View ${esc(s.name)}'s history</button>
      <button class="btn btn--ghost btn--block" data-act="nav" data-to="#/home">Back to home</button>
    </div>

    ${tone === 'good' ? `<div class="callout callout--key">
      <div class="callout__t">${ic('trend', 14, 2.2)}Why this matters</div>
      A routine visit that finds nothing is not wasted. It is the record that shows the nurse which neighbours are stable — so the ones that are not get her attention faster.
    </div>` : ''}
  </div>`;
};

/* ---- mentor: activity detail ------------------------------------------- */
V.activity = ({ a: id }) => {
  const a = activity(id);
  if (!a) return V.circle({});
  const joined = S.joined.includes(a.id);
  const doneSessions = S.sessions.filter(x => x.activityId === a.id && x.completed);
  const group = a.attendees.map(senior).filter(Boolean);

  return `
  <div class="pad">
    <div class="card course">
      <div class="course__cover ${a.kind === 'Exercise' ? 'cv-4' : a.kind === 'Social' ? 'cv-3' : 'cv-2'}">
        ${ic(a.icon, 34, 1.7)}
        <span class="course__t" style="color:#fff;font-size:var(--t-19);max-width:76%">${esc(a.title)}</span>
      </div>
      <div class="course__body">
        <div class="chip-row chips">
          ${chip(a.kind)}${chip(a.day)}${chip(a.time)}
        </div>
        <div class="course__meta" style="margin-top:2px">${ic('map-pin', 13, 2.2)}${esc(a.place)}</div>
        <div class="course__meta">${ic('user', 13, 2.2)}Led by ${esc(a.lead)}</div>
      </div>
    </div>

    <div class="callout callout--key">
      <div class="callout__t">${ic('info', 14, 2.2)}About this group</div>
      ${esc(a.note)}
    </div>

    ${joined ? `<div class="callout callout--warn">
      <div class="callout__t">${ic('alert', 14, 2.2)}Before you lead</div>
      Count heads at the start, at the halfway point and at the end. Put someone at the back so nobody walks alone.
    </div>` : ''}

    ${sectionHead('Who comes', `${group.length} regular${group.length === 1 ? '' : 's'}`)}
    <div class="card">
      ${group.map(s => row({
        title: `${esc(s.name)}, ${s.age}`,
        sub: esc(s.needs[0]),
        chev: true, act: 'nav', data: `data-to="#/senior/${s.id}"`,
        icon: 'user',
      })).join('')}
    </div>

    ${doneSessions.length ? `
    ${sectionHead('Sessions you have led', `${doneSessions.length}`)}
    <div class="card card--pad"><div class="tl">
      ${doneSessions.map(s => `
      <div class="tl__i">
        <span class="tl__dot tl__dot--good">${ic('check', 15, 2.6)}</span>
        <span><span class="tl__t">${esc(s.date)} · ${esc(s.time)}</span>
        <span class="tl__s">${s.present.length} attended · ${s.hours} mentor hour${s.hours === 1 ? '' : 's'} logged</span></span>
      </div>`).join('')}
    </div></div>` : ''}

    <div class="stack stack--sm">
      ${joined
        ? `<button class="btn btn--primary btn--block" data-act="nav" data-to="#/session/${a.id}">
            ${ic('play', 17, 2.1)} Start today's session</button>
           <button class="btn btn--ghost btn--block" data-act="leave" data-id="${a.id}">
            ${ic('x', 18, 2.2)} Leave this group</button>`
        : `<button class="btn btn--soft btn--block" data-act="join" data-id="${a.id}">
            ${ic('plus', 18, 2.3)} Join this group</button>`}
      <button class="btn btn--ghost btn--block" data-act="nav" data-to="#/circle/act">
        All activities</button>
    </div>
  </div>`;
};

/* ---- mentor: activity session ------------------------------------------ */
V.session = ({ a: id }) => {
  const a = activity(id);
  if (!a) return V.circle({});
  // a session exists as soon as anyone is ticked off; only completing it counts
  const s = S.sessions.filter(x => x.activityId === a.id).slice(-1)[0];
  const done = !!(s && s.completed);
  const present = s ? s.present : a.attendees;
  return `
  <div class="pad">
    <div class="card card--pad">
      <div class="row__t" style="font-size:var(--t-19)">${esc(a.title)}</div>
      <div class="row__s">${esc(a.day)} · ${esc(a.time)}<br>${esc(a.place)}</div>
    </div>

    <div class="callout callout--warn">
      <div class="callout__t">${ic('alert', 14, 2.2)}Before anyone sets off</div>
      Count heads at the start, at the halfway point and at the end. Put someone at the back so nobody walks alone. Carry water and a phone.
    </div>

    ${sectionHead('Attendance', `${present.length} present`)}
    <div class="card">
      ${a.attendees.map((sid, i) => {
        const p = senior(sid);
        if (!p) return '';
        const on = present.includes(sid);
        return `
        <button class="att" aria-pressed="${on}" data-act="toggle-att" data-id="${a.id}" data-sid="${sid}">
          ${av(p, 40)}
          <span class="row__b">
            <span class="row__t">${esc(p.name)}, ${p.age}</span>
            <span class="row__s">${on ? 'Present' : 'Not here yet'}</span>
          </span>
          <span class="att__box">${ic('check', 17, 3)}</span>
        </button>`;
      }).join('')}
    </div>

    ${done ? `<div class="callout callout--key">
      <div class="callout__t">${ic('check-circle', 14, 2.2)}Session completed</div>
      Logged at ${esc(s.time)} · ${s.present.length} attended · ${s.hours} mentor hour${s.hours === 1 ? '' : 's'} added to your record.
    </div>` : `
    <button class="btn btn--primary btn--block" data-act="complete-session" data-id="${a.id}">
      ${ic('check', 19, 2.4)} Complete session</button>`}

    <button class="btn btn--ghost btn--block" data-act="nav" data-to="#/circle/act">All activities</button>
  </div>`;
};

/* ---- mentor: impact ---------------------------------------------------- */
V.impact = () => {
  const w = S.hours.weeks;
  // axis top is a multiple of three so every tick is a whole number
  const axisMax = Math.max(3, Math.ceil((Math.max(...w, 1) * 1.15) / 3) * 3);
  const total = w.reduce((a, b) => a + b, 0);
  const escalated = S.cases.filter(c => c.raisedByMentor).length;
  const handled = Math.max(0, S.checkins.length - escalated);
  const splitTotal = Math.max(1, handled + escalated);

  return `
  <div class="pad">
    <div class="card">
      <div class="hero-fig">
        <b class="tnum">${num(Math.round(S.counters.hours))}</b>
        <span>professional hours freed across ${esc(DATA.district.name)}</span>
        <em>since the network began in March 2026</em>
      </div>
    </div>

    <div class="tiles">
      <div class="tile">
        <div class="tile__k">Trained mentors</div>
        <div class="tile__v tnum">${num(S.counters.mentors)}</div>
        <div class="tile__d tile__d--up">${ic('trend', 12, 2.4)}+12 this month</div>
      </div>
      <div class="tile">
        <div class="tile__k">Check-ins logged</div>
        <div class="tile__v tnum">${num(S.counters.checkins)}</div>
        <div class="tile__d tile__d--up">${ic('trend', 12, 2.4)}+248 this month</div>
      </div>
      <div class="tile">
        <div class="tile__k">Early flags raised</div>
        <div class="tile__v tnum">${num(S.counters.flags)}</div>
        <div class="tile__d">caught before a clinic visit</div>
      </div>
      <div class="tile">
        <div class="tile__k">Mentor hours given</div>
        <div class="tile__v tnum">${num(Math.round(DATA.district.checkins * 0.4))}</div>
        <div class="tile__d">by volunteers, unpaid</div>
      </div>
    </div>

    <div class="card chart">
      <div class="chart__head">
        <div>
          <div class="chart__t">Your mentoring hours</div>
          <div class="chart__s">Last 8 weeks · ${oneDp(total)} hours in total</div>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:24px 1fr;gap:8px">
        <div style="display:flex;flex-direction:column;justify-content:space-between;height:132px;font-size:var(--t-11);color:var(--ink-400);text-align:right;font-variant-numeric:tabular-nums">
          <span>${axisMax}</span><span>${axisMax * 2 / 3}</span><span>${axisMax / 3}</span><span>0</span>
        </div>
        <div>
          <div class="chart__plot">
            <div class="chart__grid"><i></i><i></i><i></i><i></i></div>
            <div class="chart__cols">
              ${w.map((v, i) => `
              <div class="col ${i === w.length - 1 ? 'col--now' : ''}">
                ${i === w.length - 1 ? `<span class="col__v">${oneDp(v)}</span>` : ''}
                <span class="col__bar" style="height:${(v / axisMax) * 100}%"></span>
              </div>`).join('')}
            </div>
          </div>
          <div class="chart__axis">
            ${w.map((_, i) => `<span>W${i + 1}</span>`).join('')}
          </div>
        </div>
      </div>
      <details style="margin-top:6px">
        <summary class="chart__toggle">View as a table</summary>
        <table class="tbl">
          <caption class="sr">Mentoring hours by week</caption>
          <thead><tr><th scope="col">Week</th><th scope="col">Hours</th></tr></thead>
          <tbody>${w.map((v, i) => `<tr><td>Week ${i + 1}</td><td>${oneDp(v)}</td></tr>`).join('')}</tbody>
        </table>
      </details>
    </div>

    <div class="card card--pad">
      <div class="chart__t">Where the flags went</div>
      <div class="chart__s" style="margin-bottom:13px">Every flag you raise is triaged by a nurse. Most never need her to leave her desk.</div>
      <div class="split">
        <span class="split__a" style="flex:${handled || 0.001}"></span>
        <span class="split__b" style="flex:${escalated || 0.001}"></span>
      </div>
      <div class="legend">
        <span class="legend__i"><i class="legend__k legend__k--a"></i>Handled by a mentor (${handled})</span>
        <span class="legend__i"><i class="legend__k legend__k--b"></i>Escalated to a nurse (${escalated})</span>
      </div>
      ${S.checkins.length === 0 ? `<div class="row__s" style="margin-top:12px">Log a check-in and this chart fills in with your own numbers.</div>` : ''}
    </div>

    <div class="card card--pad">
      <div class="row__t" style="margin-bottom:11px">What one flag can change</div>
      <div class="tl">
        <div class="tl__i"><span class="tl__dot tl__dot--brand">${ic('eye', 15, 2.4)}</span>
          <span><span class="tl__t">A neighbour notices</span>
          <span class="tl__s">A dizzy spell on standing, mentioned in passing over tea. Not a reason to book an appointment.</span></span></div>
        <div class="tl__i"><span class="tl__dot tl__dot--warn">${ic('clipboard', 15, 2.4)}</span>
          <span><span class="tl__t">It becomes a record</span>
          <span class="tl__s">Three of those over five weeks is a pattern. The app keeps the pattern, not just the moment.</span></span></div>
        <div class="tl__i"><span class="tl__dot tl__dot--crit">${ic('send', 15, 2.4)}</span>
          <span><span class="tl__t">The nurse sees it the same day</span>
          <span class="tl__s">A medication review, done from a desk in ten minutes.</span></span></div>
        <div class="tl__i"><span class="tl__dot tl__dot--good">${ic('check', 15, 2.6)}</span>
          <span><span class="tl__t">A fall does not happen</span>
          <span class="tl__s">The hip is never broken, the hospital bed is never used, and the independence is never lost.</span></span></div>
      </div>
    </div>
  </div>`;
};

/* ---- mentor: profile --------------------------------------------------- */
V.profile = () => {
  const m = DATA.mentor;
  return `
  <div class="pad">
    <div class="card card--pad">
      <div style="display:flex;gap:15px;align-items:flex-start">
        ${avWrap(m, 72, S.certified.length > 0)}
        <div style="flex:1;min-width:0">
          <div style="font-size:var(--t-22);font-weight:700;letter-spacing:-.02em">${esc(m.name)} ${esc(m.surname)}</div>
          <div class="row__s">${esc(m.age)} · ${esc(m.district)}</div>
          <div class="chips" style="margin-top:9px">
            ${S.certified.length ? chip('Certified mentor', 'good', 'shield') : chip('Trainee', 'warn', 'clock')}
            ${chip(`Since ${esc(m.since)}`)}
          </div>
        </div>
      </div>
      <div class="row__s" style="margin-top:14px">${esc(m.former)} · speaks ${esc(m.languages)}</div>
      <div class="card card--flat" style="margin-top:13px;padding:12px 14px;background:var(--canvas)">
        <div class="row-between"><span class="row__s" style="margin:0">Mentor ID</span><span class="row__t tnum" style="font-size:var(--t-14)">${esc(m.mentorId)}</span></div>
      </div>
    </div>

    ${sectionHead('Credentials', `${S.certified.length} of ${DATA.courses.length}`)}
    ${S.certified.length ? `<div class="card">
      ${S.certified.map(id => { const c = course(id); return c ? row({
        icon: 'award', tone: 'good', title: esc(c.title),
        sub: `Issued by ${esc(c.by)} · September 2026`,
        act: 'nav', data: `data-to="#/certificate/${c.id}"`,
      }) : ''; }).join('')}
    </div>`
    : `<div class="card"><div class="empty">
        <div class="empty__ic">${ic('award', 26)}</div>
        <div class="empty__t">No certificates yet</div>
        <div class="empty__s">Finish a module in the academy and your certificate appears here, with the name of the clinician who signed it off.</div>
        <button class="btn btn--primary" style="margin-top:15px" data-act="nav" data-to="#/train">Open the academy</button>
      </div></div>`}

    ${sectionHead('Availability')}
    <div class="chips">
      ${['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d =>
        chip(d, m.available.includes(d) ? 'brand' : '')).join('')}
    </div>

    ${sectionHead('Accessibility')}
    <div class="card card--pad">
      <div class="row__t" style="font-size:var(--t-14)">Text size</div>
      <div class="row__s" style="margin-bottom:11px">Most of the mentors in this network are over 65. Set this to whatever you can read comfortably.</div>
      <div class="opt-3">
        ${[{ v: 1, l: 'A' }, { v: 1.12, l: 'A+' }, { v: 1.25, l: 'A++' }].map(o =>
          `<button class="pick" aria-pressed="${S.fs === o.v}" data-act="set-fs" data-v="${o.v}">${o.l}</button>`).join('')}
      </div>
    </div>

    ${sectionHead('Emergency')}
    <div class="card card--pad" style="display:flex;gap:12px;align-items:center">
      <span class="row__ic row__ic--crit">${ic('phone', 21)}</span>
      <div style="flex:1"><div class="row__t" style="font-size:var(--t-14)">${esc(m.emergency)}</div>
      <div class="row__s">Told to the nurse before your first assignment</div></div>
    </div>

    ${sectionHead('Demo')}
    <div class="stack stack--sm">
      <button class="btn btn--ghost btn--block" data-act="switch-role" data-role="nurse">
        ${ic('stethoscope', 18, 2.1)} Switch to the health professional view</button>
      <button class="btn btn--ghost btn--block" data-act="reset">${ic('refresh', 18, 2.1)} Reset the demo</button>
    </div>
    <p class="muted center" style="font-size:var(--t-12);line-height:1.5">
      Everything you do here is stored in this browser only. Nothing is sent anywhere.
    </p>
  </div>`;
};

/* ---- nurse: inbox ------------------------------------------------------ */
V.nurse = () => {
  const open = S.cases.filter(c => c.status === 'open');
  const closed = S.cases.filter(c => c.status !== 'open');
  const crit = open.filter(c => c.severity === 'crit').length;
  const n = DATA.nurse;
  return `
  <div class="pad">
    <div class="hero" style="border-radius:var(--r-lg);padding:16px">
      <div class="hero__top">
        ${av(n, 48)}
        <div style="flex:1;min-width:0">
          <div class="hero__name" style="font-size:var(--t-19)">${esc(n.name)}</div>
          <div class="hero__meta"><span>${esc(n.site)}</span></div>
        </div>
      </div>
      <div class="hero__strip">
        <div class="hero__stat"><b class="tnum">${open.length}</b><span>awaiting triage</span></div>
        <div class="hero__stat"><b class="tnum">${n.mentorsSupervised}</b><span>mentors reporting</span></div>
        <div class="hero__stat"><b class="tnum">${num(Math.round(S.counters.hours))}</b><span>hours freed</span></div>
      </div>
    </div>

    ${crit ? `<div class="callout callout--crit">
      <div class="callout__t">${ic('alert', 14, 2.2)}${crit} urgent flag${crit > 1 ? 's' : ''}</div>
      Raised by a mentor in the last 24 hours. These sit at the top of the list.</div>` : ''}

    ${sectionHead('Awaiting triage', `${open.length} open`)}
    ${open.length ? `<div class="stack">
      ${open.sort((a, b) => (a.severity === 'crit' ? -1 : 1) - (b.severity === 'crit' ? -1 : 1)).map(c => {
        const s = senior(c.seniorId);
        return `
        <button class="card card--pad" data-act="nav" data-to="#/case/${c.id}" style="text-align:left;width:100%;border-left:3px solid var(--${c.severity === 'crit' ? 'crit-500' : 'warn-500'})">
          <div class="row-between">
            <span class="chip chip--${c.severity}">${ic('alert', 12, 2.6)}${c.severity === 'crit' ? 'Urgent' : 'Review'}</span>
            <span class="row__s" style="margin:0">${esc(c.raised)}</span>
          </div>
          <div class="row__t" style="margin-top:10px">${esc(s.name)}, ${s.age}</div>
          <div class="row__s">${esc(c.reason)}</div>
          <div class="row-between" style="margin-top:11px">
            <span class="course__meta">${ic('users', 13, 2.2)}Raised by ${esc(c.mentor)}</span>
            <span class="row__chev">${ic('chev-right', 19, 2.2)}</span>
          </div>
        </button>`;
      }).join('')}
    </div>` : `<div class="card"><div class="empty">
      <div class="empty__ic">${ic('check', 26)}</div>
      <div class="empty__t">Inbox clear</div>
      <div class="empty__s">Every flag raised by a mentor has been triaged. This is what the network buys you: an empty queue instead of an unseen one.</div>
    </div></div>`}

    ${closed.length ? `
    ${sectionHead('Recently closed')}
    <div class="card">
      ${closed.map(c => { const s = senior(c.seniorId); return row({
        icon: 'check-circle', tone: 'good', title: `${esc(s.name)} — ${esc(c.reason)}`,
        sub: `Closed · ${esc(c.action || 'resolved')}`, act: 'nav', data: `data-to="#/case/${c.id}"`,
      }); }).join('')}
    </div>` : ''}
  </div>`;
};

/* ---- nurse: case ------------------------------------------------------- */
V.case = ({ a: id }) => {
  const c = S.cases.find(x => x.id === id);
  if (!c) return V.nurse();
  const s = senior(c.seniorId);
  const mine = S.checkins.filter(x => x.seniorId === s.id);
  const hist = [...mine.map(x => ({ d: x.date, sys: x.sys, dia: x.dia, pulse: x.pulse, tone: x.level, note: x.note || 'No note left.' })), ...s.history];

  return `
  <div class="pad">
    <div class="card card--pad" style="border-left:3px solid var(--${c.status === 'open' ? (c.severity === 'crit' ? 'crit-500' : 'warn-500') : 'good-500'})">
      <div class="row-between">
        <span class="chip chip--${c.status === 'open' ? c.severity : 'good'}">
          ${ic(c.status === 'open' ? 'alert' : 'check', 12, 2.6)}${c.status === 'open' ? (c.severity === 'crit' ? 'Urgent' : 'For review') : 'Closed'}</span>
        <span class="row__s" style="margin:0">${esc(c.raised)}</span>
      </div>
      <div class="row__t" style="font-size:var(--t-19);margin-top:11px">${esc(c.reason)}</div>
      <div class="row__s">Raised by ${esc(c.mentor)}</div>
    </div>

    <div class="card card--pad" style="display:flex;gap:13px;align-items:center">
      ${av(s, 56)}
      <div style="flex:1;min-width:0">
        <div class="row__t">${esc(s.name)}, ${s.age}</div>
        <div class="row__s">${esc(s.area)} · ${s.livesAlone ? 'lives alone' : 'lives with family'}</div>
      </div>
    </div>

    <div class="vitals">
      <div class="vital ${c.vitals.sys >= 140 ? 'vital--warn' : ''}"><b>${c.vitals.sys}/${c.vitals.dia}</b><span>blood pressure</span></div>
      <div class="vital"><b>${c.vitals.pulse}</b><span>pulse</span></div>
      <div class="vital"><b>${s.conditions.length}</b><span>conditions</span></div>
    </div>

    <div class="card card--pad">
      <div class="row__s" style="margin:0 0 6px">The mentor's note</div>
      <div style="font-size:var(--t-14);line-height:1.55">${esc(c.detail)}</div>
    </div>

    <div class="card card--pad">
      <div class="row__s" style="margin:0 0 4px">Known conditions</div>
      <div class="chips">${s.conditions.map(x => chip(x, 'info')).join('')}</div>
    </div>

    ${hist.length ? `
    ${sectionHead('Recent readings', `${hist.length} on file`)}
    <div class="card card--pad"><div class="tl">
      ${hist.slice(0, 5).map(v => `
      <div class="tl__i">
        <span class="tl__dot tl__dot--${v.tone === 'good' ? 'good' : v.tone === 'warn' ? 'warn' : 'crit'}">${ic(v.tone === 'good' ? 'check' : 'alert', 15, 2.6)}</span>
        <span><span class="tl__t">${esc(v.d)} · ${v.sys}/${v.dia} · pulse ${v.pulse}</span>
        <span class="tl__s">${esc(v.note)}</span></span>
      </div>`).join('')}
    </div></div>` : ''}

    ${c.status === 'open' ? `
      ${sectionHead('Triage')}
      <div class="stack stack--sm">
        <button class="btn btn--primary btn--block" data-act="nurse-act" data-id="${c.id}" data-do="Booked a home visit for Thursday 10:00. Mentor asked to attend.">
          ${ic('calendar', 18, 2.1)} Book a home visit</button>
        <button class="btn btn--soft btn--block" data-act="nurse-act" data-id="${c.id}" data-do="Called today. Advised to continue current medication and recheck in three days.">
          ${ic('phone', 18, 2.1)} Call today</button>
        <button class="btn btn--ghost btn--block" data-act="nurse-act" data-id="${c.id}" data-do="Routine. Mentor to continue weekly check-ins and report any change.">
          ${ic('users', 18, 2.1)} Routine — the mentor manages this</button>
        <button class="btn btn--ghost btn--block" data-act="nurse-act" data-id="${c.id}" data-do="Referred to the doctor at the health centre for review this week.">
          ${ic('stethoscope', 18, 2.1)} Refer to the doctor</button>
      </div>
      <p class="muted center" style="font-size:var(--t-12);line-height:1.5">
        Whatever you choose is written straight back to the mentor's record for ${esc(s.name)}.
      </p>`
    : `
      <div class="callout callout--key">
        <div class="callout__t">${ic('check-circle', 14, 2.2)}Your decision</div>
        ${esc(c.action)}
      </div>
      <div class="callout callout--key" style="border-left-color:var(--good-500)">
        <div class="callout__t">${ic('trend', 14, 2.2)}Time spent</div>
        Nine minutes at a desk. The alternative was a home visit, or nothing at all until the next appointment.
      </div>`}
  </div>`;
};

/* ---- nurse: mentors ---------------------------------------------------- */
V.mentors = () => {
  const trained = [];
  S.certified.forEach(id => { const m = DATA.mentor; trained.push({ m, c: course(id) }); });
  const roster = [
    { name: 'Mrs. Somsri, 68', av: 'av--g1', certs: S.certified.length, hours: 46.5, visits: S.checkins.length, area: 'Bang Kapi', you: true, initials: 'ST' },
    { name: 'Uncle Chai, 71', av: 'av--g4', certs: 3, hours: 88, visits: 62, area: 'Bang Kapi', initials: 'UC' },
    { name: 'Auntie Malee, 72', av: 'av--g3', certs: 2, hours: 61, visits: 44, area: 'Bang Kapi', initials: 'ML' },
    { name: 'Khun Ratsami, 66', av: 'av--g5', certs: 4, hours: 112, visits: 91, area: 'Bang Kapi', initials: 'KR' },
    { name: 'Mr. Anan, 70', av: 'av--g2', certs: 1, hours: 18, visits: 11, area: 'Bang Kapi', initials: 'AA' },
    { name: 'Auntie Pailin, 69', av: 'av--g6', certs: 3, hours: 74, visits: 55, area: 'Bang Kapi', initials: 'PL' },
  ];
  return `
  <div class="pad">
    <div class="callout callout--key">
      <div class="callout__t">${ic('info', 14, 2.2)}One nurse, twenty-four trained seniors</div>
      The nurse keeps clinical authority. The mentors widen her reach. Nothing in this list is a substitute for her judgement — it is a substitute for her travel time.
    </div>

    ${sectionHead('Reporting to you', `${roster.length} of ${DATA.nurse.mentorsSupervised} shown`)}
    <div class="card">
      ${roster.map(r => `
      <div class="row" style="min-height:auto;padding:13px 16px">
        <span class="av av--40 ${r.av}" aria-hidden="true">${r.initials}</span>
        <span class="row__b">
          <span class="row__t">${esc(r.name)} ${r.you ? '<span class="chip chip--brand" style="margin-left:4px">You</span>' : ''}</span>
          <span class="row__s">${r.certs} certificate${r.certs === 1 ? '' : 's'} · ${r.hours} h given · ${r.visits} visits</span>
        </span>
      </div>`).join('')}
    </div>

    ${trained.length ? `
    ${sectionHead('Your credentials on file')}
    <div class="stack stack--sm">
      ${trained.map(t => `
      <div class="card card--pad" style="display:flex;gap:12px;align-items:center">
        <span class="row__ic row__ic--good">${ic('shield', 21)}</span>
        <div style="flex:1">
          <div class="row__t" style="font-size:var(--t-14)">${esc(t.c.title)}</div>
          <div class="row__s">Signed off against the clinic's standard</div>
        </div>
        <span class="chip chip--good">${ic('check', 12, 3)}Valid</span>
      </div>`).join('')}
    </div>` : ''}

    <div class="card card--pad">
      <div class="row__t" style="margin-bottom:11px">Where the hours go</div>
      <div class="stack stack--sm">
        ${[
          ['Visits and check-ins', 46],
          ['Group activity leadership', 28],
          ['Travel and follow-up calls', 15],
          ['Academy time', 11],
        ].map(([label, pct]) => `
        <div>
          <div class="row-between" style="margin-bottom:6px">
            <span class="row__s" style="margin:0">${esc(label)}</span>
            <span class="row__s" style="margin:0">${pct}%</span>
          </div>
          <div class="meter"><span class="meter__f" style="width:${pct}%"></span></div>
        </div>`).join('')}
      </div>
    </div>
  </div>`;
};

/* ---- nurse: impact ----------------------------------------------------- */
V.nurseImpact = () => `
  <div class="pad">
    <div class="card">
      <div class="hero-fig">
        <b class="tnum">${num(Math.round(S.counters.hours))}</b>
        <span>professional hours freed</span>
        <em>${esc(DATA.district.name)} · rolling 12 months</em>
      </div>
    </div>

    <div class="tiles">
      <div class="tile"><div class="tile__k">Mentors trained</div><div class="tile__v tnum">${num(S.counters.mentorsTrained)}</div><div class="tile__d tile__d--up">${ic('trend', 12, 2.4)}77% still active</div></div>
      <div class="tile"><div class="tile__k">Check-ins logged</div><div class="tile__v tnum">${num(S.counters.checkins)}</div><div class="tile__d">4.1 per mentor each month</div></div>
      <div class="tile"><div class="tile__k">Early flags</div><div class="tile__v tnum">${num(S.counters.flags)}</div><div class="tile__d tile__d--up">${ic('trend', 12, 2.4)}68% handled without a visit</div></div>
      <div class="tile"><div class="tile__k">Cost per check-in</div><div class="tile__v">฿0</div><div class="tile__d">volunteer time</div></div>
    </div>

    <div class="card card--pad">
      <div class="chart__t">What the equivalent would have cost</div>
      <div class="chart__s" style="margin-bottom:14px">If each of those check-ins had needed a professional home visit at ฿450.</div>
      <div class="row-between" style="align-items:baseline">
        <span class="row__s" style="margin:0">Home visits avoided</span>
        <span class="row__t tnum">${num(S.counters.checkins)}</span>
      </div>
      <div class="meter" style="margin-top:9px"><span class="meter__f" style="width:82%"></span></div>
      <div class="row-between" style="margin-top:14px;align-items:baseline">
        <span class="row__s" style="margin:0">Estimated saving</span>
        <span class="row__t tnum">฿${num(S.counters.checkins * 450)}</span>
      </div>
    </div>

    <div class="card card--pad">
      <div class="row__t" style="margin-bottom:11px">The argument in one line</div>
      <p style="font-size:var(--t-14);line-height:1.6;color:var(--ink-600)">
        A nurse in Bang Kapi can see roughly twenty patients a day. Three hundred trained seniors, each
        visiting four neighbours a month, add more than a thousand points of contact she could never
        have made herself — and they surface the cases that actually need her.
      </p>
    </div>

    <button class="btn btn--ghost btn--block" data-act="switch-role" data-role="mentor">
      ${ic('users', 18, 2.1)} Back to the mentor's view</button>
  </div>`;

/* ==========================================================================
   App shell render
   ========================================================================== */
function currentTab(route) {
  const head = route.head;
  if (NURSE_ROUTES.includes(head)) {
    return head === 'case' ? 'nurse' : head;
  }
  if (['train', 'course', 'lesson', 'quiz', 'certificate'].includes(head)) return 'train';
  if (['circle', 'senior', 'checkin', 'result', 'activity', 'session'].includes(head)) return 'circle';
  if (head === 'impact') return 'impact';
  if (head === 'profile') return 'profile';
  return 'home';
}

const TITLES = {
  home: 'Ha Koo Soong Wai', train: 'Mentor academy', circle: 'Your circle',
  impact: 'Impact', profile: 'Your profile', nurse: 'Mentor flags',
  mentors: 'Your mentors', 'nurse-impact': 'District impact',
};

/* nested screens name themselves from their data, not from the tab */
function titleFor(route) {
  const c = route.a && course(route.a);
  const s = route.a && senior(route.a);
  const a = route.a && activity(route.a);
  switch (route.head) {
    case 'course': return c ? c.title : 'Module';
    case 'lesson': return c ? c.title : 'Lesson';
    case 'quiz': return 'Assessment';
    case 'certificate': return 'Certificate';
    case 'senior': return s ? s.name : 'Neighbour';
    case 'checkin': return 'Check-in';
    case 'result': return 'Check-in saved';
    case 'activity': return a ? a.title : 'Activity';
    case 'session': return a ? a.title : 'Session';
    case 'case': return 'Mentor flag';
    default: return TITLES[route.head] || TITLES[currentTab(route)] || 'Ha Koo Soong Wai';
  }
}

function viewFor(route) {
  switch (route.head) {
    case 'home': return V.home();
    case 'train': return V.train();
    case 'course': return V.course(route);
    case 'lesson': return V.lesson(route);
    case 'quiz': return V.quiz(route);
    case 'certificate': return V.certificate(route);
    case 'circle': return V.circle(route);
    case 'senior': return V.senior(route);
    case 'checkin': return V.checkin(route);
    case 'result': return V.result(route);
    case 'activity': return V.activity(route);
    case 'session': return V.session(route);
    case 'impact': return V.impact();
    case 'profile': return V.profile();
    case 'nurse': return V.nurse();
    case 'case': return V.case(route);
    case 'mentors': return V.mentors();
    case 'nurse-impact': return V.nurseImpact();
    default: return S.role === 'nurse' ? V.nurse() : V.home();
  }
}

/* The mentor's unread signal is a flag the nurse has actually answered —
   an unanswered one is not news to the person who raised it. */
function answersFromNurse() {
  return S.cases.filter(c => c.raisedByMentor && c.action).length;
}

function renderAppbar(route) {
  const bar = $('#appbar');
  if (!bar) return;
  const tab = currentTab(route);
  const isRoot = TAB_ROOTS.includes(route.head);
  const title = isRoot ? (TITLES[tab] || TITLES[route.head] || 'Ha Koo Soong Wai') : titleFor(route);
  const openCases = S.cases.filter(c => c.status === 'open').length;

  bar.innerHTML = `
    ${isRoot ? '' : `<button class="appbar__btn appbar__btn--back" data-act="back" aria-label="Go back">${ic('chev-left', 23, 2.3)}</button>`}
    <h1 class="appbar__title ${isRoot ? '' : 'appbar__title--c'}">${esc(title)}</h1>
    <button class="appbar__btn" data-act="notify" aria-label="Notifications">${ic('bell', 22, 2)}
      ${S.role === 'nurse' && openCases ? `<span class="appbar__dot tnum">${openCases}</span>` : ''}
      ${S.role === 'mentor' && answersFromNurse() ? `<span class="appbar__dot"></span>` : ''}
    </button>`;
}

function renderTabbar(route) {
  const bar = $('#tabbar');
  const tabs = TABS[S.role];
  const cur = currentTab(route);
  const openCases = S.cases.filter(c => c.status === 'open').length;
  bar.style.gridTemplateColumns = `repeat(${tabs.length}, 1fr)`;
  bar.innerHTML = tabs.map(t => `
    <button data-act="go" data-to="${t.to}" ${cur === t.id ? 'aria-current="page"' : ''}>
      ${ic(t.icon, 23, cur === t.id ? 2.2 : 1.9)}
      <span>${t.label}</span>
      ${t.id === 'nurse' && openCases ? `<span class="tabbar__badge tnum">${openCases}</span>` : ''}
    </button>`).join('');
}

/* ---- rail -------------------------------------------------------------- */
function renderRail(route) {
  const stage = STAGE_OF[route.head] || 1;
  const note = DATA.notes[NOTE_OF[route.head]] || DATA.notes.home;

  // a stage counts as done only when the work behind it actually exists
  const done = {
    1: true,
    2: S.certified.length > 0 || Object.keys(S.progress).length > 0,
    3: S.certified.length > 0,
    4: S.checkins.length > 0 || S.sessions.length > 0,
    5: S.cases.some(c => c.action),
  };
  const STAGES = [
    [1, 'A healthy senior signs up', '#/home'],
    [2, 'Trained by health professionals', '#/train'],
    [3, 'Certified as a mentor', '#/profile'],
    [4, 'Supports others in the community', '#/circle'],
    [5, 'Pressure comes off the health system', '#/impact'],
  ];

  const counters = [
    ['mentors', 'Trained mentors'],
    ['checkins', 'Check-ins logged'],
    ['flags', 'Early flags raised'],
    ['hours', 'Professional hours freed'],
  ];

  $('#rail').innerHTML = `
    <div class="rail__brand">
      ${mark(42)}
      <div>
        <div class="brand__name">Ha Koo<br>Soong Wai</div>
        <div class="brand__sub">Seniors for a stronger community</div>
      </div>
    </div>

    <div class="rail__block">
      <div class="rail__label">Signed in as</div>
      <div class="roles" role="tablist">
        <button role="tab" aria-selected="${S.role === 'mentor'}" data-act="switch-role" data-role="mentor">Senior mentor</button>
        <button role="tab" aria-selected="${S.role === 'nurse'}" data-act="switch-role" data-role="nurse">Health professional</button>
      </div>
    </div>

    <div class="rail__block">
      <div class="rail__label">How the network works</div>
      <div class="loop">
        ${STAGES.map(([n, label, to]) => `
          <button class="loop__item ${stage === n ? 'is-active' : ''} ${done[n] && stage !== n ? 'is-done' : ''}"
            data-act="nav" data-to="${to}">
            <span class="loop__dot">${done[n] && stage !== n ? ic('check', 14, 3) : n}</span>
            <span class="loop__text">${esc(label)}</span>
          </button>`).join('')}
      </div>
    </div>

    <div class="rail__block">
      <div class="rail__label">Live across the district
        <span class="demo-tag">prototype · sample data</span></div>
      <div class="counters">
        ${counters.map(([k, label]) => `
          <div class="counter ${bump === k ? 'is-bumped' : ''}">
            <div class="counter__v tnum">${num(Math.round(S.counters[k]))}</div>
            <div class="counter__k">${esc(label)}</div>
          </div>`).join('')}
      </div>
    </div>

    <div class="note">
      <div class="note__eyebrow">${esc(note.k)}</div>
      <div class="note__body">${esc(note.v)}</div>
    </div>

    <div class="rail__foot">
      <div class="rail__vision">
        <b>2050 vision</b><br>
        Older people are not only the recipients of care. Trained, certified and supervised, they are
        part of the workforce that delivers it.
      </div>
      <button class="ghost-btn" data-act="reset">${ic('refresh', 16, 2.2)} Reset the demo</button>
    </div>`;
  bump = null;
}

/* ---- master render ----------------------------------------------------- */
function render(opts = {}) {
  const route = parse();
  const view = $('#view');
  const keep = opts.keepScroll ? view.scrollTop : 0;

  S.role = NURSE_ROUTES.includes(route.head) ? 'nurse' : 'mentor';

  document.documentElement.style.setProperty('--fs', S.fs);
  renderAppbar(route);
  try {
    view.innerHTML = viewFor(route);
  } catch (err) {
    // never leave the previous screen's markup on screen pretending to be this one
    view.innerHTML = `<div class="pad"><div class="callout callout--crit">
      <div class="callout__t">${ic('alert', 14, 2.2)}This screen failed to render</div>
      <b>${esc(route.head)}</b> — ${esc(err.message)}</div></div>`;
    console.error('render failed for', location.hash, err);
  }
  view.dataset.rendered = location.hash || '#/home';
  view.scrollTop = keep;
  renderTabbar(route);
  renderRail(route);
  save();
}

/* ==========================================================================
   Actions
   ========================================================================== */
let lastBumpTimer = null;

function doBump(key, amount = 1) {
  S.counters[key] = Math.round((S.counters[key] + amount) * 10) / 10;
  bump = key;
  clearTimeout(lastBumpTimer);
  lastBumpTimer = setTimeout(() => { bump = null; renderRail(parse()); }, 2400);
}

document.addEventListener('click', e => {
  const t = e.target.closest('[data-act]');
  if (!t) return;
  const act = t.dataset.act;
  const route = parse();

  switch (act) {
    case 'nav':
      go(t.dataset.to);
      break;

    case 'go':
      go(t.dataset.to);
      break;

    case 'back':
      if (history.length > 1) history.back();
      else go(S.role === 'nurse' ? '#/nurse' : '#/home');
      break;

    case 'switch-role': {
      const r = t.dataset.role;
      S.role = r;
      save();
      go(r === 'nurse' ? '#/nurse' : '#/home');
      toast(r === 'nurse'
        ? 'Now viewing as Nurse Anong at the health centre.'
        : 'Now viewing as Mrs. Somsri, senior mentor.', 'user');
      break;
    }

    case 'set-fs': {
      S.fs = Number(t.dataset.v);
      save();
      document.documentElement.style.setProperty('--fs', S.fs);
      render({ keepScroll: true });
      break;
    }

    case 'next-lesson': {
      const id = t.dataset.id;
      const i = Number(t.dataset.i);
      S.progress[id] = Math.max(S.progress[id] || 0, i + 1);
      save();
      go(`#/lesson/${id}/${i + 1}`);
      break;
    }

    case 'finish-lessons': {
      const id = t.dataset.id;
      const c = course(id);
      S.progress[id] = c.lessons.length;
      delete S.quiz[id];
      save();
      go(`#/quiz/${id}`);
      break;
    }

    case 'answer': {
      const id = t.dataset.id, qi = Number(t.dataset.q), k = Number(t.dataset.k);
      const q = S.quiz[id] || { picked: [] };
      if (q.picked[qi] !== undefined) break;
      q.picked[qi] = k;
      S.quiz[id] = q;
      save();
      render({ keepScroll: true });
      break;
    }

    case 'retake': {
      delete S.quiz[t.dataset.id];
      save();
      render({ keepScroll: true });
      break;
    }

    case 'certify': {
      const id = t.dataset.id;
      if (!S.certified.includes(id)) S.certified.push(id);
      S.quiz[id] = { ...(S.quiz[id] || { picked: [] }), passed: true };
      doBump('mentors', 1);
      S.counters.mentorsTrained = Math.round((S.counters.mentorsTrained + 1) * 10) / 10;
      save();
      go(`#/certificate/${id}`);
      toast('Certified. Nurse Anong can now assign neighbours to you.', 'shield');
      break;
    }

    case 'save-cert':
      toast('Certificate saved to your profile.', 'award');
      go('#/profile');
      break;

    case 'offer': {
      const id = t.dataset.id;
      if (!S.circle.includes(id)) S.circle.push(id);
      save();
      const s = senior(id);
      toast(`${esc(s.name)} added to your circle. Log a first visit to start their history.`, 'users');
      go(`#/senior/${id}`);
      break;
    }

    case 'remove': {
      const id = t.dataset.id;
      S.circle = S.circle.filter(x => x !== id);
      save();
      toast('Removed from your circle. The nurse has been told.', 'x');
      go('#/circle/mine');
      break;
    }

    case 'call':
      toast(`Calling ${esc(senior(t.dataset.id).name)}…`, 'phone');
      break;

    case 'join': {
      const id = t.dataset.id;
      if (!S.joined.includes(id)) S.joined.push(id);
      save();
      toast(`Joined ${esc(activity(id).title)}. It is now on your home screen.`, 'check-circle');
      render({ keepScroll: true });
      break;
    }

    case 'leave': {
      const id = t.dataset.id;
      S.joined = S.joined.filter(x => x !== id);
      save();
      toast('Left the group.', 'x');
      render({ keepScroll: true });
      break;
    }

    case 'toggle-att': {
      const aid = t.dataset.id, sid = t.dataset.sid;
      let s = S.sessions.filter(x => x.activityId === aid).slice(-1)[0];
      if (!s) {
        s = { activityId: aid, present: [...activity(aid).attendees], date: 'Today', time: '6:32', hours: 0, completed: false };
        S.sessions.push(s);
      }
      s.present = s.present.includes(sid) ? s.present.filter(x => x !== sid) : [...s.present, sid];
      save();
      render({ keepScroll: true });
      break;
    }

    case 'complete-session': {
      const aid = t.dataset.id;
      let s = S.sessions.filter(x => x.activityId === aid).slice(-1)[0];
      if (!s) { s = { activityId: aid, present: [...activity(aid).attendees], date: 'Today', time: '6:32', hours: 0, completed: false }; S.sessions.push(s); }
      s.hours = 1;
      s.completed = true;
      s.time = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
      doBump('hours', 1);
      save();
      toast(`${s.present.length} attended. One mentor hour added to your record.`, 'check-circle');
      render({ keepScroll: true });
      break;
    }

    /* ---- check-in form ---- */
    case 'ci-next':
      if (draft.step < 3) { draft.step++; render(); }
      break;

    case 'ci-prev':
      if (draft.step > 0) { draft.step--; render(); }
      break;

    case 'ci-set':
      draft[t.dataset.field] = t.dataset.value;
      render({ keepScroll: true });
      break;

    case 'ci-bp': {
      const f = t.dataset.field;
      const step = f === 'pulse' ? 2 : 2;
      const lo = f === 'pulse' ? 40 : 70;
      const hi = f === 'pulse' ? 160 : 220;
      draft[f] = Math.max(lo, Math.min(hi, draft[f] + Number(t.dataset.op) * step));
      render({ keepScroll: true });
      break;
    }

    case 'submit-checkin': {
      const d = draft;
      const t2 = triage(d);
      const now = new Date();
      const rec = {
        id: 'ci-' + now.getTime(),
        seniorId: d.seniorId,
        date: now.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
        time: now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
        sys: d.sys, dia: d.dia, pulse: d.pulse,
        mood: d.mood, appetite: d.appetite, sleep: d.sleep,
        meds: d.meds, dizzy: d.dizzy, fallen: d.fallen, homeSafe: d.homeSafe,
        note: d.note.trim(),
        flags: t2.flags,
        level: t2.level,
        escalated: false,
      };
      S.checkins.push(rec);
      doBump('checkins', 1);
      doBump('hours', 0.75);          // a clinic visit that was never needed
      save();
      const sid = d.seniorId;
      draft = null;
      go(`#/result/${sid}`);
      toast(t2.level === 'good'
        ? 'Check-in filed. Nothing outside the usual range.'
        : `${t2.flags.length} flag${t2.flags.length > 1 ? 's' : ''} detected by the clinic's rules.`, 'clipboard');
      break;
    }

    case 'escalate': {
      const rec = S.checkins.find(c => c.id === t.dataset.id);
      if (!rec) break;
      rec.escalated = true;
      const s = senior(rec.seniorId);
      const sev = rec.level === 'crit' ? 'crit' : 'warn';
      S.cases.unshift({
        id: 'c-' + Date.now(),
        seniorId: rec.seniorId,
        mentor: 'Mrs. Somsri, 68',
        raised: 'Just now',
        severity: sev,
        reason: rec.flags.length ? rec.flags[0][0] : 'Check-in outside the usual range',
        detail: rec.note || `Recorded at ${rec.time}. Blood pressure ${rec.sys}/${rec.dia}, pulse ${rec.pulse}.`,
        vitals: { sys: rec.sys, dia: rec.dia, pulse: rec.pulse },
        status: 'open',
        action: null,
        raisedByMentor: true,
      });
      doBump('flags', 1);
      save();
      render({ keepScroll: true });
      toast(`Sent to Nurse Anong. ${esc(s.name)}'s record is updated.`, 'send');
      break;
    }

    case 'nurse-act': {
      const c = S.cases.find(x => x.id === t.dataset.id);
      if (!c) break;
      c.status = 'closed';
      c.action = t.dataset.do;
      doBump('hours', 0.8);
      save();
      render();
      toast(`Decision written back to ${esc(senior(c.seniorId).name)}'s record and to the mentor.`, 'check-circle');
      break;
    }

    case 'notify': {
      const open = S.cases.filter(c => c.status === 'open').length;
      if (S.role === 'nurse') {
        toast(open ? `${open} flag${open > 1 ? 's' : ''} from mentors waiting for triage.` : 'Your inbox is clear.', 'bell');
        go('#/nurse');
      } else {
        const mine = answersFromNurse();
        toast(mine ? `Nurse Anong has answered ${mine} of your flags. Open the neighbour's record to read it.` : 'No new messages.', 'bell');
      }
      break;
    }

    case 'reset':
      resetDemo();
      break;
  }
});

/* the check-in note needs live input, not a click */
document.addEventListener('input', e => {
  if (e.target.dataset && e.target.dataset.act === 'ci-note' && draft) {
    draft.note = e.target.value;
  }
});

/* keyboard: escape pops the way back */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    const scrim = $('.scrim');
    if (scrim) { closeSheet(); return; }
    if (parse().a) history.back();
  }
});

/* ---- boot -------------------------------------------------------------- */
window.addEventListener('hashchange', () => render());
render();
