import React, { useState } from 'react'
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
]

const getPrerequisiteStatus = (req) =>
  req.includes('missing') ? 'not-met' : 'met'

const getPrerequisiteLabel = (req) =>
  req.replace(' ✓', '').replace(' (missing)', '')

function CoursePlanningPage({
  plannedCourses,
  setPlannedCourses,
  goToMyPlan,
}) {
  const [activeTab, setActiveTab] = useState('browse')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCourse, setSelectedCourse] = useState(null)

  const addToPlan = (course) => {
    const alreadyAdded = plannedCourses.some(
      (plannedCourse) => plannedCourse.code === course.code
    )

    if (!alreadyAdded) {
      setPlannedCourses([...plannedCourses, course])
    }

    goToMyPlan()
  }

  const filteredCourses = courses.filter((course) => {
    const text = `${course.code} ${course.name} ${course.description} ${course.instructor}`

    return text.toLowerCase().includes(searchTerm.toLowerCase())
  })

  if (selectedCourse) {
    return (
      <CourseDetails
        course={selectedCourse}
        onBack={() => setSelectedCourse(null)}
        onAddToPlan={addToPlan}
      />
    )
  }

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

          <span>{plannedCourses.length}</span>
        </div>

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
                  <strong>{course.availability}</strong>
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
      </main>
    </div>
  )
}

function CourseDetails({
  course,
  onBack,
  onAddToPlan,
}) {
  return (
    <div className="my-plan-page course-planning-page">
      <main className="course-main">
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
              Add to My Plan
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