import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <h2>NovaCart 🚀</h2>
      </Link>

      <div>
        <input
          type="text"
          placeholder="Search products..."
        />

        <button>Login</button>

        <Link to="/cart">
          <button>Cart</button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;