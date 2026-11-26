// Client reviews shown on the home page, in the order shown.
//
// Copied word for word from the public Upwork and Fiverr profiles (typos included). Trimmed
// quotes are marked with "…". Don't reword a review: it has to match what the client wrote.
// Order: clients in the United States first, then everyone else.

export type ReviewSource = 'Upwork' | 'Fiverr';

export interface Review {
  quote: string;
  /** The client's username on the platform, or a short description when it shows none. */
  who: string;
  country?: string;
  /** ISO 3166 alpha-2 code for the flag, e.g. 'US'. Needs a drawing in src/components/Flag.astro. */
  countryCode?: string;
  source: ReviewSource;
}

export const reviews: Review[] = [
  {
    quote:
      'Karun is a good communicator and thinker. He worked with us through our custom dashboard API wiring and user flow process to achieve the desired outcome. During the project, we had several problems to solve and we managed to come up with good solutions in a timely manner. We were impressed by his ability to come up with clever solutions as well as his ability to take feedback.',
    who: 'teamabs',
    country: 'United States',
    countryCode: 'US',
    source: 'Fiverr',
  },
  {
    quote: 'Great communication. Very conscientious and thorough. Made sure we got exactly what we wanted.',
    who: 'micap6',
    country: 'United States',
    countryCode: 'US',
    source: 'Fiverr',
  },
  {
    quote: '5 stars as usual. Always a pleasure to work with … React native and firebase expert.',
    who: 'ryanleap',
    country: 'United States',
    countryCode: 'US',
    source: 'Fiverr',
  },
  {
    quote:
      'karna is very understanding, patient and very knowledgeable. He has been working on so many parts of my project, he is like part of my work team. definitely recommend to anyone',
    who: 'mashariki01',
    country: 'Kenya',
    countryCode: 'KE',
    source: 'Fiverr',
  },
  {
    quote:
      'karunagaran is very skillful, and technically very sound. He is able to resolve the most complicated problem in a short period of time.',
    who: 'hemadriboson',
    country: 'India',
    countryCode: 'IN',
    source: 'Fiverr',
  },
  {
    quote: 'Fantastic job. Great communication. 5 stars!!!',
    who: 'App store release client',
    source: 'Upwork',
  },
];

// The headline numbers above the reviews. Update them when the profiles change.
export const ratings: { source: ReviewSource; score: string; count: number }[] = [
  { source: 'Fiverr', score: '5.0', count: 34 },
  { source: 'Upwork', score: '5.0', count: 1 },
];
