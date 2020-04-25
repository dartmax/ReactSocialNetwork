import React, {Fragment} from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter, Route} from "react-router-dom";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import TestList from "./components/Test/TestList";
import {withRouter} from "react-router";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import LoginPage from "./Login/Login";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./Common/Preloader/Preloader";
import store from "./redux/redux-store";
import {withSuspense} from "./hoc/withSuspense";


const DialogsContainer = React.lazy(() => import ("./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import ("./components/Profile/ProfileContainer"));

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
                        <Route path='/dialogs' render={withSuspense(DialogsContainer)}/>
                        <Route path='/profile/:userId?' render={withSuspense(ProfileContainer)}/>
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

let AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);

const SocialJSApp = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default SocialJSApp;