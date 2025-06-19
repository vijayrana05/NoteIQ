import axios from 'axios'
import { useState } from "react";
import { TipTap } from "./tiptap";
import { type JSONContent } from '@tiptap/react'



export function NewPost() {
    const [title, setTitle] = useState('');
    const [jsonContent, setJsonContent] = useState<JSONContent | null>(null);

    const handleEditorContentSave = ({ title, content }: { title: string, content: JSONContent }) => {
        setTitle(title);
        setJsonContent(content);
    };


    const handleSaveToBackend = async () => {
        console.log("inside handleSaveToBackend")
        if (!jsonContent) {
            console.log("no content");
            return;
        };
        console.log("below jsoncontent")
        try {
            await axios.post('http://localhost:5000/api/notesRoutes/', {
                title,
                content: jsonContent,
            },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                    },
                });
            alert('Saved to DB!');
        } catch (err) {
            console.error('Error saving note', err);
        }
    };


    return (
        <div>

            <TipTap onEditorContentSave={handleEditorContentSave} />
            <button className="bg-green-500 text-white px-4 py-2 m-4" onClick={handleSaveToBackend}>
                Save Note to DB
            </button>
            

        </div>
    )
}

export default NewPost