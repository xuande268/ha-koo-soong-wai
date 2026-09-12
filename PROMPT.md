# Build prompt — "Ha Koo Soong Wai", senior mentor network

Paste everything below into an AI coding tool to generate this prototype from
scratch. It is written to be self-contained.

---

## The brief

Build a **working, interactive prototype** of a "Senior-to-Senior Health Network"
for a 2050-vision healthcare competition. This is a demonstrable app for judges,
not a set of static screen mockups.

The idea being demonstrated: **healthy older adults are not just healthcare
recipients — they become part of the healthcare support system.**

The loop the app must make visible:

```
Healthy senior signs up
      ↓
Trained by health professionals
      ↓
Certified as a peer health mentor
      ↓
Supports other seniors in the community
      ↓
Pressure comes off professional healthcare workers
```

The single most important thing a judge should be able to do: **cause a health
problem to be caught early by a neighbour, escalated to a nurse, and answered —
and watch the loop close.**

## Relationship to the sibling side

**"Ha Koo Soong Wai"** is one platform with two sides. The existing side matches
young volunteers with isolated elderly neighbours. This side turns healthy older
adults into certified peer health mentors. This prototype must inherit the
existing side's visual language so the two read as one product:

- iOS-native feel, phone-sized layout
- Deep **maroon / raspberry** primary (`#9B1B3A`) on white, light-grey canvas
- A two-line uppercase wordmark with a heart-shaped brand mark
- Rounded cards, soft shadows, bottom tab bar, verified-green accents
- Bangkok setting, Thai proper nouns, ฿ currency, English interface

## Deliverable

A single self-contained `index.html` that runs by double-clicking. No build step,
no server, no network calls, no frameworks. Inline all CSS and JS.

On wide screens it presents as **a phone frame beside a live system panel**; on
narrow screens the phone goes full-bleed and the panel moves below. It must work
at 390 px and at 1440 px.

## Roles

Three sides of the system. Two are playable and switchable at any time:

1. **Senior mentor** (default) — Mrs. Somsri, 68, retired teacher, Bang Kapi.
   The hero role.
2. **Health professional** — Nurse Anong at the community health centre.
   Validates training, receives escalations, triages them.
3. **The seniors being supported** — present throughout as case data, not as a
   separate login.

## Screens — mentor role (5 tabs)

**Home** — greeting; mentor status (Trainee vs Certified, and it must actually
change when certified); a three-stat strip; a "check-in due today" prompt; today's
scheduled activities; four quick actions; the list of people in the circle.

**Academy** — a progress ring, then five modules, each authored by a named
clinician with their title and the health centre:
1. Checking blood pressure and pulse — Nurse Anong Rojana
2. Spotting fall risk at home — Physiotherapist Kittipong Suwan
3. Everyday mental wellbeing for seniors — Dr. Pimchanok Saelim
4. Leading a safe walking group — Physiotherapist Kittipong Suwan
5. Medication reminders and eating well — Pharmacist Wipada Chaiyo

Write **real, clinically plausible teaching content** — actual blood-pressure
thresholds, an actual home hazard checklist, the actual "talk test" for exercise
intensity. Judges will read it. Each lesson ends with a "remember this" callout,
and some carry an amber caution or a red safety-critical box.

**Module detail → lesson → quiz → certificate.** Three lessons per module, three
quiz questions per module, two of three correct to pass. The certificate must
show the mentor's name, the module, the clinician who signed it off, the date,
a mentor ID and an expiry.

**Circle** — three segments:
- *Needs support*: nearby seniors with distance, needs tags, match percentage,
  and "offer to support"
- *My circle*: the people you support, with next-visit dates
- *Activities*: walking group, chair exercise, community garden, cooking group —
  join, leave, and lead a session

**Neighbour detail** — profile, what they need, health conditions, any flags
raised to the nurse *with the nurse's reply shown inline*, and full visit history
as a timeline.

**Check-in** — a four-step structured form: vital signs (large steppers for
systolic, diastolic, pulse) → wellbeing (mood, appetite, sleep) → medication and
safety (medication taken, dizziness on standing, any fall, home hazards) → notes.
Then a **result screen that applies the clinic's own thresholds** and shows one of
three verdicts: all within range, worth watching, or needs a nurse today.

**Impact** — a hero figure (professional hours freed), four stat tiles, a weekly
mentoring-hours column chart, a split bar showing where flags went (handled by a
mentor vs escalated to a nurse), and a four-step "what one flag can change"
narrative.

