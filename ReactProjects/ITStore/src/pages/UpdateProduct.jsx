import { useState, useContext } from "react";
import { StockContext } from "../contexts/StockContext";
import  { typesA } from "../pages/CreateProduct"
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import CreateProduct from "../pages/CreateProduct";
//FINALIZAR UpdateProduct: Quando vai pra atualizar, não permite editar valores, e se registro esse update, cria um item vazio no lS: 
UpdateProduct.propTypes = {
    product: PropTypes.object
}
//Semelhante a 'ItemForm.jsx' tanto pra criar como pra atualizar:
export default function UpdateProduct({ product }) {
const {items} = useContext(StockContext);
  const { id } = useParams();
  const currItem = items.find((item) => item.id == parseInt(id));
  const defaultItem = {
    name: "",
    desc: "",
    quantity: 0,
    price: 0.0,
    type: "Processor",
  };
  const [item, setItem] = useState(product ? product : defaultItem);
  const { addItem, updateItem } = useContext(StockContext);
  const handleChange = (e) => {
    setItem((current) => ({ ...current, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (product) {
        updateItem(product.id, item);
        alert("Item successfully updated!");
      } else {
        const validItem = new CreateProduct(item);
        addItem(validItem);
        setItem(defaultItem);
        alert("Item successfully registered!");
      }
    } catch (error) {
      console.log(error.message);
      alert("Error on trying to update item!");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            value={currItem.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description"> Description: </label>
          <textarea
            name="description"
            id="description"
            required
            rows={6}
            value={currItem.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="price">Price: </label>
          <input
            type="number"
            name="price"
            id="price"
            required
            value={currItem.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="quantity"> Quantity: </label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            required
            min={1}
            step={1}
            value={currItem.quantity}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="type">Type: </label>
          <select
            name="type"
            id="type"
            required
            value={currItem.type}
            onChange={handleChange}
          >
            <option disabled value="Select a type...">
              Select a type...
            </option>
            {typesA.map((type) => (
              <option key={type} value={type} defaultChecked={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
          <button type="submit">Register</button>
      </div>
    </form>
  );
}
