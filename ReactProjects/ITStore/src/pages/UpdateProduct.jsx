import { useRef, useState } from "react";
import { StockContext } from "../contexts/StockContext";
import { useContext } from "react"
export default function UpdateProduct({ product}){
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
                updatedItem(product.id, item)
                alert("Item successfully updated!")
            } else{
                const validItem = new CreateProduct(item)
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