import { useState, useEffect } from "react";
import { Check } from "../../icons/icons";

interface Props {
  name?: string;
  onChange?: (value: boolean) => void;
  initialValue?: boolean;
  className?: string;
  disabled?: boolean;
}

export default function CheckBox({ name, disabled = false, onChange, initialValue = false, className }: Props) {
  const [value, setValue] = useState<boolean>(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const changeValue = () => {
    const newValue = !value;
    setValue(newValue);
    if (!onChange) return;
    onChange(newValue);
  };

  return (
    <div className={`flex items-center ${className}`}>
      <button
        disabled={disabled}
        type="button"
        onClick={changeValue}
        className={`size-5 ${value ? 'bg-primary' : 'bg-white'} disabled:bg-[#f7f7f7] border disabled:border-0 border-gray-500 flex items-center justify-center rounded-md transition-colors duration-200`}
      >
        {value && <Check className="text-white" />}
      </button>
      {name && <span className={`font-medium text-secondary text-sm ml-3`}>{name}</span>}
    </div>
  );
}
