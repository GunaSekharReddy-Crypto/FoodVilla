import React, { useState } from "react";
import { LOGO_URL } from "../utils/constant";
import { Link } from "react-router-dom";
import useOnline from "../utils/useOnline";
import { useSelector } from "react-redux";

//1. Header Component
const Header = () => {
  const [btnName, setBtnName] = useState("Login");

  //subscribing to the store using selector
  const cartItems = useSelector((store) => store.cart.items);
  console.log(cartItems);

  const isOnline = useOnline();

  return (
    <div className="md:bg-green-100 w-screen sm: justify-between bg-green-100 shadow-lg ">
      <div className="flex justify-center float-left">
        <img
          className="md:justify-center  w-12 sm:w-16"
          alt="LOGO"
          src={LOGO_URL}
        />
      </div>
      <div className="flex ">
        <ul className="flex justify-between items-center ">
          <li className="p-3 active:bg-green-500">
            <Link to="/">Home</Link>
          </li>
          <li className="p-3 active:bg-green-500">
            <Link to="/search">Search</Link>
          </li>
          <li className="p-3 active:bg-green-500">
            <Link to="/cart">🍟-{cartItems.length}</Link>
          </li>
          <h1 className="md:none sm:p-5">{isOnline ? "✅" : "❌"}</h1>
        </ul>
      </div>
    </div>
  );
}; //Header

export default Header;
