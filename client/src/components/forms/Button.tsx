import { MouseEvent } from "react";

interface Props {
  name?: string;
  className?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  style?: 'primary' | 'secondary' | 'none';
  fontSize?: string;
}

export default function Button({
  style = 'none',
  name,
  className,
  onClick,
  type = "button",
  disabled = false,
  fontSize = "xs"
}: Props) {
  return (
    <button
      type={type}
      onClick={(e) => onClick?.(e)} // ✅ Corrección aquí
      disabled={disabled}
      className={`px-3 py-2 cursor-pointer font-semibold rounded-lg ${style === 'secondary'
        ? 'bg-gradient-primary-base active:bg-[#1a1a1a] hover:bg-[#1a1a1a] text-white shadow-button-primary active:shadow-button-primary-pressed bg-gradient-primary'
        : style === 'primary'
          ? 'shadow-default active:shadow-pressed'
          : ''
        } ${className} text-${fontSize}`}
    >
      {name}
    </button>
  );
}
