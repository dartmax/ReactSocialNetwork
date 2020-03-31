import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "../MyPosts/MyPostsContainer";


const Profile = (props) => {
    return (
        <div>
                <ProfileInfo propfile={props.profile}/>
                <MyPostsContainer />
        </div>
    )
};
export default Profile;
