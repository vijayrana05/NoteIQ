import axios from 'axios'
import { TipTap } from "./tiptap";
import { type JSONContent } from '@tiptap/react'
import { notesAtom } from '../recoil/atoms';
import { useSetRecoilState } from 'recoil';



export function NewPost() {

    const SetNotes = useSetRecoilState(notesAtom)

    const handleEditorContentSave = ({ title, content }: { title: string, content: JSONContent }) => {

        handleSaveToBackend(title,content)
    };


    const handleSaveToBackend = async (title: string, content: JSONContent) => {
        try {
            const response = await axios.post(
                'http://localhost:5000/api/notesRoutes/',
                { title, content },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                    },
                }
            );

            SetNotes(prevNotes => [response.data, ...prevNotes]);
            // console.log("Note added:", response.data);
            alert('Saved to DB!');
        } catch (err) {
            console.error('Error saving note', err);
        }
    };


    return (
        <div>

            <TipTap onEditorContentSave={handleEditorContentSave} />

        </div>
    )
}

export default NewPost