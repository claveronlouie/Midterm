import React, { useState, useContext } from "react";
import { ItemsContext } from "../contexts/ItemsContext";

export default function InventoryPage() {
  const { items, setItems } = useContext(ItemsContext);
  const [form, setForm] = useState({ name: "", quantity: "", price: "" });
  const [editIndex, setEditIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.quantity || !form.price) {
      alert("Please fill all fields");
      return;
    }

    if (editIndex !== null) {
      const updated = [...items];
      updated[editIndex] = form;
      setItems(updated);
      setEditIndex(null);
    } else {
      setItems([...items, form]);
    }

    setForm({ name: "", quantity: "", price: "" });
  };

  const handleEdit = (index) => {
    setForm(items[index]);
    setEditIndex(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (index) => {
    if (window.confirm("Delete this item?")) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="inventory-page">
      <h1 className="page-title">Inventory</h1>

      <form className="item-form" onSubmit={handleSubmit}>
        <input
          className="form-input"
          type="text"
          placeholder="Item name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="form-input"
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
        />
        <input
          className="form-input"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <button type="submit" className="btn add">
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </form>

      <table className="item-table">
        <thead>
          <tr>
            <th style={{ width: 60 }}>No.</th>
            <th>Item</th>
            <th style={{ width: 120 }}>Quantity</th>
            <th style={{ width: 140 }}>Price</th>
            <th style={{ width: 200 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items && items.length ? (
            items.map((item, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>₱{item.price}</td>
                <td>
                  <button className="btn edit" onClick={() => handleEdit(i)}>
                    Edit
                  </button>
                  <button className="btn delete" onClick={() => handleDelete(i)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="empty" colSpan="5">
                No items yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
