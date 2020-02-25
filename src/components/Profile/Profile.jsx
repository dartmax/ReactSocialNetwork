import React from "react";
import s from './Profile.module.css'
import MyPosts from "../MyPosts/MyPosts";

const Profile = () => {
    return (
        <div>
            <div>
                <img src="https://www.westinstructionalservices.net/wp-content/uploads/2018/07/beach-540x228.jpeg"
                     alt=""/>
            </div>
            <div>
                ava + description
                <div>
                    <MyPosts/>
                </div>

            </div>
        </div>
    )
}
export default Profile;
