import React from "react";
import Profile from "./Profile";
import {getUserProfile, getStatus, updateStatus} from "../../redux/profile-reducer";
import {connect} from "react-redux";
import { withRouter } from "react-router";
import {compose} from "redux";

class ProfileContainer extends React.Component{
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = 6766;
        }
        this.props.getUserProfile(userId);
        this.props.getStatus(userId);
}
    render () {
        return (
            <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus}/>
        )
    }
}

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
});

export default compose(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus}),
    withRouter
)(ProfileContainer);


