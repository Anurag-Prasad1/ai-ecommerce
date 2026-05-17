import { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [name, setName] = useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    await axios.post(
      "http://localhost:5000/api/users/register",
      {
        name,
        email,
        password,
      }
    );

    navigate("/login");
  };

  return (
    <div className="form-container">
      <h1>Register</h1>

      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

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
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;