import { AumentBeleeding, CancelIcon, DecreaseBleeding, Down, ListNumberIcon, TableIcon, VignetteIcon } from "../icons/icons"
import ToolTip from "./forms/ToolTip"

export default function MarkDownOptions() {
  return (
    <div className="absolute top-full left-0 mt-1 border border-gray-300 -translate-x-1/2  bg-white shadow-lg rounded-xl p-2 flex space-x-[0.5px]">
      <button data-tooltip-id="vignette" type="button" className="rounded-md hover:bg-[#e3e3e3] p-1">
        <VignetteIcon />
      </button>
      <button data-tooltip-id="number-list" type="button" className="rounded-md hover:bg-[#e3e3e3] p-1">
        <ListNumberIcon />
      </button>
      <button data-tooltip-id="decrease-bleeding" type="button" className="rounded-md hover:bg-[#e3e3e3] px-2 py-1">
        <DecreaseBleeding />
      </button>
      <button data-tooltip-id="increment-bleeding" type="button" className="rounded-md hover:bg-[#e3e3e3] px-2 py-1">
        <AumentBeleeding />
      </button>
      <div className="flex items-center space-x-1">
        <button
          data-tooltip-id="table"
          type="button"
          className="rounded-md hover:bg-[#e3e3e3] px-1.5 py-1 flex items-center"
        >
          <TableIcon />
          <Down className="size-4 stroke-[2.5px]" />
        </button>
        <div className="h-5 w-[0.2px] bg-gray-300" />
        <button
          data-tooltip-id="delete-format"
          type="button"
          className="rounded-md hover:bg-[#e3e3e3] p-1"
        >
          <CancelIcon />
        </button>
      </div>
      <ToolTip id="vignette" title="Viñeta" />
      <ToolTip id="number-list" title="Lista numerada" />
      <ToolTip id="decrease-bleeding" title="Eliminar sangria" />
      <ToolTip id="increment-bleeding" title="Agregar sangria" />
      <ToolTip id="table" title="Insertar tabla" />
      <ToolTip id="delete-format" title="Eliminar formato" />
    </div>
  )
}
