"use client";
import "./index.css";
import { useState } from "react";
import { Dialog, DialogPanel, PopoverGroup } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { PhoneIcon, PlayCircleIcon } from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router-dom";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const Navbar = () => {
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token"), navigate("/login");
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8"
      >
        {/* Logo */}
        <div className="flex items-center gap-2 lg:flex-1">
          <a href="/" className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 80 80"
              className="h-12 w-12"
            >
              <path
                fill="#4f39f6"
                d="M26.029 58.156c-1.683 0-3.047 1.334-3.047 2.979 0 1.646 1.364 2.979 3.047 2.979s3.047-1.333 3.047-2.979c0-1.645-1.364-2.979-3.047-2.979zm17.795 0c-1.682 0-3.046 1.334-3.046 2.979 0 1.646 1.364 2.979 3.046 2.979 1.683 0 3.047-1.333 3.047-2.979 0-1.645-1.364-2.979-3.047-2.979zM22.515 26.997l5.416 14.5h21.793l6.189-14.5H22.515z"
              />
              <path
                fill="#233251"
                d="m58.753 13-9.67 28.181H23.85l-6.527-17.968h29.111v-2.27H14.036l7.722 21.258-6.281 10.643h35.794v-2.271H19.494l4.207-7.125h27.051l9.67-28.18H71V13H58.753zm-33.4 41.861c-3.134.002-5.674 2.484-5.676 5.548.002 3.065 2.542 5.548 5.676 5.549 3.133-.002 5.672-2.485 5.672-5.549 0-3.064-2.539-5.546-5.672-5.548zm0 8.827c-1.853-.003-3.35-1.468-3.353-3.279.003-1.81 1.5-3.274 3.353-3.277 1.849.003 3.349 1.467 3.352 3.277-.003 1.812-1.503 3.276-3.352 3.279zm17.794-8.827c-3.134.002-5.673 2.484-5.674 5.548.001 3.065 2.54 5.548 5.674 5.549 3.134-.002 5.672-2.485 5.674-5.549-.002-3.064-2.54-5.546-5.674-5.548zm0 8.827c-1.851-.003-3.349-1.468-3.352-3.279.003-1.81 1.501-3.274 3.352-3.277 1.851.003 3.35 1.467 3.353 3.277-.003 1.812-1.502 3.276-3.353 3.279z"
              />
            </svg>
            <span className="text-xl font-bold text-indigo-700 tracking-tight hidden sm:inline">
              Ecommerce
            </span>
          </a>
        </div>
        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 hover:bg-gray-100 focus:outline-none"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        {/* Desktop nav links */}
        <PopoverGroup className="hidden lg:flex lg:gap-x-8">
          <Link
            to="/"
            className="text-base font-medium text-gray-700 hover:text-indigo-600 transition"
          >
            Home
          </Link>
          <Link
            to="/categories"
            className="text-base font-medium text-gray-700 hover:text-indigo-600 transition"
          >
            Categories
          </Link>
          <Link
            to="/products"
            className="text-base font-medium text-gray-700 hover:text-indigo-600 transition"
          >
            Products
          </Link>
          <Link
            to="/cart"
            className="text-base font-medium text-gray-700 hover:text-indigo-600 transition"
          >
            Cart
          </Link>
        </PopoverGroup>
        {/* User menu */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <MenuButton className="cursor-pointer focus:outline-none">
                <img
                  alt="User avatar"
                  src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  className="inline-block size-10 rounded-full ring-2 ring-indigo-500"
                />
              </MenuButton>
            </div>
            <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
              <div className="py-1">
                <MenuItem>
                  <button className="block w-full px-4 py-2 text-left text-base text-gray-700 hover:bg-gray-100 rounded">
                    Account settings
                  </button>
                </MenuItem>
                <MenuItem>
                  <button className="block w-full px-4 py-2 text-left text-base text-gray-700 hover:bg-gray-100 rounded">
                    Admin
                  </button>
                </MenuItem>
                <MenuItem>
                  <button
                    onClick={handleLogout}
                    type="button"
                    className="block w-full px-4 py-2 text-left text-base text-red-600 hover:bg-red-50 rounded"
                  >
                    Log out
                  </button>
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <span className="sr-only">Ecommerce</span>
              <img
                alt="Ecommerce Logo"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-8"
              />
              <span className="text-lg font-bold text-indigo-700 tracking-tight">
                Ecommerce
              </span>
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-md p-2.5 text-gray-700 hover:bg-gray-100"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-200">
              <div className="space-y-2 py-6">
                <Link
                  to="/"
                  className="block rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-indigo-50"
                >
                  Home
                </Link>
                <Link
                  to="/categories"
                  className="block rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-indigo-50"
                >
                  Categories
                </Link>
                <Link
                  to="/products"
                  className="block rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-indigo-50"
                >
                  Products
                </Link>
                <Link
                  to="/cart"
                  className="block rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-indigo-50"
                >
                  Cart
                </Link>
                <button className="block w-full text-left rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-indigo-50">
                  Account settings
                </button>
                <button className="block w-full text-left rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-indigo-50">
                  Admin
                </button>
              </div>
              <div className="py-6">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left rounded-lg px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50"
                >
                  Log out
                </button>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Navbar;
