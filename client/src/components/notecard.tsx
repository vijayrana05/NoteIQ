// components/NoteCard.tsx
import { Card} from "./ui/card"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import { Button } from "./ui/button"
// import { TipTap } from "./tiptap" // import your TipTap editor here

interface NoteCardProps {
  title: string
  summary: string
  fullContent: string
  onSave: (updatedHtml: string) => void
}

export function NoteCard({ title, summary, fullContent, onSave }: NoteCardProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="p-4 shadow-md hover:shadow-lg transition cursor-pointer bg-white dark:bg-gray-900">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{title}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">{summary}</p>
        </Card>
      </DialogTrigger>

      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
        {/* <TipTap initialContent={fullContent} onEditorContentSave={onSave} /> */}
        <div className="mt-4 flex justify-end">
          <Button onClick={() => onSave(fullContent)}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
