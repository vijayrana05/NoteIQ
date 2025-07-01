import { VscEdit } from "react-icons/vsc";
import { type JSONContent } from "@tiptap/react";
import { generateHTML } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


function SideCard({ noteId, title, content, subject, color, fav, createdAt, updatedAt }: { noteId: string; title: string; content: JSONContent; subject: string; color: string; fav: boolean; createdAt: string; updatedAt: string }) {
    const html = generateHTML(content, [StarterKit, Underline])
    const navigate = useNavigate()
    const [sideCardSelected,SetSideCardSelected] = useState(false)
    const handleClick = () => {
        SetSideCardSelected(true)
        navigate("/editor", {
            state: {
                _id: noteId,
                subject:subject,
                sideCardSelected:sideCardSelected,
                content: {
                    type: "doc",
                    content: [
                        {
                            type: "heading",
                            attrs: { level: 1 },
                            content: [{ type: "text", text: title }],
                        },
                        ...(content?.content || []),
                    ],
                },
            },
        });
    };
    return (
        <div onClick={handleClick} style={{ backgroundColor: color }} className={" relative text-black p-4 h-58 rounded-xl shadow-md  max-w-64 mx-auto"}>
            <p className="text-xs text-gray-600">{createdAt}</p>
            <h3 className="text-xl pt-1 font-semibold mb-2">{title} </h3>
            <hr className="border-gray-600 my-2" />
            <p className="text-black font-sans text-sm leading-normal line-clamp-4" dangerouslySetInnerHTML={{ __html: html }}></p>
            <p className="text-xs absolute bottom-6 left-4 right-16 line-clamp-2 text-gray-800">
                Subject - {subject}
            </p>
            <div className="bg-[rgb(21,21,21)] rounded-full w-6 h-6 flex justify-center items-center absolute bottom-4 right-4">
                <VscEdit className="text-white text-lg" />

            </div>
        </div>
    );


}

export default SideCard