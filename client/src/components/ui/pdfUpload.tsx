import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useNotesStore } from "../../store/notesStore";
import { convertMarkdownToTiptapJson } from "../../features/markdown";
import { usePdfStore } from "../../store/pdfStore";
import { useEffect } from "react";
import { FaFilePdf } from "react-icons/fa";

function PdfUpload() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadPdf, summary} = usePdfStore();
  const title = useNotesStore((state) => state.title);
  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      await uploadPdf(selectedFile);
    }
  };
  console.log(summary)
  useEffect(() => {
    console.log('Summary:', summary);
    console.log('Title:', title);

    if (summary) {
      const content = convertMarkdownToTiptapJson(summary)   
      navigate('/editor', {
        state: {
          _id: null,
          title: "Nothing",
          subject: "Imported PDF",
          content: content,
        },
      });
    }
  }, [summary, title, navigate]);
  return (
    <div className="sm:w-45 sm:h-45 w-30 h-30 border-4 text-right flex justify-center items-center rounded-3xl border-dashed  ">
      {/* Hidden file input */}
      <input
        type="file"
        accept="application/pdf"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Icon that triggers file input */}
      <FaFilePdf
        className="sm:text-8xl text-6xl cursor-pointer"
        onClick={handleIconClick}
      />
    </div>
  );
}

export default PdfUpload;
