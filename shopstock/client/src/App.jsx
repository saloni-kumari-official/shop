import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Products from "./pages/Products";
import NextOrder from "./pages/NextOrder";
function Dashboard() {
  return (
    <div className="app">
      <aside className="sidebar">
        <h2>🛒 ShopStock</h2>

        <nav>
          <Link className="active" to="/">
            📊 Dashboard
          </Link>

          <Link to="/products">
            📦 Products
          </Link>
          <Link to="/next-order">Next Order</Link>

          <Link to="/orders">
            📝 Orders
          </Link>
        </nav>
      </aside>

      <main className="main">
        <header className="header">
          <div>
            <h1>Dashboard</h1>
            <p>Welcome back, Papa 👋</p>
          </div>

          <div className="profile">👤 Papa</div>
        </header>

        <section className="stats">
          <div className="card">
            <span>📦</span>
            <p>Total Products</p>
            <h2>125</h2>
          </div>

          <div className="card warning">
            <span>⚠️</span>
            <p>Low Stock</p>
            <h2>12</h2>
          </div>

          <div className="card">
            <span>📝</span>
            <p>Pending Orders</p>
            <h2>3</h2>
          </div>
        </section>

        <section className="content">
          <div className="panel">
            <div className="panel-header">
              <h2>⚠️ Low Stock</h2>
              <button>View All</button>
            </div>

            <div className="product-row">
              <div>
                <strong>Biscuits</strong>
                <small>Packet</small>
              </div>

              <span className="stock danger">5 left</span>

              <button className="order-btn">
                Order
              </button>
            </div>

            <div className="product-row">
              <div>
                <strong>Chips</strong>
                <small>Packet</small>
              </div>

              <span className="stock danger">7 left</span>

              <button className="order-btn">
                Order
              </button>
            </div>
          </div>

          <div className="panel next-order">
            <h2>🛒 Next Order</h2>

            <p>3 products need to be ordered.</p>

            <div className="order-summary">
              <span>Biscuits</span>
              <strong>10 packets</strong>
            </div>

            <div className="order-summary">
              <span>Chips</span>
              <strong>15 packets</strong>
            </div>

            <button className="primary-btn">
              Create Order →
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/next-order" element={<NextOrder />} />
      </Routes>
    </BrowserRouter>
  ); 
}

export default App;