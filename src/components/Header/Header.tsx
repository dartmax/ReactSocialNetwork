import React, {FC} from "react";
import s from './Header.module.css';
import {Button} from '@material-ui/core';
import to from '../../hoc/to'

export type MapPropsType = {
    isAuth: boolean
    login: string | null
}

export type DispatchPropsType = {
    logout: () => void
}

const Header: FC<MapPropsType & DispatchPropsType> = (props) => {
    return <header className={s.header}>
        <img src="http://pngimg.com/uploads/google/google_PNG19633.png" alt=""/>

        <div className={s.loginBlock}>
            {props.isAuth
                ? <div>{props.login} - <Button variant="outlined" onClick={props.logout}>Log out</Button></div>
                : <Button variant="outlined" {...to('/login')}>Login</Button>}
        </div>
    </header>
};
export default Header;
