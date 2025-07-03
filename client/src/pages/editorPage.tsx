import { useEditor, EditorContent, type JSONContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import SideBar from "../components/ui/sideBar";
import { useEffect } from "react";
import Toolbar from "../components/ui/toolbar";
import { useState } from "react";
import { useNotesStore } from "../store/notesStore";
import Modal from "../components/ui/Modal";
import SideCard from "../components/ui/sidecard";
import { useLocation } from "react-router-dom";
import { useRef } from "react";

import '../App.css'
const extensions = [
    StarterKit,
    Underline
    // ✅ this fixes your issue
];


export function EditorPage() {
    const location = useLocation();
    const { _id, content, subject } = location.state || { content: { type: "doc", content: [] } };
    let hasInitializedContent = useRef(false);
    // console.log(subject)
    const sideCardSelected = location.state;
    if (sideCardSelected) {
        hasInitializedContent.current = false
    }
    const setSubject = useNotesStore((state) => state.setSubject);
    useEffect(() => {
        if (subject) {
            setSubject(subject); // Keep the store in sync with the editor note
        }
    }, [subject]);

    const [isModalOpen, setModalOpen] = useState(false);
    const addNote = useNotesStore((state) => state.addNote); // ✅ get addNote from store
    const updateNote = useNotesStore((state) => state.updateNote)
    const notes = useNotesStore((state) => state.notes);
    // console.log("notes length inside editorPAge is = ", notes.length)
    // console.log("rendedring")
    // console.log(subject)
    console.log("rendered")
    const fetchNotes = useNotesStore((state) => state.fetchNotes)
    useEffect(() => {
        if (notes.length === 0) {
            fetchNotes();
            console.log("fetchnotes runs inside editor page", notes.length)
            // console.log("fetchnotes occured")
        }
        // console.log("isnide fetchnotes use effect")
    }, [notes.length, fetchNotes]);

    const editor = useEditor({
        extensions,
        content: content,
    })
    if (!editor) {
        return null;
    }

    useEffect(() => {
        if (editor && content && !hasInitializedContent.current) {
            editor.commands.setContent(content);
            hasInitializedContent.current = true;
            console.log("initial content set");
        }
    }, [editor, content]);
    return (<div>
        <div className="flex">
            <div className=" border-r-2 border-gray-200  min-h-screen   hidden min-w-25 lg:block">
                <SideBar />
            </div>
            <div className="bg-[rgb(247,247,247)] hidden lg:block min-h-screen min-w-78 ">
                <div className="p-5 px-7 pt-14 space-y-6">
                    {notes.map((card: any) => (
                        <SideCard key={card._id} noteId={card._id} title={card.title} content={card.content} subject={card.subject} color={card.color} fav={card.fav} createdAt={card.createdAt} updatedAt={card.updatedAt} />
                    ))}
                </div>
            </div>
            <div className=" max-w-5xl w-full p-2 rounded-lg shadow-md">
                {/* <div>hello</div> */}


                <Toolbar editor={editor} setModalOpen={setModalOpen} />

                <div className=" rounded-lg   mt-6 ">
                    <EditorContent editor={editor} className="tiptap min-h-130 pl-10  pt-3 cursor-white  overflow-y-scroll " />
                </div>

                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setModalOpen(false)}
                    onSave={(subject, color) => {
                        const fullJson = editor.getJSON();
                        const nodes = fullJson.content || [];

                        const firstNode = nodes[0];
                        const isTitle = firstNode?.type === "heading" && firstNode?.attrs?.level === 1;
                        const titleText = isTitle
                            ? firstNode.content?.map((c: any) => c.text).join('') || ''
                            : '';

                        const bodyJson: JSONContent = {
                            type: "doc",
                            content: isTitle ? nodes.slice(1) : nodes,
                        };
                        if (_id) {
                            updateNote({
                                _id,
                                title: titleText,
                                content: bodyJson,
                                subject,
                                color,
                                fav: false
                            });
                        }
                        else {
                            addNote({
                                title: titleText,
                                content: bodyJson,
                                subject,
                                color,
                            });
                        }
                    }}
                    id={_id}




                />

            </div>
        </div>

    </div>)
}




export default EditorPage