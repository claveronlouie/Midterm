import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./DashboardPage.css";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", quantity: "", price: "" });
  const [editIndex, setEditIndex] = useState(null);
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  // Redirect if not logged in
  useEffect(() => {
    if (!user) navigate("/login");
  }, [navigate, user]);

  // Load items from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("items")) || [];
    setItems(stored);
  }, []);

  // Save items whenever changed
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

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
  };

  const handleDelete = (index) => {
    if (window.confirm("Delete this item?")) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <header className="landing-navbar">
        <h3>Inventory Management System</h3>
        <div className="nav-buttons">
          <button className="btn logout" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        <h1>Welcome, {user?.name || "User"} 👋</h1>

        {/* Item Form */}
        <form className="item-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Item name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Quantity"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
          <button type="submit" className="btn add">
            {editIndex !== null ? "Update Item" : "Add Item"}
          </button>
        </form>

        {/* Items Table */}
        <table className="item-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? (
              items.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>₱{item.price}</td>
                  <td>
                    <button className="btn edit" onClick={() => handleEdit(index)}>Edit</button>
                    <button className="btn delete" onClick={() => handleDelete(index)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No items yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </main>

      {/* Footer */}
      <footer className="landing-footer">
        <p>Footer</p>
      </footer>
    </div>
  );
}
