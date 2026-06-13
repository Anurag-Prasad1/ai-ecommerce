import { useState } from "react";

import axios from "axios";

import API_URL from "../config";

import {
  useNavigate,
  Link,
} from "react-router-dom";

function RegisterPage() {
  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const navigate = useNavigate();

  const validateEmail = (
    email
  ) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      email
    );
  };

  const submitHandler = async (
    e
  ) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim()
    ) {
      setError(
        "Please fill all fields."
      );
      return;
    }

    if (
      !validateEmail(email)
    ) {
      setError(
        "Please enter a valid email address."
      );
      return;
    }

    if (
      password.length < 8
    ) {
      setError(
        "Password must contain at least 8 characters."
      );
      return;
    }

    try {
      setLoading(true);

      const { data } =
        await axios.post(
          `${API_URL}/api/users/register`,
          {
            name,
            email,
            password,
          }
        );

      if (data) {
        setSuccess(
          "✅ Account created successfully. Redirecting to login..."
        );

        setTimeout(() => {
          navigate("/login");
        }, 1800);
      }
    } catch (error) {
      if (
        error.response?.data
          ?.message
      ) {
        if (
          error.response.data.message ===
          "User already exists"
        ) {
          setError(
            "⚠️ An account with this email already exists."
          );
        } else {
          setError(
            error.response.data
              .message
          );
        }
      } else if (
        error.request
      ) {
        setError(
          "⚠️ Unable to connect to the server. Please check your internet connection."
        );
      } else {
        setError(
          "⚠️ Something went wrong. Please try again."
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
      justifyContent:
        "center",
      alignItems:
        "flex-start",
      padding:
        "140px 20px 40px",
    }}
  >
    <div
      style={{
        width: "460px",
        background:
          "#ffffff",
        borderRadius:
          "18px",
        padding: "35px",
        boxShadow:
          "0 15px 40px rgba(0,0,0,0.15)",
      }}
    >
        <div
          style={{
            textAlign:
              "center",
            marginBottom:
              "25px",
          }}
        >
          <h2
            style={{
              marginBottom:
                "8px",
            }}
          >
            NovaCart 🚀
          </h2>

          <h1
            style={{
              fontSize:
                "34px",
              marginBottom:
                "10px",
            }}
          >
            Join NovaCart
          </h1>

          <p
            style={{
              color:
                "#666",
              fontSize:
                "14px",
            }}
          >
            Create your
            account and
            start shopping
            smarter with
            AI.
          </p>
        </div>

        {error && (
          <div
            style={{
              background:
                "#ffe5e5",
              color:
                "#c62828",
              padding:
                "12px",
              borderRadius:
                "10px",
              marginBottom:
                "15px",
              fontWeight:
                "500",
            }}
          >
            {error}
          </div>
        )}

        {success && (
          <div
            style={{
              background:
                "#e8f8ea",
              color:
                "#2e7d32",
              padding:
                "12px",
              borderRadius:
                "10px",
              marginBottom:
                "15px",
              fontWeight:
                "500",
            }}
          >
            {success}
          </div>
        )}

        <form
          onSubmit={
            submitHandler
          }
        >
          <label
            style={{
              fontWeight:
                "600",
            }}
          >
            👤 Full Name
          </label>

          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
            style={{
              width: "100%",
              padding:
                "12px",
              marginTop:
                "6px",
              marginBottom:
                "15px",
              border:
                "1px solid #ddd",
              borderRadius:
                "10px",
            }}
          />

          <label
            style={{
              fontWeight:
                "600",
            }}
          >
            📧 Email Address
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            style={{
              width: "100%",
              padding:
                "12px",
              marginTop:
                "6px",
              marginBottom:
                "15px",
              border:
                "1px solid #ddd",
              borderRadius:
                "10px",
            }}
          />

          <label
            style={{
              fontWeight:
                "600",
            }}
          >
            🔒 Password
          </label>

          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            style={{
              width: "100%",
              padding:
                "12px",
              marginTop:
                "6px",
              marginBottom:
                "15px",
              border:
                "1px solid #ddd",
              borderRadius:
                "10px",
            }}
          />

          <div
            style={{
              background:
                "#f8f9fa",
              padding:
                "12px",
              borderRadius:
                "10px",
              marginBottom:
                "20px",
              fontSize:
                "13px",
            }}
          >
            <strong>
              Password
              Requirements:
            </strong>

            <div>
              ✓ At least
              8
              characters
            </div>

            <div>
              ✓ One
              uppercase
              letter
              (recommended)
            </div>

            <div>
              ✓ One number
              (recommended)
            </div>
          </div>

          <button
            type="submit"
            disabled={
              loading
            }
            style={{
              width: "100%",
              padding:
                "14px",
              border:
                "none",
              borderRadius:
                "10px",
              background:
                loading
                  ? "#777"
                  : "#000",
              color:
                "#fff",
              fontSize:
                "16px",
              fontWeight:
                "600",
              cursor:
                loading
                  ? "not-allowed"
                  : "pointer",
            }}
          >
            {loading
              ? "⏳ Creating Account..."
              : "🚀 Register"}
          </button>
        </form>

        <div
          style={{
            textAlign:
              "center",
            marginTop:
              "22px",
          }}
        >
          Already have an
          account?
          {" "}
          <Link
            to="/login"
            style={{
              fontWeight:
                "bold",
              textDecoration:
                "none",
            }}
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;