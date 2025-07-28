import "./index.css";
import Navbar from "../Navbar";
import { useEffect, useState } from "react";
import Spinner from "../../Components/Spinner";
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
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchCategories = async () => {
    setLoading(true);
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
      setLoading(false);
    } catch (error) {
      console.log(error, "error");
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Shop by Category
        </h2>
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <Spinner color="blue" size={40} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((each, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer flex flex-col border border-gray-100 group overflow-hidden"
                onClick={() =>
                  navigate(
                    `/products?category=${encodeURIComponent(each.category)}`
                  )
                }
              >
                <img
                  alt={each.category}
                  src={each.imgUrl}
                  className="w-full h-56 object-cover group-hover:opacity-90"
                />
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {each.category}
                  </h3>
                  <p className="text-base text-gray-500 mb-4">
                    {each.description}
                  </p>
                  <button
                    className="mt-auto w-full rounded-md bg-indigo-600 px-4 py-2 text-base font-semibold text-white hover:bg-indigo-700 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(
                        `/products?category=${encodeURIComponent(
                          each.category
                        )}`
                      );
                    }}
                  >
                    View Products
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
