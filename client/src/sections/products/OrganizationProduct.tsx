import FieldInput from '../../components/forms/FieldInput';
import { FONTS } from '../../constants/constants';
import { AddProductProps } from '../../types/types';

interface Props {
  formData: AddProductProps;
  handleInputChange: (key: keyof AddProductProps, value: any) => void;
}

const OrganizationProduct = ({ formData, handleInputChange }: Props) => {
  return (
    <div className="bg-white rounded-lg mt-8 w-full px-3 py-5 md:ml-8">
      <h2 className={`${FONTS.title} mb-3`}>Organización del producto</h2>
      <FieldInput required={false} value={formData.productType} onChange={(e) => handleInputChange('productType', e.target.value)} name="Tipo de producto" id="typeProduct" />
      <FieldInput required={false} value={formData.productVendor} onChange={(e) => handleInputChange('productVendor', e.target.value)} name="Proveedor" id="vendor" />
      <FieldInput required={false} value={formData.productCollection} onChange={(e) => handleInputChange('productCollection', e.target.value)} name="Colecciones" id="collections" />
      <FieldInput required={false} value={formData.productTag} onChange={(e) => handleInputChange('productTag', e.target.value)} name="Etiquetas" id="tags" />
    </div>
  )
}

export default OrganizationProduct;
