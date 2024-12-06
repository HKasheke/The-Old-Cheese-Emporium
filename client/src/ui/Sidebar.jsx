import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../App";


export default function Sidebar() {
  const { loggedIn } = useContext(AuthContext);
  
  return (
    <div className="navbar navbar-expand-lg navbar-light bg-light d-flex align-items-center justify-content-around">
      <Link to="/home">Home</Link> <br />
      {!loggedIn && <Link to="/login">Login</Link>} <br />
      <Link to="/cart">Cart</Link> <br />
      {loggedIn && <Link to="/logout">Logout</Link>} <br />
      {!loggedIn && <Link to="/signup">Signup</Link>} <br />
    </div>
  );
}