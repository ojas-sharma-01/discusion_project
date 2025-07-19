import React, { useEffect, useState, useContext } from "react";
import Ham from "./ham";
import Nv from './topnav';
import Getcmnt from "./getcmnt";
import { useParams, Link, useLocation } from "react-router-dom";
import image from './like.png';
import profile from './profile.png';
import { AuthContext } from "./authContext.js";
import { Timestamp } from "firebase/firestore";

function crtcmnt(props) {
    return (
        <Getcmnt
            key={props.id}
            username={props.username}
            comment={props.cmnt}
            reactions={props.reactions}
        />
    );
}

const Pstpg = () => {
    const { user, jwt } = useContext(AuthContext);
    const par = useParams();
    const [fdata, setfdata] = useState({ username: user, cmnt: "" });
    const [dt, setdt] = useState({ comments: [], reactions: {}, discussion_heading: "", username: "", content: "", post_time: {}, uid: '' });
    const [dum, setdum] = useState("");

    const handleReaction = (e) => {
        fetch("https://discusion-project.vercel.app/reaction", {
            method: "POST",
            body: JSON.stringify({ type: e.target.id, id: par.id }),
            headers: {
                "Authorization": `Bearer ${jwt}`,
                "Content-type": "application/json",
            },
        })
            .then(r => r.text())
            .then(d => setdum(d))
            .catch(e => console.log(e));
    };

    const handlefdata = (e) => {
        const { name, value } = e.target;
        setfdata({ ...fdata, [name]: value });
    };

    const submit = (e) => {
        e.preventDefault();
        fdata.id = par.id;
        fetch("https://discusion-project.vercel.app/addcomment", {
            method: "POST",

            body: JSON.stringify(fdata),
            headers: {
                "Authorization": `Bearer ${jwt}`,
                "Content-Type": "application/json",
            },
        })
            .then(r => r.text())
            .then(d => {
                if (d === "commented") {
                    setdum(d);
                    setfdata({ ...fdata, ["cmnt"]: "" });
                }
            })
            .catch(e => console.log(e));
    };

    useEffect(() => {
        fetch("https://discusion-project.vercel.app/getthread", {
            method: "POST",
            body: JSON.stringify({ id: par.id }),
            headers: { "Content-Type": "application/json" }
        })
            .then(res => res.json())
            .then(data => setdt(data))
            .catch(e => console.log(e));
        setdum("");
    }, [dum]);

    const customShadow = {
        boxShadow:
            "inset 0 -3em 3em rgba(0,0,0,0.1), 0 0 0 2px rgb(255,255,255), 0.3em 0.3em 1em rgba(0,0,0,0.3)"
    };

    const timeStamp = new Timestamp(dt?.postTime?._seconds, dt.postTime?._nanoseconds);

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Ham  />
            <Nv  />
            <div
                className="bg-white w-[90%] md:w-[70%] mx-auto my-8 rounded-2xl p-4"
                style={customShadow}
            >
                <div className="flex items-center mb-2">
                    <img src={profile} className="w-8 h-8 rounded-full mr-2" alt="profile" />
                    <Link to="/profile" state={{ post_user: dt.uid, isPostUser: true }} className="font-semibold hover:underline">
                        {dt.username}
                    </Link>
                </div>
                <div className="border-b border-gray-300 pb-2 mb-2 text-lg font-bold">
                    Title: {dt.discussion_heading}
                </div>
                <div className="py-2">
                    <p className="break-words">{dt.content}</p>
                </div>
                <div className="py-2 text-sm text-gray-500">
                    {timeStamp.toDate().toLocaleString()}
                </div>
                <div className="flex items-center gap-6 py-2">
                    <div onClick={handleReaction} className="flex items-center gap-4 cursor-pointer select-none">
                        <div className="flex items-center gap-1">
                            <img id="likes" src={image} className="w-7 h-7" alt="like" />
                            <span className="ml-1">{dt.reactions.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <img id="hearts" src={image} className="w-7 h-7 transform rotate-180" alt="heart" />
                            <span className="ml-1">{dt.reactions.hearts}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="bg-white w-[90%] md:w-[70%] mx-auto my-8 rounded-2xl p-4"
                style={customShadow}
            >
                <form onSubmit={submit}>
                    <textarea
                        name="cmnt"
                        value={fdata.cmnt}
                        required
                        onChange={handlefdata}
                        placeholder="Write your comment ..."
                        className="m-2 w-[95%] h-24 p-2 border border-gray-300 rounded resize-y focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                    <div className="m-2">
                        <button
                            type="submit"
                            className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition-colors"
                        >
                            Comment
                        </button>
                    </div>
                </form>
            </div>
            <div
                className="bg-white w-[90%] md:w-[70%] mx-auto my-8 rounded-2xl flex flex-col"
                style={customShadow}
            >
                <div className="m-4">
                    <h1 className="text-xl font-bold pl-4">COMMENTS</h1>
                </div>
                {dt.comments.map(crtcmnt)}
            </div>
        </div>
    );
}

export default Pstpg;