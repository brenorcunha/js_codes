import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import products from "../database.json";

export default function Products() {
  return (
    <section>
      <Link to="/products">
        <button> Back </button>
      </Link>
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
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>R$ {product.price}</td>
              <td>{product.quantity} unit.</td>
              <td>{product.type}</td>
              <td>
                <Link
                  to={`${product.id}`}
                  className="button is-primary is-small"
                >
                  See
                </Link>
                <br />
                <Link
                  to={`${product.id}/update`}
                  className="button is-small"
                >
                  Update
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
