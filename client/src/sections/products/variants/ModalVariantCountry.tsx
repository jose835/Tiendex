import { useEffect, useState } from 'react'
import Modal from '../../../layouts/Modal'
import { CategoryOption, CountryProps } from '../../../types/types';
import { getCountries } from '../../../api/general/general';
import Select from '../../../components/forms/Select';
import { Help } from '../../../icons/icons';
import ToolTip from '../../../components/forms/ToolTip';

interface Props {
  onClose: () => void;
  onClickSave: (value: string) => void;
}

export default function ModalVariantCountry({ onClose, onClickSave }: Props) {
  const [countries, setCountries] = useState<CategoryOption[]>([]);
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    async function loadCountries() {
      const { data }: { data: CountryProps[] } = await getCountries();
      const formatData = data.map((item) => ({ label: item.name, value: item.countryId }));
      setCountries(formatData);
    }

    loadCountries();
  }, [])

  return (
    <Modal name='Editar país/región de origen' onClickSave={() => onClickSave(value)} onClose={onClose}>
      <div className='p-4'>
        <div className='flex items-center mb-2 space-x-2'>
          <span className='text-sm font-medium text-secondary'>Aplicar el país o región de origen a todas las variantes seleccionadas</span>
          <span data-tooltip-id='help'><Help className='text-secondary/80 cursor-pointer size-5' /></span>
          <ToolTip id='help' title='En la mayoría de los casos, donde se fabricó o ensambló el producto.' />
        </div>
        <Select
          placeholder='Seleccionar'
          value={countries}
          onChange={(value) => setValue(value)}
        />
      </div>
    </Modal>
  )
}
