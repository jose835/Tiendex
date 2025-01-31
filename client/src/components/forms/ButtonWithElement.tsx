interface Props {
  name?: string;
  className?: string;
  appendIcon?: JSX.Element,
  onClick?: () => void;
  style?: 'primary' | 'secondary' | 'none';
}

export default function ButtonWithElement({ style, name, className, appendIcon, onClick }: Props) {
  return (
    <button type="button" onClick={onClick}
      className={`font-semibold ${style === 'secondary' ? 'bg-gradient-primary-base active:bg-[#1a1a1a] hover:bg-[#1a1a1a] text-white shadow-button-primary active:shadow-button-primary-pressed bg-gradient-primary' : style === 'primary' ? 'shadow-default active:shadow-pressed' : ''} inline-flex items-center rounded-lg text-xs ${className}`}>
      {appendIcon}
      {name}
    </button>
  )
}
