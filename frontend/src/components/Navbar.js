import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useState,
  useContext,
} from "react";

import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const [keyword, setKeyword] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [minPrice, setMinPrice] =
    useState("");

  const [maxPrice, setMaxPrice] =
    useState("");

  const navigate = useNavigate();

  const { userInfo, logout } =
    useContext(AuthContext);

  const submitHandler = (e) => {
    e.preventDefault();

    navigate(
      `/?keyword=${keyword}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}`
    );

    setKeyword("");

    setMinPrice("");
    setMaxPrice("");
  };

  return (
    <nav className="navbar">
      <Link
        to="/"
        className="logo"
      >
        <h2>NovaCart 🚀</h2>
      </Link>

      <div className="nav-right">
        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Search products..."
            value={keyword}
            onChange={(e) =>
              setKeyword(e.target.value)
            }
          />

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          >
            <option value="">
              All
            </option>

            <option value="mobile">
              Mobile
            </option>

            <option value="fashion">
              Fashion
            </option>

            <option value="electronics">
              Electronics
            </option>

            <option value="books">
              Books
            </option>
          </select>

          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) =>
              setMinPrice(e.target.value)
            }
          />

          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) =>
              setMaxPrice(e.target.value)
            }
          />

          <button type="submit">
            Search
          </button>
        </form>

        <Link to="/cart">
          <button>Cart</button>
        </Link>

        {userInfo ? (
          <>
            <span className="user-name">
              Welcome{" "}
              {userInfo.user?.name ||
                "User"}
            </span>

            <button onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button>Login</button>
            </Link>

            <Link to="/register">
              <button>Register</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;