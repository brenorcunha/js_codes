import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import products from "../database.json"

export default function Dashboard(){
    const [items, setItems] = useState(0)
    const [recentItems, setRecentItems] = useState([])
    const [lowStockItems, setLowStockItems] = useState([])
    
    useEffect(() => {
        const stockData = products.reduce((sum, product) => sum+(product.quantity), 0)
        setItems(stockData)
        const tenDaysAgo = new Date(new Date().setDate(new Date().getDate() - 10))
        const recent = products.filter(item => new Date(item.addDate)>=tenDaysAgo)
        setRecentItems(recent)
        setLowStockItems(products.filter(item => item.quantity < 10))
        /* 
        //Carry data from lOCAL_STORAGE
        const stockData = JSON.parse(localStorage.getItem('stock')) || []
        setItems(stockData)

        // Filtrar itens adicionados nos últimos 10 dias[^1^][1][^2^][2]: 
        const tenDaysAgo = new Date(new Date().setDate(new Date().getDate() - 10))
        const recent = stockData.filter(item => new Date(item.addDate)>=tenDaysAgo)
        setRecentItems(recent)

        //Products with less than 10 items in stock:
        stockData.filter(item => item.quantity < 10)
        */
    }, [])
    return (
        <main>
            <header>
            <Outlet />
            </header>
            <h2>Dashboard</h2>
            <div className="main">
                <p className="cell">Total quantity of different items: {new Set (products.map(product => product.type)).size}</p>
                <p className="cell">Total quantity of all items: {items}</p>
                <p className="cell">Added items last 10 days: {recentItems.length}</p>
                <p className="cell">Quantity of low-stock items: {lowStockItems.length}</p>
            </div>
            <div className="cell2">
                <p>Added items in last 10 days: </p>
                <ul>{recentItems.map(item => <li key={item.id}>{item.name}-{item.quantity}</li>)}</ul>
                <p>Low-stock items:</p>
                <ul>{lowStockItems.map(item => <li key={item.id}>{item.name}-{item.quantity}</li>)}</ul>
            </div>
        </main>
    )
}