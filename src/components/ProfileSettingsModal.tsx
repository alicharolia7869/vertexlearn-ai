import React, { useState } from 'react';
import type { UserProfile } from '../data/coursesData';
import { 
  X, 
  User, 
  Settings, 
  LogOut, 
  Flame, 
  Award, 
  BookOpen, 
  Save, 
  Check, 
  Bell, 
  Volume2, 
  Sparkles,
  Layers
} from 'lucide-react';

interface ProfileSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  streak: number;
  enrolledCount: number;
  onUpdateProfile: (updated: UserProfile) => void;
  onLogout: () => void;
  onOpenLogin: () => void;
}

export const ProfileSettingsModal: React.FC<ProfileSettingsModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  streak,
  enrolledCount,
  onUpdateProfile,
  onLogout,
  onOpenLogin
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'settings'>('profile');
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [title, setTitle] = useState(currentUser.title);

  // Preferences
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [autoAITutor, setAutoAITutor] = useState(true);
  const [dailyReminders, setDailyReminders] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserProfile = {
      ...currentUser,
      name,
      email,
      title
    };
    onUpdateProfile(updated);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 140,
      background: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20
    }} className="animate-fade-in">
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: 560,
        maxHeight: '90vh',
        overflowY: 'auto',
        background: '#0f172a',
        border: '1px solid rgba(59, 130, 246, 0.4)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.9)'
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'rgba(9, 13, 22, 0.6)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 38,
              height: 38,
              borderRadius: 12,
              background: 'var(--accent-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <User size={20} color="#fff" />
            </div>
            <div>
              <h3 style={{ fontSize: 17, margin: 0 }}>Student Profile & Settings</h3>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                {currentUser.name} &bull; {currentUser.role.toUpperCase()}
              </div>
            </div>
          </div>

          <button onClick={onClose} className="btn btn-icon btn-secondary" style={{ width: 32, height: 32 }}>
            <X size={16} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border-subtle)', background: 'rgba(255,255,255,0.02)' }}>
          <button
            onClick={() => setActiveTab('profile')}
            style={{
              flex: 1,
              padding: '12px',
              border: 'none',
              background: activeTab === 'profile' ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
              color: activeTab === 'profile' ? '#60a5fa' : 'var(--text-muted)',
              fontWeight: 700,
              fontSize: 13,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              borderBottom: activeTab === 'profile' ? '2px solid var(--accent-primary)' : '2px solid transparent'
            }}
          >
            <User size={15} />
            My Profile
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            style={{
              flex: 1,
              padding: '12px',
              border: 'none',
              background: activeTab === 'settings' ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
              color: activeTab === 'settings' ? '#60a5fa' : 'var(--text-muted)',
              fontWeight: 700,
              fontSize: 13,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              borderBottom: activeTab === 'settings' ? '2px solid var(--accent-primary)' : '2px solid transparent'
            }}
          >
            <Settings size={15} />
            Preferences & Settings
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '24px' }}>
          {isSaved && (
            <div style={{
              background: 'rgba(16, 185, 129, 0.2)',
              border: '1px solid #10b981',
              padding: '10px 14px',
              borderRadius: 8,
              fontSize: 12,
              color: '#34d399',
              marginBottom: 16,
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}>
              <Check size={15} />
              Profile updated and saved to LocalStorage!
            </div>
          )}

          {activeTab === 'profile' ? (
            <div>
              {/* Stat Badges */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 20 }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: 12, borderRadius: 10, textAlign: 'center' }}>
                  <Flame size={18} color="#f59e0b" style={{ margin: '0 auto 4px' }} />
                  <div style={{ fontSize: 18, fontWeight: 800, color: '#fbbf24' }}>{streak} Days</div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Daily Streak</div>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.03)', padding: 12, borderRadius: 10, textAlign: 'center' }}>
                  <BookOpen size={18} color="#60a5fa" style={{ margin: '0 auto 4px' }} />
                  <div style={{ fontSize: 18, fontWeight: 800, color: '#93c5fd' }}>{enrolledCount}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Enrolled Courses</div>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.03)', padding: 12, borderRadius: 10, textAlign: 'center' }}>
                  <Award size={18} color="#34d399" style={{ margin: '0 auto 4px' }} />
                  <div style={{ fontSize: 18, fontWeight: 800, color: '#34d399' }}>Verified</div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Diploma Status</div>
                </div>
              </div>

              {/* Profile Edit Form */}
              <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 4 }}>
                    Display Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-control"
                    style={{ height: 38, fontSize: 13 }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 4 }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-control"
                    style={{ height: 38, fontSize: 13 }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 4 }}>
                    Specialization Title
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="input-control"
                    style={{ height: 38, fontSize: 13 }}
                  />
                </div>

                <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                  <button type="submit" className="btn btn-primary" style={{ flex: 1, padding: '10px' }}>
                    <Save size={15} />
                    Save Profile Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => { onClose(); onOpenLogin(); }}
                    className="btn btn-secondary"
                    style={{ padding: '10px 14px', fontSize: 12 }}
                  >
                    Switch Account
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Settings Tab */
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                background: 'rgba(255,255,255,0.03)',
                borderRadius: 10
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Volume2 size={18} color="#60a5fa" />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#f8fafc' }}>Interactive Audio & Sounds</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Play sound effects when completing lessons and quizzes</div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={soundEnabled}
                  onChange={(e) => setSoundEnabled(e.target.checked)}
                  style={{ width: 18, height: 18, cursor: 'pointer' }}
                />
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                background: 'rgba(255,255,255,0.03)',
                borderRadius: 10
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Sparkles size={18} color="#c084fc" />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#f8fafc' }}>AI Tutor Proactive Hints</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Show flashcard suggestions after watching 5 minutes of a video</div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={autoAITutor}
                  onChange={(e) => setAutoAITutor(e.target.checked)}
                  style={{ width: 18, height: 18, cursor: 'pointer' }}
                />
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                background: 'rgba(255,255,255,0.03)',
                borderRadius: 10
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Bell size={18} color="#fbbf24" />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#f8fafc' }}>Study Streak Reminders</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Keep your {streak}-day learning streak active</div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={dailyReminders}
                  onChange={(e) => setDailyReminders(e.target.checked)}
                  style={{ width: 18, height: 18, cursor: 'pointer' }}
                />
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                background: 'rgba(255,255,255,0.03)',
                borderRadius: 10
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Layers size={18} color="#34d399" />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#f8fafc' }}>Client-Side Cache Engine</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Local storage persistence enabled (0ms API latency)</div>
                  </div>
                </div>
                <span className="badge badge-green">ACTIVE</span>
              </div>
            </div>
          )}

          {/* Logout Section */}
          <div style={{
            marginTop: 24,
            paddingTop: 18,
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
              Current Session: <strong>{currentUser.email}</strong>
            </div>

            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="btn btn-secondary"
              style={{
                color: '#f87171',
                borderColor: 'rgba(239, 68, 68, 0.3)',
                fontSize: 12,
                padding: '6px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: 6
              }}
            >
              <LogOut size={14} />
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
