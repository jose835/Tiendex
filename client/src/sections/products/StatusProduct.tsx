import FieldSelect from '../../components/forms/FieldSelect';
import { FONTS } from '../../constants/constants';

const StatusProduct = () => (
  <div className="bg-white rounded-lg mt-8 w-full px-3 py-5 md:ml-8">
    <h2 className={`${FONTS.title} mb-3`}>Estado</h2>
    <FieldSelect name="" id="status" options={[
      { name: 'Activo', value: 1 },
      { name: 'Agotado', value: 2 },
    ]} />
  </div>
);

export default StatusProduct;