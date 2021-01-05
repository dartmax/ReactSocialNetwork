import React, {FC} from "react";
import {NavLink} from "react-router-dom";
import styles from "./users.module.css";
import userPhoto from "../../assets/images.png"
import {UserType} from "../../types/types";

type PropsType = {
    user: UserType
    followingInProgress: Array<number>
    unFollowUser: (userId: number) => void
    followUser: (userId: number) => void
}

const User: FC<PropsType> = ({user, followingInProgress, unFollowUser, followUser}) => {
     return (
        <div>
            <span>
                <div>
                    <NavLink to={'/profile/' + user.id}>
                    <img src={user.photos.small != null ? user.photos.small : userPhoto} alt=""
                         className={styles.usersPhoto}/>
                </NavLink></div>
                <div>
                    {user.followed
                        ? <button disabled={followingInProgress.some(id => id === user.id)}
                                  onClick={() => {
                                    unFollowUser(user.id)
                                  }}>
                            unFollow</button>
                        : <button disabled={followingInProgress.some(id => id === user.id)}
                                  onClick={() => {followUser(user.id)}}>
                            Follow</button>}
                </div>
            </span>
            <span>
                <span>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </span>
                <span>
                    <div>{'Ukraine'}</div>
                    <div>{'Kyiv'}</div>
                </span>
            </span>
        </div>)
}

export default User;