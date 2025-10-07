import { Link, useNavigate } from "react-router-dom";
import "./AuthPages.css";

export default function SignupPage() {
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find((u) => u.email === email)) {
      alert("Email already exists!");
      return;
    }

    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful! Please login.");
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <header className="landing-navbar">
        <h3>Inventory Management System</h3>
        <div className="nav-buttons">
          <Link to="/" className="btn login">Home</Link>
        </div>
      </header>

      <main className="auth-main">
        <div className="auth-card">
          <h2>Signup</h2>
          <form onSubmit={handleSignup}>
            <input type="text" name="name" placeholder="Full Name" required />
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="password" placeholder="Password" required />
            <button type="submit" className="btn submit">Create Account</button>
          </form>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </main>

      <footer className="landing-footer">
        <p>Footer</p>
      </footer>
    </div>
  );
}
