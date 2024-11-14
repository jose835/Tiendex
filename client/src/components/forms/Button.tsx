interface Props {
  name: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

export default function Button({ name, className, onClick, type = "button", disabled = false }: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-3 py-2 font-semibold border border-gray-300 shadow-md ${className} rounded-lg text-xs`}
    >
      {name}
    </button>
  );
}

