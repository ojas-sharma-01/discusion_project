import React from "react";
import { Link } from 'react-router-dom';
import profile from './profile.png';
import like from './like.png';
import { Timestamp } from "firebase/firestore";

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

    const timeStamp = new Timestamp(props?.postTime?._seconds, props?.postTime?._nanoseconds);

    return (
        <div>
            <Link to={"./pst/" + props.id } state={{post_user : props.username}} style = {st}>
                <div className="about mb-6">
                    <img src={profile} className="w-[40px] h-[40px] rounded-full mr-[1%]" style={{float : "left"}}/>{props.username}
                </div>
                <div style={{display : "flex"}}>
                    <div className="pstcontent" style={{flex : "5", marginRight : "10%"}}>
                        {props.discussion_heading}
                    </div>
                    <div style={{flex : "1"}} className="text-md text-gray-500">
                        {/* {props.post_time.day} */}
                        {timeStamp.toDate().toDateString()}
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