 import { createBrowserRouter } from "react-router-dom";
import Cart from "./pages/Cart";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Layout from "./pages/Layout";
import Product from "./pages/Product";
import RegisterProduct from "./pages/createProduct";
import UpdateProduct from "./pages/UpdateProduct";
import ProductsLayout from "./components/productsLayout";

const router= createBrowserRouter([
    {
        path:"/", // Não pode haver rotas vazias aqui! (EX: path: "")
        element: <Layout />,
        children: [{
            index: true,
            element: <Dashboard />
        },{
            path: "/products",
            element: <ProductsLayout />,
            children: [
                {index: true, element: <Products />},
                {path: "new", element: <RegisterProduct />},
                {path: ":id", element: <Product />},
                {path: ":id/update", element: <UpdateProduct />}
            ]
        },{
            path: "/cart",
            element: <Cart />,
        }]
    }
])
export default router;