import { useRef, useState } from "react";
import Container from "../../../layouts/Container";
import { Back } from "../../../icons/icons";
import FieldInput from "../../../components/forms/FieldInput";
import TextArea from "../../../components/forms/TextArea";
import { ProductActive } from "../../../types/types";
import ProductModal from "../../../sections/products/ProductModal";
import CollectionType from "../../../sections/products/collection/CollectionType";
import CollectionManual from "../../../sections/products/collection/CollectionManual";
import CollectionIntelligent from "../../../sections/products/collection/CollectionIntelligent";


export default function AddProduct() {
  const formRef = useRef<HTMLFormElement>(null);
  const [collectionType, setCollectionType] = useState<'AUTOMATIC' | 'MANUAL'>('AUTOMATIC');
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [productsActive, setProductsActive] = useState<ProductActive[]>([]);
  const [textSearch, setTextSearch] = useState<string>('');

  function handleClickSubmit() {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  }

  return (
    <Container text='Producto sin guardar' save onSaveClick={handleClickSubmit}>
      <>
        <section className="flex flex-col items-center h-full">
          <div className="max-w-screen-lg mt-5 w-full mx-auto">
            <header className="flex items-center">
              <Back />
              <h2 className="ml-4 text-lg font-semibold text-secondary">Crear colección</h2>
            </header>
            <form ref={formRef} className="flex flex-col md:flex-row items-start">
              <div className="flex-1 md:w-auto w-full">
                <div className="bg-white border border-gray-300 shadow-sm rounded-lg mt-8 px-4 py-5">
                  <FieldInput name="Nombre" id="name" placeholder="Ej: Colleción de verano, menos de $100" />
                  <TextArea name="Descripción" id="description" rows={8} />
                </div>

                <CollectionType collectionType={collectionType} setCollectionType={setCollectionType} />

                <div className="bg-white border border-gray-300 shadow-sm rounded-lg mt-4 pt-5">
                  <h3 className="text-sm mb-2 font-semibold mx-4 text-secondary">{collectionType === 'AUTOMATIC' ? 'Condiciones' : 'Productos'}</h3>

                  {collectionType === 'MANUAL' ? (
                    <CollectionManual
                      textSearch={textSearch}
                      setTextSearch={setTextSearch}
                      setIsShowModal={setIsShowModal}
                      productsActive={productsActive}
                      setProductsActive={setProductsActive}
                    />
                  ) : (
                    <CollectionIntelligent />
                  )}
                </div>

                <div className="bg-white rounded-lg mt-8 px-4 py-5">
                  <div className='flex items-center justify-between'>
                    <h2 className={`font-semibold text-[15px] mb-2`}>Listado de motores de búsqueda</h2>
                    <button className='text-[#4781d0] text-sm font-semibold hover:underline'>Editar</button>
                  </div>
                  <p className="font-medium text-secondary text-sm">Add a title and description to see how this product might appear in a search engine listing</p>
                </div>
              </div>

              <div className="w-full md:w-1/3">

              </div>
            </form>
          </div>
        </section>
        {isShowModal && <ProductModal text={textSearch} productsActive={productsActive} setProductsActive={setProductsActive} onClose={() => { setTextSearch(''); setIsShowModal(false) }} />}
      </>
    </Container >
  );
}