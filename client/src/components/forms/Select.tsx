import SelectSearch, { SingleValue, StylesConfig } from 'react-select';
import { COLORS } from '../../constants/constants';

interface CategoryOption {
  label: string;
  value: string;
}

interface Props {
  value: CategoryOption[];
  name?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

export default function Select({ value, name, placeholder, onChange }: Props) {
  const customStyles: StylesConfig<CategoryOption, false> = {
    option: (provided) => ({
      ...provided,
      fontWeight: '500',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: COLORS.primary,
    }),
    placeholder: (provided) => ({
      ...provided,
      color: COLORS.primary,
    }),
  };

  function handleChange(e: SingleValue<CategoryOption>) {
    if (!onChange) return;
    onChange(e?.value ?? '');
  }

  return (
    <div className='mt-2'>
      {name && <label htmlFor='category' className="block mb-2 text-sm font-medium text-primary">{name}</label>}
      <SelectSearch
        className='text-sm font-medium'
        styles={customStyles}
        placeholder={placeholder}
        id='category'
        options={value}
        menuPlacement="auto"
        menuPosition='fixed'
        onChange={handleChange}
      />
    </div>
  )
}
