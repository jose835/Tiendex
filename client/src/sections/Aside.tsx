import { useState } from "react";
import MenuItem from "../components/MenuItem";
import SalesChannel from "../components/SalesChannels";
import { Content, Customers, Discount, Home, Marketing, Orders, Products, Sales, Settings, Store } from "../icons/icons";

interface Props {
  isSidebarOpen: boolean;
}

function Aside({ isSidebarOpen }: Props) {
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
    <aside className={`fixed rounded-tl-lg flex flex-col justify-between bottom-0 z-50 left-0 w-64 bg-whiting2 p-6 overflow-y-auto transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:relative lg:w-[300px] lg:z-auto`}>
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
