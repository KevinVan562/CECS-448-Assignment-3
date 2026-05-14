import { useState } from 'react'
import Icon from '../components/Icon.jsx'
import '../styles/myplan.css'
import '../styles/CoursePlanningPage.css'

const courses = [
  {
    code: 'CS 410',
    name: 'Operating Systems',
    description: 'Study of operating system design and implementation.',
    instructor: 'Dr. Sarah Johnson',
    schedule: 'MWF 10:00-10:50',
    availability: '12 / 30 seats',
    rating: '4.5 / 5.0',
    eligible: true,
    prereqs: ['CS 301 ✓', 'CS 250 ✓'],
  },
  {
    code: 'CS 425',
    name: 'Machine Learning',
    description: 'Introduction to machine learning algorithms and applications.',
    instructor: 'Dr. Michael Chen',
    schedule: 'TR 13:00-14:15',
    availability: '5 / 25 seats',
    rating: '4.8 / 5.0',
    eligible: false,
    prereqs: ['CS 301 ✓', 'STAT 400 (missing)'],
  },
  {
    code: 'CS 360',
    name: 'Computer Networks',
    description: 'Principles of computer networking and internet protocols.',
    instructor: 'Dr. Emily Rodriguez',
    schedule: 'MWF 14:00-14:50',
    availability: '18 / 30 seats',
    rating: '4.3 / 5.0',
    eligible: true,
    prereqs: ['CS 250 ✓'],
  },
  {
    code: 'MATH 241',
    name: 'Linear Algebra',
    description: 'Vectors, matrices, linear transformations, and eigenvalues.',
    instructor: 'Dr. Robert Kim',
    schedule: 'TR 10:00-11:15',
    availability: '8 / 35 seats',
    rating: '4.1 / 5.0',
    eligible: true,
    prereqs: ['MATH 142 ✓'],
  },
  {
    code: 'STAT 400',
    name: 'Statistics',
    description: 'Probability theory and statistical inference.',
    instructor: 'Dr. Lisa Anderson',
    schedule: 'MWF 11:00-11:50',
    availability: '15 / 40 seats',
    rating: '4.4 / 5.0',
    eligible: true,
    prereqs: ['MATH 142 ✓'],
  },
]

const currentSchedule = [
  {
    code: 'CS 320',
    name: 'Database Systems',
    instructor: 'Dr. James Wilson',
    schedule: 'TR 09:00-10:15',
    location: 'Engineering 201',
    credits: '3 credits',
  },
  {
    code: 'CS 340',
    name: 'Software Engineering',
    instructor: 'Dr. Maria Garcia',
    schedule: 'MWF 13:00-13:50',
    location: 'Engineering 305',
    credits: '3 credits',
  },
]

const getPrerequisiteStatus = (req) => (req.includes('missing') ? 'not-met' : 'met')

const getPrerequisiteLabel = (req) =>
  req.replace(' ✓', '').replace(' (missing)', '')

function CoursePlanningPage() {
  const [activeTab, setActiveTab] = useState('browse')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCourses = courses.filter((course) => {
    const text = `${course.code} ${course.name} ${course.description} ${course.instructor}`
    return text.toLowerCase().includes(searchTerm.toLowerCase())
  })

  return (
    <div className="my-plan-page course-planning-page">
      <main className="course-main">
        <header className="course-top">
          <h1>Course Planning</h1>
          <p>Browse and plan your courses</p>
        </header>

        <div className="course-tabs">
          <button
            className={activeTab === 'browse' ? 'active' : ''}
            onClick={() => setActiveTab('browse')}
          >
            Browse Courses
          </button>

          <button
            className={activeTab === 'schedule' ? 'active' : ''}
            onClick={() => setActiveTab('schedule')}
          >
            Current Schedule
          </button>

          <span>2</span>
        </div>

        {activeTab === 'browse' ? (
          <>
            <section className="course-search-box">
              <div className="course-search-input">
                <span>⌕</span>
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <button>▽ Filters</button>
            </section>

            <section className="course-list">
              {filteredCourses.map((course) => (
                <article className="figma-course-card" key={course.code}>
                  <div className="figma-course-header">
                    <div>
                      <div className="figma-title-row">
                        <h2>{course.code} - {course.name}</h2>

                        <span className={course.eligible ? 'prereq-status met' : 'prereq-status not-met'}>
                          <Icon name={course.eligible ? 'check' : 'alert'} size={14} />
                          {course.eligible ? 'Prerequisites Met' : 'Prerequisites Not Met'}
                        </span>
                      </div>

                      <p>{course.description}</p>
                    </div>

                    <button className="view-btn">View Details</button>
                  </div>

                  <div className="figma-info-row">
                    <div>
                      <span>♙ Instructor</span>
                      <strong>{course.instructor}</strong>
                    </div>

                    <div>
                      <span>◷ Schedule</span>
                      <strong>{course.schedule}</strong>
                    </div>

                    <div>
                      <span>▱ Availability</span>
                      <strong className={!course.eligible ? 'orange-text' : ''}>
                        {course.availability}
                      </strong>
                    </div>

                    <div>
                      <span>☆ Rating</span>
                      <strong>{course.rating}</strong>
                    </div>
                  </div>

                  <div className="figma-prereqs">
                    <p>Prerequisites:</p>

                    <div>
                      {course.prereqs.map((req) => {
                        const status = getPrerequisiteStatus(req)

                        return (
                          <span
                            key={req}
                            className={status === 'not-met' ? 'prereq-chip not-met' : 'prereq-chip met'}
                          >
                            <Icon name={status === 'not-met' ? 'alert' : 'check'} size={12} />
                            {getPrerequisiteLabel(req)}
                          </span>
                        )
                      })}
                    </div>
                  </div>
                </article>
              ))}
            </section>
          </>
        ) : (
          <section className="schedule-card">
            <div className="schedule-title">
              <h2>Spring 2026 Schedule</h2>
              <p>15 credits total</p>
            </div>

            {currentSchedule.map((course) => (
              <div className="schedule-row" key={course.code}>
                <div>
                  <h3>{course.code} - {course.name}</h3>
                  <span>Instructor</span>
                  <strong>{course.instructor}</strong>
                </div>

                <div>
                  <span>Schedule</span>
                  <strong>{course.schedule}</strong>
                </div>

                <div>
                  <span>Location</span>
                  <strong>{course.location}</strong>
                </div>

                <em>{course.credits}</em>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  )
}

export default CoursePlanningPage
