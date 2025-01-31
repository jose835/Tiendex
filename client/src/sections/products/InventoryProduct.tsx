import CheckBox from '../../components/forms/CheckBox';
import FieldInput from '../../components/forms/FieldInput';
import Line from '../../components/Line';
import { AddProductProps } from '../../types/types';

interface Props {
  showInputs: {
    sku: boolean;
    physical: boolean;
    customInformation: boolean;
    minStock: boolean;
  };
  handleCheckboxChange: (name: string, value: boolean) => void;
  formData: AddProductProps;
  handleInputChange: (key: keyof AddProductProps, value: any) => void;
}

const InventoryProduct: React.FC<Props> = ({ showInputs, handleCheckboxChange, formData, handleInputChange }) => {
  
  return (
    <div className="bg-white rounded-lg mt-8 py-5">
      <div className='mx-4'>
        <h2 className={`font-semibold text-[15px] mb-3`}>Inventario</h2>
        <CheckBox className='mb-5' name="Cantidad de seguimiento" onChange={(value) => handleCheckboxChange('minStock', value)} initialValue={false} />

        {showInputs.minStock && <FieldInput value={formData.minStock} onChange={(e) => handleInputChange('minStock', e.target.value)} id='minStock' name='Cantidad' isNumber className='w-56 mb-5' />}

        <Line />

        <CheckBox onChange={(value) => handleInputChange('sellOutStock', value)} className='mt-5' name="Continuar vendiendo cuando no haya existencias" initialValue={false} />
        <p className="text-[13px] ml-8 mt-2 text-whiting font-medium mb-4">
          Esto no afectará las ventas. El personal verá una advertencia, pero podrá completar las ventas cuando el inventario disponible llegue a cero o menos.
        </p>

        <div>
          <CheckBox
            name="Su producto tiene un SKU o código de barras"
            onChange={(value) => handleCheckboxChange('sku', value)}
            initialValue={showInputs.sku}
          />

          {showInputs.sku && (
            <div className="flex mt-5">
              <FieldInput value={formData.sku} onChange={(e) => handleInputChange('sku', e.target.value)} name="SKU (Unidad mantenimiento existencias)" className="w-1/2" id="SKU" />
              <FieldInput value={formData.barCode} onChange={(e) => handleInputChange('barCode', e.target.value)} name="Código de barras (ISBN, UPC, GTIN, etc.)" className="ml-3 w-1/2" id="barcode" />
            </div>
          )}
        </div >
      </div>
    </div>
  )
}

export default InventoryProduct;
