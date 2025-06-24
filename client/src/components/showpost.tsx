import { type JSONContent } from "@tiptap/react"
import { generateHTML } from "@tiptap/core"
import { Button } from "./ui/button"
import { useState } from "react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import { ShowNoteText } from "./showNoteText"

interface FlashCardProps {
  title: string
  content: JSONContent | null
}

export const ShowPost = ({ title, content }: FlashCardProps) => {
  if (!content) return null
  const [expanded, setExpanded] = useState(false)
  // const [openTipTap, setOpenTipTap] = useRecoilState(openTipTapAtom)
  const [editing,setEditing] = useState(false)
  const html = generateHTML(content, [StarterKit, Underline])

  return (
    <div
      className="bg-yellow-100 dark:bg-gray-800 rounded-2xl shadow-md p-5 max-w-md w-full cursor-pointer transition-all duration-300 hover:shadow-xl"
    >
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
        {title || "Untitled"}
      </h2>

      <div
        className={`prose prose-sm max-w-none text-gray-700 dark:text-gray-300 transition-all duration-300 ${expanded ? "line-clamp-none" : "line-clamp-5"
          }`}
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {!expanded && (
        <p className="mt-2 text-blue-600 text-sm font-medium">Click to expand</p>
      )}
      <div className="space-x-4">
        <Button onClick={() => {setExpanded(!expanded)}}>Expand</Button>
        <Button onClick={() => {
          setEditing(!editing);
        }}>Edit</Button>
        {(editing && <ShowNoteText title={title} content={content} />)}
      </div>
    </div>
  )
}