import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NavBar = () => {
  const { success } = useSelector((state) => state?.auth);

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white font-bold text-xl">
          Feature Web
        </Link>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:underline ">
            Home
          </Link>
          <Link to="/profile" className="text-white hover:underline ">
            Profile
          </Link>
          {success ?
            <Link to="/logout" className="text-white hover:underline">
              Logout
            </Link>
            :
            <Link to="/login" className="text-white hover:underline">
              login
            </Link>
          }
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
