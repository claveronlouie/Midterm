import React, { useState, useEffect } from "react";

function InventoryPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", quantity: "", price: "" });
  const [editIndex, setEditIndex] = useState(null);

  // Load from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("inventoryItems")) || [];
    setItems(stored);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("inventoryItems", JSON.stringify(items));
  }, [items]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.name || !form.quantity || !form.price) return;
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
  };

  const handleDelete = (index) => {
    if (window.confirm("Delete this item?")) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Inventory Items</h1>

      
      <form onSubmit={handleAdd} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Item name"
          value={form.name}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          style={styles.input}
        />
        <button type="submit" style={styles.addButton}>
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </form>

      {/* Table */}
      <table style={styles.table}>
        <thead>
          <tr style={styles.tableHeader}>
            <th style={styles.th}>Item</th>
            <th style={styles.th}>Quantity</th>
            <th style={styles.th}>Price</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 ? (
            items.map((item, index) => (
              <tr key={index} style={styles.row}>
                <td style={styles.td}>{item.name}</td>
                <td style={styles.td}>{item.quantity}</td>
                <td style={styles.td}>₱{item.price}</td>
                <td style={styles.td}>
                  <button
                    onClick={() => handleEdit(index)}
                    style={styles.editBtn}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    style={styles.deleteBtn}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td style={styles.empty} colSpan="4">
                No items added yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    flex: 1,
    padding: "2rem",
    backgroundColor: "#f9fafb",
    color: "#111827",
    minHeight: "100vh",
  },
  title: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    color: "#2563eb",
    marginBottom: "1.5rem",
  },
  form: {
    display: "flex",
    gap: "0.75rem",
    marginBottom: "2rem",
  },
  input: {
    padding: "0.5rem 0.75rem",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    flex: "1",
    outline: "none",
  },
  addButton: {
    backgroundColor: "#2563eb",
    color: "white",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "500",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  },
  tableHeader: {
    backgroundColor: "#e5e7eb",
    textAlign: "left",
  },
  th: {
    padding: "0.75rem",
    fontWeight: "600",
    color: "#374151",
  },
  td: {
    padding: "0.75rem",
    borderTop: "1px solid #e5e7eb",
  },
  row: {
    transition: "background 0.2s",
  },
  editBtn: {
    backgroundColor: "#3b82f6",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "0.4rem 0.75rem",
    marginRight: "0.5rem",
    cursor: "pointer",
  },
  deleteBtn: {
    backgroundColor: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "0.4rem 0.75rem",
    cursor: "pointer",
  },
  empty: {
    textAlign: "center",
    padding: "1.5rem",
    color: "#6b7280",
  },
};

export default InventoryPage;
