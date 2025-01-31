import { Dispatch, SetStateAction } from 'react';
import { PlusCirle } from '../../../icons/icons';
import { CombinationProps, Variant } from '../../../types/types';
import VariantTable from './VariantTable';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import FormVariant from './FormVariant';
import VariantCard from './VariantCard';
import { v4 as uuid } from 'uuid'

interface Props {
  showInputs: {
    sku: boolean;
    physical: boolean;
    customInformation: boolean;
    variant: boolean;
  };
  variants: Variant[];
  setVariants: Dispatch<SetStateAction<Variant[]>>;
  combinations: CombinationProps[];
  setCombinations: Dispatch<SetStateAction<CombinationProps[]>>;
  handleCheckboxChange: (name: string, value: boolean) => void;
}

export default function VariantProduct({ combinations, setCombinations, setVariants, variants, showInputs, handleCheckboxChange }: Props) {
  const MAX_VARIANTS = 2;


  const isVariantTableVisible = variants.some(variant =>
    variant.options.some(option => option.name.trim() !== '')
  );

  const handleAddVariant = () => {
    const variant: Variant = {
      id: (variants.length + 1).toString(),
      name: '',
      isEditing: true,
      price: 0,
      quantity: 0,
      options: [{ id: uuid(), name: '', price: 0, quantity: 0, visible: true, isChecked: false, sku: '', barCode: '', weight: '', country: '', sellingOutStock: false, isEliminated: false }],
    }

    setVariants(prev => [
      ...prev,
      variant
    ]);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      setVariants((prev) => {
        const oldIndex = prev.findIndex((variant) => variant.id === active.id);
        const newIndex = prev.findIndex((variant) => variant.id === over.id);

        const reorderedVariants = [...prev];
        const [movedVariant] = reorderedVariants.splice(oldIndex, 1);
        reorderedVariants.splice(newIndex, 0, movedVariant);

        return reorderedVariants;
      });
    }
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg mt-8 pt-5">
      <h2 className={`font-semibold text-[15px] mb-3 mx-4`}>Variantes</h2>

      {showInputs.variant && variants.length > 0 ? (
        <div className="border border-gray-300 rounded-md mx-4 mb-5">
          <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={variants}
              strategy={verticalListSortingStrategy}
            >
              {variants.map((variant, variantIndex) => (
                <div key={variantIndex} className="border-b border-gray-300">
                  {variant.isEditing ? (
                    <FormVariant
                      key={variant.id}
                      setVariants={setVariants}
                      handleCheckboxChange={handleCheckboxChange}
                      variant={variant}
                      variantIndex={variantIndex}
                      variants={variants}
                    />
                  ) : (
                    <VariantCard
                      key={variant.id}
                      setVariants={setVariants}
                      variantIndex={variantIndex}
                      variant={variant}
                    />
                  )}
                </div>
              ))}
            </SortableContext>
          </DndContext>

          {variants.length < MAX_VARIANTS && (
            <div className="px-5 py-2.5">
              <button
                type="button"
                onClick={handleAddVariant}
                className="flex hover:text-bluesecondary text-blueprimary items-center group"
              >
                <PlusCirle />
                <span className="text-blueprimary ml-2 group-hover:text-bluesecondary group-hover:underline font-medium text-sm">
                  Agregar otra variante
                </span>
              </button>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => {
            handleCheckboxChange('variant', true);
            handleAddVariant();
          }}
          className="flex mx-4 hover:text-bluesecondary text-blueprimary my-4 items-center group"
        >
          <PlusCirle />
          <span className="text-blueprimary ml-2 group-hover:text-bluesecondary group-hover:underline font-medium text-sm">
            Agregar opciones como tamaño o color
          </span>
        </button>
      )}

      {isVariantTableVisible && <VariantTable combinations={combinations} setCombinations={setCombinations} setVariants={setVariants} variants={variants} />}
    </div>
  );
}
