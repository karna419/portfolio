// Everything personal lives here. Edit this file first.
export type IconName = 'upwork' | 'fiverr' | 'linkedin' | 'github' | 'apple' | 'googleplay' | 'mail' | 'pin';

export const site = {
  name: 'Karunagaran',
  // Your title, shown under the name and in the browser tab. Leave empty to hide.
  role: 'AI engineer',
  // One plain sentence: what you do and for whom.
  intro: 'I build and overhaul web and mobile apps, and automate the work around them, with AI agents as part of the everyday workflow.',
  location: 'Chennai, India', // leave empty to hide
  // true shows the green "Available for new work" badge and the lines that go with it.
  // Set to false when you're booked.
  available: true,
  // true shows the "Shipping lately" block (commit calendar and feed) under the work list.
  // It is built but switched off. Its data is still made up (src/data/activity.ts), and made-up
  // data never shows on the live site even when this is true.
  showActivity: false,
  // What I do: shown as cards under the work list. With an odd number, the first one spans the
  // full width. Leave the list empty to hide the section.
  services: [
    { title: 'Internal software factories', text: 'A company\'s own setup for producing software: agents, conventions and pipelines in one place, so internal teams get the tools they need built quickly and to the same standard.' },
    { title: 'Automating internal work', text: 'The repetitive jobs a team does by hand, such as reports, data entry and hand-offs, turned into tools and agents that run on their own.' },
    { title: 'App revamps and overhauls', text: 'An ageing app reworked or rebuilt: a fresh design and current frameworks, with the same data and users carried across.' },
    { title: 'Agent-ready codebases', text: 'Old code migrated into a shape AI agents can work in: clear structure, written-down conventions and checks that catch mistakes.' },
    { title: 'From design to live, in one flow', text: 'Your design, testing, preview and release tools connected end to end, so every change is checked, previewed and shipped without anyone carrying it from one tool to the next.' },
  ],
  // About me: one string per paragraph.
  about: [
    "I've been building software for a living since February 2019. Most of that time has gone into apps: hybrid ones with Ionic and Cordova, React Native, native Android, and the web side in React and Next.js.",
    'Today I work with Claude every day. It is part of how I plan, write and ship code, and more of my work is now about putting it to use for others: building internal software factories, automating everyday work, overhauling older apps, and getting codebases ready for AI agents.',
    'I write the back end too when a project needs it, usually PHP or Python APIs on top of MySQL or Postgres. Setting up the repo and the build pipeline is part of the job for me, not somebody else\'s problem.',
  ],
  // What I work with, grouped and in the order shown.
  stack: [
    { group: 'AI', items: ['Claude', 'AI agents', 'Workflow automation'] },
    { group: 'Mobile', items: ['React Native', 'Ionic', 'Cordova', 'Native Android (Android Studio)'] },
    { group: 'Web', items: ['React', 'Next.js'] },
    { group: 'Back end', items: ['Node.js', 'PHP', 'Python', 'GraphQL'] },
    { group: 'Databases', items: ['MySQL', 'PostgreSQL'] },
    { group: 'Shipping', items: ['AWS', 'EAS', 'GitHub', 'GitLab', 'Jenkins'] },
  ],
  email: 'karnaumaidurai@gmail.com', // leave empty to hide the email link
  // Shown as icons under the intro, in this order (after email).
  links: [
    { label: 'Upwork', icon: 'upwork', href: 'https://www.upwork.com/freelancers/~016aef5a26f06d2ddf' },
    { label: 'Fiverr', icon: 'fiverr', href: 'https://www.fiverr.com/karunagaran' },
    { label: 'LinkedIn', icon: 'linkedin', href: 'https://www.linkedin.com/in/karuna-garan-584422141' },
    { label: 'GitHub', icon: 'github', href: 'https://github.com/karna419' },
  ] satisfies { label: string; icon: IconName; href: string }[],
  // Freelance profiles get their own buttons in the contact block.
  hire: ['Upwork', 'Fiverr'],
  // Path in /public, e.g. '/karunagaran-cv.pdf'. Leave empty to hide.
  cv: '',
  // This site's source code, linked from the footer. Leave empty to hide the link.
  source: 'https://github.com/karna419/portfolio',
};
