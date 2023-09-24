import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';


const AdminNavBar = () => {

  return (
    <nav className="bg-blue-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/admin" className="text-xl font-semibold">
          Admin Dashboard
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link to="/admin/dashboard" className="hover:text-gray-300">Dashboard</Link>
          </li>
          <li>
            <Link to="/admin/users" className="hover:text-gray-300">Users</Link>
          </li>
          <li>
           <Link to="/admin/Logout" className="hover:text-gray-300">Logout</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default AdminNavBar;
