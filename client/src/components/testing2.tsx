
import { VscEdit } from "react-icons/vsc";


export function MainPage() {
    const sampleCards = [
        { title: "AI", content: "Artificial Intelligence is the simulation of human intelligenceArtificial Intelligence is the simulation of human intelligenceArtificial Intelligence is the simulation of human intelligenceArtificial Intelligence is the simulation of human intelligenceArtificial Intelligence is the simulation of human intelligenceArtificial Intelligence is the simulation of human intelligence...", color:"bg-[rgb(254,201,113)]"},
        { title: "React", content: "React is a JavaScript library for building user interfaces...",color:"bg-[rgb(254,155,114)]" },
        { title: "MongoDB", content: "MongoDB is a document-oriented NoSQL database...",color:"bg-[rgb(221,232,140)]" },
        { title: "Node.js", content: "Node.js is a JavaScript runtime built on Chrome's V8 engine...",color:"bg-[rgb(182,147,253)]" },
        { title: "Tailwind", content: "Tailwind CSS is a utility-first CSS framework...",color:"bg-[rgb(0,212,254)]" },
        { title: "React", content: "React is a JavaScript library for building user interfaces..." ,color:"bg-[rgb(207,102,121)]"},
    
    ];
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-red-300 w-52 h-screen fixed hidden lg:block"></div>

      {/* Cards Grid */}
      <GridLayout cards={sampleCards} />
    </div>
  );
}
export default MainPage;


function GridLayout({ cards }: { cards: { title: string; content: string; color: string }[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 lg:ml-52">
      {cards.map((card, idx) => (
        <SmallCard key={idx} title={card.title} content={card.content} color={card.color} />
      ))}
    </div>
  );
}
// lg se jada screen to tb ye krio
function SmallCard({ title, content, color }: { title: string; content: string; color: string }) {
  return (
    <div className={`${color} relative text-black p-4 h-78 rounded-xl  w-full max-w-xs mx-auto`}>
      <p className="text-xs text-gray-600">27/06/25</p>
      <h3 className="text-xl pt-3 font-semibold mb-2">{title}</h3>
      <hr className="border-gray-600 my-2" />
      <p className="text-black font-sans text-sm leading-normal line-clamp-7">{content}</p>
      <p className="text-xs absolute bottom-6 left-4 right-16 line-clamp-2 text-gray-800">
        subject — Artificial Intelligence 
      </p>
      <div className="bg-[rgb(21,21,21)] rounded-full w-10 h-10 flex justify-center items-center absolute bottom-4 right-4">
        <VscEdit className="text-white text-lg" />
      </div>
    </div>
  );
}


//colors  = rgb(254, 201, 113) (yellowish) , rgb(254, 155, 114) browinish,  rgb(221, 232, 140) greenish , rgb(182, 147, 253) purple , rgb(0, 212, 254) blue
