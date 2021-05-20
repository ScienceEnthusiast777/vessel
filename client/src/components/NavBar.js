import React from "react";
import { Link } from "react-router-dom";
import { logout } from '../services/auth';

export default function NavBar(props) {

  const logoutHandler = () =>{
    logout().then(()=>{
      props.setUser(null);
    })
  }

  return (
    <div className="Nav">
    <div className="Display">
    {props.user?<p>logged in as: {props.user.username}</p>:<></>}
      <img src="/images/logo.jpg" alt="logo" />
    </div>
      <ul className="NavButtons">
        <li>
          <Link to="/">HOME</Link>
        </li>
        {!props.user ? (
          <>
            <li>
              <Link to="/signup">SIGN UP</Link>
            </li>
            <li>
              <Link to="/login">LOG IN</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to='/' onClick={()=>logoutHandler()}>LOG OUT</Link>
            </li>
            <li>
              <Link to="/furnace">FURNACE</Link>
            </li>
            <li>
              <Link to="/offerings">OFFERINGS</Link>
            </li>
            <li>
              <Link to="/ruleslist">RULES SYSTEMS</Link>
            </li>
            <li>
              <Link to="/rulescreate">CREATE RULES</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
