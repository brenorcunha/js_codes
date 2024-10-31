import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

export const StockContext = createContext({});

function StockContextProvider({ children }) {
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
      console.log(items);
      setItems(items);
    }
  }, []);
  
  const addItem = (item) => {
    setItems((current) => {
      const updatedItems = [item, ...current];
      localStorage.setItem("stock", JSON.stringify(updatedItems));
      return updatedItems;
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
    });
  };

  const getItem = (itemId) => {
    return items.find((i) => i.id === +itemId);
  };

  const updateItem = (itemId, newAttributes) =>
    setItems((current) => {
      const itemIndex = current.findIndex((i) => i.id === itemId);
      const updatedItems = [...current];
      Object.assign(updatedItems[itemIndex], newAttributes);
      localStorage.setItem("stock", JSON.stringify(updatedItems));
      return updatedItems;
    });

  const deleteItem = (itemId) => {
    setItems((current) => {
      const updatedItems = current.filter((item) => item.id !== itemId);
      localStorage.setItem("stock", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const stock = {
    items,
    addItem,
    getItem,
    updateItem,
    deleteItem,
  };
  return (
    <StockContext.Provider value={stock}>{children}</StockContext.Provider>
  );
}
StockContextProvider.propTypes = {
  children: PropTypes.node,
};
export default StockContextProvider;
