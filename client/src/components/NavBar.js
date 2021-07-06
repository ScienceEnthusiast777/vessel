import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../services/auth";

export default function NavBar(props) {
  const logoutHandler = () => {
    logout().then(() => {
      props.setUser(null);
    });
  };

  return (
    <div className="flex flex-row justify-around pt-20">
      <div className="Display">
        <img className="h-40" src="/images/logo.jpg" alt="logo" />
      </div>
      <ul className="NavButtons">
        <li className="cursor-pointer border border-4 hover:border-black m-2">
          <Link to="/">HOME</Link>
        </li>
        {!props.user ? (
          <>
            <li className="cursor-pointer border border-4 hover:border-black m-2">
              <Link to="/signup">SIGN UP</Link>
            </li>
            <li className="cursor-pointer border border-4 hover:border-black m-2">
              <Link to="/login">LOG IN</Link>
            </li>
          </>
        ) : (
          <>
            <li className="cursor-pointer border border-4 hover:border-black m-2">
              <Link to="/" onClick={() => logoutHandler()}>
                LOG OUT
              </Link>
            </li>
            <li className="cursor-pointer border border-4 hover:border-black m-2">
              <Link to="/furnace">FURNACE</Link>
            </li>
            <li className="cursor-pointer border border-4 hover:border-black m-2">
              <Link to="/offerings">OFFERINGS</Link>
            </li>
            <li className="cursor-pointer border border-4 hover:border-black m-2">
              <Link to="/ruleslist">RULE SYSTEMS</Link>
            </li>
            <li className="cursor-pointer border border-4 hover:border-black m-2">
              <Link to="/rulescreate">CREATE RULES</Link>
            </li>
            {props.user ? <p>logged in as: {props.user.username}</p> : <></>}
          </>
        )}
      </ul>
    </div>
  );
}
