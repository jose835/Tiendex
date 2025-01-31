import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import Modal from '../../layouts/Modal';
import { ProductActive, ProductProps } from '../../types/types';
import { Content, Search } from '../../icons/icons';
import { getProducts } from '../../api/inventory/product';
import CheckBox from '../../components/forms/CheckBox';
import FieldInputWithElement from '../../components/forms/FieldInputWithElement';

interface Props {
  onClose: () => void;
  productsActive: ProductActive[];
  text: string;
  setProductsActive: Dispatch<SetStateAction<ProductActive[]>>;
}

export default function ProductModal({ text, onClose, productsActive, setProductsActive }: Props) {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const productsRef = useRef<ProductProps[]>([]);
  const [textSearch, setTextSearch] = useState<string>('');

  useEffect(() => {
    async function loadProducts() {
      const { data } = await getProducts();
      setProducts(data);
      productsRef.current = data;
      setTextSearch(text)
    }

    loadProducts();
  }, [text]);

  useEffect(() => {
    if (textSearch.trim() !== '') {
      const filteredProducts = products.filter((product) => {
        const searchKeywords = textSearch.toLowerCase().split(" ");
        return searchKeywords.every((keyword) =>
          product.name.toLowerCase().includes(keyword) ||
          product.product_identifier.sku.toLowerCase().includes(keyword) ||
          product.product_identifier.barCode.toLowerCase().includes(keyword)
        );
      });

      setProducts(filteredProducts);
      return;
    }

    setProducts(productsRef.current);
  }, [textSearch, products]);

  const handleChangeProduct = (product: ProductProps, isChecked: boolean) => {
    if (isChecked) {
      setProductsActive((prev) => [
        ...prev,
        { IDProduct: product.productId, name: product.name, state: product.state },
      ]);
    } else {
      setProductsActive((prev) =>
        prev.filter((p) => p.IDProduct !== product.productId)
      );
    }
  };

  return (
    <Modal classNameModal='min-h-[400px]' name="Añadir producto" onClose={onClose}>
      <>
        <div className='px-4 py-3 border-b border-gray-300'>
          <FieldInputWithElement
            value={textSearch}
            onChange={(e) => setTextSearch(e.target.value)}
            autofocus
            appendChild={<Search />}
            className='mb-0'
            placeholder='Buscar productos'
          />
        </div>

        {products.map((product, index) => {
          const isChecked = productsActive.some(
            (productActive) => productActive.name === product.name
          );

          return (
            <div
              onClick={() => handleChangeProduct(product, !isChecked)}
              className="py-2 px-4 cursor-pointer border-b flex items-center space-x-4 border-gray-300"
              key={index}
            >
              <CheckBox
                initialValue={isChecked}
                onChange={(value) => handleChangeProduct(product, value)}
              />
              <div className="flex size-10 items-center justify-center border border-gray-300 rounded-md">
                <Content className="size-5 text-graying" />
              </div>
              <span className="text-sm font-medium text-primary">{product.name}</span>
            </div>
          );
        })}
      </>
    </Modal>
  );
}
