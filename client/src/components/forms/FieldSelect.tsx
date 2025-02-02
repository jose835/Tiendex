import { SelectOptions } from "../../types/types";


interface Props {
  name?: string;
  id?: string;
  options: SelectOptions[];
  value?: string | number;
  className?: string;
  disabled?: boolean;
  onChange?: (value: string | number) => void;
  onChangeValue?: (value: string | number, name: string) => void;
}

export default function FieldSelect({
  name,
  id,
  options,
  value,
  className = '',
  onChange,
  onChangeValue,
  disabled = false,
}: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;

    if (onChangeValue) {
      const selectedIndex = event.target.selectedIndex;
      const selectedName = event.target.options[selectedIndex].text;

      onChangeValue(selectedValue, selectedName);
    }
    if (onChange) {
      onChange(selectedValue);
    }
  };

  return (
    <div className={className}>
      {name &&
        <label htmlFor={id} className="block mb-2 text-sm font-medium text-primary">
          {name}
        </label>
      }

      <select
        id={id}
        value={value}
        className="bg-gray-50 text-[13px] px-2 border h-9 outline-none border-gray-400 text-primary  font-medium rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
        onChange={handleChange}
        disabled={disabled}
      >
        {options.map(({ name, value }, index) => (
          <option value={value} className="text-sm font-medium text-secondary" key={index}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}
