import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import {Button, TextareaAutosize} from '@material-ui/core';

const MyPosts = (props) => {
    let posts =[
        {id: 1, message: 'Hi, how are you?', like: 20},
        {id: 2, message: "It's my first post", like: 30},
        {id: 3, message: "It's post", like: 0},
        {id: 4, message: "It's my 4th post!!!", like: 5}
    ]
    let postElements = posts.map(p => <Post message={p.message} like={p.like}/> )
    return (
        <div className={s.postsBlock}>
            <h3>My Posts</h3>
            <div>
                <TextareaAutosize aria-label="minimum height" rowsMin={3} cols={100} placeholder="My post..." />
            </div>
            <div>
                <Button variant="outlined">Add Post</Button>
            </div>
            <div className={s.posts}>
                { postElements }
            </div>
        </div>
    )
}

export default MyPosts;
