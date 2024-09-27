import { BrowserRouter, Routes, Route  } from "react-router-dom";
import Layout from "./pages/Layout";
import SignUp from "./pages/signup";
import Home from "./pages/home";
import Contact from "./pages/Contact";
import Card from "./pages/card";
import Products from "./pages/products";
import Login from "./pages/login";

export default function Store() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
        <Route index element={<Home/>} />
        <Route path="signup" element={<SignUp/>} />
        <Route path="contact" element={<Contact/>} />
        <Route path="card" element={<Card/>} />
        <Route path="products" element={<Products/>} />
        <Route path="login" element={<Login/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
