import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

export const StockContext = createContext({});

function StockContextProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [items, setItems] = useState(() => {
    const storedItems = localStorage.getItem("stock");
    if (!storedItems) return [];
    const items = JSON.parse(storedItems);
    items.forEach((item) => {
      item.addDate = new Date(item.addDate);
    });
    return items;
  });
  //To ensure that the data will be read often from the localStorage:
  useEffect(() => {
    const storedItems = localStorage.getItem("stock");
    if (storedItems) {
      const items = JSON.parse(storedItems);
      items.forEach((item) => {
        item.addDate = new Date(item.addDate);
      });
      setItems(items);
    }
  }, []);

  const addItem = (item) => {
    setItems((current) => {
      const updatedItems = current.map((prod) => (prod.id === parseInt(item.id) ? item : prod))
      //IF item was ot found, add it to the array: 
      if(!updatedItems.some((prod) => prod.id === parseInt(item.id))){
        updatedItems.push(item);
      }
      localStorage.setItem("stock", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  /* OLD CODE:
  if (localStorage.getItem("stock") === null) {
  } else {
    localStorage.setItem(
      "stock",
      JSON.stringify([
        ...JSON.parse(localStorage.getItem("stock")),
        updatedItems,
      ])
    );
  } */

  const getItem = (itemId) => {
    return items.find((i) => i.id === +itemId);
  };

  const updateItem = (itemId, newAttributes) => {
    setItems((current) => {
      const itemIndex = current.findIndex((i) => i.id === itemId);
      if (itemIndex === -1) {
        return current;
      }

      const updatedItems = [...current];
      Object.assign(updatedItems[itemIndex], newAttributes),
      localStorage.setItem("stock", JSON.stringify(updatedItems))
      return updatedItems;
    });
  };
  const deleteItem = (itemId) => {
    setItems((current) => {
      const updatedItems = current.filter((item) => item.id !== itemId);
      localStorage.setItem("stock", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };
  const addToCart = (item) => {
    setCart((current) => {
      current.map((prod) => (prod.id === parseInt(item.id) ? item : prod))
    })
  }

  const stock = {
    cart,
    items,
    addItem,
    getItem,
    updateItem,
    deleteItem,
    addToCart
  };
  return (
    <StockContext.Provider value={stock}>{children}</StockContext.Provider>
  );
}
StockContextProvider.propTypes = {
  children: PropTypes.node,
};
export default StockContextProvider;
