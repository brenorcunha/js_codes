import createProduct, { typesA } from "../pages/createProduct";
//'useStock' decomposto:
import { useContext } from "react";
import { StockContext } from "../contexts/StockContext";
import { useState } from "react";

export default function registerProduct({ newProduct }) {
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
  const[addItem, updatedItem] = useContext(StockContext);
  //
  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      let products = JSON.parse(localStorage.getItem("stock"))||[];
      if (newProduct) {
        //Bloco de código destinado a encontrar produto no localStorage pelo ID, atualizar seus dados e salvar novamente lá: 
        const index=products.findIndex((prod) => prod.id===newProduct.id);
        if(index!=-1){
          products[index]=item;
          localStorage.setItem("stock", JSON.stringify(products));
          alert("Product successfully registered.");
        }
      } else {
      //Bloco de código destinado a registrar produto neste array/ lista no localStorage: 
        const validProd = new createProduct(item); //Enviará para a função que checa se informações do produto estão válidas.
        addItem(validProd); //Adiciona ao estado.
        setItem(validProd); //Adiciona ao estado.
        //Grava no localStorage: 
        products.push(validProd);
        localStorage.setItem("stock", JSON.stringify(products));
        alert("Product successfully registered.");
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
        <input type="text" name="name" id="name" required />
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
        <input
          type="number"
          name="quantity"
          id="quantity"
          required
          min={0}
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
