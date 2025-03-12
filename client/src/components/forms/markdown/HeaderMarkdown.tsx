import { useCallback, useEffect, useRef, useState } from "react";
import { BoldIcon, CodeHTMLIcon, Content, Down, IAIcon, ItalicIcon, LinkIcon, PlayCircleIcon, TextAlignIcon, TextColorIcon, TreeDots, UnderlineIcon } from "../../../icons/icons";
import { TITLES } from "../../../constants/constants";
import ToolTip from "../ToolTip";
import MarkDownOptions from "../../markdown-options";
import MarkDownColor from "./MarkDownColor";

interface Props {
  handleBold: () => void;
  handleItalic: () => void;
  handleUnderline: () => void;
  toggleCodeView: () => void;
  handleHeader: (headerType: string, font: string, size: string, color: string) => void;
  handleColorChange: (color: string, backgroundColor: string) => void;
}

export default function HeaderMarkdown({ handleBold, handleItalic, handleUnderline, handleColorChange, toggleCodeView, handleHeader }: Props) {
  const optionsRef = useRef<HTMLDivElement>(null);
  const formatRef = useRef<HTMLDivElement>(null);
  const colorRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({
    bold: false,
    italic: false,
    underline: false
  });

  const [isShowOptions, setIsShowOptions] = useState({
    options: false,
    format: false,
    color: false
  });

  const handleChangeShowModal = useCallback((name: keyof typeof isShowOptions, value: boolean) => {
    setIsShowOptions((prevState) => ({
      ...prevState,
      options: name === "options" ? value : false,
      format: name === "format" ? value : false,  
      color: name === "color" ? value : false,    
    }));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        optionsRef.current &&
        !optionsRef.current.contains(event.target as Node) &&
        formatRef.current &&
        !formatRef.current.contains(event.target as Node) &&
        colorRef.current &&
        !colorRef.current.contains(event.target as Node)
      ) {
        handleChangeShowModal("options", false);
        handleChangeShowModal("format", false);
        handleChangeShowModal("color", false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleChangeShowModal]);

  useEffect(() => {
    const targetDiv = document.querySelector('.photoshop-picker div[style="width: 12px; height: 12px; border-radius: 6px; box-shadow: rgb(255, 255, 255) 0px 0px 0px 1px inset; transform: translate(-6px, -6px);"]') as HTMLDivElement;
    setTimeout(() => {
      targetDiv.style.width = "20px"
      targetDiv.style.height = "20px"
      targetDiv.style.borderRadius = "25px"
      targetDiv.style.border = '3.5px solid #ffffff'
    }, 300)
  }, []);

  const getTextStyles = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const bold = document.queryCommandState('bold');
      const italic = document.queryCommandState('italic');
      const underline = document.queryCommandState('underline');

      return { bold, italic, underline };
    }
    return { bold: false, italic: false, underline: false };
  };

  useEffect(() => {
    const handleSelectionChange = () => {
      const { bold, italic, underline } = getTextStyles();
      setStyle({ bold, italic, underline });
    };

    document.addEventListener('selectionchange', handleSelectionChange);

    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, []);

  return (
    <div className="p-2 rounded-t-lg bg-[#f7f7f7] flex items-center relative">
      <div className="flex items-center space-x-2 pr-2">
        <button data-tooltip-id="ia" type="button" className="flex items-center space-x-2 hover:bg-[#e3e3e3] rounded-md p-1">
          <IAIcon />
          <Down className="size-4 stroke-[2.5px]" />
          <ToolTip id="ia" title="Generar texto" />
        </button>
      </div>

      <div className="border-x border-gray-300 px-2 relative" ref={formatRef}>
        <button
          data-tooltip-id="format"
          type="button"
          className="flex text-[13px] font-semibold items-center hover:bg-[#e3e3e3] py-1.5 px-2 rounded-md"
          onClick={() => handleChangeShowModal("format", !isShowOptions.format)}
        >
          Párrafo
          <Down className="size-4 stroke-[2.5px] ml-6" />
          <ToolTip id="format" title="Formato" />
        </button>

        {isShowOptions.format && (
          <div className="absolute [&>button]:h-[50px] top-full left-0 mt-1 bg-white border border-gray-300 rounded-md shadow-md z-10 w-36">
            {TITLES.map(({ text, color, font, size }, index) => (
              <button
                type="button"
                key={index}
                onClick={() => handleHeader(
                  text === "Párrafo" ? "p" :
                    text === "Título 1" ? "h1" :
                      text === "Título 2" ? "h2" :
                        text === "Título 3" ? "h3" :
                          text === "Título 4" ? "h4" :
                            text === "Título 5" ? "h5" :
                              text === "Título 6" ? "h6" : "p",
                  font, size, color)} // Pasa el font, size y color
                className={`w-full flex items-center text-left pl-6 pr-1.5 hover:bg-gray-100 ${index !== TITLES.length - 1 ? 'border-b border-gray-300' : ''} ${font} ${size} ${color} ${index === 0 ? "rounded-t-md" : index === TITLES.length - 1 ? "rounded-b-md" : ""}`}
              >
                {text === "Cita" && <div className="w-[3px] h-[45%] mr-2 rounded-md bg-[#E3E3E3]" />}
                {text}
              </button>
            ))}

          </div>
        )}
      </div>

      <div className="flex items-center space-x-1 px-2 ">
        <button onClick={handleBold} data-tooltip-id="bold" type="button" className={`rounded-md hover:bg-[#e3e3e3] p-1 ${style.bold ? 'bg-[#e3e3e3]' : ''}`}>
          <BoldIcon />
        </button>
        <button onClick={handleItalic} data-tooltip-id="italic" type="button" className={`rounded-md hover:bg-[#e3e3e3] p-1 ${style.italic ? 'bg-[#e3e3e3]' : ''}`}>
          <ItalicIcon />
        </button>
        <button onClick={handleUnderline} data-tooltip-id="underline" type="button" className={`rounded-md hover:bg-[#e3e3e3] p-1 ${style.underline ? 'bg-[#e3e3e3]' : ''}`}>
          <UnderlineIcon />
        </button>

        <div ref={colorRef}>
          <button onClick={() => { handleChangeShowModal("color", !isShowOptions.color); }} data-tooltip-id="color" type="button" className="rounded-md relative hover:bg-[#e3e3e3] p-1 flex items-center">
            <TextColorIcon />
            <Down className="size-4 stroke-[2.5px]" />
          </button>

          {isShowOptions.color && <MarkDownColor handleColor={handleColorChange} />}
        </div>

        <ToolTip id="bold" title="Negrita" />
        <ToolTip id="italic" title="Itálico" />
        <ToolTip id="underline" title="Subrayado" />
        <ToolTip id="color" title="Color" />
      </div>

      <div data-tooltip-id="alienation" className="border-x border-gray-300 px-1">
        <button data-tooltip-id="Alineación" type="button" className="rounded-md  hover:bg-[#e3e3e3] px-1 py-1.5 flex items-center">
          <TextAlignIcon />
          <Down className="size-4 stroke-[2.5px]" />
        </button>
        <ToolTip id="alienation" title="Alineación" />
      </div>

      <div className="flex items-center space-x-1 px-2 border-r border-gray-300">
        <button data-tooltip-id="link" type="button" className="rounded-md hover:bg-[#e3e3e3] p-1.5">
          <LinkIcon />
        </button>
        <button data-tooltip-id="image" type="button" className="rounded-md hover:bg-[#e3e3e3] p-1">
          <Content className="size-5 stroke-2" />
        </button>
        <button data-tooltip-id="video" type="button" className="rounded-md hover:bg-[#e3e3e3] p-1">
          <PlayCircleIcon />
        </button>

        <ToolTip id="link" title="Insertar enlace" />
        <ToolTip id="image" title="Insertar imagen" />
        <ToolTip id="video" title="Insertar video" />
      </div>
      <div className="px-2 flex items-center justify-between w-full relative">
        <div className="relative" ref={optionsRef}>
          <button onClick={() => handleChangeShowModal("options", !isShowOptions.options)} type="button" className="rounded-md hover:bg-[#e3e3e3] p-1">
            <TreeDots className="size-5" />
          </button>

          {isShowOptions.options && <MarkDownOptions />}
        </div>

        <button onClick={toggleCodeView} data-tooltip-id="code" type="button" className="rounded-md hover:bg-[#e3e3e3] p-1">
          <CodeHTMLIcon />
        </button>

        <ToolTip id="code" title="Mostrar HTML" />
      </div>
    </div>
  );
}
