import {
  useEffect,
  useState,
  useContext,
} from "react";

import axios from "axios";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

function ProductEditPage() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { userInfo } =
    useContext(AuthContext);

  const [name, setName] = useState("");

  const [price, setPrice] =
    useState("");

  const [image, setImage] =
    useState("");

  const [brand, setBrand] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [countInStock, setCountInStock] =
    useState("");

  const [description, setDescription] =
    useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/api/products/${id}`
      );

      setName(data.name);

      setPrice(data.price);

      setImage(data.image);

      setBrand(data.brand);

      setCategory(data.category);

      setCountInStock(
        data.countInStock
      );

      setDescription(
        data.description
      );
    };

    fetchProduct();
  }, [id]);

  // 🔥 Upload Product Image
  const uploadFileHandler = async (
    e
  ) => {
    const file = e.target.files[0];

    const formData = new FormData();

    formData.append("image", file);

    const config = {
      headers: {
        "Content-Type":
          "multipart/form-data",

        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      "http://localhost:5000/api/upload",
      formData,
      config
    );

    setImage(
      `http://localhost:5000${data}`
    );
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    await axios.put(
      `http://localhost:5000/api/products/${id}`,
      {
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      },
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    navigate("/admin/dashboard");
  };

  return (
    <div className="form-container">
      <h1>Edit Product</h1>

      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) =>
            setImage(e.target.value)
          }
        />

        {/* 🔥 Upload Image Input */}
        <input
          type="file"
          onChange={uploadFileHandler}
        />

        {/* 🔥 Uploaded Image Preview */}
        {image && (
          <img
            src={image}
            alt="preview"
            width="150"
          />
        )}

        <input
          type="text"
          placeholder="Brand"
          value={brand}
          onChange={(e) =>
            setBrand(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Stock"
          value={countInStock}
          onChange={(e) =>
            setCountInStock(
              e.target.value
            )
          }
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
        />

        <button type="submit">
          Update Product
        </button>
      </form>
    </div>
  );
}

export default ProductEditPage;