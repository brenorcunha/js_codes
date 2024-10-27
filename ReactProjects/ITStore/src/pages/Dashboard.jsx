import { Outlet, useParams } from "react-router-dom";
import { StockContext } from "../contexts/StockContext";
import React, { useContext } from "react";

export default function Dashboard() {
  const { items } = useContext(StockContext);
  // Filtrar itens adicionados nos últimos 10 dias[^1^][1][^2^][2]:
  const tenDaysAgo = new Date(new Date().setDate(new Date().getDate() - 10));
  const recentItems = items.filter((item) => item.addDate >= tenDaysAgo);

  //Products with less than 10 items in stock:
  const lowStockItems = items.filter((item) => item.quantity < 10);
  return (
    <main>
      <header>
        <Outlet />
      </header>
      <h2>Dashboard</h2>
      <div className="main">
        <p className="cell">
          Total quantity of different items:{" "}
          {new Set(items.map((product) => product.type)).size}
        </p>
        <p className="cell">
          Total quantity of all items:{" "}
          {items.reduce((total, item) => total + item.quantity, 0)}
        </p>
        <p className="cell">Added items last 10 days: {recentItems.length}</p>
        <p className="cell">
          Quantity of low-stock items: {lowStockItems.length}
        </p>
      </div>
      <div className="cell2">
        <p>Added items in last 10 days: </p>
        <ul>
          {recentItems.map((item) => (
            <li key={item.id}>
              {item.name}-{item.quantity}
            </li>
          ))}
        </ul>
        <p>Low-stock items:</p>
        <ul>
          {lowStockItems.map((item) => (
            <li key={item.id}>
              {item.name}-{item.quantity}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
