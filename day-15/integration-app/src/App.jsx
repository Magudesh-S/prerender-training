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
        SonicPods Pro are wireless earbuds designed for music,
        calls, travel, study, and everyday listening. They include
        active noise cancellation to reduce distracting background
        sound and spatial audio for a wider listening experience.
        The compact charging case provides additional battery life
        throughout the day and makes the earbuds easy to carry.
      </p>

      <p>
        The earbuds are intended for users who regularly switch
        between laptops, phones, and tablets. Wireless connectivity
        allows them to work without cables while built-in microphones
        support voice calls and online meetings. Touch controls make
        it possible to manage playback, answer calls, and adjust
        listening features without constantly reaching for the
        connected device.
      </p>

      <p>
        Comfort is important for long listening sessions, so the
        product includes multiple ear-tip sizes that help users find
        a secure fit. A better seal can also improve passive noise
        isolation and help the active noise cancellation system work
        effectively. The lightweight design is suitable for commuting,
        studying, working, exercising, and general daily use.
      </p>

      <p>
        The charging case protects the earbuds when they are not being
        used and supplies additional power between charging sessions.
        Battery information can be checked from a connected device,
        helping users know when the earbuds or case need charging.
        The product is designed to provide reliable audio without
        requiring users to remain close to a power outlet.
      </p>

      <p>
        SonicPods Pro also support media such as podcasts, films,
        video calls, online classes, and music streaming. Their
        combination of wireless convenience, noise cancellation,
        portable charging, microphones, and simple controls makes
        them suitable for both entertainment and productivity.
        Customers should review device compatibility and available
        features before purchasing to make sure the earbuds meet
        their individual requirements.
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