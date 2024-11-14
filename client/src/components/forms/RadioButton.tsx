import ToolTip from "./ToolTip";

interface Props {
  name: string;
  active?: boolean;
}

export default function RadioButton({ name, active = false }: Props) {
  return (
    <div className={`flex items-center rounded-sm py-2 ${!active && 'hover:bg-[#f7f7f7]'}`}>
      <div data-tooltip-id="done" className={`size-6 rounded-full border-dashed hover:border-solid cursor-pointer border-graying border-[2px]`} />
      <span className="text-sm font-bold ml-4">{name}</span>

      <ToolTip title="Marcar como hecho" id="done" />
    </div>
  )
}
