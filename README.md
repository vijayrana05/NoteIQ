# NoteIQ

**Live Demo:** [https://study-helper-fe-vd62.vercel.app/]

---

## Overview

NoteIQ is a full-stack AI-powered note-taking application. It allows users to create, edit, and organize notes, upload PDFs for summarization, and use AI to generate or query content. The project uses React, TypeScript, Zustand, and Tailwind CSS on the frontend, with a Node.js/Express backend and Google Gemini AI for embeddings and summarization.

## Features

- ✍️ Rich text note editor with formatting
- 📄 PDF upload and AI-powered summarization
- 🤖 Generate notes or answers using AI
- 🔍 Semantic search and query within notes
- 🗂 Organize notes by subject and color
- ⭐ Mark notes as favorites
- 🔒 User authentication (signup/login)
- 🧠 Stores vector embeddings in Pinecone to power fast, semantic queries across your notes
- Responsive and modern UI

## Tech Stack

- **Frontend:** React, TypeScript, Zustand, Tailwind CSS, Tiptap, Framer Motion
- **Backend:** Node.js, Express, Mongoose, Google Generative AI, Pinecone
- **Deployment:** Vercel (frontend), Render (backend)

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/NoteIQ.git
   cd NoteIQ
   ```

2. **Install dependencies:**

   - For the client:
     ```sh
     cd client
     npm install
     ```

   - For the server:
     ```sh
     cd ../server
     npm install
     ```

3. **Set up environment variables:**

   - Copy `.env.example` to `.env` in the `server` folder and fill in your API keys and MongoDB URI.

4. **Run the development servers:**

   - Start the backend:
     ```sh
     cd server
     npm run dev
     ```

   - Start the frontend:
     ```sh
     cd ../client
     npm run dev
     ```

5. **Open the app:**
   - Visit [http://localhost:5173](http://localhost:5173) in your browser.

## Folder Structure

```
client/   # React frontend
server/   # Express backend
uploads/  # Uploaded PDF files
```

## Environment Variables

- `GEMINI_API_KEY` - Google Generative AI API key
- `MONGODB_URI` - MongoDB connection string
- `PINECONE_API_KEY` - Pinecone vector DB API key



