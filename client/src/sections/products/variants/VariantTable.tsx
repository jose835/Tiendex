import { useEffect, useState, useCallback, useRef, Dispatch, SetStateAction } from 'react';
import { Variant, CombinationProps, Option } from '../../../types/types';
import VariantRowTable from './VariantRowTable';
import VariantFilters from './VariantFilters';
import TableHeader from './TableHeader';
import VariantDropDown from './VariantDropDown';
import { Search } from '../../../icons/icons';

interface Props {
  variants: Variant[];
  combinations: CombinationProps[];
  setVariants: Dispatch<SetStateAction<Variant[]>>;
  setCombinations: Dispatch<SetStateAction<CombinationProps[]>>;
}

export default function VariantTable({ combinations, setCombinations, variants, setVariants }: Props) {
  const [expandedAll, setExpandedAll] = useState<boolean>(false);
  const [isShowDropDown, setIsShowDropDown] = useState<boolean>(false);
  const combinationRef = useRef<CombinationProps[]>([]);

  const getCombinations = useCallback((prevCombinations: CombinationProps[]): CombinationProps[] => {
    const firstVariant = variants[0];
    const firstVariantOptions = firstVariant.options.filter(option => option.name.trim() !== '');
    const otherVariants = variants.slice(1);
    const combinations: CombinationProps[] = [];

    for (const option of firstVariantOptions) {
      const optionsArray = otherVariants.map(variant =>
        variant.options.filter(opt => opt.name.trim() !== '')
      );

      const groupedOptions: Option[][] = [];
      const combine = (prefix: Option[], arrays: Option[][]) => {
        if (arrays.length === 0) {
          return;
        }

        for (const opt of arrays[0]) {
          const newPrefix = [...prefix, opt];
          if (arrays.length === 1) {
            groupedOptions.push(newPrefix);
          } else {
            combine(newPrefix, arrays.slice(1));
          }
        }
      };

      combine([], optionsArray);

      const existingCombination = prevCombinations.find(
        comb => comb.variantName === firstVariant.name && comb.optionName === option.name
      );

      if (!existingCombination?.variantIsEliminated) {
        combinations.push({
          variantName: firstVariant.name,
          optionName: option.name,
          visible: true,
          variantBarCode: existingCombination ? existingCombination.variantBarCode : '',
          variantIsEliminated: existingCombination ? existingCombination.variantIsEliminated : false,
          variantSku: existingCombination ? existingCombination.variantSku : '',
          variantWeight: existingCombination ? existingCombination.variantWeight : '',
          variantCountry: existingCombination ? existingCombination.variantCountry : '',
          isChecked: existingCombination ? existingCombination.options.length > 0 ? existingCombination.options.every(option => option.isChecked) : existingCombination.isChecked : false,
          variantSellingOutStock: existingCombination ? existingCombination.variantSellingOutStock : false,
          variantPrice: existingCombination ? existingCombination.variantPrice : firstVariant.price,
          variantQuantity: existingCombination ? existingCombination.variantQuantity : firstVariant.quantity,
          options: groupedOptions.map(combination => {
            const combinedOption: Option = {
              id: combination.find(opt => opt.id)?.id || '',
              name: combination.map(opt => opt.name).join(' / '),
              sku: combination.map(opt => existingCombination ? existingCombination.options.find(o => o.name === opt.name)?.sku || opt.sku : opt.sku).join(','),
              isEliminated: combination.some(opt => existingCombination ? existingCombination.options.find(o => o.name === opt.name)?.isEliminated : opt.isEliminated),
              barCode: combination.map(opt => existingCombination ? existingCombination.options.find(o => o.name === opt.name)?.barCode || opt.barCode : opt.barCode).join(','),
              weight: combination.map(opt => existingCombination ? existingCombination.options.find(o => o.name === opt.name)?.weight || opt.weight : opt.weight).join(','),
              country: combination.map(opt => existingCombination ? existingCombination.options.find(o => o.name === opt.name)?.country || opt.country : opt.country).join(','),
              sellingOutStock: combination.some(opt => existingCombination ? existingCombination.options.find(o => o.name === opt.name)?.sellingOutStock : opt.sellingOutStock),
              price: combination.reduce((total, opt) => total + (existingCombination ? existingCombination.options.find(o => o.name === opt.name)?.price || opt.price : opt.price), 0),
              quantity: Math.min(...combination.map(opt => existingCombination ? existingCombination.options.find(o => o.name === opt.name)?.quantity || opt.quantity : opt.quantity)),
              isChecked: combination.some(opt => existingCombination ? existingCombination.options.find(o => o.name === opt.name)?.isChecked : opt.isChecked),
              visible: true,
            };
            return combinedOption;
          }),
        });
      } else {

        const newVariant = variants
          .map(variant => ({
            ...variant,
            options: variant.options.filter(option => option.name !== existingCombination.optionName),
          })).filter(variant => variant.options.length > 0);

        setVariants(newVariant);
      }
    }

    combinations.forEach((combination) => {
      if (!combination.options[0]) return;

      if (combination.options[0].quantity === 0) {
        combination.options[0].quantity = combination.variantQuantity;
      }

      if (combination.options[0].price === 0) {
        combination.options[0].price = combination.variantPrice;
      }
    });

    return combinations;
  }, [variants, setVariants]);

  useEffect(() => {
    setCombinations(prevCombinations => getCombinations(prevCombinations))

    combinationRef.current = getCombinations(combinationRef.current);
  }, [variants, getCombinations]);

  const handleOptionValueChange = (
    type: 'price' | 'quantity',
    variantIndex: number,
    optionIndex: number,
    newValue: string
  ) => {
    setCombinations(prev => {
      const updatedCombinations = [...prev];
      const newParsedValue = type === 'price' ? parseFloat(newValue) || 0 : parseInt(newValue) || 0;

      if (optionIndex !== undefined) {
        if (type === 'price') {
          updatedCombinations[variantIndex].options[optionIndex].price = newParsedValue;
        } else {
          updatedCombinations[variantIndex].options[optionIndex].quantity = newParsedValue;
          updatedCombinations[variantIndex].variantQuantity = calculateTotalQuantity(updatedCombinations[variantIndex].options);
        }
      } else {
        if (type === 'price') {
          updatedCombinations[variantIndex].variantPrice = newParsedValue;
        } else {
          updatedCombinations[variantIndex].variantQuantity = newParsedValue;
        }
      }

      combinationRef.current = updatedCombinations;


      return updatedCombinations;
    });
  };

  const calculateTotalQuantity = useCallback((options: Option[]) => {
    return options.reduce((total, option) => total + option.quantity, 0);
  }, []);

  function handleOptionValueVariantChange(type: 'price' | 'quantity', variantIndex: number, newValue: string) {
    const newParsedValue = type === 'price' ? parseFloat(newValue) || 0 : parseInt(newValue) || 0;

    setCombinations(prev => {
      const updatedCombinations = [...prev];
      if (type === 'price') {
        updatedCombinations[variantIndex].variantPrice = newParsedValue;

        updatedCombinations[variantIndex].options.forEach((option) => {
          option.price = newParsedValue;
        });
      } else {
        updatedCombinations[variantIndex].variantQuantity = newParsedValue;
      }

      return updatedCombinations;
    });
  }

  const getCheckedCount = () => {
    return combinations.reduce((total, combination) => {
      const combinationCount = combination.isChecked ? 1 : 0;

      const optionsCount = combination.options.reduce((count, option) => {
        return count + (option.isChecked ? 1 : 0);
      }, 0);

      return combination.options.length > 0 ? total + optionsCount : total + combinationCount + optionsCount;
    }, 0);
  };

  const allCombinationsAndOptionsInvisible = combinations.every(combination =>
    !combination.visible && combination.options.every(option => !option.visible)
  );

  return (
    <div className='relative'>
      <VariantFilters variants={variants} setCombinations={setCombinations} />
      <div className="relative overflow-hidden">
        <table className="w-full text-sm text-left">
          {!allCombinationsAndOptionsInvisible && (
            <TableHeader
              allCombinationsAndOptionsInvisible={allCombinationsAndOptionsInvisible}
              setCombinations={setCombinations}
              isShowDropDown={isShowDropDown}
              setIsShowDropDown={setIsShowDropDown}
              combinations={combinations}
              expandedAll={expandedAll}
              setExpandedAll={setExpandedAll}
              getCheckedCount={getCheckedCount}
              variants={variants}
            />
          )}
          <tbody>
            {combinations.length > 0 && !allCombinationsAndOptionsInvisible ? (
              combinations.map((combination, variantIndex) => (
                <VariantRowTable
                  setCombinations={setCombinations}
                  expandedAll={expandedAll}
                  key={variantIndex}
                  combination={combination}
                  calculateTotalQuantity={calculateTotalQuantity}
                  handleOptionValueChange={handleOptionValueChange}
                  handleOptionValueVariantChange={handleOptionValueVariantChange}
                  variantIndex={variantIndex}
                />
              ))
            ) : (
              <tr>
                <td colSpan={5}>
                  <div className="flex mb-8 pt-4 flex-col border-t border-gray-300 items-center">
                    <Search className='size-24 text-graying' />
                    <p className="mt-4 text-xl text-primary font-semibold ">No se encontró ningún recurso de variantes</p>
                    <p className='mt-3 text-sm text-secondary/80 font-medium'>Prueba a cambiar los filtros o el término de búsqueda</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>


        </table>
        <footer className='py-3 bg-whiting2 rounded-b-md  border-t border-gray-300 flex items-center justify-center'>
          <span className='text-sm font-medium text-primary'>{`Inventario total de su tienda: ${variants.length !== 1
            ? calculateTotalQuantity(combinations.map(combination => combination.options).flat())
            : combinations.reduce((total, combination) => total + combination.variantQuantity, 0)} disponibles`}
          </span>
        </footer>
      </div>
      {getCheckedCount() > 0 && isShowDropDown &&
        <VariantDropDown setVariants={setVariants} getCheckedCount={getCheckedCount} combinations={combinations} setIsShowDropDown={setIsShowDropDown} setCombinations={setCombinations} />
      }
    </div>
  );
}
