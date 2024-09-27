import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import shopImage from "./shop.jpg";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    // Fetch Categories
    fetch("https://api.escuelajs.co/api/v1/products")
      .then((response) => response.json())
      .then((data) => {
        const uniqueCategories = new Map();
        data.forEach((product) => {
          const category = product.category;
          if (!uniqueCategories.has(category.id)) {
            uniqueCategories.set(category.id, {
              image: category.image,
              title: category.name,
            });
          }
        });
        setCategories(Array.from(uniqueCategories.values()));

        // Get the 4 latest products
        const sortedProducts = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setLatestProducts(sortedProducts.slice(4, 8)); // Get the 4 latest products
      })
      .catch((error) => {
        console.error("Error fetching data from API", error);
      });
  }, []);

  const handleShopNowClick = () => {
    navigate("/products");
  };

  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* Hero Section */}
      <section className="hero pt-28 h-[calc(100vh-64px)] flex flex-col justify-center">
        <div className="max-w-screen-xl mx-auto text-gray-600 gap-x-12 items-center justify-between overflow-hidden md:flex md:px-8">
          <motion.div
            className="flex-none space-y-5 px-4 sm:max-w-lg md:px-0 lg:max-w-xl"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="text-sm text-purple-600 font-medium">
              Discover the Best Deals
            </h1>
            <h2 className="text-4xl text-gray-800 font-extrabold md:text-5xl">
              Elevate Your Shopping Experience with Us
            </h2>
            <p>
              Explore a wide range of products with unbeatable prices and
              exclusive discounts. Shop now and enjoy free shipping on all
              orders over $50.
            </p>
            <div className="items-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
              <motion.button
                onClick={handleShopNowClick}
                className="block py-2 px-4 text-center text-white font-medium bg-purple-500 duration-150 hover:bg-purple-500 active:bg-purple-700 rounded-lg shadow-lg hover:shadow-none"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Shop Now
              </motion.button>
              <motion.a
                href="/products"
                className="flex items-center justify-center gap-x-2 py-2 px-4 bg-gray-200 text-gray-700 hover:text-gray-500 font-medium duration-150 active:bg-gray-100 border rounded-lg md:inline-flex"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </motion.a>
            </div>
          </motion.div>
          <motion.div
            className="flex-none mt-14 md:mt-0 md:max-w-xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <img
              src={shopImage}
              className="md:rounded-tl-[108px] md:rounded-br-[108px]"
              alt="Shopping Experience"
            />
          </motion.div>
        </div>
      </section>

      {/* Title Above Categories */}
      <div className="text-center py-10">
        <h3 className="text-3xl font-bold text-gray-800">Shop by Categories</h3>
        <p className="text-gray-600 mt-2">
          Explore our wide variety of categories and find the perfect products
          for you.
        </p>
      </div>

      {/* Masonry Grid */}
      <div className="flex-grow w-full p-5">
        <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer transition-transform duration-300 transform hover:scale-105 break-inside-avoid-column"
            >
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-auto object-cover"
                style={{ height: `${Math.random() * 200 + 150}px` }} // Randomized height for masonry effect
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-lg font-semibold">
                  {category.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Latest Products Section */}
      <div className="text-center py-10">
        <h3 className="text-3xl font-bold text-gray-800">Latest Products</h3>
        <p className="text-gray-600 mt-2">
          Check out the latest additions to our store.
        </p>
      </div>

      <div className="flex-grow w-full p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {latestProducts.map((product, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer transition-transform duration-300 transform hover:scale-105"
            >
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-auto object-cover"
              />
              <div className="p-4">
                <h4 className="text-lg font-semibold text-gray-800">
                  {product.title}
                </h4>
                <p className="text-gray-600">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
