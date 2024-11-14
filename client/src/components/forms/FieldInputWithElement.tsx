import { useState, ChangeEvent, useEffect } from 'react';
import { allowNumber } from '../../utils/function';

interface Props {
  name?: string;
  placeholder?: string;
  id?: string;
  className?: string;
  prependChild?: JSX.Element;
  appendChild?: JSX.Element;
  isNumber?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  disabled?: boolean;
  autofocus?: boolean;
  required?: boolean;
  readonly?: boolean;
  onFocus?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function FieldInputWithElement({
  name,
  placeholder,
  id,
  className = "mb-5",
  prependChild,
  appendChild,
  onFocus,
  onBlur,
  isNumber = false,
  autofocus,
  disabled,
  required = true,
  value,
  onChange,
  readonly = false
}: Props) {
  const [inputValue, setInputValue] = useState<string>(value?.toString() || '');
  const [isFocused, setIsFocused] = useState(false);

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

  function handleFocus(e: ChangeEvent<HTMLInputElement>) {
    setIsFocused(true);
    if (onFocus) {
      onFocus(e);
    }
  }

  function handleBlur(e: ChangeEvent<HTMLInputElement>) {
    setIsFocused(false);
    if (onBlur) {
      onBlur(e);
    }
  }

  return (
    <div className={`${className}`}>
      {name && <label htmlFor={id} className="block mb-2 text-sm font-medium text-primary">{name}</label>}
      <div
        aria-disabled={disabled}
        className={`border rounded-lg flex justify-between items-center px-3 py-1 h-9 w-full ${isFocused ? 'border-blue-500' : !disabled && 'border-gray-400'} ${disabled ? 'bg-gray-100' : 'bg-gray-50'}`}
      >
        <div className='flex items-center space-x-2 w-full'>
          {appendChild}
          <input
            id={id}
            className={`outline-none text-sm font-medium w-full h-full ${disabled ? 'bg-gray-100' : 'bg-gray-50 text-primary placeholder-primary'}`}
            placeholder={placeholder}
            required={required}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChangeInput}
            value={inputValue}
            autoFocus={autofocus}
            readOnly={readonly}
            disabled={disabled}
          />
        </div>
        {prependChild}
      </div>
    </div>
  );
}
