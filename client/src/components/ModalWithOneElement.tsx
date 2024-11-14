import { useState } from "react";
import FieldInputWithElement from "./forms/FieldInputWithElement";
import Modal from "../layouts/Modal";

interface Props {
  name: string;
  title?: string;
  onClose: () => void;
  onClickSave: (value: string) => void;
}

export default function ModalWithOneElement({ title, name, onClose, onClickSave }: Props) {
  const [value, setValue] = useState<string>('');

  function handleConfirm() {
    onClickSave(value);
    onClose();
  }

  return (
    <Modal name={name} onClickSave={handleConfirm} onClose={onClose}>
      <main className="p-4 md:p-5 space-y-4">
        <FieldInputWithElement
          autofocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          appendChild={<span>C$</span>}
          placeholder="0.00"
          className="mb-0"
          name={title ?? ''}
        />
      </main>
    </Modal>
  );
}
