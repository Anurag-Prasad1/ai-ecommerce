import {
  FaArrowLeft,
  FaBox,
  FaImage,
  FaTag,
  FaWarehouse,
} from "react-icons/fa";

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

import Swal from "sweetalert2";

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

  const [loading, setLoading] =
  useState(false);

  const [uploading, setUploading] =
  useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
  try {
    const { data } = await axios.get(
      `http://localhost:5000/api/products/${id}`
    );

    setName(data.name);
    setPrice(data.price);
    setImage(data.image);
    setBrand(data.brand);
    setCategory(data.category);
    setCountInStock(data.countInStock);
    setDescription(data.description);
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Failed to load product",
      text: "Please refresh the page",
    });
  }
};

    fetchProduct();
  }, [id]);

  // 🔥 Upload Product Image
  const uploadFileHandler = async (
  e
) => {
  try {
  const file = e.target.files[0];

  if (!file) return;

  setUploading(true);

    const formData =
      new FormData();

    formData.append(
      "image",
      file
    );

    const config = {
      headers: {
        "Content-Type":
          "multipart/form-data",

        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } =
      await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        config
      );

    setImage(
      `http://localhost:5000${data}`
    );

    Swal.fire({
      icon: "success",
      title:
        "Image Uploaded",
      timer: 1500,
      showConfirmButton:
        false,
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title:
        "Upload Failed",
      text:
        error.response?.data
          ?.message ||
        "Something went wrong",
    });
  } finally {
    setUploading(false);
  }
};

  const submitHandler = async (
  e
) => {
  e.preventDefault();

  try {
    setLoading(true);

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

    await Swal.fire({
      icon: "success",
      title:
        "Product Updated",
      text:
        "Changes saved successfully.",
      confirmButtonColor:
        "#2563eb",
    });

    navigate(
      "/admin/dashboard"
    );
  } catch (error) {
    Swal.fire({
      icon: "error",
      title:
        "Update Failed",
      text:
        error.response?.data
          ?.message ||
        "Something went wrong",
    });
  } finally {
    setLoading(false);
  }
};

  return (
  <div className="product-edit-page">
    <div className="product-edit-header">
      <button
        className="product-back-btn"
        onClick={() =>
          navigate("/admin/dashboard")
        }
      >
        <FaArrowLeft />
        Back
      </button>

      <div>
        <h1>Edit Product</h1>

        <p>
          Update product information,
          pricing, inventory and image.
        </p>
      </div>
    </div>

    <form
      onSubmit={submitHandler}
      className="product-edit-form"
    >
      <div className="product-edit-grid">
        <div className="product-image-card">
          <h3>
            <FaImage />
            Product Image
          </h3>

          {image ? (
            <img
  src={image}
  alt={name}
  className="product-preview-image"
  onError={(e) => {
    e.target.style.display = "none";
  }}
/>
          ) : (
            <div className="image-placeholder">
              No Image
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={
              uploadFileHandler
            }
          />

          {uploading && (
            <p className="uploading-text">
              Uploading image...
            </p>
          )}
        </div>

        <div className="product-info-card">
          <h3>
            <FaBox />
            Product Information
          </h3>

          <label>
            Product Name
          </label>

          <input
  type="text"
  required
  value={name}
  onChange={(e) =>
    setName(e.target.value)
  }
/>

          <label>
            Brand
          </label>

          <input
  type="text"
  required
  value={brand}
  onChange={(e) =>
    setBrand(e.target.value)
  }
/>

          <label>
            Category
          </label>

          <input
  type="text"
  required
  value={category}
  onChange={(e) =>
    setCategory(e.target.value)
  }
/>

          <label>
            Description
          </label>

          <textarea
            rows="5"
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
          />
        </div>
      </div>

      <div className="product-pricing-card">
        <h3>
          <FaTag />
          Pricing & Inventory
        </h3>

        <div className="pricing-grid">
          <div>
            <label>
              Price (₹)
            </label>

            <input
  type="number"
  required
  value={price}
  onChange={(e) =>
    setPrice(
      e.target.value
    )
  }
/>
          </div>

          <div>
            <label>
              Stock Quantity
            </label>

            <input
  type="number"
  required
  min="0"
  value={countInStock}
  onChange={(e) =>
    setCountInStock(
      e.target.value
    )
  }
/>
          </div>
        </div>
      </div>

      <div className="product-url-card">
        <h3>
          <FaWarehouse />
          Image URL
        </h3>

        <input
          type="text"
          value={image}
          onChange={(e) =>
            setImage(
              e.target.value
            )
          }
        />
      </div>

      <div className="product-action-bar">
        <button
          type="button"
          className="cancel-btn"
          onClick={() =>
            navigate(
              "/admin/dashboard"
            )
          }
        >
          Cancel
        </button>

        <button
  type="submit"
  className="save-btn"
  disabled={loading || uploading}
>
  {loading
    ? "Saving Changes..."
    : "Save Changes"}
</button>
      </div>
    </form>
  </div>
);
}

export default ProductEditPage;