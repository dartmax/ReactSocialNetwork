import React, {useEffect, useMemo, useState} from "react";
import * as usersApi from './api/users';

export default function (props) {
    let [user, setUser] = useState({loaded: false, info: null});
    useEffect(() => {
        if (user.loaded) {
            setUser({loaded: false, info: false});
        }
        usersApi.get(props.id).then((info) => setUser({loaded: true, info}));
    }, [props.id])

    let [something, setSomething] = useState(0);
    let der = useMemo(() => something ** 4, [something]);

    if (!user.loaded) {
        return <div>Loading...</div>
    }
    return <table className="table table-boardered">
        <tbody>
        <tr>
            <td>Name</td>
            <td>{user.info.name}</td>
        </tr>
        <tr>
            <td>About</td>
            <td>{user.info.description}</td>
        </tr>
        <tr onClick={() => {
            setSomething(something + 1)
        }}>
            <td>Some Counter</td>
            <td>{something}</td>
        </tr>
        <tr>
            <td>Some Derivative</td>
            <td>{der}</td>
        </tr>
        </tbody>

    </table>

}