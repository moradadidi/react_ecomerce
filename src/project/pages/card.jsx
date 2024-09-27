import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./footer";

export default function Card() {
  const [cardProducts, setCardProducts] = useState([]);

  useEffect(() => {
    // Fetch current cart products from local storage on component mount
    const storedProducts = JSON.parse(localStorage.getItem("cart"));
    if (storedProducts) {
      setCardProducts(storedProducts);
    }
  }, []);

  const removeFromCart = (id) => {
    // Filter out the product to be removed
    const updatedProducts = cardProducts.filter(product => product.id !== id);
    // Update local storage
    localStorage.setItem("cart", JSON.stringify(updatedProducts));
    // Update state to trigger re-render
    setCardProducts(updatedProducts);
    // Show a success toast notification
    toast.error("Product removed from cart!");
  };

  const updateQuantity = (id, amount) => {
    const updatedProducts = cardProducts.map(product => {
      if (product.id === id) {
        const newQuantity = product.quantity + amount;
        return {
          ...product,
          quantity: newQuantity > 0 ? newQuantity : 1, // Ensure quantity doesn't go below 1
        };
      }
      return product;
    });

    // Update local storage
    localStorage.setItem("cart", JSON.stringify(updatedProducts));
    // Update state to trigger re-render
    setCardProducts(updatedProducts);
  };

  const displayProducts = () => {
    if (cardProducts && cardProducts.length > 0) {
      return cardProducts.map((product) => (
        <tr key={product.id} className="bg-white border-b hover:bg-gray-50">
          <td className="p-4">
            {/* Ensure the image array exists and has at least one image */}
            {product.images && product.images.length > 0 ? (
              <img src={product.images[0]} alt={product.title} className="w-16 md:w-32 max-w-full max-h-full" />
            ) : (
              <span className="text-gray-500">No image available</span>
            )}
          </td>
          <td className="px-6 py-4 font-semibold text-gray-900">
            {product.title}
          </td>
          <td className="px-6 py-4">
            <div className="flex items-center">
              <button
                className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                type="button"
                onClick={() => updateQuantity(product.id, -1)} // Decrease quantity
              >
                <span className="sr-only">Decrease Quantity</span>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                </svg>
              </button>
              <div>
                <input
                  type="number"
                  value={product.quantity}
                  className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1"
                  readOnly
                />
              </div>
              <button
                className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                type="button"
                onClick={() => updateQuantity(product.id, 1)} // Increase quantity
              >
                <span className="sr-only">Increase Quantity</span>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                </svg>
              </button>
            </div>
          </td>
          <td className="px-6 py-4 font-semibold text-gray-900">
            ${product.price.toFixed(2)}
          </td>
          <td className="px-6 py-4">
            <button
              className="font-medium text-red-600 hover:underline"
              onClick={() => removeFromCart(product.id)}
            >
              Remove
            </button>
          </td>
        </tr>
      ));
    } else {
      return (
        <tr>
          <td colSpan="5" className="p-4 text-center text-gray-500">
            Your cart is empty.
          </td>
        </tr>
      );
    }
  };

  return (
    <section className="home pt-12">
      <div className="md:col-span-2 bg-gray-100 shadow-lg mx-8 rounded-lg p-8">
        <h2 className="text-3xl font-semibold mb-6 border-b pb-4">Shopping Cart</h2>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {displayProducts()}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer />
      <div className="footer">
          {<Footer/>}
      </div>
    </section>
  );
}
