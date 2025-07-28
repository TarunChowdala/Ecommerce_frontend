import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import "./index.css";
import { Toaster, toast } from "sonner";
import { Link } from "react-router-dom";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Radio,
  RadioGroup,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/20/solid";

const Home = () => {
  const [open, setOpen] = useState(false);

  const [products, setProducts] = useState([]);

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

  const token = localStorage.getItem("token");

  const fetchProducts = () => {
    try {
      const url = "https://ecommerce-backend-g96o.onrender.com/products";
      fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Add your JWT token here
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data[0].message) {
            toast.error(data[0].message);
          } else {
            console.log(data, "data");
            setProducts(data);
          }
        })
        .catch((error) => console.error("Error:", error));
    } catch (err) {
      console.log(err, "error");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const promoSection = () => {
    return (
      <div className="relative overflow-hidden bg-transparent">
        <div className="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
          <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
            <div className="sm:max-w-lg">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Summer styles are finally here
              </h1>
              <p className="mt-4 text-xl text-gray-500">
                This year, our new summer collection will shelter you from the
                harsh elements of a world that doesn't care if you live or die.
              </p>
            </div>
            <div>
              <div className="mt-10">
                {/* Decorative image grid */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                >
                  <div className="absolute transform sm:top-0 sm:left-1/2 sm:translate-x-8 lg:top-1/2 lg:left-1/2 lg:translate-x-8 lg:-translate-y-1/2">
                    <div className="flex items-center space-x-6 lg:space-x-8">
                      <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                          <img
                            alt=""
                            src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-01.jpg"
                            className="size-full object-cover"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            alt=""
                            src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-02.jpg"
                            className="size-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            alt=""
                            src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-03.jpg"
                            className="size-full object-cover"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            alt=""
                            src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-04.jpg"
                            className="size-full object-cover"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            alt=""
                            src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-05.jpg"
                            className="size-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            alt=""
                            src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-06.jpg"
                            className="size-full object-cover"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            alt=""
                            src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-07.jpg"
                            className="size-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Link
                  to="/categories"
                  className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700"
                >
                  Shop Collection
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

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
    <div className="layout-main">
      <Navbar />
      <div className="layout-inner">
        {promoSection()}

        <div className="bg-white">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">
              Featured Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {products &&
                products
                  .filter((item, index) => index < 8 && item)
                  .map((product) => (
                    <div
                      key={product.id}
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
                          className="mt-2 w-full rounded-md bg-indigo-600 px-4 py-2 text-base font-semibold text-white hover:bg-indigo-700 transition"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>
      <Toaster richColors position="top-right" />
      <Dialog open={open} onClose={setOpen} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/40" />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
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
        </div>
      </Dialog>
    </div>
  );
};

export default Home;
