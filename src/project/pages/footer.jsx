import React from 'react';
import shopImage from './image.png';
export default function Footer() {
  return (
    <footer className="bg-white rounded-lg shadow  mt-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a href="https://www.linkedin.com/in/morad-adidi-b35a682a5/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <img src={shopImage} className="h-16" alt="Flowbite Logo" />
          </a>
          <ul className="flex flex-wrap items-center gap-12 mb-6 text-lg font-medium text-gray-500 sm:mb-0 ">
            <li>
              <a href="/about" className="hover:underline me-4 md:me-6">About</a>
            </li>
            <li>
              <a href="/privacy-policy" className="hover:underline me-4 md:me-6">Privacy Policy</a>
            </li>
            <li>
              <a href="/licensing" className="hover:underline me-4 md:me-6">Licensing</a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">Contact</a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center ">
          © 2023 <a href="https://www.linkedin.com/in/morad-adidi-b35a682a5/" className="hover:underline">Adidi</a>. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
