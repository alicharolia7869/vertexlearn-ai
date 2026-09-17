import React, { useState } from 'react';
import { StorageService, type Course } from '../data/coursesData';
import { 
  PlusCircle, 
  Check, 
  X, 
  GraduationCap, 
  ShieldAlert 
} from 'lucide-react';

interface InstructorAdminViewProps {
  role: 'instructor' | 'admin';
  courses: Course[];
  onCourseAdded: (newCourse: Course) => void;
  onCourseUpdated: (updatedCourses: Course[]) => void;
}

export const InstructorAdminView: React.FC<InstructorAdminViewProps> = ({
  role,
  courses,
  onCourseAdded,
  onCourseUpdated
}) => {
  // New Course Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Web Dev' | 'Python & AI' | 'UI/UX' | 'Computer Science'>('Web Dev');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('3h 15m');
  const [level, setLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');
  const [thumbnail, setThumbnail] = useState('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80');
  const [videoUrl, setVideoUrl] = useState('https://www.youtube-nocookie.com/embed/SqcY0GlETPk');
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const newCourse: Course = {
      id: `course-${Date.now()}`,
      title,
      category,
      description,
      instructor: 'Ali Charolia',
      instructorRole: 'Course Creator & Front-End Intern',
      instructorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      thumbnail,
      totalDuration: duration,
      level,
      rating: 5.0,
      enrolledCount: 1,
      status: 'pending', // Submits to Admin for approval
      lessons: [
        {
          id: `lesson-${Date.now()}-1`,
          title: `1. Introduction to ${title}`,
          duration: '12:30',
          videoUrl,
          summary: `Foundational concepts and curriculum overview for ${title}.`,
          timestamps: [{ time: '01:00', seconds: 60, topic: 'Curriculum Overview' }]
        }
      ],
      flashcards: [
        {
          id: 1,
          question: `What is the core premise of ${title}?`,
          answer: description,
          category
        }
      ],
      quiz: [
        {
          id: 1,
          question: `Which fundamental principle does ${title} emphasize?`,
          options: ['Modular Architecture', 'Monolithic Spaghetti', 'Hardcoded Values', 'None'],
          correctAnswer: 0,
          explanation: 'Modular clean architecture ensures longevity and testability.'
        },
        {
          id: 2,
          question: 'What is the recommended storage mechanism for client state in this application?',
          options: ['LocalStorage', 'Cookies only', 'Cassandra Cluster', 'FTP Server'],
          correctAnswer: 0,
          explanation: 'LocalStorage stores key-value pairs client-side with zero backend dependencies.'
        },
        {
          id: 3,
          question: 'Which tool generated the diploma certificate?',
          options: ['jsPDF', 'Photoshop', 'Microsoft Paint', 'Wordpad'],
          correctAnswer: 0,
          explanation: 'jsPDF creates client-rendered vector PDF certificates on the fly.'
        },
        {
          id: 4,
          question: 'What role is currently managing the courses?',
          options: ['Ali Charolia (Admin/Instructor)', 'Anonymous Guest', 'Bot', 'External API'],
          correctAnswer: 0,
          explanation: 'Ali Charolia is the designated intern author for this project.'
        },
        {
          id: 5,
          question: 'What framework powers this frontend?',
          options: ['React + Vite', 'AngularJS 1.0', 'Flash', 'Silverlight'],
          correctAnswer: 0,
          explanation: 'React with Vite offers instant HMR and optimized production bundles.'
        }
      ]
    };

    onCourseAdded(newCourse);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 4000);

    // Reset Form
    setTitle('');
    setDescription('');
  };

  const handleApprove = (courseId: string) => {
    const updated = courses.map((c) => (c.id === courseId ? { ...c, status: 'approved' as const } : c));
    onCourseUpdated(updated);
    StorageService.saveCourses(updated);
  };

  const handleUnpublish = (courseId: string) => {
    const updated = courses.map((c) => (c.id === courseId ? { ...c, status: 'pending' as const } : c));
    onCourseUpdated(updated);
    StorageService.saveCourses(updated);
  };

  const handleDelete = (courseId: string) => {
    const updated = courses.filter((c) => c.id !== courseId);
    onCourseUpdated(updated);
    StorageService.saveCourses(updated);
  };

  const handleResetCourses = () => {
    const reset = StorageService.resetCourses();
    onCourseUpdated(reset);
  };

  return (
    <div style={{ maxWidth: 1380, margin: '0 auto', padding: '30px 24px 80px' }} className="animate-fade-in">
      {/* Header Banner */}
      <div className="glass-panel" style={{
        padding: '24px 30px',
        marginBottom: 32,
        background: role === 'instructor' 
          ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(15, 23, 42, 0.9))'
          : 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(15, 23, 42, 0.9))',
        border: `1px solid ${role === 'instructor' ? 'rgba(139, 92, 246, 0.4)' : 'rgba(239, 68, 68, 0.4)'}`
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {role === 'instructor' ? (
            <GraduationCap size={32} color="#c084fc" />
          ) : (
            <ShieldAlert size={32} color="#f87171" />
          )}
          <div>
            <h1 style={{ fontSize: 24, margin: 0 }}>
              {role === 'instructor' ? 'Instructor Studio & Course Builder' : 'Super Admin Management Portal'}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 13, margin: '4px 0 0 0' }}>
              {role === 'instructor' 
                ? 'Create, publish, and manage curriculum modules with zero backend required.' 
                : 'Review pending course submissions, approve public listings, and monitor student analytics.'}
            </p>
          </div>
        </div>
      </div>

      {/* INSTRUCTOR VIEW */}
      {role === 'instructor' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(320px, 1fr)', gap: 28 }}>
          {/* Form */}
          <div className="glass-panel" style={{ padding: '28px' }}>
            <h3 style={{ fontSize: 18, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <PlusCircle size={18} color="var(--accent-primary)" />
              Create & Publish New Course
            </h3>

            {showSuccessToast && (
              <div style={{
                background: 'rgba(16, 185, 129, 0.2)',
                border: '1px solid #10b981',
                padding: '12px 16px',
                borderRadius: 10,
                fontSize: 13,
                color: '#34d399',
                marginBottom: 16,
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}>
                <Check size={16} />
                Course submitted for Admin Approval! Switch to <strong>Admin role</strong> in the navbar to approve it.
              </div>
            )}

            <form onSubmit={handleAddCourse} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>
                  Course Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Next-Gen Cloud Architecture with Docker"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input-control"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="input-control"
                    style={{ background: '#0f172a' }}
                  >
                    <option value="Web Dev">Web Dev</option>
                    <option value="Python & AI">Python & AI</option>
                    <option value="UI/UX">UI/UX</option>
                    <option value="Computer Science">Computer Science</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>
                    Level
                  </label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value as any)}
                    className="input-control"
                    style={{ background: '#0f172a' }}
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>
                  Course Description
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Summarize the learning goals and real-world outcomes..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="input-control"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>
                    Total Estimated Duration
                  </label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="input-control"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>
                    Preview Video URL (Embed)
                  </label>
                  <input
                    type="text"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    className="input-control"
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>
                  Cover Thumbnail URL
                </label>
                <input
                  type="text"
                  value={thumbnail}
                  onChange={(e) => setThumbnail(e.target.value)}
                  className="input-control"
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ marginTop: 8, padding: '12px' }}>
                <PlusCircle size={16} />
                Publish Course to Platform
              </button>
            </form>
          </div>

          {/* Instructor Analytics */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div className="glass-panel" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: 16, marginBottom: 16 }}>Teaching Performance Overview</h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: 14, borderRadius: 10 }}>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Active Students</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: '#38bdf8', marginTop: 4 }}>4,350+</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: 14, borderRadius: 10 }}>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Average Rating</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: '#fbbf24', marginTop: 4 }}>4.92 ★</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: 14, borderRadius: 10 }}>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Quiz Pass Rate</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: '#34d399', marginTop: 4 }}>89.4%</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: 14, borderRadius: 10 }}>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Certificates Issued</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: '#c084fc', marginTop: 4 }}>1,840</div>
                </div>
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '20px' }}>
              <h4 style={{ fontSize: 14, marginBottom: 10, color: '#93c5fd' }}>💡 Pro-Tip for Internmo Evaluator</h4>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                When you create a course here, it gets saved to your browser's <code>localStorage</code> with <code>pending</code> status. You can instantly toggle to <strong>Admin Role</strong> in the top-right navbar to approve and publish it!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ADMIN VIEW */}
      {role === 'admin' && (
        <div className="glass-panel" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div>
              <h3 style={{ fontSize: 18, margin: 0 }}>Course Moderation Queue</h3>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '4px 0 0' }}>
                Approve or unpublish submitted curriculum modules.
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <button
                onClick={handleResetCourses}
                className="btn btn-sm btn-secondary"
                style={{ fontSize: 12, padding: '6px 12px' }}
                title="Restore all 4 default masterclasses"
              >
                🔄 Restore 4 Default Courses
              </button>
              <span className="badge badge-purple">{courses.length} Total Courses in System</span>
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '12px 14px' }}>Course Title & Category</th>
                  <th style={{ padding: '12px 14px' }}>Instructor</th>
                  <th style={{ padding: '12px 14px' }}>Status</th>
                  <th style={{ padding: '12px 14px', textAlign: 'right' }}>Moderation Action</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                    <td style={{ padding: '14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <img 
                          src={course.thumbnail} 
                          alt={course.title} 
                          style={{ width: 44, height: 32, objectFit: 'cover', borderRadius: 6 }} 
                        />
                        <div>
                          <div style={{ fontWeight: 600, color: '#f8fafc' }}>{course.title}</div>
                          <span className="badge badge-blue" style={{ fontSize: 9, padding: '2px 6px', marginTop: 3 }}>
                            {course.category}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td style={{ padding: '14px', color: 'var(--text-secondary)' }}>
                      {course.instructor}
                    </td>

                    <td style={{ padding: '14px' }}>
                      {course.status === 'approved' ? (
                        <span className="badge badge-green">LIVE & APPROVED</span>
                      ) : (
                        <span className="badge badge-amber">PENDING REVIEW (UNPUBLISHED)</span>
                      )}
                    </td>

                    <td style={{ padding: '14px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                        {course.status !== 'approved' ? (
                          <button
                            onClick={() => handleApprove(course.id)}
                            className="btn btn-sm btn-primary"
                            style={{ background: '#10b981', padding: '6px 12px' }}
                            title="Approve course to appear in Student Catalog"
                          >
                            <Check size={14} />
                            Approve Course
                          </button>
                        ) : (
                          <button
                            onClick={() => handleUnpublish(course.id)}
                            className="btn btn-sm btn-secondary"
                            style={{ color: '#fbbf24', borderColor: 'rgba(245, 158, 11, 0.4)', padding: '6px 12px' }}
                            title="Unpublish course back to Pending state"
                          >
                            Unpublish (Set to Pending)
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(course.id)}
                          className="btn btn-sm btn-secondary"
                          style={{ color: '#f87171', borderColor: 'rgba(239, 68, 68, 0.3)', padding: '6px 10px' }}
                          title="Delete permanently"
                        >
                          <X size={14} />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
