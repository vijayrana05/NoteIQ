// useNoteStore.ts
import { create } from 'zustand';
import axios from 'axios';
import type { JSONContent } from '@tiptap/react';

interface Note {
  title: string;
  content: JSONContent;
  subject: string;
  color: string;
}

interface NoteStore {
  notes: Note[];
  addNote: (note: Note) => Promise<void>;
}

export const useNoteStore = create<NoteStore>((set) => ({
  notes: [],
  addNote: async ({ title, content, subject, color }: Note) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post(
        'http://localhost:5000/api/notesRoutes/',
        { title, content, subject, color },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Assuming the API returns the saved note
      set((state) => ({
        notes: [response.data, ...state.notes],
      }));

      alert('Saved to DB!');
    } catch (err) {
      console.error('Error saving note', err);
    }
  },
  
}));
