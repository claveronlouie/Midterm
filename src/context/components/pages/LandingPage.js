import { Link } from "react-router-dom";
import "./LandingPage.css"; // Create this CSS file below

export default function LandingPage() {
  return (
    <div className="landing-container">
      {/* ===== NAVBAR ===== */}
      <header className="landing-navbar">
        <h3>Inventory Management System</h3>
        <div className="nav-buttons">
          <Link to="/login" className="btn login">Login</Link>
          <Link to="/signup" className="btn signup">Signup</Link>
        </div>
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <main className="landing-main">
        <div className="text-content">
          <h1>Welcome to Inventory<br />Management System</h1>
          <p>
            Manage your products, monitor stock levels, and generate insightful
            reports — all in one simple system designed to help your shop stay organized.
          </p>
          <Link to="/login" className="btn get-started">Get started</Link>
        </div>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="landing-footer">
        <p>Footer</p>
      </footer>
    </div>
  );
}
