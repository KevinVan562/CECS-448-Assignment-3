import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import '../styles/welcome.css'

const yearOptions = [
  { id: 'freshman', label: 'Freshman (1st year)', summary: 'Freshman' },
  { id: 'sophomore', label: 'Sophomore (2nd year)', summary: 'Sophomore' },
  { id: 'junior', label: 'Junior (3rd year)', summary: 'Junior' },
  { id: 'senior', label: 'Senior (4th year)', summary: 'Senior' },
]

const goalOptions = [
  'Graduate on time',
  'Maintain a strong GPA',
  'Participate in research',
  'Get an internship or co-op',
  'Study abroad',
  'Join honors program',
  'Join student organizations',
  'Prepare for graduate school',
]

function WelcomePage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [profile, setProfile] = useState({
    name: '',
    major: '',
    year: 'freshman',
    goals: [],
  })

  const progress = step * 25
  const selectedYear = yearOptions.find((year) => year.id === profile.year)
  const firstName = useMemo(() => profile.name.trim().split(/\s+/)[0] || '', [profile.name])

  const updateProfile = (field, value) => {
    setProfile((currentProfile) => ({
      ...currentProfile,
      [field]: value,
    }))
  }

  const toggleGoal = (goal) => {
    setProfile((currentProfile) => {
      const goals = currentProfile.goals.includes(goal)
        ? currentProfile.goals.filter((selectedGoal) => selectedGoal !== goal)
        : [...currentProfile.goals, goal]

      return {
        ...currentProfile,
        goals,
      }
    })
  }

  const goBack = () => {
    setStep((currentStep) => Math.max(1, currentStep - 1))
  }

  const continueFlow = () => {
    if (step === 4) {
      navigate('/dashboard')
      return
    }

    setStep((currentStep) => Math.min(4, currentStep + 1))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    continueFlow()
  }

  return (
    <main className="welcome-screen">
      <section className="welcome-card" aria-labelledby="welcome-title">
        <div className="welcome-progress-header">
          <span>Step {step} of 4</span>
          <span>{progress}%</span>
        </div>

        <div
          className="welcome-progress-bar"
          role="progressbar"
          aria-label="Welcome flow progress"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={progress}
        >
          <span style={{ width: `${progress}%` }} />
        </div>

        <form className="welcome-form" onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              <div className="welcome-step-heading">
                <span className="welcome-icon-token purple">
                  <Icon name="cap" size={32} />
                </span>
                <h1 id="welcome-title">Welcome to Your Academic Journey</h1>
                <p>
                  We're here to help you navigate college as a first-generation student.
                  Let's set up your personalized academic plan.
                </p>
              </div>

              <div className="welcome-fields">
                <label className="welcome-field">
                  <span>What's your name?</span>
                  <input
                    type="text"
                    value={profile.name}
                    placeholder="Enter your full name"
                    onChange={(event) => updateProfile('name', event.target.value)}
                  />
                </label>

                <label className="welcome-field">
                  <span>What's your major or area of interest?</span>
                  <input
                    type="text"
                    value={profile.major}
                    placeholder="e.g., Computer Science, Biology, Undecided"
                    onChange={(event) => updateProfile('major', event.target.value)}
                  />
                </label>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="welcome-step-heading compact">
                <span className="welcome-icon-token purple">
                  <Icon name="calendar" size={32} />
                </span>
                <h1 id="welcome-title">Academic Standing</h1>
                <p>This helps us customize your academic roadmap</p>
              </div>

              <fieldset className="welcome-choice-group">
                <legend>What year are you in?</legend>
                {yearOptions.map((year) => (
                  <label
                    className={
                      profile.year === year.id
                        ? 'welcome-option welcome-option-selected'
                        : 'welcome-option'
                    }
                    key={year.id}
                  >
                    <input
                      type="radio"
                      name="academic-year"
                      checked={profile.year === year.id}
                      onChange={() => updateProfile('year', year.id)}
                    />
                    <span>{year.label}</span>
                  </label>
                ))}
              </fieldset>
            </>
          )}

          {step === 3 && (
            <>
              <div className="welcome-step-heading compact">
                <span className="welcome-icon-token purple">
                  <Icon name="target" size={32} />
                </span>
                <h1 id="welcome-title">Your Academic Goals</h1>
                <p>Select all that apply - we'll help you achieve them</p>
              </div>

              <fieldset className="welcome-choice-group">
                <legend className="sr-only">Select academic goals</legend>
                {goalOptions.map((goal) => (
                  <label
                    className={
                      profile.goals.includes(goal)
                        ? 'welcome-option welcome-option-selected'
                        : 'welcome-option'
                    }
                    key={goal}
                  >
                    <input
                      type="checkbox"
                      checked={profile.goals.includes(goal)}
                      onChange={() => toggleGoal(goal)}
                    />
                    <span>{goal}</span>
                  </label>
                ))}
              </fieldset>
            </>
          )}

          {step === 4 && (
            <>
              <div className="welcome-step-heading complete">
                <span className="welcome-icon-token green">
                  <Icon name="check" size={32} />
                </span>
                <h1 id="welcome-title">{firstName ? `All Set, ${firstName}!` : 'All Set!'}</h1>
                <p>Your personalized academic plan is ready. Let's start your journey to success.</p>
              </div>

              <section className="welcome-profile" aria-label="Your profile summary">
                <h2>Your Profile</h2>
                <dl>
                  <div>
                    <dt>Major:</dt>
                    <dd>{profile.major.trim() || 'Not specified'}</dd>
                  </div>
                  <div>
                    <dt>Year:</dt>
                    <dd>{selectedYear?.summary ?? 'Freshman'}</dd>
                  </div>
                  <div>
                    <dt>Goals:</dt>
                    <dd>{profile.goals.length} selected</dd>
                  </div>
                </dl>
              </section>
            </>
          )}

          <div className="welcome-actions">
            {step > 1 ? (
              <button className="button-secondary" type="button" onClick={goBack}>
                Back
              </button>
            ) : (
              <span aria-hidden="true" />
            )}
            <button className="button-primary" type="submit">
              {step === 4 ? 'Get Started' : 'Continue'}
            </button>
          </div>
        </form>
      </section>
    </main>
  )
}

export default WelcomePage