**Profile** — mentor card with credentials, availability, accessibility settings
including a **text-size control**, emergency contact, role switch, and a demo reset.

## Screens — health professional role (3 tabs)

**Inbox** — caseload summary, an urgent-flag banner, flags awaiting triage sorted
urgent-first (each showing the senior, the reason, who raised it and when), then
recently closed cases.

**Case detail** — the flag, the senior, their vitals, **the mentor's note
verbatim**, known conditions, recent readings as a timeline, and four triage
actions: book a home visit / call today / routine — mentor manages / refer to
the doctor. The chosen action is written back to the senior's record.

**Mentors** — the roster of trained seniors reporting to this nurse with their
certificates, hours and visit counts, plus where the hours go.

**District impact** — the population-level version of the story, including the
estimated cost avoided.

## The flows that must genuinely work

State must be real and must survive a page reload. No dead buttons, no fake toasts.

1. **Certification changes your status.** Read the lessons, pass the quiz, receive
   the certificate, and the profile and home screen must now show "Certified
   mentor". The rail's stage 3 must light up.
2. **A check-in produces a verdict.** The app applies the thresholds itself.
   Critical: BP ≥ 160/100 or ≥ 180/120; dizziness on standing; any fall.
   Warning: BP 140–159/90–99; medication missed or irregular; low mood; poor
   appetite; a home hazard. All three wellbeing flags must be answerable in any
   order.
3. **Escalation reaches the nurse.** Sending a flag puts it in the nurse's inbox
   with a live badge count on the bell and the tab bar.
4. **The nurse's decision comes back.** After triage, the mentor sees the nurse's
   answer on that neighbour's record, and a notification dot clears.
5. **Activity sessions log hours.** Toggle attendance, complete the session, and
   the impact counters move.
6. **Counters react.** The system panel's four live counters increment as the
   demo is used, with a brief highlight.

## The system panel (desktop only)

A left rail that narrates the model for a judge who does not know what to click:

- The brand wordmark
- A **role switch** (Senior mentor / Health professional)
- **The five-stage loop**, with the current stage highlighted and completed stages
  ticked — derived from real state, not from the route alone
- **Four live counters**: trained mentors, check-ins logged, early flags raised,
  professional hours freed
- **A contextual note** that changes per screen, explaining what that screen
  demonstrates about the model
- A 2050-vision statement and a demo reset

## Design constraints — this is the part that is easy to get wrong

**The users are elderly. Design for them, not for a portfolio.**

- Base body text **17 px**, not 14
- Every interactive target **≥ 44 × 44 px**; primary actions 48 px
- Body contrast **≥ 4.5:1** against the surface it actually sits on — verify the
  muted greys, they are where this fails
- A **text-size control** (normal / large / extra large) that scales type only,
  never spacing, so the layout cannot break at 125%
- Never signal by colour alone: every status carries an icon and a label

**Colour.** Maroon `#9B1B3A` is the brand and the single chart series. Reserve
green / amber / red strictly for status (good / warning / critical) and never
reuse them as chart series. Triage panels are white-on-gradient and **both ends
of the gradient must clear 4.5:1**.

**Charts.** One series means no legend — the title names it. Bars capped at 24 px,
rounded at the data end, square at the baseline, with a 2 px surface gap between
neighbours. Hairline gridlines. Label selectively — never a number on every bar.
**Y-axis ticks must be round numbers.** Ship a "view as a table" fallback.

**Motion.** One orchestrated moment, not scattered effects. Respect
`prefers-reduced-motion`.

## Verify before you call it done

Do not judge this by reading the code. Render it and measure it:

- Walk **every route** and assert the screen actually rendered — a screen that
  throws leaves the previous screen's markup in place and looks like a pass
- Assert no horizontal overflow in the phone at 390 px and 1440 px
- Assert no element is painted outside the phone's screen box
- Assert every interactive target is ≥ 44 px
- Assert no text is clipped by its own container
- Read the palette out of the live stylesheet and compute contrast ratios
- Capture every screen as an image and look at it — layout bugs (inline spans that
  should stack, avatars mis-aligned against tall text) only show up visually
- Drive the full golden path end to end: certify → check in → escalate → triage →
  confirm the answer returns to the mentor
- The console must be clean

## Acceptance criteria

- A judge can complete the whole loop above without being told what to click
- The nurse's answer is visible on the mentor's side afterwards
- Every counter, badge and status reflects real state and survives a reload
- Nothing overflows, nothing is clipped, nothing is under 44 px, contrast holds
- The copy reads like a real health service, not placeholder lorem
