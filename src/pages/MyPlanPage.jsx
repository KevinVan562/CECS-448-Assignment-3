import { useState } from 'react'
import Icon from '../components/Icon.jsx'
import '../styles/myplan.css'

const semesters = [
  {
    term: 'Fall 2024',
    status: 'Completed',
    credits: '15 credits • 3.4 GPA',
    type: 'done',
    courses: [
      { code: 'ENG 101', name: 'English Composition I', credits: '3 credits', grade: 'A-' },
      { code: 'MATH 141', name: 'Calculus I', credits: '4 credits', grade: 'B+' },
      { code: 'CS 101', name: 'Intro to Computer Science', credits: '3 credits', grade: 'A' },
      { code: 'HIST 110', name: 'World History', credits: '3 credits', grade: 'B' },
      { code: 'PE 100', name: 'Physical Education', credits: '2 credits', grade: 'A' },
    ],
  },
  {
    term: 'Spring 2025',
    status: 'Completed',
    credits: '16 credits • 3.5 GPA',
    type: 'done',
    courses: [
      { code: 'ENG 102', name: 'English Composition II', credits: '3 credits', grade: 'A' },
      { code: 'MATH 142', name: 'Calculus II', credits: '4 credits', grade: 'B+' },
      { code: 'CS 201', name: 'Data Structures', credits: '3 credits', grade: 'A-' },
      { code: 'PHYS 211', name: 'Physics I', credits: '4 credits', grade: 'B' },
      { code: 'MUS 100', name: 'Music Appreciation', credits: '2 credits', grade: 'A' },
    ],
  },
  {
    term: 'Fall 2025',
    status: 'In Progress',
    credits: '15 credits',
    type: 'current',
    courses: [
      { code: 'CS 301', name: 'Algorithms', credits: '3 credits' },
      { code: 'CS 250', name: 'Computer Architecture', credits: '3 credits' },
      { code: 'MATH 241', name: 'Linear Algebra', credits: '3 credits' },
      { code: 'PHIL 101', name: 'Introduction to Philosophy', credits: '3 credits' },
      { code: 'COMM 110', name: 'Public Speaking', credits: '3 credits' },
    ],
  },
  {
    term: 'Spring 2026',
    status: 'Current',
    credits: '15 credits',
    type: 'current',
    courses: [
      { code: 'CS 320', name: 'Database Systems', credits: '3 credits' },
      { code: 'CS 340', name: 'Software Engineering', credits: '3 credits' },
      { code: 'STAT 400', name: 'Statistics', credits: '3 credits' },
      { code: 'ECON 102', name: 'Microeconomics', credits: '3 credits' },
      { code: 'ART 150', name: 'Digital Art', credits: '3 credits' },
    ],
  },
  {
    term: 'Fall 2026',
    status: 'Planned',
    credits: '15 credits',
    type: 'planned',
    hasIssue: true,
    courses: [
      { code: 'CS 410', name: 'Operating Systems', credits: '3 credits' },
      { code: 'CS 425', name: 'Machine Learning', credits: '3 credits', issue: true },
      { code: 'CS 360', name: 'Computer Networks', credits: '3 credits' },
      { code: 'PSYCH 100', name: 'Intro to Psychology', credits: '3 credits' },
      { code: 'SPAN 101', name: 'Spanish I', credits: '3 credits' },
    ],
  },
  {
    term: 'Spring 2027',
    status: 'Planned',
    credits: '15 credits',
    type: 'planned',
    courses: [
      { code: 'CS 450', name: 'Artificial Intelligence', credits: '3 credits' },
      { code: 'CS 490', name: 'Senior Capstone I', credits: '3 credits' },
      { code: 'CS 470', name: 'Computer Security', credits: '3 credits' },
      { code: 'BUS 200', name: 'Business Fundamentals', credits: '3 credits' },
      { code: 'SPAN 102', name: 'Spanish II', credits: '3 credits' },
    ],
  },
]

