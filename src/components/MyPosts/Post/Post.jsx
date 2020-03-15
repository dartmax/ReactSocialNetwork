import React from "react";
import s from "./Post.module.css";

const Post = (props) => {
    return (
        <div className={s.item}>
            <img src="https://s3.amazonaws.com/liberty-uploads/wp-content/uploads/sites/1218/2015/09/avatarsucks.jpg"/>
                { props.message }
                <div>
                <span>Superlike:{props.like}</span>
            </div>
        </div>
    )
}

export default Post;
