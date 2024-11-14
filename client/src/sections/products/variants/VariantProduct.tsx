import { useState } from 'react';
import { PlusCirle } from '../../../icons/icons';
import { FONTS } from '../../../constants/constants';
import { Variant } from '../../../types/types';
import VariantTable from './VariantTable';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import FormVariant from './FormVariant';
import VariantCard from './VariantCard';

interface Props {
  showInputs: {
    sku: boolean;
    physical: boolean;
    customInformation: boolean;
    variant: boolean;
  };
  handleCheckboxChange: (name: string, value: boolean) => void;
}

export default function VariantProduct({ showInputs, handleCheckboxChange }: Props) {
  const MAX_VARIANTS = 2;
  const [variants, setVariants] = useState<Variant[]>([]);

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
      options: [{ name: '', price: 0, quantity: 0, visible: true, isChecked: false, sku: '', barCode: '', weight: '' }],
    }

    setVariants(prev => [
      ...prev,
      variant
    ]);
  };

  const handleDragEnd = () => {

  }

  return (
    <div className="bg-white border border-gray-300 rounded-lg mt-8 pt-5">
      <h2 className={`${FONTS.title} mb-3 mx-4`}>Variantes</h2>

      {showInputs.variant && variants.length > 0 ? (
        <div className="border border-gray-300 rounded-md mx-4 mb-5">
          <DndContext
            collisionDetection={closestCenter}
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

      {isVariantTableVisible && <VariantTable variants={variants} />}
    </div>
  );
}
