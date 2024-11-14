import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import DropDown from '../../../components/DropDown';
import { CombinationProps, Variant } from '../../../types/types';
import { Check, Filter, Search } from '../../../icons/icons';
import ToolTip from '../../../components/forms/ToolTip';
import Button from '../../../components/forms/Button';
import FieldInputWithElement from '../../../components/forms/FieldInputWithElement';
import OptionFilters from './OptionFilters';

interface Props {
  variants: Variant[];
  setCombinations: Dispatch<SetStateAction<CombinationProps[]>>;
}

export default function VariantFilters({ variants, setCombinations }: Props) {
  const [selectedVariant, setSelectedVariant] = useState<Variant>(variants[0]);
  const [isShowFilter, setIsShowFilter] = useState<boolean>(false);
  const [textSearch, setTextSearch] = useState<string>('');

  const applyFilter = useCallback((filterText: string) => {
    setCombinations((prevCombinations) => {
      return prevCombinations.map((combination) => {
        const matchOptionName = combination.optionName.toLowerCase().includes(filterText.toLowerCase());
        const matchOption = combination.options.some(option => option.name.toLowerCase().includes(filterText.toLowerCase()));

        if (matchOptionName) {
          return {
            ...combination,
            visible: true,
            options: combination.options.map(option => ({ ...option, visible: true })),
          };
        } else if (matchOption) {
          return {
            ...combination,
            visible: true,
            options: combination.options.map(option => ({
              ...option,
              visible: option.name.toLowerCase().includes(filterText.toLowerCase()),
            })),
          };
        } else {
          return {
            ...combination,
            visible: false,
            options: combination.options.map(option => ({ ...option, visible: false })),
          };
        }
      });
    });
  }, [setCombinations]);

  const resetVisibility = useCallback(() => {
    setCombinations((prevCombinations) =>
      prevCombinations.map((combination) => ({
        ...combination,
        visible: true,
        options: combination.options.map(option => ({
          ...option,
          visible: true
        })),
      }))
    );
  }, [setCombinations]);

  useEffect(() => {
    if (textSearch) {
      applyFilter(textSearch);
    } else {
      resetVisibility();
    }
  }, [textSearch, applyFilter, resetVisibility]);


  useEffect(() => {
    if (textSearch) {
      applyFilter(textSearch);
    } else {
      resetVisibility();
    }
  }, [textSearch, applyFilter, resetVisibility]);

  return (
    <section className='px-4'>
      <div className='flex items-center justify-between mb-2'>
        <div>
          {selectedVariant && variants.length > 1 &&
            <div className='space-x-2 flex items-center'>
              <span className='font-medium text-[13px] text-secondary/80'>Agrupar por</span>
              <DropDown
                className='bg-transparent border border-gray-300'
                name={selectedVariant.name}
                options={variants.map((variant, index) => (
                  <li
                    key={index}
                    className={`flex items-center p-2 rounded-md ${selectedVariant.id === variant.id ? 'bg-whiting2' : 'hover:bg-gray-100'} `}
                  >
                    <button type='button' onClick={() => setSelectedVariant(variant)} className='flex w-full items-center justify-between' key={variant.id}>
                      <span className='cursor-pointer'>{variant.name}</span>
                      {selectedVariant.id === variant.id && <Check className='text-primary ml-3 size-4' />}
                    </button>
                  </li>
                ))}
              />
            </div>
          }
        </div>
        {!isShowFilter ? (
          <button onClick={() => setIsShowFilter(true)} type='button' data-tooltip-id="search" className='bg-white hover:bg-[#F7F7F7] text-secondary/80 cursor-pointer shadow-md border border-gray-300 h-7 px-1.5 ml-1 flex items-center justify-center rounded-md'>
            <Search size={20} />
            <Filter />
            <ToolTip id="search" title="Buscar y filtrar (F)" />
          </button>
        ) : (
          <Button onClick={() => { setTextSearch(''); setIsShowFilter(false); }} name='Cancelar' />
        )}
      </div>

      <div className={`transition-all duration-300 ease-in-out ${isShowFilter ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
        <FieldInputWithElement
          className="mb-3"
          appendChild={<Search size={20} />}
          placeholder="Buscar"
          value={textSearch}
          onChange={(e) => setTextSearch(e.target.value)}
        />
        <OptionFilters
          setSelectedVariant={setSelectedVariant}
          setCombinations={setCombinations}
          variants={variants}
        />
      </div>

    </section>
  );
}
