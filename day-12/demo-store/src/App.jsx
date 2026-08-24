import "./App.css";
import Spinner from "./pages/Spinner";

const products = [
  {
    id: 1,
    name: "NovaBook Air",
    price: "₹74,999",
    description:
      "A lightweight laptop designed for students and remote workers. It delivers all-day battery life and a bright 14-inch display.",
  },
  {
    id: 2,
    name: "SonicPods Pro",
    price: "₹12,999",
    description:
      "Wireless earbuds with active noise cancellation and spatial audio. The compact charging case provides up to 30 hours of listening.",
  },
  {
    id: 3,
    name: "PixelView 4K Monitor",
    price: "₹28,499",
    description:
      "A sharp 27-inch 4K monitor built for developers and designers. USB-C connectivity allows video, data and charging through one cable.",
  },
  {
    id: 4,
    name: "MechKey Mini",
    price: "₹7,499",
    description:
      "A compact mechanical keyboard with hot-swappable switches. Its wireless mode works with laptops, tablets and phones.",
  },
  {
    id: 5,
    name: "Orbit Mouse",
    price: "₹3,999",
    description:
      "An ergonomic wireless mouse designed for long working sessions. Adjustable sensitivity makes it suitable for productivity and creative work.",
  },
];

function App() {
  const path = window.location.pathname;

  // ==========================================
  // EXERCISE 1: HOSTILE SPINNER PAGE
  // ==========================================
  if (path === "/spinner") {
    return <Spinner />;
  }

  // ==========================================
  // EXISTING PRODUCT 2 PAGE
  // ==========================================
  if (path === "/product/2") {
    return (
      <main>
        <title>SonicPods Pro</title>

        <h1>Product 2</h1>

        <h2>SonicPods Pro</h2>

        <strong>₹12,999</strong>

        <p>
          Wireless earbuds with active noise cancellation
          and spatial audio.
        </p>
      </main>
    );
  }
  if (path.startsWith("/product/")) {
  return (
    <>
      <meta
        name="prerender-status-code"
        content="404"
      />

      <main>
        <title>Product Not Found</title>

        <h1>Product Not Found</h1>

        <p>
          The product you requested could not be found in our current
          catalogue. It may have been removed, renamed, discontinued,
          or the address you entered may be incorrect. Please return
          to the main store page and browse the products that are
          currently available. Our catalogue contains laptops,
          headphones, monitors, keyboards, computer accessories,
          productivity equipment, and other technology products.
        </p>

        <p>
          Product pages normally include pricing, descriptions,
          specifications, availability information, compatibility
          details, shipping guidance, and other information that
          helps customers understand the item before purchasing.
          Because this product does not exist, we cannot provide
          accurate information for it. Showing a clear not-found
          message prevents visitors and search engines from assuming
          that an unavailable product is still part of the store.
        </p>

        <p>
          If you reached this page from an old bookmark or external
          link, the original product may no longer be available.
          Please visit the store homepage to find similar products.
          You can compare available devices and accessories and choose
          an alternative that meets your requirements. The store will
          continue to provide valid product pages for products that
          currently exist while missing product addresses correctly
          return a not-found response.
        </p>

        <p>
          This page intentionally contains enough descriptive content
          for the prerender snapshot sanity check while still clearly
          communicating that the requested product does not exist.
          Crawlers should receive the rendered page together with an
          HTTP 404 status code so that the missing address is not
          incorrectly treated as a valid indexed product page.
        </p>
      </main>
    </>
    
  );
}
if (path === "/sanity-fail") {
  return (
    <main>
      <title>Bad Page</title>
      <p>Loading...</p>
    </main>
    
  );
}

  // ==========================================
  // DEFAULT STORE PAGE
  // ==========================================
  return (
    <main>
      <title>Demo Store</title>

      <h1>Demo Store</h1>

      <p>This is the product page.</p>

      <section className="products">
        {products.map((product) => (
          <article key={product.id}>
            <h2>{product.name}</h2>

            <strong>{product.price}</strong>

            <p>{product.description}</p>
          </article>
        ))}
      </section>
    </main>
  );
}

export default App;