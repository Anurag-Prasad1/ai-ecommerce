import { useEffect, useState } from "react";
import axios from "axios";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get(
        "http://localhost:5000/api/products"
      );

      setProducts(data.products || data);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Products</h2>

      {products.map((product) => (
        <div key={product._id}>
          <h3>{product.name}</h3>
          <p>₹ {product.price}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductList;