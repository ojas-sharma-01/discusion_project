import React, { useState, useContext } from "react";
import Ham from "./ham";
import Nv from "./topnav";
import { useParams, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./authContext.js";

const Addpst = () => {
  const par = useParams();
  const navv = useNavigate();
  const { user, jwt, uid } = useContext(AuthContext);
  const [fdata, setfdata] = useState({
    username: user,
    discussion_heading: "",
    content: "",
  });

  const changefdata = (event) => {
    const { name, value } = event.target;
    setfdata({ ...fdata, [name]: value });
  };

  const submit = (event) => {
    event.preventDefault();

    fetch("https://discusion-project.vercel.app/addthread", {
      method: "POST",
      body: JSON.stringify({...fdata, uid}),
      headers: {
        "Authorization": `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 401) {
          alert("Not logged in");
          return;
        }
        return res.text();
      })
      .then((data) => {
        if (data === "inserted") {
          navv(`/`);
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <Ham  />
      <Nv  />
      <form
        onSubmit={submit}
        className="mx-auto my-10 w-full max-w-2xl flex flex-col items-center bg-white shadow-lg rounded-lg p-8"
      >
        <label htmlFor="discussion_heading" className="mb-2 font-semibold w-full text-left">
          Title:
        </label>
        <input
          name="discussion_heading"
          placeholder="Enter the title of the new thread..."
          required
          value={fdata.discussion_heading}
          onChange={changefdata}
          className="p-2 mb-4 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <label htmlFor="content" className="mb-2 font-semibold w-full text-left">
          Content:
        </label>
        <textarea
          name="content"
          placeholder="Enter the content of the thread..."
          required
          value={fdata.content}
          onChange={changefdata}
          className="p-2 mb-4 w-full h-36 border border-gray-300 rounded resize-y focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default Addpst;
