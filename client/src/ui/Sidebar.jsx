import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../App";


export default function Sidebar() {
  const { loggedIn } = useContext(AuthContext);
  
  return (
    <div className="navbar navbar-expand-lg navbar-light bg-light d-flex align-items-center justify-content-around position-relative">
      <Link to="/home">Home</Link> <br />
      {!loggedIn && <Link to="/login">Login</Link>} <br />
      {loggedIn && <Link to="/logout">Logout</Link>} <br />
      {!loggedIn && <Link to="/signup">Signup</Link>} <br />
      <Link to="/cart" className="btn btn-light btn-sm"><i className="bi bi-cart-fill"></i></Link> <br />
    </div>
  );
}