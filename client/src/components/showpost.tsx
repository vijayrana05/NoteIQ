import { type JSONContent } from "@tiptap/react"
import { generateHTML } from "@tiptap/core"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline" // ✅ add this

interface ShowPostProps {
    title: string
    content: JSONContent | null
}

export const ShowPost = ({ title, content }: ShowPostProps) => {
    if (!content) return <div className="p-4 text-gray-500">No content yet.</div>
    console.log(content)
    const html = generateHTML(content, [
        StarterKit,
        Underline, 
    ])

    return (
        <div className="tiptap m-4 p-4 bg-gray-200">
            <h1 className="text-2xl font-bold mb-4">{title || "Untitled Note"}</h1>

            <div
                dangerouslySetInnerHTML={{ __html: html }}
                className="prose max-w-none"
            />
        </div>
    )
}
