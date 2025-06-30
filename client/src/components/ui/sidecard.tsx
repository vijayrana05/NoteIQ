import { VscEdit } from "react-icons/vsc";

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

export default SideCard