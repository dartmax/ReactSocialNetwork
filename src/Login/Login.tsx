import React, {FC} from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {Button} from '@material-ui/core';
import {Input} from "../Common/FormsControls/FormsControls"
import {required} from "../utils/validators/validators";
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom';
import login from "../redux/auth-reducer"
import styles from "../Common/FormsControls/FormsControls.module.css"
import {createField} from "../Common/FormsControls/FormsControls"
import {AppStateType} from "../redux/redux-store";

type LoginFormOwnProps = {
    captchaUrl: string | null
}

const LoginForm: FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps>
    = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
                {createField<LoginFormValuesTypeKeys>("Email", "email", [required], Input)}
                {createField<LoginFormValuesTypeKeys>("Password", "password", [required], Input, {type: "password"})}
                {createField<LoginFormValuesTypeKeys>(undefined, "rememberMe", [], Input, {type: "checkbox"}, "remember me")}

                {captchaUrl && <img src={captchaUrl} alt=""/>}
                {captchaUrl && createField<LoginFormValuesTypeKeys>("Symbols from image", "captcha", [required], Input, {})}

            {error && <div className={styles.formSummaryError}>
                {error}
            </div>}
            <div>
                <Button variant="outlined">Login</Button>
            </div>
        </form>
    )
};

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: "login"})(LoginForm);

type MapStatePropsType = {
    captchaUrl: string | null
    isAuth: boolean
}

type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) =>void
    isAuth: boolean
}

export type LoginFormValuesType = {
    captcha: string
    rememberMe: boolean
    password: string
    email: string
}

type LoginFormValuesTypeKeys = Extract<keyof LoginFormValuesType, string>


const Login: FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
    const onSubmit = (formData: LoginFormValuesType) => {
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

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
});
export default connect(mapStateToProps, {login} )(LoginForm);