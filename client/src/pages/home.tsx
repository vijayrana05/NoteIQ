
import { MdNoteAdd } from "react-icons/md";
import { useEffect } from "react";
import SideBar from "../components/ui/sideBar";
import NoteCard from "../components/ui/noteCard";
import { useNotesStore } from "../store/notesStore";


export function Main() {
    // const { userId } = useParams();
    const fetchNotes = useNotesStore((state) => state.fetchNotes)

    useEffect(() => {
        fetchNotes();
    }, [fetchNotes])

    

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className=" border-r-2 border-gray-200 min-w-25 h-screen fixed hidden lg:block">
        <SideBar />
      </div>

      {/* Cards Grid */}
      <GridLayout />
    </div>
  );
}


function GridLayout() {
    const notes = useNotesStore((state) => state.notes)

  return (
    <div className=" ">
      <div className=" flex  justify-center mt-10 ">
        <div className="w-120 h-40     flex relative">
          <div className="w-45 h-45 border-4 flex items-center  justify-center rounded-3xl border-dashed absolute left-0">
            <MdNoteAdd className="text-8xl" />
          </div>
          <div className="w-45 h-45 border-4 rounded-3xl border-dashed absolute right-0">

          </div>
        </div>
      </div>
      <div className=" mt-20 lg:ml-36 ">
        <h1 className="text-6xl font-semibold  pl-4">Notes</h1>
      </div>
      <div className="lg:ml-36 px-4 pt-1">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 border-t-3 pt-4  border-gray-300 w-fit">
          {notes.map((card:any) => (
            <NoteCard key={card._id} title={card.title} content={card.content} subject={card.subject} color={card.color}  fav={card.fav} createdAt={card.createdAt} updatedAt={card.updatedAt}  />
          ))}
        </div>
      </div>
    </div>
  );
}
// lg se jada screen to tb ye krio



//colors  = rgb(254, 201, 113) (yellowish) , rgb(254, 155, 114) browinish,  rgb(221, 232, 140) greenish , rgb(182, 147, 253) purple , rgb(0, 212, 254) blue
