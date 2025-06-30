// src/store/notesStore.ts
import { create } from "zustand";
import { type JSONContent } from "@tiptap/react";
import axios from "axios";

type Note = {
  _id: string;
  title: string;
  content: JSONContent;
  subject: string;
  color: string;
  fav: boolean;
  createdAt?: string;
  updatedAt?: string;
};

type NewNote = {
  title: string;
  content: JSONContent;
  subject: string;
  color: string;
};

type NotesState = {
  notes: Note[];
  fetchNotes: () => Promise<void>;
  addNote: (note: NewNote) => Promise<void>;
  updateNote: (note: Note) => Promise<void>; // 👈 Add this
};

export const useNotesStore = create<NotesState>((set) => ({
  notes: [],
  fetchNotes: async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get("http://localhost:5000/api/notesRoutes/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ notes: response.data });
    } catch (err) {
      console.error("Error fetching notes", err);
    }
  },

  addNote: async ({ title, content, subject, color }: NewNote) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        "http://localhost:5000/api/notesRoutes/",
        { title, content, subject, color },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      set((state) => ({
        notes: [response.data, ...state.notes],
      }));

      alert("Saved to DB!");
    } catch (err) {
      console.error("Error saving note", err);
    }
  },
  updateNote: async (note: Note) => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await axios.put(
        `http://localhost:5000/api/notesRoutes/${note._id}`,
        {
          title: note.title,
          content: note.content,
          subject: note.subject,
          color: note.color,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Replace the updated note in the store
      set((state) => ({
        notes: state.notes.map((n) =>
          n._id === note._id ? response.data : n
        ),
      }));

      alert("Note updated!");
    } catch (err) {
      console.error("Error updating note", err);
    }
  },
}));
