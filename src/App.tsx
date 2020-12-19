import React, {FC, ComponentType, ReactNode} from 'react';
import './App.css';
import 'antd/dist/antd.css';
import {BrowserRouter, NavLink, Redirect, Route, Switch, withRouter} from "react-router-dom";
import {UsersPage} from "./components/Users/UsersContainer";

import TestList from "./components/Test/TestList";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {LoginPage} from "./Login/Login";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./Common/Preloader/Preloader";
import store, {AppStateType} from "./redux/redux-store";
import {withSuspense} from "./hoc/withSuspense";

import {Button, Layout, Menu, Breadcrumb} from 'antd';
import {UserOutlined, LaptopOutlined, NotificationOutlined} from '@ant-design/icons';
import s from "./components/Navbar/Navbar.module.css";
import {AppHeader} from "./components/Header/Header";
import {ProfileType} from "./types/types";

const {SubMenu} = Menu;
const {Content, Footer, Sider} = Layout;


const DialogsContainer = React.lazy(() => import ("./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import ("./components/Profile/ProfileContainer"));

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: () => void
  profile: ProfileType
}

const SuspendedDialogs = withSuspense(DialogsContainer)
const SuspendedProfile = withSuspense(ProfileContainer)
const SuspendedUsers = withSuspense(() => <UsersPage pageTitle={"My Friends"}/>)

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
      <Layout>
        <AppHeader />

        <Content style={{padding: '0 50px', backgroundColor: "#e7e7e8", alignSelf: "center"}} className="bg-white">
          <Breadcrumb style={{margin: '16px 0'}}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          </Breadcrumb>
          <Layout className="site-layout-background " style={{padding: '24px 0', width: "1200px"}}>
            <Sider className="site-layout-background" width={200}>
              <Menu
                mode="inline"
                // defaultSelectedKeys={['1']}
                // defaultOpenKeys={['sub1']}
                style={{height: '100%'}}
              >
                <Menu.Item key="1"><NavLink to="/profile" activeClassName={s.activeLink}>Profile</NavLink></Menu.Item>
                <Menu.Item key="2"><NavLink to="/users" activeClassName={s.activeLink}>Users</NavLink></Menu.Item>
                <Menu.Item key="5"><NavLink to="/dialogs" activeClassName={s.activeLink}>Messages</NavLink></Menu.Item>
              </Menu>
            </Sider>
            <Content style={{padding: '0 24px', minHeight: 280}}>
              <Switch>
                <Route exact path='/' render={() => <Redirect to={"/profile"}/>}/>
                <Route path='/dialogs' render={() => <SuspendedDialogs/>}/>
                <Route path='/profile/:userId?' render={() => <SuspendedProfile/>}/>
                <Route path='/users' render={() => <SuspendedUsers/>}/>
                <Route path='/login' render={() => <LoginPage/>}/>
                <Route path='/test' render={() => <TestList/>}/>
                <Route path='*' render={() => <SuspendedUsers/>}/>

                {/*<Route path='/music' component={Music}/>*/}
                {/*<Route path='/settings' component={Settings}/>*/}
              </Switch>
            </Content>
          </Layout>
        </Content>
        <Footer style={{textAlign: 'center'}}>SocialNetwork ©2020 github.com/dartmax</Footer>
      </Layout>
      // <Fragment>
      //     <div className='app-wrapper'>
      //         <HeaderContainer/>
      //         <Navbar/>
      //         <div className='app-wrapper-content'>


      //         </div>
      //     </div>
      // </Fragment>
    );
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized,
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
debugger;
export default SocialJSApp;
