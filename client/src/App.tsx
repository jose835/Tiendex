import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Home from './pages/Home';
import AddProduct from './pages/products/AddProduct';
import Products from './pages/products/Products';

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
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
