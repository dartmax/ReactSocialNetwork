import React from "react";
import s from './ProfileInfo.module.css'
import Preloader from "../../../Common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/images.png";

const ProfileInfo = ({profile: profile, status, updateStatus}) => {
    if (!profile) {
        return <Preloader/>
    }

    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={profile.photos.large !== null ? profile.photos.large : userPhoto} alt=""/>
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
            </div>
        </div>
    )
};

export default ProfileInfo;
