import Container from '../../layouts/Container';
import { useEffect, useState } from 'react';
import ProductsHeader from '../../sections/productList/ProductHeader';
import ProductsFilters from '../../sections/productList/ProductFilter';
import ProductTable from '../../sections/productList/ProductTable';
import Welcome from './Welcome';
import { ProductProps } from '../../types/types';

export default function Products() {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [activeFilter, setActiveFilter] = useState<number>(0);
  const [showOptions, setShowOptions] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const filters = ['Todos', 'Activos', 'Borradores', 'Archivados'];

  useEffect(() => {
    async function loadProducts() {
      setIsLoading(true);
      // const { data } = await getProducts();
      // setProducts(data);
      setIsLoading(false);
    }

    loadProducts();
  }, []);

  if (isLoading) return null;

  return (
    <Container>
      <section>
        {products.length !== 0 ? (
          <>
            <ProductsHeader />
            <ProductsFilters
              filters={filters}
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
            />
            <ProductTable
              products={products}
              showOptions={showOptions}
              setShowOptions={setShowOptions}
            />
          </>
        ) : (
          <Welcome />
        )}
      </section>
    </Container>
  );
}
