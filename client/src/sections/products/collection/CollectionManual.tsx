import { closestCenter, DndContext } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Dispatch, SetStateAction, useState } from 'react'
import FieldSelect from '../../../components/forms/FieldSelect'
import Button from '../../../components/forms/Button'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import FieldInputWithElement from '../../../components/forms/FieldInputWithElement'
import { ProductActive, SelectOptions } from '../../../types/types'
import { Products, Search } from '../../../icons/icons'
import CollectionProductRow from './CollectionProductRow'

interface Props {
  productsActive: ProductActive[];
  textSearch: string;
  setTextSearch: Dispatch<SetStateAction<string>>;
  setIsShowModal: Dispatch<SetStateAction<boolean>>;
  setProductsActive: Dispatch<SetStateAction<ProductActive[]>>;
}

export default function CollectionManual({ textSearch, productsActive, setProductsActive, setIsShowModal, setTextSearch }: Props) {
  const [selectedFilter, setSelectedFilter] = useState<number>(0);
  const SORT_PRODUCTS: SelectOptions[] = [
    { name: 'Más vendidos', value: 0 },
    { name: 'Nombre del producto A-Z', value: 1 },
    { name: 'Nombre del producto Z-A', value: 2 },
    { name: 'Precio mas alto', value: 3 },
    { name: 'Precio más bajo', value: 4 },
    { name: 'Más recientes', value: 5 },
    { name: 'Más antiguos', value: 6 },
    { name: 'Manualmente', value: 7 },
  ]

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = productsActive.findIndex(product => product.IDProduct === active.id);
      const newIndex = productsActive.findIndex(product => product.IDProduct === over.id);

      const updatedProducts = [...productsActive];
      const [movedProduct] = updatedProducts.splice(oldIndex, 1);
      updatedProducts.splice(newIndex, 0, movedProduct);

      setProductsActive(updatedProducts);
    }
  }

  function handleChangeTextSearh(value: string) {
    setTextSearch(value);
    setIsShowModal(true);
  }

  return (
    <>
      <div className={`flex items-center px-4 ${productsActive.length > 0 ? 'border-b border-gray-300 pb-2' : ''}`}>
        <FieldInputWithElement
          value={textSearch}
          onChange={(e) => handleChangeTextSearh(e.target.value)}
          appendChild={<Search />}
          className="mb-0 w-full"
          placeholder="Buscar producto"
        />
        <Button style='primary' onClick={() => setIsShowModal(true)} name="Explorar" className="text-primary h-9 ml-1 mr-3" />
        <FieldSelect
          value={selectedFilter}
          onChange={(value) => setSelectedFilter(Number(value))}
          options={SORT_PRODUCTS}
          className="w-full"
        />
      </div>

      {productsActive.length === 0 ? (
        <div className="flex flex-col py-2 pb-6 items-center justify-center mt-10">
          <Products className="size-16 text-gray-300" />
          <h5 className="text-sm font-medium mt-2 text-secondary/80">No hay productos en esta colección.</h5>
          <p className="text-sm font-medium text-secondary/80">Buscar o explorar para agregar productos.</p>
        </div>
      ) : (
        <DndContext
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis]}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={productsActive.map(product => product.IDProduct)}
            strategy={verticalListSortingStrategy}
          >
            {
              productsActive.map((product, index) => (
                <CollectionProductRow
                  index={index}
                  product={product}
                  productsActive={productsActive}
                  selectedFilter={selectedFilter}
                  setProductsActive={setProductsActive}
                />
              ))
            }
          </SortableContext>
        </DndContext>

      )}
    </>
  )
}
