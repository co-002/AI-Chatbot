import React, { useContext } from "react";
import { AppContext } from "../context/AppState";
import { Link } from "react-router-dom";

function Navbar() {
  const { user, loggedIn, logout } = useContext(AppContext);
  return (
    <>
      <div className="px-4 py-3 d-flex justify-content-between navbar">
        <h2 className="text-light">{user?.name}</h2>
        <div>
          {loggedIn ? (
            <Link onClick={() => logout()} type="button" className="btn btn-primary">
              Logout
            </Link>
          ) : (
            <div>
              <Link
                to={"/login"}
                type="button"
                className="btn btn-primary ms-2"
              >
                Login
              </Link>
              <Link
                to={"/register"}
                type="button"
                className="btn btn-primary ms-2"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
