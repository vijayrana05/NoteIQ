import axios from 'axios';
import { useEffect } from 'react';
import { useRecoilState, } from 'recoil';
import { useParams } from 'react-router-dom';
import { NewPost } from '../components/newpost';
import { ShowPost } from '../components/showpost';
import { notesAtom } from '../recoil/atoms';




export function Home() {
    const { userId } = useParams();
    const [notes, setNotes] = useRecoilState(notesAtom);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const response = await axios.get("http://localhost:5000/api/notesRoutes/", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setNotes(response.data);
            } catch (err) {
                console.error("Error fetching notes", err);
            }
        };

        fetchNotes();
    }, [setNotes]);
    
    return <>
        <div>
            <p>inside page of user id {userId}</p>
        </div>
        <div>
            <NewPost></NewPost>
            {notes.map(note => (
                <ShowPost key={note._id} title={note.title} content={note.content} />
            ))}
        </div>
    </>

}