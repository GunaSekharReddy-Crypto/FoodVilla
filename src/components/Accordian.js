import React from "react";
import { useDispatch } from "react-redux";
import { addItems } from "../redux/cartSlice";

function Accordian({ items }) {
  const dispatch = useDispatch();

  const handleAddItems = (item) => {
    // Dispatch an action
    console.log(item);
    dispatch(addItems(item));
  };

  return (
    <div>
      {items?.map((item) => {
        // Add checks to ensure the item and its nested properties exist
        const itemInfo = item?.card?.info;
        const imageId = itemInfo?.imageId;
        const itemName = itemInfo?.name;
        const itemPrice =
          Math.round(itemInfo?.price / 100) ||
          Math.round(itemInfo?.defaultPrice / 100);
        const itemDescription =
          itemInfo?.description ||
          "Sorry for inconvenience, No Description Found for this item";

        // Only render the item if `info` exists
        return itemInfo ? (
          <div
            key={itemInfo.id}
            className="sm:p-4 bg-stone-100 justify-between border-b-2 w-fit rounded-lg"
          >
            <div className="flex justify-between">
              <span className="font-bold text-center">{itemName}</span>
              <span className="font-bold text-center">₹ {itemPrice}</span>
            </div>
            <div className="flex">
              {imageId ? (
                <img
                  alt="FoodImage"
                  className="w-20 h-20 p-2 m-2"
                  src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${imageId}`}
                />
              ) : (
                <img
                  alt="No Image"
                  className="w-20 h-20 p-2 m-2"
                  src="https://via.placeholder.com/300x300?text=No+Image"
                />
              )}
              <p>{itemDescription}</p>
              <button
                className="font-bold p-2 m-2 h-10 w-40 text-center cursor-pointer border bg-rose-200 rounded-md"
                onClick={() => handleAddItems(item)}
              >
                ADD
              </button>
            </div>
          </div>
        ) : null; // Return null if `info` is not present to avoid rendering
      })}
    </div>
  );
}

export default Accordian;
