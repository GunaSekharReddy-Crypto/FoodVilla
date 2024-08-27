import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import { SWIGGY_API_URL } from "../utils/constant";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import HomePage from "./HomePage";

//2. Body Component
const Body = () => {
  //Local state variable = Super powerful variable
  const [listOfRestaurants, setListOfRestaurants] = useState([]); //All Restaurants
  const [filteredRestaurants, setFilteredRestaurants] = useState([]); //Filtered Restaurants
  const [searchRestaurant, setSearchRestaurant] = useState(""); //Search Restaurants

  const RestaurantCardWithPromotedLabel = withPromotedLabel(RestaurantCard);

  console.log(listOfRestaurants);

  //useEffect(2 params) - callback function, dependencies
  useEffect(() => {
    getRestaurants();
  }, []);

  //get restaurants list
  const getRestaurants = async () => {
    //making swiggy api call
    const data = await fetch(SWIGGY_API_URL);
    const json = await data.json();
    console.log(json);

    setListOfRestaurants(
      json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredRestaurants(
      json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  }; //getRestaurants

  if (listOfRestaurants?.length === 0) return <Shimmer />;

  console.log(listOfRestaurants);

  return (
    <div className="body">
      {/* //grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 */}
      <div className="flex flex-wrap ">
        {searchRestaurant.length > 0
          ? //showing only filtered restaurants
            filteredRestaurants?.map((restaurant) => (
              <Link
                to={"/restaurant/" + restaurant.info?.id}
                key={restaurant.info?.id}
              >
                <RestaurantCard
                  key={restaurant.info?.id}
                  resData={restaurant}
                />
              </Link>
            ))
          : //showing all the restaurants
            listOfRestaurants?.map((restaurant) => (
              <Link
                to={"/restaurant/" + restaurant.info?.id}
                key={restaurant.info?.id}
              >
                {restaurant.info?.promoted ? (
                  <RestaurantCardWithPromotedLabel resData={restaurant} />
                ) : (
                  <RestaurantCard
                    key={restaurant.info?.id}
                    resData={restaurant}
                  />
                )}
              </Link>
            ))}
      </div>
      <HomePage />
    </div>
  );
};

export default Body;
