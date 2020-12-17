import React, {FC} from "react";

import {Avatar, Col, Layout, Menu, Row} from "antd";
import {UserOutlined} from "@ant-design/icons";

export type MapPropsType = {
    isAuth: boolean
    login: string | null
}

export type DispatchPropsType = {
    logout: () => void
}

export const Header: FC<MapPropsType & DispatchPropsType> = (props) => {
    const {Header} = Layout
    return <Header className="header">
        <div className="logo" />
        <Row>
            <Col span={20}>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key="1">nav 1</Menu.Item>
                </Menu>
            </Col>
            <Col span={4}>
                <Avatar style={{backgroundColor: '#87d068'}} icon={<UserOutlined />} />
            </Col>
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
