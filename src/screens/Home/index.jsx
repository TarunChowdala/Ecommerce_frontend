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

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

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
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Featured Products
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {products &&
                products
                  .filter((item, index) => index < 8 && item)
                  .map((product) => (
                    <div
                      key={product.id}
                      className="group relative"
                      onClick={() => {
                        setSelectedProduct(product);
                        setOpen(true);
                      }}
                    >
                      <img
                        alt={product.name}
                        src={product.image}
                        className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                      />
                      <div className="mt-4 flex justify-between">
                        <div>
                          <h3 className="text-sm text-gray-700">
                            <a href={product.href}>
                              <span
                                aria-hidden="true"
                                className="absolute inset-0"
                              />
                              {product.name}
                            </a>
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            {product.color}
                          </p>
                        </div>
                        <p className="text-sm font-medium text-gray-900">
                          {product.price}
                        </p>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>
      <Toaster richColors position="top-right" />
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 hidden bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in md:block"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
            <DialogPanel
              transition
              className="flex w-full transform text-left text-base transition data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in md:my-8 md:max-w-2xl md:px-4 data-closed:md:translate-y-0 data-closed:md:scale-95 lg:max-w-4xl"
            >
              <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                >
                  <span className="sr-only">Close</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>

                <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                  <img
                    alt={selectedProduct.name || "image"}
                    src={selectedProduct.image || ""}
                    className="aspect-2/3 w-full rounded-lg bg-gray-100 object-cover sm:col-span-4 lg:col-span-5"
                  />
                  <div
                    className="sm:col-span-8 lg:col-span-7 flex flex-col"
                    style={{ height: "100%" }}
                  >
                    <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
                      {selectedProduct.name}
                    </h2>

                    <section
                      aria-labelledby="information-heading"
                      className="mt-2"
                    >
                      <h3 id="information-heading" className="sr-only">
                        Product information
                      </h3>

                      <p className="text-2xl text-gray-900">
                        {selectedProduct.price}
                      </p>

                      {/* Reviews */}
                      <div className="mt-6">
                        <h4 className="sr-only">Reviews</h4>
                        <div className="flex items-center">
                          <div className="flex items-center">
                            <p>{selectedProduct.rating.rate}</p>
                            {[0, 1, 2, 3, 4].map((rating) => (
                              <StarIcon
                                key={rating}
                                aria-hidden="true"
                                className={classNames(
                                  selectedProduct.rating > rating
                                    ? "text-gray-900"
                                    : "text-gray-200",
                                  "size-5 shrink-0"
                                )}
                              />
                            ))}
                          </div>
                          <p className="sr-only">
                            {selectedProduct.rating.rate} out of 5 stars
                          </p>
                          <span className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                            {selectedProduct.rating.count} reviews
                          </span>
                        </div>
                      </div>
                      <h2 className="mt-2 mb-2">
                        {selectedProduct.description}
                      </h2>
                      <h2 className="text-sm font-medium">
                        In Stock :
                        <span className="text-sm">
                          {" "}
                          {selectedProduct.inStock}
                        </span>
                      </h2>
                      <h2 className="text-sm font-medium mt-2">
                        Brand :{" "}
                        <span className="text-sm text-muted">
                          {" "}
                          {selectedProduct.brand}
                        </span>
                      </h2>
                    </section>

                    <section
                      aria-labelledby="options-heading"
                      className="mt-auto"
                    >
                      <h3 id="options-heading" className="sr-only">
                        Product options
                      </h3>

                      <button
                        onClick={() => addtoCart()}
                        className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
                      >
                        Add to bag
                      </button>
                    </section>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Home;
