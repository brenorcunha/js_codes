import { Link } from "react-router-dom";
import products from '../database.json';
import { useState } from "react";
import axios from "axios";

const typesA = [
  "Processor",
  "RAM Memory",
  "Graphics Card",
  "Motherboard",
  "Cooler",
];
const saveData = (newProduct)  =>{
  axios.post('http://localhost:3000/save', newProduct)
  .then(response =>{console.log('Data successfully sent!', response.data)})
  .catch(error =>{console.error('CHANFLE! Error on trying to send data!')}) 
}
export default function createProduct() {
  const [name, setName] = useState("")
  const [desc, setDesc] = useState("")
  const [price, setPrice] = useState(0.00)
  const [quantity, setQuantity] = useState(1)
  const [type, setType] = useState("")

  const handleSubmit = (event, res) => {
    event.preventDefault();
    try {
      let newProduct = {
        id: Math.floor(Math.random() * 10000000),
        name: name,
        description: desc,
        price: price,
        quantity: quantity,
        addDate: new Date(),
        type: type
      };
      saveData(newProduct, res)
      //localStorage.setItem('newProduct', JSON.stringify(newProduct))
      //products.push(newProduct)
    } catch (error) {
      console.log(error.message)
      alert("An error ocurred!")
    }
  };
  
  const handleName = (event) =>{
    setName((current) => ({...current, [event.target.name]: [event.target.value]}))
  }
  const handleDescription = (event) =>{
    setDesc((current) => ({...current, [event.target.name]: [event.target.value]}))
  }
  const handlePrice = (event) =>{
    setPrice((current) => ({...current, [event.target.name]: [event.target.value]}))
  }
  const handleQuantity = (event) =>{
    setQuantity((current) => ({...current, [event.target.name]: [event.target.value]}))
  }
  const handleType = ((event) =>{
    setType((current) => ({...current, [event.target.name]: [event.target.value]}))
  })

  return (
    <section>
      <Link to="/products">
        <button> Back </button>
      </Link>
      <form onSubmit={handleSubmit}>
        <h2>Add new Product: </h2>
        <label htmlFor="name">Name: </label>
        <input type="text" name="name" id="name" required onChange={handleName} />
        <br />
        <label htmlFor="description">Desc: </label>
        <textarea
          name="description"
          id="description"
          required
          rows={6}
          onChange={handleDescription}
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
          onChange={handlePrice}
        />
        <br />
        <label htmlFor="quantity">Quantity: </label>
        <input type="number" name="quantity" id="quantity" required min={0.0}
        step={1}
        onChange={handleQuantity}
        />
        <br />
        <label htmlFor="type">Type: </label>
        <select name="type" id="type" required>
          <option disabled value="Processor">
            Select a type...
          </option>
          {typesA.map((type) => (
            <option key={type} value={type} defaultChecked={products.type === type} onChange={handleType}>
              {type}
            </option>
          ))}
        </select>
        <br />
        <button type="submit" onSubmit={handleSubmit}> ADD </button>
      </form>
    </section>
  );
}
