import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './layouts/AppLayout.jsx'
import AlertsPage from './pages/AlertsPage.jsx'
import ConfirmationPage from './pages/ConfirmationPage.jsx'
import CourseDetailsPage from './pages/CourseDetailsPage.jsx'
import CoursePlanningPage from './pages/CoursePlanningPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import GraduationGoalPage from './pages/GraduationGoalPage.jsx'
import MajorSelectionPage from './pages/MajorSelectionPage.jsx'
import MyPlanPage from './pages/MyPlanPage.jsx'
import ResourcesPage from './pages/ResourcesPage.jsx'
import WelcomePage from './pages/WelcomePage.jsx'

function App() {
  const [plannedCourses, setPlannedCourses] = useState([])

  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route element={<AppLayout />}>
        <Route path="/onboarding/major" element={<MajorSelectionPage />} />
        <Route path="/onboarding/graduation" element={<GraduationGoalPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/my-plan" element={<MyPlanPage plannedCourses={plannedCourses} />} />
        <Route path="/plan-courses" element={<CoursePlanningPage />} />
        <Route
          path="/courses/:courseId"
          element={
            <CourseDetailsPage
              plannedCourses={plannedCourses}
              setPlannedCourses={setPlannedCourses}
            />
          }
        />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/alerts" element={<AlertsPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
