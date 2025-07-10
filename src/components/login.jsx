import React, { useState, useContext } from "react";
import Ham from "./ham";
import Nv from "./topnav";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import 'firebase/auth';
import load from "./load.gif";
import Cookies from "js-cookie";
import { AuthContext } from "./authContext.js";

const firebaseConfig = {
  apiKey: "AIzaSyC2YMy095m2EJdE6Zg4MVb7JXqLKM8EW2Y",
  authDomain: "billinginv-78309.firebaseapp.com",
  projectId: "billinginv-78309",
  storageBucket: "billinginv-78309.appspot.com",
  messagingSenderId: "78167947791",
  appId: "1:78167947791:web:f4695c7d5a25ca0f91417a",
  measurementId: "G-SJ1BGYHR12"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

const Login = () => {
  const [fdata, setfdata] = useState({ email: "", passwd: "" });
  const { user, login, uid } = useContext(AuthContext);
  const navv = useNavigate();
  const handlefdata = (e) => {
    const { name, value } = e.target;
    setfdata({ ...fdata, [name]: value });
  };

  const [restxt, setrstext] = useState("");

  const handlesubmit = (e) => {
    e.preventDefault();
    setrstext(<img src={load} className="h-[60px]" />);
    signInWithEmailAndPassword(auth, fdata.email, fdata.passwd)
      .then((userCredential) => {
        fetch("https://discusion-project.vercel.app/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({token: userCredential.user.accessToken, username: userCredential.user.displayName }),
        })
        .then((res) => res.json())
        .then((data) => {
          login(data.jwt_token, data.username, data.uid);
          setrstext("Login Successfull");
          setTimeout(() => {
            navv(`/`);
          }, 500);
        })
        .catch((err) => {
          console.log(err);
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        setrstext("Please check your credentials");
      });
  };

  return (
    <div>
      <Ham  />
      <Nv  />
      <form
        className="w-full max-w-md mx-auto my-10 flex flex-col bg-white shadow-lg rounded-lg p-8"
        onSubmit={handlesubmit}
      >
        <label htmlFor="email" className="mb-2 font-semibold">
          Email
        </label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email address"
          required
          onChange={handlefdata}
          value={fdata.email}
          className="p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <label htmlFor="passwd" className="mb-2 font-semibold">
          Password
        </label>
        <input
          type="password"
          name="passwd"
          placeholder="Enter your password"
          required
          onChange={handlefdata}
          value={fdata.passwd}
          className="p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors mx-auto"
        >
          Login
        </button>
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-orange-600 hover:underline">
            Signup
          </Link>
        </p>
        {restxt && (
          <p className="mx-auto mt-4 bg-blue-600 rounded-lg px-4 py-2 text-white text-center">
            {restxt}
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
