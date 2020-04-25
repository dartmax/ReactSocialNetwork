import React from "react";
import PaginationComponent from "../../Common/Pagination/PaginationComponent";
import User from "./User";

let Users = ({currentPage, onPageChanged, totalUsersCount, pageSize, users, ...props}) => {
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