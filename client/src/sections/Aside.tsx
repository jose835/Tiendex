import { useState } from "react";
import MenuItem from "../components/MenuItem";
import SalesChannel from "../components/SalesChannels";
import { Content, Customers, Discount, Home, Marketing, Orders, Products, Sales, Settings, Store } from "../icons/icons";

function Aside() {
  const [activeItem, setActiveItem] = useState<number>(1);

  const menuItems = [
    { id: 1, Icon: Home, text: "Inicio" },
    { id: 2, Icon: Orders, text: "Pedidos" },
    { id: 3, Icon: Products, text: "Productos" },
    { id: 4, Icon: Customers, text: "Clientes" },
    { id: 5, Icon: Content, text: "Contenido" },
    { id: 6, Icon: Marketing, text: "Marketing" },
    { id: 7, Icon: Discount, text: "Descuentos" }
  ];

  const salesChannels = [
    { id: 8, Icon: Store, text: "Tienda en Linea", showEyeIcon: true },
    { id: 9, Icon: Sales, text: "Punto de Venta" }
  ];

  return (
    <aside className='[grid-area:aside] flex-col flex overflow-hidden p-6 bg-whiting2'>
      {menuItems.map(({ id, text, Icon: icon }) => (
        <button key={id} onClick={() => setActiveItem(id)} className="w-full">
          <MenuItem Icon={icon} text={text} className={id === activeItem ? 'bg-white py-1' : ''} />
        </button>
      ))}

      <div className="mt-5">
        <h2 className="font-bold text-whiting mb-2 text-sm">Canales de Ventas</h2>
        {salesChannels.map(({ id, text, Icon: icon, showEyeIcon }) => (
          <button key={id} onClick={() => setActiveItem(id)} className="w-full">
            <SalesChannel Icon={icon} text={text} showEyeIcon={showEyeIcon} />
          </button>
        ))}
      </div>

      <MenuItem Icon={Settings} text="Configuraciones" className="mt-auto" />
    </aside>
  );
}

export default Aside;
