import CheckBox from '../../components/forms/CheckBox';
import FieldInput from '../../components/forms/FieldInput';
import FieldInputWithElement from '../../components/forms/FieldInputWithElement';
import PrependChildInput from '../../components/PrependChildInput';
import Line from '../../components/Line';
import { AddProductProps } from '../../types/types';

interface Props {
  formData: AddProductProps;
  handleInputChange: (key: keyof AddProductProps, value: any) => void;
}

const PriceProduct = ({ formData, handleInputChange }: Props) => {
  return (
    <div className="bg-white rounded-lg mt-8 py-5">
      <div className="mx-4">
        <h2 className={`font-semibold text-[15px] mb-3`}>Precios</h2>
        <div className="mb-8">
          <div className="flex flex-col md:flex-row mb-5">
            <FieldInput
              value={formData.price}
              onChange={(e) => handleInputChange('price', e.target.value)}
              className="w-full md:w-1/3"
              name="Precio"
              id="price"
              placeholder="C$ 0.00"
            />
            <FieldInputWithElement
              isNumber
              name="Comparar precio"
              id="priceCompare"
              placeholder="C$ 0.00"
              className="w-full md:w-1/3 mt-4 md:mt-0 md:ml-4"
              onChange={(e) => handleInputChange('comparePrice', e.target.value)}
              value={formData.comparePrice}
              prependChild={
                <PrependChildInput
                  message="Para mostrar la rebaja, ingrese un valor superior a su precio. A menudo se muestra con un trazo"
                  id="price"
                />
              }
            />
          </div>
          <CheckBox
            onChange={(value) => handleInputChange('isTax', value)}
            name="Cobrar impuestos a este producto"
            initialValue={false}
          />
        </div>
      </div>

      <Line />

      <div className="flex mt-5 flex-col md:flex-row mx-3">
        <FieldInputWithElement
          name="Costo"
          id="cost"
          placeholder="C$ 0.00"
          className="w-full md:w-1/3"
          isNumber
          onChange={(e) => handleInputChange('cost', e.target.value)}
          value={formData.cost}
          prependChild={<PrependChildInput message="Los clientes no verán esto" id="cost" />}
        />
        <FieldInput
          value={formData.price - formData.cost}
          className="w-full md:w-1/3 mt-4 md:mt-0 md:ml-3"
          name="Ganancia"
          id="profit"
          placeholder="C$ 0.00"
          readonly
        />
        <FieldInputWithElement
          value={formData.cost !== 0 ? (((formData.price - formData.cost) / formData.price) * 100).toFixed(2) : 0}
          className="w-full md:w-1/3 mt-4 md:mt-0 md:ml-3"
          name="Margen"
          id="margin"
          placeholder="C$ 0.00"
          readonly
          prependChild={<span className='font-semibold'>%</span>}
        />
      </div>
    </div>
  );
};

export default PriceProduct;
