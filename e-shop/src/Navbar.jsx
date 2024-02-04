import React from "react";
import { Link } from "react-router-dom";
import { useMatch, useResolvedPath } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { RiListOrdered } from "react-icons/ri";
import logo from "./LOGO.png";




export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        <img src={logo} alt="E-shop Logo" />
      </Link>
      <ul>
        <CustomLink to="/">Home</CustomLink>
        <CustomLink to="/products">Products</CustomLink>
        <CustomLink to="/contactform">Contact</CustomLink>
        <CustomLink to="/login"> Log in</CustomLink>
        <CustomLink to="/cart"><FaShoppingCart /></CustomLink>
        <CustomLink to="/orderhistory"><RiListOrdered /></CustomLink>
        
         {}
      </ul>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
