import React, {Fragment, FC, ComponentType} from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter, Redirect, Route, Switch, withRouter} from "react-router-dom";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import TestList from "./components/Test/TestList";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import LoginPage from "./Login/Login";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./Common/Preloader/Preloader";
import store, {AppStateType} from "./redux/redux-store";
import {withSuspense} from "./hoc/withSuspense";


const DialogsContainer = React.lazy(() => import ("./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import ("./components/Profile/ProfileContainer"));

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}

const SuspendedDialogs = withSuspense(DialogsContainer)
const SuspendedProfile = withSuspense(ProfileContainer)
const SuspendedUsers = withSuspense(() => <UsersContainer pageTitle={"My Friends"}/>)

class App extends React.Component<MapPropsType & DispatchPropsType> {

    catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
        alert("promiseRejectionEvent")
    }

    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    }

    componentWillUnmount() {
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
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
                        <Switch>
                        <Route exact path='/' render={() => <Redirect to={"/profile"} />}/>
                        <Route path='/dialogs' render={() => <SuspendedDialogs />}/>
                        <Route path='/profile/:userId?' render={() => <SuspendedProfile />}/>
                        <Route path='/users' render={() => <SuspendedUsers />}/>
                        <Route path='/login' render={() => <LoginPage/>}/>
                        <Route path='/test' render={() => <TestList/>}/>
                        <Route path='*' render={() => <div>404 NOT FOUND</div>}/>

                            {/*<Route path='/music' component={Music}/>*/}
                        {/*<Route path='/settings' component={Settings}/>*/}
                        </Switch>
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})

let AppContainer = compose<ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);

const SocialJSApp: FC = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default SocialJSApp;
