import { StepsProps } from "../types/types";

const steps: StepsProps[] = [
  {
    title: 'Agrega tu primer producto',
    description: 'Escriba una descripción, incluya imágenes y fije los precios para los productos que tiene en mente vender.',
    buttonSecondary: true,
    buttonName: 'Agregar producto',
    imageUrl: './images/products.jpg'
  },
  {
    title: 'Personaliza tu tienda en linea',
    description: 'Seleccione un tema y personalícelo con su logotipo, paleta de colores e imagenes para representar la identidad de su marca.',
    buttonName: 'Personalizar tema',
    imageUrl: './images/theme.jpg'
  },
  {
    title: 'Nombre de tu tienda',
    description: 'El nombre de tu tienda temporal actualmente es Mi tienda. El nombre de la tienda aparece en su administrador y en su tienda en línea.',
    buttonName: 'Agregar nombre',
    imageUrl: './images/nameStore.jpg'
  },
  {
    title: 'Establece tus tarifas de envío',
    description: 'Elija dónde realiza el envío y cuánto cobra para que sus clientes puedan ver los costos de envío al finalizar la compra.',
    buttonName: 'Establecer Tarifas',
    imageUrl: './images/rates.jpg'
  },
  {
    title: 'Configurar proveedor de pago',
    description: 'Elija un proveedor de pagos para comenzar a aceptar pagos. Deberás crear una cuenta con el proveedor de pagos y configurarla en tu tienda en linea.',
    buttonName: 'Configurar pago',
    imageUrl: './images/payment.jpg'
  },
  {
    title: 'Realizar un pedido de prueba',
    description: 'Asegúrese de que todo funcione sin problemas realizando un pedido de prueba en su propia tienda.',
    buttonName: 'Poner aprueba',
    imageUrl: './images/testOrder.jpg'
  }
];

export const sections = [
  {
    title: 'Vender en linea',
    steps: steps.slice(0, 3)
  },
  {
    title: 'Configuración de almacenamiento',
    steps: steps.slice(3, 5)
  },
  {
    title: 'Lanza tu tienda online',
    steps: steps.slice(5, 6)
  }
];