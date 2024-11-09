import CreateProduct, { typesA } from "../pages/CreateProduct";
//Semelhante a 'ItemForm.jsx'.'useStock' decomposto:
import { useContext } from "react";
import { StockContext } from "../contexts/StockContext";
import { useState } from "react";
import PropTypes from "prop-types";

RegisterProduct.propTypes = {
  product: PropTypes.object,
};
// PROBLEMA: Se add o produto como está, dá que não encontrou o ID, se add um ID, nome e descrição ficam como indefinidos.
export default function RegisterProduct({ product }) {
  const defaultProduct = {
    name: "",
    description: "",
    price: 0.0,
    quantity: 0,
    type: "Processor",
    addDate: new Date(),
  };
  const [item, setItem] = useState(product ? product : defaultProduct);
  const { addItem, updateItem } = useContext(StockContext); //Desestruturando como objetos.

  const handleChange = (event) => {
    const {name, value} = event.target;
    setItem((current) =>({
      ...current,
      [name]: value,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      if(product){
        const index = localStorage.getItem("stock").findIndex((prod) => prod.id === product.id)
        if(index != -1){
          updateItem(product.id, item)
          alert("Product successfully registered!");
        }
      } else {
        //Bloco de código destinado a registrar produto neste array/ lista no localStorage:
        let validProd = new CreateProduct(item); //Enviará para a função que checa se informações do produto estão válidas.
        addItem(validProd); //Adiciona ao estado.
        setItem(defaultProduct); //Adiciona ao estado.
        alert("Product successfully registered.");
        /* document.getElementById("name").value = "";
        document.getElementById("description").value = "";
        document.getElementById("price").value = "";
        document.getElementById("quantity").value = ""; */
      }
    } catch (error) {
      alert("An error ocurred!" + error.message);
    }
  };

  return (
    <div className="row">
      <form onSubmit={handleSubmit}>
        <h2>Add new Product: </h2>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            value={item.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Desc: </label>
          <textarea
            name="description"
            id="description"
            required
            rows={6}
            value={item.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label htmlFor="price">Price: </label>
          <input
            type="number"
            name="price"
            id="price"
            required
            min={0.0}
            step={0.01}
            value={item.price}
            onChange={handleChange}
          />
          </div>
        <div>
          <label htmlFor="quantity">Quantity: </label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            required
            min={0}
            step={1}
            value={item.quantity}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="type">Type: </label>
          <select name="type" id="type" required value={item.type} onChange={handleChange}>
            <option disabled value="Select a type...">
              Select a type...
            </option>
            {typesA.map((type) => (
              <option key={type} value={type} defaultChecked={type}>
                {type}
              </option>
            ))}
          </select>
        </ div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
