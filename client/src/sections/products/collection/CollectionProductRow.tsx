import { Dispatch, SetStateAction, useState } from 'react';
import CheckBox from '../../../components/forms/CheckBox';
import StatusTags from '../../../components/StatusTags';
import { COLORS } from '../../../constants/constants';
import { Close, Content, Down, GridDots } from '../../../icons/icons'
import { ProductActive } from '../../../types/types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Props {
  selectedFilter: number;
  product: ProductActive;
  productsActive: ProductActive[];
  setProductsActive: Dispatch<SetStateAction<ProductActive[]>>;
  index: number;
}

export default function CollectionProductRow({ setProductsActive, index, product, productsActive, selectedFilter }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging: dndIsDragging } = useSortable({ id: product.IDProduct });
  const [isDragging, setIsDragging] = useState(false);

  const styles = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging || dndIsDragging ? 1000 : 0,
    backgroundColor: isDragging || dndIsDragging ? 'white' : '',
    borderTopWidth: isDragging || dndIsDragging ? 2 : 0,
    borderTopColor: isDragging || dndIsDragging ? COLORS.blueprimary : '',
  };

  function handleDeleteProduct(productId: string) {
    const productsUpdated = productsActive.filter((product) => product.IDProduct !== productId);
    setProductsActive(productsUpdated);
  }

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  return (
    <div
      style={styles}
      ref={setNodeRef}
      className={`group grid px-6 hover:bg-whiting2/80 cursor-pointer py-3 ${selectedFilter !== 7 ? 'grid-cols-[5%_75%_15%_5%]' : 'grid-cols-[12%_5%_60%_15%_8%]'} ${index !== productsActive.length - 1 ? 'border-b border-gray-300' : ''}`}
    >
      {selectedFilter === 7 &&
        <div className="flex items-center space-x-3">
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

          <CheckBox />
        </div>
      }

      <div className="flex items-center">
        <span className="font-medium text-sm text-secondary">
          {index + 1}.
        </span>
      </div>

      <div className="flex items-center space-x-3">
        <div className="flex size-10 items-center justify-center border border-gray-300 rounded-md">
          <Content className="size-5 text-graying" />
        </div>
        <span className="text-sm group-hover:underline font-medium text-primary">
          {product.name}
        </span>
      </div>

      <div className="flex items-center px-2 rounded-md group-hover:bg-whiting2/80">
        <StatusTags
          name={product.state ? 'Activo' : 'Inactivo'}
          color={product.state ? COLORS.greenprimary : COLORS.redprimary}
          textColor={product.state ? COLORS.darkgreen : COLORS.darkred}
        />
        <Down className="hidden text-secondary/80 size-5 group-hover:block" />
      </div>

      <div className="flex items-center justify-end">
        <div onClick={() => handleDeleteProduct(product.IDProduct)} className="flex items-center justify-center hover:bg-[#EAEAEA] p-1.5 cursor-pointer rounded-md">
          <Close className="size-4 text-graying" />
        </div>
      </div>
    </div>
  )
}
