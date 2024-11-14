import ToolTip from "../../components/forms/ToolTip";
import { Filter, Search, Sort } from "../../icons/icons";

interface ProductsFiltersProps {
  filters: string[];
  activeFilter: number;
  setActiveFilter: (index: number) => void;
}

const ProductsFilters: React.FC<ProductsFiltersProps> = ({ filters, activeFilter, setActiveFilter }) => {
  return (
    <div className='border-x border-t py-2 px-3 bg-white items-center justify-between border-gray-300 rounded-t-lg flex'>
      <div className="flex">
        {filters.map((filter, index) => (
          <button
            onClick={() => setActiveFilter(index)}
            key={index}
            className={`${index === activeFilter ? 'bg-whiting2' : 'bg-transparent'} mr-2 p-2 font-semibold rounded-md text-[13px] text-secondary/90`}>
            {filter}
          </button>
        ))}
      </div>
      <div className="flex items-center">
        <div data-tooltip-id="search" className='bg-white text-secondary/80 cursor-pointer shadow-md border border-gray-300 h-7 px-1.5 ml-1 flex items-center justify-center rounded-md'>
          <Search size={20} />
          <Filter />
          <ToolTip id="search" title="Buscar y filtar (F)" />
        </div>
        <div data-tooltip-id="sort" className='bg-white cursor-pointer shadow-md p-1 border border-gray-300 size-7 text-secondary/80 ml-1 flex items-center justify-center rounded-md'>
          <Sort />
          <ToolTip id="sort" title="Ordenar" />
        </div>
      </div>
    </div>
  );
}

export default ProductsFilters;
