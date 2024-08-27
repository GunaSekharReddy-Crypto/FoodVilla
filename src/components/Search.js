import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItems } from "../redux/cartSlice"; // Import the action to add items

// Function to generate the Cloudinary image URL
const getImageUrl = (cloudinaryId) => {
  if (!cloudinaryId) return "https://via.placeholder.com/264x288?text=No+Image";
  return `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${cloudinaryId}`;
};

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility
  const dispatch = useDispatch(); // Hook for dispatching actions

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    if (query.length > 2) {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://www.swiggy.com/dapi/restaurants/search/suggest?lat=12.9715987&lng=77.5945627&str=${query}&trackingId=null&includeIMItem=true`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch suggestions");
        }

        const data = await response.json();
        setSuggestions(data?.data?.suggestions || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    } else {
      setSuggestions([]);
    }
  };

  const fetchRestaurantMenu = async (queryUniqueId, menuItem) => {
    setLoading(true);
    setError(null);

    try {
      // Use menuItem for the API call instead of hardcoded value
      const response = await fetch(
        `https://www.swiggy.com/dapi/restaurants/search/v3?lat=12.9715987&lng=77.5945627&str=${encodeURIComponent(
          menuItem
        )}&trackingId=undefined&submitAction=SUGGESTION&queryUniqueId=${queryUniqueId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch menu items");
      }

      const data = await response.json();
      console.log({ data });
      console.log({ menuItems });
      console.log(menuItems.length);
      const menuData =
        data?.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH?.cards || [];
      console.log({ menuData });
      setMenuItems(menuData);
      setIsPopupOpen(true); // Open the popup when menu items are fetched
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddItems = (item) => {
    dispatch(addItems(item)); // Dispatch an action to add the item to the store
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false); // Close the popup
  };

  return (
    <div className="p-4">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search for restaurants and foods"
        className="border p-2 rounded mb-4 w-full"
      />

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {suggestions.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="border p-4 rounded-lg shadow bg-stone-100 flex flex-col items-center cursor-pointer"
              onClick={() =>
                fetchRestaurantMenu(suggestion.queryUniqueId, suggestion.text)
              }
            >
              <img
                src={getImageUrl(suggestion?.cloudinaryId)}
                alt={suggestion?.text}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h3 className="text-lg font-bold text-center mb-2">
                {suggestion?.text}
              </h3>
            </div>
          ))}
        </div>
      )}

      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full h-3/4 overflow-y-auto">
            <button
              className="absolute top-4 right-4 text-2xl font-bold text-gray-700 hover:text-black"
              onClick={handleClosePopup}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-center">Menu Items</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {menuItems.length === 0 ? (
                // Use a div to wrap the message and apply flex utilities to center it
                <div className="col-span-full flex justify-center items-center h-64">
                  <p className="text-lg font-bold text-center text-gray-500">
                    Item not found, please check for another item
                  </p>
                </div>
              ) : (
                menuItems.map((item, index) => {
                  const menuItem = item?.card?.card?.info; // Adjusting for the new data structure
                  console.log({ menuItem });
                  return (
                    menuItem && (
                      <div
                        key={menuItem?.id || index}
                        className="border p-4 rounded-lg shadow bg-stone-100"
                      >
                        <img
                          src={getImageUrl(menuItem?.imageId)}
                          alt={menuItem?.name}
                          className="w-full h-48 object-cover rounded mb-4"
                        />
                        <h3 className="text-lg font-bold mb-2">
                          {menuItem?.name}
                        </h3>
                        <p>{menuItem?.description}</p>
                        <h4>{menuItem?.cuisines?.join(", ")}</h4>
                        <p className="font-bold">₹ {menuItem?.price / 100}</p>
                        <button
                          className="font-bold p-2 mt-2 w-full text-center cursor-pointer border bg-rose-200 rounded-md"
                          onClick={() => handleAddItems(menuItem)}
                        >
                          ADD
                        </button>
                      </div>
                    )
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
