import axios from 'axios';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, } from 'recoil';
import { useParams } from 'react-router-dom';
import { NewPost } from '../components/newpost';

import { ShowPost } from '../components/showpost';
import { useState } from 'react';
import { notesAtom } from '../recoil/atoms';
import { Button } from '../components/ui/button';
// import Testing from '../components/testing';




export function Home() {
    const { userId } = useParams();
    const [notes, setNotes] = useRecoilState(notesAtom);
    const [newPost, setNewPost] = useState(false)

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
            <div><Button onClick={() => {
                setNewPost(!newPost)
            }}>NewPost</Button></div>
            {newPost && (
                <div className="fixed inset-0 bg-gray-300 bg-opacity-10 flex justify-center items-center z-50">
                   
                        {/* Your Editor or Content */}
                        <NewPost></NewPost>
                </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {notes.map((note) => (
                    <ShowPost key={note._id} title={note.title} content={note.content} />
                ))}
            </div>

            {/* <Testing></Testing> */}
        </div>
    </>

}