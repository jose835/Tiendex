interface Props {
  name: string;
  className?: string;
  appendIcon?: JSX.Element,
  onClick?: () => void;
}

export default function ButtonWithElement({ name, className, appendIcon, onClick }: Props) {
  return (
    <button onClick={onClick}
      className={`px-3 py-2 font-semibold inline-flex items-center ${className} rounded-lg text-xs`}>
      {appendIcon}
      {name}
    </button>
  )
}
