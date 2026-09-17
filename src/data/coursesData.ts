export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  summary: string;
  timestamps: { time: string; seconds: number; topic: string }[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Flashcard {
  id: number;
  question: string;
  answer: string;
  category: string;
}

export interface Course {
  id: string;
  title: string;
  category: 'Web Dev' | 'Python & AI' | 'UI/UX' | 'Computer Science';
  description: string;
  instructor: string;
  instructorRole: string;
  instructorAvatar: string;
  thumbnail: string;
  totalDuration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  enrolledCount: number;
  status: 'approved' | 'pending';
  lessons: Lesson[];
  quiz: QuizQuestion[];
  flashcards: Flashcard[];
}

export const INITIAL_COURSES: Course[] = [
  {
    id: 'course-react-fullstack',
    title: 'Full-Stack React & Next.js Masterclass',
    category: 'Web Dev',
    description: 'Master modern React 19, Next.js App Router, Server Components, and real-time state management.',
    instructor: 'Sarah Jenkins',
    instructorRole: 'Principal Engineer at TechCorp',
    instructorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=80',
    totalDuration: '4h 30m',
    level: 'Intermediate',
    rating: 4.9,
    enrolledCount: 1420,
    status: 'approved',
    lessons: [
      {
        id: 'lesson-1',
        title: '1. Modern React Architecture & Component Lifecycle',
        duration: '12:40',
        videoUrl: 'https://www.youtube-nocookie.com/embed/SqcY0GlETPk',
        summary: 'Deep dive into virtual DOM diffing, JSX compilation, and clean component separation.',
        timestamps: [
          { time: '01:15', seconds: 75, topic: 'Component Hierarchy & Props' },
          { time: '04:30', seconds: 270, topic: 'Virtual DOM & Reconciliation' },
          { time: '08:50', seconds: 530, topic: 'Best practices for State Colocation' }
        ]
      },
      {
        id: 'lesson-2',
        title: '2. Deep Dive into Hooks (useState, useEffect, useMemo)',
        duration: '16:10',
        videoUrl: 'https://www.youtube-nocookie.com/embed/bMknfKXIFA8',
        summary: 'Understanding dependency arrays, memoization performance, and avoiding infinite loops.',
        timestamps: [
          { time: '02:00', seconds: 120, topic: 'useState Mechanics & Batching' },
          { time: '07:15', seconds: 435, topic: 'useEffect Lifecycle & Cleanups' },
          { time: '12:30', seconds: 750, topic: 'useMemo and useCallback Rules' }
        ]
      },
      {
        id: 'lesson-3',
        title: '3. Next.js App Router & Server Components',
        duration: '18:25',
        videoUrl: 'https://www.youtube-nocookie.com/embed/8pDqJVdNa44',
        summary: 'Server-side rendering vs client components, streaming UI, and metadata SEO.',
        timestamps: [
          { time: '03:10', seconds: 190, topic: 'Server vs Client Components' },
          { time: '09:40', seconds: 580, topic: 'Streaming and Suspense in Next.js' },
          { time: '14:20', seconds: 860, topic: 'Layouts and Nested Routes' }
        ]
      },
      {
        id: 'lesson-4',
        title: '4. Full-Stack State Management & API Integration',
        duration: '14:50',
        videoUrl: 'https://www.youtube-nocookie.com/embed/w7ejDZ8SWv8',
        summary: 'Connecting frontend to REST and Server Actions with error boundaries and toasts.',
        timestamps: [
          { time: '02:45', seconds: 165, topic: 'Data Fetching with Server Actions' },
          { time: '08:10', seconds: 490, topic: 'Optimistic UI Updates' },
          { time: '11:55', seconds: 715, topic: 'Handling Errors & Fallbacks' }
        ]
      }
    ],
    flashcards: [
      {
        id: 1,
        question: 'What is the Virtual DOM in React?',
        answer: 'A lightweight JavaScript object representing the actual DOM. React uses it to calculate minimal DOM mutations using reconciliation.',
        category: 'React Core'
      },
      {
        id: 2,
        question: 'When should you use React Server Components (RSC)?',
        answer: 'For components that do not need interactive listeners or browser APIs. They reduce client bundle size and can query databases directly.',
        category: 'Next.js'
      },
      {
        id: 3,
        question: 'What is the purpose of the key prop in lists?',
        answer: 'It helps React identify which items have changed, been added, or removed, avoiding unnecessary re-renders of the whole list.',
        category: 'Performance'
      }
    ],
    quiz: [
      {
        id: 1,
        question: 'Which hook should you use for managing local state inside a functional component?',
        options: ['useReducer', 'useState', 'useRef', 'useEffect'],
        correctAnswer: 1,
        explanation: 'useState is the primary React hook designed for local state management.'
      },
      {
        id: 2,
        question: 'What happens when a Next.js Server Component renders?',
        options: [
          'It downloads React on the user browser first',
          'It executes on the server and streams pure HTML/JSON to the client',
          'It requires window.localStorage to execute',
          'It cannot receive any props'
        ],
        correctAnswer: 1,
        explanation: 'Server Components execute only on the server, eliminating client-side JS overhead.'
      },
      {
        id: 3,
        question: 'Why must the key prop in a list be unique and stable?',
        options: [
          'It defines the CSS class of the element',
          'It enables React reconciliation algorithm to track element identity efficiently',
          'It is required by TypeScript to compile',
          'It stores the item into LocalStorage'
        ],
        correctAnswer: 1,
        explanation: 'Unique keys allow React to reuse existing DOM nodes during diffing.'
      },
      {
        id: 4,
        question: 'Where should side effects such as data subscriptions or timer intervals be placed?',
        options: ['Inside the render body', 'Inside a useEffect callback', 'Inside useState initializer', 'Inside CSS'],
        correctAnswer: 1,
        explanation: 'Side effects must be contained within useEffect or lifecycle hooks to avoid leaks.'
      },
      {
        id: 5,
        question: 'Which browser API can persist data locally without sending it to a server on every HTTP request?',
        options: ['HTTP Cookie', 'LocalStorage', 'Session Headers', 'DNS Cache'],
        correctAnswer: 1,
        explanation: 'LocalStorage stores key-value pairs purely in the browser with 5MB-10MB quota.'
      }
    ]
  },
  {
    id: 'course-python-ai',
    title: 'Python for AI & Machine Learning Bootcamp',
    category: 'Python & AI',
    description: 'From NumPy array manipulation to training Transformer neural networks and LLM prompting.',
    instructor: 'Dr. Michael Chang',
    instructorRole: 'AI Research Scientist',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    totalDuration: '6h 15m',
    level: 'Beginner',
    rating: 4.85,
    enrolledCount: 2310,
    status: 'approved',
    lessons: [
      {
        id: 'lesson-ai-1',
        title: '1. Python & Vectorized NumPy Arrays',
        duration: '14:20',
        videoUrl: 'https://www.youtube-nocookie.com/embed/rfscVS0vtbw',
        summary: 'Accelerating computation with contiguous memory arrays, broadcasting, and matrix multiplication.',
        timestamps: [
          { time: '02:10', seconds: 130, topic: 'Array Broadcasting & Shapes' },
          { time: '06:40', seconds: 400, topic: 'Vectorized Math vs For Loops' },
          { time: '11:15', seconds: 675, topic: 'Indexing & Slicing' }
        ]
      },
      {
        id: 'lesson-ai-2',
        title: '2. Data Analysis with Pandas & Visualizations',
        duration: '18:00',
        videoUrl: 'https://www.youtube-nocookie.com/embed/eMOA1pPVUc4',
        summary: 'DataFrame manipulation, handling missing values, and plotting with Seaborn.',
        timestamps: [
          { time: '03:15', seconds: 195, topic: 'DataFrames and Series' },
          { time: '08:45', seconds: 525, topic: 'Grouping & Aggregations' },
          { time: '14:30', seconds: 870, topic: 'Cleaning Nulls and Outliers' }
        ]
      },
      {
        id: 'lesson-ai-3',
        title: '3. Neural Network Foundations with PyTorch',
        duration: '22:15',
        videoUrl: 'https://www.youtube-nocookie.com/embed/i_LwzRVP7bg',
        summary: 'Tensors, autograd, forward pass, backpropagation, and loss functions.',
        timestamps: [
          { time: '04:00', seconds: 240, topic: 'Tensors and GPU Acceleration' },
          { time: '10:20', seconds: 620, topic: 'Loss Functions and Gradient Descent' },
          { time: '17:50', seconds: 1070, topic: 'Training Loop Implementation' }
        ]
      }
    ],
    flashcards: [
      {
        id: 1,
        question: 'What is Vectorization in NumPy?',
        answer: 'Executing operations on entire arrays at once using compiled C code instead of Python loops, yielding 50x-100x speedups.',
        category: 'NumPy'
      },
      {
        id: 2,
        question: 'What does Backpropagation compute?',
        answer: 'The gradient of the loss function with respect to every weight in the network via the calculus chain rule.',
        category: 'Deep Learning'
      }
    ],
    quiz: [
      {
        id: 1,
        question: 'Why is NumPy significantly faster than standard Python lists for numeric operations?',
        options: [
          'It compiles to machine code and utilizes contiguous C-level memory blocks',
          'It runs in the browser background worker',
          'It ignores floating point precision',
          'It encrypts arrays'
        ],
        correctAnswer: 0,
        explanation: 'NumPy leverages SIMD hardware acceleration and contiguous memory layout.'
      },
      {
        id: 2,
        question: 'In PyTorch, what method computes gradients automatically during training?',
        options: ['tensor.calculate()', 'loss.backward()', 'model.optimize()', 'torch.eval()'],
        correctAnswer: 1,
        explanation: 'loss.backward() executes the backward pass and calculates gradients via Autograd.'
      },
      {
        id: 3,
        question: 'What is Overfitting in machine learning?',
        options: [
          'When model weights become zero',
          'When the model performs well on training data but poorly on unseen test data',
          'When the dataset is too large to fit in memory',
          'When learning rate is too high'
        ],
        correctAnswer: 1,
        explanation: 'Overfitting occurs when a model memorizes noise instead of general patterns.'
      },
      {
        id: 4,
        question: 'Which metric measures the performance of a classification model across varying thresholds?',
        options: ['Mean Squared Error', 'ROC-AUC', 'R-squared', 'Cosine Similarity'],
        correctAnswer: 1,
        explanation: 'ROC-AUC evaluates True Positive Rate vs False Positive Rate across all decision thresholds.'
      },
      {
        id: 5,
        question: 'What is a Prompt in Generative AI?',
        options: [
          'The training dataset size',
          'The natural language input provided to a Large Language Model to steer its output',
          'A hardware GPU benchmark',
          'A compression algorithm'
        ],
        correctAnswer: 1,
        explanation: 'A prompt is the instruction or context passed to guide an LLM.'
      }
    ]
  },
  {
    id: 'course-uiux-figma',
    title: 'Modern UI/UX Design Systems in Figma',
    category: 'UI/UX',
    description: 'Design accessible, high-converting interfaces, establish design tokens, and build Auto-Layout components.',
    instructor: 'Elena Rostova',
    instructorRole: 'Lead Product Designer',
    instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&auto=format&fit=crop&q=80',
    totalDuration: '3h 45m',
    level: 'Beginner',
    rating: 4.92,
    enrolledCount: 980,
    status: 'approved',
    lessons: [
      {
        id: 'lesson-ux-1',
        title: '1. Design Tokens & Color Contrast (WCAG 2.1)',
        duration: '11:30',
        videoUrl: 'https://www.youtube-nocookie.com/embed/jwCmIBJ8Jtc',
        summary: 'Color harmony, dark mode palettes, and meeting AA/AAA accessibility contrast standards.',
        timestamps: [
          { time: '01:45', seconds: 105, topic: 'WCAG Contrast Ratio Requirements' },
          { time: '05:30', seconds: 330, topic: 'Semantic Color Tokens' },
          { time: '09:10', seconds: 550, topic: 'Accessible Typography Scales' }
        ]
      },
      {
        id: 'lesson-ux-2',
        title: '2. Auto-Layout Mastery & Responsive Components',
        duration: '15:10',
        videoUrl: 'https://www.youtube-nocookie.com/embed/T6rPekfq9gY',
        summary: 'Building flexible navigation bars, cards, and modal components that scale gracefully.',
        timestamps: [
          { time: '02:15', seconds: 135, topic: 'Hugging vs Filling in Auto-Layout' },
          { time: '07:40', seconds: 460, topic: 'Min/Max Width constraints' },
          { time: '12:00', seconds: 720, topic: 'Creating Component Variants' }
        ]
      }
    ],
    flashcards: [
      {
        id: 1,
        question: 'What is the minimum WCAG AA contrast ratio for regular body text?',
        answer: '4.5:1 against its background color (3:1 for large text over 18pt/24px).',
        category: 'Accessibility'
      },
      {
        id: 2,
        question: 'What is a Design Token?',
        answer: 'A named entity that stores a design decision (e.g., color-primary: #2563eb, spacing-md: 16px) across design and code.',
        category: 'Design Systems'
      }
    ],
    quiz: [
      {
        id: 1,
        question: 'What is the minimum WCAG 2.1 AA contrast ratio required for standard body text?',
        options: ['2:1', '3:1', '4.5:1', '7:1'],
        correctAnswer: 2,
        explanation: 'WCAG 2.1 AA mandates at least 4.5:1 contrast for normal text.'
      },
      {
        id: 2,
        question: 'In Figma Auto-Layout, what does "Fill container" do?',
        options: [
          'Fills the element with a solid color',
          'Causes the element to stretch and fill all available space in its parent along that axis',
          'Shrinks the element to fit its text',
          'Locks the element position'
        ],
        correctAnswer: 1,
        explanation: 'Fill container dynamically expands the child element to occupy remaining space.'
      },
      {
        id: 3,
        question: 'What is the primary benefit of Design Tokens in design systems?',
        options: [
          'They replace backend databases',
          'They maintain consistent design variables (colors, spacing, fonts) between Figma and frontend code',
          'They compress images',
          'They generate HTML automatically'
        ],
        correctAnswer: 1,
        explanation: 'Design tokens act as the single source of truth for design values.'
      },
      {
        id: 4,
        question: 'What does the Fitts Law in UX state?',
        options: [
          'Users spend more time on other websites than yours',
          'The time to acquire a target is a function of the distance to and size of the target',
          'Dark mode saves battery life',
          'Three clicks are the maximum allowed'
        ],
        correctAnswer: 1,
        explanation: 'Fitts Law states targets that are larger and closer to the user are faster to click.'
      },
      {
        id: 5,
        question: 'Which user research method gathers qualitative feedback by observing users complete specific tasks?',
        options: ['A/B Testing', 'Usability Testing', 'Database Indexing', 'Server Log Analysis'],
        correctAnswer: 1,
        explanation: 'Usability testing directly observes users interacting with a prototype or product.'
      }
    ]
  },
  {
    id: 'course-dsa-js',
    title: 'Data Structures & Algorithms in JavaScript',
    category: 'Computer Science',
    description: 'Ace technical interviews with Big O notation, two-pointer techniques, Trees, Graphs, and Dynamic Programming.',
    instructor: 'David Vance',
    instructorRole: 'Staff Software Engineer',
    instructorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    totalDuration: '5h 20m',
    level: 'Advanced',
    rating: 4.88,
    enrolledCount: 1640,
    status: 'approved',
    lessons: [
      {
        id: 'lesson-dsa-1',
        title: '1. Big O Notation & Memory Complexity',
        duration: '13:50',
        videoUrl: 'https://www.youtube-nocookie.com/embed/kS_JgG8685A',
        summary: 'Understanding constant, logarithmic, linear, and quadratic time-space trade-offs.',
        timestamps: [
          { time: '01:30', seconds: 90, topic: 'Time vs Space Complexity' },
          { time: '06:10', seconds: 370, topic: 'O(1) vs O(log n) vs O(n)' },
          { time: '10:45', seconds: 645, topic: 'Worst-case vs Average-case' }
        ]
      }
    ],
    flashcards: [
      {
        id: 1,
        question: 'What is the average time complexity of searching a Binary Search Tree (BST)?',
        answer: 'O(log n) when balanced. In worst case (degenerate tree), it degrades to O(n).',
        category: 'Algorithms'
      }
    ],
    quiz: [
      {
        id: 1,
        question: 'What is the time complexity of searching an element in a Hash Table on average?',
        options: ['O(n)', 'O(log n)', 'O(1)', 'O(n^2)'],
        correctAnswer: 2,
        explanation: 'Hash tables achieve average O(1) constant time lookup via hashing.'
      },
      {
        id: 2,
        question: 'Which sorting algorithm has a guaranteed worst-case time complexity of O(n log n)?',
        options: ['QuickSort', 'MergeSort', 'BubbleSort', 'InsertionSort'],
        correctAnswer: 1,
        explanation: 'MergeSort divides and merges in guaranteed O(n log n) even in the worst case.'
      },
      {
        id: 3,
        question: 'Which data structure operates on a First-In-First-Out (FIFO) principle?',
        options: ['Stack', 'Queue', 'Heap', 'Tree'],
        correctAnswer: 1,
        explanation: 'Queues process elements in FIFO order (e.g. printer queue).'
      },
      {
        id: 4,
        question: 'What traversal of a Binary Search Tree visits nodes in sorted ascending order?',
        options: ['Pre-order', 'In-order', 'Post-order', 'Level-order'],
        correctAnswer: 1,
        explanation: 'In-order traversal (Left, Root, Right) processes nodes in ascending sequence.'
      },
      {
        id: 5,
        question: 'What algorithm is typically used to find the shortest path in a weighted graph with non-negative edges?',
        options: ['Dijkstra Algorithm', 'Depth-First Search', 'Binary Search', 'Bubble Sort'],
        correctAnswer: 0,
        explanation: 'Dijkstras algorithm finds shortest paths from a single source on non-negative weighted graphs.'
      }
    ]
  }
];

const STORAGE_KEYS = {
  COURSES: 'vertexlearn_courses_v2',
  ENROLLED: 'vertexlearn_enrolled',
  NOTES: 'vertexlearn_notes',
  QUIZ_SCORES: 'vertexlearn_quiz_scores',
  STREAK: 'vertexlearn_streak',
  CURRENT_USER_ROLE: 'vertexlearn_role',
  AUTH_USER: 'vertexlearn_auth_user',
  CHAT_HISTORY: 'vertexlearn_chat_history'
};

export interface UserProfile {
  name: string;
  email: string;
  role: 'student' | 'instructor' | 'admin';
  title: string;
  avatar?: string;
}

export const DEFAULT_USER: UserProfile = {
  name: 'Ali Charolia',
  email: 'ali.charolia@internmo.com',
  role: 'student',
  title: 'Front-End Internship Track'
};

export const StorageService = {
  getCourses: (): Course[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.COURSES);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(INITIAL_COURSES));
        return INITIAL_COURSES;
      }
      const parsed = JSON.parse(data);
      // Auto-restore if accidentally cleared or empty
      if (!Array.isArray(parsed) || parsed.length === 0) {
        localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(INITIAL_COURSES));
        return INITIAL_COURSES;
      }
      // Migrate if old data had unavailable videos
      if (parsed[0].lessons?.[2]?.videoUrl?.includes('tjS7V1a')) {
        localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(INITIAL_COURSES));
        return INITIAL_COURSES;
      }
      return parsed;
    } catch {
      return INITIAL_COURSES;
    }
  },

  resetCourses: (): Course[] => {
    localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(INITIAL_COURSES));
    return INITIAL_COURSES;
  },

  getUser: (): UserProfile => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.AUTH_USER);
      return data ? JSON.parse(data) : DEFAULT_USER;
    } catch {
      return DEFAULT_USER;
    }
  },

  saveUser: (user: UserProfile) => {
    localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(user));
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ROLE, user.role);
  },

  saveCourses: (courses: Course[]) => {
    localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
  },

  getEnrolledCourseIds: (): string[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ENROLLED);
      return data ? JSON.parse(data) : ['course-react-fullstack'];
    } catch {
      return ['course-react-fullstack'];
    }
  },

  enrollCourse: (courseId: string) => {
    const enrolled = StorageService.getEnrolledCourseIds();
    if (!enrolled.includes(courseId)) {
      enrolled.push(courseId);
      localStorage.setItem(STORAGE_KEYS.ENROLLED, JSON.stringify(enrolled));
    }
  },

  getNotes: (courseId: string, lessonId: string): string => {
    try {
      const allNotes = JSON.parse(localStorage.getItem(STORAGE_KEYS.NOTES) || '{}');
      return allNotes[`${courseId}_${lessonId}`] || '';
    } catch {
      return '';
    }
  },

  saveNotes: (courseId: string, lessonId: string, text: string) => {
    try {
      const allNotes = JSON.parse(localStorage.getItem(STORAGE_KEYS.NOTES) || '{}');
      allNotes[`${courseId}_${lessonId}`] = text;
      localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(allNotes));
    } catch (e) {
      console.error(e);
    }
  },

  getQuizScore: (courseId: string): number | null => {
    try {
      const scores = JSON.parse(localStorage.getItem(STORAGE_KEYS.QUIZ_SCORES) || '{}');
      return scores[courseId] !== undefined ? scores[courseId] : null;
    } catch {
      return null;
    }
  },

  saveQuizScore: (courseId: string, score: number) => {
    try {
      const scores = JSON.parse(localStorage.getItem(STORAGE_KEYS.QUIZ_SCORES) || '{}');
      scores[courseId] = score;
      localStorage.setItem(STORAGE_KEYS.QUIZ_SCORES, JSON.stringify(scores));
    } catch (e) {
      console.error(e);
    }
  },

  getStreak: (): number => {
    try {
      const streak = localStorage.getItem(STORAGE_KEYS.STREAK);
      return streak ? parseInt(streak, 10) : 5;
    } catch {
      return 5;
    }
  },

  getRole: (): 'student' | 'instructor' | 'admin' => {
    try {
      return (localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ROLE) as any) || 'student';
    } catch {
      return 'student';
    }
  },

  setRole: (role: 'student' | 'instructor' | 'admin') => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ROLE, role);
  },

  getChatHistory: (courseId: string): any[] => {
    try {
      const allHistory = JSON.parse(localStorage.getItem(STORAGE_KEYS.CHAT_HISTORY) || '{}');
      return Array.isArray(allHistory[courseId]) ? allHistory[courseId] : [];
    } catch {
      return [];
    }
  },

  saveChatHistory: (courseId: string, messages: any[]) => {
    try {
      const allHistory = JSON.parse(localStorage.getItem(STORAGE_KEYS.CHAT_HISTORY) || '{}');
      allHistory[courseId] = messages;
      localStorage.setItem(STORAGE_KEYS.CHAT_HISTORY, JSON.stringify(allHistory));
    } catch (e) {
      console.error(e);
    }
  }
};
