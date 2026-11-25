// Everything personal lives here. Edit this file first.
export type IconName = 'upwork' | 'fiverr' | 'linkedin' | 'github' | 'apple' | 'googleplay' | 'mail' | 'pin';

export const site = {
  name: 'Karunagaran',
  // One plain sentence: what you do and for whom.
  intro: 'I build web and mobile apps — from the first sketch to the version people use every day.',
  location: 'Chennai, India', // leave empty to hide
  // true shows the green "Available for new work" badge and the lines that go with it.
  // Set to false when you're booked.
  available: true,
  // About me: one string per paragraph.
  about: [
    "I've been building software for a living since February 2019. Most of that time has gone into apps: hybrid ones with Ionic and Cordova, React Native, native Android, and the web side in React and Next.js.",
    'I write the back end too when a project needs it, usually PHP or Python APIs on top of MySQL or Postgres. Setting up the repo and the build pipeline is part of the job for me, not somebody else\'s problem.',
    'These days I build almost everything with Claude, and sometimes Codex. Years of doing it by hand first means I know what to ask for and what to check.',
  ],
  // What I work with, grouped and in the order shown.
  stack: [
    { group: 'Mobile', items: ['React Native', 'Ionic', 'Cordova', 'Native Android (Android Studio)'] },
    { group: 'Web', items: ['React', 'Next.js'] },
    { group: 'Back end', items: ['PHP', 'Python APIs', 'GraphQL'] },
    { group: 'Databases', items: ['MySQL', 'PostgreSQL'] },
    { group: 'Shipping', items: ['AWS', 'GitHub', 'GitLab', 'Jenkins'] },
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
};
