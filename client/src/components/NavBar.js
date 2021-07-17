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
    <div className="mt-20 pb-20 w-full bg-white">
      <div className="flex flex-row justify-around">
        <div>
          <img className="h-24 w-300px" src="/images/logo.jpg" alt="logo" />
        </div>
        <ul>
          <li className="cursor-pointer whitespace-nowrap border border-4 hover:border-black m-2 p-1">
            <Link to="/">HOME</Link>
          </li>
          {!props.user ? (
            <>
              <li className="cursor-pointer whitespace-nowrap border border-4 hover:border-black m-2 p-1">
                <Link to="/signup">SIGN UP</Link>
              </li>
              <li className="cursor-pointer whitespace-nowrap border border-4 hover:border-black m-2 p-1">
                <Link to="/login">LOG IN</Link>
              </li>
            </>
          ) : (
            <>
              <li className="cursor-pointer whitespace-nowrap border border-4 hover:border-black m-2 p-1">
                <Link to="/" onClick={() => logoutHandler()}>
                  LOG OUT
                </Link>
              </li>
              <li className="cursor-pointer whitespace-nowrap border border-4 hover:border-black m-2 p-1">
                <Link to="/furnace">FURNACE</Link>
              </li>
              <li className="cursor-pointer whitespace-nowrap border border-4 hover:border-black m-2 p-1">
                <Link to="/offerings">OFFERINGS</Link>
              </li>
              <li className="cursor-pointer whitespace-nowrap border border-4 hover:border-black m-2 p-1">
                <Link to="/ruleslist">RULE SYSTEMS</Link>
              </li>
              <li className="cursor-pointer whitespace-nowrap border border-4 hover:border-black m-2 p-1">
                <Link to="/rulescreate">CREATE RULES</Link>
              </li>
              {props.user ? (
                <p className="whitespace-nowrap">
                  logged in as: {props.user.username}
                </p>
              ) : (
                <></>
              )}
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
