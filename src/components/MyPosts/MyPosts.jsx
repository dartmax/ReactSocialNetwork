import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import {Button} from '@material-ui/core';
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {Textarea} from "../../Common/FormsControls/FormsControls";

const maxLength10 = maxLengthCreator(10)

let AddNewPostForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field name="newPostText" component={Textarea} placeholder={"Post message"} validate={[required, maxLength10]}/>
        </div>
        <div>
            <Button variant="outlined">Add Post</Button>
        </div>
    </form>
}

let AddNewPostFormRedux = reduxForm({form: "ProfileAddNewPostForm"})(AddNewPostForm);

const MyPosts = React.memo((props) => {
    let postElements = [...props.posts].reverse().map(p => <Post message={p.message} like={p.like}/>);

    // eslint-disable-next-line no-unused-vars
    let newPostElement = React.createRef();

    let onAddPost = (values) => {
        props.addPost(values.newPostText);
    };

    return (
        <div className={s.postsBlock}>
            <h3>My Posts</h3>
            <AddNewPostFormRedux onSubmit={onAddPost}/>
            <div className={s.posts}>
                {postElements}
            </div>
        </div>
    )
});


export default MyPosts;
