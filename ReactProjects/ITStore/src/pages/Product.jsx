import React from "react";
import { Link, useParams } from "react-router-dom";
import products from "../database.json";

export default function Product() {
  const {id} = useParams()
  const product = products.find((product) => ( product.id == parseInt(id)))
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
              </td>
            </tr>
        </tbody>
      </table>
    </section>
  );
}
