import { type JSONContent } from "@tiptap/react";
import { generateHTML } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { useNavigate } from "react-router-dom";
import { useCallback, useMemo } from "react";
import React from "react";

interface SideCardProps {
    noteId: string;
    title: string;
    content: JSONContent;
    subject: string;
    color: string;
    fav: boolean;
    createdAt: string;
    updatedAt: string;
}

function SideCard({ 
    noteId, 
    title, 
    content, 
    subject, 
    color, 
    fav, 
    createdAt, 
    updatedAt 
}: SideCardProps) {
    
    console.log("sidecard rerender")
    const navigate = useNavigate();
    
    // Memoize HTML generation since it's expensive
    const html = useMemo(() => {
        console.log("html memo sidecard")
        return generateHTML(content, [StarterKit, Underline]);
    }, [content]);
    
    // Memoize the navigation state object
    const navigationState = useMemo   (() => ({
        _id: noteId,
        title: title,
        subject: subject,
        sideCardSelected: true,
        content: content
    }), [noteId, subject, title, content]);
    
    // Memoize the click handler
    const handleClick = useCallback(() => {
        console.log("navigate memeo sidecard")
        navigate("/editor", { state: navigationState });
    }, [navigate, navigationState]);
    
    return (
        <div 
            onClick={handleClick} 
            style={{ backgroundColor: color }} 
            className="relative text-black p-4 h-58 rounded-xl shadow-md max-w-64 mx-auto cursor-pointer hover:shadow-lg transition-shadow"
        >
            <p className="text-xs text-gray-600">{createdAt}</p>
            <h3 className="text-xl pt-1 font-semibold mb-2 line-clamp-1">{title}</h3>
            <hr className="border-gray-600 my-2" />
            <p 
                className="text-black font-sans text-sm leading-normal line-clamp-4" 
                dangerouslySetInnerHTML={{ __html: html }}
            />
            <p className="text-xs absolute bottom-6 left-4 right-16 line-clamp-2 text-gray-800">
                Subject - {subject}
            </p>
            {/* <div className="bg-[rgb(21,21,21)] rounded-full w-6 h-6 flex justify-center items-center absolute bottom-4 right-4">
                <VscEdit className="text-white text-lg" />
            </div> */}
        </div>
    );
}

// Wrap with React.memo to prevent unnecessary re-renders
export default React.memo(SideCard);