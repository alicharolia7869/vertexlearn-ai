import React, { useState } from 'react';
import { 
  BookOpen, 
  Download, 
  Eye, 
  Star, 
  Clock, 
  CheckCircle2, 
  X,
  FileText
} from 'lucide-react';

interface EBookItem {
  id: string;
  title: string;
  category: string;
  author: string;
  pages: string;
  readTime: string;
  rating: number;
  description: string;
  chapters: string[];
  pdfFileName?: string;
  featured?: boolean;
}

export const EBooksView: React.FC = () => {
  const [selectedEBook, setSelectedEBook] = useState<EBookItem | null>(null);

  const ebooks: EBookItem[] = [
    {
      id: 'vertexlearn-official-guide',
      title: 'VertexLearn AI: Comprehensive Engineering & Submission Guide',
      category: 'Internship Project Spec',
      author: 'Ali Charolia',
      pages: '2 Pages / Comprehensive',
      readTime: '10 min read',
      rating: 5.0,
      description: 'The official architectural blueprint and submission guide for the Internmo Front-End Track. Details the step-by-step development of the interactive LMS, AI Tutor, and verifiable PDF diploma generator.',
      chapters: [
        '1. Executive Project Overview & Internmo Track Alignment',
        '2. Technical Stack (React 19, TypeScript, Vite, LocalStorage)',
        '3. 5 Core Screen Specifications & Acceptance Criteria',
        '4. AI Tutor Integration & Generative Cues Architecture',
        '5. Client-Side Vector PDF Diploma Engine (jsPDF)',
        '6. Submission Checklist & Vercel Deployment Verification'
      ],
      pdfFileName: 'VertexLearn_AI_Frontend_Guide.pdf',
      featured: true
    },
    {
      id: 'react-19-mastery',
      title: 'React 19 & Modern Client Architecture Handbook',
      category: 'Web Development',
      author: 'Sarah Jenkins',
      pages: '48 Pages',
      readTime: '45 min read',
      rating: 4.9,
      description: 'In-depth guide to modern state encapsulation, lazy initializers, React Compiler optimizations, and avoiding cascading effect re-renders.',
      chapters: [
        '1. React 19 Paradigm Shift',
        '2. Synchronous Lazy Initializers vs useEffect Overfetching',
        '3. Pure Render Functions & Deterministic State Transitions',
        '4. LocalStorage Synchronization with Safe Serializers',
        '5. Performance Profiling and 60 FPS Micro-Interactions'
      ]
    },
    {
      id: 'ai-tutor-prompting',
      title: 'Building Intelligent AI Tutors with Serverless Edge APIs',
      category: 'Artificial Intelligence',
      author: 'Dr. Michael Chang',
      pages: '36 Pages',
      readTime: '30 min read',
      rating: 4.95,
      description: 'Architecting resilient educational chatbots using Vercel Serverless Functions, Google Gemini API, system personas, and intelligent curriculum knowledge base fallbacks.',
      chapters: [
        '1. Persona Prompting for Educational Mentors',
        '2. Structured Output & Interactive Flashcard Generation',
        '3. Video Lecture Timestamp Referencing Algorithms',
        '4. Error Recovery & Zero-Key Offline Knowledge Fallback',
        '5. Securing API Keys in Serverless Environments'
      ]
    },
    {
      id: 'design-tokens-guide',
      title: 'Glassmorphism & High-Performance Design Systems',
      category: 'UI/UX Engineering',
      author: 'Elena Rostova',
      pages: '28 Pages',
      readTime: '25 min read',
      rating: 4.88,
      description: 'Practical handbook on crafting stunning modern dark mode interfaces with CSS custom properties, backdrop blur filters, and accessible WCAG color contrast.',
      chapters: [
        '1. Designing with HSL Color Tailoring',
        '2. Glassmorphism Elevation & Ambient Glow Effects',
        '3. Fluid Typography & Modular Scale',
        '4. Hardware Accelerated CSS Transforms',
        '5. Designing for Zero Layout Shift (CLS)'
      ]
    }
  ];

  const handleDownload = (ebook: EBookItem) => {
    if (ebook.pdfFileName) {
      // Direct link to the guide PDF in the repository
      const a = document.createElement('a');
      a.href = `/${ebook.pdfFileName}`;
      a.download = ebook.pdfFileName;
      a.click();
    } else {
      // Download text outline
      const content = `${ebook.title}\nAuthor: ${ebook.author}\nCategory: ${ebook.category}\n\n${ebook.description}\n\nTable of Contents:\n${ebook.chapters.join('\n')}`;
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${ebook.title.replace(/[^a-zA-Z0-9]/g, '_')}_Summary.txt`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

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
          <BookOpen size={14} color="#60a5fa" />
          <span style={{ fontSize: 11, fontWeight: 700, color: '#93c5fd' }}>ENGINEERING STUDY GUIDES & EBOOKS</span>
        </div>
        <h1 style={{ fontSize: 30, marginBottom: 10 }}>
          Technical <span className="gradient-text">eBooks & Guides</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14, maxWidth: 740, lineHeight: 1.6 }}>
          Comprehensive architectural study guides, cheat sheets, and the official Internmo project documentation authored for student mastery and evaluator review.
        </p>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: 24
      }}>
        {ebooks.map((ebook) => (
          <div
            key={ebook.id}
            className="glass-panel"
            style={{
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              border: ebook.featured ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid var(--border-subtle)',
              position: 'relative'
            }}
          >
            {ebook.featured && (
              <div style={{ position: 'absolute', top: 12, right: 12 }}>
                <span className="badge badge-amber" style={{ fontSize: 9 }}>⭐ OFFICIAL INTERNMO SPEC</span>
              </div>
            )}

            <div>
              <span className="badge badge-blue" style={{ marginBottom: 10 }}>{ebook.category}</span>
              <h3 style={{ fontSize: 17, marginBottom: 8, lineHeight: 1.35, color: '#f8fafc' }}>
                {ebook.title}
              </h3>
              <div style={{ fontSize: 12, color: '#93c5fd', fontWeight: 600, marginBottom: 12 }}>
                By {ebook.author}
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 16 }}>
                {ebook.description}
              </p>
            </div>

            <div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: 11,
                color: 'var(--text-muted)',
                paddingTop: 12,
                borderTop: '1px solid var(--border-subtle)',
                marginBottom: 16
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Clock size={12} /> {ebook.readTime}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <FileText size={12} /> {ebook.pages}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#fbbf24', fontWeight: 700 }}>
                  <Star size={12} fill="#fbbf24" /> {ebook.rating}
                </span>
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  onClick={() => setSelectedEBook(ebook)}
                  className="btn btn-secondary"
                  style={{ flex: 1, padding: '8px', fontSize: 12 }}
                >
                  <Eye size={14} />
                  Table of Contents
                </button>
                <button
                  onClick={() => handleDownload(ebook)}
                  className="btn btn-primary"
                  style={{ padding: '8px 14px', fontSize: 12 }}
                  title="Download Document"
                >
                  <Download size={14} />
                  {ebook.pdfFileName ? 'PDF' : 'Read'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Reader Modal */}
      {selectedEBook && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 150,
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(12px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20
        }} className="animate-fade-in">
          <div className="glass-panel" style={{
            width: '100%',
            maxWidth: 620,
            maxHeight: '90vh',
            overflowY: 'auto',
            background: '#0f172a',
            border: '1px solid rgba(59, 130, 246, 0.4)',
            padding: '28px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div>
                <span className="badge badge-blue" style={{ marginBottom: 6 }}>{selectedEBook.category}</span>
                <h3 style={{ fontSize: 19, margin: '4px 0 6px' }}>{selectedEBook.title}</h3>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  Author: <strong>{selectedEBook.author}</strong> &bull; {selectedEBook.readTime}
                </div>
              </div>
              <button onClick={() => setSelectedEBook(null)} className="btn btn-icon btn-secondary">
                <X size={16} />
              </button>
            </div>

            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 20 }}>
              {selectedEBook.description}
            </p>

            <h4 style={{ fontSize: 14, color: '#93c5fd', marginBottom: 12 }}>
              📑 Table of Contents & Curriculum Sections:
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
              {selectedEBook.chapters.map((ch, idx) => (
                <div key={idx} style={{
                  padding: '10px 14px',
                  borderRadius: 8,
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: 13,
                  color: '#f8fafc',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10
                }}>
                  <CheckCircle2 size={15} color="#10b981" />
                  <span>{ch}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button onClick={() => setSelectedEBook(null)} className="btn btn-secondary">
                Close Preview
              </button>
              <button onClick={() => handleDownload(selectedEBook)} className="btn btn-primary">
                <Download size={14} />
                Download Document
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
