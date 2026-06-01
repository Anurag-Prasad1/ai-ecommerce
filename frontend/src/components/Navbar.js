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

  const navigate =
    useNavigate();

  const {
    userInfo,
    logout,
  } = useContext(AuthContext);

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
          suggestions.length -
            1
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
                setSuggestions(
                  []
                );
              }, 200);
            }}
          />

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
          style={{
            position:
              "relative",
            display:
              "inline-block",
          }}
        >
          <button
            style={{
              whiteSpace:
                "nowrap",
            }}
            onClick={() =>
              setShowAITools(
                !showAITools
              )
            }
          >
            🤖 AI ▼
          </button>

          {showAITools && (
            <div
              style={{
                position:
                  "absolute",
                top: "45px",
                right: 0,
                background:
                  "#fff",
                minWidth:
                  "220px",
                boxShadow:
                  "0 2px 10px rgba(0,0,0,0.2)",
                borderRadius:
                  "6px",
                zIndex: 999,
              }}
            >
              <Link
                to="/ai-generator"
                onClick={() =>
                  setShowAITools(
                    false
                  )
                }
                style={{
                  display:
                    "block",
                  padding:
                    "12px",
                  textDecoration:
                    "none",
                  color:
                    "#000",
                  borderBottom:
                    "1px solid #eee",
                }}
              >
                🤖 AI Product
                Generator
              </Link>

              <Link
                to="/ai-comparison"
                onClick={() =>
                  setShowAITools(
                    false
                  )
                }
                style={{
                  display:
                    "block",
                  padding:
                    "12px",
                  textDecoration:
                    "none",
                  color:
                    "#000",
                }}
              >
                ⚖️ AI Product
                Comparison
              </Link>
            </div>
          )}
        </div>

        <Link to="/cart">
          <button>
            Cart
          </button>
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

            <span
              className="user-name"
              style={{
                whiteSpace:
                  "nowrap",
              }}
            >
              Welcome{" "}
              {userInfo.name ||
                "User"}
            </span>

            <button
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