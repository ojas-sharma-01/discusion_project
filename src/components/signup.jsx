import React, {useState, useContext} from "react";
import Ham from "./ham";
import Nv from "./topnav";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import load from "./load.gif";
import { AuthContext } from "./authContext.js";

const Sgnup = () => {
    const [fdata, setfdata] = useState({username : "", email : "", passwd : ""});
    const { login } = useContext(AuthContext);
    const navv = useNavigate();
    const handlefdata = (e) => {
        const {name, value} = e.target;
        setfdata({...fdata, [name] : value});
    };
    const [restxt, setrstext] = useState("");

    const handlesubmit = (e) => {
        e.preventDefault();
        setrstext(<img src={load} className="h-[60px]" />);
        fetch("https://discusion-project.vercel.app/register", {
            method : "POST",
            body : JSON.stringify(fdata),
            headers : {
                "Content-Type" : "application/json",
            },
        })
        .then(r => r.json())
        .then(d => {
            setrstext(d.msg);
            if (d.msg === "Registered"){
                setTimeout(() => {
                    login(d.jwt_token, fdata.username, d.uid);
                    navv("/");
                }, 1000);
            }
        })
        .catch(e => {
            console.log(e);
            setrstext("Some Error Occured");
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
                <label htmlFor="username" className="mb-2 font-semibold">Username</label>
                <input
                    name="username"
                    onChange={handlefdata}
                    value={fdata.username}
                    className="p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                    placeholder="Enter your username"
                    required
                />
                <label htmlFor="email" className="mb-2 font-semibold">Email</label>
                <input
                    name="email"
                    className="p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                    placeholder="Enter your email id"
                    required
                    onChange={handlefdata}
                    value={fdata.email}
                />
                <label htmlFor="passwd" className="mb-2 font-semibold">Password</label>
                <input
                    name="passwd"
                    placeholder="Enter your password"
                    required
                    onChange={handlefdata}
                    value={fdata.passwd}
                    className="p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                    type="password"
                />
                <button
                    type="submit"
                    className="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors mx-auto"
                >
                    Signup
                </button>
                <p className="mt-4 text-center">
                    Already have an account?{" "}
                    <Link to="/login" className="text-orange-600 hover:underline">
                        Login
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

export default Sgnup;