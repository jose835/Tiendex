import { useState } from 'react';
import FieldInputWithElement from '../../../components/forms/FieldInputWithElement';
import DropDown from '../../../components/DropDown';
import RadioButtonFill from '../../../components/forms/RadioButtonFill';
import { Check, Delete, Plus, Search } from '../../../icons/icons';
import ButtonWithElement from '../../../components/forms/ButtonWithElement';
import { v4 as uuid } from 'uuid';

interface ConditionsValueProps {
  name: string;
  options: string[];
}

interface Condition {
  id: string;
  name: string;
  option: string;
  type: "string" | "number" | "weigth" | "search";
  value: string;
}

export default function CollectionIntelligent() {
  const [conditionType, setConditionType] = useState<'ALL' | 'ANY'>('ALL');
  const conditionsByStrings = ['es igual a', 'no es igual a', 'comienza con', 'termina en', 'contiene', 'no contiene'];
  const conditionsByNumbers = ['es igual a', 'no es igual a', 'es mayor que', 'es menor que'];
  const CONDITIONS_NAME = [
    { name: 'Titulo', type: 'string' },
    { name: 'Tipo', type: 'string' },
    { name: 'Categoria', type: 'search' },
    { name: 'Proveedor', type: 'string' },
    { name: 'Etiqueta', type: 'string' },
    { name: 'Precio', type: 'number' },
    { name: 'Precio de comparación', type: 'number' },
    { name: 'Peso', type: 'weigth' },
    { name: 'Existencia de inventario', type: 'number' },
    { name: 'Titulo de la variante', type: 'string' }
  ];

  const CONDITIONS_VALUE: ConditionsValueProps[] = [
    { name: 'Titulo', options: conditionsByStrings },
    { name: 'Tipo', options: conditionsByStrings },
    { name: 'Categoria', options: conditionsByStrings.slice(0, 2) },
    { name: 'Proveedor', options: conditionsByStrings },
    { name: 'Etiqueta', options: conditionsByStrings.slice(0, 1) },
    { name: 'Precio', options: conditionsByNumbers },
    { name: 'Precio de comparación', options: [...conditionsByNumbers, 'no está vacio', 'está vacío'] },
    { name: 'Peso', options: conditionsByNumbers },
    { name: 'Existencia de inventario', options: [...conditionsByNumbers.slice(0, 1), ...conditionsByNumbers.slice(2, 4)] },
    { name: 'Titulo de la variante', options: conditionsByStrings },
  ];

  const [conditions, setConditions] = useState<Condition[]>([
    { id: uuid(), name: 'Titulo', option: conditionsByStrings[0], value: '', type: 'string' },
  ]);

  const [filterText, setFilterText] = useState<string>(''); // Estado para el filtro
  const [filteredConditionsName, setFilteredConditionsName] = useState(CONDITIONS_NAME); // Estado para las condiciones filtradas

  const addCondition = () => {
    setConditions((prev) => [
      ...prev,
      { id: uuid(), name: 'Titulo', option: conditionsByStrings[0], value: '', type: 'string' },
    ]);
  };

  const updateCondition = (id: string, field: keyof Condition, value: string) => {
    const option = CONDITIONS_VALUE.find(item => item.name === value)?.options[0] || '';
    const foundType = CONDITIONS_NAME.find(item => item.name === value)?.type as Condition["type"] || "string";

    setConditions((prev) =>
      prev.map((cond) =>
        cond.id === id ? { ...cond, type: foundType, option, [field]: value } : cond
      )
    );
  };

  const removeCondition = (id: string) => {
    setConditions((prev) => prev.filter((cond) => cond.id !== id));
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilterText(value);
    // Filtrar las condiciones mientras escribes
    const updatedFilteredConditionsName = CONDITIONS_NAME.filter(item =>
      item.name.toLowerCase().includes(value.toLowerCase().trim())
    );
    setFilteredConditionsName(updatedFilteredConditionsName);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      if (filteredConditionsName.length > 0) {
        const firstMatch = filteredConditionsName[0].name;

        setConditions((prev) => prev.map((condition) =>
          condition.name === '' ? { ...condition, name: firstMatch } : condition
        ));

        setFilteredConditionsName(CONDITIONS_NAME);
        setFilterText('');
      }
    }
  };

  return (
    <div className="mx-4 pb-4">
      <div className="flex items-center justify-between">
        <h5 className="text-sm font-medium text-secondary/80">Los productos deben coincidir con:</h5>
        <RadioButtonFill
          name="todas las condiciones"
          active={conditionType === 'ALL'}
          onClick={() => setConditionType('ALL')}
          className="size-4"
          classNameOption="size-2"
        />
        <RadioButtonFill
          active={conditionType === 'ANY'}
          onClick={() => setConditionType('ANY')}
          name="cualquier condición"
          className="size-4"
          classNameOption="size-2"
        />
      </div>

      {conditions.map((condition) => (
        <div key={condition.id} className="flex mt-2 items-center space-x-3 justify-between">
          <DropDown
            topChildren={
              <FieldInputWithElement
                className='mb-0'
                onChange={handleFilterChange} // Manejar el cambio del input
                onKeyDown={handleKeyDown} // Detectar la tecla Enter
                value={filterText} // El valor del input es el estado del filtro
                appendChild={<Search className='size-5' />}
              />
            }
            name={condition.name}
            classNameDropDown="w-60"
            classNameContainer="w-full"
            className="bg-transparent w-full"
            options={filteredConditionsName.map((item, index) => (
              <li
                key={index}
                onClick={() => updateCondition(condition.id, 'name', item.name)}
                className={`flex justify-between text-[13.5px] cursor-pointer items-center px-2 py-1.5 ${condition.name === item.name ? 'bg-gray-100 rounded-md' : ''
                  }`}
              >
                <span className={`text-right text-secondary ${condition.name === item.name ? 'font-semibold' : 'font-medium'}`}>
                  {item.name}
                </span>
                {condition.name === item.name && <Check className="size-4" />}
              </li>
            ))}
          />
          <DropDown
            name={condition.option || 'Condición'}
            classNameContainer="w-full"
            classNameDropDown='w-48'
            vertical="top"
            className="bg-transparent w-full"
            options={
              CONDITIONS_VALUE.find((cond) => cond.name === condition.name)?.options.map((option, index) => (
                <li
                  key={index}
                  onClick={() => updateCondition(condition.id, 'option', option)}
                  className={`${option === condition.option ? 'bg-gray-100 rounded-md' : ''} flex justify-between cursor-pointer items-center px-2 py-1.5`}
                >
                  <span className="text-secondary font-medium">{option}</span>
                  {option === condition.option && <Check className="size-4" />}
                </li>
              )) || []
            }
          />

          <FieldInputWithElement
            appendChild={condition.type === 'number' ? <span className='font-medium text-sm text-secondary'>C$</span> : condition.type === 'search' ? <Search className='size-5' /> : <></>}
            prependChild={condition.type === 'weigth' ? <span className='font-medium text-sm text-secondary'>Kg</span> : <></>}
            className="mb-0 w-full"
            value={condition.value}
            onChange={(e) => updateCondition(condition.id, 'value', e.target.value)}
          />
          {conditions.length > 1 &&
            <button
              onClick={() => removeCondition(condition.id)} className='shadow-default active:shadow-pressed p-1.5 bg-white rounded-lg'>
              <Delete className='size-5 text-secondary/80' />
            </button>
          }
        </div>
      ))}

      <ButtonWithElement name="Agregar otra condición"
        appendIcon={<Plus className='size-4 mr-2' />}
        style='primary'
        className="bg-white mt-3 text-primary p-2"
        onClick={addCondition} />
    </div>
  );
}
