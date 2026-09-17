import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

function apiTutorDevPlugin(): Plugin {
  return {
    name: 'api-tutor-dev-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url && req.url.startsWith('/api/tutor')) {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

          if (req.method === 'OPTIONS') {
            res.statusCode = 200;
            res.end();
            return;
          }

          if (req.method === 'POST') {
            let bodyStr = '';
            req.on('data', (chunk: Buffer) => {
              bodyStr += chunk.toString();
            });
            req.on('end', () => {
              try {
                const body = bodyStr ? JSON.parse(bodyStr) : {};
                const { courseTitle = 'Modern Engineering', lessonTitle = 'Core Concepts', query = '', difficulty = 'Beginner' } = body;

                const qLower = (query || '').toLowerCase();
                let replyText = '';
                let flashcards = undefined;

                if (qLower.includes('summarize') || qLower.includes('summary')) {
                  replyText = `📌 **Lecture Summary (${difficulty} Level)** — *${lessonTitle}*:\n\n` +
                    `• **[00:45] Setup & Architecture**: Establishing component hierarchy and unidirectional state flow.\n` +
                    `• **[02:30] State Boundaries**: Preventing wasteful cascade re-renders through targeted encapsulation.\n` +
                    `• **[04:15] Real-World Implementation**: Production patterns in *${courseTitle}*.\n\n` +
                    `💡 *Key Takeaway*: Always keep local state colocated near the components that consume it!`;
                } else if (qLower.includes('flashcard') || qLower.includes('cards')) {
                  replyText = `🗂️ **Generated 3 Knowledge Flashcards for ${lessonTitle}**:\nClick on each card below to flip between question and verified answer!`;
                  flashcards = [
                    {
                      id: 101,
                      question: `What is the primary objective of ${lessonTitle}?`,
                      answer: `To master core architectural principles in ${courseTitle} and optimize client performance.`,
                      category: 'Core Concepts'
                    },
                    {
                      id: 102,
                      question: 'How does client-side caching enhance web application UX?',
                      answer: 'By persisting user progress instantly in browser storage with 0ms network latency.',
                      category: 'Performance'
                    },
                    {
                      id: 103,
                      question: `At what timestamp does the instructor demonstrate the implementation in ${lessonTitle}?`,
                      answer: 'Timestamp [03:45] provides the step-by-step code walkthrough.',
                      category: 'Curriculum'
                    }
                  ];
                } else if (qLower.includes('simple') || qLower.includes('explain')) {
                  replyText = `💡 **In Simple Terms (${difficulty} Level)**:\n\n` +
                    `Think of **${courseTitle}** like a modern kitchen.\n` +
                    `Instead of cooking every single dish from scratch whenever a customer orders (**rebuilding everything**), ` +
                    `we prepare modular ingredients (**reusable components at [01:30]**) and store them neatly in containers (**LocalStorage at [03:10]**).\n\n` +
                    `When an order comes in, we only heat up what's needed—making our kitchen lightning-fast and error-free!`;
                } else {
                  replyText = `Great question regarding **${lessonTitle}** in **${courseTitle}**!\n\n` +
                    `In **${difficulty}** mode, the key takeaway is maintaining clean boundaries and clear data ownership. ` +
                    `Refer to timestamp **[02:40]** in the lecture video where this exact pattern is implemented with best practices.\n\n` +
                    `Would you like me to generate flashcards or explain any specific part in simpler terms?`;
                }

                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 200;
                res.end(JSON.stringify({
                  success: true,
                  source: 'local-dev-api',
                  response: replyText,
                  flashcards,
                  notice: 'Running on local Vite dev server API middleware.'
                }));
              } catch (err: any) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: false, error: err?.message || 'Server error' }));
              }
            });
            return;
          }
        }
        next();
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), apiTutorDevPlugin()],
})
