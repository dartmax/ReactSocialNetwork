import React from "react";
import s from './ProfileInfo.module.css'

const ProfileInfo = () => {
    return (
        <div>
            <div>
                <img src="https://www.westinstructionalservices.net/wp-content/uploads/2018/07/beach-540x228.jpeg"
                     alt=""/>
            </div>
            <div className={s.descriptionBlock}>
                ava + description
            </div>
        </div>
    )
}
export default ProfileInfo;
