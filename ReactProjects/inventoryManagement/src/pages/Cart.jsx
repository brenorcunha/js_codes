import { Outlet } from "react-router-dom";

export default function Cart(){
    return(
        <section>
            <header>
                <Outlet />
            </header>
            <h2>Cart</h2>
            <ul></ul>
            <button>Finish purchase</button>
        </section>

    )
}