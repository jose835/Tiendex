import { useEffect, useState } from 'react';
import CheckBox from '../../components/forms/CheckBox';
import FieldInput from '../../components/forms/FieldInput';
import FieldSelect from '../../components/forms/FieldSelect';
import Line from '../../components/Line';
import PrependChildInput from '../../components/PrependChildInput';
import { PlusCirle } from '../../icons/icons';
import { AddProductProps, CategoryOption, CountryProps } from '../../types/types';
import Select from '../../components/forms/Select';

interface Props {
  showInputs: {
    physical: boolean;
    customInformation: boolean;
  };
  handleCheckboxChange: (name: string, value: boolean) => void;
  formData: AddProductProps;
  handleInputChange: (key: keyof AddProductProps, value: any) => void;
}

const ShippingProduct: React.FC<Props> = ({ formData, handleInputChange, showInputs, handleCheckboxChange }) => {
  const [countries, setCountries] = useState<CategoryOption[]>([]);

  useEffect(() => {
    async function loadCountries() {
      // const { data }: { data: CountryProps[] } = await getCountries();
      // const formatData = data.map((item) => ({ label: item.name, value: item.countryId }));
      // setCountries(formatData);
    }

    loadCountries();
  }, [])

  return (
    <div className="bg-white rounded-lg mt-8 py-5 border border-gray-300">
      <div className='mx-4 mb-5'>
        <h2 className={`font-semibold text-[15px] mb-3`}>Envío</h2>
        <CheckBox
          name="Este es un producto físico"
          onChange={(value) => handleCheckboxChange('physical', value)}
          initialValue={showInputs.physical}
        />
        {showInputs.physical &&
          <div className="flex items-center mt-5">
            <FieldInput value={formData.weight} onChange={(e) => handleInputChange('weight', e.target.value)} isNumber name="Peso" id="weight" />
            <FieldSelect className="w-14 ml-3" name="" id="typeUnit" options={[
              { name: 'lb', value: 0 },
              { name: 'kg', value: 1 },
              { name: 'oz', value: 2 },
              { name: 'g', value: 3 },
            ]} />
          </div>
        }
      </div>
      <Line />
      <div className='mx-4'>
        {!showInputs.physical ? (
          <span className={`font-medium text-secondary text-sm mt-4 inline-block`}>
            Los clientes no ingresarán los detalles de envío al finalizar la compra. Aprenda cómo configurar su tienda para productos o servicios digitales.
          </span>
        ) : showInputs.customInformation ? (
          <div className='mt-3'>
            <div className='flex items-center'>
              <span className={`font-medium text-secondary text-sm mr-2`}>País/Región de origen</span>
              <PrependChildInput message='En la mayoría de los casos, donde se fabricó o ensambló el producto' id='country' />
            </div>
            <Select onChange={(value) => handleInputChange('productOrigin', value)} value={countries} placeholder='Elegir país/región de origen' />
          </div>
        ) : (
          <button
            onClick={() => handleCheckboxChange('customInformation', true)}
            className='flex hover:text-bluesecondary text-blueprimary mt-4 items-center group'>
            <PlusCirle />
            <span className='text-blueprimary ml-2 group-hover:text-bluesecondary group-hover:underline font-medium text-sm'>
              Agregar información personalizada
            </span>
          </button>
        )}
      </div>
    </div>
  )
}

export default ShippingProduct;
