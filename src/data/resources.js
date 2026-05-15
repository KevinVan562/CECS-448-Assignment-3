export const emergency = {
  title: 'Need Immediate Help?',
  description: 'Crisis support and emergency resources available 24/7',
  actionLabel: 'Show Helplines',
  note: 'All services below are free, confidential, and available 24/7.',
}

export const crisisHelplines = [
  {
    id: '988',
    name: '988 Suicide & Crisis Lifeline',
    description: 'Free, confidential support for anyone in distress',
    actions: [
      { type: 'tel', label: 'Call or text 988', href: 'tel:988' },
      { type: 'web', label: 'Chat at 988lifeline.org', href: 'https://988lifeline.org/chat' },
    ],
  },
  {
    id: 'text-line',
    name: 'Crisis Text Line',
    description: 'Crisis support by text message',
    actions: [
      { type: 'sms', label: 'Text HOME to 741741', href: 'sms:741741?&body=HOME' },
    ],
  },
  {
    id: 'samhsa',
    name: 'SAMHSA National Helpline',
    description: 'Substance use and mental health treatment referrals',
    actions: [
      { type: 'tel', label: 'Call 1-800-662-4357', href: 'tel:18006624357' },
    ],
  },
  {
    id: 'dv',
    name: 'National Domestic Violence Hotline',
    description: 'Confidential support for relationship violence',
    actions: [
      { type: 'tel', label: 'Call 1-800-799-7233', href: 'tel:18007997233' },
      { type: 'sms', label: 'Text START to 88788', href: 'sms:88788?&body=START' },
    ],
  },
]

export const categories = [
  {
    id: 'academic',
    title: 'Academic Support',
    subtitle: 'Help with courses, advising, and planning',
    color: 'blue',
    icon: 'bookOpen',
    items: [
      { id: 'advisor', title: 'Schedule an Advisor Meeting', description: 'Get personalized guidance on your academic plan' },
      { id: 'tutoring', title: 'Tutoring Services', description: 'Free tutoring for STEM courses' },
      { id: 'writing', title: 'Writing Center', description: 'Help with essays and assignments' },
      { id: 'study-groups', title: 'Study Groups', description: 'Connect with peers in your courses' },
    ],
  },
  {
    id: 'financial',
    title: 'Financial Support',
    subtitle: 'Scholarships, aid, and financial planning',
    color: 'green',
    icon: 'trend',
    items: [
      { id: 'aid', title: 'Financial Aid Office', description: 'Questions about FAFSA, grants, and loans' },
      { id: 'scholarship', title: 'Scholarship Search', description: 'Find scholarships you qualify for' },
      { id: 'emergency-funds', title: 'Emergency Funds', description: 'Short-term financial assistance' },
      { id: 'work-study', title: 'Work-Study Programs', description: 'On-campus job opportunities' },
    ],
  },
  {
    id: 'wellbeing',
    title: 'Personal Well-being',
    subtitle: 'Mental health, counseling, and wellness',
    color: 'red',
    icon: 'support',
    items: [
      { id: 'counseling', title: 'Counseling Services', description: 'Free confidential counseling' },
      { id: 'mental-health', title: 'Mental Health Resources', description: 'Support for stress, anxiety, and more' },
      { id: 'wellness', title: 'Wellness Programs', description: 'Fitness, nutrition, and self-care' },
      { id: 'peer-support', title: 'Peer Support Groups', description: 'Connect with other students' },
    ],
  },
  {
    id: 'firstgen',
    title: 'First-Gen Specific Support',
    subtitle: 'Programs designed specifically for you',
    color: 'amber',
    icon: 'users',
    items: [
      { id: 'firstgen-center', title: 'First-Gen Student Center', description: 'Community and support for first-gen students' },
      { id: 'mentorship', title: 'Mentorship Program', description: 'Connect with upper-division mentors' },
      { id: 'workshops', title: 'Workshops & Events', description: 'Skills workshops and networking events' },
      { id: 'parent-family', title: 'Parent & Family Resources', description: 'Help for families navigating college' },
    ],
  },
]

export const contact = [
  { id: 'phone', label: 'Phone', value: '(562) 985-4111', symbol: '☎' },
  { id: 'email', label: 'Email', value: 'support@csulb.edu', symbol: '✉' },
  { id: 'walkin', label: 'Walk-in Hours', value: 'M-F 9AM-5PM', symbol: '◷' },
]
