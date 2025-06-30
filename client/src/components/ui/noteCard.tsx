import { FaStar } from "react-icons/fa";
import { VscEdit } from "react-icons/vsc";
import { generateHTML, type JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function NoteCard({ noteId, title, content, subject, color, fav, createdAt, updatedAt }: { noteId: string; title: string; content: JSONContent; subject: string; color: string; fav: boolean; createdAt: string; updatedAt: string }) {
  const [isFav, SetisFav] = useState(fav)
  const html = generateHTML(content, [StarterKit, Underline])
  const navigate = useNavigate();
  const toggleFav = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const newFav = !isFav;

      // Optimistic update
      SetisFav(newFav);

      await axios.patch(
        `http://localhost:5000/api/notesRoutes/${noteId}`,
        { fav: newFav },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.error("Failed to update favorite", err);
      // Rollback if error
      SetisFav((prev) => !prev);
    }
  };
  // console.log("color is = ", color)
  return (
    <div style={{ backgroundColor: color }} className={`relative text-black p-4 h-78 rounded-xl  w-full max-w-78 mx-auto`}>
      <p className="text-xs text-gray-600">{createdAt}</p>
      <div className="bg-[rgb(21,21,21)] rounded-full w-8 h-8 flex justify-center items-center absolute top-4 right-4">
        <FaStar className={`text-lg ${isFav ? 'text-yellow-300' : 'text-white'}`} onClick={toggleFav} />

      </div>
      <h3 className="text-xl pt-3 font-semibold mb-2 mr-4">{title}</h3>
      <hr className="border-gray-600 my-2" />
      <p className="text-black font-sans text-sm leading-normal line-clamp-7" dangerouslySetInnerHTML={{ __html: html }} />
      <p className="text-xs absolute bottom-9 left-4 right-16 line-clamp-2 text-gray-800">
        {`Subject - ${subject}`}
      </p>
      <p className="text-xs absolute bottom-4 left-4 right-16 line-clamp-2 text-gray-800">
        Updated at - {updatedAt}
      </p>
      <div className="bg-[rgb(21,21,21)] rounded-full w-10 h-10 flex justify-center items-center absolute bottom-4 right-4">
        <VscEdit
          className="text-white text-lg"
          onClick={() =>
            navigate("/editor", {
              state: {
                _id:noteId,
                subject:subject,
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
            })
          }
        />
      </div>
    </div>
  );
}

export default NoteCard;