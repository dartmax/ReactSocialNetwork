import React from "react";
import {reduxForm} from "redux-form";
import {Button} from '@material-ui/core';
import {Input} from "../Common/FormsControls/FormsControls"
import {required} from "../utils/validators/validators";
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom';
import login from "../redux/auth-reducer"
import styles from "../Common/FormsControls/FormsControls.module.css"
import {createField} from "../Common/FormsControls/FormsControls"

const LoginForm = ({handleSubmit, error, captchaUrl}) => {
    return (
            <form onSubmit={handleSubmit}>
                    {createField("Email", "email", [required], Input)}
                    {createField("Password", "password", [required], Input, {type: "password"})}
                    {createField(null, "rememberMe", [], Input, {type: "checkbox"}, "remember me")}

                    {captchaUrl && <img src={captchaUrl} alt=""/>}
                    {captchaUrl && createField("Captcha", "captcha", [required], Input, {})}

                {error && <div className={styles.formSummaryError}>
                    {error}
                </div>}
                <div>
                    <Button variant="outlined">Login</Button>
                </div>
            </form>
    )
};

const LoginReduxForm = reduxForm({form: "login"})(LoginForm);


const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }
    if(props.isAuth) {
        return <Redirect to={"/profile"} />
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
    </div>
};

const mapStateToProps = (state) => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
});
export default connect(mapStateToProps, {login} )(LoginForm);