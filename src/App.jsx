import { useState } from "react";
import {
  ArrowLeft,
  Download,
  Users,
  Clock,
  BookOpen,
  Star,
  CheckCircle,
} from "lucide-react";
import "./App.css";

const courses = [
  {
    id: "CS 410",
    title: "Operating Systems",
    department: "Computer Science",
    credits: 3,
    instructor: "Dr. Sarah Johnson",
    schedule: "MWF 10:00-10:50",
    availability: "12 / 30 seats",
    rating: "4.5 / 5.0",
    eligible: true,
    description:
      "Study of operating system design and implementation including process management, memory management, file systems, and I/O systems. Students will gain practical experience with system-level programming and concurrent processes.",
    outcomes: [
      "Understand core operating system concepts and architecture",
      "Implement process scheduling and synchronization",
      "Design and manage memory allocation systems",
      "Build file system components",
      "Debug concurrent and parallel programs",
    ],
    textbooks: [
      {
        title: "Operating System Concepts",
        author: "Silberschatz, Galvin, and Gagne",
      },
      {
        title: "Modern Operating Systems",
        author: "Andrew S. Tanenbaum",
      },
    ],
    grading: [
      ["Programming Projects", 50],
      ["Midterm Exam", 20],
      ["Final Exam", 25],
      ["Participation", 5],
    ],
  },
];

export default function App() {
  const [selectedCourse, setSelectedCourse] = useState(null);

  if (selectedCourse) {
    return (
      <CourseDetails
        course={selectedCourse}
        onBack={() => setSelectedCourse(null)}
      />
    );
  }

  return (
    <main className="page">
      <h1>Course Planning</h1>
      <p className="subtitle">Browse and plan your courses</p>

      <div className="course-card">
        <div>
          <h2>
            CS 410 - Operating Systems{" "}
            <span className="badge success">Eligible</span>
          </h2>
          <p>Study of operating system design and implementation.</p>
          <p>
            <strong>Instructor:</strong> Dr. Sarah Johnson
          </p>
          <p>
            <strong>Schedule:</strong> MWF 10:00-10:50
          </p>
          <p>
            <strong>Availability:</strong> 12 / 30 seats
          </p>
          <p>
            <strong>Rating:</strong> 4.5 / 5.0
          </p>
        </div>

        <button onClick={() => setSelectedCourse(courses[0])}>
          View Details
        </button>
      </div>
    </main>
  );
}

function CourseDetails({ course, onBack }) {
  return (
    <main className="page">
      <button className="back-btn" onClick={onBack}>
        <ArrowLeft size={18} />
        Back to Courses
      </button>

      <div className="details-header">
        <div>
          <h1>
            {course.id} <span className="badge success">Eligible to Enroll</span>
          </h1>
          <h2>{course.title}</h2>
          <p className="subtitle">
            {course.department} • {course.credits} Credits
          </p>
        </div>

        <div className="header-actions">
          <button className="outline-btn">
            <Download size={18} />
            Syllabus
          </button>
          <button>Add to My Plan</button>
        </div>
      </div>

      <div className="stats-grid">
        <InfoBox icon={<Users />} label="Instructor" value={course.instructor} />
        <InfoBox icon={<Clock />} label="Schedule" value={course.schedule} />
        <InfoBox icon={<BookOpen />} label="Availability" value={course.availability} />
        <InfoBox icon={<Star />} label="Rating" value={course.rating} />
      </div>

      <div className="tabs">
        <span className="active">Overview</span>
        <span>Requirements</span>
        <span>Schedule</span>
      </div>

      <section className="panel">
        <h2>Course Description</h2>
        <p>{course.description}</p>
      </section>

      <section className="panel">
        <h2>Learning Outcomes</h2>
        <ul className="outcomes">
          {course.outcomes.map((item) => (
            <li key={item}>
              <CheckCircle size={18} />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <div className="two-column">
        <section className="panel">
          <h2>Required Textbooks</h2>
          {course.textbooks.map((book) => (
            <div className="book" key={book.title}>
              <h3>{book.title}</h3>
              <p>{book.author}</p>
            </div>
          ))}
        </section>

        <section className="panel">
          <h2>Grading Breakdown</h2>
          {course.grading.map(([label, value]) => (
            <div className="grade-row" key={label}>
              <div>
                <span>{label}</span>
                <strong>{value}%</strong>
              </div>
              <div className="bar">
                <div style={{ width: `${value}%` }} />
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}

function InfoBox({ icon, label, value }) {
  return (
    <div className="info-box">
      <div className="icon">{icon}</div>
      <div>
        <p>{label}</p>
        <strong>{value}</strong>
      </div>
    </div>
  );
}