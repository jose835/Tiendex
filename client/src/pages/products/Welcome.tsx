import ButtonWithElement from "../../components/forms/ButtonWithElement";
import { Import, Plus } from "../../icons/icons";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigation = useNavigate();

  return (
    <div className="h-full">
      <header className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-secondary">Productos</h2>
      </header>

      <main className="border border-gray-300 shadow-sm rounded-lg">
        <section className="flex bg-white rounded-t-lg items-center justify-between py-10 px-32">
          <div className="w-1/2">
            <h3 className="text-xl font-semibold text-primary">Agrega tus productos</h3>
            <p className={`font-medium text-secondary text-sm mt-2 w-full`}>Comience por abastecer su tienda con productos que a sus clientes les encantarán</p>
            <div className="mt-5">
              <ButtonWithElement onClick={() => navigation('/products/add')} className="bg-primary text-white shadow-lg border border-gray-300" name="Nuevo producto" appendIcon={<Plus className="mr-1 size-5" />} />
              <ButtonWithElement className="bg-white text-primary shadow-lg border ml-3 border-gray-300" name="Importar" appendIcon={<Import className="mr-1 size-5" />} />
            </div>
          </div>
          <img className="w-1/3 h-2/3" src="https://cdn.shopify.com/shopifycloud/web/assets/v1/vite/client/en/assets/empty-state-personalized-Bu4xlcHV0rQu.svg" />
        </section>
        <footer className="bg-[#f7f7f7] w-full rounded-b-lg px-32 py4 h-32 flex flex-col justify-center">
          <h3 className="text-base font-semibold text-primary">Busca tus producto</h3>
          <p className={`font-medium text-secondary text-xs max-w-[70%]  mt-2 w-full`}>Haga que los productos de envío directo o impresión bajo demanda se envíen directamente desde el proveedor a su cliente, y pague solo por lo que vende.</p>
        </footer>
      </main>
    </div>
  );
}
