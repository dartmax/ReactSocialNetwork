import React, {FC} from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import {AddNewPostFormRedux, AddPostFormValuesType} from "./AddPostForm/AddPostForm";
import {PostType} from "../../types/types";

export type MapPropsType = {
    posts: Array<PostType>
}
export type DispatchPropsType = {
    addPost: (newPostText: string) => void
}
const MyPosts: FC<MapPropsType & DispatchPropsType> = props => {
    let postElements =
        [...props.posts]
        .reverse()
        .map(p => <Post key={p.id} message={p.message} like={p.like}/>);

    let onAddPost = (values: AddPostFormValuesType) => {
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
};

const MyPostsWithMemo = React.memo(MyPosts)

export default MyPostsWithMemo