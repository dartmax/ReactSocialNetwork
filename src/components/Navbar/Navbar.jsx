import React from "react";
import s from './Navbar.module.css'
import {NavLink} from "react-router-dom";
import {Button, ButtonGroup } from '@material-ui/core/';


const Navbar = () => {
    return (
        <div className={s.nav}>
        <ButtonGroup orientation="vertical" size="large" className={s.nav}>
            <Button className={`${s.item} ${s.active}`}><NavLink to="/profile" activeClassName={s.activeLink}>Profile</NavLink></Button>
            <Button className={s.item}><NavLink to="/dialogs" activeClassName={s.activeLink}>Messages</NavLink></Button>
            <Button className={s.item}><NavLink to="/news" activeClassName={s.activeLink}>News</NavLink></Button>
            <Button className={s.item}><NavLink to="/music" activeClassName={s.activeLink}>Music</NavLink></Button>
            <Button className={s.item}><NavLink to="/settings" activeClassName={s.activeLink}>Settings</NavLink></Button>
        </ButtonGroup>
        </div>
    )
}
export default Navbar;