const majorReqs = [
  { label: 'Core Courses', value: '24 / 36 credits', percent: 67 },
  { label: 'Electives', value: '9 / 15 credits', percent: 60 },
  { label: 'Capstone', value: '0 / 6 credits', percent: 0 },
]

const geReqs = [
  { label: 'Humanities', value: '9 / 12 credits', percent: 75 },
  { label: 'Social Sciences', value: '6 / 9 credits', percent: 67 },
  { label: 'Natural Sciences', value: '8 / 8 credits', percent: 100 },
]

function MyPlanPage() {
  const [activeTab, setActiveTab] = useState('roadmap')

  return (
    <div className="my-plan-page">
      <main className="plan-main">
        <div className="plan-header">
          <div>
            <h1>My Academic Plan</h1>
            <p>Track your progress toward graduation</p>
          </div>

          <div className="plan-actions">
            <button>Share</button>
            <button>Export</button>
          </div>
        </div>

        <section className="summary-card">
          <div>
            <p>Total Credits</p>
            <h3>64 / 120</h3>
            <div className="credit-bar">
              <div></div>
            </div>
          </div>

          <div>
            <p>Cumulative GPA</p>
            <h3>3.45</h3>
            <span>On track for honors</span>
          </div>

          <div>
            <p>Expected Graduation</p>
            <h3>May 2028</h3>
            <span>4 semesters remaining</span>
          </div>
        </section>

        <section className="warning-box">
          <strong className="warning-title">
            <Icon name="alert" size={16} />
            Prerequisites Not Met
          </strong>
          <p>
            CS 425 Machine Learning in Fall 2026 requires STAT 400, which you are
            taking this semester. Make sure to pass with a C or better.
          </p>
        </section>

        <div className="tab-box">
          <button
            className={activeTab === 'roadmap' ? 'active' : ''}
            onClick={() => setActiveTab('roadmap')}
          >
            Semester Roadmap
          </button>

          <button
            className={activeTab === 'requirements' ? 'active' : ''}
            onClick={() => setActiveTab('requirements')}
          >
            Requirements
          </button>
        </div>

        {activeTab === 'roadmap' ? (
          <section className="semester-section">
            {semesters.map((semester) => (
              <div className="semester-card" key={semester.term}>
                <div className="semester-title-row">
                  <div className="semester-left">
                    <span className={`circle ${semester.type}`}>
                      {semester.type === 'done' ? '✓' : ''}
                    </span>

                    <h2>{semester.term}</h2>

                    <span className={`status ${semester.type}`}>
                      {semester.status}
                    </span>

                    {semester.hasIssue && (
                      <span className="prereq-status not-met">
                        <Icon name="alert" size={14} />
                        Prerequisites Not Met
                      </span>
                    )}
                  </div>

                  <p>{semester.credits}</p>
                </div>

                <div className="course-grid">
                  {semester.courses.map((course) => (
                    <div
                      className={`course-box ${course.issue ? 'course-warning' : ''}`}
                      key={course.code}
                    >
                      <div className="course-row">
                        <h4>{course.code}</h4>
                        {course.grade && <span>{course.grade}</span>}
                        {course.issue && (
                          <span
                            aria-label="Prerequisites Not Met"
                            className="prereq-status-icon not-met"
                            title="Prerequisites Not Met"
                          >
                            <Icon name="alert" size={14} />
                          </span>
                        )}
                      </div>

                      <p>{course.name}</p>
                      <small>{course.credits}</small>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>
        ) : (
          <section className="requirements-grid">
            <RequirementCard title="Computer Science Major" items={majorReqs} />
            <RequirementCard title="General Education" items={geReqs} />
          </section>
        )}
      </main>
    </div>
  )
}

function RequirementCard({ title, items }) {
  return (
    <div className="requirement-card">
      <h2>{title}</h2>

      {items.map((item) => (
        <div className="requirement-row" key={item.label}>
          <div className="requirement-text">
            <span>{item.label}</span>
            <span>{item.value}</span>
          </div>

          <div className="requirement-bar">
            <div style={{ width: `${item.percent}%` }}></div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MyPlanPage
