# VertexLearn AI — Modern Learning Platform & AI Tutor
**Internmo Front-End Internship Track Project Submission**  
**Author / Intern:** Ali Charolia  
**Role:** Front-End Engineering Intern  

---

## 🌟 Project Overview

**VertexLearn AI** is a state-of-the-art, client-side online learning management platform inspired by platforms like Coursera and Udemy, enhanced with an **embedded AI Tutor chatbot**, real-time auto-saving personal notes, and a **client-side verifiable PDF diploma generator**.

The application is built completely serverless—100% of the course catalogs, student enrollments, notes, quiz scores, and moderation states are persisted in browser **LocalStorage** with zero backend infrastructure required.

---

## 🖥️ 5 Core Screens Implemented

### 1. Course Catalog & Dashboard
- **Category Filter Tabs**: All, Web Dev, Python & AI, UI/UX, and Computer Science.
- **Search Engine**: Real-time live filtering of courses by title, keywords, or instructor.
- **"My Learning" Active Progress Widget**: Shows enrolled courses, completion percentage, active lesson, and 1-click resume.
- **Streak Tracker**: Daily study streak badge (🔥 5 Days).
- **Course Cards**: High-resolution thumbnails, difficulty badges, lesson counts, ratings, and instant enrollment.

### 2. Video Player & Interactive Classroom
- **Responsive 16:9 Video Player**: Embedded interactive video player with clean controls.
- **Interactive Playlist**: Clickable playlist with duration tags, active lesson highlight, and completion checkboxes.
- **Personal Auto-Saving Notes**: Auto-saving Markdown/Text notes per lesson with a green `Synced to LocalStorage` indicator, download export (`.txt`), and clear options.

### 3. Embedded AI Tutor (Star Feature)
- **Tutor Difficulty Modes**: Beginner, Intermediate, and Advanced.
- **Quick Action Prompts**:
  - 📝 *Summarize Lesson*: High-yield lecture summary with key concepts.
  - 🗂️ *Generate Flashcards*: Interactive 3D flip flashcards for self-testing.
  - 💡 *Explain in Simple Terms*: Everyday real-world analogies.
- **Clickable Timestamp Citations**: Clickable cues referencing exact lesson intervals (e.g. `[01:15]`, `[04:30]`).

### 4. Assessment Quiz & Verifiable PDF Diploma Generator
- **5 Multiple-Choice Questions**: Specific to each course curriculum with instant answer verification.
- **Instant Score & Evaluation**: Passing score calculation (e.g. 5/5) with celebratory confetti.
- **Client-Side Vector PDF Diploma**: Personalized diploma for **Ali Charolia** generated on the fly via `jsPDF`, complete with gold borders, verification hash, and official issue date.

### 5. Instructor Studio & Admin Moderation Portal
- **Role Switcher in Navbar**: Seamless 1-click toggle between `Student`, `Instructor`, and `Admin`.
- **Instructor Studio**: Form to author and submit new courses (Title, Category, Duration, Embed Video URL, Thumbnail) + student enrollment metrics.
- **Admin Portal**: Moderation queue to review pending course submissions and click `Approve Course` to make them immediately live in the student catalog.

---

## 🛠️ Technology Stack

- **Framework**: React 19 + Vite + TypeScript
- **Styling**: Vanilla Modern CSS Design System (Glassmorphism, CSS Variables, Dark Theme)
- **Icons**: `lucide-react`
- **PDF Generation**: `jspdf`
- **Visual Effects**: `canvas-confetti`
- **Storage**: Browser `localStorage` API

---

## 🚀 Getting Started Locally

```bash
# 1. Clone or extract the repository
cd vertexlearn-ai

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open http://localhost:5173 in your browser
```

---

## 🌐 Deploy to Vercel or Netlify (Free 1-Click)

### Deploying to Vercel:
1. Push this folder to your GitHub repository.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Framework Preset: **Vite**
5. Click **"Deploy"**. Your live demo will be published in ~30 seconds!

### Deploying via Vercel CLI:
```bash
npx vercel
```

---

## 📦 Final Submission Deliverables (Internmo Portal)

1. **GitHub Repository**: Clean modular codebase with full TypeScript types and this README.
2. **Live Website Link**: Deployed on Vercel / Netlify.
3. **Walkthrough Screen Recording**: `vertexlearn_demo_recording.webp` included in the root folder.
4. **Submission ZIP File**: `VertexLearn_AI_Ali_Charolia.zip` ready for upload.
