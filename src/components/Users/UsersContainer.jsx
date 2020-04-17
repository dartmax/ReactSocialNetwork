import React from "react";
import {connect} from "react-redux";
import {follow, unFollow, setCurrentPage, toggleIsFollowingProgress, requestUsers} from '../../redux/users-reducer';
import Users from './Users';
import Preloader from "../../Common/Preloader/Preloader";
import {compose} from "redux";
import {
    getUsers,
    getPageSizes,
    getTotalUsersCount,
    getCurrentPage,
    getIsFetching,
    getFollowingInProgress,
    } from "../../redux/users-selectors"

class UsersContainer extends React.Component {

    componentDidMount() {
        const {currentPage, pageSize} = this.props;
        this.props.getUsers(currentPage, pageSize);
    };

    onPageChanged = (pageNumber) => {
        const {pageSize} = this.props;
        this.props.getUsers(pageNumber, pageSize);
    };

    render() {
        return <>
        {this.props.isFetching ? <Preloader /> : null}
        <Users
            totalUsersCount={this.props.totalUsersCount}
              pageSize={this.props.pageSize}
              currentPage={this.props.currentPage}
              onPageChanged={this.onPageChanged}
              users={this.props.users}
              follow={this.props.follow}
              unFollow={this.props.unFollow}
              followingInProgress={this.props.followingInProgress}
        />
        </>
    }
}


// let mapStateToProps = (state) => {
//     return {
//         users: state.usersPage.users,
//         pageSize: state.usersPage.pageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         followingInProgress: state.usersPage.followingInProgress,
//     }
// };

let mapStateToProps = (state) => {
    return {
        // users: getUsers(state),
        users: getUsers(state),
        pageSize: getPageSizes(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
};

export default compose(
    connect(mapStateToProps, {
        follow,
        unFollow,
        setCurrentPage,
        toggleIsFollowingProgress,
        getUsers: requestUsers,
    }))(UsersContainer);