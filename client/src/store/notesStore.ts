// src/store/notesStore.ts
import { create } from "zustand";
import { type JSONContent } from "@tiptap/react";
import axios from "axios";

type Note = {
  _id: string;
  title: string;
  content: JSONContent;
  subject:string;
  color:string;
  fav:boolean;
  createdAt?: string;
  updatedAt?: string;
};

type NotesState = {
  notes: Note[];
  fetchNotes: () => Promise<void>;
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
}));
