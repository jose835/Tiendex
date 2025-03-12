import { useEffect, useRef, useState } from "react";
import HeaderMarkdown from "./markdown/HeaderMarkdown";

interface Props {
  name: string;
  id: string;
  rows: number;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const FieldMarkDown = ({ name, id, rows }: Props) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [showCode, setShowCode] = useState(false);
  const [htmlCode, setHtmlCode] = useState("");
  const [isEditorUpdating, setIsEditorUpdating] = useState(false);

  const executeCommand = (command: string, showUI = false, value?: string) => {
    if (editorRef.current) {
      editorRef.current.focus();
      setTimeout(() => {
        document.execCommand(command, showUI, value);
        captureEditorContent();
      }, 0);
    }
  };
  const handleHeader = (headerType: string, font: string, size: string, color: string) => {
    // Verifica que el headerType sea válido (p, h1, h2, ..., h6)
    const validHeaders = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
    if (!validHeaders.includes(headerType)) {
      console.error('Tipo de encabezado no válido');
      return;
    }

    // Obtiene la selección actual del usuario
    const selection = window.getSelection();

    // Verifica si hay texto seleccionado
    if (!selection || selection.rangeCount === 0 || selection.toString().trim() === '') {
      console.error('No hay texto seleccionado');
      return;
    }

    // Obtiene el rango de la selección
    const range = selection.getRangeAt(0);

    // Crea un nuevo elemento (p, h1, h2, etc.)
    const newElement = document.createElement(headerType);

    // Asigna las clases de Tailwind CSS al nuevo elemento
    newElement.className = `${font} ${size} ${color}`;

    // Clona el contenido seleccionado y lo envuelve en el nuevo elemento
    newElement.appendChild(range.extractContents());

    // Inserta el nuevo elemento en el lugar de la selección
    range.insertNode(newElement);

    // Limpia la selección
    selection.removeAllRanges();
  };

  const handleColorChange = (color: string, backgroundColor: string) => {
    if (editorRef.current) {
      document.execCommand("foreColor", false, color);
      document.execCommand("hiliteColor", false, backgroundColor);
      captureEditorContent();
    }
  };

  const handleBold = () => {
    if (!showCode) {
      executeCommand("bold");
    }
  };

  const handleItalic = () => {
    if (!showCode) {
      executeCommand("italic");
    }
  };

  const handleUnderline = () => {
    if (!showCode) {
      executeCommand("underline");
    }
  };

  const captureEditorContent = () => {
    if (editorRef.current) {
      setHtmlCode(editorRef.current.innerHTML);
    }
  };

  const focusEditor = () => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
    captureEditorContent();
  };

  useEffect(() => {
    if (!showCode && isEditorUpdating && editorRef.current) {
      editorRef.current.innerHTML = htmlCode;
      setIsEditorUpdating(false);
      const range = document.createRange();
      const selection = window.getSelection();
      if (editorRef.current.lastChild) {
        range.selectNodeContents(editorRef.current.lastChild);
        range.collapse(false);
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
      focusEditor();
    }
  }, [showCode, htmlCode, isEditorUpdating]);

  const handleBlur = () => {
    if (editorRef.current && (editorRef.current.innerHTML === "" || editorRef.current.innerHTML === "<p><br></p>")) {
      editorRef.current.innerHTML = "<p>Escribe aquí...</p>";
      setHtmlCode("<p>Escribe aquí...</p>");
    }
  };

  const handleEditorChange = () => {
    if (editorRef.current) {
      setHtmlCode(editorRef.current.innerHTML);
    }
  };

  const toggleCodeView = () => {
    if (showCode) {
      setIsEditorUpdating(true);
      setShowCode(false);
    } else {
      if (editorRef.current) {
        setHtmlCode(editorRef.current.innerHTML);
      }
      setShowCode(true);
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHtmlCode(e.target.value);
  };

  return (
    <div className="mb-5">
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-primary">{name}</label>
      <div className="bg-gray-50 focus-within:border-blue-500 focus-within:ring-blue-500 border text-[#505050] border-gray-400 rounded-lg">
        <HeaderMarkdown
          handleBold={handleBold}
          handleItalic={handleItalic}
          handleUnderline={handleUnderline}
          handleColorChange={handleColorChange}
          handleHeader={handleHeader}
          toggleCodeView={toggleCodeView}
        />

        {!showCode ? (
          <div
            className="border p-4 min-h-[300px] focus:outline-none"
            ref={editorRef}
            contentEditable={true}
            onInput={handleEditorChange}
            onPaste={handlePaste}
            onBlur={handleBlur}
            suppressContentEditableWarning={true}
          />
        ) : (
          <textarea
            className="resize-none outline-none rounded-b-lg placeholder-primary/80 text-primary text-sm font-medium block w-full px-2.5 py-1"
            value={htmlCode}
            onChange={handleCodeChange}
            rows={rows}
            id={id}
          />
        )}
      </div>
    </div>
  );
};
