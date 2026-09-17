import React from 'react';
import type { UserProfile } from '../data/coursesData';
import { 
  Sparkles, 
  Flame, 
  Search, 
  GraduationCap, 
  ShieldCheck, 
  UserCheck, 
  BookOpen, 
  Layers, 
  LogIn, 
  Compass, 
  FileText, 
  Bot,
  Settings
} from 'lucide-react';

export type AppView = 'catalog' | 'learning' | 'roadmaps' | 'ebooks' | 'admin' | 'instructor';

interface NavbarProps {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  userRole: 'student' | 'instructor' | 'admin';
  setUserRole: (role: 'student' | 'instructor' | 'admin') => void;
  currentUser: UserProfile;
  onOpenLogin: () => void;
  onOpenProfileSettings: () => void;
  onOpenAITutor: () => void;
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
  onOpenProfileSettings,
  onOpenAITutor,
  searchQuery,
  setSearchQuery,
  streak
}) => {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'rgba(9, 13, 22, 0.88)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-subtle)',
      padding: '12px 24px'
    }}>
      <div style={{
        maxWidth: 1400,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        flexWrap: 'wrap'
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
              <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em' }}>
                VertexLearn <span className="gradient-text">AI</span>
              </span>
              <span className="badge badge-blue" style={{ fontSize: 9, padding: '2px 6px' }}>PROD</span>
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 500 }}>
              Interactive LMS &bull; Ali Charolia
            </div>
          </div>
        </div>

        {/* Global Search Bar */}
        <div style={{
          flex: 1,
          minWidth: 220,
          maxWidth: 360,
          position: 'relative'
        }}>
          <Search 
            size={15} 
            color="var(--text-muted)" 
            style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} 
          />
          <input 
            type="text"
            className="input-control"
            placeholder="Search courses, roadmaps, topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              paddingLeft: 38,
              height: 38,
              fontSize: 13,
              borderRadius: 9999
            }}
          />
        </div>

        {/* Navigation Tabs */}
        <nav style={{ 
          display: 'flex', 
          gap: 4, 
          background: 'rgba(255,255,255,0.04)', 
          padding: 4, 
          borderRadius: 12, 
          border: '1px solid var(--border-subtle)' 
        }}>
          <button
            onClick={() => setCurrentView('catalog')}
            className={`btn btn-sm ${currentView === 'catalog' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ border: 'none', borderRadius: 8, fontSize: 12 }}
          >
            <BookOpen size={14} />
            Catalog
          </button>
          <button
            onClick={() => setCurrentView('roadmaps')}
            className={`btn btn-sm ${currentView === 'roadmaps' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ border: 'none', borderRadius: 8, fontSize: 12 }}
          >
            <Compass size={14} />
            Roadmaps
          </button>
          <button
            onClick={() => setCurrentView('ebooks')}
            className={`btn btn-sm ${currentView === 'ebooks' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ border: 'none', borderRadius: 8, fontSize: 12 }}
          >
            <FileText size={14} />
            eBooks
          </button>
          <button
            onClick={() => setCurrentView('learning')}
            className={`btn btn-sm ${currentView === 'learning' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ border: 'none', borderRadius: 8, fontSize: 12 }}
          >
            <Layers size={14} />
            My Learning
          </button>
        </nav>

        {/* AI Tutor Quick Access */}
        <button
          onClick={onOpenAITutor}
          className="btn btn-sm"
          style={{
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.25), rgba(59, 130, 246, 0.25))',
            border: '1px solid rgba(139, 92, 246, 0.5)',
            color: '#c4b5fd',
            borderRadius: 10,
            fontWeight: 700,
            fontSize: 12,
            gap: 6
          }}
        >
          <Bot size={15} color="#a78bfa" />
          <span>AI Tutor</span>
          <span style={{ fontSize: 9, padding: '1px 5px', background: '#8b5cf6', color: '#fff', borderRadius: 4 }}>LIVE</span>
        </button>

        {/* Daily Streak */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 5,
          background: 'rgba(245, 158, 11, 0.12)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          padding: '5px 10px',
          borderRadius: 9999,
          fontSize: 12,
          fontWeight: 700,
          color: '#fbbf24'
        }}>
          <Flame size={15} color="#f59e0b" fill="#f59e0b" />
          <span>{streak}d</span>
        </div>

        {/* Role Switcher */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 3,
          background: 'rgba(15, 23, 42, 0.9)',
          border: '1px solid var(--border-subtle)',
          padding: '3px 5px',
          borderRadius: 10
        }}>
          <button
            onClick={() => { setUserRole('student'); setCurrentView('catalog'); }}
            style={{
              background: userRole === 'student' ? 'var(--accent-primary)' : 'transparent',
              color: userRole === 'student' ? '#fff' : 'var(--text-secondary)',
              border: 'none',
              padding: '4px 7px',
              borderRadius: 6,
              fontSize: 11,
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <UserCheck size={12} style={{ display: 'inline', marginRight: 3 }} />
            Student
          </button>
          <button
            onClick={() => { setUserRole('instructor'); setCurrentView('instructor'); }}
            style={{
              background: userRole === 'instructor' ? '#8b5cf6' : 'transparent',
              color: userRole === 'instructor' ? '#fff' : 'var(--text-secondary)',
              border: 'none',
              padding: '4px 7px',
              borderRadius: 6,
              fontSize: 11,
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <GraduationCap size={12} style={{ display: 'inline', marginRight: 3 }} />
            Instructor
          </button>
          <button
            onClick={() => { setUserRole('admin'); setCurrentView('admin'); }}
            style={{
              background: userRole === 'admin' ? '#ef4444' : 'transparent',
              color: userRole === 'admin' ? '#fff' : 'var(--text-secondary)',
              border: 'none',
              padding: '4px 7px',
              borderRadius: 6,
              fontSize: 11,
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <ShieldCheck size={12} style={{ display: 'inline', marginRight: 3 }} />
            Admin
          </button>
        </div>

        {/* Profile & Settings Trigger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={onOpenProfileSettings}
            title="Profile, Preferences & Settings"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 20,
              padding: '3px 10px 3px 4px',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <div style={{
              width: 30,
              height: 30,
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
              fontSize: 11,
              color: '#ffffff'
            }}>
              {currentUser.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>
                {currentUser.name}
              </div>
              <div style={{ fontSize: 9, color: '#38bdf8', fontWeight: 600 }}>
                {currentUser.role.toUpperCase()} &bull; Settings
              </div>
            </div>
            <Settings size={13} color="var(--text-muted)" style={{ marginLeft: 2 }} />
          </button>

          {/* Quick Sign In / Register Modal Button */}
          <button
            onClick={onOpenLogin}
            title="Sign In or Switch Account"
            className="btn btn-sm btn-secondary"
            style={{ padding: '6px 10px', borderRadius: 8, fontSize: 11 }}
          >
            <LogIn size={13} />
            <span>Auth</span>
          </button>
        </div>
      </div>
    </header>
  );
};
