import React, { useEffect, useState } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/items")
      .then((res) => res.json())
      .then(setItems);
  }, []);

  const addItem = async () => {
    const res = await fetch("http://localhost:8000/items?name=" + name, {
      method: "POST",
    });
    const data = await res.json();
    setItems([...items, data]);
    setName("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>CI/CD Demo</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="New Item"
      />
      <button onClick={addItem}>Add Item</button>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
