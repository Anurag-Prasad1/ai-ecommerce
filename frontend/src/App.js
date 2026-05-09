import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import "./styles.css";

function App() {
  return (
    <div>
      <Navbar />

      <div className="container">
        <ProductList />
      </div>
    </div>
  );
}

export default App;