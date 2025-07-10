import React from "react";
import image from './like.png';
import profile from './profile.png';

const Getcmnt = (props) => {
    return (
        <div className="my-2 rounded-2xl p-4 pl-8 shadow-lg bg-white">
            <div className="flex items-center border-b border-gray-300 w-fit pb-2 mb-2">
                <img src={profile} className="w-10 h-10 rounded-full mr-2" alt="profile" />
                <span className="font-semibold text-lg">{props.username}</span>
            </div>
            <div className="mb-2">
                <p className="break-words text-base text-gray-800">{props.comment}</p>
            </div>
            <div className="flex items-center gap-4 w-fit">
                <div className="flex items-center gap-1">
                    <img src={image} className="w-7 h-7" alt="like" />
                    <span className="ml-1 w-6 text-center">{props.reactions.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                    <img src={image} className="w-7 h-7 transform rotate-180" alt="dislike" />
                    <span className="ml-1 w-6 text-center">{props.reactions.dislikes}</span>
                </div>
            </div>
        </div>
    );
}

export default Getcmnt;