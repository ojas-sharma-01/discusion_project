import React, { useContext } from "react";
import { Link } from "react-router-dom";
import reel from './reel.png';
import bord from './navborder.png';
import { AuthContext } from "./authContext.js";

const Nv = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <>
    <div 
      className="flex hidden md:flex items-center justify-center p-3 rounded-2xl border-b border-black bg-cover bg-center px-[10%]"
      style={{ backgroundImage: `url(${bord})` }}
    >
      <img
        className="ml-10 mt-1 w-32 h-auto"
        src={reel}
        alt="Reel"
      />
      {user && (
        <div className="ml-8">
          <Link
            to="/profile"
            className="text-2xl font-semibold text-black hover:underline"
          >
            {user}
          </Link>
        </div>
      )}
      <div className="flex items-center justify-end w-full">
      <div className='ml-8'>
        <Link
          className="text-white bg-black px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          to="/"
        >
          Home
        </Link>
      </div>
      {/*
      <div className="ml-4">
        <Link
          className="text-white bg-black px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          to="/"
        >
          All Posts
        </Link>
      </div>
      */}
      <div className="ml-8">
        <Link
          className="text-white bg-black px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          to="/"  
        >
          Support
        </Link>
      </div>
      <div className="ml-8" />
        {!user ? (
        <div>
          <Link to="/login">
            <button
              className="bg-orange-500 rounded px-6 py-2 text-white font-semibold hover:bg-orange-600 transition-colors"
              type="submit"
            >
              Login/Signup
            </button>
          </Link>
        </div>
      ) : (
        <div>
          <Link to="/">
            <button
              className="bg-orange-500 rounded px-6 py-2 text-white font-semibold hover:bg-orange-600 transition-colors"
              type="submit"
              onClick={logout}
            >
              Logout
            </button>
          </Link>
        </div>
      )}
      </div>
    </div>
    </>
  );
};

export default Nv;
