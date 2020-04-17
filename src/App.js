import React, {Fragment} from 'react';
import {compose} from "redux";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import HeaderContainer from "./components/Header/HeaderContainer";
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {Route} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import LoginPage from "./Login/Login";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./Common/Preloader/Preloader";
import TestList from "./components/Test/TestList";


class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <Fragment>
                <div className='app-wrapper'>
                    <HeaderContainer/>
                    <Navbar/>
                    <div className='app-wrapper-content'>
                        <Route path='/dialogs' render={() => <DialogsContainer/>}/>
                        <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                        <Route path='/users' render={() => <UsersContainer/>}/>
                        <Route path='/login' render={() => <LoginPage/>}/>
                        <Route path='/test' render={() => <TestList/>}/>

                        {/*<Route path='/music' component={Music}/>*/}
                        {/*<Route path='/settings' component={Settings}/>*/}
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

export default compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);

