import React from "react";
import {Field, reduxForm} from "redux-form";
import {Button} from '@material-ui/core';
import {Input} from "./Common/FormsControls/FormsControls"
import {required} from "../utils/validators/validators";
import {connect} from "react-redux";


const LoginForm = (props) => {
    return (
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field placeholder={"Email"} name={"email"}
                           validate={[required]}
                           component={Input}/>
                </div>
                <div>
                    <Field placeholder={"Password"} name={"password"}
                           validate={[required]}
                           component={Input}/>

                </div>
                <div>
                    <Field component={Input} name={"rememberMe"} type={"checkbox"} /> remember me
                </div>
                <div>
                    <Button variant="outlined">Login</Button>
                </div>
            </form>
    )
};

const LoginReduxForm = reduxForm({form: "login"})(LoginForm);


const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }
    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
};
export default connect(null, {login} )(Login);