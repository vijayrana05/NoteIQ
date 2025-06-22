import { type JSONContent } from "@tiptap/react"
import { generateHTML } from "@tiptap/core"
import { useState } from "react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"

interface FlashCardProps {
  title: string
  content: JSONContent | null
}

export const ShowPost = ({ title, content }: FlashCardProps) => {
  if (!content) return null
  const [expanded, setExpanded] = useState(false)

  const html = generateHTML(content, [StarterKit, Underline])

  return (
   <div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5 max-w-md w-full cursor-pointer transition-all duration-300 hover:shadow-xl"
      onClick={() => setExpanded(!expanded)}
    >
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
        {title || "Untitled"}
      </h2>

      <div
        className={`prose prose-sm max-w-none text-gray-700 dark:text-gray-300 transition-all duration-300 ${
          expanded ? "line-clamp-none" : "line-clamp-5"
        }`}
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {!expanded && (
        <p className="mt-2 text-blue-600 text-sm font-medium">Click to expand</p>
      )}
    </div>
  ) 
}