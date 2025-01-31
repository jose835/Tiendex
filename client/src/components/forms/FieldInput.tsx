
import { useState, useEffect, ChangeEvent } from 'react';
import { allowNumber } from '../../utils/function';

interface Props {
  name?: string;
  placeholder?: string;
  id?: string;
  className?: string;
  onFocus?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
  isNumber?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  disabled?: boolean;
  autofocus?: boolean;
  required?: boolean;
  readonly?: boolean;
}

export default function FieldInput({
  name,
  placeholder,
  id,
  className = "mb-5",
  isNumber = false,
  autofocus,
  disabled,
  required = false,
  value,
  onChange,
  readonly = false,
  onFocus,
  onBlur
}: Props) {
  const [inputValue, setInputValue] = useState<string>(value?.toString() || '');

  useEffect(() => {
    setInputValue(value?.toString() || '');
  }, [value]);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (isNumber) {
      allowNumber(e);
    }

    const newValue = e.target.value;
    setInputValue(newValue);

    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className={`${className}`}>
      {name && <label htmlFor={id} className="block mb-2 text-sm font-medium text-primary">{name}</label>}
      <input
        onFocus={onFocus}
        onBlur={onBlur}
        id={id}
        className={`h-9 ${disabled ? 'border-0 bg-gray-100' : 'border bg-gray-50 text-primary placeholder-secondary/80'} outline-none border border-gray-400 text-sm font-medium rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-1`}
        placeholder={placeholder}
        required={required}
        onChange={handleChangeInput}
        value={inputValue}
        autoFocus={autofocus}
        readOnly={readonly}
        disabled={disabled}
      />
    </div>
  );
}
