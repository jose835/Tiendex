interface Props {
  name?: string;
  active?: boolean;
  className?: string;
  classNameOption?: string;
  onClick?: () => void;
}

export default function RadioButtonFill({ onClick, name, active = false, className, classNameOption }: Props) {
  return (
    <div onClick={onClick} className="flex cursor-pointer items-center space-x-3">
      <div className={`border border-secondary ${active && 'bg-secondary'} rounded-full  ${className} flex items-center justify-center`}>
        {active && <div className={`rounded-full bg-white ${classNameOption}`} />}
      </div >
      {name && <span className={`font-medium text-secondary text-sm`}>{name}</span>}
    </div>
  )
}
