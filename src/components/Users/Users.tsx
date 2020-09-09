import React, {FC} from "react";
import PaginationComponent from "../../Common/Pagination/PaginationComponent";
import User from "./User";
import {UserType} from "../../types/types";
import Preloader from "../../Common/Preloader/Preloader";

type PropsType = {
    currentPage: number
    pageSize: number
    totalUsersCount: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UserType>
    followingInProgress: Array<number>
    unFollow: (userId: number) => void
    follow: (userId: number) => void
}

let Users: FC<PropsType> = ({
  currentPage,
  onPageChanged,
  totalUsersCount,
  pageSize,
  users,
  ...props
}) => {
    if (!PaginationComponent) {
        return <Preloader/>
    }
    return (<div>
        <PaginationComponent currentPage={currentPage}
                                 onPageChanged={onPageChanged}
                                 totalUsersCount={totalUsersCount}
                                 pageSize={pageSize}/>
        {users.map(u => <User key={u.id}
                              followingInProgress={props.followingInProgress}
                              user={u}
                              unFollow={props.unFollow}
                              follow={props.follow}/> )}
    </div>)
};
export default Users;