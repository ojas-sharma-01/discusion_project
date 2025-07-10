import React, { useEffect , useState, useContext} from "react";
import Post from './post.jsx';
import Ham from './ham.jsx';
import Nv from './topnav.jsx';
import { Link } from "react-router-dom";
import { AuthContext } from "./authContext.js";

function Allposts () {
    const { user } = useContext(AuthContext);
    
    function makepst (props) {
        return (
            <Post 
            key = {props.id}
            id = {props.id}
            username = {props.username}
            discussion_heading = {props.discussion_heading}
            reactions = {props.reactions}
            userid = {user}
            post_time = {props.post_time}
            />
        );
    };

    const[dt, setdt] = useState([]);
    useEffect(() => {
        fetch("https://discusion-project.vercel.app/getthreads")
        .then(res => res.json())
        .then(data => {
            if (data.msg === "Error") {
                alert("Some error occurred, please try later");
            }
            else {
                setdt(data);
                console.log(data);
            }
        })
        .catch(e => console.log(e));
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Ham  />
            <Nv  />
            <div className="w-fit ml-auto mt-8 mr-[15%]">
                <Link to={"/addpst"}>
                    <button className="text-white px-4 py-2 rounded-xl bg-black hover:bg-gray-800 transition-colors">
                        Start New Discussion +
                    </button>
                </Link>
            </div>
            <div className="w-4/5 mx-auto my-12 flex justify-evenly">
                <div 
                className="flex flex-col flex-1 rounded-3xl shadow-inner bg-white p-6"
                style={{
                    boxShadow:
                        "inset 0 -3em 3em rgba(0,0,0,0.1), 0 0 0 2px rgb(255,255,255), 0.3em 0.3em 1em rgba(0,0,0,0.3)"
                }}>
                    {dt.map(makepst)}
                </div>
            </div>
        </div>
    );
}

export default Allposts;
