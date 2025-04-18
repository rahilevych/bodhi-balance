export const plans = [
  {
    id: 1,
    category: 'One-time Visit',
    options: [
      {
        id: 'ind-1',
        title: '1 session',
        price: '$25',
        description: 'Try one individual session without commitment.',
      },
    ],
  },
  {
    id: 2,
    category: 'Individual',
    options: [
      {
        id: 'ind-4',
        title: '4 Sessions',
        price: '$80',
        description: 'Ideal for beginners who want to try individual lessons.',
      },
      {
        id: 'ind-8',
        title: '8 Sessions',
        price: '$150',
        description: 'For consistent learning with a personal coach.',
      },
    ],
  },
  {
    id: 3,
    category: 'Unlimited',
    options: [
      {
        id: 'sub-3mo',
        title: '3 months',
        price: '$199',
        description: 'Includes weekly sessions and progress tracking.',
      },
      {
        id: 'sub-6mo',
        title: '6 months',
        price: '$359',
        description: 'Better value for long-term learners.',
      },
      {
        id: 'sub-1yr',
        title: '12 months',
        price: '$649',
        description: 'Best offer for dedicated clients.',
      },
    ],
  },
];
