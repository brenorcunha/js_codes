import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { StockContext, StockContextProvider } from "../contexts/StockContext";
import { useContext } from "react"
export default function UpdateProduct({ product}){
    /* This is an example of how to get the products from the DB manually, but here we can't make a proper error-handling
    we create the folder 'loaders/products.js'.
     const {productId} = useSearchParams()
    const product = products.find(p => p.id === +productId)
    throw new Error("Something gone wrong...") */  
    const defaultItem = {
        name: "",
        desc: "",
        quantity: 0,
        price: 0.00,
        type: "Processor"
    }
    const[item, setItem] = useState(product ? product: defaultItem)
    const[addItem, updatedItem] = useContext(StockContext)
    const inputRef = useRef(null)
    const handleChange = (e) =>{
        e.preventDefault()
        try {
            if (product) {
                updateItem(product.id, item)
                alert("Item successfully updated!")
            } else{
                const validItem = new createProduct(item)
                addItem(validItem)
                setItem(defaultItem)
                alert("Item successfully registered!")
            }
        } catch (error) {
            console.log(error.message)
            alert("Error on trying to update item!")
        }
    }
}