import { createContext, useState } from "react";
import products from "../database.json"

export const StockContext = createContext({})

StockContextProvider.propTypes = {
    children: propTypes.node
}

export function StockContextProvider({children}){
    const [items, setItems] = useState(() => {
        const stockData = products.reduce((sum, product) => sum+(product.quantity), 0)
        setItems(stockData)
        if(!stockData) return []
        const items = JSON.parse(stockData)
        items.forEach(item => {
            item.addDate = new Date(item.addDate)
        });
        return items
    })
    const addItem = (item) =>{
        setItems(current => {
            products.push()
        })
    }
    return(
    <StockContextProvider value={stock}>
        {children}
    </StockContextProvider>
    )
}