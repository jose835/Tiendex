interface Props {
  name: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  style?: 'primary' | 'secondary' | 'none';
}

export default function Button({ style = 'none', name, className, onClick, type = "button", disabled = false }: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-3 py-2 cursor-pointer font-semibold ${style === 'secondary' ? 'bg-gradient-primary-base active:bg-[#1a1a1a] hover:bg-[#1a1a1a] text-white shadow-button-primary active:shadow-button-primary-pressed bg-gradient-primary' : style === 'primary' ? 'shadow-default active:shadow-pressed' : ''} ${className} rounded-lg text-xs`}
    >
      {name}
    </button>
  );
}

