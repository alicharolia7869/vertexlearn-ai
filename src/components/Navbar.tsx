import React from 'react';
import type { UserProfile } from '../data/coursesData';
import { Sparkles, Flame, Search, GraduationCap, ShieldCheck, UserCheck, BookOpen, Layers, LogIn } from 'lucide-react';

interface NavbarProps {
  currentView: 'catalog' | 'learning' | 'admin' | 'instructor';
  setCurrentView: (view: 'catalog' | 'learning' | 'admin' | 'instructor') => void;
  userRole: 'student' | 'instructor' | 'admin';
  setUserRole: (role: 'student' | 'instructor' | 'admin') => void;
  currentUser: UserProfile;
  onOpenLogin: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  streak: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  userRole,
  setUserRole,
  currentUser,
  onOpenLogin,
  searchQuery,
  setSearchQuery,
  streak
}) => {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'rgba(9, 13, 22, 0.85)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-subtle)',
      padding: '14px 24px'
    }}>
      <div style={{
        maxWidth: 1380,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 20
      }}>
        {/* Brand Logo */}
        <div 
          onClick={() => setCurrentView('catalog')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          <div style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            background: 'var(--accent-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(59, 130, 246, 0.4)'
          }}>
            <Sparkles size={22} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 19, fontWeight: 800, letterSpacing: '-0.02em' }}>
                VertexLearn <span className="gradient-text">AI</span>
              </span>
              <span className="badge badge-blue" style={{ fontSize: 9, padding: '2px 6px' }}>INTERNMO</span>
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 500 }}>
              AI-Powered Interactive LMS
            </div>
          </div>
        </div>

        {/* Global Search Bar */}
        <div style={{
          flex: 1,
          maxWidth: 420,
          position: 'relative'
        }}>
          <Search 
            size={16} 
            color="var(--text-muted)" 
            style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} 
          />
          <input 
            type="text"
            className="input-control"
            placeholder="Search courses, technologies, or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              paddingLeft: 38,
              height: 40,
              fontSize: 13,
              borderRadius: 9999
            }}
          />
        </div>

        {/* Navigation & Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* Main View Switcher */}
          <nav style={{ display: 'flex', gap: 6, background: 'rgba(255,255,255,0.04)', padding: 4, borderRadius: 12, border: '1px solid var(--border-subtle)' }}>
            <button
              onClick={() => setCurrentView('catalog')}
              className={`btn btn-sm ${currentView === 'catalog' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ border: 'none', borderRadius: 8 }}
            >
              <BookOpen size={14} />
              Catalog
            </button>
            <button
              onClick={() => setCurrentView('learning')}
              className={`btn btn-sm ${currentView === 'learning' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ border: 'none', borderRadius: 8 }}
            >
              <Layers size={14} />
              My Learning
            </button>
          </nav>

          {/* Daily Streak Indicator */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'rgba(245, 158, 11, 0.12)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            padding: '6px 12px',
            borderRadius: 9999,
            fontSize: 12,
            fontWeight: 700,
            color: '#fbbf24'
          }}>
            <Flame size={16} color="#f59e0b" fill="#f59e0b" />
            <span>{streak} Day Streak</span>
          </div>

          {/* Role Switcher */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            background: 'rgba(15, 23, 42, 0.9)',
            border: '1px solid var(--border-subtle)',
            padding: '4px 6px',
            borderRadius: 10
          }}>
            <span style={{ fontSize: 11, color: 'var(--text-muted)', marginRight: 4, fontWeight: 600 }}>Role:</span>
            <button
              onClick={() => { setUserRole('student'); setCurrentView('catalog'); }}
              style={{
                background: userRole === 'student' ? 'var(--accent-primary)' : 'transparent',
                color: userRole === 'student' ? '#fff' : 'var(--text-secondary)',
                border: 'none',
                padding: '4px 8px',
                borderRadius: 6,
                fontSize: 11,
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <UserCheck size={12} style={{ display: 'inline', marginRight: 4 }} />
              Student
            </button>
            <button
              onClick={() => { setUserRole('instructor'); setCurrentView('instructor'); }}
              style={{
                background: userRole === 'instructor' ? '#8b5cf6' : 'transparent',
                color: userRole === 'instructor' ? '#fff' : 'var(--text-secondary)',
                border: 'none',
                padding: '4px 8px',
                borderRadius: 6,
                fontSize: 11,
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <GraduationCap size={12} style={{ display: 'inline', marginRight: 4 }} />
              Instructor
            </button>
            <button
              onClick={() => { setUserRole('admin'); setCurrentView('admin'); }}
              style={{
                background: userRole === 'admin' ? '#ef4444' : 'transparent',
                color: userRole === 'admin' ? '#fff' : 'var(--text-secondary)',
                border: 'none',
                padding: '4px 8px',
                borderRadius: 6,
                fontSize: 11,
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <ShieldCheck size={12} style={{ display: 'inline', marginRight: 4 }} />
              Admin
            </button>
          </div>

          {/* User Profile & Sign In Button */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            paddingLeft: 8,
            borderLeft: '1px solid var(--border-subtle)'
          }}>
            <button
              onClick={onOpenLogin}
              title="Click to Sign In or Switch Account"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 20,
                padding: '4px 10px 4px 6px',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <div style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: currentUser.role === 'student' 
                  ? 'linear-gradient(135deg, #2563eb, #8b5cf6)' 
                  : currentUser.role === 'instructor' 
                  ? 'linear-gradient(135deg, #8b5cf6, #d946ef)' 
                  : 'linear-gradient(135deg, #ef4444, #f97316)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: 12,
                color: '#ffffff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.4)'
              }}>
                {currentUser.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>{currentUser.name}</div>
                <div style={{ fontSize: 9, color: '#38bdf8', fontWeight: 600 }}>{currentUser.role.toUpperCase()} &bull; Sign In</div>
              </div>
              <LogIn size={13} color="var(--text-muted)" style={{ marginLeft: 4 }} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
