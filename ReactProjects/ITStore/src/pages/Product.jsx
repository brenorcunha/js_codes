import React from "react";
import { Link, useParams } from "react-router-dom";
import { StockContext } from "../contexts/StockContext";
import { useContext } from "react";
import DeleteButton from "../components/DeleteButton"
export default function Product() {
  const {items} = useContext(StockContext);
  const { id } = useParams();
  const item = items.find((item) => item.id == parseInt(id));
  return (
    <section>
      <Link to="/products">
        <button>Back</button>
      </Link>
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
              <Link to={`${item.id}/update`} className="button is-primary is-small">
                Update
              </Link>
              <DeleteButton itemId={item.id} itemName={item.name} />
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
