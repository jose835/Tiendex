import { Dispatch, SetStateAction } from 'react'
import { Delete, GridDots } from '../../../icons/icons';
import FieldInput from '../../../components/forms/FieldInput';
import { Variant } from '../../../types/types';
import FieldInputWithElement from '../../../components/forms/FieldInputWithElement';
import Button from '../../../components/forms/Button';
import { showToast } from '../../../components/Toast';

interface Props {
  variants: Variant[];
  setVariants: Dispatch<SetStateAction<Variant[]>>;
  variant: Variant;
  variantIndex: number;
  handleCheckboxChange: (name: string, value: boolean) => void;
}

export default function FormVariant({ variants, setVariants, handleCheckboxChange, variant, variantIndex }: Props) {
  const handleRemoveOption = (variantIndex: number, optionIndex: number) => {
    const newVariants = [...variants];
    newVariants[variantIndex].options = newVariants[variantIndex].options.filter((_, i) => i !== optionIndex);
    setVariants(newVariants);
  };

  const handleOptionChange = (variantIndex: number, optionIndex: number, name: string) => {
    const newVariants = [...variants];

    const isDuplicate = newVariants[variantIndex].options
      .filter((_, index) => index !== optionIndex)
      .some(option => option.name.trim().toLowerCase() === name.trim().toLowerCase() && name.trim() !== '');

    if (isDuplicate) {
      showToast('El nombre de la opción ya existe', false);
      return;
    }

    newVariants[variantIndex].options[optionIndex].name = name;

    if (optionIndex === newVariants[variantIndex].options.length - 1 && name.trim() !== '') {
      newVariants[variantIndex].options.push({ isChecked: false, name: '', price: 0, quantity: 0, visible: true, barCode: '', sku: '', weight: '', country: '', sellingOutStock: false });
    }

    setVariants(newVariants);
  };

  const handleRemoveVariant = (index: number) => {
    const newVariants = variants.filter((_, i) => i !== index);
    setVariants(newVariants);

    if (newVariants.length === 0) {
      handleCheckboxChange('variant', false);
    }
  };

  const isDoneButtonDisabled = (variant: Variant) => {
    const isDuplicate = variants
      .filter((v) => v !== variant)
      .some(v => v.name.trim().toLowerCase() === variant.name.trim().toLowerCase());

    const hasEmptyOptionNames = variant.options.filter(option => option.name.trim() === '').length > 1;

    return !variant.name.trim() || hasEmptyOptionNames || !variant.options.some(option => option.name.trim()) || isDuplicate;
  };

  const handleVariantNameChange = (index: number, value: string) => {
    const newVariants = [...variants];

    const isDuplicate = newVariants
      .filter((_, i) => i !== index)
      .some(variant => variant.name.trim().toLowerCase() === value.trim().toLowerCase());

    if (isDuplicate) {
      showToast(`Ya has utilizado el nombre de variante "${value}".`, false);
    }

    newVariants[index].name = value;
    setVariants(newVariants);
  };

  return (
    <div className='m-5'>
      <div className="flex items-center mb-3">
        <GridDots />
        <FieldInput
          name="Nombre de variante"
          className="ml-10 w-full"
          value={variant.name}
          onChange={(e) => handleVariantNameChange(variantIndex, e.target.value)}
        />
      </div>

      {variant.options.map((option, optionIndex) => (
        <div key={optionIndex} className="flex items-center mt-2 ml-5">
          <GridDots />
          <FieldInputWithElement
            prependChild={
              variant.options.length > 1 && optionIndex !== variant.options.length - 1 ? (
                <button type="button" onClick={() => handleRemoveOption(variantIndex, optionIndex)}>
                  <Delete className="text-graying size-5 hover:text-secondary/80 cursor-pointer" />
                </button>
              ) : <></>
            }

            name={optionIndex === 0 ? 'Nombre de opción' : ''}
            className="ml-5 w-full"
            value={option.name}
            onChange={(e) => handleOptionChange(variantIndex, optionIndex, e.target.value)}
          />
        </div>
      ))}

      <div className="flex justify-between items-center mt-4 ml-14">
        <Button onClick={() => handleRemoveVariant(variantIndex)} name="Eliminar" className="text-red-800 hover:text-red-900 bg-white/60 border border-gray-300" />
        <Button
          onClick={() => !isDoneButtonDisabled(variant) && setVariants(prev => {
            const updated = [...prev];
            updated[variantIndex].isEditing = false;
            return updated;
          })}
          name="Hecho"
          className="bg-primary text-white"
          disabled={isDoneButtonDisabled(variant)}
        />
      </div>
    </div>
  )
}
