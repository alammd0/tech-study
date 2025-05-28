import React from "react";
import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { CiShoppingCart } from "react-icons/ci";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { useSelector } from "react-redux";
import { IoMdArrowDropdown } from "react-icons/io";
import Catalog from "./Catalog";


export const selectComponents = [
  {
    id : "1", 
    title : "Web Devlopment"
  },

  {
    id : "2",
    title : "Machine Learning"
  },

  {
    id : "3", 
    title : "Data Science"
  }
]

const Navbar = () => {
  const token = useSelector((state) => state.auth.token);

  return (
    <nav className="navbar bg-richblack-900 h-[56px] flex items-center text-richblack-100 border-b-1 border-richblack-300">
      <div className="w-11/12 flex mx-auto justify-between text-center items-center">
        {/* Logo */}
        <div className="navbar-logo">
          <Link to="/">
            <img src={logo} alt="Website Logo" className="w-auto h-[30px]" />
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className="flex gap-6">
          <li className="text-[18px] font-normal capitalize">
            <Link to="/">Home</Link>
          </li>
          {/* HW:ADD CHANGE HERE */}
          <li className="text-[18px] font-normal capitalize flex items-center justify-center">
            {/* <Link to="/catalog">Catalog </Link>
            <span>
              <IoMdArrowDropdown />
            </span> */}

            <Catalog />
          </li>
          <li className="text-[18px] font-normal capitalize">
            <Link to="/about">About Us</Link>
          </li>
          <li className="text-[18px] font-normal capitalize">
            <Link to="/contact">Contact us</Link>
          </li>
        </ul>

        <div className="flex items-center gap-6">
          <div className="text-2xl cursor-pointer">
            <IoIosSearch />
          </div>
          <div>
            <Link to="/cart">
              <CiShoppingCart className="text-2xl" />
            </Link>
          </div>
          <div>
            {/* HW:ADD SOMETHING */}
            <button className=" border border-richblack-700 px-3 py-1 rounded-md hover:scale-105 duration-200 ">
              <Link to="/login">Login</Link>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
