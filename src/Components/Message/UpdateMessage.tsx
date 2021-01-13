import React, { Component } from "react"
import { Redirect } from "react-router-dom"
import { TextField, Button, Typography } from "@material-ui/core"
import APIURL from  "../../helpers/enviroment"



type myState = {
    messageBody: string;
    redirect: string;
}
type myProps = {
    token: string | null;
    messageToUpdate: any;
    updateMessage(): void;
}


class UpdateMessage extends Component<myProps, myState> {
    constructor(props: myProps) {
        super(props)
        this.state = {
            messageBody: "",
            redirect: "",
        }
    }

    handleSubmit = (event: any) => {
        
            let messageId = this.props.messageToUpdate.id
            let body = {
                messageBody: this.state.messageBody,
            }
            console.log(this.props.messageToUpdate,"The Message", body, "the Body")
            fetch(`${APIURL}/message/updateMessage/${messageId}`, {
                method: "Put",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": this.props.token!

                },
                body: JSON.stringify(body)
            })
                .then(res => res.json())
                .then(data => {
                    this.props.updateMessage();
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
                        <Typography variant="h3">Updating Message to: {this.props.messageToUpdate ? this.props.messageToUpdate.user.userName : ""}</Typography>
                        <form onSubmit={(e) => this.handleSubmit(e)} autoComplete="off">

                            <TextField id="to"
                                label="To"
                                defaultValue={this.props.messageToUpdate  ? this.props.messageToUpdate.user.userName : ""}
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
                                InputProps={{
                                    readOnly: true
                                }}
                                defaultValue={this.props.messageToUpdate.subject}
                                variant="outlined"
                            />

                            <TextField
                                id="messageBody"
                                label="Message"
                                defaultValue={this.props.messageToUpdate.messageBody}
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

export default UpdateMessage