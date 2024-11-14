import { useState } from "react";
import FieldInputWithElement from "../../../components/forms/FieldInputWithElement";
import FieldSelect from "../../../components/forms/FieldSelect";
import Modal from "../../../layouts/Modal";

interface Props {
  onClose: () => void;
  onClickSave: (value: string) => void;
}

export default function ModalVariantWeigth({ onClose, onClickSave }: Props) {
  const [value, setValue] = useState({
    weight: 0,
    unitMeasureId: 0
  });

  const weights = [
    { name: 'lb', value: 0 },
    { name: 'oz', value: 1 },
    { name: 'kg', value: 2 },
    { name: 'g', value: 3 },
  ]

  return (
    <Modal name="Editar peso" onClose={onClose} onClickSave={() => onClickSave(`${value.weight.toString()} / ${value.unitMeasureId.toString()}`)}>
      <div className="p-4 space-y-2">
        <span className="text-sm font-medium text-secondary">Aplicar un peso a todas las variantes seleccionadas</span>
        <div className="flex items-center space-x-2">
          <FieldInputWithElement
            value={value.weight}
            onChange={(e) => setValue({ ...value, weight: Number(e.target.value) })}
            placeholder="0.0"
            className="mb-0 w-full"
          />
          <FieldSelect
            value={value.unitMeasureId}
            onChange={(valueW) => setValue({ ...value, unitMeasureId: Number(valueW) })}
            options={weights}
            className="w-14"
          />
        </div>
      </div>
    </Modal>
  )
}
