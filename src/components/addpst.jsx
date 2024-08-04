import React, { useState } from "react";
import Nv from "./topnav";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Addpst = () => {
  console.log(localStorage.getItem("userid"));
  const par = useParams();
  const navv = useNavigate();
  const [fdata, setfdata] = useState({
    username: localStorage.getItem("userid"),
    discussion_heading: "",
    content: "",
  });

  const changefdata = (event) => {
    const { name, value } = event.target;
    setfdata({ ...fdata, [name]: value });
  };

  const submit = (event) => {
    event.preventDefault();
    if (!localStorage.getItem("userid")) {
      alert("Not logged in");
      return;
    }

    fetch("https://discusion-project.vercel.app/addthread", {
      method: "POST",
      body: JSON.stringify(fdata),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.text())
      .then((data) => {
        if (data === "inserted") {
          navv(`/`);
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <Nv />
      <form
        onSubmit={submit}
        style={{
          margin: "5% auto",
          width: "60%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <label htmlFor="discussion_heading" style={{ marginBottom: "8px" }}>
          Title:
        </label>
        <input name="discussion_heading" placeholder="Enter the title of the new thread..." required={true}
         value={fdata.discussion_heading} onChange={changefdata} style={{ padding: "8px", marginBottom: "16px", width : "70%" }}/>
        <label htmlFor="content" style={{ marginBottom: "8px" }}>
          Content:
        </label>
        <textarea
          name="content"
          placeholder="Enter the content of the thread..."
          required={true}
          value={fdata.content}
          onChange={changefdata}
          style={{ padding: "8px", marginBottom: "16px", height: "150px",width : "70%" }}
        />
        <button type="submit" style={{padding: "8px 16px", backgroundColor: "orange", border: "none", borderRadius: "4px", cursor: "pointer"}}>
          Post
        </button>
      </form>
    </div>
  );
};

export default Addpst;
