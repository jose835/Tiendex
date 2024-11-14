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
        // Si no hay selectedOptions, restablece todo a visible
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

        // Inicializa la combinación como no visible
        const updatedCombination = { ...combination, visible: false };

        // Lógica para cuando hay dos elementos en selectedOptions
        if (selectedOptions.length === 2) {
          const [firstSelection, secondSelection] = selectedOptions;

          // Verificamos si alguno de los elementos en selectedOptions coincide con el optionName de la combinación
          const firstMatchesOptionName = firstSelection.optionName === combination.optionName;
          const secondMatchesOptionName = secondSelection.optionName === combination.optionName;

          // Caso en que el primer elemento coincide con optionName
          if (firstMatchesOptionName) {
            // Marcamos la combinación como visible
            updatedCombination.visible = true;

            // Establecemos visibilidad en las opciones de acuerdo con el segundo elemento de selectedOptions
            updatedCombination.options = updatedCombination.options.map(option => ({
              ...option,
              visible: option.name === secondSelection.optionName,
            }));

            // Caso en que el segundo elemento coincide con optionName
          } else if (secondMatchesOptionName) {
            // Marcamos la combinación como visible
            updatedCombination.visible = true;

            // Establecemos visibilidad en las opciones de acuerdo con el primer elemento de selectedOptions
            updatedCombination.options = updatedCombination.options.map(option => ({
              ...option,
              visible: option.name === firstSelection.optionName,
            }));
          }

          // Lógica para cuando hay un solo elemento en selectedOptions
        } else if (selectedOptions.length === 1) {
          const singleSelection = selectedOptions[0];

          // Si coincide el optionName, mostramos todas las opciones
          if (singleSelection.optionName === combination.optionName) {
            updatedCombination.visible = true;
            updatedCombination.options = updatedCombination.options.map(option => ({
              ...option,
              visible: true,
            }));
          } else {
            // Si no coincide con optionName, pero coincide con alguna opción, mostramos solo esa opción
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
