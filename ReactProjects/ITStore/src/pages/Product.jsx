import React from "react";
import { useParams } from "react-router-dom";
import { StockContext } from "../contexts/StockContext";
import { useContext } from "react";
import DeleteButton from "../components/DeleteButton"
import UpdateButton from "../components/UpdateButton";
import CartButton from "../components/CartButton";

export default function Product() {
  const { items } = useContext(StockContext);
  const { id } = useParams();
  const item = items.find((item) => item.id == parseInt(id)) || [];
  if(!item){
    <div>Item not found!</div>
  }
  return (
    <section>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{item.name}</td>
            <td>{item.description}</td>
            <td>{item.price}</td>
            <td>{item.quantity}</td>
            <td>{item.type}</td>
            <td>
              <UpdateButton itemId={item.id} itemName={item.name}/>
              <DeleteButton itemId={item.id} itemName={item.name} />
              <CartButton item={item}/>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
