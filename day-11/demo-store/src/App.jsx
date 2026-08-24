import "./App.css";

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

function App(){
    const path = window.location.pathname;

  const products = [
    {
      name: "NovaBook Air",
      price: "₹74,999",
      description:
        "A lightweight laptop designed for students and remote workers. It delivers all-day battery life and a bright 14-inch display.",
    },
    {
      name: "SonicPods Pro",
      price: "₹12,999",
      description:
        "Wireless earbuds with active noise cancellation and spatial audio. The compact charging case provides up to 30 hours of listening.",
    },
  ];

  if (path === "/product/2") {
    return (
      <main>
        <h1>Product 2</h1>

        <h2>SonicPods Pro</h2>

        <strong>₹12,999</strong>

        <p>
          Wireless earbuds with active noise cancellation and
          spatial audio.
        </p>
      </main>
    );
  }
  return(
    
  <main>
    <title>Demo store</title>
    <p>This is the product page</p>
    <section className="products" >
   
         {products.map((product) => (
          <article key={product.id}>
            <h2>{product.name}</h2>
            <strong>{product.price}</strong>
            <p>{product.description}</p>
          </article>
        ))}
    </section>
  </main>
)
}

export default App ;