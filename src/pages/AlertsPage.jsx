import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { alerts } from '../data/alerts.js'
import { deadlines } from '../data/deadlines.js'
import '../styles/AlertsPage.css'

const resolvedItems = [
  {
    id: 'gpa-standing',
    title: 'GPA standing',
    detail: 'Your 3.45 cumulative GPA keeps you in good academic standing.',
  },
  {
    id: 'spring-enrollment',
    title: 'Spring enrollment',
    detail: 'Your Spring 2026 schedule has 15 credits and no time conflicts.',
  },
]

function getPriorityLabel(priority) {
  if (priority === 'high') {
    return 'Urgent'
  }

  if (priority === 'medium') {
    return 'Upcoming'
  }

  return 'Later'
}

function AlertsPage() {
  const urgentDeadlines = deadlines.filter((deadline) => deadline.priority === 'high')

  return (
    <div className="alerts-page">
      <PageHeader
        title="Alerts and Errors"
        description="Resolve academic blockers, registration holds, and deadline risks before they affect your plan."
        actions={[
          { label: 'Find Support', to: '/resources', icon: 'support' },
          { label: 'Back to Dashboard', to: '/dashboard', icon: 'home' },
        ]}
      />

      <section className="alerts-hero" aria-label="Current alert summary">
        <div className="alerts-hero-copy">
          <span className="alerts-hero-icon">
            <Icon name="alert" size={22} />
          </span>
          <div>
            <strong>{alerts.length} items need attention before registration</strong>
            <p>
              Start with the advisor hold, then check the prerequisite warning so
              your planned courses stay on track.
            </p>
          </div>
        </div>

        <div className="alerts-hero-stats" aria-label="Alert counts">
          <div>
            <span>Active alerts</span>
            <strong>{alerts.length}</strong>
          </div>
          <div>
            <span>Urgent deadlines</span>
            <strong>{urgentDeadlines.length}</strong>
          </div>
        </div>
      </section>

      <div className="alerts-layout">
        <section className="alerts-panel active-alerts" aria-labelledby="active-alerts-title">
          <div className="alerts-section-title">
            <div>
              <h2 id="active-alerts-title">Needs Attention</h2>
              <p>Each item includes the impact and the next recovery step.</p>
            </div>
            <span className="alert-count-pill">{alerts.length} open</span>
          </div>

          <div className="alert-card-list">
            {alerts.map((alert) => (
              <article className={`alert-card ${alert.severity}`} key={alert.id}>
                <div className="alert-card-header">
                  <span className={`alert-card-icon ${alert.severity}`}>
                    <Icon name="alert" size={18} />
                  </span>

                  <div>
                    <div className="alert-title-row">
                      <h3>{alert.title}</h3>
                      <span className="alert-status-pill">{alert.statusLabel}</span>
                    </div>
                    <p>{alert.detail}</p>
                  </div>
                </div>

                <div className="alert-impact-grid">
                  <div>
                    <span>Impact</span>
                    <strong>{alert.impact}</strong>
                  </div>
                  <div>
                    <span>Recovery action</span>
                    <strong>{alert.recoveryAction}</strong>
                  </div>
                </div>

                <ol className="recovery-list" aria-label={`${alert.title} recovery steps`}>
                  {alert.recoverySteps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>

                <div className="alert-actions">
                  <Link className="button-primary" to={alert.primaryAction.to}>
                    {alert.primaryAction.label}
                  </Link>
                  <Link className="button-secondary" to={alert.secondaryAction.to}>
                    {alert.secondaryAction.label}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="alerts-side-stack">
          <section className="alerts-panel deadline-panel" id="deadlines" aria-labelledby="deadlines-title">
            <div className="alerts-section-title compact">
              <div>
                <h2 id="deadlines-title">
                  <Icon name="calendar" size={20} />
                  Upcoming Deadlines
                </h2>
                <p>Dates that need action soon.</p>
              </div>
            </div>

            <div className="deadline-alert-list">
              {deadlines.map((deadline) => (
                <article className={`deadline-alert-card ${deadline.priority}`} key={deadline.id}>
                  <div className="deadline-alert-top">
                    <span className="deadline-category">{deadline.category}</span>
                    <span className={`deadline-priority ${deadline.priority}`}>
                      {getPriorityLabel(deadline.priority)}
                    </span>
                  </div>

                  <h3>{deadline.title}</h3>
                  <p>{deadline.description}</p>

                  <div className="deadline-date-row">
                    <span>{deadline.dueDate}</span>
                    <strong>{deadline.daysRemaining}</strong>
                  </div>

                  <Link className="button-secondary full" to={deadline.actionTo}>
                    {deadline.actionLabel}
                  </Link>
                </article>
              ))}
            </div>
          </section>

          <section className="alerts-panel resolved-panel" aria-labelledby="resolved-title">
            <div className="resolved-title">
              <span className="resolved-icon">
                <Icon name="check" size={18} />
              </span>
              <div>
                <h2 id="resolved-title">No Action Needed</h2>
                <p>These checks are currently clear.</p>
              </div>
            </div>

            <div className="resolved-list">
              {resolvedItems.map((item) => (
                <div className="resolved-item" key={item.id}>
                  <Icon name="check" size={15} />
                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  )
}

export default AlertsPage
