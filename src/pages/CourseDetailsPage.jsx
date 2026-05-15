import { Link, useNavigate, useParams } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import { courses } from '../data/courses.js'
import '../styles/myplan.css'
import '../styles/CoursePlanningPage.css'

const normalizeCourseId = (value) => value.toLowerCase().replace(/\s+/g, '-')

function CourseDetailsPage({
  plannedCourses = [],
  setPlannedCourses = () => {},
}) {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const course = courses.find(
    (item) => item.id === courseId || normalizeCourseId(item.code) === courseId
  )

  if (!course) {
    return (
      <div className="academic-page my-plan-page course-planning-page course-detail-page">
        <main className="academic-main course-main">
          <Link className="course-back-btn" to="/plan-courses">
            <Icon name="arrowLeft" size={16} />
            Back to Courses
          </Link>

          <section className="detail-panel course-not-found">
            <h1>Course not found</h1>
            <p>
              This course is not in the current planning catalog.
            </p>
            <Link className="view-btn" to="/plan-courses">
              Browse Courses
            </Link>
          </section>
        </main>
      </div>
    )
  }

  const isPlanned = plannedCourses.some(
    (plannedCourse) => plannedCourse.code === course.code
  )

  const handleAddToPlan = () => {
    if (!course.eligible) {
      return
    }

    setPlannedCourses((currentCourses) => {
      const current = currentCourses ?? []
      const alreadyAdded = current.some(
        (plannedCourse) => plannedCourse.code === course.code
      )

      return alreadyAdded ? current : [...current, course]
    })

    navigate('/my-plan')
  }

  const primaryActionLabel = !course.eligible
    ? 'Prerequisites Required'
    : isPlanned
      ? 'View in My Plan'
      : 'Add to My Plan'

  return (
    <div className="academic-page my-plan-page course-planning-page course-detail-page">
      <main className="academic-main course-main">
        <Link className="course-back-btn" to="/plan-courses">
          <Icon name="arrowLeft" size={16} />
          Back to Courses
        </Link>

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
                <Icon name={course.eligible ? 'check' : 'alert'} size={14} />
                {course.eligible ? 'Eligible to Enroll' : 'Prerequisites Not Met'}
              </span>
            </div>

            <h2>{course.name}</h2>

            <p>
              {course.department} • {course.credits} Credits
            </p>
          </div>

          <div className="course-detail-actions">
            <button className="secondary-btn with-icon" type="button">
              <Icon name="download" size={16} />
              Syllabus
            </button>

            <button
              className={
                course.eligible
                  ? 'view-btn course-detail-primary'
                  : 'view-btn course-detail-primary disabled'
              }
              disabled={!course.eligible}
              onClick={handleAddToPlan}
              type="button"
            >
              {primaryActionLabel}
            </button>
          </div>
        </header>

        {!course.eligible && (
          <section className="prerequisite-warning" aria-label="Prerequisites not met">
            <div className="prerequisite-warning-title">
              <Icon name="alert" size={16} />
              <strong>Prerequisites Not Met</strong>
            </div>

            <p>You need to complete the following courses before enrolling:</p>

            <div className="missing-prerequisite-list">
              {(course.prerequisiteWarning?.courses ?? []).map((prerequisite) => (
                <span className="missing-prerequisite-chip" key={prerequisite}>
                  {prerequisite}
                </span>
              ))}
            </div>

            <p>{course.prerequisiteWarning?.note}</p>
          </section>
        )}

        <section className="course-detail-stats" aria-label="Course facts">
          <DetailStat
            icon={<Icon name="users" size={22} />}
            label="Instructor"
            tone="purple"
            value={course.instructor}
          />
          <DetailStat
            icon={<Icon name="clock" size={22} />}
            label="Schedule"
            tone="blue"
            value={course.schedule}
          />
          <DetailStat
            icon={<Icon name="bookOpen" size={22} />}
            label="Availability"
            tone="green"
            value={course.availability}
          />
          <DetailStat
            icon={<Icon name="star" size={22} />}
            label="Rating"
            tone="amber"
            value={course.rating}
          />
        </section>

        <div className="segmented-tabs detail-tabs">
          <button className="segmented-tab active" type="button">
            Overview
          </button>
          <button className="segmented-tab" type="button">
            Requirements
          </button>
          <button className="segmented-tab" type="button">
            Schedule
          </button>
        </div>

        <section className="detail-panel">
          <h2>Course Description</h2>
          <p>{course.description}</p>
        </section>

        <section className="detail-panel">
          <h2>Learning Outcomes</h2>
          <ul className="learning-list">
            {course.outcomes.map((outcome) => (
              <li key={outcome}>
                <Icon name="check" size={18} />
                {outcome}
              </li>
            ))}
          </ul>
        </section>

        <div className="detail-grid">
          <section className="detail-panel">
            <h2>Required Textbooks</h2>
            {course.textbooks.map((textbook) => (
              <article className="textbook-card" key={textbook.title}>
                <h3>{textbook.title}</h3>
                <p>{textbook.author}</p>
              </article>
            ))}
          </section>

          <section className="detail-panel">
            <h2>Grading Breakdown</h2>
            {course.grading.map(([label, percent]) => (
              <div className="grade-item" key={label}>
                <div>
                  <span>{label}</span>
                  <strong>{percent}%</strong>
                </div>
                <div className="grade-bar" aria-hidden="true">
                  <span style={{ width: `${percent}%` }} />
                </div>
              </div>
            ))}
          </section>
        </div>
      </main>
    </div>
  )
}

function DetailStat({ icon, label, tone, value }) {
  return (
    <article className={`detail-stat-card ${tone}`}>
      <span className={`detail-stat-icon ${tone}`}>{icon}</span>
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </article>
  )
}

export default CourseDetailsPage
