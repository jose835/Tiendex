import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import FieldInputWithElement from '../../../components/forms/FieldInputWithElement';
import { Down, UploadImg } from '../../../icons/icons';
import CheckBox from '../../../components/forms/CheckBox';
import { CombinationProps, Option } from '../../../types/types';
import ToolTip from '../../../components/forms/ToolTip';
import OptionRowTable from './OptionRowTable';

interface Props {
  variantIndex: number;
  combination: CombinationProps;
  setCombinations: Dispatch<SetStateAction<CombinationProps[]>>;
  expandedAll: boolean;
  handleOptionValueVariantChange: (type: 'price' | 'quantity', variantIndex: number, newValue: string) => void;
  handleOptionValueChange: (type: 'price' | 'quantity', variantIndex: number, optionIndex: number, newValue: string) => void;
  calculateTotalQuantity: (option: Option[]) => number;
}

export default function VariantRowTable({
  variantIndex,
  expandedAll,
  combination,
  calculateTotalQuantity,
  handleOptionValueChange,
  handleOptionValueVariantChange,
  setCombinations
}: Props) {
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [focused, setFocused] = useState<number | null>(null);

  useEffect(() => {
    if (expandedAll) {
      setExpandedRows([variantIndex]);
    } else {
      setExpandedRows([]);
    }
  }, [expandedAll, variantIndex]);

  const toggleRow = (index: number) => {
    setExpandedRows(prev =>
      prev.includes(index) ? prev.filter(row => row !== index) : [...prev, index]
    );
  };

  const getMinMaxPrice = (options: Option[]): string => {
    if (options.length === 0) return "";

    const prices = options.map(option => Number(option.price || 0));
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    return minPrice === maxPrice ? `${minPrice}` : `${minPrice} - ${maxPrice}`;
  };

  function handleAllCheckboxChange(value: boolean) {
    const updatedOptions = combination.options.map(option => ({
      ...option,
      isChecked: value,
    }));

    setCombinations(prevCombinations => {
      return prevCombinations.map((item, idx) => {
        if (idx === variantIndex) {
          return {
            ...item,
            options: updatedOptions,
            isChecked: value,
          };
        }
        return item;
      });
    });
  }

  function handleChangeEliminated(value: boolean) {
    setCombinations(prevCombinations => {
      const updatedCombinations = [...prevCombinations];
      updatedCombinations[variantIndex].variantIsEliminated = value;
      return updatedCombinations;
    });
  }

  return (
    <>
      <tr role='button' onClick={() => toggleRow(variantIndex)} className={`${combination.variantIsEliminated ? 'bg-whiting2' : 'bg-white'} ${!combination.visible && 'hidden'} [&>th]:font-medium [&>th]:text-primary border-b cursor-pointer hover:bg-whiting2 hover:border-gray-300`}>
        <td className="pl-4 w-2">
          <div role='button' onClick={(e) => e.stopPropagation()} className="flex items-center">
            <CheckBox disabled={combination.variantIsEliminated} onChange={handleAllCheckboxChange} initialValue={combination.options.length > 0 ? combination.options.every(option => option.isChecked) : combination.isChecked} />
          </div>
        </td>
        <td className="px-4 w-[40%] py-2">
          <div className='flex items-center space-x-4 font-medium'>
            <div onClick={(e) => e.stopPropagation()} className='size-16 flex items-center justify-center text-blueprimary rounded-md border border-dashed border-gray-300 group-hover:border-gray-300 cursor-pointer'>
              <UploadImg />
            </div>
            <div className='flex flex-col'>
              <span className='text-secondary/90 text-sm font-semibold'>{combination.optionName}</span>
              {combination.options.length > 0 ? (
                <div className='flex items-center space-x-1'>
                  <span className='text-secondary/80 font-medium'>{combination.options.filter(option => option.visible && !option.isEliminated).length} variante{combination.options.length > 1 ? 's' : ''}</span>
                  <Down className='text-secondary/80 size-4' />
                </div>
              ) : (
                <span className='text-secondary/80 text-xs font-medium'>{combination.variantSku}</span>
              )}
            </div>
          </div>
        </td>
        <td className="py-2">
          {!combination.variantIsEliminated &&
            <div data-tooltip-id={`price - ${variantIndex}`} onClick={(e) => e.stopPropagation()}>
              <FieldInputWithElement
                isNumber
                onFocus={() => setFocused(variantIndex)}
                onBlur={() => setFocused(null)}
                onChange={(e) => handleOptionValueVariantChange('price', variantIndex, e.target.value)}
                appendChild={<span className='text-secondary/80 font-medium'>C$</span>}
                placeholder='0.00'
                value={
                  focused === variantIndex
                    ? getMinMaxPrice(combination.options) !== '0'
                      ? getMinMaxPrice(combination.options).includes('-')
                        ? ''
                        : Number(combination.variantPrice).toString()
                      : Number(combination.variantPrice).toString()
                    : combination.options.length > 0 ? getMinMaxPrice(combination.options) : Number(combination.variantPrice).toString()
                }
                className='h-full'
              />
              {combination.options.length > 0 && <ToolTip id={`price - ${variantIndex}`} title={`Se aplica a las ${combination.options.length} ${combination.options.length > 1 ? 'variantes' : 'variante'}`} />}
            </div>
          }
        </td>
        <td className="p-2 w-32 relative">
          {!combination.variantIsEliminated ? (
            <div data-tooltip-id={`quantity - ${variantIndex}`} onClick={(e) => e.stopPropagation()}>
              <FieldInputWithElement
                value={combination.options.length > 0 ? calculateTotalQuantity(combination.options).toString() : Number(combination.variantQuantity).toString()}
                placeholder='0'
                onChange={(e) => handleOptionValueVariantChange('quantity', variantIndex, e.target.value)}
                className='h-full'
                disabled={combination.options.length > 0}
              />
              {combination.options.length > 0 && <ToolTip id={`quantity - ${variantIndex}`} title='Actualización solo para variantes individuales' />}
            </div>
          ) : (
            <div className="absolute left-auto space-x-3 right-3 w-96 h-full top-1/3 text-right">
              <span className='font-medium text-[13px] text-secondary'>Esta variante no se creará</span>
              <span onClick={() => handleChangeEliminated(false)} className="text-blueprimary hover:underline hover:to-bluesecondary font-medium ml-2">Deshacer</span>
            </div>

          )}
        </td>
      </tr >
      {
        expandedRows.includes(variantIndex) && combination.options.map((option, optionIndex) => (
          <OptionRowTable
            setCombinations={setCombinations}
            key={optionIndex}
            handleOptionValueChange={handleOptionValueChange}
            option={option}
            optionIndex={optionIndex}
            variantIndex={variantIndex}
          />
        ))
      }
    </>
  );
}
