import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearItems,
  // incrementItem,
  // decrementItem,
  removeItem,
} from "../redux/cartSlice";

function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Function to handle clearing the cart
  const handleClearCart = () => {
    dispatch(clearItems());
  };

  // Function to handle incrementing item quantity
  // const handleIncrement = (itemId) => {
  //   dispatch(incrementItem(itemId));
  // };

  // Function to handle decrementing item quantity
  // const handleDecrement = (itemId) => {
  //   dispatch(decrementItem(itemId));
  // };

  // Function to handle removing an item
  const handleRemoveItem = (itemId) => {
    dispatch(removeItem(itemId));
  };

  // Calculate the total price of the cart items
  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + (item?.card?.info?.price / 100 || item?.price / 100),
    0
  );

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-center">Your Cart</h2>
      {cartItems.length === 0 ? (
        <div className="p-2 m-2 flex justify-center items-center">
          <div className="relative">
            <img
              alt="oops-img"
              className="rounded-lg"
              src="https://img.freepik.com/free-photo/funny-monster-avocado-toast-halloween-wooden-table_123827-27616.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1724112000&semt=ais_hybrid"
            />
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-75 text-center p-2 rounded-md font-extralight">
              No Items in cart, Please Add some
            </span>
          </div>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {cartItems.map((item, index) => (
              <div
                key={item.id || index}
                className="p-4 bg-stone-100 border rounded-lg shadow-md flex flex-col items-center"
              >
                <h3 className="font-bold text-center">
                  {item?.card?.info?.name || item?.name}
                </h3>
                <div className="font-bold justify-between">
                  ⭐
                  {item?.card?.info?.ratings?.aggregatedRating?.rating ||
                    item?.ratings?.aggregatedRating?.rating}
                  ₹
                  {(item?.card?.info?.price / 100 || item?.price / 100).toFixed(
                    2
                  )}
                </div>
                {/* <div className="flex items-center mt-2">
                  <button
                    className="p-1 bg-gray-200 rounded-full text-lg"
                    onClick={() => handleDecrement(item.id)}
                  >
                    -
                  </button>
                  <span className="px-4">{item.quantity}</span>
                  <button
                    className="p-1 bg-gray-200 rounded-full text-lg"
                    onClick={() => handleIncrement(item.id)}
                  >
                    +
                  </button>
                </div> */}
                {/* Remove item button */}
                <button
                  className="mt-2 p-1 bg-red-500 text-white rounded-md"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  Remove Item
                </button>
              </div>
            ))}
          </div>
          {/* Display the total price */}
          <div className="flex justify-between items-center mt-4 p-4 bg-gray-100 border rounded-lg">
            <h3 className="text-lg font-bold">Total Price:</h3>
            <p className="text-lg font-bold">₹{totalPrice.toFixed(2)}</p>
          </div>
          {/* Clear cart button */}
          <div className="flex justify-center mt-4">
            <button
              className="p-2 bg-red-500 text-white rounded-md"
              onClick={handleClearCart}
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
