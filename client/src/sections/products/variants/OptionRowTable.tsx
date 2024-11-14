import CheckBox from '../../../components/forms/CheckBox';
import { UploadImg } from '../../../icons/icons';
import FieldInputWithElement from '../../../components/forms/FieldInputWithElement';
import { CombinationProps, Option } from '../../../types/types';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  optionIndex: number;
  option: Option;
  variantIndex: number;
  setCombinations: Dispatch<SetStateAction<CombinationProps[]>>;
  handleOptionValueChange: (type: 'price' | 'quantity', variantIndex: number, optionIndex: number, newValue: string) => void;
}

export default function OptionRowTable({ optionIndex, option, setCombinations, variantIndex, handleOptionValueChange }: Props) {

  function handleCheckboxChange(value: boolean) {
    setCombinations(prevCombinations => {
      const updatedCombinations = [...prevCombinations];

      if (optionIndex !== undefined) {
        updatedCombinations[variantIndex].options[optionIndex].isChecked = value;

        const allChecked = updatedCombinations[variantIndex].options.every(option => option.isChecked);

        updatedCombinations[variantIndex].isChecked = allChecked;
      }

      return updatedCombinations;
    });
  }


  return (
    <tr key={optionIndex} className={`bg-white ${!option.visible && 'hidden'} [&>th]:font-medium [&>th]:text-primary border-b cursor-pointer hover:bg-whiting2 hover:border-gray-300`}>
      <td />
      <td className="px-4 py-2">
        <div className='flex items-center space-x-2'>
          <CheckBox onChange={handleCheckboxChange} initialValue={option.isChecked} />
          <div className='flex items-center space-x-3 font-medium'>
            <div className='size-12 flex items-center justify-center text-blueprimary rounded-md border border-dashed border-gray-300 group-hover:border-gray-300 cursor-pointer'>
              <UploadImg />
            </div>
            <div className='flex flex-col'>
              <span className='text-secondary text-[13px] font-medium'>{option.name}</span>
              {option.sku && <span className='text-secondary text-xs font-medium'>{option.sku}</span>}
            </div>
          </div>
        </div>
      </td>
      <td className="py-2">
        <FieldInputWithElement
          isNumber
          appendChild={<span>C$</span>}
          placeholder='0.00'
          value={Number(option.price).toString()}
          onChange={(e) => handleOptionValueChange('price', variantIndex, optionIndex, e.target.value)}
          className='h-full'
        />
      </td>
      <td className="p-2 w-32">
        <FieldInputWithElement
          isNumber
          placeholder='0'
          className='h-full'
          value={Number(option.quantity).toString()}
          onChange={(e) => handleOptionValueChange('quantity', variantIndex, optionIndex, e.target.value)}
        />
      </td>
    </tr>
  )
}
