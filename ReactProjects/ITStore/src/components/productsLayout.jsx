import { Link, Outlet, useLocation } from "react-router-dom";
import products from "../database.json"

export default function ProductsLayout() {
  const { pathname } = useLocation()

  return (
    <main>
      <h1>Stock Items</h1>
      <div className="tabs">
        <Link to="/products" className="button"> All </Link>
        <Link to="/products/new" className="button"> New </Link>
      </div>
      <Outlet />
    </main>
  )
}