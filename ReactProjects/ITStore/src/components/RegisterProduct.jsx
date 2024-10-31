import CreateProduct, { typesA } from "../pages/CreateProduct";
//Semelhante a 'ItemForm.jsx'.'useStock' decomposto:
import { useContext } from "react";
import { StockContext } from "../contexts/StockContext";
import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

RegisterProduct.propTypes = {
  newProduct: PropTypes.object,
};

export default function RegisterProduct({ newProduct }) {
  const defaultProduct = {
    id: Math.floor(Math.random() * 10000000),
    name: "",
    description: "",
    price: 0.0,
    quantity: 0,
    addDate: new Date(),
    type: "Processor",
  };
  const [item, setItem] = useState(newProduct ? newProduct : defaultProduct);
  const { addItem, updateItem } = useContext(StockContext); //Desestruturando como objetos.

  const handleChange = (event) => {
    setItem((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      if (newProduct) {
        //Bloco de código destinado a encontrar produto no localStorage pelo ID, atualizar seus dados e salvar novamente lá:
        if (index != -1) {
          updateItem(newProduct.id, item);
          localStorage.setItem("stock", JSON.stringify(updateItem));
          alert("Product successfully registered.");
        }
      } else {
        //Bloco de código destinado a registrar produto neste array/ lista no localStorage:
        const validProd = new CreateProduct(item); //Enviará para a função que checa se informações do produto estão válidas.
        addItem(validProd); //Adiciona ao estado.
        setItem(validProd); //Adiciona ao estado.
        alert("Product successfully registered.");
        /* //Grava no localStorage: 
        products.push(validProd);
        localStorage.setItem("stock", JSON.stringify(products)); */
      }
      /* document.getElementById("name").value = "";
      document.getElementById("description").value = "";
      document.getElementById("price").value = "";
      document.getElementById("quantity").value = ""; */
    } catch (error) {
      console.log(error.message);
      alert("An error ocurred!" + error.message);
    }
  };

  return (
    <section>
      <Link to="/products">
        <button> Back </button>
      </Link>
      <form onSubmit={handleSubmit}>
        <h2>Add new Product: </h2>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          value={item.name}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="description">Desc: </label>
        <textarea
          name="description"
          id="description"
          required
          rows={6}
          value={item.description}
          onChange={handleChange}
        ></textarea>

        <br />
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
        <br />
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
        <br />
        <label htmlFor="type">Type: </label>
        <select name="type" id="type" required>
          <option disabled value="Processor">
            Select a type...
          </option>
          {typesA.map((type) => (
            <option key={type} value={type} defaultChecked={type}>
              {type}
            </option>
          ))}
        </select>
        <br />
        <button type="submit"> ADD </button>
      </form>
    </section>
  );
}
