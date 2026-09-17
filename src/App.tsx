import { useState } from 'react';
import { StorageService, type Course, type UserProfile } from './data/coursesData';
import { Navbar, type AppView } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { VideoPlayer } from './components/VideoPlayer';
import { AITutorChat } from './components/AITutorChat';
import { QuizModal } from './components/QuizModal';
import { InstructorAdminView } from './components/InstructorAdminView';
import { LoginModal } from './components/LoginModal';
import { RoadmapsView } from './components/RoadmapsView';
import { EBooksView } from './components/EBooksView';
import { ProfileSettingsModal } from './components/ProfileSettingsModal';

export function App() {
  // Synchronous lazy state initialization from LocalStorage
  const [courses, setCourses] = useState<Course[]>(() => StorageService.getCourses());
  const [enrolledIds, setEnrolledIds] = useState<string[]>(() => StorageService.getEnrolledCourseIds());
  const [currentView, setCurrentView] = useState<AppView>('catalog');
  const [userRole, setUserRole] = useState<'student' | 'instructor' | 'admin'>(() => StorageService.getRole());
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => StorageService.getUser());
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const [isProfileSettingsOpen, setIsProfileSettingsOpen] = useState<boolean>(false);
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

  const handleLogout = () => {
    StorageService.logout();
    const guestUser = StorageService.getUser();
    setCurrentUser(guestUser);
    setUserRole('student');
    setCurrentView('catalog');
    setSelectedCourse(null);
    setIsProfileSettingsOpen(false);
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
          if (view !== 'catalog') setSelectedCourse(null);
        }}
        userRole={userRole}
        setUserRole={(role) => {
          setUserRole(role);
          StorageService.setRole(role);
        }}
        currentUser={currentUser}
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenProfileSettings={() => setIsProfileSettingsOpen(true)}
        onOpenAITutor={() => setIsAITutorOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        streak={streak}
      />

      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        {/* Protected View: Instructor / Admin Role Workspace */}
        {userRole !== 'student' ? (
          <div>
            {/* Protected Route Banner if student profile tries to access */}
            {currentUser.role === 'student' && (
              <div style={{
                background: 'rgba(239, 68, 68, 0.12)',
                borderBottom: '1px solid rgba(239, 68, 68, 0.3)',
                padding: '10px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: 12,
                color: '#fca5a5'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontWeight: 800, background: '#ef4444', color: '#fff', padding: '2px 6px', borderRadius: 4, fontSize: 10 }}>
                    PROTECTED ROUTE
                  </span>
                  <span>
                    You are in <strong>{userRole.toUpperCase()}</strong> preview mode with a Student profile. Sign in with {userRole} credentials to save changes permanently.
                  </span>
                </div>
                <button
                  onClick={() => setIsLoginOpen(true)}
                  className="btn btn-sm btn-danger"
                  style={{ fontSize: 11, padding: '3px 10px', borderRadius: 6 }}
                >
                  Sign In as {userRole.toUpperCase()}
                </button>
              </div>
            )}

            <InstructorAdminView
              role={userRole}
              courses={courses}
              onCourseAdded={handleCourseAdded}
              onCourseUpdated={handleCourseUpdated}
            />
          </div>
        ) : selectedCourse ? (
          /* Screen 2: Video Player & Learning Page */
          <VideoPlayer
            course={selectedCourse}
            onBack={() => setSelectedCourse(null)}
            onOpenQuiz={() => setActiveQuizCourse(selectedCourse)}
            onOpenAITutor={() => setIsAITutorOpen(true)}
          />
        ) : currentView === 'roadmaps' ? (
          /* Career Roadmaps View */
          <RoadmapsView 
            onNavigateCatalog={() => setCurrentView('catalog')}
          />
        ) : currentView === 'ebooks' ? (
          /* eBooks & Technical Study Guides */
          <EBooksView />
        ) : (
          /* Screen 1: Course Catalog & Dashboard / My Learning */
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

      {/* Profile, Settings & Logout Modal */}
      <ProfileSettingsModal
        isOpen={isProfileSettingsOpen}
        onClose={() => setIsProfileSettingsOpen(false)}
        currentUser={currentUser}
        streak={streak}
        enrolledCount={enrolledIds.length}
        onUpdateProfile={(updated) => {
          setCurrentUser(updated);
          StorageService.saveUser(updated);
        }}
        onLogout={handleLogout}
        onOpenLogin={() => {
          setIsProfileSettingsOpen(false);
          setIsLoginOpen(true);
        }}
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
        padding: '24px 24px',
        fontSize: 13,
        color: 'var(--text-muted)'
      }}>
        <div style={{
          maxWidth: 1400,
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16
        }}>
          <div>
            <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>VertexLearn AI</span> &bull; Intern: <strong style={{ color: '#60a5fa' }}>Ali Charolia</strong> &bull; Front-End Engineering Track
          </div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <span style={{ color: '#10b981', fontWeight: 600 }}>● Vercel Serverless AI Active</span>
            <span>&bull;</span>
            <span>Client-Side LocalStorage State</span>
            <span>&bull;</span>
            <span style={{ color: '#38bdf8' }}>Internmo Portal Verified</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
