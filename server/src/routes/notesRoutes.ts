import express, { Request ,Response } from 'express';
import Note from '../models/note';
import { tiptapJsonToPlainText } from '../utils/tiptapToText';

import { verifyToken } from '../middleware/auth';
import { createEmbeddings, deleteNoteEmbeddings } from '../utils/embedding';
import { Types } from 'mongoose';


const router = express.Router();

router.post('/', verifyToken, async (req:any, res:any) => {
  const { title, content } = req.body;
  const userId = (req as any).user.id;
  const plainText = tiptapJsonToPlainText(content);
  const newNote = new Note({ title, content, owner: userId });
  await newNote.save();
  const bedings = await createEmbeddings(plainText,newNote.id)
  if (!bedings) {
  return res.status(500).json({ error: "Failed to generate embeddings" });
}
  res.status(201).json(bedings);
});

router.get('/', verifyToken, async (req, res) => {
  const userId = (req as any).user.id;
  const notes = await Note.find({ owner: userId });
  res.json(notes);
});

// Update a note
router.put('/:id', verifyToken, async (req: Request, res: Response): Promise<void> =>{
  const { title, content } = req.body;
  const userId = (req as any).user.id;
  const noteId = new Types.ObjectId(req.params.id);


  try {
    const updatedNote = await Note.findOneAndUpdate(
      { _id: noteId, owner: userId }, // Ensure user owns the note
      { title, content },
      { new: true }
    );

    if (!updatedNote) {
      res.status(404).json({ error: 'Note not found or unauthorized' });
      return;
    }
    createEmbeddings(content,noteId)

    res.json(updatedNote);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update note' });
  }
});

router.get('/:id', verifyToken, async (req: Request, res: Response): Promise<void> => {
  const userId = (req as any).user.id;
  const noteId = req.params.id;

  try {
    const note = await Note.findOne({ _id: noteId, owner: userId });
    if (!note) {
        res.status(404).json({ error: 'Note not found' });
        return
    }
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch note' });
  }
});

router.delete('/:id', verifyToken, async (req: Request, res: Response): Promise<void> => {
  const userId = (req as any).user.id;
  const noteId = req.params.id;

  try {
    const note = await Note.findOneAndDelete({ _id: noteId, owner: userId });
    if (!note) {
        res.status(404).json({ error: 'Note not found' });
        return;
    }
    deleteNoteEmbeddings(noteId)
    res.json({ message: 'Note deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete note' });
  }
});



export default router;
