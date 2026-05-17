import { useState, useContext } from "react";

import axios from "axios";

import { AuthContext } from "../context/AuthContext";

import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  const { setUserInfo } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password,
        }
      );

      setUserInfo(data);

      navigate("/");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form-container">
      <h1>Login</h1>

      <form onSubmit={submitHandler}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;