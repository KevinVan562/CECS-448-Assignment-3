import { useState } from 'react'
import Icon from '../components/Icon.jsx'
import '../styles/myplan.css'
import '../styles/CoursePlanningPage.css'

const courses = [
  {
    code: 'CS 410',
    name: 'Operating Systems',
    department: 'Computer Science',
    credits: 3,
    description:
      'Study of operating system design and implementation including process management, memory management, file systems, and I/O systems.',
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
    ],
    grading: [
      ['Programming Projects', 50],
      ['Midterm Exam', 20],
      ['Final Exam', 25],
      ['Participation', 5],
    ],
  },
  {
    code: 'CS 425',
    name: 'Machine Learning',
    department: 'Computer Science',
    credits: 3,
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
    department: 'Computer Science',
    credits: 3,
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
    department: 'Mathematics',
    credits: 3,
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
    department: 'Statistics',
    credits: 3,
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

function CoursePlanningPage({
  plannedCourses = [],
  setPlannedCourses = () => {},
  goToMyPlan = () => {},
}) {
  const [activeTab, setActiveTab] = useState('browse')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCourse, setSelectedCourse] = useState(null)

  const addToPlan = (course) => {
    setPlannedCourses((currentCourses) => {
      const current = currentCourses ?? []
      const alreadyAdded = current.some(
        (plannedCourse) => plannedCourse.code === course.code
      )

      return alreadyAdded ? current : [...current, course]
    })

    goToMyPlan()
  }

  const filteredCourses = courses.filter((course) => {
    const text = `${course.code} ${course.name} ${course.description} ${course.instructor}`

    return text.toLowerCase().includes(searchTerm.toLowerCase())
  })

  const selectedCourseIsPlanned = selectedCourse
    ? plannedCourses.some((course) => course.code === selectedCourse.code)
    : false

  if (selectedCourse) {
    return (
      <CourseDetails
        course={selectedCourse}
        isPlanned={selectedCourseIsPlanned}
        onBack={() => setSelectedCourse(null)}
        onAddToPlan={addToPlan}
      />
    )
  }

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

                    <button
                      className="view-btn"
                      onClick={() => setSelectedCourse(course)}
                    >
                      View Details
                    </button>
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

function CourseDetails({
  course,
  isPlanned,
  onBack,
  onAddToPlan,
}) {
  return (
    <div className="academic-page my-plan-page course-planning-page">
      <main className="academic-main course-main">
        <button
          className="course-back-btn"
          onClick={onBack}
        >
          ← Back to Courses
        </button>

        <header className="course-detail-header">
          <div>
            <div className="figma-title-row">
              <h1>{course.code}</h1>

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
                  ? 'Eligible to Enroll'
                  : 'Prerequisites Not Met'}
              </span>
            </div>

            <h2>{course.name}</h2>

            <p>
              {course.department} • {course.credits} Credits
            </p>
          </div>

          <div className="course-detail-actions">
            <button className="secondary-btn">
              ↓ Syllabus
            </button>

            <button
              className="view-btn"
              onClick={() => onAddToPlan(course)}
            >
              {isPlanned ? 'View in My Plan' : 'Add to My Plan'}
            </button>
          </div>
        </header>

        <section className="course-detail-stats">
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
            <strong>{course.availability}</strong>
          </div>

          <div>
            <span>☆ Rating</span>
            <strong>{course.rating}</strong>
          </div>
        </section>
      </main>
    </div>
  )
}

export default CoursePlanningPage
