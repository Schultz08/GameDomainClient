import React, { Component } from "react"
import { Redirect } from "react-router-dom"
import { TextField, Button } from "@material-ui/core"




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


        }

    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div><h1>This is send mail</h1>
                <div className="container">
                    <div className="innerCard">
                        <h2>New Message</h2>
                        <form onSubmit={(e) => this.handleSubmit(e)} autoComplete="off">

                            <TextField id="to"
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
                                id="subject"
                                label="Subject"
                                fullWidth
                                defaultValue={this.state.subject}
                                variant="outlined"
                                onChange={(event) => this.setState({ subject: event.target.value })}
                            />

                            <TextField
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

                            <Button type="submit">Send</Button>

                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default SendMessage