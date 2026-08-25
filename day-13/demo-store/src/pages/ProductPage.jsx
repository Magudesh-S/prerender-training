import { useEffect } from "react";

function ProductPage({ product }) {
  useEffect(() => {
    if (!product) {
      return;
    }

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Product",

      name: product.name,

      description: product.description,

      offers: {
        "@type": "Offer",

        price: String(product.price),

        priceCurrency: "INR",

        availability: product.inStock
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      },
    };

    const script =
      document.createElement("script");

    script.type =
      "application/ld+json";

    script.textContent =
      JSON.stringify(jsonLd);

    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [product]);

  if (!product) {
    return (
      <main>
        <h1>Product not found</h1>
      </main>
    );
  }

  return (
    <main>
      <h1>{product.name}</h1>

      <p>
        {product.description}
      </p>

      <p>
        Price: ₹{product.price}
      </p>

      <p>
        Availability:{" "}
        {product.inStock
          ? "In Stock"
          : "Out of Stock"}
      </p>
    </main>
  );
}

export default ProductPage;