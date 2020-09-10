import React, {FC} from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "../MyPosts/MyPostsContainer";
import {ProfileType} from "../../types/types";


type PropsType = {
    profile: ProfileType | null
    status: string
    isOwner: boolean
    savePhoto: (file: File) => void
    updateStatus:(status: string) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}

const Profile: FC<PropsType> = (props) => {
    return (
        <div>
            <ProfileInfo
                saveProfile={props.saveProfile}
                savePhoto={props.savePhoto}
                isOwner={props.isOwner}
                profile={props.profile}
                status={props.status}
                updateStatus={props.updateStatus}/>
            <MyPostsContainer />
        </div>
    )
};
export default Profile;
