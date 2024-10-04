import { Link } from "react-router-dom";
import { useState } from "react";

const typesA = [
  "Processor",
  "RAM Memory",
  "Graphics Card",
  "Motherboard",
  "Cooler",
];
/* const saveData = (newProduct)  =>{
  axios.post('http://localhost:3000/save', newProduct)
  .then(response =>{console.log('Data successfully sent!', response.data)})
  .catch(error =>{console.error('CHANFLE! Error on trying to send data!')}) 
} */
function handleSubmit(event) {
  event.preventDefault();
  try {
    let newProduct = {
      id: Math.floor(Math.random() * 10000000),
      name: document.getElementById('name').value,
      description: document.getElementById('description').value,
      price: parseFloat(document.getElementById('price').value,10),
      quantity: parseInt(document.getElementById('quantity').value,10),
      addDate: new Date(),
      type: document.getElementById('type').value
      };
      validate(newProduct);
      let products = JSON.parse(localStorage.getItem('stock')) || []
      products.push(newProduct)
      localStorage.setItem('stock', JSON.stringify(products));
      alert("Product saved successfully")
      document.getElementById('name').value = ""
      document.getElementById('description').value = ""
      document.getElementById('price').value = ""
      document.getElementById('quantity').value = ""
} catch (error) {
    console.log(error.message);
    alert("An error ocurred!"+ error.message);
  }
}

function validate(product) {
  const validName = typeof product.name === "string"
  const validDescription = typeof product.description === "string"
  const validQuantity = typeof product.quantity === "number" && Number.isInteger(product.quantity)
  const validPrice = typeof product.price === "number"
  const validType = typesA.includes(product.type)
  if (
    !validName ||
    !validDescription ||
    !validQuantity ||
    !validPrice ||
    !validType
  ) {
    throw new Error("Invalid item!")
  }
}
export default function registerProduct(){
  return (
    <section>
      <Link to="/products">
        <button> Back </button>
      </Link>
      <form onSubmit={handleSubmit}>
        <h2>Add new Product: </h2>
        <label htmlFor="name">Name: </label>
        <input type="text" name="name" id="name" required/>
        <br />
        <label htmlFor="description">Desc: </label>
        <textarea
          name="description"
          id="description"
          required
          rows={6}
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
          />
        <br />
        <label htmlFor="quantity">Quantity: </label>
        <input type="number" name="quantity" id="quantity" required min={0}
          step={1}
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

export class createProduct {
  constructor(name, description, price, quantity, type) {
    this.name = name,
    this.description = description,
    this.price = price,
    this.quantity = quantity,
    this.type = type
  }
}
