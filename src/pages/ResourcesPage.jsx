import { useState } from 'react'
import Icon from '../components/Icon.jsx'
import { categories, contact, crisisHelplines, emergency } from '../data/resources.js'
import '../styles/myplan.css'
import '../styles/ResourcesPage.css'

function ResourcesPage() {
  const [crisisOpen, setCrisisOpen] = useState(false)

  return (
    <div className="academic-page my-plan-page resources-page">
      <main className="academic-main resources-main">
        <header className="academic-header resources-top">
          <div>
            <h1>Resources & Support</h1>
            <p>Find help with academics, finances, and personal well-being</p>
          </div>
        </header>

        <section className="emergency-banner">
          <div className="banner-copy">
            <div className="banner-icon">
              <Icon name="alert" size={20} />
            </div>

            <div>
              <strong>{emergency.title}</strong>
              <span>{emergency.description}</span>
            </div>
          </div>

          <button
            className="emergency-btn"
            onClick={() => setCrisisOpen((open) => !open)}
            aria-expanded={crisisOpen}
          >
            {crisisOpen ? 'Hide Helplines' : emergency.actionLabel} {crisisOpen ? '↑' : '↓'}
          </button>
        </section>

        {crisisOpen && (
          <section className="crisis-panel" aria-label="National crisis helplines">
            <p className="crisis-note">{emergency.note}</p>

            <ul className="crisis-list">
              {crisisHelplines.map((line) => (
                <li className="crisis-card" key={line.id}>
                  <div>
                    <strong>{line.name}</strong>
                    <span>{line.description}</span>
                  </div>

                  <div className="crisis-actions">
                    {line.actions.map((action) => (
                      <a
                        className="crisis-action"
                        href={action.href}
                        key={action.label}
                        target={action.type === 'web' ? '_blank' : undefined}
                        rel={action.type === 'web' ? 'noreferrer' : undefined}
                      >
                        {action.label}
                      </a>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="resources-grid">
          {categories.map((cat) => (
            <article className={`category-card ${cat.color}`} key={cat.id}>
              <div className="category-header">
                <div className="category-icon">
                  <Icon name={cat.icon} size={22} />
                </div>

                <div>
                  <h2>{cat.title}</h2>
                  <p>{cat.subtitle}</p>
                </div>
              </div>

              <ul className="item-list">
                {cat.items.map((item) => (
                  <li key={item.id}>
                    <div className="item-row support-row">
                      <div>
                        <strong>{item.title}</strong>
                        <span>{item.description}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section className="quick-contact">
          <h3>Quick Contact</h3>

          <div className="contact-grid">
            {contact.map((c) => (
              <div className="contact-card" key={c.id}>
                <span className="contact-symbol">{c.symbol}</span>

                <div>
                  <strong>{c.label}</strong>
                  <span>{c.value}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default ResourcesPage
