import React from "react";
import image from './like.png';
import profile from './profile.png';

const Getcmnt = (props) => {
    return (
        <div style={{margin : "1%", borderRadius : "20px", padding : "1%", boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.3)", paddingLeft : "3%"}}>
            <div className="userid" style={{width : "fit-content", borderBottom : "1px solid gray"}}>
                <p className="cmntusr" style={{}}><img src = {profile} width="40px" style={{float : "left"}}/>&nbsp;{props.username}</p>
            </div>
            <div className="comment">
                <p style={{overflowWrap : "break-word"}}>{props.comment}</p>
            </div>
            <div className="reactns" style={{display : "flex", width :"7%", justifyContent: "space-between"}}>
                <img src={image} width="30px" height="30px" style={{float : "left"}}/>
                <div style={{margin : "0 20px 0 2px", width : "20%"}}>
                    {props.reactions.likes}
                </div>
                <img src={image} width="30px" height="30px" style={{float : "left",transform : "rotate(180deg)"}}/>
                <div style={{margin : "0 20px 0 2px", width : "20%"}}>
                    {props.reactions.dislikes}
                </div>
            </div>
        </div>
    );
}

export default Getcmnt;