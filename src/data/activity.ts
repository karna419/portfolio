// What the "Shipping lately" block on the home page shows.
//
// The privacy rule: this file may only ever hold counts, dates, the kind of event and a
// generic description of the project ("a client mobile app"). Never a repository or client
// name, a branch, a commit message or a file path. If a field would identify a project, it
// does not belong here.
//
// For now this is DEMO data, made up afresh on every build so the block can be designed.
// The real pipeline will later write the same shape (for example from the GitHub API on a
// schedule) and set `demo` to false. While `demo` is true the block only shows on the dev
// server, never on the live site.

export interface ActivityDay {
  /** Local calendar day, `YYYY-MM-DD`. */
  date: string;
  /** Commits pushed that day, across every project. */
  count: number;
}

export interface ActivityEvent {
  /** ISO timestamp. */
  at: string;
  kind: 'commits' | 'release';
  /** For `commits`: how many. */
  count?: number;
  /** For `release`: what happened, in general terms. */
  title?: string;
  /** A generic description, never a name: "a client mobile app", "a web CRM", "this site". */
  project: string;
  platforms?: string[];
}

export interface Activity {
  demo: boolean;
  /** One entry per day, oldest first. */
  days: ActivityDay[];
  /** Newest first. */
  events: ActivityEvent[];
}

const DAY = 86_400_000;
const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

function demo(weeks = 20): Activity {
  // A small seeded generator, so the made-up year looks the same on every reload.
  let seed = 20190201;
  const rand = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 2 ** 32);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days: ActivityDay[] = [];
  for (let i = weeks * 7 - 1; i >= 0; i--) {
    const d = new Date(today.getTime() - i * DAY);
    const weekend = d.getDay() === 0 || d.getDay() === 6;
    // Weekdays are busy, weekends mostly quiet, and now and then a day off.
    const r = rand();
    const count = r < (weekend ? 0.7 : 0.12) ? 0 : Math.round((weekend ? 4 : 13) * rand() ** 1.4) + 1;
    days.push({ date: iso(d), count });
  }

  const ago = (hours: number) => new Date(Date.now() - hours * 3_600_000).toISOString();
  const events: ActivityEvent[] = [
    { at: ago(2), kind: 'commits', count: 9, project: 'a client mobile app', platforms: ['iOS', 'Android'] },
    { at: ago(21), kind: 'release', title: 'Sent a build to testers', project: 'a client mobile app', platforms: ['iOS', 'Android'] },
    { at: ago(27), kind: 'commits', count: 14, project: 'a web CRM', platforms: ['Web'] },
    { at: ago(50), kind: 'commits', count: 3, project: 'this site', platforms: ['Web'] },
    { at: ago(74), kind: 'release', title: 'Shipped an over-the-air update', project: 'a client mobile app', platforms: ['iOS', 'Android'] },
    { at: ago(98), kind: 'commits', count: 6, project: 'a client mobile app', platforms: ['iOS', 'Android'] },
  ];

  return { demo: true, days, events };
}

export const activity: Activity = demo();
