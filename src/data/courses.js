export const courses = [
  {
    id: 'cs-410',
    code: 'CS 410',
    name: 'Operating Systems',
    department: 'Computer Science',
    credits: 3,
    description:
      'Study of operating system design and implementation including process management, memory management, file systems, and I/O systems. Students will gain practical experience with system-level programming and concurrent processes.',
    instructor: 'Dr. Sarah Johnson',
    schedule: 'MWF 10:00-10:50',
    availability: '12 / 30 seats',
    rating: '4.5 / 5.0',
    eligible: true,
    prereqs: ['CS 301 ✓', 'CS 250 ✓'],
    outcomes: [
      'Understand core operating system concepts and architecture',
      'Implement process scheduling and synchronization',
      'Design and manage memory allocation systems',
      'Build file system components',
      'Debug concurrent and parallel programs',
    ],
    textbooks: [
      {
        title: 'Operating System Concepts',
        author: 'Silberschatz, Galvin, and Gagne',
      },
      {
        title: 'Modern Operating Systems',
        author: 'Andrew S. Tanenbaum',
      },
    ],
    grading: [
      ['Programming Projects', 50],
      ['Midterm Exam', 20],
      ['Final Exam', 25],
      ['Participation', 5],
    ],
  },
  {
    id: 'cs-425',
    code: 'CS 425',
    name: 'Machine Learning',
    department: 'Computer Science',
    credits: 3,
    description:
      'This course provides a comprehensive introduction to machine learning, covering supervised and unsupervised learning algorithms, neural networks, and practical applications. Students will gain hands-on experience implementing ML models and analyzing real-world datasets.',
    instructor: 'Dr. Michael Chen',
    schedule: 'TR 13:00-14:15',
    availability: '5 / 25 seats',
    rating: '4.8 / 5.0',
    eligible: false,
    prereqs: ['CS 301 ✓', 'STAT 400 (missing)'],
    prerequisiteWarning: {
      courses: ['STAT 400'],
      note:
        "You're currently enrolled in STAT 400 this semester. Complete it with a C or better to be eligible.",
    },
    outcomes: [
      'Understand fundamental machine learning concepts and algorithms',
      'Implement supervised and unsupervised learning models',
      'Apply neural networks to solve complex problems',
      'Evaluate and optimize model performance',
      'Work with real-world datasets and ML frameworks',
    ],
    textbooks: [
      {
        title: 'Pattern Recognition and Machine Learning',
        author: 'Christopher Bishop',
      },
      {
        title: 'Deep Learning',
        author: 'Ian Goodfellow et al.',
      },
    ],
    grading: [
      ['Assignments', 40],
      ['Midterm Exam', 20],
      ['Final Project', 30],
      ['Participation', 10],
    ],
  },
  {
    id: 'cs-360',
    code: 'CS 360',
    name: 'Computer Networks',
    department: 'Computer Science',
    credits: 3,
    description:
      'Principles of computer networking, layered protocols, routing, transport services, and internet applications.',
    instructor: 'Dr. Emily Rodriguez',
    schedule: 'MWF 14:00-14:50',
    availability: '18 / 30 seats',
    rating: '4.3 / 5.0',
    eligible: true,
    prereqs: ['CS 250 ✓'],
    outcomes: [
      'Explain network architecture and protocol layers',
      'Analyze routing and addressing decisions',
      'Build and test socket-based applications',
    ],
    textbooks: [
      {
        title: 'Computer Networking: A Top-Down Approach',
        author: 'Kurose and Ross',
      },
    ],
    grading: [
      ['Labs', 35],
      ['Projects', 30],
      ['Exams', 25],
      ['Participation', 10],
    ],
  },
  {
    id: 'math-241',
    code: 'MATH 241',
    name: 'Linear Algebra',
    department: 'Mathematics',
    credits: 3,
    description:
      'Vectors, matrices, systems of linear equations, linear transformations, eigenvalues, and applications.',
    instructor: 'Dr. Robert Kim',
    schedule: 'TR 10:00-11:15',
    availability: '8 / 35 seats',
    rating: '4.1 / 5.0',
    eligible: true,
    prereqs: ['MATH 142 ✓'],
    outcomes: [
      'Solve matrix and vector problems',
      'Apply linear transformations',
      'Use eigenvalues in applied settings',
    ],
    textbooks: [
      {
        title: 'Linear Algebra and Its Applications',
        author: 'David C. Lay',
      },
    ],
    grading: [
      ['Homework', 30],
      ['Quizzes', 15],
      ['Midterm Exam', 25],
      ['Final Exam', 30],
    ],
  },
  {
    id: 'stat-400',
    code: 'STAT 400',
    name: 'Statistics',
    department: 'Statistics',
    credits: 3,
    description:
      'Probability theory, statistical inference, estimation, hypothesis testing, and practical data analysis.',
    instructor: 'Dr. Lisa Anderson',
    schedule: 'MWF 11:00-11:50',
    availability: '15 / 40 seats',
    rating: '4.4 / 5.0',
    eligible: true,
    prereqs: ['MATH 142 ✓'],
    outcomes: [
      'Apply probability models',
      'Run statistical tests',
      'Interpret statistical evidence',
    ],
    textbooks: [
      {
        title: 'Introduction to Probability and Statistics',
        author: 'Mendenhall, Beaver, and Beaver',
      },
    ],
    grading: [
      ['Homework', 25],
      ['Labs', 25],
      ['Midterm Exam', 20],
      ['Final Exam', 30],
    ],
  },
]

export const nextSteps = [
  { label: 'Complete Spring 2027 Schedule', complete: false, to: '/my-plan' },
  { label: 'Meet with Academic Advisor', complete: false, to: '/resources' },
  { label: 'Confirm CS 425 prerequisites', complete: false, to: '/courses/cs-425' },
  { label: 'Review alerts and deadlines', complete: true },
]
