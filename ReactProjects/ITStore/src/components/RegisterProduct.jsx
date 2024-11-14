//Semelhante a 'ItemForm.jsx'.
import CreateProduct, { typesA } from "../pages/CreateProduct";
import { useContext, useEffect, useState } from "react";
import { StockContext } from "../contexts/StockContext";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

RegisterProduct.propTypes = {
  product: PropTypes.object,
};

export default function RegisterProduct() {
  let { id } = useParams();
  const defaultProduct = {
    name: "",
    description: "",
    price: 0.0,
    quantity: 0,
    type: " ",
    addDate: new Date(),
  };

  const [item, setItem] = useState(defaultProduct);
  const { addItem, updateItem } = useContext(StockContext); //Desestruturando como objetos.
  
//Esse useEffect deve obter os dados do localStorage e disponibilizá-los para edição e salvá-los lá.
  useEffect(() => {
    /* const stock = JSON.parse(localStorage.getItem("stock")) || [];
    const product = stock.find((prod) => prod.id === id);
    if (product) {
      setItem(product);
    } */
      const stock = localStorage.getItem("stock");
      if (stock) {
        const product = JSON.parse(stock);
        setItem(product);
      }
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setItem((current) => ({
      ...current,
      [name]: value,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      if (id) {
        updateItem(id, item);
        alert("Product successfully updated!");
        //const index = localStorage.getItem("stock").findIndex((prod) => prod.id === id)
      } else {
        //Bloco de código destinado a registrar produto no localStorage:
        let validProd = new CreateProduct(item); //Enviará para a função que checa se informações do produto estão válidas.
        addItem(validProd); //Adiciona ao estado.
        setItem(defaultProduct); //Adiciona ao estado.
        alert("Product successfully registered.");

        /* document.getElementById("name").value = "";
        document.getElementById("description").value = "";
        document.getElementById("price").value = 0.00;
        document.getElementById("quantity").value = 0; */
      }
    } catch (error) {
      alert("An error ocurred!" + error.message);
    }
  };

  return (
    <div className="row">
      <form onSubmit={handleSubmit}>
        <h2>{id ? "Edit product: " : "Add new Product:"}</h2>
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
          <select
            name="type"
            id="type"
            required
            value={item.type}
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
        <button type="submit">{id ? "Update" : "Register:"}</button>
      </form>
    </div>
  );
}
