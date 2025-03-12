import FieldInputWithElement from "../FieldInputWithElement";
import Button from "../Button";
import { PhotoshopPicker } from 'react-color';
import { useState } from "react";
import { COLORS_PICKERS } from "../../../constants/constants";

type ButtonName = 'Texto' | 'Fondo';

interface Props {
  handleColor: (color: string, backgroundColor: string) => void;
}

export default function MarkDownColor({ handleColor }: Props) {
  const [activeButton, setActiveButton] = useState<ButtonName>("Texto");
  const [colorInput, setColorInput] = useState<string>("#000000"); // Color input específico
  const [backgroundInput, setBackgroundInput] = useState<string>("#FFFFFF"); // Background input específico
  const [colors, setColors] = useState<{ color: string; backgroundColor: string }>({
    color: "#000000",
    backgroundColor: "#ffffff"
  });

  const convertColorToHex = (colorName: string) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return colors.color;

    ctx.fillStyle = colorName.replace(/\s+/g, '');
    const hexColor = ctx.fillStyle;
    return hexColor.startsWith("#") ? hexColor : colors.color;
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const colorName = e.target.value.trim().toLowerCase();
    if (activeButton === 'Texto') {
      setColorInput(colorName); // Cambia solo el valor del color de texto
      const hex = convertColorToHex(colorName);
      setColors(prev => ({
        ...prev,
        color: hex
      }));
      handleColor(hex, colors.backgroundColor);
    } else {
      setBackgroundInput(colorName); // Cambia solo el valor del color de fondo
      const hex = convertColorToHex(colorName);
      setColors(prev => ({
        ...prev,
        backgroundColor: hex
      }));
      handleColor(colors.color, hex);
    }
  };

  const handleClickDefaultColor = (color: string) => {
    const hex = convertColorToHex(color); // Convertir el color seleccionado a HEX
    if (activeButton === 'Texto') {
      setColorInput(color); // Actualizar el valor del input de texto
      setColors(prev => ({ ...prev, color: hex })); // Actualizar el color de texto
      handleColor(hex, colors.backgroundColor); // Pasar color de texto y fondo
    } else {
      setBackgroundInput(color); // Actualizar el valor del input de fondo
      setColors(prev => ({ ...prev, backgroundColor: hex })); // Actualizar el color de fondo
      handleColor(colors.color, hex); // Pasar color de texto y fondo
    }
  };

  return (
    <div className="top-full z-50 absolute left-1/2 border pt-1 border-gray-300 rounded-2xl -translate-x-1/2 mt-1 bg-white w-[250px]">
      <div className="flex items-center border-b pt-1 border-gray-300">
        <div className="relative group w-full pb-1">
          <Button
            name="Texto"
            fontSize="sm"
            className={`w-full ${activeButton === 'Texto' ? 'active' : ''}`}
            onClick={() => setActiveButton('Texto')}
          />
          <div className={`absolute ${activeButton === "Texto" ? 'bg-primary' : 'bg-transparent'} left-1/2 bottom-0 -translate-x-1/2 rounded-t-lg w-2/3 h-[2.5px] group-hover:bg-graying`} />
        </div>
        <div className="relative group w-full pb-1">
          <Button
            name="Fondo"
            fontSize="sm"
            className={`w-full ${activeButton === 'Fondo' ? 'active' : ''}`}
            onClick={() => setActiveButton('Fondo')}
          />
          <div className={`absolute ${activeButton === "Fondo" ? 'bg-primary' : 'bg-transparent'} left-1/2 bottom-0 -translate-x-1/2 rounded-t-lg w-2/3 h-[2.5px] group-hover:bg-graying`} />
        </div>
      </div>

      <PhotoshopPicker
        styles={{
          default: {
            picker: { width: "100%", height: "225px", border: "none", boxShadow: "none", },
            controls: { display: "none" },
            head: { display: "none" },
            hue: {
              width: "30px",
              borderRadius: "50px",
              overflow: "hidden",
              border: "none",
              height: "200px"
            },
            body: {
              height: "225px",
              backgroundColor: "#fff",
              paddingBottom: "10px",
              width: "100%",
              border: "none",
              boxShadow: "none",
            },
            saturation: { border: '1px solid #d1d5db', borderRadius: "10px", height: "200px" },
          },
        }}
        color={activeButton === 'Texto' ? colors.color : colors.backgroundColor}
        onChange={({ hex }, e) => {
          e.preventDefault();
          if (activeButton === 'Texto') {
            setColors(prev => ({ ...prev, color: hex }));
            handleColor(hex, colors.backgroundColor);
          } else {
            setColors(prev => ({ ...prev, backgroundColor: hex }));
            handleColor(colors.color, hex);
          }
        }}
      />

      <FieldInputWithElement
        className="mx-4"
        placeholder={activeButton === 'Texto' ? colorInput : backgroundInput} // Establece el placeholder según el botón activo
        value={activeButton === 'Texto' ? colorInput : backgroundInput} // Establece el valor según el botón activo
        onChange={(e) => { handleColorChange(e); e.preventDefault(); e.stopPropagation(); }}
        appendChild={<div className="h-6 w-7 rounded-md" style={{ backgroundColor: activeButton === 'Texto' ? colors.color : colors.backgroundColor }} />}
      />

      <div className="grid grid-cols-7 gap-2 mt-3 p-2 bg-[#f7f7f7] border-t border-gray-300">
        {COLORS_PICKERS.slice(0, 7).map((color, index) => (
          <button
            type="button"
            onClick={() => handleClickDefaultColor(color)}
            key={index}
            className="size-7 rounded-md border"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2 p-2 rounded-b-2xl bg-[#f7f7f7] border-t border-gray-300">
        {COLORS_PICKERS.slice(7).map((color, index) => (
          <button
            type="button"
            onClick={() => handleClickDefaultColor(color)}
            key={index}
            className="size-7 rounded-md border"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  );
}
