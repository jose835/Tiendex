import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Home from './pages/Home';
import AddProduct from './pages/products/AddProduct';
import Products from './pages/products/Products';
import Collections from './pages/products/collection/Collections';
import AddCollection from './pages/products/collection/AddCollection';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: '/products/add',
    element: <AddProduct />
  },
  {
    path: '/products',
    element: <Products />
  },
  {
    path: '/collections',
    element: <Collections />
  },
  {
    path: '/collections/add',
    element: <AddCollection />
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
