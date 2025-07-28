import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import "./index.css";
import { Toaster, toast } from "sonner";
import { Button } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import Spinner from "../../Components/Spinner";

// Razorpay script loader
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (document.getElementById("razorpay-script")) return resolve(true);
    const script = document.createElement("script");
    script.id = "razorpay-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const Cart = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCartItems = async () => {
    setLoading(true);
    try {
      const url = "https://ecommerce-backend-g96o.onrender.com/cart";
      let response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data, "data");
        setCartItems(data);
      } else {
        console.log(data, "error");
      }
      setLoading(false);
    } catch (err) {
      console.log(err, "error");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const removeCartItem = async (item) => {
    try {
      const url = `https://ecommerce-backend-g96o.onrender.com/cart/${item.id}`;
      let response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        toast.success("Item deleted successfully.");
        fetchCartItems();
      } else {
        toast.error("Failed to remove Item.");
      }
    } catch (err) {
      console.log(err, "error");
      toast.error("Something went wrong, Please try again wrong.");
    }
  };

  const getTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach((each) => {
      totalPrice += each.price;
    });
    return Math.round(totalPrice);
  };

  const totalPrice = getTotalPrice();
  const totalItems = cartItems.length;

  // Razorpay checkout handler
  const handleCheckout = async () => {
    const res = await loadRazorpayScript();
    if (!res) {
      toast.error("Razorpay SDK failed to load. Are you online?");
      return;
    }
    // Ideally, get order details from backend for security
    const options = {
      key: "rzp_test_1DP5mmOlF5G5ag", // Replace with your Razorpay key
      amount: totalPrice * 100, // in paise
      currency: "INR",
      name: "Ecommerce Store",
      description: "Order Payment",
      image: "https://yourdomain.com/logo.png", // optional
      handler: function (response) {
        toast.success(
          "Payment successful! Payment ID: " + response.razorpay_payment_id
        );
        // Optionally, call backend to verify payment and place order
      },
      prefill: {
        name: "",
        email: "",
        contact: "",
      },
      notes: {
        address: "Ecommerce Store Address",
      },
      theme: {
        color: "#6366f1",
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h2>
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <Spinner color="blue" size={40} />
          </div>
        ) : cartItems && cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center bg-white rounded-xl shadow p-8">
            <p className="text-lg text-gray-500">No cart items here</p>
            <Button
              onClick={() => navigate("/products")}
              className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition text-base font-semibold"
            >
              Find Products
            </Button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 bg-white rounded-xl shadow p-6">
              <h3 className="text-xl font-semibold mb-4"></h3>
              <ul className="divide-y divide-gray-200">
                {cartItems.map((each, index) => (
                  <li key={index} className="flex items-center py-6 gap-4">
                    <div className="w-24 h-24 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
                      <img
                        alt={each.name}
                        src={each.imageUrl}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-center">
                        <h4 className="text-lg font-medium text-gray-900 truncate">
                          {each.name}
                        </h4>
                        <span className="text-lg font-bold text-indigo-600">
                          ₹{each.price}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-gray-500 text-sm">Qty 1</span>
                        <button
                          type="button"
                          onClick={() => removeCartItem(each)}
                          className="font-medium text-red-600 hover:text-red-800 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full lg:w-96 bg-white rounded-xl shadow p-6 h-fit">
              <h3 className="text-xl font-semibold mb-4">Billing Summary</h3>
              <div className="flex justify-between mb-2 text-base">
                <span>Subtotal</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="flex justify-between mb-2 text-sm text-gray-500">
                <span>Total Items</span>
                <span>{totalItems}</span>
              </div>
              <div className="border-t border-gray-200 my-4"></div>
              <div className="flex justify-between text-lg font-bold mb-6">
                <span>Total</span>
                <span className="text-green-600">₹{totalPrice}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition text-lg font-semibold shadow"
                disabled={cartItems.length === 0}
              >
                Checkout now
              </button>
            </div>
          </div>
        )}
      </div>
      <Toaster richColors position="top-right" />
    </div>
  );
};

export default Cart;
