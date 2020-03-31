import React from "react";
import {NavLink} from "react-router-dom";
import styles from "./users.module.css";
import userPhoto from "../../assets/images.png"
import * as axios from "axios";

let Users = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for(let i=0; i <= pagesCount; i++){
        pages.push(i);
    }
    return (
        <div>
            <div>
                {pages.map(p => {
                    return <span className={props.currentPage === p && styles.selectedPage}
                                 onClick={(e)=>{props.onPageChanged(p);
                                 }}>{p}</span>
                })}
            </div>
        {
            props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <NavLink to ={'/profile/' + u.id}>
                        <img src={u.photos.small != null ? u.photos.small : userPhoto} alt="" className={styles.usersPhoto}/>
                    </NavLink></div>
                    <div>
                        {u.followed
                            ? <button disabled={props.followingInProgress} onClick={() => {
                                props.toggleIsFollowingProgress(true);
                                axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
                                    withCredentials: true,
                                    headers: {
                                        "API-KEY": "4c93bb5d-ad18-4497-928e-8d8229dc31f1"
                                    }
                                })
                                    .then(response => {
                                        if (response.data.resultCode === 0){
                                            props.unFollow(u.id)
                                        }
                                        props.toggleIsFollowingProgress(false);
                                    });
                            }}>unFollow</button>
                            : <button disabled={props.followingInProgress} onClick={() => {
                                props.toggleIsFollowingProgress(true);
                                    axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {
                                        withCredentials: true,
                                        headers: {
                                            "API-KEY": "4c93bb5d-ad18-4497-928e-8d8229dc31f1"
                                        }
                                    })
                                        .then(response => {
                                            if (response.data.resultCode === 0){
                                                props.unFollow(u.id)
                                            }
                                            props.toggleIsFollowingProgress(false);
                                        });
                                props.follow(u.id)

                            }}>follow</button>}
                    </div>
                </span>
                <span>
                    <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{'u.location.country'}</div>
                        <div>{'u.location.city'}</div>
                    </span>
                </span>
            </div>)
        }
    </div>
    )
};
export default Users;