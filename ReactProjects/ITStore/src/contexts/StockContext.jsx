import { createContext, useState, useEffect } from "react";
import PropTypes, { func } from "prop-types";

export const StockContext = createContext([])

StockContextProvider.propTypes = {
    children: PropTypes.node
}

function StockContextProvider({children}){
    const [items, setItems] = useState(() => {
        const storedItems = localStorage.getItem('stock')
        if(!storedItems) {return []}
        else{
            const items = JSON.parse(storedItems)
            items.forEach(item => {
                item.addDate = new Date(item.addDate)
            });
            return items;
        }
    })
    //For get sure the data will be read often from the localStorage: 
    useEffect(() => {
        const storedItems = localStorage.getItem('stock')
        if(storedItems){
            const items=JSON.parse(storedItems)
            items.forEach(item => {
                item.addDate = new Date(item.addDate)
            });
            setItems(items)
        }
    }, [])
    const addItem = (item) =>{
        setItems(current => {
            const updatedItems = [item, ...current]
            localStorage.setItem('stock'), JSON.stringify(updatedItems)
            return updatedItems
        })
    }
    const getItem = (itemId) => {
        return items.find(i => i.id === +itemId)
    }
    const updateItem = (itemId, newAttributes) => (
        setItems(current => {
            const itemIndex = current.findIndex(i => i.id === +itemId)
            const updatedItems = [...current]
            Object.assign(updatedItems[itemIndex], newAttributes)
            localStorage.setItem('stock', JSON.stringify(updatedItems))
            return updatedItems
        })
    )
    const deleteItem = (itemId) => {
        setItems(current =>{
            const updatedItems = current.filter(item => item.id!== itemId)
            localStorage.setItem('stock', JSON.stringify(updatedItems))
            return updatedItems
        })
    }
    const stock={
        items, addItem, getItem, updateItem, deleteItem
    }
    return(
    <StockContextProvider value={stock}>
        {children}
    </StockContextProvider>
    )
}
export default StockContextProvider;