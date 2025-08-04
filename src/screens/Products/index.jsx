import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import "./index.css";
import { Toaster, toast } from "sonner";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Radio,
  RadioGroup,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/20/solid";
import Spinner from "../../Components/Spinner";

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

const Products = () => {
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState({
    id: 13,
    name: "Stylish Aviator Sunglasses",
    price: 29.95,
    image: "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
    description: "UV-protected stylish metal frame sunglasses.",
    category: "Accessories",
    brand: "SkyView",
    rating: { rate: 4.6, count: 250 },
    inStock: 1,
    discountPercentage: 20,
  });
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");

    if (category) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory("all");
    }
  }, []);

  const fetchProducts = () => {
    setLoading(true);
    const url = "https://ecommerce-backend-g96o.onrender.com/products";
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data[0]?.message) {
          console.log(data[0].message, "error");
          setProducts([]);
        } else {
          setProducts(data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addtoCart = async () => {
    try {
      let body = {
        productId: selectedProduct.id,
        poquantity: 1,
        name: selectedProduct.name,
        price: selectedProduct.price,
        description: selectedProduct.description,
        imageUrl: selectedProduct.image,
      };
      const url = "https://ecommerce-backend-g96o.onrender.com/cart";
      let response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Your JWT token
        },
        body: JSON.stringify(body),
      });
      if (response.ok) {
        toast.success("Product added to cart successfully.");
        setOpen(false);
      } else {
        toast.error("Something went wrong, please try again later");
      }
    } catch (err) {
      console.log(err, "error");
      toast.error("Something went wrong, please try again later");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <MenuButton className="inline-flex items-center gap-x-2 rounded-lg bg-white px-4 py-2 text-base font-semibold text-gray-900 shadow ring-1 ring-gray-300 hover:bg-gray-100">
                <span>
                  {selectedCategory === "all"
                    ? "All Categories"
                    : selectedCategory}
                </span>
                <ChevronDownIcon
                  aria-hidden="true"
                  className="size-5 text-gray-400"
                />
              </MenuButton>
            </div>
            <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
              <div className="py-1">
                {[
                  "all",
                  "Electronics",
                  "Clothing",
                  "Footwear",
                  "Accessories",
                  "Home & Kitchen",
                ].map((category) => (
                  <MenuItem key={category}>
                    <button
                      type="button"
                      onClick={() => setSelectedCategory(category)}
                      className={`block w-full px-4 py-2 text-left text-base ${
                        selectedCategory === category
                          ? "bg-indigo-100 text-indigo-700 font-semibold"
                          : "text-gray-700"
                      } hover:bg-indigo-50`}
                    >
                      {category === "all" ? "All Categories" : category}
                    </button>
                  </MenuItem>
                ))}
              </div>
            </MenuItems>
          </Menu>
        </div>
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <Spinner color="blue" size={40} />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {products &&
                products
                  .filter((item) =>
                    selectedCategory === "all"
                      ? item
                      : item.category === selectedCategory
                  )
                  .map((product, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer flex flex-col border border-gray-100 group"
                      onClick={() => {
                        setSelectedProduct(product);
                        setOpen(true);
                      }}
                    >
                      <div className="relative">
                        <img
                          alt={product.name}
                          src={product.image}
                          className="aspect-square w-full rounded-t-xl object-cover group-hover:opacity-90"
                        />
                        {product.discountPercentage && (
                          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                            {product.discountPercentage}% OFF
                          </span>
                        )}
                      </div>
                      <div className="flex-1 flex flex-col p-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xl font-bold text-indigo-600">
                            ₹{product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm line-through text-gray-400">
                              ₹{product.originalPrice}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                          <span className="text-yellow-500 flex items-center">
                            <StarIcon className="size-5" aria-hidden="true" />
                            <span className="ml-1 text-base font-medium text-gray-700">
                              {product.rating?.rate || 0}
                            </span>
                          </span>
                          <span className="ml-2 text-xs text-gray-500">
                            ({product.rating?.count || 0} reviews)
                          </span>
                        </div>
                        <div className="text-sm text-gray-500 mb-2">
                          Brand:{" "}
                          <span className="font-medium text-gray-700">
                            {product.brand}
                          </span>
                        </div>
                        <div className="flex-1" />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProduct(product);
                            setOpen(true);
                          }}
                          className="mt-2 w-full rounded-md bg-indigo-600 px-4 py-2 text-base font-semibold text-white hover:bg-indigo-700 transition cursor-pointer"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
            </div>
            {products && products.length === 0 && !loading && (
              <div className="text-center text-gray-500 py-16 text-xl">
                No products found.
              </div>
            )}
          </>
        )}
        {open && (
          <Dialog
            open={open}
            onClose={() => setOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ease-in-out"
          >
            <DialogPanel className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8 relative flex flex-col md:flex-row gap-8">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <span className="sr-only">Close</span>
                <XMarkIcon aria-hidden="true" className="size-7" />
              </button>
              <img
                alt={selectedProduct.name || "image"}
                src={selectedProduct.image || ""}
                className="w-full md:w-1/2 rounded-xl object-cover bg-gray-100 aspect-square"
              />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedProduct.name}
                  </h2>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl font-bold text-indigo-600">
                      ₹{selectedProduct.price}
                    </span>
                    {selectedProduct.originalPrice && (
                      <span className="text-sm line-through text-gray-400">
                        ₹{selectedProduct.originalPrice}
                      </span>
                    )}
                    {selectedProduct.discountPercentage && (
                      <span className="ml-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        {selectedProduct.discountPercentage}% OFF
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    <StarIcon
                      className="size-5 text-yellow-500"
                      aria-hidden="true"
                    />
                    <span className="text-base font-medium text-gray-700">
                      {selectedProduct.rating?.rate || 0}
                    </span>
                    <span className="ml-2 text-xs text-gray-500">
                      ({selectedProduct.rating?.count || 0} reviews)
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 mb-2">
                    Brand:{" "}
                    <span className="font-medium text-gray-700">
                      {selectedProduct.brand}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 mb-2">
                    In Stock:{" "}
                    <span className="font-medium text-green-600">
                      {selectedProduct.inStock}
                    </span>
                  </div>
                  <div className="text-base text-gray-700 mb-4">
                    {selectedProduct.description}
                  </div>
                </div>
                <button
                  onClick={addtoCart}
                  className="mt-4 w-full rounded-md bg-indigo-600 px-6 py-3 text-lg font-semibold text-white hover:bg-indigo-700 transition"
                >
                  Add to Cart
                </button>
              </div>
            </DialogPanel>
          </Dialog>
        )}
      </div>
      <Toaster richColors position="top-right" />
    </div>
  );
};

export default Products;
