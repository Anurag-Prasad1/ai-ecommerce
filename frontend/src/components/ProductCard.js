function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />

      <h3>{product.name}</h3>

      <p>₹ {product.price.toLocaleString("en-IN")}</p>

      <button>Add to Cart</button>
    </div>
  );
}

export default ProductCard;