import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllCategories } from "../../connectors/opreations/categoryAPI";

const Catalog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [catalogItems, setCatalogItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();


  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        setLoading(true);
        const response = await dispatch(getAllCategories());
        console.log("Catalog response:", response.data);
        if (response) {
          setCatalogItems(response.data.data)
        } else {
          console.error("Failed to fetch catalog data");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching catalog data:", err);
        setLoading(false);
      }
    };

    return fetchCatalog;
  }, []);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-[18px] font-normal capitalize flex items-center justify-center"
      >
        Catalog
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M5.5 7.5l4.5 4.5 4.5-4.5h-9z" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-44 bg-richblack-900 rounded-md shadow-lg border-1 border-richblack-5">
          <div className="py-1 text-sm text-gray-700">
            {loading ? (
              <div className="px-4 py-2">Loading...</div>
            ) : catalogItems.length > 0 ? (
              catalogItems.map((item) => (
                <a
                  key={item.id}
                  href={`/catalog/${item.slug || item.id}`}
                  className="block px-4 py-2 hover:bg-amber-500 text-[16px] font-normal text-richblack-100 hover:text-richblack-800"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))
            ) : (
              <div className="px-4 py-2 text-richblack-200 bg-richblack-800">No items</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Catalog;
