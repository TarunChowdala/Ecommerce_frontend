import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import "./index.css";
import { Toaster, toast } from "sonner";
import { Button } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [cartItems, setCartItems] = useState([]);

  const fetchCartItems = async () => {
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
    } catch (err) {
      console.log(err, "error");
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
    cartItems.map((each) => {
      totalPrice += each.price;
    });
    return Math.round(totalPrice);
  };

  const totalPrice = getTotalPrice();

  return (
    <div className="layout-main">
      <Navbar />
      <div className="layout-inner">
        <div className="bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
              <h2 className="text-2xl font-bold text-gray-900">Cart Items</h2>
              {cartItems && cartItems.length === 0 && (
                <div
                  className="flex flex-col items-center justify-center p-3"
                  style={{ width: "100%" }}
                >
                  <p>No cart Items here</p>
                  <br />
                  <Button
                    onClick={() => navigate("/products")}
                    className="cursor-pointer mt-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition duration-300"
                  >
                    Find Products
                  </Button>
                </div>
              )}
              <div className="cart-list mt-4">
                <ul className="cart-list-items" role="list">
                  {cartItems && cartItems.length > 0 ? (
                    cartItems.map((each, index) => (
                      <li key={index} className="flex py-6">
                        <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            alt={each.name}
                            src={each.imageUrl}
                            className="size-full object-cover"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a>{each.name}</a>
                              </h3>
                              <p className="ml-4">{each.price}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500"></p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <p className="text-gray-500">Qty 1</p>
                            <div className="flex">
                              <button
                                type="button"
                                onClick={() => removeCartItem(each)}
                                className="cursor-pointer font-medium text-indigo-600 hover:text-indigo-500"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <div></div>
                    // <div className="flex flex-col items-center justify-center p-3">
                    //   <p>No cart Items here</p>
                    //   <br />
                    //   <Button
                    //     onClick={() => navigate("/products")}
                    //     className="cursor-pointer mt-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition duration-300"
                    //   >
                    //     Find Products
                    //   </Button>
                    // </div>
                  )}
                </ul>
                {cartItems.length > 0 && (
                  <div className="mt-6 p-4 order-details">
                    <div className="flex justify-between items-center mb-4">
                      <p className="text-lg font-semibold">Total Price:</p>
                      <p className="text-lg font-bold text-green-600">
                        ${totalPrice}
                      </p>{" "}
                      {/* Replace with your dynamic price */}
                    </div>

                    {/* Optional: add other details */}
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Total Items:</span>
                      <span>{cartItems.length}</span>{" "}
                      {/* Replace with dynamic item count */}
                    </div>

                    {/* Order Now Button */}
                    <button className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition">
                      Order Now
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster richColors position="top-right" />
    </div>
  );
};

export default Cart;
