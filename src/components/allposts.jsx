import React, { useEffect , useState} from "react";
import Post from './post';
import Nv from './topnav';
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function Allposts () {
    const loc = useLocation();
    const userid = loc.state?.userid;
    console.log(localStorage.getItem("userid"));
    
    function makepst (props) {
        return (
            <Post 
            key = {props.id}
            id = {props.id}
            username = {props.username}
            discussion_heading = {props.discussion_heading}
            reactions = {props.reactions}
            userid = {userid}
            post_time = {props.post_time}
            />
        );
    };


    const[dt, setdt] = useState([]);
    useEffect(() => {
        fetch("https://discusion-project.vercel.app/getthreads")
        .then(res => res.json())
        .then(data => setdt(data))
        .catch(e => console.log(e));
    }, []);


    const st = {
        display : "flex",
        flex:  "3",
        margin : "0 5%",
        padding : "1%",
        flexDirection : "column",
        borderRadius: "30px",
        boxShadow: "inset 0 -3em 3em rgba(0, 0, 0, 0.1), 0 0 0 2px rgb(255, 255, 255),0.3em 0.3em 1em rgba(0, 0, 0, 0.3)",
        backgroundColor : "white",
    };

    return (
        <div style={{display : "flex", flexDirection : "column", justifyContent : "space-evenly"}}>
            <Nv />
            <div className ="addbtn"style={{width : "fit-content", marginLeft : "auto", marginTop : "3%", marginRight : "15%"}}> 
                <Link to={"/addpst"} state= {{ urid: userid }}> 
                    <button style={{color : "white",padding : "10px", borderRadius : "15px", backgroundColor : "black"}}>
                        Start New Discussion +
                    </button> 
                </Link>
            </div>
            <div style={{width : "80%", margin : "5% auto", display : "flex", justifyContent : "space-evenly"}}>
                <div className="main_cont" style={st}>
                    {dt.map(makepst)}
                </div>
            </div>
        </div>
    );
}

export default Allposts;
