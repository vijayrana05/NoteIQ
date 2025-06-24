import { type JSONContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import { generateHTML } from "@tiptap/core"

export function ShowNoteText({title,content}: any) {
    const html = generateHTML(content, [StarterKit, Underline])
    console.log("inside showtext")
    
    return <div>
        <div>
            <p>{title}</p>
        </div>
        <div dangerouslySetInnerHTML={{ __html: html }} className="">
        
        </div>

    </div>
}