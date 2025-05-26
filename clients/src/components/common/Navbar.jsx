import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { CiShoppingCart } from "react-icons/ci";
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { useDispatch } from "react-redux";
import { getAllCategories } from "../../connectors/opreations/categoryAPI";
import { useSelector } from "react-redux";

const Navbar = () => {

  const token = useSelector((state) => state.auth.token);
  // console.log("Token from Navbar:", token);

  const [catalog, setCatalog] = useState([]) ; 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // fetch Catalog data or any other data you need here
  useEffect( () => {
    const fetchCatalog = async () => {
      try {
        setLoading(true);
        const response = await dispatch(getAllCategories());
        console.log("Catalog response:", response.data);
        if (response) {
          setCatalog(response.data);
        } else {
          console.error("Failed to fetch catalog data");
        }
        setLoading(false);

      }
      catch(err){
        console.error("Error fetching catalog data:", err);
        setLoading(false);
      }
    }

    return fetchCatalog;
  }, [])

  return (
    <nav className="navbar bg-richblack-900">
      {/* Logo */}
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="Website Logo" className="w-auto h-[40px]"/>
        </Link>
      </div>

      {/* Navigation Links */}
      <ul className="navbar-links flex gap-4">
        <li>
          <Link to="/">Home</Link>
        </li>
        {/* HW:ADD CHANGE HERE */}
        <li>
          <Link to="/catalog">Catalog</Link>
        </li>
        <li>
          <Link to="/about">About Us</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>

      <div className="navbar-right">
        <div>
          <IoIosSearch />
        </div>
        <div>
          <Link to="/cart">
            <CiShoppingCart className="text-2xl" />
          </Link>
        </div>
        <div>
          {/* HW:ADD SOMETHING */}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
