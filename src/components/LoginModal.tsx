import React, { useState } from 'react';
import type { UserProfile } from '../data/coursesData';
import {
  X,
  Sparkles,
  Lock,
  Mail,
  User,
  UserCheck,
  GraduationCap,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  UserPlus
} from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onLogin: (user: UserProfile) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogin
}) => {
  const [activeTab, setActiveTab] = useState<'signin' | 'register'>('signin');

  // Sign In form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<'student' | 'instructor' | 'admin'>('student');

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regTrack, setRegTrack] = useState('Front-End Internship Track');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const demoAccounts: UserProfile[] = [
    {
      name: 'Ali Charolia',
      email: 'ali.charolia@internmo.com',
      role: 'student',
      title: 'Front-End Internship Track Intern'
    },
    {
      name: 'Sarah Jenkins',
      email: 'sarah.instructor@vertexlearn.ai',
      role: 'instructor',
      title: 'Principal Instructor & Course Creator'
    },
    {
      name: 'Internmo Platform Admin',
      email: 'admin.moderator@internmo.com',
      role: 'admin',
      title: 'Super Administrator & Evaluator'
    }
  ];

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user: UserProfile = {
      name: email.split('@')[0] || (selectedRole === 'student' ? 'Ali Charolia' : selectedRole.toUpperCase()),
      email: email || `${selectedRole}@vertexlearn.ai`,
      role: selectedRole,
      title: selectedRole === 'student' ? 'Front-End Track' : `${selectedRole.toUpperCase()} Account`
    };
    onLogin(user);
    onClose();
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regEmail.trim()) return;

    const newUser: UserProfile = {
      name: regName.trim(),
      email: regEmail.trim(),
      role: 'student',
      title: regTrack
    };

    setSuccessMessage(`Account created successfully! Welcome to VertexLearn AI, ${newUser.name}.`);
    setTimeout(() => {
      onLogin(newUser);
      onClose();
      setSuccessMessage(null);
    }, 1200);
  };

  const handleQuickLogin = (account: UserProfile) => {
    onLogin(account);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 150,
      background: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20
    }} className="animate-fade-in">
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: 540,
        maxHeight: '90vh',
        overflowY: 'auto',
        background: '#0f172a',
        border: '1px solid rgba(59, 130, 246, 0.4)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.9)'
      }}>
        {/* Modal Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'rgba(9, 13, 22, 0.6)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: 'var(--accent-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 10px rgba(59, 130, 246, 0.4)'
            }}>
              <Sparkles size={18} color="#fff" />
            </div>
            <div>
              <h3 style={{ fontSize: 17, margin: 0 }}>
                {activeTab === 'signin' ? 'Account Sign In & Authentication' : 'Create Free Student Account'}
              </h3>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                VertexLearn AI LMS &bull; Internmo Portal
              </div>
            </div>
          </div>

          <button onClick={onClose} className="btn btn-icon btn-secondary" style={{ width: 32, height: 32 }}>
            <X size={16} />
          </button>
        </div>

        {/* Tab Switcher: Sign In vs Register */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid var(--border-subtle)',
          background: 'rgba(255, 255, 255, 0.02)'
        }}>
          <button
            onClick={() => setActiveTab('signin')}
            style={{
              flex: 1,
              padding: '12px',
              border: 'none',
              background: activeTab === 'signin' ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
              color: activeTab === 'signin' ? '#60a5fa' : 'var(--text-muted)',
              fontWeight: 700,
              fontSize: 13,
              cursor: 'pointer',
              borderBottom: activeTab === 'signin' ? '2px solid var(--accent-primary)' : '2px solid transparent'
            }}
          >
            Sign In
          </button>
          <button
            onClick={() => setActiveTab('register')}
            style={{
              flex: 1,
              padding: '12px',
              border: 'none',
              background: activeTab === 'register' ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
              color: activeTab === 'register' ? '#60a5fa' : 'var(--text-muted)',
              fontWeight: 700,
              fontSize: 13,
              cursor: 'pointer',
              borderBottom: activeTab === 'register' ? '2px solid var(--accent-primary)' : '2px solid transparent'
            }}
          >
            Create Account / Register
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px' }}>
          {successMessage && (
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
              <CheckCircle2 size={16} />
              {successMessage}
            </div>
          )}

          {activeTab === 'signin' ? (
            <>
              {/* Active User Card */}
              <div style={{
                background: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                borderRadius: 12,
                padding: '12px 16px',
                marginBottom: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: 11, color: '#93c5fd', fontWeight: 600 }}>CURRENTLY LOGGED IN AS:</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#ffffff' }}>{currentUser.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{currentUser.email} &bull; Role: <strong>{currentUser.role.toUpperCase()}</strong></div>
                </div>
                <span className="badge badge-green">ACTIVE</span>
              </div>

              {/* Quick Demo Switcher Section */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 8 }}>
                  ⚡ 1-Click Fast Role Switch (For Evaluator Testing):
                </label>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {demoAccounts.map((acc) => {
                    const isCurrent = currentUser.role === acc.role;

                    return (
                      <div
                        key={acc.role}
                        onClick={() => handleQuickLogin(acc)}
                        style={{
                          padding: '12px 14px',
                          borderRadius: 10,
                          background: isCurrent ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                          border: `1px solid ${isCurrent ? 'var(--accent-primary)' : 'var(--border-subtle)'}`,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <div style={{
                            width: 32,
                            height: 32,
                            borderRadius: 8,
                            background: acc.role === 'student' ? 'rgba(59, 130, 246, 0.2)' : acc.role === 'instructor' ? 'rgba(139, 92, 246, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            {acc.role === 'student' && <UserCheck size={16} color="#60a5fa" />}
                            {acc.role === 'instructor' && <GraduationCap size={16} color="#c084fc" />}
                            {acc.role === 'admin' && <ShieldCheck size={16} color="#f87171" />}
                          </div>

                          <div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: '#f8fafc' }}>
                              {acc.name}
                            </div>
                            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                              {acc.title} ({acc.role.toUpperCase()})
                            </div>
                          </div>
                        </div>

                        {isCurrent ? (
                          <CheckCircle2 size={16} color="#10b981" />
                        ) : (
                          <span className="btn btn-sm btn-secondary" style={{ padding: '4px 8px', fontSize: 11 }}>
                            Switch <ArrowRight size={11} />
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Divider */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0', color: 'var(--text-muted)', fontSize: 11 }}>
                <div style={{ flex: 1, height: 1, background: 'var(--border-subtle)' }} />
                <span>OR SIGN IN WITH CUSTOM CREDENTIALS</span>
                <div style={{ flex: 1, height: 1, background: 'var(--border-subtle)' }} />
              </div>

              {/* Custom Login Form */}
              <form onSubmit={handleCustomLogin} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 4 }}>
                    Account Email
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={15} color="var(--text-muted)" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ali.charolia@internmo.com"
                      className="input-control"
                      style={{ paddingLeft: 36, height: 38, fontSize: 13 }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 4 }}>
                    Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Lock size={15} color="var(--text-muted)" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="input-control"
                      style={{ paddingLeft: 36, height: 38, fontSize: 13 }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 4 }}>
                    Sign In As Role
                  </label>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value as any)}
                    className="input-control"
                    style={{ height: 38, fontSize: 13, background: '#0f172a' }}
                  >
                    <option value="student">Student (Ali Charolia)</option>
                    <option value="instructor">Instructor (Course Author)</option>
                    <option value="admin">Administrator (Moderation Queue)</option>
                  </select>
                </div>

                <button type="submit" className="btn btn-primary" style={{ marginTop: 8, padding: '10px' }}>
                  Sign In to VertexLearn AI
                </button>
              </form>
            </>
          ) : (
            /* Register / Sign Up Form */
            <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 4 }}>
                  Full Name
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={15} color="var(--text-muted)" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    className="input-control"
                    style={{ paddingLeft: 36, height: 38, fontSize: 13 }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 4 }}>
                  Email Address
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={15} color="var(--text-muted)" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="alex.morgan@internmo.com"
                    className="input-control"
                    style={{ paddingLeft: 36, height: 38, fontSize: 13 }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 4 }}>
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={15} color="var(--text-muted)" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="password"
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="input-control"
                    style={{ paddingLeft: 36, height: 38, fontSize: 13 }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 4 }}>
                  Internship Learning Specialization
                </label>
                <select
                  value={regTrack}
                  onChange={(e) => setRegTrack(e.target.value)}
                  className="input-control"
                  style={{ height: 38, fontSize: 13, background: '#0f172a' }}
                >
                  <option value="Front-End Internship Track">Front-End Internship Track</option>
                  <option value="Python & AI Engineering Track">Python & AI Engineering Track</option>
                  <option value="UI/UX Design Systems Track">UI/UX Design Systems Track</option>
                  <option value="Full-Stack Web Architect Track">Full-Stack Web Architect Track</option>
                </select>
              </div>

              <div style={{
                background: 'rgba(59, 130, 246, 0.08)',
                padding: '10px 14px',
                borderRadius: 8,
                fontSize: 11,
                color: 'var(--text-secondary)',
                lineHeight: 1.5
              }}>
                ℹ️ Registered student accounts receive instant enrollment, personal note synchronization in LocalStorage, and full verifiable certificate privileges.
              </div>

              <button type="submit" className="btn btn-primary" style={{ marginTop: 8, padding: '11px' }}>
                <UserPlus size={16} />
                Create Free Account & Start Learning
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
