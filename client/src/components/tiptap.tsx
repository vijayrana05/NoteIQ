import { useEditor, EditorContent, type JSONContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import '../App.css';
// import { stringify } from "querystring";


const extensions = [
    StarterKit,
    Underline
]

interface TipTapProps {
    onEditorContentSave: (data: { title: string, content: JSONContent }) => void;
}


const content = `Title`
export function TipTap({ onEditorContentSave }: TipTapProps) {
    const editor = useEditor({
        extensions,
        content
    })
    if (!editor) {
        return null;
    }
    const handleEditorContent = () => {
    const fullJson = editor.getJSON();

    const nodes = fullJson.content || [];

    const firstNode = nodes[0];
    const isTitle = firstNode?.type === "heading" && firstNode?.attrs?.level === 1;
    const titleText = isTitle
        ? firstNode.content?.map((c: any) => c.text).join('') || ''
        : '';

    // Remove title node from content
    const remainingNodes = isTitle ? nodes.slice(1) : nodes;

    const bodyJson: JSONContent = {
        type: "doc",
        content: remainingNodes,
    };

    onEditorContentSave({ title: titleText, content: bodyJson });
};
    return (

        <div className="m-8   w-2xl bg-gray-800">
            {/* <div>hello</div> */}

            <div className="">
                <div className="w-full  flex flex-wrap bg-gray-600 p-3 gap-3 text-white ">
                    <button onClick={() => editor.chain().focus().toggleBold().run()} disabled={!editor.can().chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'is-active' : ''}><strong>Bold</strong></button>

                    <button onClick={() => editor.chain().focus().toggleItalic().run()} disabled={!editor.can().chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'is-active' : ''}>Italic</button>

                    <button onClick={() => editor.chain().focus().toggleStrike().run()} disabled={!editor.can().chain().focus().toggleStrike().run()} className={editor.isActive('strike') ? 'is-active' : ''}>Strike</button>

                    <button onClick={() => editor.chain().focus().toggleUnderline().run()} disabled={!editor.can().chain().focus().toggleUnderline().run()} className={editor.isActive('underline') ? 'is-active' : ''}>U</button>

                    <button onClick={() => editor.chain().focus().toggleCode().run()} disabled={!editor.can().chain().focus().toggleCode().run()} className={editor.isActive('code') ? 'is-active' : ''}>
                        Code</button>

                    <button onClick={() => editor.chain().focus().setParagraph().run()} className={editor.isActive('paragraph') ? 'is-active' : ''}>Paragraph</button>

                    <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}>H1</button>

                    <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}> H2</button>

                    <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}>H3</button>

                    <button onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()} className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}></button>

                </div>
                <div className="border  border-t-0">
                    <EditorContent editor={editor} className="max-h-96 cursor-white text-white overflow-y-scroll min-h-104" />
                </div>

            </div>

            <button className="bg-blue-400" onClick={handleEditorContent}>Save</button>
        </div>
    )
}

export default TipTap