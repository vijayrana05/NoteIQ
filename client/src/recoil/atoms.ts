import { atom } from 'recoil';
import { type JSONContent } from '@tiptap/react';

export interface Note {
  _id: string;
  title: string;
  content: JSONContent;
  createdAt?: string;
  updatedAt?: string;
}


export const notesAtom = atom<Note[]>({
  key: 'notesAtom',
  default: [],
});