import { useState } from 'react';
import type { Course, Flashcard } from '../data/coursesData';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles
} from 'lucide-react';

interface AITutorChatProps {
  course: Course;
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp?: string;
  flashcards?: Flashcard[];
}

export const AITutorChat: React.FC<AITutorChatProps> = ({ course, isOpen, onClose }) => {
  const [difficulty, setDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');
  const [inputQuery, setInputQuery] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [flippedCardIndex, setFlippedCardIndex] = useState<number | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: `Hello Ali! 👋 I am your dedicated **AI Tutor** for *${course.title}*. I'm set to **${difficulty}** mode. Ask me anything about the lectures, or use the quick action prompts below!`
    }
  ]);

  if (!isOpen) return null;

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setIsTyping(true);

    // Simulate AI response based on query and difficulty
    setTimeout(() => {
      let responseText = '';
      let cards: Flashcard[] | undefined = undefined;

      const lower = query.toLowerCase();

      if (lower.includes('summarize') || lower.includes('summary')) {
        responseText = `📌 **Lecture Summary (${difficulty} Level)**:\n\nIn this lecture of *${course.title}*, we covered core structural concepts. At **[01:15]**, we explored the component breakdown and state boundaries. Later at **[04:30]**, we saw how diffing algorithms optimize real-world re-renders. Key takeaway: Always colocate state where it is directly needed!`;
      } else if (lower.includes('flashcard') || lower.includes('cards')) {
        responseText = `🗂️ I've generated interactive flashcards based on the current lesson topics. Click on any card below to flip and test your knowledge!`;
        cards = course.flashcards;
      } else if (lower.includes('simple terms') || lower.includes('explain')) {
        responseText = `💡 **In Simple Everyday Terms**:\n\nImagine you are building a LEGO tower. Each component is a specific colored brick. Instead of knocking the whole tower down to change one brick (which is slow), modern frameworks look at a blueprint first (**Virtual DOM at [02:00]**) and swap only that single piece!`;
      } else {
        responseText = `Great question regarding **${course.title}**! In ${difficulty} level: The key principle is separating concerns between presentation and business state. Refer to lesson timestamp **[03:45]** where the instructor demonstrates the implementation pattern step-by-step.`;
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: responseText,
        flashcards: cards
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      width: 440,
      maxWidth: '100vw',
      height: '100vh',
      zIndex: 100,
      background: 'rgba(15, 23, 42, 0.96)',
      backdropFilter: 'blur(20px)',
      borderLeft: '1px solid rgba(59, 130, 246, 0.3)',
      boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.8)',
      display: 'flex',
      flexDirection: 'column'
    }} className="animate-fade-in">
      {/* Header */}
      <div style={{
        padding: '18px 20px',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(9, 13, 22, 0.6)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(139, 92, 246, 0.5)'
          }}>
            <Bot size={20} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <h3 style={{ fontSize: 16, margin: 0 }}>AI Tutor Chat</h3>
              <span className="badge badge-purple" style={{ fontSize: 9, padding: '1px 6px' }}>ONLINE</span>
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
              Assisting with: {course.title.slice(0, 24)}...
            </div>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="btn btn-icon btn-secondary"
          style={{ width: 32, height: 32 }}
        >
          <X size={16} />
        </button>
      </div>

      {/* Difficulty Toggle */}
      <div style={{
        padding: '10px 20px',
        background: 'rgba(255, 255, 255, 0.02)',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>TUTOR LEVEL:</span>
        <div style={{ display: 'flex', gap: 4 }}>
          {(['Beginner', 'Intermediate', 'Advanced'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setDifficulty(lvl)}
              style={{
                background: difficulty === lvl ? 'var(--accent-primary)' : 'transparent',
                color: difficulty === lvl ? '#fff' : 'var(--text-muted)',
                border: 'none',
                borderRadius: 6,
                padding: '4px 8px',
                fontSize: 11,
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Messages List */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '16px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: 14
      }}>
        {messages.map((m) => {
          const isAi = m.sender === 'ai';

          return (
            <div 
              key={m.id}
              style={{
                alignSelf: isAi ? 'flex-start' : 'flex-end',
                maxWidth: '88%',
                display: 'flex',
                gap: 8,
                flexDirection: isAi ? 'row' : 'row-reverse'
              }}
            >
              {isAi && (
                <div style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  background: 'var(--accent-gradient)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: 2
                }}>
                  <Sparkles size={14} color="#fff" />
                </div>
              )}

              <div style={{
                background: isAi ? 'rgba(30, 41, 59, 0.8)' : 'var(--accent-primary)',
                color: '#ffffff',
                border: isAi ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
                borderRadius: 14,
                borderTopLeftRadius: isAi ? 4 : 14,
                borderTopRightRadius: isAi ? 14 : 4,
                padding: '12px 14px',
                fontSize: 13,
                lineHeight: 1.5,
                whiteSpace: 'pre-wrap'
              }}>
                {m.text}

                {/* Flashcards attached */}
                {m.flashcards && (
                  <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {m.flashcards.map((card, cIdx) => {
                      const isFlipped = flippedCardIndex === cIdx;
                      return (
                        <div
                          key={card.id}
                          onClick={() => setFlippedCardIndex(isFlipped ? null : cIdx)}
                          style={{
                            background: isFlipped ? 'rgba(139, 92, 246, 0.2)' : 'rgba(15, 23, 42, 0.7)',
                            border: `1px solid ${isFlipped ? '#a78bfa' : 'var(--border-subtle)'}`,
                            borderRadius: 10,
                            padding: '10px 12px',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#94a3b8', marginBottom: 4 }}>
                            <span>{card.category}</span>
                            <span style={{ color: '#38bdf8' }}>{isFlipped ? 'Click to show Question' : 'Click to Reveal Answer'}</span>
                          </div>
                          <div style={{ fontWeight: 600, fontSize: 12, color: isFlipped ? '#e9d5ff' : '#f8fafc' }}>
                            {isFlipped ? card.answer : card.question}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', fontSize: 12 }}>
            <Sparkles size={14} className="pulse-glow" color="#8b5cf6" />
            AI Tutor is typing response...
          </div>
        )}
      </div>

      {/* Quick Prompt Suggestions */}
      <div style={{
        padding: '8px 20px',
        borderTop: '1px solid var(--border-subtle)',
        background: 'rgba(9, 13, 22, 0.4)',
        display: 'flex',
        gap: 6,
        overflowX: 'auto'
      }}>
        <button
          onClick={() => handleSendMessage('Summarize this lesson')}
          className="btn btn-sm btn-secondary"
          style={{ whiteSpace: 'nowrap', fontSize: 11, padding: '5px 10px', borderRadius: 8 }}
        >
          📝 Summarize
        </button>
        <button
          onClick={() => handleSendMessage('Generate 3 flashcards for this topic')}
          className="btn btn-sm btn-secondary"
          style={{ whiteSpace: 'nowrap', fontSize: 11, padding: '5px 10px', borderRadius: 8 }}
        >
          🗂️ Flashcards
        </button>
        <button
          onClick={() => handleSendMessage('Explain this in simple terms')}
          className="btn btn-sm btn-secondary"
          style={{ whiteSpace: 'nowrap', fontSize: 11, padding: '5px 10px', borderRadius: 8 }}
        >
          💡 Simple Terms
        </button>
      </div>

      {/* Input Form */}
      <div style={{
        padding: '14px 20px 20px',
        borderTop: '1px solid var(--border-subtle)',
        display: 'flex',
        gap: 8,
        background: 'rgba(9, 13, 22, 0.9)'
      }}>
        <input
          type="text"
          className="input-control"
          placeholder="Ask a question about this course..."
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          style={{ height: 42, fontSize: 13 }}
        />
        <button
          onClick={() => handleSendMessage()}
          className="btn btn-primary btn-icon"
          style={{ width: 42, height: 42, flexShrink: 0 }}
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
};
