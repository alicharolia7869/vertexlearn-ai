import { useState } from 'react';
import type { Course } from '../data/coursesData';
import { 
  Play, 
  Award, 
  Clock, 
  Users, 
  Star, 
  Sparkles, 
  BookOpen, 
  ArrowRight,
  TrendingUp,
  Flame
} from 'lucide-react';

interface DashboardProps {
  courses: Course[];
  enrolledIds: string[];
  onEnroll: (courseId: string) => void;
  onSelectCourse: (course: Course) => void;
  onOpenQuiz: (course: Course) => void;
  onRestoreCourses: () => void;
  onSwitchToAdmin?: () => void;
  searchQuery: string;
  streak: number;
  showOnlyEnrolled?: boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({
  courses,
  enrolledIds,
  onEnroll,
  onSelectCourse,
  onOpenQuiz,
  onRestoreCourses,
  onSwitchToAdmin,
  searchQuery,
  streak,
  showOnlyEnrolled = false
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Web Dev', 'Python & AI', 'UI/UX', 'Computer Science'];

  const filteredCourses = courses.filter((c) => {
    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesEnrolled = !showOnlyEnrolled || enrolledIds.includes(c.id);
    return matchesCategory && matchesSearch && matchesEnrolled && c.status === 'approved';
  });

  const enrolledCourses = courses.filter((c) => enrolledIds.includes(c.id));
  const primaryEnrolled = enrolledCourses.length > 0 ? enrolledCourses[0] : courses[0];

  return (
    <div style={{ maxWidth: 1380, margin: '0 auto', padding: '30px 24px 80px' }} className="animate-fade-in">
      {/* Hero Welcome Banner */}
      <div className="glass-panel" style={{
        padding: '36px 40px',
        marginBottom: 32,
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid rgba(59, 130, 246, 0.25)',
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.8) 100%)'
      }}>
        {/* Glow decoration */}
        <div style={{
          position: 'absolute',
          right: -40,
          top: -40,
          width: 250,
          height: 250,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
          <div style={{ maxWidth: 680 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px', background: 'rgba(59, 130, 246, 0.15)', borderRadius: 20, marginBottom: 14 }}>
              <Sparkles size={14} color="#60a5fa" />
              <span style={{ fontSize: 11, fontWeight: 700, color: '#93c5fd', letterSpacing: 0.5 }}>INTERNMO SUBMISSION READY</span>
            </div>
            <h1 style={{ fontSize: 32, marginBottom: 10, lineHeight: 1.2 }}>
              Welcome back, <span className="gradient-text">Ali Charolia</span> 👋
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.6 }}>
              Continue where you left off. VertexLearn AI is your interactive classroom with simulated AI tutoring, auto-saving notes, and verifiable PDF diplomas.
            </p>
          </div>

          {/* Quick Metrics */}
          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{
              background: 'rgba(15, 23, 42, 0.8)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 14,
              padding: '16px 20px',
              minWidth: 120,
              textAlign: 'center'
            }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#38bdf8' }}>{enrolledCourses.length}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, marginTop: 2 }}>Enrolled Courses</div>
            </div>

            <div style={{
              background: 'rgba(15, 23, 42, 0.8)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 14,
              padding: '16px 20px',
              minWidth: 120,
              textAlign: 'center'
            }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                <Flame size={20} fill="#f59e0b" />
                {streak}
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, marginTop: 2 }}>Day Streak</div>
            </div>

            <div style={{
              background: 'rgba(15, 23, 42, 0.8)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 14,
              padding: '16px 20px',
              minWidth: 120,
              textAlign: 'center'
            }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#10b981' }}>100%</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, marginTop: 2 }}>Client LocalStorage</div>
            </div>
          </div>
        </div>
      </div>

      {/* "My Learning" Active Resume Card */}
      {primaryEnrolled && (
        <div style={{ marginBottom: 36 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <h2 style={{ fontSize: 19, display: 'flex', alignItems: 'center', gap: 8 }}>
              <TrendingUp size={18} color="var(--accent-primary)" />
              My Learning (In Progress)
            </h2>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Auto-synced to LocalStorage</span>
          </div>

          <div className="glass-panel" style={{
            padding: '20px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 20,
            borderLeft: '4px solid var(--accent-primary)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
              <img 
                src={primaryEnrolled.thumbnail} 
                alt={primaryEnrolled.title}
                style={{ width: 100, height: 65, objectFit: 'cover', borderRadius: 10 }}
              />
              <div>
                <span className="badge badge-blue" style={{ marginBottom: 6 }}>{primaryEnrolled.category}</span>
                <h3 style={{ fontSize: 16, marginBottom: 4 }}>{primaryEnrolled.title}</h3>
                <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                  Current: <strong>{primaryEnrolled.lessons[0].title}</strong> &bull; {primaryEnrolled.totalDuration} total
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <div style={{ width: 160 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 6, fontWeight: 600 }}>
                  <span style={{ color: 'var(--text-muted)' }}>Course Progress</span>
                  <span style={{ color: '#60a5fa' }}>75%</span>
                </div>
                <div style={{ width: '100%', height: 7, background: 'rgba(255,255,255,0.1)', borderRadius: 9999, overflow: 'hidden' }}>
                  <div style={{ width: '75%', height: '100%', background: 'var(--accent-gradient)', borderRadius: 9999 }} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                <button 
                  onClick={() => onSelectCourse(primaryEnrolled)}
                  className="btn btn-primary"
                  style={{ padding: '8px 18px', fontSize: 13 }}
                >
                  <Play size={14} fill="#ffffff" />
                  Continue Video
                </button>
                <button 
                  onClick={() => onOpenQuiz(primaryEnrolled)}
                  className="btn btn-secondary"
                  style={{ padding: '8px 14px', fontSize: 13 }}
                >
                  <Award size={14} color="#fbbf24" />
                  Take Quiz
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Category Filter Buttons */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16,
        marginBottom: 24
      }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`btn btn-sm ${selectedCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
              style={{
                borderRadius: 9999,
                padding: '7px 16px',
                fontSize: 13
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
          Showing <strong>{filteredCourses.length}</strong> available courses
        </div>
      </div>

      {/* Courses Grid */}
      {filteredCourses.length === 0 ? (
        <div className="glass-panel" style={{
          padding: '48px 30px',
          textAlign: 'center',
          maxWidth: 600,
          margin: '20px auto 40px',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{ fontSize: 44, marginBottom: 12 }}>📚</div>
          <h3 style={{ fontSize: 20, marginBottom: 8 }}>No Published Courses Found</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 20, lineHeight: 1.5 }}>
            Courses may have been unpublished by the Administrator, or your search filter didn't match. You can restore all default sample courses instantly or switch to Admin mode to approve them.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={onRestoreCourses}
              className="btn btn-primary"
              style={{ fontSize: 13, padding: '10px 20px' }}
            >
              🔄 Restore 4 Default Courses
            </button>
            {onSwitchToAdmin && (
              <button
                onClick={onSwitchToAdmin}
                className="btn btn-secondary"
                style={{ fontSize: 13, padding: '10px 18px' }}
              >
                🛡️ Open Admin Moderation Queue
              </button>
            )}
          </div>
        </div>
      ) : (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: 24
      }}>
        {filteredCourses.map((course) => {
          const isEnrolled = enrolledIds.includes(course.id);

          return (
            <div 
              key={course.id}
              className="glass-panel"
              style={{
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                position: 'relative'
              }}
            >
              {/* Thumbnail Header */}
              <div style={{ position: 'relative', width: '100%', height: 180, overflow: 'hidden' }}>
                <img 
                  src={course.thumbnail} 
                  alt={course.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(15,23,42,0.9) 0%, transparent 60%)'
                }} />

                <div style={{ position: 'absolute', top: 12, left: 12 }}>
                  <span className="badge badge-blue">{course.category}</span>
                </div>

                <div style={{
                  position: 'absolute',
                  bottom: 10,
                  left: 12,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  fontSize: 11,
                  color: '#e2e8f0',
                  fontWeight: 600
                }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Clock size={13} color="#93c5fd" />
                    {course.totalDuration}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <BookOpen size={13} color="#a78bfa" />
                    {course.lessons.length} Lessons
                  </span>
                </div>

                <div style={{
                  position: 'absolute',
                  bottom: 10,
                  right: 12,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  background: 'rgba(0,0,0,0.6)',
                  padding: '2px 6px',
                  borderRadius: 6,
                  fontSize: 11,
                  fontWeight: 700,
                  color: '#fbbf24'
                }}>
                  <Star size={12} fill="#fbbf24" color="#fbbf24" />
                  {course.rating}
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: 16, marginBottom: 8, lineHeight: 1.35, color: '#f8fafc' }}>
                    {course.title}
                  </h3>
                  <p style={{
                    fontSize: 13,
                    color: 'var(--text-secondary)',
                    marginBottom: 16,
                    lineHeight: 1.5,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {course.description}
                  </p>
                </div>

                <div>
                  {/* Instructor row */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    marginBottom: 16,
                    paddingTop: 12,
                    borderTop: '1px solid var(--border-subtle)'
                  }}>
                    <img 
                      src={course.instructorAvatar} 
                      alt={course.instructor}
                      style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>
                        {course.instructor}
                      </div>
                      <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>
                        {course.instructorRole}
                      </div>
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 3 }}>
                      <Users size={12} />
                      {course.enrolledCount}
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: 8 }}>
                    {isEnrolled ? (
                      <>
                        <button
                          onClick={() => onSelectCourse(course)}
                          className="btn btn-primary"
                          style={{ flex: 1, padding: '9px 12px', fontSize: 13 }}
                        >
                          <Play size={14} fill="#fff" />
                          Resume Lesson
                        </button>
                        <button
                          onClick={() => onOpenQuiz(course)}
                          className="btn btn-secondary"
                          title="Take Quiz & Get Diploma"
                          style={{ padding: '9px 12px' }}
                        >
                          <Award size={15} color="#fbbf24" />
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => onEnroll(course.id)}
                        className="btn btn-secondary"
                        style={{
                          flex: 1,
                          padding: '9px 12px',
                          fontSize: 13,
                          background: 'rgba(59, 130, 246, 0.1)',
                          borderColor: 'rgba(59, 130, 246, 0.3)',
                          color: '#60a5fa'
                        }}
                      >
                        Enroll Now Free
                        <ArrowRight size={14} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      )}
    </div>
  );
};
