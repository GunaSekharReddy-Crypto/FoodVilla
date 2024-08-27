import React, { useState } from "react";
import Accordian from "./Accordian";

function RestaurantCategory(categories) {
  const [showItem, setShowItem] = useState(false);

  const handleAccordian = () => {
    setShowItem(!showItem);
  };

  console.log(showItem);
  const { title } = categories?.categories;
  return (
    <>
      <div className="m-2 w-full bg-gray-50 shadow-lg p-4  justify-between ">
        <div className="flex justify-between">
          <span className="font-bold text-lg">
            {title} ({categories?.categories?.itemCards?.length})
          </span>
          <span onClick={handleAccordian} className="cursor-pointer">
            {showItem ? "🔼" : "🔽"}
          </span>
        </div>
        <div className="flex">
          {showItem ? (
            <Accordian items={categories?.categories?.itemCards} />
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default RestaurantCategory;
