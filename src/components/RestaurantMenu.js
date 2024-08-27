// import { useState, useEffect } from "react";
// import { SWIGGY_MENU_API_URL } from "../utils/constant";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import useRestaurant from "../utils/useRestaurant";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";

const RestaurantMenu = () => {
  const { resId } = useParams(); //call useParam to get value of restaurant Id(resId) using object destructuring.
  const restaurant = useRestaurant(resId);
  if (restaurant === null) return <Shimmer />;

  //destructuring the restaurant info
  const {
    name,
    cuisines,
    // costForTwoMessage,
    // locality,
    // avgRating,
    // totalRatingsString,
  } = restaurant?.cards[2]?.card?.card?.info;

  //menu
  const { itemCards } =
    restaurant?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards[3]?.card
      ?.card;

  const categories =
    restaurant?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  if (itemCards?.length === 0) return <Shimmer />;
  return (
    <div className="flex items-center justify-center">
      <div className="justify-center items-center w-[800px] h-100  border-l-stone-950">
        <section className="bg-sky-200 justify-center  items-center flex">
          <div className="">
            <h1 className="text-black text-xl font-extrabold p-5">{name}</h1>
            {/* <p>{cuisines.join(", ")} </p> */}
          </div>
        </section>
        <section>
          {categories.map((category, id) => (
            <RestaurantCategory key={id} categories={category?.card?.card} />
          ))}
        </section>
      </div>
    </div>
  );
};

export default RestaurantMenu;
