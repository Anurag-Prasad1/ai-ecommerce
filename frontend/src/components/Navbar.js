import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/?keyword=${keyword}`);
    } else {
      navigate("/");
    }

    setKeyword("");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <h2>NovaCart 🚀</h2>
      </Link>

      <div>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Search products..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />

          <button type="submit">Search</button>
        </form>

        <button>Login</button>

        <Link to="/cart">
          <button>Cart</button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;