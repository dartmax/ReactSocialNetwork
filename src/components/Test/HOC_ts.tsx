import {compose} from 'redux';
import React, {ComponentType} from 'react';
import {RouteComponentProps, withRouter} from "react-router";
import {connect} from "react-redux";

function A<T extends {name: string}>(entity: T) {
    //entity.name
}
type WithNameType = {name: string}
A({name: 'hi', age: 18})
A({name: 'hi', title: 18})

//let a: WithNameType = {name: 'hi', age: 18}


function HelloHOC<WP extends {hello: number}>(WrappedComponent: ComponentType<WP>){
    let ContainerComponent: React.FC<Omit<WP, 'hello'>> = (props) => {
    //let ContainerComponent: React.FC<WP & {hello?: number}> =  (props) => {
        return <div><WrappedComponent {...props as WP} hello={10}/></div>
    }
    return ContainerComponent
}

function DropHOC<WP extends {drop: number}>(WrappedComponent: ComponentType<WP>){
    let ContainerComponent: React.FC<Omit<WP, 'drop'>> = (props) => {
        //let ContainerComponent: React.FC<WP & {hello?: number}> =  (props) => {
        return <div><WrappedComponent {...props as WP} drop={10}/></div>
    }
    return ContainerComponent
}

// type C1PropsType = {
//     age: number
//     title: string
//     hello: number
//     drop: number
//     math: any
// }
type C1PropsType = {
    age: number
    title: string
    hello: number
}

type MapPropsType = {
    drop: number
}

type C1paramsType = {userId: string}

type C1Type = React.FC<C1PropsType & MapPropsType & RouteComponentProps<C1paramsType>>

const C1: C1Type = (props) => {
    console.log("-> props.match.params.userId", props.match.params.userId);
    return <div>{props.title}</div>
}

// const C1Container = HelloHOC(C1)
// const C1Container2 = DropHOC(C1Container)

type FromHelloHOCPropsType = Omit<C1PropsType, 'hello'>
type FromHelloHOCType = ComponentType<FromHelloHOCPropsType>
type FromDropHOCType = ComponentType<Omit<FromHelloHOCPropsType, 'drop'>>

// let WithoutHelloComponent: FromDropHOCType;

// const SupremeHOC = compose<
// FromHelloHOCType, // A
// ComponentType<C1PropsType>, //T1
// FromDropHOCType>( // R
//     DropHOC,
//     HelloHOC);
//const C1Container2 = SupremeHOC(C1)

// const App2 = () => {
//     return <>
//     <C1Container2 title={"hello ts"} age={19}/>
//     </>
// }
let mstp = (state: any) => {
    return {
        drop: 12,
    }
}

const C1_1connect = connect(mstp)(C1)
const ConnectedWithRouterC2 = withRouter(C1_1connect)

const ConnectedWithRouterC1 = compose<ComponentType<Omit<C1PropsType, 'hello'>>>(
    withRouter,
    connect(mstp),
    HelloHOC
)(C1)


const App = () => {
    return <>
        <ConnectedWithRouterC1 title={"hello ts"} age={19} />
        {/*<ConnectedWithRouterC1 title={"hello ts"} age={19}/>*/}
    </>
}

// const f1 = (a:string) => 'sd'
// const f2 = (a:string) => '100'
//
// let result = compose(
//     f2,
//     f1)(18)
//
// // result = 'sd'
// result = 12
