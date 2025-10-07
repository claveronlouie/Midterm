import Sidebar from '../Sidebar';
import Navbar from '../Navbar';

export default function HomePage() {
  return (
    <div className="page dashboard-layout">
      <Navbar />
      <div className="content-wrap">
        <Sidebar />
        <main className="content-area">
          <h2>Good day, Admin</h2>
          <p>Welcome to your Inventory System.</p>
        </main>
      </div>
    </div>
  );
}
