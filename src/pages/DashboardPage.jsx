import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { alerts } from '../data/alerts.js'
import { nextSteps } from '../data/courses.js'
import { deadlines } from '../data/deadlines.js'

function DashboardPage() {
  return (
    <>
      <PageHeader title="Welcome back!" description="Here's your academic overview" />

      <section className="notice-stack" aria-label="Important alerts">
        {alerts.map((alert) => (
          <article className={`notice-banner ${alert.severity}`} key={alert.id}>
            <div className="notice-copy">
              <Icon name="alert" size={16} />
              <div>
                <strong>{alert.title}</strong>
                <span>{alert.detail}</span>
              </div>
            </div>
            <Link className="button-secondary compact" to={alert.to}>
              {alert.actionLabel}
            </Link>
          </article>
        ))}
      </section>

      <section className="stat-grid" aria-label="Academic progress summary">
        <article className="stat-card purple">
          <div className="stat-card-header">
            <div>
              <span>Degree Progress</span>
              <strong>64 / 120</strong>
              <p>credits completed</p>
            </div>
            <div className="icon-token purple">
              <Icon name="trend" size={22} />
            </div>
          </div>
          <div className="progress-bar" aria-hidden="true">
            <span style={{ width: '53%' }} />
          </div>
        </article>

        <article className="stat-card green">
          <div className="stat-card-header">
            <div>
              <span>Current GPA</span>
              <strong>3.45</strong>
              <p>4.0 scale</p>
            </div>
            <div className="icon-token green">
              <Icon name="check" size={22} />
            </div>
          </div>
          <p className="positive-note">+0.12 from last semester</p>
        </article>

        <article className="stat-card blue">
          <div className="stat-card-header">
            <div>
              <span>Enrolled Credits</span>
              <strong>15</strong>
              <p>Spring 2026</p>
            </div>
            <div className="icon-token blue">
              <Icon name="bookOpen" size={22} />
            </div>
          </div>
          <Link className="text-link" to="/my-plan">
            View schedule -&gt;
          </Link>
        </article>
      </section>

      <section className="dashboard-grid">
        <article className="panel">
          <div className="panel-title-row">
            <h2>Next Steps</h2>
            <span className="count-pill">3 pending</span>
          </div>
          <div className="task-list">
            {nextSteps.map((step) => {
              const content = (
                <>
                  <span className="task-check">
                    {step.complete && <Icon name="check" size={14} />}
                  </span>
                  <span>{step.label}</span>
                  {!step.complete && step.to && <span className="task-arrow">-&gt;</span>}
                </>
              )

              return step.to && !step.complete ? (
                <Link className="task-item task-link" key={step.label} to={step.to}>
                  {content}
                </Link>
              ) : (
                <div className={step.complete ? 'task-item complete' : 'task-item'} key={step.label}>
                  {content}
                </div>
              )
            })}
          </div>
          <Link className="button-secondary full" to="/my-plan">
            View Full Plan
          </Link>
        </article>

        <article className="panel">
          <div className="panel-title-row">
            <h2>
              <Icon name="clock" size={20} />
              Upcoming Deadlines
            </h2>
          </div>
          <div className="deadline-list">
            {deadlines.map((deadline) => (
              <div className="deadline-card" key={deadline.id}>
                <div>
                  <strong>{deadline.title}</strong>
                  <span>{deadline.dueDate}</span>
                </div>
                <span className={deadline.priority === 'high' ? 'day-pill urgent' : 'day-pill'}>
                  {deadline.daysRemaining}
                </span>
              </div>
            ))}
          </div>
          <Link className="button-secondary full with-icon" to="/alerts">
            <Icon name="calendar" size={16} />
            View All Deadlines
          </Link>
        </article>
      </section>

      <section className="panel quick-actions">
        <h2>Quick Actions</h2>
        <div className="quick-grid">
          <Link className="button-secondary with-icon" to="/my-plan">
            <Icon name="calendar" size={16} />
            View My Plan
          </Link>
          <Link className="button-secondary with-icon" to="/plan-courses">
            <Icon name="bookOpen" size={16} />
            Browse Courses
          </Link>
          <Link className="button-secondary with-icon" to="/resources">
            <Icon name="support" size={16} />
            Get Support
          </Link>
          <Link className="button-secondary with-icon" to="/alerts">
            <Icon name="alert" size={16} />
            Alerts & Deadlines
          </Link>
        </div>
      </section>
    </>
  )
}

export default DashboardPage
