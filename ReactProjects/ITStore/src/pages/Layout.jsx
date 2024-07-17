import { Link, Outlet } from "react-router-dom";

export default function Layout(){
    return(
        <>
            <header>
                <nav style={{display: "flex", gap: "2rem"}}>
                    <Link to="/">Home</Link>
                    <Link to="/products">Products</Link>
                    <Link to="/cart">Cart</Link>
                </nav>
            </header>
            <main>
                <p>Welcome 2 ITStore website.</p>
                <hr />
                <Outlet />
            </main>
            <footer>
                <hr />
                <p>ITStore. Made with react-router-dom. </p>
            </footer>
        </>
    )
}