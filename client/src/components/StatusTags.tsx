interface Props {
  name: string;
  color: string;
  textColor: string;
}

export default function StatusTags({ name, color, textColor }: Props) {
  return (
    <span style={{ backgroundColor: color, color: textColor }} className='text-xs font-semibold py-1 px-2 rounded-md'>{name}</span>
  )
}
