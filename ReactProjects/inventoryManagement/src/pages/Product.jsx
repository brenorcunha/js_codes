import { Link } from "react-router-dom";

export default function Product(){
    /* This is an example of how to get the products from the DB manually, but here we can't make a proper error-handling
    we create the folder 'loaders/products.js'.
     const {productId} = useSearchParams()
    const product = products.find(p => p.id === +productId)
    throw new Error("Something gone wrong...") */

    return(
        <section>
            <Link to="/products">
                <button> Back </button>
            </Link>
            <h2>Product name: </h2>
            <p>Product description: </p>
            <p>Price: R$ </p>
            <button>Purchase!</button>
        </section>
    )
}