import React, { createContext, useState, useEffect } from "react";

export const ItemsContext = createContext();

export const ItemsProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  // Load items from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("items")) || [];
    setItems(stored);
  }, []);

  // Save whenever items change
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  return (
    <ItemsContext.Provider value={{ items, setItems }}>
      {children}
    </ItemsContext.Provider>
  );
};
