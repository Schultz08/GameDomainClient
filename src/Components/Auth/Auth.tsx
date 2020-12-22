import React from "react";
import "./Auth.css";
import { Button } from '@material-ui/core';


class Auth extends React.Component {
    state = {
        firstName: "",
        lastName: "",
        email: "",
        userName: "",
        password: "",
        userRole: "",
        login: true,
    }

    handleSubmit = (event: any) => {
        event.preventDefault();

        let url = this.state.login ? "http://localhost:3000/user/login" : "http://localhost:3000/user/register"

        const body = this.state.login ? {
            email: this.state.email,
            password: this.state.password
        } : {
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                userName: this.state.userName
            }

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(data => {
                localStorage.setItem("token", data.token)
                console.log(localStorage.getItem("token"))
            })
    }

    handleLogout = () => {
            localStorage.setItem("token", "")
    }

    title = () => {
        return this.state.login ? "Login" : "Signup";
    }

    logginToggle = (event: any) => {
        event.preventDefault();
        this.setState({ login: !this.state.login })
    }

    signupFields = () => {
        return !this.state.login ?
            <div>
                <input
                    type="text"
                    value={this.state.firstName}
                    onChange={(event) => this.setState({ firstName: event.target.value })}
                    name="firstName"
                ></input>
                <input
                    type="text"
                    value={this.state.lastName}
                    onChange={(event) => this.setState({ lastName: event.target.value })}
                    name="lastName"
                ></input>
                <input
                    type="text"
                    value={this.state.userName}
                    onChange={(event) => this.setState({ userName: event.target.value })}
                    name="userName"
                ></input>
            </div>
            :
            null
    }

    loginButtons = () => {
        return this.state.login ?
            <div>
                <Button color="primary"
                    className="subButton"
                    type="submit"
                >Login!</Button>
                <Button color="primary"
                    onClick={(e) => this.logginToggle(e)}
                    className="subButton"
                >Sign Up!</Button>
            </div> 
            :
            <div>
                <Button color="primary"
                    className="subButton"
                    type="submit"
                >Register!</Button>
                <Button color="primary"
                    onClick={(e) => this.logginToggle(e)}
                    className="subButton"
                >Login!</Button>
            </div>
    }

    render() {

        return (
            <div className="container">
                <div className="innerCard">
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                        <h2>{this.title()}</h2>
                        {this.signupFields()}
                        <input
                            type="email"
                            value={this.state.email}
                            onChange={(event) => this.setState({ email: event.target.value })}
                            name="email"
                            placeholder="Email@email.com"
                        ></input>
                        <input
                            type="password"
                            value={this.state.password}
                            onChange={(event) => this.setState({ password: event.target.value })}
                            name="password"
                            placeholder="password"
                        ></input>
                        <br />
                        {this.loginButtons()}
                    </form>
                </div>
            </div>
        )
    }
}

export default Auth;