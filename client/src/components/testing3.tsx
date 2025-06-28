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
import { FaRegSave } from "react-icons/fa";

import { VscEdit } from "react-icons/vsc";



import { FaCode } from "react-icons/fa";

import '../App.css';
import SideBar from "./ui/sideBar";


const extensions = [
    StarterKit,
    Underline
    // ✅ this fixes your issue
];

const content = `Title`

function SideCard() {
    return (
        <div className={"bg-white relative text-black p-4 h-58 rounded-xl shadow-md  max-w-64 mx-auto"}>
            <p className="text-xs text-gray-600">27/06/25</p>
            <h3 className="text-xl pt-1 font-semibold mb-2">AI </h3>
            <hr className="border-gray-600 my-2" />
            <p className="text-black font-sans text-sm leading-normal line-clamp-4">this is ai note this i this is ai note this i this is ai note this i this is ai note this ithis is ai note this i this is ai note this iv this is ai note this i  this is ai note this i</p>
            <p className="text-xs absolute bottom-6 left-4 right-16 line-clamp-2 text-gray-800">
                subject — Artificial Intelligence
            </p>
            <div className="bg-[rgb(21,21,21)] rounded-full w-6 h-6 flex justify-center items-center absolute bottom-4 right-4">
                <VscEdit className="text-white text-lg" />

            </div>
        </div>
    );

}


export function Testing() {
    const editor = useEditor({
        extensions,
        content
    })
    if (!editor) {
        return null;
    }
    return (

        <div className="flex">
            <div className=" min-h-screen  hidden min-w-25 lg:block">
                <SideBar />
            </div>
            <div className="bg-[rgb(247,247,247)] hidden lg:block min-h-screen min-w-78 ">
                <div className="p-5 px-7 pt-14 space-y-6">
                    <SideCard />
                    <SideCard />
                    <SideCard />
                    <SideCard />
                </div>
            </div>
            <div className=" max-w-5xl w-full p-2 rounded-lg shadow-md">
                {/* <div>hello</div> */}


                <Toolbar editor={editor} />

                <div className=" rounded-lg   mt-6 ">
                    <EditorContent editor={editor} className="tiptap min-h-130 pl-10  pt-3 cursor-white  overflow-y-scroll " />
                </div>



                <button className="bg-blue-400" >Save</button>
            </div>
        </div>
    )
}


function Toolbar({ editor }: { editor: Editor }) {
    return (
        <div className=" w-full flex justify-center flex-wrap  border-3 rounded-lg p-3 gap-3 ">


            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={`w-10 h-10 text-xl flex items-center justify-center rounded transition duration-150
    ${editor.isActive('bold')
                        ? 'bg-gray-300' // active (selected) state
                        : ' hover:bg-gray-300'
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
                        ? 'bg-gray-300 '
                        : ' hover:bg-gray-300'}
    disabled:opacity-50`}
            >
                <FaItalic />

            </button>

            <button onClick={() => editor.chain().focus().toggleUnderline().run()} disabled={!editor.can().chain().focus().toggleUnderline().run()} className={`w-10 h-10 text-xl flex items-center justify-center rounded transition duration-150
    ${editor.isActive('underline')
                    ? 'bg-gray-300 '
                    : ' hover:bg-gray-300'}
    disabled:opacity-50`}
            >
                <FaUnderline />

            </button>

            <button onClick={() => editor.chain().focus().toggleStrike().run()} disabled={!editor.can().chain().focus().toggleUnderline().run()} className={`w-10 h-10 text-xl flex items-center justify-center rounded transition duration-150
    ${editor.isActive('strike')
                    ? 'bg-gray-300 '
                    : ' hover:bg-gray-300'}
    disabled:opacity-50`}
            >
                <FaStrikethrough />

            </button>

            <button
                onClick={() => editor.chain().focus().setParagraph().run()}
                className={`w-10 h-10 text-xl flex items-center justify-center rounded transition duration-150
    ${editor.isActive('paragraph')
                        ? ''
                        : ' hover:bg-gray-300'}
    disabled:opacity-50`}
            >
                <FaParagraph />
            </button>




            <button
                onClick={() => editor.chain().focus().toggleCode().run()}
                disabled={!editor.can().chain().focus().toggleCode().run()}
                className={`w-10 h-10 text-xl flex items-center justify-center rounded transition duration-150
    ${editor.isActive('code')
                        ? 'bg-gray-300 '
                        : ' hover:bg-gray-300'}
    disabled:opacity-50`}
            >
                <FaCode />
            </button>



            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`w-10 h-10 text-xl flex items-center justify-center rounded transition duration-150
    ${editor.isActive('heading', { level: 1 })
                        ? 'bg-gray-300 '
                        : ' hover:bg-gray-300'}
    disabled:opacity-50`}
            >
                <LuHeading1 />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`w-10 h-10 text-xl flex items-center justify-center rounded transition duration-150
    ${editor.isActive('heading', { level: 2 })
                        ? 'bg-gray-300 '
                        : ' hover:bg-gray-300'}
    disabled:opacity-50`}
            >
                <LuHeading2 />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={`w-10 h-10 text-xl flex items-center justify-center rounded transition duration-150
    ${editor.isActive('heading', { level: 3 })
                        ? 'bg-gray-300 '
                        : ' hover:bg-gray-300'}
    disabled:opacity-50`}
            >
                <LuHeading3 />
            </button>


            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`w-10 h-10 text-xl flex items-center justify-center rounded transition duration-150
    ${editor.isActive('bulletList')
                        ? 'bg-gray-300 '
                        : ' hover:bg-gray-300'}
    disabled:opacity-50`}
                disabled={!editor.can().chain().focus().toggleBulletList().run()}
            >
                <FaListUl />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`w-10 h-10 text-xl flex items-center justify-center rounded transition duration-150
    ${editor.isActive('orderedList')
                        ? 'bg-gray-300 '
                        : ' hover:bg-gray-300'}
    disabled:opacity-50`}
                disabled={!editor.can().chain().focus().toggleOrderedList().run()}
            >
                <FaListOl />
            </button>
            <button className="w-10 h-10 text-xl flex items-center justify-center rounded transition  hover:bg-gray-300">
                <FaRegSave />
            </button>
        </div>
    );
}

