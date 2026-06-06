import { CartContext } from "../context/CartContext";

import {
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  useState,
  useContext,
  useEffect,
  useRef,
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

  const [
    activeSuggestion,
    setActiveSuggestion,
  ] = useState(-1);

  const [category, setCategory] =
    useState("");

  const [minPrice, setMinPrice] =
    useState("");

  const [maxPrice, setMaxPrice] =
    useState("");

  const [
    showAITools,
    setShowAITools,
  ] = useState(false);

  const aiDropdownRef =
    useRef(null);

  const navigate =
    useNavigate();

  const {
    userInfo,
    logout,
  } = useContext(AuthContext);

  const { cartItems } =
  useContext(CartContext);

  useEffect(() => {
    const fetchSuggestions =
      async () => {
        if (!keyword.trim()) {
          setSuggestions([]);
          setActiveSuggestion(
            -1
          );

          return;
        }

        try {
          const { data } =
            await axios.get(
              `http://localhost:5000/api/products/search/suggestions?keyword=${keyword}`
            );

          setSuggestions(data);

          setActiveSuggestion(
            -1
          );
        } catch (error) {
          console.error(error);
        }
      };

    fetchSuggestions();
  }, [keyword]);

  useEffect(() => {
    const handleClickOutside =
      (event) => {
        if (
          aiDropdownRef.current &&
          !aiDropdownRef.current.contains(
            event.target
          )
        ) {
          setShowAITools(false);
        }
      };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const selectSuggestion = (
    suggestion
  ) => {
    setKeyword(suggestion);

    setSuggestions([]);

    setActiveSuggestion(-1);
  };

  const handleKeyDown = (
    e
  ) => {
    if (
      suggestions.length === 0
    ) {
      return;
    }

    if (
      e.key === "ArrowDown"
    ) {
      e.preventDefault();

      setActiveSuggestion(
        (prev) =>
          prev <
          suggestions.length - 1
            ? prev + 1
            : prev
      );
    } else if (
      e.key === "ArrowUp"
    ) {
      e.preventDefault();

      setActiveSuggestion(
        (prev) =>
          prev > 0
            ? prev - 1
            : 0
      );
    } else if (
      e.key === "Enter"
    ) {
      if (
        activeSuggestion >= 0
      ) {
        e.preventDefault();

        selectSuggestion(
          suggestions[
            activeSuggestion
          ]
        );
      }
    } else if (
      e.key === "Escape"
    ) {
      setSuggestions([]);

      setActiveSuggestion(
        -1
      );
    }
  };

  const submitHandler = (
    e
  ) => {
    e.preventDefault();

    navigate(
      `/?keyword=${keyword}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}`
    );

    setSuggestions([]);

    setActiveSuggestion(-1);
  };

  return (
    <nav className="navbar">
      <Link
        to="/"
        className="logo"
        style={{
          marginRight:
            "25px",
        }}
      >
        <h2
          style={{
            whiteSpace:
              "nowrap",
          }}
        >
          NovaCart 🚀
        </h2>
      </Link>

      <div className="nav-right">
        <form
          onSubmit={
            submitHandler
          }
        >
          <div className="search-wrapper">
  <span className="search-icon">
    🔍
  </span>

  <input
    type="text"
    placeholder="Search products..."
    value={keyword}
    onChange={(e) =>
      setKeyword(
        e.target.value
      )
    }
    onKeyDown={
      handleKeyDown
    }
    onBlur={() => {
      setTimeout(() => {
        setSuggestions([]);
      }, 200);
    }}
  />

  {keyword && (
    <button
      type="button"
      className="clear-search-btn"
      onClick={() => {
        setKeyword("");
        setSuggestions([]);
      }}
    >
      ✕
    </button>
  )}
</div>

          {suggestions.length >
            0 && (
            <div className="suggestions-box">
              {suggestions.map(
                (
                  suggestion,
                  index
                ) => (
                  <div
                    key={index}
                    onMouseDown={() =>
                      selectSuggestion(
                        suggestion
                      )
                    }
                    style={{
                      padding:
                        "12px",
                      cursor:
                        "pointer",
                      background:
                        index ===
                        activeSuggestion
                          ? "#f0f0f0"
                          : "#fff",
                      fontWeight:
                        index ===
                        activeSuggestion
                          ? "600"
                          : "400",
                      color:
                        "#000",
                    }}
                  >
                    {
                      suggestion
                    }
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

        {/* AI TOOLS DROPDOWN */}
        <div
  ref={aiDropdownRef}
  className="ai-dropdown"
>
          <button
  className="ai-navbar-btn"
  onClick={() =>
    setShowAITools(
      !showAITools
    )
  }
>
  🤖 AI ▼
</button>

{showAITools && (
  <div className="ai-dropdown-menu">
    <Link
  to="/ai-generator"
  className="ai-dropdown-item"
  onClick={() =>
    setShowAITools(false)
  }
>
  🤖 AI Product Generator
</Link>

    <Link
  to="/ai-comparison"
  className="ai-dropdown-item"
  onClick={() =>
    setShowAITools(false)
  }
>
  ⚖️ AI Product Comparison
</Link>

    <Link
  to="/ai-review-summary"
  className="ai-dropdown-item"
  onClick={() =>
    setShowAITools(false)
  }
>
  📝 AI Review Summarizer
</Link>

    <Link
  to="/ai-buying-assistant"
  className="ai-dropdown-item"
  onClick={() =>
    setShowAITools(false)
  }
>
  🛒 Smart Buying Assistant
</Link>
  </div>
)}
        </div>

        <NavLink
  to="/cart"
  className={({ isActive }) =>
    isActive ? "nav-active" : ""
  }
>
  <button className="cart-btn">
    🛒 Cart

    {cartItems.length > 0 && (
      <span className="cart-badge">
        {cartItems.length}
      </span>
    )}
  </button>
</NavLink>

        {userInfo ? (
          <>
            <NavLink
  to="/myorders"
  className={({ isActive }) =>
    isActive ? "nav-active" : ""
  }
>
  <button>
    Orders
  </button>
</NavLink>

            {userInfo?.isAdmin && (
              <NavLink
  to="/admin/dashboard"
  className={({ isActive }) =>
    isActive ? "nav-active" : ""
  }
>
  <button>
    Admin
  </button>
</NavLink>
            )}

            <div className="user-profile-chip">
  <span className="user-avatar">
    👋
  </span>

  <span className="user-name">
    {userInfo.name || "User"}
  </span>
</div>

            <button
  className="logout-btn"
  onClick={logout}
>
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