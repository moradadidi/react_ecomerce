import React, { useState, useEffect, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./footer";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(null);

  const getProducts = useCallback(() => {
    fetch("https://api.escuelajs.co/api/v1/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError("Failed to fetch products. Please try again later.");
      });
  }, []);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const categoryFilter = useCallback(
    (category) => {
      const filtered = products.filter((product) =>
        product.category.name.toLowerCase().includes(category.toLowerCase())
      );
      setFilteredProducts(filtered);
    },
    [products]
  );

  const debouncedSearchTerm = useCallback(() => {
    const timeoutId = setTimeout(() => {
      setFilteredProducts(
        products.filter((product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchTerm, products]);

  useEffect(() => {
    debouncedSearchTerm();
  }, [debouncedSearchTerm]);

  const addToCart = (productId) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProductIndex = existingCart.findIndex(
      (product) => product.id === productId
    );

    if (existingProductIndex > -1) {
      const updatedCart = [...existingCart];
      updatedCart[existingProductIndex].quantity += 1;
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      toast.info("Product already exists in cart!");
    } else {
      const productToAdd = filteredProducts.find(
        (product) => product.id === productId
      );

      if (!productToAdd) return;

      const updatedCart = [
        ...existingCart,
        { ...productToAdd, quantity: 1 },
      ];

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      toast.success("Product added to cart successfully!");
    }
  };

  const displayProducts = useCallback(() => {
    return filteredProducts
      .filter((product) =>
        !["Hyperlastic JBL", "Bombacat JBL", "New Product", "string", "Classic Reed Pullover Hoodie"].includes(product.title)
      )
      .map((product) => {
        const productRating = product.rating?.rate || Math.random() * (5 - 3) + 3 // Generate random rating if not available
  
        return (
          <div
            key={product.id}
            className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden"
          >
            <button className="w-full bg-white p-4">
              <img
                className="w-full h-48 object-contain"
                src={product.images[0]}
                alt={product.title}
              />
            </button>
  
            <div className="px-5 pb-5">
              <button className="text-left w-full">
                <h5 className="text-lg font-bold tracking-tight text-gray-900 mb-2">
                  {product.title}
                </h5>
              </button>
              <div className="flex items-center mt-2 mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(productRating)
                          ? "text-yellow-300"
                          : "text-gray-200"
                      }`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                  ))}
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold ml-2 px-2.5 py-0.5 rounded">
                  {productRating.toFixed(1)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-gray-900">
                  ${product.price}
                </span>
                <button onClick={() => addToCart(product.id)} className="text-purple-500 hover:text-purple-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                  <i className="fa-solid fa-cart-plus text-2xl"></i>
                </button>
              </div>
            </div>
          </div>
        );
      });
  }, [filteredProducts]);
  
  

  return (
    <div className="px-8  bg-gray-100">
      <ToastContainer />
      {/* Search Input */}
      <div className="py-4 px-5 sticky top-20 bg-purple-500 text-white mb-4">
  <input
    type="text"
    placeholder="Search products..."
    className="w-1/3 p-2 border border-gray-300 rounded-lg text-black"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    aria-label="Search products"
  />

  <button
    className="px-6 cursor-pointer hover:underline"
    onClick={() => categoryFilter("")}
  >
    All
  </button>
  <button
    className="px-9 cursor-pointer hover:underline"
    onClick={() => categoryFilter("clothes")}
  >
    Clothes
  </button>
  <button
    className="px-9 cursor-pointer hover:underline"
    onClick={() => categoryFilter("electronics")}
  >
    Electronics
  </button>
  <button
    className="px-9 cursor-pointer hover:underline"
    onClick={() => categoryFilter("furniture")}
  >
    Furniture
  </button>
  <button
    className="px-9 cursor-pointer hover:underline"
    onClick={() => categoryFilter("shoes")}
  >
    Shoes
  </button>
  <button
    className="px-9 cursor-pointer hover:underline"
    onClick={() => categoryFilter("miscellaneous")}
  >
    Miscellaneous
  </button>
</div>


      {error && <div className="p-4 text-red-600">{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayProducts()}
      </div>
      <div className="footer">
        {<Footer />}
      </div>
    </div>
  );
}
