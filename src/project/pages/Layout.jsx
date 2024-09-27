import { Link, Outlet } from 'react-router-dom';
import shopImage from './image.png';

const logoClick = () => {
  window.location.href = "/"
}
export default function Layout() {
  return (
    <>
      <nav className="bg-white border-gray-200 shadow-md sticky top-0 z-50">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <img src={shopImage} id='logo' onClick={logoClick} className="h-12 rounded-full cursor-pointer" alt="shop Logo" />
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-normal flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
              <li>
                <Link
                  to="/"
                  className="block py-2 px-3 text-gray-900 bg-purple-500 hover:bg-gray-100 transition duration-300 ease-in-out md:hover:bg-transparent md:border-0 md:hover:text-purple-500 rounded md:bg-transparent md:text-black md:p-0"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 transition duration-300 ease-in-out md:hover:bg-transparent md:border-0 md:hover:text-purple-500 md:p-0"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/card"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 transition duration-300 ease-in-out md:hover:bg-transparent md:border-0 md:hover:text-purple-500 md:p-0"
                >
                  Card
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 transition duration-300 ease-in-out md:hover:bg-transparent md:border-0 md:hover:text-purple-500 md:p-0"
                >
                  Contact
                </Link>
              </li>
              <div className="flex gap-4 pl-60">
                <li>
                  <Link
                    to="/signUp"
                    className="py-2 px-4 text-white bg-purple-500 rounded hover:bg-purple-800 transition duration-300 ease-in-out md:p-2"
                  >
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    className="py-2 px-4 text-gray-900 border border-purple-500 rounded hover:bg-purple-500 hover:text-white transition duration-300 ease-in-out md:p-2"
                  >
                    Login
                  </Link>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </nav>
      <div className="">
        <Outlet />
      </div>
    </>
  );
}
