import { Dispatch, SetStateAction } from 'react';
import { GridDots } from '../../../icons/icons';
import FieldInput from '../../../components/forms/FieldInput';
import { Variant } from '../../../types/types';
import Button from '../../../components/forms/Button';
import { showToast } from '../../../components/Toast';
import { SortableContext } from '@dnd-kit/sortable';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { verticalListSortingStrategy } from '@dnd-kit/sortable';
import FormOptionVariant from './FormOptionVariant';

interface Props {
  variants: Variant[];
  setVariants: Dispatch<SetStateAction<Variant[]>>;
  variant: Variant;
  variantIndex: number;
  handleCheckboxChange: (name: string, value: boolean) => void;
}

export default function FormVariant({ variants, setVariants, handleCheckboxChange, variant, variantIndex }: Props) {
  const handleRemoveVariant = (index: number) => {
    const newVariants = variants.filter((_, i) => i !== index);
    setVariants(newVariants);

    if (newVariants.length === 0) {
      handleCheckboxChange('variant', false);
    }
  };

  const isDoneButtonDisabled = (variant: Variant) => {
    const isDuplicate = variants
      .filter((v) => v !== variant)
      .some(v => v.name.trim().toLowerCase() === variant.name.trim().toLowerCase());

    const hasEmptyOptionNames = variant.options.filter(option => option.name.trim() === '').length > 1;

    return !variant.name.trim() || hasEmptyOptionNames || !variant.options.some(option => option.name.trim()) || isDuplicate;
  };

  const handleVariantNameChange = (index: number, value: string) => {
    const newVariants = [...variants];
    const isDuplicate = newVariants
      .filter((_, i) => i !== index)
      .some(v => v.name.trim().toLowerCase() === value.trim().toLowerCase());

    if (isDuplicate) {
      showToast(`Ya has utilizado el nombre de variante "${value}".`, false);
    }

    newVariants[index].name = value;
    setVariants(newVariants);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = variant.options.findIndex(option => option.id === active.id);
      const newIndex = variant.options.findIndex(option => option.id === over?.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        const updatedOptions = [...variant.options];
        const [movedOption] = updatedOptions.splice(oldIndex, 1);
        updatedOptions.splice(newIndex, 0, movedOption);

        const updatedVariants = [...variants];
        updatedVariants[variantIndex].options = updatedOptions;
        setVariants(updatedVariants);
      }
    }
  };

  return (
    <div className='m-5'>
      <div className="flex items-center mb-3">
        <GridDots />
        <FieldInput
          name="Nombre de variante"
          className="ml-10 w-full"
          value={variant.name}
          onChange={(e) => handleVariantNameChange(variantIndex, e.target.value)}
        />
      </div>

      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={variant.options.map(option => option.id)}
          strategy={verticalListSortingStrategy}
        >
          {variant.options.map((option, optionIndex) => (
            <FormOptionVariant
              key={option.id}
              setVariants={setVariants}
              variants={variants}
              option={option}
              optionIndex={optionIndex}
              variant={variant}
              variantIndex={variantIndex}
            />
          ))}
        </SortableContext>
      </DndContext>

      <div className="flex justify-between items-center mt-4 ml-14">
        <Button
          onClick={() => handleRemoveVariant(variantIndex)}
          name="Eliminar"
          style='primary'
          className="text-red-800 hover:text-red-900 bg-white/60"
        />
        <Button
          onClick={() => !isDoneButtonDisabled(variant) && setVariants(prev => {
            const updated = [...prev];
            updated[variantIndex].isEditing = false;
            return updated;
          })}
          name="Hecho"
          style='secondary'
          className=""
          disabled={isDoneButtonDisabled(variant)}
        />
      </div>
    </div>
  );
}
