import { Link, Outlet, useLocation } from "react-router-dom";
export default function ProductsLayout() {
  const { pathname } = useLocation()

  return (
    <main>
      <h1>Stock Items</h1>
      <div className="tabs">
        {pathname !== "/products" && (
          <Link to="/products" className="button is-primary"> Back </Link>
        )}
        {pathname !=="/products/new" && (
          <Link to="/products/new" className="button is-primary"> New </Link>
        )}
        <br />
      </div>
      <Outlet />
    </main>
  )
}