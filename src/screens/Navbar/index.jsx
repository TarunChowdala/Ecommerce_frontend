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
            <img
              alt="Ecommerce Logo"
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
              className="h-8 w-8"
            />
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
