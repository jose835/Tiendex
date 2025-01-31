import { Dispatch, SetStateAction, useState } from 'react';
import { Delete, GridDots } from '../../../icons/icons';
import FieldInputWithElement from '../../../components/forms/FieldInputWithElement';
import { Option, Variant } from '../../../types/types';
import { showToast } from '../../../components/Toast';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { v4 as uuid } from 'uuid';

interface Props {
  variantIndex: number;
  optionIndex: number;
  option: Option;
  variants: Variant[];
  setVariants: Dispatch<SetStateAction<Variant[]>>;
  variant: Variant;
}

export default function FormOptionVariant({ setVariants, variants, option, variant, variantIndex, optionIndex }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: variant.options.length - 1 !== optionIndex ? option.id : option.id + '-last' });
  const [isDragging, setIsDragging] = useState(false);

  const styles = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleRemoveOption = (variantIndex: number, optionIndex: number) => {
    const newVariants = [...variants];
    newVariants[variantIndex].options = newVariants[variantIndex].options.filter((_, i) => i !== optionIndex);
    setVariants(newVariants);
  };

  const handleOptionChange = (variantIndex: number, optionIndex: number, name: string) => {
    const newVariants = [...variants];

    const isDuplicate = newVariants[variantIndex].options
      .filter((_, index) => index !== optionIndex)
      .some(option => option.name.trim().toLowerCase() === name.trim().toLowerCase() && name.trim() !== '');

    if (isDuplicate) {
      showToast('El nombre de la opción ya existe', false);
      return;
    }

    newVariants[variantIndex].options[optionIndex].name = name;

    if (optionIndex === newVariants[variantIndex].options.length - 1 && name.trim() !== '') {
      newVariants[variantIndex].options.push({ id: uuid(), isEliminated: false, isChecked: false, name: '', price: 0, quantity: 0, visible: true, barCode: '', sku: '', weight: '', country: '', sellingOutStock: false });
    }

    setVariants(newVariants);
  };

  return (
    <>
      {optionIndex === 0 && <span className='font-medium mx-14 text-sm text-secondary'>Nombre de la opción</span>}
      <div
        className="flex items-center mt-2 ml-5"
        style={styles}
        ref={setNodeRef}
      >

        <div
          {...attributes}
          tabIndex={-1}
          {...listeners}
          className={isDragging ? "cursor-grabbing" : "cursor-grab"}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <GridDots />
        </div>

        <FieldInputWithElement
          prependChild={variant.options.length > 1 && optionIndex !== variant.options.length - 1 ? (
            <button type="button" onClick={() => handleRemoveOption(variantIndex, optionIndex)}>
              <Delete className="text-graying size-5 hover:text-secondary/80 cursor-pointer" />
            </button>
          ) : <></>}
          className="ml-5 w-full"
          value={option.name}
          onChange={(e) => handleOptionChange(variantIndex, optionIndex, e.target.value)}
        />
      </div>
    </>
  );
}
