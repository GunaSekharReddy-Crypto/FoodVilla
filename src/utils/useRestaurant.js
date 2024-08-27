import { useState, useEffect } from "react";
import { SWIGGY_MENU_API_URL } from "../utils/constant";

export default function useRestaurant(resId) {
  const [restaurant, setRestaurant] = useState(null); //holds a restaurant details

  console.log(restaurant);
  //calls only once after the initial component render
  useEffect(() => {
    getRestaurantInfo();
  }, []);

  const getRestaurantInfo = async () => {
    const restaurantData = await fetch(SWIGGY_MENU_API_URL + resId); //fetching menu data
    const jsonResData = await restaurantData.json(); //converting fetched data to json
    console.log(jsonResData?.data);
    setRestaurant(jsonResData?.data);
  };

  return restaurant;
}
