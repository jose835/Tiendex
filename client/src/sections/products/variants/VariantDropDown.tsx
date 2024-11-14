import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ModalWithOneElement from "../../../components/ModalWithOneElement";
import { CombinationProps } from "../../../types/types";
import ModalVariantSkuCodeBar from "./ModalVariantSkuCodeBar";
import ModalVariantWeigth from "./ModalVariantWeigth";
import ModalVariantCountry from "./ModalVariantCountry";

interface Props {
  combinations: CombinationProps[];
  setCombinations: Dispatch<SetStateAction<CombinationProps[]>>;
  setIsShowDropDown: Dispatch<SetStateAction<boolean>>;
}

export default function VariantDropDown({ combinations, setCombinations, setIsShowDropDown }: Props) {
  const [shouldDisableSellingOption, setShouldDisableSellingOption] = useState(false);

  useEffect(() => {
    const newShouldDisableSellingOption = combinations
      .filter((combination) => combination.isChecked)
      .every((combination) => {
        if (combination.options.length === 0) {
          return combination.variantSellingOutStock;
        } else {
          return combination.options.every((option) => option.isChecked && option.sellingOutStock);
        }
      });

    setShouldDisableSellingOption(newShouldDisableSellingOption);
  }, [combinations, setCombinations]);

  interface OptionsModalProps {
    name: string;
    disabled?: boolean;
    modalName?: keyof typeof showModal;
  }

  const [showModal, setShowModal] = useState({
    ModalPrice: false,
    ModalQuantity: false,
    ModalSku: false,
    ModalBarCode: false,
    ModalWeight: false,
    ModalCountry: false,
  });

  const options: OptionsModalProps[] = [
    { name: 'Editar precio', modalName: 'ModalPrice' },
    { name: 'Editar cantidad', modalName: 'ModalQuantity' },
    { name: 'Editar SKU', modalName: 'ModalSku' },
    { name: 'Editar código de barra', modalName: 'ModalBarCode' },
    { name: 'Editar peso', modalName: 'ModalWeight' },
    { name: 'Editar país/región de origen', modalName: 'ModalCountry' },
    { name: 'Agregar imagen' },
    { name: 'Eliminar imagen' },
    { name: 'Eliminar variante' },
  ];

  function handleShowModal(name: keyof typeof showModal, value: boolean) {
    setShowModal({ ...showModal, [name]: value });
  }

  function clearVariants() {
    setIsShowDropDown(false);
    setCombinations((prevCombinations) =>
      prevCombinations.map((combination) => ({
        ...combination,
        isChecked: false,
        options: combination.options.map((option) => ({
          ...option,
          isChecked: false,
        })),
      }))
    );
  }

  function handleChangeValue(field: 'price' | 'quantity' | 'weight' | 'country' | 'sellingOutStock', newValue: string | boolean) {
    setCombinations((prevCombinations) =>
      prevCombinations.map((combination) => {
        if (combination.isChecked && combination.options.length === 0) {
          return {
            ...combination,
            [field === 'price' ? 'variantPrice' : field === 'weight' ? 'variantWeight' : field === 'country' ? 'variantCountry' : 'variantQuantity']: newValue,
          };
        } else if (combination.options.length > 0) {
          const updatedOptions = combination.options.map((option) =>
            option.isChecked
              ? {
                ...option,
                [field]: newValue
              }
              : option
          );

          return {
            ...combination,
            options: updatedOptions,
            [field === 'price' ? 'variantPrice' : field === 'weight' ? 'variantWeight' : field === 'country' ? 'variantCountry' : 'variantQuantity']:
              updatedOptions.some((option) => option.isChecked)
                ? newValue
                : combination[field === 'price' ? 'variantPrice' : field === 'weight' ? 'variantWeight' : field === 'country' ? 'variantCountry' : 'variantQuantity'],
          };
        }
        return combination;
      })
    );

    clearVariants();
  }

  return (
    <>
      <div className="absolute top-10 right-3 border border-gray-300 bg-white rounded-lg shadow-md z-50">
        <ul className="px-2 pt-2 pb-1 text-sm text-primary font-medium">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleShowModal(option.modalName ?? 'ModalPrice', true)}
              className="flex cursor-pointer items-center p-2 rounded-md hover:bg-gray-100"
            >
              <span className="text-right text-primary font-semibold">
                {option.name}
              </span>
            </li>
          ))}
          <li className={`flex cursor-pointer items-center p-2 rounded-md ${!shouldDisableSellingOption && 'hover:bg-gray-100'}`}>
            <button
              onClick={() => handleChangeValue('sellingOutStock', true)}
              disabled={shouldDisableSellingOption}
              className={`text-right ${shouldDisableSellingOption ? 'text-whiting/60' : 'text-primary'} font-semibold`}>
              Continuar vendiendo cuando las existencias estén agotadas
            </button>
          </li>
          <li className={`flex cursor-pointer items-center p-2 rounded-md ${shouldDisableSellingOption && 'hover:bg-gray-100'}`}>
            <button
              onClick={() => handleChangeValue('sellingOutStock', false)}
              disabled={!shouldDisableSellingOption}
              className={`text-right ${!shouldDisableSellingOption ? 'text-whiting/60' : 'text-primary'} font-semibold`}>
              Dejar de vender cuando no haya existencias
            </button>
          </li>
        </ul >
      </div >
      {
        showModal.ModalPrice && (
          <ModalWithOneElement
            onClickSave={(value) => handleChangeValue('price', value)}
            name="Edita los precios"
            onClose={() => {
              clearVariants();
              handleShowModal('ModalPrice', false);
            }}
          />
        )
      }
      {
        showModal.ModalQuantity && (
          <ModalWithOneElement
            onClickSave={(value) => handleChangeValue('quantity', value)}
            name="Edita las cantidades"
            onClose={() => {
              clearVariants();
              handleShowModal('ModalQuantity', false);
            }}
          />
        )
      }
      {
        showModal.ModalSku && (
          <ModalVariantSkuCodeBar
            type="sku"
            combinations={combinations}
            onClose={() => {
              clearVariants();
              handleShowModal('ModalSku', false);
            }}
            setCombinations={setCombinations}
          />
        )
      }
      {
        showModal.ModalBarCode && (
          <ModalVariantSkuCodeBar
            type="barcode"
            combinations={combinations}
            onClose={() => {
              clearVariants();
              handleShowModal('ModalBarCode', false);
            }}
            setCombinations={setCombinations}
          />
        )
      }
      {
        showModal.ModalWeight && (
          <ModalVariantWeigth
            onClickSave={(value) => handleChangeValue('weight', value)}
            onClose={() => {
              clearVariants();
              handleShowModal('ModalWeight', false);
            }}
          />
        )
      }
      {
        showModal.ModalCountry && (
          <ModalVariantCountry
            onClickSave={(value) => handleChangeValue('country', value)}
            onClose={() => {
              clearVariants();
              handleShowModal('ModalCountry', false);
            }}
          />
        )
      }
    </>
  );
}
