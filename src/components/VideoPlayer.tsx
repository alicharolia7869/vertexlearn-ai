import React, { useState, useEffect } from 'react';
import { StorageService, type Course, type Lesson } from '../data/coursesData';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  Bot, 
  Award, 
  FileText, 
  Save, 
  Sparkles, 
  Download, 
  Trash2 
} from 'lucide-react';

interface VideoPlayerProps {
  course: Course;
  onBack: () => void;
  onOpenQuiz: () => void;
  onOpenAITutor: () => void;
  onSeekVideo?: (seconds: number) => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  course,
  onBack,
  onOpenQuiz,
  onOpenAITutor,
}) => {
  const [activeLessonIndex, setActiveLessonIndex] = useState<number>(0);
  const currentLesson: Lesson = course.lessons[activeLessonIndex] || course.lessons[0];
  const [playerMode, setPlayerMode] = useState<'youtube' | 'html5'>('youtube');

  const [notes, setNotes] = useState<string>('');
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving'>('saved');
  const [completedLessons, setCompletedLessons] = useState<string[]>(['lesson-1']);

  // Load existing notes for current lesson
  useEffect(() => {
    const saved = StorageService.getNotes(course.id, currentLesson.id);
    setNotes(saved);
  }, [course.id, currentLesson.id]);

  // Handle note typing with auto-save debounce
  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setNotes(text);
    setSaveStatus('saving');

    // Debounce save to LocalStorage
    const timer = setTimeout(() => {
      StorageService.saveNotes(course.id, currentLesson.id, text);
      setSaveStatus('saved');
    }, 600);

    return () => clearTimeout(timer);
  };

  const toggleLessonCompletion = (lessonId: string) => {
    if (completedLessons.includes(lessonId)) {
      setCompletedLessons(completedLessons.filter((id) => id !== lessonId));
    } else {
      setCompletedLessons([...completedLessons, lessonId]);
    }
  };

  const exportNotes = () => {
    const blob = new Blob([`Notes for ${course.title} - ${currentLesson.title}\n\n${notes}`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${course.title}_Notes.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ maxWidth: 1380, margin: '0 auto', padding: '24px 24px 80px' }} className="animate-fade-in">
      {/* Top Breadcrumb & Controls */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16,
        marginBottom: 20
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button 
            onClick={onBack}
            className="btn btn-secondary btn-sm"
            style={{ borderRadius: 8, padding: '6px 12px' }}
          >
            <ArrowLeft size={16} />
            Back to Catalog
          </button>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="badge badge-blue">{course.category}</span>
              <h2 style={{ fontSize: 18, margin: 0 }}>{course.title}</h2>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={onOpenAITutor}
            className="btn btn-primary"
            style={{
              padding: '8px 16px',
              fontSize: 13,
              background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
              boxShadow: '0 4px 14px rgba(139, 92, 246, 0.4)'
            }}
          >
            <Bot size={16} />
            Ask AI Tutor
            <Sparkles size={13} color="#fde047" />
          </button>

          <button
            onClick={onOpenQuiz}
            className="btn btn-secondary"
            style={{
              padding: '8px 16px',
              fontSize: 13,
              border: '1px solid rgba(245, 158, 11, 0.4)',
              color: '#fbbf24'
            }}
          >
            <Award size={16} color="#fbbf24" />
            Take Final Quiz & Certificate
          </button>
        </div>
      </div>

      {/* Main Grid: Video Player + Playlist */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 2fr) minmax(320px, 1fr)',
        gap: 24,
        alignItems: 'start'
      }}>
        {/* Left Column: Video + Notes */}
        <div>
          {/* Player Mode Switcher */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
            padding: '4px 8px',
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: 10,
            border: '1px solid var(--border-subtle)'
          }}>
            <div style={{ display: 'flex', gap: 6 }}>
              <button
                onClick={() => setPlayerMode('youtube')}
                className={`btn btn-sm ${playerMode === 'youtube' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ fontSize: 11, padding: '4px 10px', borderRadius: 6 }}
              >
                📺 YouTube Stream
              </button>
              <button
                onClick={() => setPlayerMode('html5')}
                className={`btn btn-sm ${playerMode === 'html5' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ fontSize: 11, padding: '4px 10px', borderRadius: 6 }}
              >
                🎬 Built-in Classroom Player (Offline/Ad-Free)
              </button>
            </div>

            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
              {playerMode === 'youtube' ? 'Embedded HD Video' : 'Direct HTML5 Video Stream'}
            </span>
          </div>

          {/* Video Container (16:9 ratio) */}
          <div className="glass-panel" style={{
            position: 'relative',
            paddingTop: '56.25%',
            borderRadius: 16,
            overflow: 'hidden',
            backgroundColor: '#000000',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            boxShadow: '0 12px 36px rgba(0, 0, 0, 0.7)'
          }}>
            {playerMode === 'youtube' ? (
              <iframe
                src={`${currentLesson.videoUrl}?autoplay=0&rel=0&modestbranding=1&enablejsapi=1`}
                title={currentLesson.title}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none'
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                controls
                poster={course.thumbnail}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  background: '#000'
                }}
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              >
                Your browser does not support HTML5 video.
              </video>
            )}
          </div>

          {/* Lesson Info Bar */}
          <div className="glass-panel" style={{ padding: '20px 24px', marginTop: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <h3 style={{ fontSize: 18, color: '#f8fafc' }}>
                {currentLesson.title}
              </h3>
              <span style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <Clock size={13} />
                {currentLesson.duration}
              </span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 14 }}>
              {currentLesson.summary}
            </p>

            {/* Timestamps */}
            {currentLesson.timestamps && currentLesson.timestamps.length > 0 && (
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>Key Timestamps:</span>
                {currentLesson.timestamps.map((t, idx) => (
                  <button
                    key={idx}
                    onClick={() => alert(`Seeking video to ${t.time} (${t.topic})`)}
                    className="badge badge-blue"
                    style={{
                      cursor: 'pointer',
                      border: '1px solid rgba(59, 130, 246, 0.4)',
                      padding: '4px 8px',
                      textTransform: 'none',
                      fontSize: 11
                    }}
                  >
                    ⏱️ {t.time} - {t.topic}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Personal Auto-Saving Notes Box */}
          <div className="glass-panel" style={{ padding: '20px 24px', marginTop: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <FileText size={18} color="#60a5fa" />
                <h4 style={{ fontSize: 15, margin: 0 }}>Personal Study Notes (Auto-saved)</h4>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{
                  fontSize: 11,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  color: saveStatus === 'saved' ? '#34d399' : '#fbbf24',
                  fontWeight: 600
                }}>
                  {saveStatus === 'saved' ? (
                    <>
                      <CheckCircle2 size={13} />
                      Synced to LocalStorage
                    </>
                  ) : (
                    <>
                      <Save size={13} />
                      Saving changes...
                    </>
                  )}
                </span>

                <button
                  onClick={exportNotes}
                  className="btn btn-secondary btn-sm"
                  title="Download notes file"
                  style={{ padding: '4px 8px', fontSize: 11 }}
                >
                  <Download size={13} />
                  Export .txt
                </button>

                <button
                  onClick={() => { setNotes(''); StorageService.saveNotes(course.id, currentLesson.id, ''); }}
                  className="btn btn-secondary btn-sm"
                  title="Clear notes"
                  style={{ padding: '4px 8px', fontSize: 11, color: '#f87171' }}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>

            <textarea
              className="input-control"
              rows={4}
              value={notes}
              onChange={handleNoteChange}
              placeholder="Type your study notes here... They are automatically saved to your browser LocalStorage!"
              style={{
                width: '100%',
                resize: 'vertical',
                lineHeight: 1.6,
                fontSize: 13,
                fontFamily: 'inherit'
              }}
            />
          </div>
        </div>

        {/* Right Column: Playlist Drawer */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontSize: 16 }}>Course Playlist</h3>
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
              {completedLessons.length}/{course.lessons.length} Completed
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {course.lessons.map((lesson, idx) => {
              const isActive = idx === activeLessonIndex;
              const isDone = completedLessons.includes(lesson.id);

              return (
                <div
                  key={lesson.id}
                  onClick={() => setActiveLessonIndex(idx)}
                  style={{
                    padding: '12px 14px',
                    borderRadius: 10,
                    background: isActive ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                    border: `1px solid ${isActive ? 'rgba(59, 130, 246, 0.5)' : 'var(--border-subtle)'}`,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 12,
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLessonCompletion(lesson.id);
                      }}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0
                      }}
                    >
                      {isDone ? (
                        <CheckCircle2 size={18} color="#10b981" />
                      ) : (
                        <div style={{
                          width: 18,
                          height: 18,
                          borderRadius: '50%',
                          border: '2px solid #475569'
                        }} />
                      )}
                    </button>
                    <div>
                      <div style={{
                        fontSize: 13,
                        fontWeight: isActive ? 700 : 500,
                        color: isActive ? '#60a5fa' : 'var(--text-primary)'
                      }}>
                        {lesson.title}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                        <Clock size={11} />
                        {lesson.duration}
                      </div>
                    </div>
                  </div>

                  {isActive && (
                    <span className="badge badge-blue" style={{ fontSize: 9, padding: '2px 6px' }}>Playing</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick AI Tutor Help Card */}
          <div style={{
            marginTop: 20,
            padding: '16px',
            borderRadius: 12,
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(59, 130, 246, 0.15))',
            border: '1px solid rgba(139, 92, 246, 0.3)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <Bot size={16} color="#c084fc" />
              <span style={{ fontSize: 13, fontWeight: 700, color: '#e9d5ff' }}>Need clarification?</span>
            </div>
            <p style={{ fontSize: 11, color: '#cbd5e1', marginBottom: 12, lineHeight: 1.4 }}>
              The embedded AI Tutor knows every timestamp in this lecture and can generate flashcards instantly.
            </p>
            <button
              onClick={onOpenAITutor}
              className="btn btn-sm"
              style={{
                width: '100%',
                background: 'rgba(139, 92, 246, 0.3)',
                border: '1px solid rgba(139, 92, 246, 0.5)',
                color: '#ffffff',
                fontSize: 12
              }}
            >
              Open AI Chatbot
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
