import { Outlet } from "react-router-dom";
import { StockContext } from "../contexts/StockContext";
import React, { useContext, useState } from "react";
import RemoveButton from "../components/RemoveButton";

export default function Cart() {
  const [quantity, setQuantity] = useState(1);

  function handleClick(ev) {
    ev.preventDefault();
    let qte = quantity + 1;
    setQuantity(qte);
  }
  
  const { cart } = useContext(StockContext);

  return (
    <section>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cart.length>0 ? (
          cart.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>R$ {item.price}</td>
              <td>{quantity} unit.</td>
              <td>{item.type}</td>
              <td>
                <button onClick={handleClick}> + </button>
                <RemoveButton itemId={item.id} />
              </td>
            </tr>
          )) 
        ): (<tr><td>Cart is empty</td></tr>)}
        </tbody>
      </table>
      <button type="submit"> Finish Purchase</button>
    </section>
  );
}
