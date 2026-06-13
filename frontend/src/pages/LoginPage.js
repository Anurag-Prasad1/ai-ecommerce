import { useState, useContext } from "react";

import axios from "axios";

import API_URL from "../config";

import { AuthContext } from "../context/AuthContext";

import {
  useNavigate,
  useLocation,
  Link,
} from "react-router-dom";

function LoginPage() {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const { setUserInfo } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const location = useLocation();

  const redirect =
    location.state?.from?.pathname ||
    "/";

  const submitHandler = async (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError(
        "Please fill all fields."
      );
      return;
    }

    setLoading(true);

    try {
      const { data } =
        await axios.post(
          `${API_URL}/api/users/login`,
          {
            email,
            password,
          }
        );

      setUserInfo(data);

      navigate(redirect);
    } catch (error) {
      if (error.response) {
        setError(
          error.response.data.message ||
            "Invalid email or password."
        );
      } else if (
        error.request
      ) {
        setError(
          "Unable to reach server. Check your internet connection."
        );
      } else {
        setError(
          "Something went wrong. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding:
          "140px 20px 40px",
      }}
    >
      <div
        style={{
          width: "420px",
          background: "#fff",
          padding: "35px",
          borderRadius: "16px",
          boxShadow:
            "0 15px 40px rgba(0,0,0,0.12)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          Welcome Back 👋
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#666",
            marginBottom: "25px",
          }}
        >
          Login to your NovaCart account
        </p>

        {error && (
          <div
            style={{
              background: "#ffe5e5",
              color: "#d8000c",
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "15px",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={submitHandler}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            style={{
              width: "100%",
              padding: "14px",
              marginBottom: "15px",
              border:
                "1px solid #ddd",
              borderRadius: "8px",
              fontSize: "15px",
              boxSizing:
                "border-box",
            }}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            style={{
              width: "100%",
              padding: "14px",
              marginBottom: "12px",
              border:
                "1px solid #ddd",
              borderRadius: "8px",
              fontSize: "15px",
              boxSizing:
                "border-box",
            }}
          />

          <div
            style={{
              textAlign: "right",
              marginBottom: "20px",
            }}
          >
            <Link
              to="/forgot-password"
              style={{
                textDecoration:
                  "none",
                fontSize: "14px",
              }}
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              background: "#000",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: loading
                ? "not-allowed"
                : "pointer",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>
        </form>

        <div
          style={{
            marginTop: "20px",
            textAlign: "center",
          }}
        >
          Don't have an account?{" "}
          <Link to="/register">
            Register Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;