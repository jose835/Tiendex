import { Dispatch, SetStateAction, useState } from 'react';
import { CombinationProps } from '../../../types/types';
import FieldInput from '../../../components/forms/FieldInput';
import Modal from '../../../layouts/Modal';

interface Props {
  type: 'sku' | 'barcode';
  onClose: () => void;
  combinations: CombinationProps[];
  setCombinations: Dispatch<SetStateAction<CombinationProps[]>>;
}

interface ValuesSKUProps {
  name: string;
  value: string;
}

export default function ModalVariantSkuCodeBar({ type, combinations, setCombinations, onClose }: Props) {
  const [skuValues, setValues] = useState<ValuesSKUProps[]>([]);

  function handleInputChange(name: string, value: string) {
    setValues(prevValues => {
      const existingValueIndex = prevValues.findIndex((item) => item.name === name);

      if (existingValueIndex !== -1) {
        const updatedValues = [...prevValues];
        updatedValues[existingValueIndex].value = value;
        return updatedValues;
      } else {
        return [...prevValues, { name, value }];
      }
    });
  }

  function handleChangeSKU() {
    const updatedCombinations = combinations.map((combination) => {
      if (combination.options.length > 0) {
        const updatedOptions = combination.options.map((option) => {
          if (option.isChecked) {
            const updatedValue = skuValues.find(value => value.name === `${combination.optionName} / ${option.name}`);
            return {
              ...option,
              [type === 'sku' ? 'sku' : 'barCode']: updatedValue?.value || updatedValue?.name ? updatedValue.value : option[type === 'sku' ? 'sku' : 'barCode'],
            };
          }
          return option;
        });

        return { ...combination, options: updatedOptions };
      } else {
        const updatedValue = skuValues.find(value => value.name === combination.optionName)?.value || '';
        return {
          ...combination,
          [type === 'sku' ? 'variantSku' : 'variantBarCode']: updatedValue
        };
      }
    });

    setCombinations(updatedCombinations);
    onClose();
  }


  return (
    <Modal name={type === 'sku' ? 'Editar las SKU' : 'Editar los códigos de barra'} onClose={onClose} onClickSave={handleChangeSKU}>
      <div>
        {combinations.map((combination, index) => (
          <div key={index}>
            {combination.options.length === 0 ? (
              combination.isChecked && (
                <div
                  className={`flex px-4 ${index !== combinations.length - 1 ? 'border-b' : ''} border-gray-200 py-2 items-center justify-between`}
                >
                  <span className="block font-medium text-secondary text-sm">
                    {combination.optionName}
                  </span>
                  <FieldInput
                    value={type === 'sku' ? combination.variantSku : combination.variantBarCode}
                    onChange={(e) => handleInputChange(combination.optionName, e.target.value)}
                    className="mb-0" />
                </div>
              )
            ) : (
              combination.options
                .filter((option) => option.isChecked)
                .map((option, optionIndex) => (
                  <div key={optionIndex} className="flex border-b border-gray-200 px-4 py-2 items-center justify-between">
                    <span className="block font-medium text-sm text-secondary">
                      {combination.optionName} / {option.name}
                    </span>
                    <FieldInput
                      value={type === 'sku' ? option.sku : option.barCode}
                      onChange={(e) => handleInputChange(`${combination.optionName} / ${option.name}`, e.target.value)}
                      className="mb-0" />
                  </div>
                ))
            )}
          </div>
        ))}
      </div>
    </Modal>

  );
}
