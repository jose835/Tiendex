import { Dispatch, SetStateAction, useState } from "react";
import ModalWithOneElement from "../../../components/ModalWithOneElement";
import { CombinationProps, Variant } from "../../../types/types";
import ModalVariantSkuCodeBar from "./ModalVariantSkuCodeBar";
import ModalVariantWeigth from "./ModalVariantWeigth";
import ModalVariantCountry from "./ModalVariantCountry";

interface Props {
  combinations: CombinationProps[];
  setVariants: Dispatch<SetStateAction<Variant[]>>;
  setCombinations: Dispatch<SetStateAction<CombinationProps[]>>;
  setIsShowDropDown: Dispatch<SetStateAction<boolean>>;
  getCheckedCount: () => number;
}

export default function VariantDropDown({
  combinations,
  setCombinations,
  setIsShowDropDown,
  getCheckedCount,
  setVariants,
}: Props) {
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
    { name: `Editar precio${getCheckedCount() > 1 ? 's' : ''}`, modalName: 'ModalPrice' },
    { name: `Editar cantidad${getCheckedCount() > 1 ? 'es' : ''}`, modalName: 'ModalQuantity' },
    { name: `Editar ${getCheckedCount() > 1 ? 'las' : ''} SKU`, modalName: 'ModalSku' },
    { name: `Editar código${getCheckedCount() > 1 ? 's' : ''} de barra`, modalName: 'ModalBarCode' },
    { name: 'Editar peso', modalName: 'ModalWeight' },
    { name: 'Editar país/región de origen', modalName: 'ModalCountry' },
    { name: `Agregar imagen${getCheckedCount() > 1 ? 'es' : ''}` },
    { name: `Eliminar imagen${getCheckedCount() > 1 ? 'es' : ''}` },
  ];

  const getSellingOutStockStatus = () => {
    const stockStatuses = combinations
      .filter((combination) => combination.isChecked)
      .map((combination) => {
        if (combination.options.length === 0) {
          return combination.variantSellingOutStock;
        } else {
          return combination.options
            .filter((option) => option.isChecked)
            .map((option) => option.sellingOutStock);
        }
      })
      .flat();

    const allTrue = stockStatuses.every((status) => status === true);
    const allFalse = stockStatuses.every((status) => status === false);

    if (allTrue) {
      return "todo";
    } else if (allFalse) {
      return "nadie";
    } else {
      return "mixto";
    }
  };

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

  function handleChangeValue(
    field: "price" | "quantity" | "weight" | "country" | "sellingOutStock" | "isEliminated",
    newValue: string | boolean
  ) {
    setCombinations((prevCombinations) =>
      prevCombinations.map((combination) => {
        if (combination.isChecked && combination.options.length === 0) {
          return {
            ...combination,
            [field === "price"
              ? "variantPrice"
              : field === "weight"
                ? "variantWeight"
                : field === "country"
                  ? "variantCountry"
                  : field === "sellingOutStock"
                    ? "variantSellingOutStock"
                    : field === "isEliminated"
                      ? "variantIsEliminated"
                      : "variantQuantity"]: newValue,
          };
        } else if (combination.options.length > 0) {
          const updatedOptions = combination.options.map((option) =>
            option.isChecked
              ? {
                ...option,
                [field]: newValue,
              }
              : option
          );

          return {
            ...combination,
            options: updatedOptions,

          };
        }
        return combination;
      })
    );

    clearVariants();
  }
  
  function handleEliminatedVariants() {
    setCombinations(prevCombinations =>
      prevCombinations.map(combination => {
        // Si no hay opciones en la combinación, solo actualizamos variantIsEliminated a true
        if (combination.options.length === 0) {
          if (combination.isChecked) {
            return { ...combination, variantIsEliminated: true };
          } else {
            return combination;
          }
        }

        const allOptionsChecked = combination.options.filter(option => !option.isEliminated).every(option => option.isChecked);

        if (allOptionsChecked) {
          // Solo actualizamos la variante si hay una coincidencia con el nombre de la combinación
          setVariants(prevVariant => {
            const updatedVariants = [...prevVariant];

            const targetVariant = updatedVariants.find(variant => variant.name === combination.variantName);

            if (targetVariant) {
              targetVariant.options = targetVariant.options.filter(option => option.name !== combination.optionName);
            }

            return updatedVariants;
          });

          return combination; // Retornamos la combinación tal cual (sin eliminarla del array)
        } else {
          const updatedOptions = combination.options.map(option => ({
            ...option,
            isEliminated: option.isChecked ? true : option.isEliminated,
          }));

          return { ...combination, options: updatedOptions }; // Retornamos la combinación actualizada con opciones
        }
      })
    );
    clearVariants(); // Llamamos a la función clearVariants después de actualizar combinaciones
  }

  return (
    <>
      <div className="absolute top-[75px] right-2 border border-gray-300 bg-white rounded-lg shadow-md z-50">
        <ul className="px-2 pt-2 pb-1 text-sm text-primary font-medium">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() =>
                handleShowModal(option.modalName ?? "ModalPrice", true)
              }
              className="flex cursor-pointer items-center p-2 rounded-md hover:bg-gray-100"
            >
              <span className="text-right text-primary font-semibold">
                {option.name}
              </span>
            </li>
          ))}
          <li
            className={`flex cursor-pointer items-center p-2 rounded-md ${getSellingOutStockStatus() !== 'todo' || getSellingOutStockStatus() === 'mixto' ? "hover:bg-gray-100" : ""}`}
          >
            <button
              onClick={() => handleChangeValue("sellingOutStock", true)}
              disabled={getSellingOutStockStatus() === 'todo'}
              className={`text-right ${getSellingOutStockStatus() === 'todo' ? "text-whiting/60" : "text-primary"} font-semibold`}
            >
              Continuar vendiendo cuando las existencias estén agotadas
            </button>
          </li>

          <li
            className={`flex cursor-pointer items-center p-2 rounded-md ${getSellingOutStockStatus() !== 'nadie' || getSellingOutStockStatus() === 'mixto' ? "hover:bg-gray-100" : ""}`}
          >
            <button
              onClick={() => handleChangeValue("sellingOutStock", false)}
              disabled={getSellingOutStockStatus() === 'nadie'}
              className={`text-right ${getSellingOutStockStatus() === 'nadie' ? "text-whiting/60" : "text-primary"} font-semibold`}
            >
              Dejar de vender cuando no haya existencias
            </button>
          </li>
          <li
            className="flex cursor-pointer items-center p-2 rounded-md hover:bg-gray-100"
          >
            <button onClick={handleEliminatedVariants} className="text-primary font-semibold">
              Eliminar variante{getCheckedCount() > 1 ? 's' : ''}
            </button>
          </li>
        </ul>
      </div>

      {showModal.ModalPrice && (
        <ModalWithOneElement
          onClickSave={(value) => handleChangeValue("price", value)}
          name="Edita los precios"
          onClose={() => {
            clearVariants();
            handleShowModal("ModalPrice", false);
          }}
        />
      )}
      {showModal.ModalQuantity && (
        <ModalWithOneElement
          onClickSave={(value) => handleChangeValue("quantity", value)}
          name="Edita las cantidades"
          onClose={() => {
            clearVariants();
            handleShowModal("ModalQuantity", false);
          }}
        />
      )}
      {showModal.ModalSku && (
        <ModalVariantSkuCodeBar
          type="sku"
          combinations={combinations}
          onClose={() => {
            clearVariants();
            handleShowModal("ModalSku", false);
          }}
          setCombinations={setCombinations}
        />
      )}
      {showModal.ModalBarCode && (
        <ModalVariantSkuCodeBar
          type="barcode"
          combinations={combinations}
          onClose={() => {
            clearVariants();
            handleShowModal("ModalBarCode", false);
          }}
          setCombinations={setCombinations}
        />
      )}
      {showModal.ModalWeight && (
        <ModalVariantWeigth
          onClickSave={(value) => handleChangeValue("weight", value)}
          onClose={() => {
            clearVariants();
            handleShowModal("ModalWeight", false);
          }}
        />
      )}
      {showModal.ModalCountry && (
        <ModalVariantCountry
          onClickSave={(value) => handleChangeValue("country", value)}
          onClose={() => {
            clearVariants();
            handleShowModal("ModalCountry", false);
          }}
        />
      )}
    </>
  );
}
