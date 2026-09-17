import React, { useState } from 'react';
import { StorageService, type Course } from '../data/coursesData';
import { 
  X, 
  Award, 
  AlertCircle, 
  Download, 
  RotateCcw, 
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { jsPDF } from 'jspdf';

interface QuizModalProps {
  course: Course;
  isOpen: boolean;
  onClose: () => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({ course, isOpen, onClose }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  if (!isOpen) return null;

  const handleSelectOption = (qId: number, optIdx: number) => {
    if (submitted) return;
    setSelectedAnswers({ ...selectedAnswers, [qId]: optIdx });
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    course.quiz.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    setScore(correctCount);
    setSubmitted(true);
    StorageService.saveQuizScore(course.id, correctCount);

    if (correctCount >= 3) {
      // Fire celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  // Generate authentic PDF Diploma for Ali Charolia
  const generateCertificatePDF = () => {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4' // 297mm x 210mm
    });

    // Dark luxury certificate background
    doc.setFillColor(15, 23, 42); // #0f172a
    doc.rect(0, 0, 297, 210, 'F');

    // Outer gold border
    doc.setDrawColor(217, 119, 6); // gold
    doc.setLineWidth(2);
    doc.rect(10, 10, 277, 190);

    // Inner subtle border
    doc.setDrawColor(59, 130, 246); // blue
    doc.setLineWidth(0.8);
    doc.rect(14, 14, 269, 182);

    // Header Title
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(245, 158, 11);
    doc.setFontSize(26);
    doc.text('VERTEXLEARN AI & INTERNMO', 148.5, 38, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(13);
    doc.setTextColor(148, 163, 184);
    doc.text('CERTIFICATE OF ACADEMIC ACHIEVEMENT', 148.5, 48, { align: 'center' });

    // Decorative line
    doc.setDrawColor(245, 158, 11);
    doc.setLineWidth(1);
    doc.line(70, 54, 227, 54);

    // Body
    doc.setTextColor(226, 232, 240);
    doc.setFontSize(14);
    doc.text('This is proudly presented to:', 148.5, 70, { align: 'center' });

    // Student Name (Highlight)
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(32);
    doc.setTextColor(255, 255, 255);
    doc.text('Ali Charolia', 148.5, 88, { align: 'center' });

    // Name Underline
    doc.setDrawColor(59, 130, 246);
    doc.setLineWidth(0.5);
    doc.line(90, 93, 207, 93);

    // Achievement text
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(13);
    doc.setTextColor(203, 213, 225);
    doc.text(
      `For successfully demonstrating mastery and achieving a passing grade of ${score}/5 on:`,
      148.5,
      106,
      { align: 'center' }
    );

    // Course Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.setTextColor(96, 165, 250);
    doc.text(course.title, 148.5, 120, { align: 'center' });

    // Track
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(12);
    doc.setTextColor(148, 163, 184);
    doc.text(`Front-End Engineering Track • Specialization in Modern Interactive Interfaces`, 148.5, 130, { align: 'center' });

    // Verification ID & Date
    const certId = `VL-${Math.random().toString(36).substring(2, 9).toUpperCase()}-2026`;
    const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(148, 163, 184);

    // Instructor Sign line
    doc.setDrawColor(100, 116, 139);
    doc.line(35, 168, 95, 168);
    doc.text(course.instructor, 65, 174, { align: 'center' });
    doc.text('Lead Course Instructor', 65, 179, { align: 'center' });

    // Gold Medal Seal in Center
    doc.setFillColor(245, 158, 11);
    doc.circle(148.5, 164, 12, 'F');
    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('VERIFIED', 148.5, 163, { align: 'center' });
    doc.text('HONORS', 148.5, 167, { align: 'center' });

    // Program Director Sign line
    doc.setDrawColor(100, 116, 139);
    doc.setTextColor(148, 163, 184);
    doc.line(202, 168, 262, 168);
    doc.text('Internmo Evaluator', 232, 174, { align: 'center' });
    doc.text('Front-End Internship Track', 232, 179, { align: 'center' });

    // Bottom Verification Hash
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text(`Issued: ${today} | Verification ID: ${certId} | Internmo Project Submission`, 148.5, 192, { align: 'center' });

    // Save and Trigger Download
    doc.save(`VertexLearn_Certificate_${course.id}_Ali_Charolia.pdf`);
  };

  const isPassed = score >= 3;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 110,
      background: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20
    }} className="animate-fade-in">
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: 780,
        maxHeight: '90vh',
        overflowY: 'auto',
        background: '#0f172a',
        border: '1px solid rgba(59, 130, 246, 0.4)',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.9)'
      }}>
        {/* Modal Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              background: 'rgba(245, 158, 11, 0.15)',
              border: '1px solid rgba(245, 158, 11, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Award size={22} color="#fbbf24" />
            </div>
            <div>
              <h3 style={{ fontSize: 18, margin: 0 }}>Course Assessment & Diploma</h3>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                {course.title} &bull; 5 Multiple Choice Questions
              </div>
            </div>
          </div>

          <button onClick={onClose} className="btn btn-icon btn-secondary" style={{ width: 32, height: 32 }}>
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px', overflowY: 'auto' }}>
          {/* Result Banner if submitted */}
          {submitted ? (
            <div style={{
              padding: '24px',
              borderRadius: 16,
              textAlign: 'center',
              background: isPassed 
                ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(59, 130, 246, 0.2))' 
                : 'rgba(239, 68, 68, 0.15)',
              border: `1px solid ${isPassed ? '#10b981' : '#ef4444'}`,
              marginBottom: 24
            }}>
              <div style={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                background: isPassed ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                margin: '0 auto 12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {isPassed ? (
                  <Sparkles size={32} color="#34d399" />
                ) : (
                  <AlertCircle size={32} color="#f87171" />
                )}
              </div>

              <h2 style={{ fontSize: 24, marginBottom: 6 }}>
                {isPassed ? 'Congratulations, Ali Charolia! 🎉' : 'Keep practicing!'}
              </h2>
              <p style={{ fontSize: 15, color: 'var(--text-secondary)', marginBottom: 16 }}>
                You scored <strong style={{ color: isPassed ? '#34d399' : '#f87171', fontSize: 18 }}>{score} out of {course.quiz.length}</strong> ({Math.round((score / course.quiz.length) * 100)}%).
                {isPassed ? ' You have officially passed and earned your verifiable course diploma!' : ' You need at least 3/5 to qualify for the certificate.'}
              </p>

              <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                {isPassed && (
                  <button
                    onClick={generateCertificatePDF}
                    className="btn btn-primary"
                    style={{
                      background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                      boxShadow: '0 4px 16px rgba(245, 158, 11, 0.4)',
                      padding: '10px 24px',
                      fontSize: 14
                    }}
                  >
                    <Download size={16} />
                    Download Official PDF Certificate
                  </button>
                )}

                <button
                  onClick={handleReset}
                  className="btn btn-secondary"
                  style={{ padding: '10px 18px', fontSize: 14 }}
                >
                  <RotateCcw size={16} />
                  Retake Quiz
                </button>
              </div>
            </div>
          ) : null}

          {/* Questions list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {course.quiz.map((q, qIndex) => {
              const userAns = selectedAnswers[q.id];
              const isCorrect = userAns === q.correctAnswer;

              return (
                <div
                  key={q.id}
                  style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 12,
                    padding: '18px 20px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: '#f8fafc' }}>
                      Question {qIndex + 1} of {course.quiz.length}: {q.question}
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {q.options.map((opt, optIndex) => {
                      const isSelected = userAns === optIndex;

                      let borderColor = 'var(--border-subtle)';
                      let bgColor = 'rgba(15, 23, 42, 0.6)';

                      if (submitted) {
                        if (optIndex === q.correctAnswer) {
                          borderColor = '#10b981';
                          bgColor = 'rgba(16, 185, 129, 0.15)';
                        } else if (isSelected && !isCorrect) {
                          borderColor = '#ef4444';
                          bgColor = 'rgba(239, 68, 68, 0.15)';
                        }
                      } else if (isSelected) {
                        borderColor = 'var(--accent-primary)';
                        bgColor = 'rgba(59, 130, 246, 0.15)';
                      }

                      return (
                        <div
                          key={optIndex}
                          onClick={() => handleSelectOption(q.id, optIndex)}
                          style={{
                            padding: '10px 14px',
                            borderRadius: 8,
                            border: `1px solid ${borderColor}`,
                            background: bgColor,
                            cursor: submitted ? 'default' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 10,
                            fontSize: 13,
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <div style={{
                            width: 18,
                            height: 18,
                            borderRadius: '50%',
                            border: `2px solid ${isSelected ? 'var(--accent-primary)' : '#64748b'}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}>
                            {isSelected && (
                              <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-primary)' }} />
                            )}
                          </div>
                          <span>{opt}</span>
                        </div>
                      );
                    })}
                  </div>

                  {submitted && (
                    <div style={{
                      marginTop: 10,
                      padding: '8px 12px',
                      borderRadius: 8,
                      fontSize: 12,
                      background: 'rgba(255, 255, 255, 0.04)',
                      color: '#94a3b8'
                    }}>
                      💡 <strong>Explanation:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        {!submitted && (
          <div style={{
            padding: '16px 24px',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'rgba(9, 13, 22, 0.5)'
          }}>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
              {Object.keys(selectedAnswers).length} of {course.quiz.length} answered
            </span>

            <button
              onClick={handleSubmitQuiz}
              disabled={Object.keys(selectedAnswers).length < course.quiz.length}
              className="btn btn-primary"
              style={{
                opacity: Object.keys(selectedAnswers).length < course.quiz.length ? 0.5 : 1,
                cursor: Object.keys(selectedAnswers).length < course.quiz.length ? 'not-allowed' : 'pointer'
              }}
            >
              Submit Quiz & View Score
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
