import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import {Button, TextareaAutosize} from '@material-ui/core';

const MyPosts = (props) => {
    let postElements = props.posts.map(p => <Post message={p.message} like={p.like}/>);

    let newPostElement = React.createRef();

    let addPost = () => {
        props.addPost();
    };

    let onPostChange = () => {
        let text = newPostElement.current.value;
        props.updateNewPostText(text);
    };

    return (
        <div className={s.postsBlock}>
            <h3>My Posts</h3>
            <div>
                <TextareaAutosize onChange={ onPostChange } ref={ newPostElement } aria-label="minimum height" rowsMin={3} cols={100}
                                  value = {props.newPostText}/>
            </div>
            <div>
                <Button variant="outlined" onClick={ addPost }>Add Post</Button>
            </div>
            <div className={s.posts}>
                {postElements}
            </div>
        </div>
    )
};

export default MyPosts;
