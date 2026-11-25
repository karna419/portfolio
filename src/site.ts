// Everything personal lives here. Edit this file first.
export type IconName = 'upwork' | 'fiverr' | 'linkedin' | 'github';

export const site = {
  name: 'Karunagaran',
  // One plain sentence: what you do and for whom.
  intro: 'I build web and mobile apps — from the first sketch to the version people use every day.',
  location: 'Chennai, India', // leave empty to hide
  email: 'karnaumaidurai@gmail.com', // leave empty to hide the email link
  // Shown as icons in the header and as text links under the intro, in this order.
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
