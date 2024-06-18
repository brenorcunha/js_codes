 import { createBrowserRouter } from "react-router-dom";
import Cart from "./pages/Cart";
import Dashboard from "./pages/Dashboard";
import Home from "./components/Home";
import Products from "./pages/Products";
import Layout from "./pages/Layout";
import Product from "./pages/Product";
import { loadProduct } from "./loaders/products";
import ProductBoundary from "./error-boundaries/productBoundary";

const router= createBrowserRouter([
    {
        path:"/", // Não pode haver rotas vazias aqui! (EX: path: "")
        element: <Layout />,
        children: [{
            index: true,
            element: <Home />
        },{
            path: "/products",
            element: <Products />,
        },{
            path: "/products/:productId",
            element: <Product />,
            loader: loadProduct,
        }, {
            path: "/cart",
            element: <Cart />,
        }, {
            path: "/dashboard",
            element: <Dashboard />,
            errorElement: <ProductBoundary />
        }]
    }
])
export default router;