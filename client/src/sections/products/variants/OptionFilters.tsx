import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import DropDown from '../../../components/DropDown';
import RadioButtonFill from '../../../components/forms/RadioButtonFill';
import { Close } from '../../../icons/icons';
import { CombinationProps, SelectedOption, Variant } from '../../../types/types';

interface Props {
  variants: Variant[];
  setCombinations: Dispatch<SetStateAction<CombinationProps[]>>;
  setSelectedVariant: Dispatch<SetStateAction<Variant>>;
}

export default function OptionFilters({ variants, setCombinations, setSelectedVariant }: Props) {
  const [selectedOptions, setSelectedOptions] = useState<SelectedOption[]>([]);

  const clearSelection = (id: string, variantName: string) => {
    setCombinations(prevCombinations =>
      prevCombinations.map(combination => {
        if (combination.variantName === variantName) {
          return {
            ...combination,
            visible: true,
            options: combination.options.map(option => ({
              ...option,
              visible: true,
            })),
          };
        }
        return combination;
      })
    );

    setSelectedOptions(prevSelectedOptions =>
      prevSelectedOptions.filter(item => item.id !== id)
    );
  };

  useEffect(() => {
    setCombinations(prevCombinations => {
      return prevCombinations.map(combination => {
        if (selectedOptions.length === 0) {
          return {
            ...combination,
            visible: true,
            options: combination.options.map(option => ({
              ...option,
              visible: true,
            })),
          };
        }

        const updatedCombination = { ...combination, visible: false };

        if (selectedOptions.length === 2) {
          const [firstSelection, secondSelection] = selectedOptions;

          const firstMatchesOptionName = firstSelection.optionName === combination.optionName;
          const secondMatchesOptionName = secondSelection.optionName === combination.optionName;

          if (firstMatchesOptionName) {
            updatedCombination.visible = true;

            updatedCombination.options = updatedCombination.options.map(option => ({
              ...option,
              visible: option.name === secondSelection.optionName,
            }));
          } else if (secondMatchesOptionName) {
            updatedCombination.visible = true;
            updatedCombination.options = updatedCombination.options.map(option => ({
              ...option,
              visible: option.name === firstSelection.optionName,
            }));
          }
        } else if (selectedOptions.length === 1) {
          const singleSelection = selectedOptions[0];
          if (singleSelection.optionName === combination.optionName) {
            updatedCombination.visible = true;
            updatedCombination.options = updatedCombination.options.map(option => ({
              ...option,
              visible: true,
            }));
          } else {
            updatedCombination.options = updatedCombination.options.map(option => ({
              ...option,
              visible: option.name === singleSelection.optionName,
            }));
            updatedCombination.visible = updatedCombination.options.some(option => option.visible);
          }
        }

        return updatedCombination;
      });
    });
  }, [selectedOptions, setCombinations]);



  const handleOptionSelect = (variantIndex: number, option: string) => {
    setSelectedOptions(prevSelectedOptions => {
      const existingSelection = prevSelectedOptions.find(item => item.variantName === variants[variantIndex].name);

      if (existingSelection) {
        return prevSelectedOptions.map(item =>
          item.variantName === variants[variantIndex].name
            ? { ...item, optionName: option }
            : item
        );
      }

      return [
        ...prevSelectedOptions,
        { id: variants[variantIndex].id, variantName: variants[variantIndex].name, optionName: option },
      ];
    });

    setSelectedVariant(variants[variantIndex]);
  };

  return (
    <div className="mb-3 space-x-2">
      {variants.map((variant, variantIndex) => (
        <DropDown
          shadow={false}
          key={variantIndex}
          icon={
            selectedOptions.some(selected => selected.id === variant.id) && (
              <span role="button" className="cursor-pointer" onClick={() => clearSelection(variant.id, variant.name)}>
                <Close className="size-3 ml-1" />
              </span>
            )
          }
          classNameDropDown="w-52"
          className={`bg-transparent border border-gray-300 hover:border-solid ${selectedOptions[variantIndex] ? 'border-solid' : 'border-dashed'
            }`}
          isCloseToSelected={false}
          name={
            selectedOptions.some(selected => selected.id === variant.id)
              ? `${variant.name} es ${selectedOptions.find(selected => selected.id === variant.id)?.optionName || ''}`
              : variant.name
          }
          options={variant.options
            .filter(option => option.name.trim() !== '')
            .map((option, optionIndex) => (
              <li key={optionIndex} className="flex items-center p-2 rounded-md hover:bg-gray-100">
                <button
                  type="button"
                  onClick={() => handleOptionSelect(variantIndex, option.name)}
                  className={`flex space-x-2 w-full items-center ${selectedOptions.some(selected => selected.optionName === option.name) ? 'bg-activeColor' : ''
                    }`}
                >
                  <RadioButtonFill
                    active={selectedOptions.some(
                      selectedOption =>
                        selectedOption.variantName === variant.name && selectedOption.optionName === option.name
                    )}
                    className="size-4"
                    classNameOption="size-2"
                  />
                  <span>{option.name}</span>
                </button>
              </li>
            ))}
        >
          <span
            role="button"
            onClick={() => clearSelection(variant.id, variant.name)}
            className="text-sm cursor-pointer font-medium hover:underline hover:text-bluesecondary text-blueprimary"
          >
            Limpiar
          </span>
        </DropDown>
      ))}

      {selectedOptions.length > 0 && (
        <button
          onClick={() => setSelectedOptions([])}
          type="button"
          className="text-xs font-semibold text-secondary/80"
        >
          Limpiar todo
        </button>
      )}
    </div>
  );
}
