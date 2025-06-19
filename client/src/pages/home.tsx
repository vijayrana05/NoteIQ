import  axios  from 'axios';
import { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import { NewPost } from '../components/newpost';
import { ShowPost } from '../components/showpost';


interface Note {
  _id: string;
  title: string;
  content: any;
  createdAt: string;
  updatedAt: string;
}

export function Home() {
    const { userId } = useParams();
    const [notes, setNotes] = useState<Note[]>([]);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const response = await axios.get("http://localhost:5000/api/notesRoutes/", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setNotes(response.data);
            } catch (err) {
                console.error("Error fetching notes", err);
            }
        };

        fetchNotes();
    }, []);
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