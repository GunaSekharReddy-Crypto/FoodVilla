import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

// Function to generate the Cloudinary image URL
const getImageUrl = (cloudinaryId) => {
  if (!cloudinaryId) return "https://via.placeholder.com/264x288?text=No+Image";
  return `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${cloudinaryId}`;
};

function HomePage() {
  const [homepageData, setHomepageData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch data from the API on component mount
  useEffect(() => {
    const fetchHomePageData = async () => {
      try {
        const response = await fetch(
          "https://www.swiggy.com/mapi/homepage/getCards?lat=12.9715987&lng=77.5945627"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch homepage data, Wait for some time");
        }

        const data = await response.json();
        console.log("API Response:", data);
        setHomepageData(data?.data?.success?.cards || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHomePageData();
  }, []);

  // Function to render restaurant cards
  const renderRestaurants = (restaurants) => {
    console.log("Restaurants Data:", restaurants);
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {restaurants.map((restaurant, index) => (
          <div
            key={index}
            className="border p-4 rounded-lg shadow bg-stone-100 flex flex-col items-center cursor-pointer"
            onClick={() => navigate(`/restaurant/${restaurant?.info?.id}`)} // Navigate on click
          >
            <img
              src={getImageUrl(restaurant?.info?.cloudinaryImageId)}
              alt={restaurant?.info?.name}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h3 className="text-lg font-bold text-center mb-2">
              {restaurant?.info?.name}
            </h3>
            <p>{restaurant?.info?.cuisines.join(", ")}</p>
            <p className="font-bold">Rating: {restaurant?.info?.avgRating}</p>
          </div>
        ))}
      </div>
    );
  };

  // Function to render top picks
  const topPicks = (restaurants) => {
    console.log("Top Picks Data:", restaurants);
    return (
      <div className="flex overflow-x-scroll space-x-4 cursor-pointer">
        {restaurants.map((restaurant, index) => (
          <div
            key={index}
            className="flex-shrink-0 p-4"
            onClick={() => navigate(`/restaurant/${restaurant?.info?.id}`)} // Navigate on click
          >
            <img
              src={getImageUrl(restaurant?.info?.cloudinaryImageId)}
              alt={restaurant?.info?.name}
              className="w-32 h-32 object-cover rounded-full mb-2"
            />
            <h4 className="text-center">{restaurant?.info?.name}</h4>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-4">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <>
          {/* Top Picks */}
          <h2 className="text-xl font-bold mt-8 mb-4">
            {homepageData[1]?.gridWidget?.header?.title}
          </h2>
          {homepageData[1]?.gridWidget?.gridElements?.infoWithStyle
            ?.restaurants &&
            topPicks(
              homepageData[1]?.gridWidget?.gridElements?.infoWithStyle
                ?.restaurants
            )}

          {/* Popular Restaurants */}
          <h2 className="text-xl font-bold mt-8 mb-4">Popular Restaurants</h2>
          {homepageData[4]?.gridWidget?.gridElements?.infoWithStyle
            ?.restaurants &&
            renderRestaurants(
              homepageData[4]?.gridWidget?.gridElements?.infoWithStyle
                ?.restaurants
            )}
        </>
      )}
    </div>
  );
}

export default HomePage;
