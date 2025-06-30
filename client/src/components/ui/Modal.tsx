import { useState } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    subject: string;
    onSave: (subject: string, color: string) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, subject, onSave }) => {
    const [noteSubject, setNoteSubject] = useState(subject);
    const [noteColor, setNoteColor] = useState("#3b82f6");

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="p-6 rounded-lg shadow-lg bg-white w-96 space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-gray-900 text-xl font-bold">Create Note</h2>
                    <button onClick={onClose} className="text-gray-600 text-2xl font-bold">&times;</button>
                </div>

                <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-gray-700">Subject</label>
                    <input
                        type="text"
                        value={noteSubject}
                        onChange={(e) => setNoteSubject(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter subject"
                    />
                </div>

                <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-gray-700">Select Color</label>
                    <input
                        type="color"
                        value={noteColor}
                        onChange={(e) => setNoteColor(e.target.value)}
                        className="w-16 h-10 border border-gray-300 rounded"
                    />
                </div>

                <button
                    className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    onClick={() => {
                        onSave(noteSubject, noteColor); // ✅ send data to parent
                        onClose();
                    }}
                >
                    Add Note
                </button>
            </div>
        </div>
    );
};

export default Modal