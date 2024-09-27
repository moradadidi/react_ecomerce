import { useEffect, useState, useCallback } from "react";
export default function Home() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [error, setError] = useState(null);
  
    const getProducts = useCallback(() => {
      fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
          setFilteredProducts(data); // Initialize filtered products with all products
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
          product.category.toLowerCase().includes(category.toLowerCase())
        );
        setFilteredProducts(filtered); // Update filtered products
      },
      [products]
    );
  
    const debouncedSearchTerm = useCallback(
      () => {
        const timeoutId = setTimeout(() => {
          setFilteredProducts(
            products.filter((product) =>
              product.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
          );
        }, 300);
        return () => clearTimeout(timeoutId);
      },
      [searchTerm, products]
    );
  
    useEffect(() => {
      debouncedSearchTerm();
    }, [debouncedSearchTerm]);
  
    const displayProducts = useCallback(() => {
      return filteredProducts.map((product) => (
        <tr key={product.id} className="bg-white border-b-2 text-center">
          <td className="p-4">
            <img
              className="w-16 md:w-32 max-w-full max-h-full"
              src={product.image}
              alt={product.title}
              loading="lazy"
            />
          </td>
          <td className="px-6 py-4 font-semibold text-gray-900">
            {product.title}
          </td>
          <td className="px-6 py-4 text-gray-900">${product.price}</td>
          <td className="px-6 py-4 text-gray-900">{product.category}</td>
          <td className="px-6 py-4 text-gray-900">
            <div className="flex items-center justify-center">
              <svg
                className="w-4 h-4 text-yellow-300 me-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <p className="ms-2 text-sm font-bold text-gray-900">
                {product.rating ? product.rating.rate : "No rating"}
              </p>
              <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full"></span>
              <p className="text-sm font-medium text-gray-900 underline cursor-pointer hover:no-underline">
                {product.rating.count} reviews
              </p>
            </div>
          </td>
        </tr>
      ));
    }, [filteredProducts]);
  
    return (
      <div className="relative overflow-x-auto sm:rounded-lg mx-8 bg-white">
        {/* Search Input */}
        <div className="py-4 px-5 bg-orange-500 text-white">
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
            onClick={() => categoryFilter("men's clothing")}
          >
            Men's Clothing
          </button>
          <button
            className="px-9 cursor-pointer hover:underline"
            onClick={() => categoryFilter("jewelery")}
          >
            Jewelery
          </button>
          <button
            className="px-9 cursor-pointer hover:underline"
            onClick={() => categoryFilter("electronics")}
          >
            Electronics
          </button>
          <button
            className="px-9 cursor-pointer hover:underline"
            onClick={() => categoryFilter("women's clothing")}
          >
            Women's Clothing
          </button>
        </div>
  
        {error && <div className="p-4 text-red-600">{error}</div>}
  
        <table className="w-full text-sm text-center rtl:text-right text-gray-500 border-none">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Rating
              </th>
            </tr>
          </thead>
          <tbody>{displayProducts()}</tbody>
        </table>
      </div>
    );
  }
  