import ProductPage from "./pages/ProductPage";
import { products } from "./data/products";

function App() {
  const product1 = products[0];
  const product2 = products[1];

  return (
    <div>
      <ProductPage product={product1} />
      <ProductPage product={product2} />
    </div>
  );
}

export default App;