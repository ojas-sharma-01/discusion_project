import React, { useEffect, useState } from "react";
import Nv from './topnav';
import Getcmnt from "./getcmnt";
import { useParams } from "react-router-dom";
import image from './like.png';
import profile from './profile.png';


function crtcmnt (props) {
    return (
    <Getcmnt 
    key = {props.id}
    username = {props.username} 
    comment = {props.cmnt} 
    reactions = {props.reactions} />
    );
};


const Pstpg = () => {
    console.log(localStorage.getItem("userid"));
    const par = useParams();
    const [fdata, setfdata] = useState({username : localStorage.getItem("userid"), cmnt : ""});
    const [dt, setdt] = useState({comments : [], reactions : {}, discussion_heading : "", username : "", content : "", post_time : {}});
    const [dum, setdum] = useState("");

    const handleReaction = (e) => {
        fetch("https://discusion-project.vercel.app/reaction", {
            method : "POST",
            body : JSON.stringify({type : e.target.id, id : par.id}),
            headers : {
                "Content-type" : "application/json",
            },
        })
        .then(r => r.text())
        .then(d => setdum(d))
        .catch(e => console.log(e));
    };

    const handlefdata = (e) => {
        const {name, value} = e.target;

        setfdata({...fdata, [name] : value});

    };

    const submit = (e) => {
        e.preventDefault();
        if (!localStorage.getItem("userid")){
            alert("not logged in");
            return;
        }
        fdata.id = par.id;
        console.log(fdata);
        fetch("https://discusion-project.vercel.app/addcomment",{
            method : "POST",
            body : JSON.stringify(fdata),
            headers : {
                "Content-Type" : "application/json",
            },
        })
        .then(r => r.text())
        .then(d => {
            if (d === "commented"){
                setdum(d);
                setfdata({...fdata, ["cmnt"] : ""});
            }
        })
        .catch(e => console.log(e));
    };

    useEffect(() => {
        console.log(par.id);
        fetch("https://discusion-project.vercel.app/getthread", {method:"POST", body:JSON.stringify({id : par.id}), headers:{"Content-Type": "application/json"}})
        .then(res => res.json())
        .then(data => {setdt(data); console.log(data);})
        .catch(e => console.log(e));
        setdum("");             
        }, [dum]);

    return (
        <div style={{display : "flex", flexDirection : "column"}}>
            <Nv />
            <div className="discussion" style = {{backgroundColor : "white", 
            boxShadow: "inset 0 -3em 3em rgba(0, 0, 0, 0.1), 0 0 0 2px rgb(255, 255, 255),0.3em 0.3em 1em rgba(0, 0, 0, 0.3)",
            width : "70%",  margin : "5% auto", borderRadius : "20px", padding : "1%"}}>
                <div className="user" style={{}}>
                    <p ><img src = {profile} width="30px" style={{float : "left", marginRight : "1%"}}/>{dt.username}</p> </div>
                <div className="title" style={{paddingBottom : "1%", borderBottom : "1px solid gray"}}>
                    Title : {dt.discussion_heading} </div>
                <div className="content" style={{padding : "1%"}}>
                     <p style={{overflowWrap : "break-word" }}>{dt.content}</p>
                </div>
                <div style={{padding : "1%"}}>
                    {dt.post_time.day} {dt.post_time.time}
                </div>
                <div className="reactns" style={{padding : "1%"}}>
                <div onClick={handleReaction} style={{display : "flex",  width : "7%", justifyContent : "space-between"}}>
                        <img id = "likes" src={image} width="30px" height="30px" style={{float : "left"}}/>
                        <div style={{margin : "0 20px 0 2px", width : "20%"}}>
                            {dt.reactions.likes}
                        </div>
                        <img id = "hearts" src={image} width="30px" height="30px" style={{float : "left",transform : "rotate(180deg)"}}/>
                        <div style={{margin : "0 20px 0 2px", width : "20%"}}>
                            {dt.reactions.hearts}
                        </div>
                </div>
                </div>
            </div> 
            <div className="addcmnt" style={{backgroundColor : "white", 
            boxShadow: "inset 0 -3em 3em rgba(0, 0, 0, 0.1), 0 0 0 2px rgb(255, 255, 255),0.3em 0.3em 1em rgba(0, 0, 0, 0.3)",
             margin : "5% auto",width : "70%", borderRadius : "20px"}}>
                <form onSubmit={submit}>
                    <textarea name="cmnt" value={fdata.cmnt} required = {true} onChange={handlefdata} placeholder="Write your comment ..." style={{margin : "2%", width : "95%", height : "100px"}}/> 
                    <div style={{margin : "2%"}}>
                        <button style={{border : "none"}}type="submit">Comment</button>
                    </div>
                </form>
            </div>
            <div className="cmntbox" style={{backgroundColor : "white",
            boxShadow: "inset 0 -3em 3em rgba(0, 0, 0, 0.1), 0 0 0 2px rgb(255, 255, 255),0.3em 0.3em 1em rgba(0, 0, 0, 0.3)",
            borderRadius : "20px", width : "70%" , margin : "5% auto",
             display : "flex", flexDirection : "column", justifyContent : "space-evenly"}}>
                <div style={{margin : "1%"}}> <h1 className="cmntss" style={{ paddingLeft : "2%"}}>COMMENTS</h1> </div>
                {dt.comments.map(crtcmnt)}
            </div>
        </div>
    );
}

export default Pstpg;