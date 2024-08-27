import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addItems } from "../redux/cartSlice"; // Correct import path

const getImageUrl = (cloudinaryId) => {
  if (!cloudinaryId) return "https://via.placeholder.com/264x288?text=No+Image";
  return `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${cloudinaryId}`;
};

function SearchedRestaurants({ restaurantId }) {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMenu = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://www.swiggy.com/dapi/restaurants/search/v3?lat=12.9715987&lng=77.5945627&str=${restaurantId}&trackingId=undefined&submitAction=SUGGESTION`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch menu items");
        }

        const data = await response.json();
        setMenuItems(
          data?.data?.cards[0]?.groupedCard?.cardGroupMap?.REGULAR?.cards || []
        );
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [restaurantId]);

  const handleAddItems = (item) => {
    dispatch(addItems(item));
  };

  return (
    <div className="p-4">
      {loading && <p className="text-center">Loading menu...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {menuItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {menuItems.map((menuSection, index) => (
            <div key={index} className="p-4">
              <h3 className="text-lg font-bold mb-2">
                {menuSection.card?.card?.title}
              </h3>
              {menuSection.card?.card?.itemCards?.map((menuItem) => (
                <div
                  key={menuItem.card.info.id}
                  className="border p-4 rounded-lg shadow bg-stone-100 flex flex-col items-center"
                >
                  <img
                    src={getImageUrl(menuItem.card.info.imageId)}
                    alt={menuItem.card.info.name}
                    className="w-full h-48 object-cover rounded mb-4"
                  />
                  <h4 className="text-lg font-bold text-center mb-2">
                    {menuItem.card.info.name}
                  </h4>
                  <p className="text-center">
                    {menuItem.card.info.description ||
                      "No Description Available"}
                  </p>
                  <span className="font-bold text-center">
                    ₹
                    {Math.round(menuItem.card.info.price / 100) ||
                      Math.round(menuItem.card.info.defaultPrice / 100)}
                  </span>
                  <button
                    className="font-bold p-2 mb-2 w-full text-center cursor-pointer border bg-rose-200 rounded-md"
                    onClick={() => handleAddItems(menuItem)}
                  >
                    ADD
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No items found in this restaurant's menu.</p>
      )}
    </div>
  );
}

export default SearchedRestaurants;
