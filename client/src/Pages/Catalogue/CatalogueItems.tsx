/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

function CatalogueItems() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const data = await fetch("http://localhost:4000/items");
    const items = await data.json();
    setItems(items);
    console.log(items);
  };

  return (
    <div>
      <h1>Items</h1>
      <button onClick={fetchItems}>Fetch Items</button>
      <ul>
        {items.map((item: any) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default CatalogueItems;
