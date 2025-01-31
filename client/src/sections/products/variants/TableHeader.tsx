import { Dispatch, SetStateAction } from "react";
import CheckBox from "../../../components/forms/CheckBox";
import { CombinationProps, Variant } from "../../../types/types";
import ToolTip from "../../../components/forms/ToolTip";
import { TreeDots } from "../../../icons/icons";

interface Props {
  variants: Variant[];
  combinations: CombinationProps[];
  setCombinations: Dispatch<SetStateAction<CombinationProps[]>>;
  getCheckedCount: () => number;
  setExpandedAll: Dispatch<SetStateAction<boolean>>;
  expandedAll: boolean;
  isShowDropDown: boolean;
  setIsShowDropDown: Dispatch<SetStateAction<boolean>>;
  allCombinationsAndOptionsInvisible: boolean;
}

export default function TableHeader({ setCombinations, isShowDropDown, setIsShowDropDown, combinations, expandedAll, setExpandedAll, getCheckedCount, variants }: Props) {
  function handleAllCheckboxChange(value: boolean) {
    setCombinations(prevCombinations => {
      return prevCombinations.map(combination => ({
        ...combination,
        isChecked: value,
        options: combination.options.map(option => ({
          ...option,
          isChecked: value
        }))
      }));
    });
  }

  return (
    <thead className="text-xs text-secondary/65 bg-whiting2 border-y border-gray-300">
      <tr>
        <th scope="col" className="py-2 pl-4 w-2">
          <div className="flex items-center">
            <CheckBox onChange={handleAllCheckboxChange} initialValue={combinations.every(combination => combination.isChecked)} />
          </div>
        </th>
        <th scope="col" className="px-4 py-2 w-[40%]">
          {getCheckedCount() > 0 ? (
            <>
              <span className='text-primary font-semibold'>Seleccionados: {getCheckedCount()}</span>
            </>
          ) : (
            <>
              <span>Variante {variants.length > 1 && '· '}</span>
              {variants.length > 1 && (
                <span
                  role="button"
                  onClick={() => setExpandedAll(!expandedAll)}
                  className="text-primary hover:underline cursor-pointer font-medium"
                >
                  {expandedAll ? 'Contraer' : 'Expandir'} todo
                </span>
              )}
            </>
          )}
        </th>

        {getCheckedCount() === 0 ? (
          <>
            <th scope="col" className="py-2">Precio</th>
            <th scope="col" className="p-2 w-32">
              <span data-tooltip-id='available' className='cursor-pointer border-b-2 border-b-graying/80 border-dotted'>
                Disponible
              </span>
              <ToolTip id='available' title='Inventario en su tienda que se puede vender' />
            </th>
          </>
        ) : (
          <>
            <th />
            <th className="text-right relative">
              <div className="absolute w-40 top-0 bottom-0 right-2 z-50 flex justify-end items-center space-x-1">
                <button
                  type="button"
                  className="bg-white py-1.5 px-2 text-secondary/80 font-semibold shadow-md border border-gray-300 rounded-lg"
                >
                  Edición masiva
                </button>

                <button
                  onClick={() => setIsShowDropDown(!isShowDropDown)}
                  data-tooltip-id="options"
                  type="button"
                  className="bg-white px-1 py-0.5 shadow-md border border-gray-300 rounded-lg"
                >
                  <TreeDots className="text-primary size-[22px]" />
                </button>
                <ToolTip id="options" title="Más acciones" />
              </div>
            </th>
          </>
        )}
      </tr>
    </thead>
  )
}
