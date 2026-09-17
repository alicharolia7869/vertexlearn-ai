import React, { useState } from 'react';
import { 
  Compass, 
  CheckCircle2, 
  Sparkles, 
  BookOpen
} from 'lucide-react';

interface RoadmapsViewProps {
  onSelectTrackCourse?: (courseId: string) => void;
  onNavigateCatalog: () => void;
}

interface RoadmapStep {
  number: number;
  title: string;
  description: string;
  deliverable: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  tags: string[];
}

interface RoadmapTrack {
  id: string;
  title: string;
  badge: string;
  description: string;
  duration: string;
  steps: RoadmapStep[];
}

export const RoadmapsView: React.FC<RoadmapsViewProps> = ({
  onNavigateCatalog
}) => {
  const tracks: RoadmapTrack[] = [
    {
      id: 'frontend-internmo',
      title: 'Front-End Internship Engineering Track',
      badge: 'ALI CHAROLIA SPECIALIZATION',
      description: 'The step-by-step master plan for building modern interactive learning management platforms with React 19, Vite, AI tutoring, and LocalStorage.',
      duration: '4-Week Intensive',
      steps: [
        {
          number: 1,
          title: 'Project Architecture & Mock Data Engineering',
          description: 'Initialized Vite with React 19 and TypeScript. Engineered domain models for courses, lessons, quizzes, and auto-saving notes.',
          deliverable: 'TypeScript Interfaces, StorageService, Initial Courses Catalog',
          status: 'completed',
          tags: ['React 19', 'Vite', 'TypeScript']
        },
        {
          number: 2,
          title: 'Course Catalog, Live Search & Dashboard',
          description: 'Built glassmorphic catalog with real-time keyword search, category filtering (Web Dev, Python, UI/UX), streak badges, and instant enrollment.',
          deliverable: 'Course Catalog & Dashboard Screen with "My Learning" widgets',
          status: 'completed',
          tags: ['Catalog', 'Filters', 'Search']
        },
        {
          number: 3,
          title: 'Interactive Classroom & Auto-Saving Notes',
          description: 'Engineered 16:9 embedded video classroom with playlist tracking, instant lesson switching, and auto-saving notes synced to LocalStorage.',
          deliverable: 'VideoPlayer component with .txt export and LocalStorage persistence',
          status: 'completed',
          tags: ['Video Streaming', 'LocalStorage Notes']
        },
        {
          number: 4,
          title: 'Serverless AI Tutor with Interactive Flashcards',
          description: 'Created Vercel Serverless Function /api/tutor supporting Gemini API, OpenAI API, and curriculum knowledge base with 3D flip flashcards.',
          deliverable: 'AITutorChat drawer with timestamp citations & difficulty levels',
          status: 'completed',
          tags: ['AI Tutor', 'Serverless API', 'Flashcards']
        },
        {
          number: 5,
          title: 'Assessment Quiz & Vector PDF Diploma Generator',
          description: 'Built curriculum-specific 5-question quizzes with instant grading, celebratory confetti, and vector PDF certificates generated via jsPDF.',
          deliverable: 'QuizModal & Client-side PDF Certificate Downloader',
          status: 'completed',
          tags: ['jsPDF', 'Canvas Confetti', 'Assessment']
        },
        {
          number: 6,
          title: 'Instructor Studio & Admin Moderation Queue',
          description: 'Engineered multi-role authentication with Instructor course builder and Super Admin queue for approving or unpublishing public listings.',
          deliverable: 'InstructorAdminView component with role switching',
          status: 'completed',
          tags: ['Moderation', 'Role RBAC', 'Studio']
        },
        {
          number: 7,
          title: 'Vercel Production Deployment & GitHub CI/CD',
          description: 'Configured vercel.json for SPA deep-link rewrites, deployed to Vercel production with edge HTTPS, and pushed to GitHub repository.',
          deliverable: 'Live Vercel Production URL & Clean GitHub Repository',
          status: 'completed',
          tags: ['Vercel', 'GitHub', 'CI/CD']
        }
      ]
    },
    {
      id: 'ai-architect',
      title: 'Full-Stack AI & LLM Systems Specialist',
      badge: 'ADVANCED CURRICULUM',
      description: 'Master full-stack generative AI applications, vector search embeddings, serverless APIs, and real-time streaming architectures.',
      duration: '6-Week Program',
      steps: [
        {
          number: 1,
          title: 'LLM Prompt Engineering & System Design',
          description: 'Techniques for few-shot prompting, structured JSON schema output, and system persona modeling.',
          deliverable: 'Persona prompt templates and validation schemas',
          status: 'completed',
          tags: ['Prompting', 'JSON Schema']
        },
        {
          number: 2,
          title: 'Serverless Edge Functions & Streaming APIs',
          description: 'Connecting Vercel Edge runtime with streaming SSE (Server-Sent Events) for real-time token delivery.',
          deliverable: 'Vercel Serverless Functions with streaming responses',
          status: 'in-progress',
          tags: ['Streaming', 'Serverless', 'Node.js']
        },
        {
          number: 3,
          title: 'Retrieval Augmented Generation (RAG)',
          description: 'Vector embeddings, chunking strategies, cosine similarity search, and grounding AI responses in factual documents.',
          deliverable: 'In-memory RAG pipeline with curriculum grounding',
          status: 'upcoming',
          tags: ['Vector DB', 'RAG', 'Embeddings']
        }
      ]
    },
    {
      id: 'uiux-design',
      title: 'Design Systems & Modern Micro-Interactions',
      badge: 'DESIGN TRACK',
      description: 'Transform wireframes into high-converting, accessible, and polished user experiences using glassmorphism and CSS tokens.',
      duration: '3-Week Track',
      steps: [
        {
          number: 1,
          title: 'CSS Custom Properties & Design Tokens',
          description: 'Establishing scalable color palettes, dark mode tokens, and fluid typography hierarchies.',
          deliverable: 'Modular index.css tokens system',
          status: 'completed',
          tags: ['CSS Variables', 'Design Tokens']
        },
        {
          number: 2,
          title: 'Glassmorphism & Depth Elevation',
          description: 'Backdrop blur filters, subtle borders, radial ambient lighting, and high-contrast dark themes.',
          deliverable: 'Glass-panel utility classes and glow layers',
          status: 'completed',
          tags: ['Glassmorphism', 'Backdrop Filter']
        },
        {
          number: 3,
          title: 'Accessibility (WCAG 2.1) & Micro-Animations',
          description: 'ARIA attributes, keyboard navigation, focus rings, and smooth GPU-accelerated transitions.',
          deliverable: 'WCAG AAA color contrast and accessible buttons',
          status: 'in-progress',
          tags: ['Accessibility', 'Micro-interactions']
        }
      ]
    }
  ];

  const [selectedTrackId, setSelectedTrackId] = useState<string>('frontend-internmo');
  const activeTrack = tracks.find((t) => t.id === selectedTrackId) || tracks[0];

  return (
    <div style={{ maxWidth: 1380, margin: '0 auto', padding: '30px 24px 80px' }} className="animate-fade-in">
      {/* Header */}
      <div className="glass-panel" style={{
        padding: '36px 40px',
        marginBottom: 32,
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.8))',
        border: '1px solid rgba(59, 130, 246, 0.3)'
      }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px', background: 'rgba(59, 130, 246, 0.15)', borderRadius: 20, marginBottom: 12 }}>
          <Compass size={14} color="#60a5fa" />
          <span style={{ fontSize: 11, fontWeight: 700, color: '#93c5fd' }}>CAREER LEARNING PATHWAYS</span>
        </div>
        <h1 style={{ fontSize: 30, marginBottom: 10 }}>
          Interactive <span className="gradient-text">Career Roadmaps</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14, maxWidth: 740, lineHeight: 1.6 }}>
          Explore structured milestone blueprints engineered for the Internmo Front-End Track and modern engineering disciplines. Follow progress from zero setup to live production deployment.
        </p>
      </div>

      {/* Track Selector Tabs */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 28, flexWrap: 'wrap' }}>
        {tracks.map((track) => {
          const isSelected = track.id === selectedTrackId;
          return (
            <button
              key={track.id}
              onClick={() => setSelectedTrackId(track.id)}
              className="glass-panel"
              style={{
                flex: '1 1 300px',
                padding: '16px 20px',
                textAlign: 'left',
                cursor: 'pointer',
                border: isSelected ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                background: isSelected ? 'rgba(59, 130, 246, 0.15)' : 'rgba(15, 23, 42, 0.6)',
                transition: 'all 0.2s ease'
              }}
            >
              <span className="badge badge-blue" style={{ fontSize: 9, marginBottom: 6 }}>{track.badge}</span>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#f8fafc', marginBottom: 4 }}>{track.title}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{track.duration} &bull; {track.steps.length} Milestones</div>
            </button>
          );
        })}
      </div>

      {/* Active Track Milestones */}
      <div className="glass-panel" style={{ padding: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h2 style={{ fontSize: 22, margin: 0 }}>{activeTrack.title}</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 4 }}>{activeTrack.description}</p>
          </div>
          <button
            onClick={onNavigateCatalog}
            className="btn btn-primary"
            style={{ fontSize: 13, padding: '8px 18px' }}
          >
            <BookOpen size={14} />
            Explore Curriculum Courses
          </button>
        </div>

        {/* Milestone Steps Timeline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {activeTrack.steps.map((step) => (
            <div
              key={step.number}
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 14,
                padding: '20px 24px',
                display: 'flex',
                gap: 20,
                alignItems: 'flex-start',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: step.status === 'completed' 
                  ? 'rgba(16, 185, 129, 0.2)' 
                  : step.status === 'in-progress' 
                  ? 'rgba(59, 130, 246, 0.2)' 
                  : 'rgba(148, 163, 184, 0.1)',
                border: `1px solid ${step.status === 'completed' ? '#10b981' : step.status === 'in-progress' ? 'var(--accent-primary)' : 'var(--border-subtle)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                fontWeight: 800,
                fontSize: 14,
                color: step.status === 'completed' ? '#34d399' : step.status === 'in-progress' ? '#60a5fa' : '#94a3b8'
              }}>
                {step.status === 'completed' ? <CheckCircle2 size={18} color="#10b981" /> : step.number}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
                  <h3 style={{ fontSize: 16, margin: 0, color: '#f8fafc' }}>{step.title}</h3>
                  <span className={`badge ${step.status === 'completed' ? 'badge-green' : step.status === 'in-progress' ? 'badge-blue' : 'badge-purple'}`} style={{ fontSize: 9 }}>
                    {step.status === 'completed' ? 'COMPLETED' : step.status === 'in-progress' ? 'ACTIVE PHASE' : 'UPCOMING'}
                  </span>
                </div>

                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 12 }}>
                  {step.description}
                </p>

                <div style={{
                  background: 'rgba(15, 23, 42, 0.6)',
                  padding: '8px 12px',
                  borderRadius: 8,
                  fontSize: 12,
                  color: '#93c5fd',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 12
                }}>
                  <Sparkles size={14} color="#60a5fa" />
                  <strong>Deliverable:</strong> {step.deliverable}
                </div>

                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {step.tags.map((tag) => (
                    <span key={tag} style={{
                      fontSize: 10,
                      padding: '2px 8px',
                      borderRadius: 4,
                      background: 'rgba(255,255,255,0.05)',
                      color: 'var(--text-muted)'
                    }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
