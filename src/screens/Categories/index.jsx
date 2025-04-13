import "./index.css";
import Navbar from "../Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// import { Toaster, toast } from "sonner";

const categoryMap = {
  Electronics: {
    imgUrl:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-02-edition-01.jpg",
    description: "Smart gadgets and devices for modern living.",
  },
  Clothing: {
    imgUrl:
      "https://res.cloudinary.com/dvtotdiqa/image/upload/f_webp,w_800,q_auto/v1744522740/pexels-daiangan-102129_bybip1.jpg",
    description: "Trendy and comfortable fashion for every season.",
  },
  Footwear: {
    imgUrl:
      "https://res.cloudinary.com/dvtotdiqa/image/upload/f_webp,w_800,q_auto/v1744522740/pexels-mnzoutfits-1598505_e5eywc.jpg",
    description: "Stylish shoes, sandals, and sneakers for all occasions.",
  },
  Accessories: {
    imgUrl:
      "https://res.cloudinary.com/dvtotdiqa/image/upload/f_webp,w_800,q_auto/v1744522740/pexels-lum3n-44775-322207_qftaoa.jpg",
    description: "Complete your look with bags, belts, and more.",
  },
  "Home & Kitchen": {
    imgUrl:
      "https://res.cloudinary.com/dvtotdiqa/image/upload/f_webp,w_800,q_auto/v1744522740/pexels-karolina-grabowska-6660254_byuct6.jpg",
    description: "Essentials and decor to make your home shine.",
  },
};

const Categories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const token = localStorage.getItem("token");

  const fetchCategories = async () => {
    try {
      const url =
        "https://ecommerce-backend-g96o.onrender.com/products/categories";
      let response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        let categoryData = [];
        data.forEach((each) => {
          const mapped = categoryMap[each];

          const eachCategory = {
            category: each,
            imgUrl: mapped ? mapped.imgUrl : "https://default.image.url",
            description: mapped
              ? mapped.description
              : "No description available.",
          };

          categoryData.push(eachCategory);
        });
        setCategories(categoryData);
      } else {
        console.log(data, "data");
      }
    } catch (error) {
      console.log(error, "error");
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="layout-main">
      <Navbar />
      <div className="layout-inner">
        <div className="bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
              <h2 className="text-2xl font-bold text-gray-900">Categories</h2>

              <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:space-y-0 lg:gap-x-6">
                {categories.map((each, index) => {
                  return (
                    <div
                      key={index}
                      className="group relative mb-2 cursor-pointer"
                      onClick={() =>
                        navigate(
                          `/products?category=${encodeURIComponent(
                            each.category
                          )}`
                        )
                      }
                    >
                      <h2 className="mt-6 text-lg font-semibold  text-gray-900">
                        {each.category}
                      </h2>
                      <p className="text-base  text-gray-500">
                        {each.description}
                      </p>
                      <img
                        alt={each.name}
                        src={each.imgUrl}
                        className="mt-2 w-full rounded-lg bg-white object-cover group-hover:opacity-75 max-sm:h-80 sm:aspect-2/1 lg:aspect-square"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Toaster richColors position="top-right" /> */}
    </div>
  );
};

export default Categories;
