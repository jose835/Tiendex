import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Variant } from '../../../types/types';
import { GridDots } from '../../../icons/icons';
import { Dispatch, SetStateAction, useState } from 'react';
import { COLORS } from '../../../constants/constants';

interface Props {
  variant: Variant;
  setVariants: Dispatch<SetStateAction<Variant[]>>;
  variantIndex: number;
}

export default function VariantCard({ variant, setVariants, variantIndex }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging: dndIsDragging } = useSortable({ id: variant.id });
  const [isDragging, setIsDragging] = useState(false);

  const styles = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging || dndIsDragging ? "none" : transition,
    zIndex: 1000,
    backgroundColor: isDragging || dndIsDragging ? 'white' : '',
    borderWidth: isDragging || dndIsDragging ? 2 : 0,
    borderRadius: isDragging || dndIsDragging ? 4 : 0,
    borderColor: isDragging || dndIsDragging ? COLORS.blueprimary : '',
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  return (
    <div
      style={styles}
      ref={setNodeRef}
      className={`flex z-50 hover:bg-whiting2 cursor-pointer w-full h-full p-4 items-center space-x-3`}
      onClick={() => {
        setVariants((prev) => {
          const updated = [...prev];
          updated[variantIndex].isEditing = true;
          return updated;
        });
      }}
    >
      <div
        {...attributes}
        {...listeners}
        tabIndex={-1}
        className={isDragging ? "cursor-grabbing" : "cursor-grab"}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <GridDots />
      </div>
      <div>
        <h4 className="font-semibold text-sm text-primary">{variant.name}</h4>
        <div className="mt-3 flex flex-wrap">
          {variant.options.filter(option => option.name.trim() !== '').map((option, key) => (
            option && (
              <span
                key={key}
                className="text-primary font-medium text-xs bg-[#eaf4ff] border-0 border-bluesecondary px-4 py-1 rounded-md mb-2 mr-2"
              >
                {option.name}
              </span>
            )
          ))}
        </div>
      </div>
    </div>
  );
}
