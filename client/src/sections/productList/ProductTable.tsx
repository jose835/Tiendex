import { useState, useEffect } from 'react';
import Button from '../../components/forms/Button';
import CheckBox from '../../components/forms/CheckBox';
import StatusTags from '../../components/StatusTags';
import { ThreeDots } from '../../icons/icons';
import ToolTip from '../../components/forms/ToolTip';
import { ProductProps } from '../../types/types';
import { currencyFormatter } from '../../utils/function';

interface ProductsTableProps {
  products: ProductProps[];
  showOptions: boolean;
  setShowOptions: (show: boolean) => void;
}

const ProductsTable: React.FC<ProductsTableProps> = ({ products, showOptions, setShowOptions }) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (checkedItems.size === products.length) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [checkedItems, products.length]);

  const handleCheckBoxChange = (newValue: boolean) => {
    setShowOptions(!showOptions)
    if (newValue) {
      setCheckedItems(new Set(products.map(product => product.productId)));
    } else {
      setCheckedItems(new Set());
    }
  };

  const handleRowCheckBoxChange = (id: string, newValue: boolean) => {
    const updatedCheckedItems = new Set(checkedItems);
    if (newValue) {
      updatedCheckedItems.add(id);
    } else {
      updatedCheckedItems.delete(id);
    }
    setCheckedItems(updatedCheckedItems);
  };

  return (
    <div className="relative overflow-x-auto shadow-sm border border-gray-300 sm:rounded-b-lg">
      <table className="w-full text-left">
        <thead className="bg-[whiting2] border-b border-gray-300">
          <tr className="[&>th]:font-medium [&>th]:text-[13px] [&>th]:text-secondary [&>th]:py-3  px-2">
            <th scope="col" className="p-2 flex">
              <CheckBox
                onChange={handleCheckBoxChange}
                name=''
                initialValue={isChecked}
              />
            </th>
            <th scope="col" className='w-12' style={{ visibility: showOptions ? 'visible' : 'hidden' }} />
            <th scope="col" className="pl-2 w-[25%] font-medium" style={{ visibility: showOptions ? 'visible' : 'hidden' }}>
              Producto
            </th>
            <th scope="col" className="px-2 font-medium" style={{ visibility: showOptions ? 'visible' : 'hidden' }}>
              Estado
            </th>
            <th scope="col" className="px-2 font-medium" style={{ visibility: showOptions ? 'visible' : 'hidden' }}>
              Inventario
            </th>
            <th scope="col" className="px-2 font-medium text-right" style={{ visibility: showOptions ? 'visible' : 'hidden' }}>
              Precio
            </th>
            <th scope="col" className="px-2 font-medium text-right" style={{ visibility: showOptions ? 'visible' : 'hidden' }}>
              Costo
            </th>
            <th scope="col" className="px-2 font-medium" style={{ visibility: showOptions ? 'visible' : 'hidden' }}>
              Subcategoria
            </th>
            <th scope="col" className="px-2 font-medium" style={{ visibility: showOptions ? 'visible' : 'hidden' }}>
              Tipo
            </th>
            <th scope="col" className="px-2 font-medium">
              {!showOptions ? (
                <div className='flex items-center justify-end'>
                  <div className='absolute right-2 flex'>
                    <Button name='Editar' className='bg-white shadow-md border border-gray-300' />
                    <Button name='Borrador' className='bg-white shadow-md ml-1 border border-gray-300' />
                    <div data-tooltip-id="options" className='bg-white border border-gray-300 shadow-md size-8 ml-1 flex items-center justify-center rounded-md'>
                      <ThreeDots />
                      <ToolTip id='options' title='Mas opciones' />
                    </div>
                  </div>
                </div>
              ) : (
                "Proveedor"
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map(({ name, productId, state, product_price, subCategoryName, organization_product }) => (
            <tr key={productId} className="bg-white [&>td]:font-semibold [&>td]:text-[13px] [&>td]:text-secondary/90 border-b hover:bg-gray-50">
              <td className="w-4 p-2">
                <CheckBox
                  name=''
                  initialValue={checkedItems.has(productId)}
                  onChange={(value) => handleRowCheckBoxChange(productId, value)}
                />
              </td>
              <td className="py-1">
                <img className='size-11 rounded-md object-cover' src="https://cdn-icons-png.freepik.com/512/3342/3342177.png" alt='product' />
              </td>
              <td className="pl-2 py-2">
                {name}
              </td>
              <td className="px-2 py-2">
                <StatusTags name={state ? "Activo" : "Inactivo"} color={state ? '#affebf' : '#ffabab'} textColor={state ? '#014b40]' : '#d10000'} />
              </td>
              <td className="px-2 py-2">
                <span className='text-red-900'>0 en inventario</span>
              </td>
              <td className="px-2 py-2 text-right">
                {product_price.price === null || product_price.price === 0 ? currencyFormatter(0) : currencyFormatter(product_price.price)}
              </td>
              <td className="px-2 py-2 text-right">
                {product_price.cost === null || product_price.cost === 0 ? currencyFormatter(0) : currencyFormatter(product_price.cost)}
              </td>
              <td className="p-2">
                {subCategoryName}
              </td>
              <td className="p-2">
                {organization_product.productType === null || organization_product.productType === '' ? 'N/A' : organization_product.productType}
              </td>
              <td className="p-2">
                {organization_product.productVendor === null || organization_product.productVendor === '' ? 'N/A' : organization_product.productVendor}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductsTable;
