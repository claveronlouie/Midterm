import React, { useContext } from "react";
import { ItemsContext } from "../contexts/ItemsContext";
import "./DashboardPage.css";

export default function DashboardPage() {
  const { items } = useContext(ItemsContext);

  return (
    <div className="dashboard-layout">
      <main className="dashboard-main">
        <h1 className="dashboard-title">Dashboard Overview</h1>
        <p className="dashboard-subtitle">Current items in your inventory</p>

        <div className="table-container">
          <table className="item-table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Price</th>
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
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="empty-text">
                    No items yet. Add some in the Inventory page.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
