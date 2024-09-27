import React, { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate  } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";


export default function SignUp() {
  const firstNameRef = useRef("");
  const lastNameRef = useRef("");
  const emailRef = useRef("");
  const phoneRef = useRef("");
  const agreeRef = useRef(false);
  const countryRef = useRef("");
  const passwordRef = useRef("");
  const repeatPasswordRef = useRef("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = [];
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const email = emailRef.current.value;
    const phone = phoneRef.current.value;
    const password = passwordRef.current.value;
    const repeatPassword = repeatPasswordRef.current.value;
    const agree = agreeRef.current.checked;
    const country = countryRef.current.value;

    if (firstName.trim() === "") {
      newErrors.push("Invalid first name.");
      document.getElementById("first_name").style.borderColor = "red";
    } else {
      document.getElementById("first_name").style.borderColor = "blue";
    }
    if (lastName.trim() === "") {
      newErrors.push("Invalid last name.");
      document.getElementById("last_name").style.borderColor = "red";
    } else {
      document.getElementById("last_name").style.borderColor = "blue";
    }
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      newErrors.push("Invalid email.");
      document.getElementById("email").style.borderColor = "red";
    } else {
      document.getElementById("email").style.borderColor = "blue";
    }
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!phoneRegex.test(phone)) {
      newErrors.push("Invalid phone number.");
      document.getElementById("phone").style.borderColor = "red";
    } else {
      document.getElementById("phone").style.borderColor = "blue";
    }
    if (password.length < 8) {
      newErrors.push("Password must be at least 8 characters.");
      document.getElementById("password").style.borderColor = "red";
    } else {
      document.getElementById("password").style.borderColor = "blue";
    }
    if (password !== repeatPassword) {
      newErrors.push("Passwords do not match.");
      document.getElementById("repeat_password").style.borderColor = "red";
    } else {
      document.getElementById("repeat_password").style.borderColor = "blue";
    }
    if (!agree) {
      newErrors.push("You must agree to the terms and conditions.");
    }
    if (country === "") {
      newErrors.push("Please select a country.");
      document.getElementById("country").style.borderColor = "red";
    } else {
      document.getElementById("country").style.borderColor = "blue";
    }
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formData = {
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        email: emailRef.current.value,
        phone: phoneRef.current.value,
        password: passwordRef.current.value,
        repeatPassword: repeatPasswordRef.current.value,
        agree: agreeRef.current.checked,
        country: countryRef.current.value,
      };
      toast.success(`Account Created!`);
      console.log(formData);
      // You can now send formData to your server or perform other actions
      navigate("/"); 
    }
  };

  const displayErrors = () => {
    return errors.length > 0 ? (
      <div
        className="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
        role="alert"
      >
        <svg
          className="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span className="sr-only">Error</span>
        <div>
          <span className="font-medium">
            Ensure that these requirements are met:
          </span>
          <ul className="mt-1.5 list-disc list-inside">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      </div>
    ) : null;
  };

  return (
    
    <>
     <ToastContainer />
      <form onSubmit={handleSubmit} className="max-w-md mt-32 mx-auto">
        <h1 className="text-center text-orange-500 text-2xl font-bold my-6">
          Sign Up
        </h1>
        {displayErrors()}
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="first_name"
              id="first_name"
              ref={firstNameRef}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="first_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              First name
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="last_name"
              id="last_name"
              ref={lastNameRef}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="last_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Last name
            </label>
          </div>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            id="email"
            ref={emailRef}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="tel"
            name="phone"
            id="phone"
            ref={phoneRef}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Phone number
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <select
            name="country"
            id="country"
            ref={countryRef}
            className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          >
            <option value="" disabled selected>
              Select country
            </option>
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Australia">Australia</option>
            {/* Add more options as needed */}
          </select>
          <label
            htmlFor="country"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Country
          </label>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="password"
              id="password"
              ref={passwordRef}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="repeat_password"
              id="repeat_password"
              ref={repeatPasswordRef}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="repeat_password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Confirm password
            </label>
          </div>
        </div>
         <div className="flex items-center mb-5">
                    <input
                        type="checkbox"
                        name="agree"
                        id="agree"
                        ref={agreeRef}
                        className="w-4 h-4 mt-2 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"
                        required
                    />
                    <label
                        htmlFor="agree"
                        className="ml-2  mt-1 text-sm font-medium text-gray-900"
                    >
                        I agree to the terms and conditions
                    </label>
                </div>
        <button
          type="submit"
          className="text-white mx-40 bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none"
        >
          Sign Up
        </button>
      </form>
    </>
  );
}
