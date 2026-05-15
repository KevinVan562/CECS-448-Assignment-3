import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import { courses } from '../data/courses.js'
import '../styles/myplan.css'
import '../styles/CoursePlanningPage.css'

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
  {
    code: 'STAT 400',
    name: 'Statistics',
    instructor: 'Dr. Lisa Anderson',
    schedule: 'MWF 11:00-11:50',
    location: 'Science 118',
    credits: '3 credits',
  },
  {
    code: 'ECON 102',
    name: 'Microeconomics',
    instructor: 'Dr. Aaron Patel',
    schedule: 'TR 11:00-12:15',
    location: 'Business 214',
    credits: '3 credits',
  },
  {
    code: 'ART 150',
    name: 'Digital Art',
    instructor: 'Prof. Nina Brooks',
    schedule: 'MW 15:00-16:15',
    location: 'Arts 102',
    credits: '3 credits',
  },
]

const currentScheduleCredits = currentSchedule.reduce(
  (total, course) => total + Number.parseInt(course.credits, 10),
  0
)

const getPrerequisiteStatus = (req) =>
  req.includes('missing') ? 'not-met' : 'met'

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
    <div className="academic-page my-plan-page course-planning-page">
      <main className="academic-main course-main">
        <header className="academic-header course-top">
          <div>
            <h1>Course Planning</h1>
            <p>Browse and plan your courses</p>
          </div>
        </header>

        <div className="segmented-tabs course-tabs">
          <button
            className={activeTab === 'browse' ? 'segmented-tab active' : 'segmented-tab'}
            onClick={() => setActiveTab('browse')}
          >
            Browse Courses
          </button>

          <button
            className={activeTab === 'schedule' ? 'segmented-tab active' : 'segmented-tab'}
            onClick={() => setActiveTab('schedule')}
          >
            Current Schedule
            <span className="segmented-tab-badge">{currentSchedule.length}</span>
          </button>
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
                        <h2>
                          {course.code} - {course.name}
                        </h2>

                        <span
                          className={
                            course.eligible
                              ? 'prereq-status met'
                              : 'prereq-status not-met'
                          }
                        >
                          <Icon
                            name={course.eligible ? 'check' : 'alert'}
                            size={14}
                          />

                          {course.eligible
                            ? 'Prerequisites Met'
                            : 'Prerequisites Not Met'}
                        </span>
                      </div>

                      <p>{course.description}</p>
                    </div>

                    <Link
                      className="view-btn"
                      to={`/courses/${course.id}`}
                    >
                      View Details
                    </Link>
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
                            className={
                              status === 'not-met'
                                ? 'prereq-chip not-met'
                                : 'prereq-chip met'
                            }
                          >
                            <Icon
                              name={status === 'not-met' ? 'alert' : 'check'}
                              size={12}
                            />

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
              <p>{currentScheduleCredits} credits total</p>
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
