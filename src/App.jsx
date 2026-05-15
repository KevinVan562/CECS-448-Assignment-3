import React, { useState } from 'react'
import DashboardPage from './pages/DashboardPage.jsx'
import MyPlanPage from './pages/MyPlanPage.jsx'
import CoursePlanningPage from './pages/CoursePlanningPage.jsx'
import ResourcesPage from './pages/ResourcesPage.jsx'
import Icon from './components/Icon.jsx'
import './App.css'

function App() {
  const [activePage, setActivePage] = useState('courses')
  const [plannedCourses, setPlannedCourses] = useState([])

  const renderPage = () => {
    if (activePage === 'dashboard') return <DashboardPage />

    if (activePage === 'my-plan') {
      return <MyPlanPage plannedCourses={plannedCourses} />
    }

    if (activePage === 'courses') {
      return (
        <CoursePlanningPage
          plannedCourses={plannedCourses}
          setPlannedCourses={setPlannedCourses}
          goToMyPlan={() => setActivePage('my-plan')}
        />
      )
    }

    if (activePage === 'resources') return <ResourcesPage />

    return <DashboardPage />
  }

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="sidebar-logo">
            <Icon name="graduation" size={24} />
          </div>

          <div>
            <h1>Academic Planner</h1>
            <p>First-Gen Success</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button
            className={activePage === 'dashboard' ? 'active' : ''}
            onClick={() => setActivePage('dashboard')}
          >
            <Icon name="home" size={20} />
            Dashboard
          </button>

          <button
            className={activePage === 'my-plan' ? 'active' : ''}
            onClick={() => setActivePage('my-plan')}
          >
            <Icon name="map" size={20} />
            My Plan
          </button>

          <button
            className={activePage === 'courses' ? 'active' : ''}
            onClick={() => setActivePage('courses')}
          >
            <Icon name="book" size={20} />
            Courses
          </button>

          <button
            className={activePage === 'resources' ? 'active' : ''}
            onClick={() => setActivePage('resources')}
          >
            <Icon name="life-buoy" size={20} />
            Resources
          </button>
        </nav>
      </aside>

      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  )
}

export default App