import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="Nav">
    <img src="/images/logo.jpg" alt="logo" />
      <ul>
        <li>home</li>
        <li><Link to="/signup">SIGN UP</Link></li>
        <li><Link to="/login">LOG IN</Link></li>
        <li><Link to="/logout">LOG OUT</Link></li>
        <li><Link to="/furnace">FURNACE</Link></li>
        <li><Link to="/offerings">OFFERINGS</Link></li>
      </ul>
    </div>
  );
}
