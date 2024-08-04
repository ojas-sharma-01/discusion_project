import React from "react";
import { Link } from 'react-router-dom';
import profile from './profile.png';
import like from './like.png';

function Post (props) {
    const st = {
        display : "flex",
        flexDirection : "column",
        width : "100%",
        margin : "2% 0",
        borderBottom : "1px solid gray",
        paddingBottom : "5px",
        justifyContent : "space-between",
    }

    return (
        <div>
            <Link to={"./pst/" + props.id } style = {st}>
                <div className="about" style={{marginBottom : "5%"}}>
                    <img src={profile} width="40px" style={{float : "left", marginRight : "1%"}}/>{props.username}
                </div>
                <div style={{display : "flex"}}>
                    <div className="pstcontent" style={{flex : "5", marginRight : "10%"}}>
                        {props.discussion_heading}
                    </div>
                    <div style={{flex : "1"}}>
                        {props.post_time.day} {props.post_time.time}
                    </div>
                    <div className="reactions" style={{display : "flex", justifyContent : "space-evenly", flex : "1"}}>
                        <img src={like} style={{float : "left"}}/>
                        <div style={{margin : "0 20px 0 2px", width : "20%"}}>
                            {props.reactions.likes}
                        </div>
                        <img src={like} style={{float : "left",transform : "rotate(180deg)"}}/>
                        <div style={{margin : "0 20px 0 2px", width : "20%"}}>
                            {props.reactions.hearts}
                        </div>
                        {/*<div style={{margin : "0 20px 0 2px", width : "20%"}}>
                            {props.reactions.laughs}</div>*/}
                    </div>
                </div>
            </Link>
        </div>
    );

}

export default Post;