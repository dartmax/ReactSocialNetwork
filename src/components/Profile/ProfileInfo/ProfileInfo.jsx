import React from "react";
import s from './ProfileInfo.module.css'
import Preloader from "../../../Common/Preloader/Preloader";

const ProfileInfo = (props) => {
    if (!props.propfile) {
        return <Preloader/>
    }

    return (
        <div>
            <div>
                <img src="https://www.westinstructionalservices.net/wp-content/uploads/2018/07/beach-540x228.jpeg"
                     alt=""/>
            </div>
            <div className={s.descriptionBlock}>
                <img src={props.propfile.photos.large} alt=""/>
                ava + description
            </div>
        </div>
    )
};

export default ProfileInfo;
