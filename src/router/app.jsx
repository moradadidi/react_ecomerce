import { BrowserRouter, Routes, Route  } from "react-router-dom";
import Layout from "./pages/layout";
import SignUp from "./pages/signup";
import Home from "./pages/home";
import Contact from "./pages/contact";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
        <Route index element={<Home/>} />
        <Route path="signup" element={<SignUp/>} />
        <Route path="contact" element={<Contact/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
