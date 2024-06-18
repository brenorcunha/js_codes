import { Outlet } from "react-router-dom";
import products from "../database.json"

export default function Products(){
    return (
        <section>
            <header>
                < Outlet />
            </header>
            <h2>All of the products: </h2>
            <p>Check our Offers</p>
                <h3>All of the products</h3>
                <ul>
                    {products.map((product) =>(
                        <li key={product.id}>
                            <h4>{product.name}</h4>
                            <p>Price: {product.price}</p>
                            <button>See it</button>
                            <button>My purchases</button>
                        </li>
                    ))}
                </ul>
        </section>
    )}