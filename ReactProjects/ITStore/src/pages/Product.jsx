import React from "react";
import { Link, useParams } from "react-router-dom";
import { StockContext } from "../contexts/StockContext";
import { useContext } from "react";
export default function Product() {
  const { Products } = useContext(StockContext)

  const {id} = useParams()
  const product = Products.find((product) => ( product.id == parseInt(id)))
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
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.type}</td>
              <td>
                <Link to={`${product.id}/update`} className="button is-small">
                  Update
                </Link>
                <DeleteButton itemId={product.id} itemName={product.name} />
              </td>
            </tr>
        </tbody>
      </table>
    </section>
  );
}
