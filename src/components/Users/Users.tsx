import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import PaginationComponent from '../../Common/Pagination/PaginationComponent';
import User from './User';
import Preloader from '../../Common/Preloader/Preloader';
import {UsersSearchForm} from "./UsersSearchForm";
import {FilterType, requestUsers} from "../../redux/users-reducer";
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSizes,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from "../../redux/users-selectors";

type PropsType = {
    //currentPage: number
    //pageSize: number
    //totalUsersCount: number
    // onPageChanged: (pageNumber: number) => void
    // onFilterChanged: (filter: FilterType) => void
    // users: Array<UserType>
    // followingInProgress: Array<number>
    // unFollow: (userId: number) => void
    // follow: (userId: number) => void
}

export const Users: FC<PropsType> = (props) => {
    const users = useSelector(getUsers)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSizes)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)

    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, filter));
    }, [])
      const onPageChanged = (pageNumber: number) => {
          dispatch(requestUsers(pageNumber, pageSize, filter));
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter));
    }

    const unFollow = (userId: number) => {
        dispatch(unFollow(userId))
    }
    const follow = (userId: number) => {
        dispatch(follow(userId))
    }


    if (!PaginationComponent) {
        return <Preloader/>
    }

    return (<div>
        <UsersSearchForm onFilterChanged={onFilterChanged} />

        <PaginationComponent currentPage={currentPage}
                                 onPageChanged={onPageChanged}
                                 totalUsersCount={totalUsersCount}
                                 pageSize={pageSize}/>
        {users.map(u => <User key={u.id}
                              followingInProgress={followingInProgress}
                              user={u}
                              unFollow={unFollow}
                              follow={follow}/> )}

    </div>)
};
