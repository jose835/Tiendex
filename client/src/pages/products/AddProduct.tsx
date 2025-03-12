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
import { AddProductProps, CombinationProps, Variant } from '../../types/types';
import { supabase } from '../../api/supabase-client';
import { showToast } from '../../components/Toast';

export default function AddProduct() {
  const INITIAL_FORM_DATA = {
    categoryId: '',
    name: '',
    description: '',
    state: 0,
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
  }

  const [formData, setFormData] = useState<AddProductProps>(INITIAL_FORM_DATA);
  const formRef = useRef<HTMLFormElement>(null);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [combinations, setCombinations] = useState<CombinationProps[]>([]);

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

    const newProduct = {
      name: formData.name,
      description: formData.description,
      category_id: formData.categoryId,
      state: formData.state,
    }
    console.log(newProduct)

    const { error } = await supabase.from('product').insert(newProduct);

    if (error) {
      showToast(error.message, false);
    } else {
      showToast('Producto creado exitosamente', true);
    }

    // const productPrice = {
    //   "product": productId,
    //   "price": formData.price,
    //   "comparePrice": formData.comparePrice,
    //   "cost": formData.cost,
    //   "isTax": formData.isTax
    // }

    if (variants.length === 0) {
      // await createProductPrice(productPrice);
    } else {
      // saveVariants(productId)
    }

    // if (success) {
    //   showToast('Producto agregado exitosamente', true);
    //   clearForm();
    // } else {
    //   showToast(error.message, false);
    // }
  }

  // function saveVariants(productId: string) {
  //   // variants.forEach(async (variant) => {
  //   //   // const newVariant = {
  //   //   //   productId: productId,
  //   //   //   name: variant.name,
  //   //   //   options: variant.options.filter(option => option.name.trim() !== '').map(option => option.name)
  //   //   // }

  //   //   // await createVariant(newVariant);
  //   // })

  //   saveCombinations(productId);
  // }

  // function saveCombinations(productId: string) {
  //   combinations.forEach(async (combination) => {
  //     const newCombination = {
  //       productId: productId,
  //       name: combination.optionName,
  //       options: combination.options.map(option => {
  //         return {
  //           name: option.name,
  //           price: option.price
  //         }
  //       }),
  //       price: combination.variantPrice
  //     }

  //     await createCombination(newCombination);
  //   })
  // }

  function handleClickSubmit() {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  }

  // function clearForm() {
  //   setFormData(INITIAL_FORM_DATA)
  //   setVariants([])
  //   setCombinations([])
  // }

  return (
    <Container text='Producto sin guardar' save onSaveClick={handleClickSubmit}>
      <section className="flex flex-col items-center h-full">
        <div className="max-w-screen-lg mt-5 w-full mx-auto">
          <header className="flex items-center ">
            <Back />
            <h2 className="ml-4 text-lg font-semibold text-secondary">Agregar Producto</h2>
          </header>

          <main className="flex flex-col xl:flex-row items-start">
            <form ref={formRef} onSubmit={handleSubmit} className="flex space-x-6 flex-col xl:flex-row items-start">
              <div className="flex-1 xl:w-auto w-full">
                <GeneralInformation formData={formData} handleInputChange={handleInputChange} />
                <InventoryProduct formData={formData} handleInputChange={handleInputChange} showInputs={showInputs} handleCheckboxChange={handleCheckboxChange} />
                <PriceProduct handleInputChange={handleInputChange} formData={formData} />
                <ShippingProduct handleInputChange={handleInputChange} formData={formData} showInputs={showInputs} handleCheckboxChange={handleCheckboxChange} />
                <VariantProduct combinations={combinations} setCombinations={setCombinations} setVariants={setVariants} variants={variants} showInputs={showInputs} handleCheckboxChange={handleCheckboxChange} />

                <div className="bg-white rounded-lg mt-8 px-4 py-5 border border-gray-300">
                  <div className='flex items-center justify-between'>
                    <h2 className={`font-semibold text-[15px] mb-2`}>Listado de motores de búsqueda</h2>
                    <button className='text-[#4781d0] text-sm font-semibold hover:underline'>Editar</button>
                  </div>
                  <p className="font-medium text-secondary text-sm">Add a title and description to see how this product might appear in a search engine listing</p>
                </div>
              </div>

              <div className="w-full xl:w-1/3">
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