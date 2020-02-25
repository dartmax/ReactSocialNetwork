import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";

const MyPosts = (props) => {
    return (
        <div>
            <textarea name="" id="" cols="30" rows="5"></textarea>
            <button>Add Post</button>

            <div className={s.posts}>
                <Post message = 'Hi, how are you?' like = '0'/>
                <Post message = "It's my first post" like = '30'/>
            </div>
        </div>
    )
}

export default MyPosts;
