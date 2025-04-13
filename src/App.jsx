// import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Home from "./screens/Home";
import Categories from "./screens/Categories";
import ProtectedRoute from "./ProtectedRoute";
import Products from "./screens/Products";
import Cart from "./screens/Cart";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<ProtectedRoute element={<Home />} />} />
          <Route
            path="/categories"
            element={<ProtectedRoute element={<Categories />} />}
          />
          <Route
            path="/products"
            element={<ProtectedRoute element={<Products />} />}
          />
          <Route path="/cart" element={<ProtectedRoute element={<Cart />} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
