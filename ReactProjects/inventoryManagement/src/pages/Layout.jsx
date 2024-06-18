import { Link, Outlet } from "react-router-dom";

export default function Layout(){
    return(
        <>
            <header>
                <nav style={{display: "flex", gap: "2rem"}}>
                    <Link to="/">Home</Link>
                    <Link to="/products">Products</Link>
                    <Link to="/cart">Cart</Link>
                    <Link to="/dashboard">Dashboard</Link>
                </nav>
            </header>
            <main>
                <p>This is MAIN layout. Below is the dynamic content of each child route.</p>
                <hr />
                <Outlet />
            </main>
            <footer>
                <hr />
                <p>Made with react-router-dom. 2024 </p>
            </footer>
        </>
    )
}