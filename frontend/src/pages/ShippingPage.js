import {
  useContext,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import { CartContext } from "../context/CartContext";

import CheckoutSteps from "../components/CheckoutSteps";

function ShippingPage() {
  const navigate = useNavigate();

  const {
    shippingAddress,
    setShippingAddress,
  } = useContext(CartContext);

  const [address, setAddress] =
    useState(
      shippingAddress.address || ""
    );

  const [city, setCity] = useState(
    shippingAddress.city || ""
  );

  const [postalCode, setPostalCode] =
    useState(
      shippingAddress.postalCode || ""
    );

  const [country, setCountry] =
    useState(
      shippingAddress.country || ""
    );

  const submitHandler = (e) => {
    e.preventDefault();

    setShippingAddress({
      address,
      city,
      postalCode,
      country,
    });

    navigate("/placeorder");
  };

  return (
    <div className="container">
      <CheckoutSteps
        step1={true}
        step2={true}
      />

      <div className="form-container">
        <h1>Shipping</h1>

        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) =>
              setAddress(e.target.value)
            }
            required
          />

          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) =>
              setCity(e.target.value)
            }
            required
          />

          <input
            type="text"
            placeholder="Postal Code"
            value={postalCode}
            onChange={(e) =>
              setPostalCode(
                e.target.value
              )
            }
            required
          />

          <input
            type="text"
            placeholder="Country"
            value={country}
            onChange={(e) =>
              setCountry(
                e.target.value
              )
            }
            required
          />

          <button type="submit">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}

export default ShippingPage;