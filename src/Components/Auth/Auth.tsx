import React from "react";
import { Button, TextField, Typography, withStyles, createStyles, Theme } from '@material-ui/core';
import { Redirect } from "react-router-dom"
import APIURL from  "../../helpers/enviroment"


const styles = (theme: Theme) => createStyles({
    root: {
        width: '100%',
        maxWidth: 360,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    title: {
        borderBottom: `3px solid ${theme.palette.primary.main}`
    },
    space: {
        margin: 5,
    }
});

type myState = {
    redirect: string | null;
    login: boolean | null;
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    userRole: string;
    email: string;
}

interface myProps {
    updateToken: (token: string) => void;
    classes: any;
}


class Auth extends React.Component<myProps, myState> {
    constructor(props: myProps) {
        super(props)
        this.state = {
            redirect: null,
            firstName: "",
            lastName: "",
            userName: "",
            password: "",
            userRole: "",
            login: true,
            email: "",
        }
    }



    handleSubmit = (event: any) => {
        event.preventDefault();

        let url = this.state.login ? `${APIURL}/user/login` : `${APIURL}/user/register`


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
                console.log(data, "my error")
                if(data.message == "Email already in use."){

                }
                localStorage.setItem("token", data.token)
                this.props.updateToken(data.token)
                this.setState({ redirect: "/" })

            })
            .catch(err => console.log(err))
    }

    componentDidMount() {
        console.log(this.props)
    }


    handleLogout = () => {
        localStorage.setItem("token", "")
    }

    title = () => {
        return this.state.login ? "Login" : "Signup";
    }

    logginToggle = (event: any) => {
        event.preventDefault();
        console.log(this.state.login, "Login")
        this.setState({ login: !this.state.login })
    }

    signupFields = (classes: any) => {
        return !this.state.login ?
            <div>
                <TextField
                    className={classes.space}
                    color="secondary"
                    id="firstName"
                    label="First Name"
                    value={this.state.firstName}
                    variant="outlined"
                    onChange={(event) => this.setState({ firstName: event.target.value })}
                />

                <TextField
                    className={classes.space}
                    color="secondary"
                    id="lastName"
                    label="Last Name"
                    value={this.state.lastName}
                    variant="outlined"
                    onChange={(event) => this.setState({ lastName: event.target.value })}
                />

                <TextField
                    className={classes.space}
                    color="secondary"
                    id="userName"
                    label="User Name"
                    value={this.state.userName}
                    variant="outlined"
                    onChange={(event) => this.setState({ userName: event.target.value })}
                />
            </div>
            :
            null
    }

    loginButtons = (classes: any) => {
        return this.state.login ?
            <div>
                <Button
                    className={classes.space}
                    variant="contained"
                    color="primary"
                    type="submit"
                >
                    Login!
                </Button>

                <Button
                    className={classes.space}
                    variant="contained"
                    color="primary"
                    onClick={(e) => this.logginToggle(e)}
                >
                    Sign Up!
                </Button>
            </div>
            :
            <div>
                <Button
                    className={classes.space}
                    variant="contained"
                    color="primary"
                    type="submit"
                >
                    Register!
                    </Button>

                <Button
                    className={classes.space}
                    variant="contained"
                    color="primary"
                    onClick={(e) => this.logginToggle(e)}
                >
                    Login!
                    </Button>
            </div>
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        const { classes } = this.props
        return (
            <div className="container">
                <div className="innerCard">
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                        <Typography className={classes.title}variant="h4">
                            {this.title()}
                        </Typography>
                        {this.signupFields(classes)}
                        <TextField
                            className={classes.space}
                            color="secondary"
                            type="email"
                            id="email"
                            label="Email"
                            value={this.state.email}
                            variant="outlined"
                            onChange={(event) => this.setState({ email: event.target.value })}
                        />
                        <TextField
                            className={classes.space}
                            color="secondary"
                            type="password"
                            id="password"
                            label="Password"
                            value={this.state.password}
                            variant="outlined"
                            onChange={(event) => this.setState({ password: event.target.value })}
                        />
                        <br />
                        {this.loginButtons(classes)}
                    </form>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Auth);