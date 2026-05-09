function Navbar() {
  return (
    <nav className="navbar">
      <h2>NovaCart 🚀</h2>

      <div>
        <input type="text" placeholder="Search products..." />

        <button>Login</button>
        <button>Cart</button>
      </div>
    </nav>
  );
}

export default Navbar;