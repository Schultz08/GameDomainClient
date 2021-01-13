import React, { Component } from "react"
import { Redirect } from "react-router-dom"
import { TextField, Button, Typography } from "@material-ui/core"
import { withStyles, createStyles, Theme } from "@material-ui/core"


const styles = ((theme: Theme) => createStyles({
    root: {
        flexGrow: 1,
    },

    messageHeader: {
        width: "100%",

    },
    messageBody: {
        margin: 2,

    },
    button: {
        marginInlineStart: "auto"
    },
    innerWrap: {
        textAlign: "right",
    }

}))

type myState = {
    hasReceivingId: boolean;
    userVerified: boolean;
    receivingUser: string;
    messageBody: string;
    receivingId?: any
    redirect: string;
    subject: string;
    buttonColor: string;
}
type myProps = {
    token: string | null;
    receivingId?: number;
    classes: any;
}


class SendMessage extends Component<myProps, myState> {
    constructor(props: myProps) {
        super(props)
        this.state = {
            hasReceivingId: this.props.receivingId ? true : false,
            userVerified: false,
            receivingUser: "",
            messageBody: "",
            receivingId: 0,
            redirect: "",
            subject: "",
            buttonColor: "primary",
        }
    }


    verifyUser = (event: any) => {
        let userName = this.state.receivingUser;
        fetch(`http://localhost:3000/user/byusername/${userName}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": this.props.token!
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log(data.id)
                this.setState({ receivingId: data.id });
                this.setState({ userVerified: !this.state.userVerified })
            })
            .catch(err => console.log(err))

    }

    changeUserName = () => {
        this.setState({ userVerified: !this.state.userVerified })
    }



    handleSubmit = (event: any) => {
        event.preventDefault()

        if (this.state.userVerified) {

            let body = {
                subject: this.state.subject,
                messageBody: this.state.messageBody,
                receivingId: this.state.receivingId
            }
            console.log(body)
            fetch("http://localhost:3000/message/newMessage", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": this.props.token!

                },
                body: JSON.stringify(body)
            })
                .then(res => res.json())
                .then(data => {
                    this.setState({ redirect: "/message" })
                })
                .catch(err => console.log(err))
        } else {
            //highlight UserName input if not verified
        }

    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        const { classes } = this.props;
        return (
            <div>
                <Typography variant="h2">
                New Message

                </Typography>
                <div className={classes.innerWrap}>
                    <form onSubmit={(e) => this.handleSubmit(e)} autoComplete="off">

                        <TextField
                            className={classes.messageHeader}
                            color="secondary"
                            id="to"
                            label="To"
                            defaultValue={this.state.receivingUser}
                            helperText={this.state.userVerified ? "User Verified" : "Enter a UserName"}
                            fullWidth
                            InputProps={{
                                readOnly: this.state.userVerified ? true : false,
                            }}
                            variant="outlined"
                            onChange={(event) => this.setState({ receivingUser: event.target.value })}
                        />

                        <Button variant="contained" color="primary" onClick={this.state.userVerified ? this.changeUserName : (event) => this.verifyUser(event)}>{this.state.userVerified ? "Change User" : "Verify UserName"}</Button>


                        <TextField
                            className={classes.messageHeader}
                            color="secondary"
                            id="subject"
                            label="Subject"
                            fullWidth
                            defaultValue={this.state.subject}
                            variant="outlined"
                            onChange={(event) => this.setState({ subject: event.target.value })}
                        />

                        <TextField
                            className={classes.messageBody}
                            color="secondary"
                            id="messageBody"
                            label="Message"
                            defaultValue={this.state.messageBody}
                            variant="outlined"
                            multiline
                            rows={10}
                            rowsMax={10}
                            fullWidth
                            onChange={(event) => this.setState({ messageBody: event.target.value })}
                        />
                        <Button className={classes.button} variant="contained" color="primary" type="submit">Send</Button>

                    </form>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(SendMessage)