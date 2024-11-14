import Container from '../../layouts/Container';
import GeneralInformation from '../../sections/products/GeneralInformation';
import StatusProduct from '../../sections/products/StatusProduct';
import InventoryProduct from '../../sections/products/InventoryProduct';
import PriceProduct from '../../sections/products/PriceProduct';
import ShippingProduct from '../../sections/products/ShippingProduct';
import PublicationProduct from '../../sections/products/PublicationProduct';
import OrganizationProduct from '../../sections/products/OrganizationProduct';
import { Back } from '../../icons/icons';
import { useRef, useState } from 'react';
import VariantProduct from '../../sections/products/variants/VariantProduct';
import { FONTS } from '../../constants/constants';
import { AddProductProps, ProductProps } from '../../types/types';
import { createProduct } from '../../api/inventory/product';
import { showToast } from '../../components/Toast';

export default function AddProduct() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<AddProductProps>({
    subCategoryId: '',
    name: '',
    description: '',
    state: true,
    productCollection: '',
    productOrigin: '',
    productType: '',
    productTag: '',
    productVendor: '',
    sku: '',
    barCode: '',
    minStock: 0,
    sellOutStock: false,
    unitMeasureId: '',
    weight: 0,
    price: 0,
    comparePrice: 0,
    cost: 0,
    isTax: false,
    product_variants: []
  });

  const [showInputs, setShowInputs] = useState({
    sku: false,
    physical: true,
    customInformation: false,
    variant: false,
    minStock: false
  });

  const handleCheckboxChange = (name: string, value: boolean) => {
    setShowInputs((prevState) => ({ ...prevState, [name]: value }));
  };

  function handleInputChange(key: keyof AddProductProps, value: any) {
    setFormData({ ...formData, [key]: value });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();

    const newProduct: ProductProps = {
      name: formData.name,
      description: formData.description,
      state: formData.state,
      subCategoryId: formData.subCategoryId,
      product_price: {
        price: formData.price,
        comparePrice: formData.comparePrice,
        cost: formData.cost,
        revenue: formData.price - formData.cost,
        margin: ((formData.price - formData.cost) / formData.price) * 100,
        isTax: formData.isTax
      },
      organization_product: {
        productType: formData.productType,
        productVendor: formData.productVendor,
        productCollection: formData.productCollection,
        productTag: formData.productTag,
        productOrigin: formData.productOrigin
      },
      product_inventory: {
        unitMeasureId: formData.unitMeasureId,
        weight: formData.weight,
        minStock: formData.minStock,
        sellOutStock: formData.sellOutStock
      },
      product_identifier: {
        sku: formData.sku,
        barCode: formData.barCode
      },
      product_variants: []
    }

    const { success, error } = await createProduct(newProduct);

    if (success) {
      showToast('Producto agregado exitosamente', true);
    } else {
      showToast(error.message, false);
    }
  }

  function handleClickSubmit() {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  }

  return (
    <Container text='Producto sin guardar' save onSaveClick={handleClickSubmit}>
      <section className="flex flex-col items-center h-full">
        <div className="max-w-screen-lg mt-5 w-full mx-auto">
          <header className="flex items-center">
            <Back />
            <h2 className="ml-4 text-lg font-semibold text-secondary">Agregar producto</h2>
          </header>

          <main className="flex flex-col md:flex-row items-start">
            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col md:flex-row items-start">
              <div className="flex-1 md:w-auto w-full">
                <GeneralInformation formData={formData} handleInputChange={handleInputChange} />
                <InventoryProduct formData={formData} handleInputChange={handleInputChange} showInputs={showInputs} handleCheckboxChange={handleCheckboxChange} />
                <PriceProduct handleInputChange={handleInputChange} formData={formData} />
                <ShippingProduct handleInputChange={handleInputChange} formData={formData} showInputs={showInputs} handleCheckboxChange={handleCheckboxChange} />
                <VariantProduct showInputs={showInputs} handleCheckboxChange={handleCheckboxChange} />

                <div className="bg-white rounded-lg mt-8 px-4 py-5">
                  <div className='flex items-center justify-between'>
                    <h2 className={`${FONTS.title} mb-2`}>Listado de motores de búsqueda</h2>
                    <button className='text-[#4781d0] text-sm font-semibold hover:underline'>Editar</button>
                  </div>
                  <p className={FONTS.subtitle}>Add a title and description to see how this product might appear in a search engine listing</p>
                </div>
              </div>

              <div className="w-full md:w-1/3">
                <StatusProduct />
                <PublicationProduct />
                <OrganizationProduct formData={formData} handleInputChange={handleInputChange} />
              </div>
            </form>
          </main>
        </div>
      </section >
    </Container >
  );
}