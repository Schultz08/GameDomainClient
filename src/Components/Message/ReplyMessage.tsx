import React, { Component } from "react"
import { Redirect } from "react-router-dom"
import { TextField, Button, Typography } from "@material-ui/core"
import APIURL from  "../../helpers/enviroment"



type myState = {
    messageBody: string;
    redirect: string;
    subject: string;
}
type myProps = {
    token: string | null;
    parentMessage: any;
    replyToMessage(): void;
}


class ReplyMessage extends Component<myProps, myState> {
    constructor(props: myProps) {
        super(props)
        this.state = {
            subject: "",
            messageBody: "",
            redirect: "",
        }
    }

    handleSubmit = (event: any) => {
        event.preventDefault()

            let body = {
                subject: this.state.subject,
                messageBody: this.state.messageBody,
                parentMessageId: this.props.parentMessage.id
            }
            fetch(`${APIURL}/reply/reply`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": this.props.token!

                },
                body: JSON.stringify(body)
            })
                .then(res => res.json())
                .then(data => {
                    this.props.replyToMessage();
                    this.setState({ redirect: "/message" });
                })
                .catch(err => console.log(err))
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        console.log(this.props, "Reply Props")
        return (
            <div>
                <div className="container">
                    <div className="innerCard">
                        <Typography variant="h3">Reply to: {this.props.parentMessage ? this.props.parentMessage.user.userName : ""}</Typography>
                        <form onSubmit={(e) => this.handleSubmit(e)} autoComplete="off">

                            <TextField 
                            id="to"
                                label="To"
                                defaultValue={this.props.parentMessage ? this.props.parentMessage.user.userName : ""}
                                fullWidth
                                InputProps={{
                                    readOnly: true
                                }}
                                variant="outlined"
                            />
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

                            <Button variant="contained" color="primary" type="submit">Send</Button>


                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default ReplyMessage