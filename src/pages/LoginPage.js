import { Link, useNavigate } from "react-router-dom";
import "./AuthPages.css";
import Footer from "../components/Footer";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      navigate("/main");
    } else {
      alert("Invalid email or password!");
    }
  };

  return (
    <div className="auth-container">
      <header className="landing-navbar">
        <h3>Inventory Management System</h3>
        <div className="nav-buttons">
          <Link to="/" className="btn login">Back</Link>
        </div>
      </header>

      <main className="auth-main">
        <div className="auth-card">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="password" placeholder="Password" required />
            <button type="submit" className="btn submit">Login</button>
          </form>
          <p>
            Don’t have an account? <Link to="/signup">Signup</Link>
          </p>
        </div>
      </main>

      <Footer className="landing-footer"/>
    </div>
  );
}
