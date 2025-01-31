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

  function handleChangeEliminated(value: boolean) {
    setCombinations(prevCombinations => {
      const updatedCombinations = [...prevCombinations];

      if (updatedCombinations[variantIndex] && updatedCombinations[variantIndex].options[optionIndex]) {
        updatedCombinations[variantIndex].options[optionIndex].isEliminated = value;
      }

      return updatedCombinations;
    });
  }

  return (
    <tr key={optionIndex} className={`${option.isEliminated ? 'bg-whiting2' : 'bg-white'} ${!option.visible && 'hidden'} [&>th]:font-medium [&>th]:text-primary border-b border-gray-300 cursor-pointer hover:bg-whiting2`}>
      <td />
      <td className="px-4 py-2">
        <div className='flex items-center space-x-2'>
          <CheckBox disabled={option.isEliminated} onChange={handleCheckboxChange} initialValue={option.isChecked} />
          <div className='flex items-center space-x-3 font-medium'>
            <div className='size-12 flex items-center justify-center text-blueprimary rounded-md border border-dashed border-gray-300 group-hover:border-gray-300 cursor-pointer'>
              <UploadImg />
            </div>
            <div className='flex flex-col'>
              <span className={`text-secondary ${option.isEliminated && 'line-through decoration-secondary/80'} text-[13px] font-medium`}>{option.name}</span>
              {option.sku && <span className={`text-secondary ${option.isEliminated && 'line-through decoration-secondary/80'} text-xs font-medium`}>{option.sku}</span>}
            </div>
          </div>
        </div>
      </td>
      <td className="py-2">
        {!option.isEliminated &&
          <FieldInputWithElement
            isNumber
            appendChild={<span>C$</span>}
            placeholder='0.00'
            value={Number(option.price).toString()}
            onChange={(e) => handleOptionValueChange('price', variantIndex, optionIndex, e.target.value)}
            className='h-full'
          />
        }
      </td>
      <td className="p-2 w-32 relative">
        {!option.isEliminated ? (
          <FieldInputWithElement
            isNumber
            placeholder='0'
            className='h-full'
            value={Number(option.quantity).toString()}
            onChange={(e) => handleOptionValueChange('quantity', variantIndex, optionIndex, e.target.value)}
          />
        ) : (
          <div className="absolute left-auto space-x-3 right-3 w-96 h-full top-1/3 text-right">
            <span className='font-medium text-[13px] text-secondary'>Esta variante no se creará</span>
            <span onClick={() => handleChangeEliminated(false)} className="text-blueprimary hover:underline hover:to-bluesecondary font-medium ml-2">Deshacer</span>
          </div>

        )}
      </td>
    </tr>
  )
}
