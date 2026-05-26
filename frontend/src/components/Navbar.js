import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useState,
  useContext,
  useEffect,
} from "react";

import axios from "axios";

import { AuthContext } from "../context/AuthContext";

function Navbar() {

  const [keyword, setKeyword] =
    useState("");

  const [
    suggestions,
    setSuggestions,
  ] = useState([]);

  const [category, setCategory] =
    useState("");

  const [minPrice, setMinPrice] =
    useState("");

  const [maxPrice, setMaxPrice] =
    useState("");

  const navigate = useNavigate();

  const {
    userInfo,
    logout,
  } = useContext(AuthContext);

  // Fetch smart search suggestions
  useEffect(() => {

    const fetchSuggestions =
      async () => {

        // Prevent empty API calls
        if (!keyword) {

          setSuggestions([]);

          return;
        }

        const { data } =
          await axios.get(
            `http://localhost:5000/api/products/search/suggestions?keyword=${keyword}`
          );

        setSuggestions(data);
      };

    fetchSuggestions();

  }, [keyword]);

  const submitHandler = (e) => {

    e.preventDefault();

    navigate(
      `/?keyword=${keyword}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}`
    );

    // Close suggestions dropdown
    setSuggestions([]);
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
              setKeyword(
                e.target.value
              )
            }

            // Hide suggestions on blur
            onBlur={() => {
              setTimeout(() => {
                setSuggestions([]);
              }, 200);
            }}
          />

          {/* Smart Suggestions Dropdown */}
          {suggestions.length > 0 && (

            <div className="suggestions-box">

              {suggestions.map(
                (
                  suggestion,
                  index
                ) => (

                  <div
                    key={index}
                    onClick={() => {

                      setKeyword(
                        suggestion
                      );

                      setSuggestions([]);
                    }}
                  >
                    {suggestion}
                  </div>
                )
              )}

            </div>
          )}

          <select
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value
              )
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
              setMinPrice(
                e.target.value
              )
            }
          />

          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) =>
              setMaxPrice(
                e.target.value
              )
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

            <Link to="/myorders">
              <button>
                My Orders
              </button>
            </Link>

            {userInfo?.isAdmin && (
              <Link to="/admin/dashboard">
                <button>
                  Admin
                </button>
              </Link>
            )}

            <span className="user-name">

              Welcome{" "}

              {userInfo.name ||
                "User"}

            </span>

            <button onClick={logout}>
              Logout
            </button>

          </>
        ) : (
          <>

            <Link to="/login">
              <button>
                Login
              </button>
            </Link>

            <Link to="/register">
              <button>
                Register
              </button>
            </Link>

          </>
        )}

      </div>
    </nav>
  );
}

export default Navbar;