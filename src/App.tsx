import { useState } from 'react';
import { StorageService, type Course, type UserProfile } from './data/coursesData';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { VideoPlayer } from './components/VideoPlayer';
import { AITutorChat } from './components/AITutorChat';
import { QuizModal } from './components/QuizModal';
import { InstructorAdminView } from './components/InstructorAdminView';
import { LoginModal } from './components/LoginModal';

export function App() {
  // Synchronous lazy state initialization from LocalStorage
  const [courses, setCourses] = useState<Course[]>(() => StorageService.getCourses());
  const [enrolledIds, setEnrolledIds] = useState<string[]>(() => StorageService.getEnrolledCourseIds());
  const [currentView, setCurrentView] = useState<'catalog' | 'learning' | 'admin' | 'instructor'>('catalog');
  const [userRole, setUserRole] = useState<'student' | 'instructor' | 'admin'>(() => StorageService.getRole());
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => StorageService.getUser());
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeQuizCourse, setActiveQuizCourse] = useState<Course | null>(null);
  const [isAITutorOpen, setIsAITutorOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [streak] = useState<number>(() => StorageService.getStreak());

  const handleLogin = (user: UserProfile) => {
    setCurrentUser(user);
    setUserRole(user.role);
    StorageService.saveUser(user);
    if (user.role === 'instructor') {
      setCurrentView('instructor');
    } else if (user.role === 'admin') {
      setCurrentView('admin');
    } else {
      setCurrentView('catalog');
    }
  };

  const handleRestoreCourses = () => {
    const reset = StorageService.resetCourses();
    setCourses(reset);
  };

  const handleEnroll = (courseId: string) => {
    StorageService.enrollCourse(courseId);
    setEnrolledIds((prev) => (prev.includes(courseId) ? prev : [...prev, courseId]));
    const found = courses.find((c) => c.id === courseId);
    if (found) {
      setSelectedCourse(found);
    }
  };

  const handleCourseAdded = (newCourse: Course) => {
    const updated = [newCourse, ...courses];
    setCourses(updated);
    StorageService.saveCourses(updated);
  };

  const handleCourseUpdated = (updated: Course[]) => {
    setCourses(updated);
    StorageService.saveCourses(updated);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        setCurrentView={(view) => {
          setCurrentView(view);
          if (view === 'catalog') setSelectedCourse(null);
        }}
        userRole={userRole}
        setUserRole={(role) => {
          setUserRole(role);
          StorageService.setRole(role);
        }}
        currentUser={currentUser}
        onOpenLogin={() => setIsLoginOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        streak={streak}
      />

      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        {/* Role View: Instructor / Admin */}
        {userRole !== 'student' ? (
          <InstructorAdminView
            role={userRole}
            courses={courses}
            onCourseAdded={handleCourseAdded}
            onCourseUpdated={handleCourseUpdated}
          />
        ) : selectedCourse ? (
          /* Screen 2: Video Player & Learning Page */
          <VideoPlayer
            course={selectedCourse}
            onBack={() => setSelectedCourse(null)}
            onOpenQuiz={() => setActiveQuizCourse(selectedCourse)}
            onOpenAITutor={() => setIsAITutorOpen(true)}
          />
        ) : (
          /* Screen 1: Course Catalog & Dashboard */
          <Dashboard
            courses={courses}
            enrolledIds={enrolledIds}
            onEnroll={handleEnroll}
            onSelectCourse={(course) => setSelectedCourse(course)}
            onOpenQuiz={(course) => setActiveQuizCourse(course)}
            onRestoreCourses={handleRestoreCourses}
            onSwitchToAdmin={() => {
              setUserRole('admin');
              setCurrentView('admin');
            }}
            searchQuery={searchQuery}
            streak={streak}
            showOnlyEnrolled={currentView === 'learning'}
          />
        )}
      </main>

      {/* Login & Authentication Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        currentUser={currentUser}
        onLogin={handleLogin}
      />

      {/* Screen 3: Embedded AI Tutor Chat Drawer */}
      <AITutorChat
        course={selectedCourse || courses[0] || ({} as Course)}
        isOpen={isAITutorOpen}
        onClose={() => setIsAITutorOpen(false)}
      />

      {/* Screen 4: Quiz & Diploma Certificate Downloader Modal */}
      {activeQuizCourse && (
        <QuizModal
          course={activeQuizCourse}
          isOpen={!!activeQuizCourse}
          onClose={() => setActiveQuizCourse(null)}
        />
      )}

      {/* Footer */}
      <footer style={{
        background: 'rgba(9, 13, 22, 0.95)',
        borderTop: '1px solid var(--border-subtle)',
        padding: '28px 24px',
        fontSize: 13,
        color: 'var(--text-muted)'
      }}>
        <div style={{
          maxWidth: 1380,
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16
        }}>
          <div>
            <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>VertexLearn AI</span> &bull; Intern: <strong style={{ color: '#60a5fa' }}>Ali Charolia</strong> &bull; Front-End Track Submission
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <span>Zero Backend Server Dependency</span>
            <span>&bull;</span>
            <span>100% Client-Side LocalStorage</span>
            <span>&bull;</span>
            <span style={{ color: '#10b981' }}>Internmo Portal Ready</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default App;
