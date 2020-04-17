import React from "react";
import * as usersApi from './api/users';
import UserProfile from './TestProfile';

export default class extends React.PureComponent {
    state = {
        loaded: false,
        users: null,
        selectedId: null
    }

    componentDidMount() {
        usersApi.all().then((users) => {
            this.setState({
                loaded: true,
                users
            });
        });
    }

    setId(selectedId) {
        this.setState({selectedId})
    }

    render() {
        if (!this.state.loaded) {
            return <div>Loading...</div>;
        }
        let userList = this.state.users.map((user) => {
            let classes = ['list-group-item'];
            if (user.id === this.state.selectedId) {
                classes.push('text-success');
            }
            return <li className={classes.join(' ')}
                       key={user.id}
                       onClick={() => this.setId(user.id)}
            >
                {user.name}
            </li>
        })
        let userInfo = this.state.selected === null ?
            <div className="alert alert-warning">Please, select user!</div> :
            <UserProfile id={this.state.selected}/>
        return <div>
            <ul className="list-group">
                {userList}
            </ul>
            <hr/>
            {userInfo}
        </div>
    }
}

