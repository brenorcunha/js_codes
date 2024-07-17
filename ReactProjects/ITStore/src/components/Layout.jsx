import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <header>
        <nav style={{ display: "flex", gap: "2rem" }}>
          <Link to="/" className="logo">
            Stock
          </Link>
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart</Link>
        </nav>
      </header>
      <main>
        <p> Welcome to ITStore.</p>
        <hr />
        <Outlet />
        {/* Responsável por colocar o conteúdo das outras pags aqui. */}
      </main>
      <footer>
        <hr />
        <p>ITStore. Made with 'react-router-dom'. </p>
      </footer>
    </>
  );
}
