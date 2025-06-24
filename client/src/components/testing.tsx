import { useEditor, EditorContent, type JSONContent, type Editor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import { FaBold, FaHeading } from "react-icons/fa6";
import { FaItalic } from "react-icons/fa";
import { FaUnderline } from "react-icons/fa";
import { FaStrikethrough } from "react-icons/fa";
import { FaParagraph } from "react-icons/fa";
import { FaListUl } from "react-icons/fa"; // icon for unordered list
import { FaListOl } from "react-icons/fa"; // icon for ordered list
import { LuHeading1 } from "react-icons/lu";
import { LuHeading2 } from "react-icons/lu";
import { LuHeading3 } from "react-icons/lu";



import { FaCode } from "react-icons/fa";

import '../App.css';


const extensions = [
    StarterKit,
    Underline
    // ✅ this fixes your issue
];

const content = `Title`

export function Test() {
    const editor = useEditor({
        extensions,
        content
    })
    if (!editor) {
        return null;
    }
    return (

        <div className="mx-auto mt-4 max-w-4xl w-full bg-[rgb(13,17,23)] p-2 rounded-lg shadow-md">
            {/* <div>hello</div> */}


            <Toolbar editor={editor} />
            <div className="border-3  rounded-lg border-gray-600  mt-6  ">
                <EditorContent editor={editor} className="tiptap max-h-96 px-4 pt-3 cursor-white text-white overflow-y-scroll min-h-104" />
            </div>



            <button className="bg-blue-400" >Save</button>
        </div>
    )
}


function Toolbar({ editor }: { editor: Editor }) {
    return (
        <div className=" w-full flex justify-center flex-wrap bg-[rgb(13,17,23)] border-3 border-gray-600 rounded-lg p-3 gap-3 text-white">


                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={!editor.can().chain().focus().toggleBold().run()}
                    className={`w-10 h-10 text-xl flex items-center justify-center rounded transition duration-150
    ${editor.isActive('bold')
                            ? 'bg-gray-600 text-white' // active (selected) state
                            : 'bg-[rgb(13,17,23)] text-white hover:bg-gray-600'
                        }
    disabled:opacity-50`}
                >
                    <FaBold />
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={!editor.can().chain().focus().toggleItalic().run()}
                    className={`w-10 h-10 text-xl flex items-center justify-center rounded transition duration-150
    ${editor.isActive('italic')
                            ? 'bg-gray-600 text-white'
                            : 'bg-[rgb(13,17,23)] text-white hover:bg-gray-600'}
    disabled:opacity-50`}
                >
                    <FaItalic />

                </button>

                <button onClick={() => editor.chain().focus().toggleUnderline().run()} disabled={!editor.can().chain().focus().toggleUnderline().run()} className={`w-10 h-10 text-xl flex items-center justify-center rounded transition duration-150
    ${editor.isActive('underline')
                        ? 'bg-gray-600 text-white'
                        : 'bg-[rgb(13,17,23)] text-white hover:bg-gray-600'}
    disabled:opacity-50`}
                >
                    <FaUnderline />

                </button>

                <button onClick={() => editor.chain().focus().toggleUnderline().run()} disabled={!editor.can().chain().focus().toggleUnderline().run()} className={`w-10 h-10 text-xl flex items-center justify-center rounded transition duration-150
    ${editor.isActive('strike')
                        ? 'bg-gray-600 text-white'
                        : 'bg-[rgb(13,17,23)] text-white hover:bg-gray-600'}
    disabled:opacity-50`}
                >
                    <FaStrikethrough />

                </button>

                <button
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    className={`w-10 h-10 text-xl flex items-center justify-center rounded transition duration-150
    ${editor.isActive('paragraph')
                            ? ''
                            : 'bg-[rgb(13,17,23)] text-white hover:bg-gray-600'}
    disabled:opacity-50`}
                >
                    <FaParagraph />
                </button>



           
                <button
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    disabled={!editor.can().chain().focus().toggleCode().run()}
                    className={`w-10 h-10 text-xl flex items-center justify-center rounded transition duration-150
    ${editor.isActive('code')
                            ? 'bg-gray-600 text-white'
                            : 'bg-[rgb(13,17,23)] text-white hover:bg-gray-600'}
    disabled:opacity-50`}
                >
                    <FaCode />
                </button>

         

                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={`w-10 h-10 text-xl flex items-center justify-center rounded transition duration-150
    ${editor.isActive('heading', { level: 1 })
                            ? 'bg-gray-600 text-white'
                            : 'bg-[rgb(13,17,23)] text-white hover:bg-gray-600'}
    disabled:opacity-50`}
                >
                    <LuHeading1 />
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`w-10 h-10 text-xl flex items-center justify-center rounded transition duration-150
    ${editor.isActive('heading', { level: 2 })
                            ? 'bg-gray-600 text-white'
                            : 'bg-[rgb(13,17,23)] text-white hover:bg-gray-600'}
    disabled:opacity-50`}
                >
                    <LuHeading2 />
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={`w-10 h-10 text-xl flex items-center justify-center rounded transition duration-150
    ${editor.isActive('heading', { level: 1 })
                            ? 'bg-gray-600 text-white'
                            : 'bg-[rgb(13,17,23)] text-white hover:bg-gray-600'}
    disabled:opacity-50`}
                >
                    <LuHeading3 />
                </button>


            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`w-10 h-10 text-xl flex items-center justify-center rounded transition duration-150
    ${editor.isActive('bulletList')
                        ? 'bg-gray-600 text-white'
                        : 'bg-[rgb(13,17,23)] text-white hover:bg-gray-600'}
    disabled:opacity-50`}
                disabled={!editor.can().chain().focus().toggleBulletList().run()}
            >
                <FaListUl />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`w-10 h-10 text-xl flex items-center justify-center rounded transition duration-150
    ${editor.isActive('orderedList')
                        ? 'bg-gray-600 text-white'
                        : 'bg-[rgb(13,17,23)] text-white hover:bg-gray-600'}
    disabled:opacity-50`}
                disabled={!editor.can().chain().focus().toggleOrderedList().run()}
            >
                <FaListOl />
            </button>
        </div>
    );
}

