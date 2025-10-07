import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    nav('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-left">Inventory Management System</div>
      <div className="nav-right">
        {!user ? (
          <>
            <Link to="/login" className="link">Login</Link>
            <Link to="/signup" className="btn">Signup</Link>
          </>
        ) : (
          <>
            <span className="greet">Hi, {user.name}</span>
            <button className="btn" onClick={() => nav('/dashboard')}>Dashboard</button>
            <button className="btn danger" onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
