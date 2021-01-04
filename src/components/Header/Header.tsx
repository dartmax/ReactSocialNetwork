import React, {FC} from "react";

import {Avatar, Col, Layout, Menu, Row} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {Button} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUserLogin, selectIsAuth} from "../../redux/auth-selectors";
import {logout} from "../../redux/auth-reducer";
import {Link} from "@material-ui/core";
import to from "../../hoc/to";
import {ProfileType} from "../../types/types";
import userPhoto from "../../assets/images.png";

export type MapPropsType = {}


export const AppHeader: FC<MapPropsType> = (props) => {
  const isAuth = useSelector(selectIsAuth);
  const login = useSelector(selectCurrentUserLogin);

  const dispath = useDispatch()
  const logoutCallback = () => {
    dispath(logout())
  }

  const {Header} = Layout
  return <Header className="header">
    <Row>
      <Col span={22}>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <div key="1">Developer Social</div>
        </Menu>
      </Col>

      {isAuth
        ?<> <Col span={1} style={{textAlign: 'right', paddingRight: '10px'}}>
            <img src={userPhoto} alt={login || ""} style={{width: '35px', borderRadius: '25px'}} />
        </Col>
          <Col span={1} style={{paddingLeft: '10px'}}>
        <Button onClick={logoutCallback}>Log out</Button>
          </Col>
        </>
        : <Col span={2} style={{textAlign: 'right', paddingRight: '10px'}}>
          <Button>
            <Link {...to('/login')}>Login</Link>
          </Button>
        </Col>
      }
    </Row>

  </Header>

  //  <header className={s.header}>
  //     <img src="http://pngimg.com/uploads/google/google_PNG19633.png" alt=""/>
  //
  //     <div className={s.loginBlock}>
  //         {props.isAuth
  //             ? <div>{props.login} - <Button variant="outlined" onClick={props.logout}>Log out</Button></div>
  //             : <Button variant="outlined" {...to('/login')}>Login</Button>}
  //     </div>
  // </header>
};
