interface Props {
  name?: string;
  active?: boolean;
  className?: string;
  classNameOption?: string;
  onChange?: (value: boolean) => void;
}

export default function RadioButtonFill({ active = false, className, classNameOption }: Props) {
  return (
    <div className={`border border-secondary ${active && 'bg-secondary'} rounded-full  ${className} flex items-center justify-center`}>
      {active && <div className={`rounded-full bg-white ${classNameOption}`} />}
    </div>
  )
}
