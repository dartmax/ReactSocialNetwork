import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import {Button, TextareaAutosize} from '@material-ui/core';
import {addPost} from "../../redux/state";

const MyPosts = (props) => {

    let newPostElement = React.createRef()

    let postElements = props.posts.map(p => <Post message={p.message} like={p.like}/>)

    let addPost = () => {
        let text = newPostElement.current.value;
        props.addPost(text);
        newPostElement.current.value = '';
    }

    return (
        <div className={s.postsBlock}>
            <h3>My Posts</h3>
            <div>
                <TextareaAutosize ref={newPostElement} aria-label="minimum height" rowsMin={3} cols={100}
                                  placeholder="My post..."/>
            </div>
            <div>
                <Button variant="outlined" onClick={addPost}>Add Post</Button>
            </div>
            <div className={s.posts}>
                {postElements}
            </div>
        </div>
    )
}

export default MyPosts;
