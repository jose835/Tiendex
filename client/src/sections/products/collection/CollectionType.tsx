import { Dispatch, SetStateAction } from 'react'
import RadioButtonFill from '../../../components/forms/RadioButtonFill'

interface Props {
  collectionType: 'AUTOMATIC' | 'MANUAL';
  setCollectionType: Dispatch<SetStateAction<'AUTOMATIC' | 'MANUAL'>>;
}

export default function CollectionType({ collectionType, setCollectionType }: Props) {
  return (
    <div className="bg-white border border-gray-300 shadow-sm rounded-lg mt-4 px-4 py-5">
      <h2 className={`font-semibold text-secondary text-sm mb-3`}>Tipo de colección</h2>
      <div className="mt-6 space-y-4">

        <div>
          <RadioButtonFill onClick={() => setCollectionType('MANUAL')} active={collectionType === 'MANUAL'} className="size-[18px]" classNameOption="size-[9px]" name="Manual" />
          <div className="ml-8 flex">
            <span className="text-xs mt-2 leading-5 font-medium text-secondary/80">Agrega los productos seleccionados a esta colección uno por uno.
              Leer más acerca de <span className="text-blueprimary hover:text-bluesecondary underline cursor-pointer">colecciones manuales.</span></span>
          </div>
        </div>

        <div>
          <RadioButtonFill
            onClick={() => setCollectionType('AUTOMATIC')}
            active={collectionType === 'AUTOMATIC'}
            name="Inteligente"
            className="size-[18px]"
            classNameOption="size-[9px]"
          />
          <div className="ml-8">
            <span className="text-xs mt-2 leading-5 font-medium text-secondary/80">
              Los productos existentes y futuros que coincidan con las condiciones establecidas se agregarán automáticamente
              a esta colección. Leer más acerca de <span className="text-blueprimary hover:text-bluesecondary underline cursor-pointer">colecciones inteligentes.</span>
            </span>
          </div>
        </div>
      </div>
    </div>

  )
}
