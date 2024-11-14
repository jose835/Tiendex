import DropDown from '../../components/DropDown';
import Button from '../../components/forms/Button';
import { Eye } from '../../icons/icons';

const ProductsHeader = () => {
  return (
    <header className="flex items-center justify-between mb-5">
      <h2 className="text-xl font-bold text-secondary">Productos</h2>
      <div className='flex items-center'>
        <Button name='Exportar' className='bg-[#e3e3e3] shadow-sm hover:bg-[#d4d4d4] mr-3 text-primary' />
        <Button name='Importar' className='bg-[#e3e3e3] shadow-sm hover:bg-[#d4d4d4] mr-3 text-primary' />
        <DropDown name='Mas opciones' options={[
          <li
            className={`flex items-center p-2 rounded-md hover:bg-gray-100`}
          >
            <Eye />
            <a href="#" className="ml-2">Mostrar Barra de Analisis</a>
          </li>,
        ]} />
        <Button name='Nuevo product' className='bg-primary text-white' />
      </div>
    </header>
  );
}

export default ProductsHeader;
