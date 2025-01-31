import Point from '../../components/Point';
import { Calendar } from '../../icons/icons';

const PublicationProduct = () => (
  <div className="bg-white rounded-lg mt-4 w-full px-3 py-5 md:ml-8">
    <h2 className={`font-semibold text-[15px] text-sm`}>Publicación</h2>
    <span className="text-secondary text-sm font-medium my-2 inline-block">Canales de venta</span>
    <div className="flex items-center justify-between pr-4 mb-1">
      <Point name="Tienda en linea" />
      <button>
        <Calendar />
      </button>
    </div>
    <div>
      <Point name="Punto de venta" />
      <span className="text-[13px] mr-6 inline-block ml-4 text-whiting font-medium">
        Point of Sale has not been set up. Finish the remaining steps to start selling in person.
      </span>
    </div>

    <span className="text-secondary text-sm font-medium mt-4 inline-block">Marcadores</span>
    <Point name="Internacional y Nicaragua" />
  </div>
);

export default PublicationProduct;
