import React, {useEffect, useState} from "react";
import * as usersApi from './api/users';
import UserProfile from './TestFuncProfile';

export default function () {
    let[users, setUsers] = useState({loaded: false, list: null});
    useEffect(() => {
        usersApi.all().then((list) => setUsers({loaded: true, list}))
    }, []);

    let [selectedId, setId] = useState(null);

        if (users.loaded) {
            return <div>Loading...</div>;
        }
        let userList = users.list.map((user) => {
            let classes = ['list-group-item'];
            if (user.id === selectedId) {
                classes.push('text-success');
            }
            return <li className={classes.join(' ')}
                       key={user.id}
                       onClick={() => setId(user.id)}
            >
                {user.name}
            </li>
        })
        let userInfo = selectedId === null ?
            <div className="alert alert-warning">Please, select user!</div> :
            <UserProfile id={selectedId}/>
        return <div>
            <ul className="list-group">
                {userList}
            </ul>
            <hr/>
            {userInfo}
        </div>
}

