import React from 'react';
import RadioButton from './forms/RadioButton';
import { StepsProps } from '../types/types';

interface Props extends StepsProps {
  onClick: () => void;
  active: boolean;
}

export default function Steps({ title, description, buttonSecondary = false, active = false, buttonName, imageUrl, onClick }: Props) {
  return (
    <div className={`flex justify-between mx-3 rounded-md transition-all duration-300 ${active ? 'py-4 bg-whiting2' : 'py-2'} mb-2 px-2`}>
      <div className="max-w-screen-md">
        <button onClick={onClick} className={`${!active ? 'cursor-pointer' : ''} w-full`}>
          <RadioButton name={title} active={active} />
        </button>
        <div
          className={`ml-10 transition-all duration-300 ${active ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
        >
          <p className="mr-24 text-secondary font-medium text-xs">{description}</p>
          <button
            className="px-5 py-2 mt-5 mb-5 font-semibold inline-block shadow-lg shadow-gray-500/50 bg-black text-white rounded-lg text-xs">
            {buttonName}
          </button>

          {buttonSecondary &&
            <button
              className="px-5 ml-3 py-2 mt-5 font-semibold inline-block text-primary hover:bg-white/40 rounded-lg text-xs">
              Importar productos
            </button>
          }
        </div>
      </div>
      {active && (
        <img
          src={imageUrl}
          width={200}
          alt="Imagen de productos variados para vender en ecommerces"
          className="transition-opacity duration-500"
          style={{ opacity: active ? 1 : 0 }}
        />
      )}
    </div>
  );
}
