import React from "react";
import MessageDisplay from "./MessageDisplay"
import {Redirect} from "react-router-dom"
import { Typography, Grid, withStyles, Theme, createStyles } from "@material-ui/core";

const styles = (theme:Theme) => createStyles({
    
    root: {
            width: '100%',
          },
  });

type myProps = {
    token: string | null;
    classes: any;
}

type myState = {
    conversation: any | null;
    redirect: string;
    loggedInUserId: number | null;
}


class Message extends React.Component<myProps, myState> {
    constructor(props: myProps) {
        super(props)
        this.state = {
            conversation: null,
            redirect: "",
            loggedInUserId: null,
        }
    }
    

    componentDidMount(){
        if(this.state.conversation == null){
            this.getMail()
        }

    }

    componentDidUpdate(){
        if(this.state.conversation == null){
            this.getMail()
        }
    }

    getMail = () => {

        fetch(`http://localhost:3000/message/getMail`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")!
            }
        })
            .then((res) => res.json())
            .then((data) => { console.log(data, "Fetch"); this.setState({loggedInUserId: data.receivingId});this.setState({ conversation: data })})
            .catch(err => console.log(err))

    }

    deleteMessage = (id: number, isReplyMessage: boolean) => {
        if(isReplyMessage){
            fetch(`http://localhost:3000/reply/deleteReply/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token")!
                }
            })
            .catch(err => console.log(err)) 
            this.setState({conversation: null})
        }else{
            fetch(`http://localhost:3000/message/deleteMessage/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token")!
                }
            })
            .catch(err => console.log(err))
            this.setState({conversation: null})
        }
    }

    updateMessage = (message: any) => {
            console.log(message, "updateMessage")
            let messageId = message.id
            let body = {
                messageBody: message.messageBody
            }
            fetch(`http://localhost:3000/message/updateMessage/${messageId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token")!
                },
                body: JSON.stringify(body)
            })
                .then(res => res.json())
                .then(data => {
                    this.setState({ redirect: "/message" })
                })
                .catch(err => console.log(err))

    }

    displayConductor = (classes: any) => {
        if(!this.state.conversation){
            console.log("fetch from conduct")
        }
        console.log(this.state.conversation, "displayconduct 1")
        if (this.state.conversation !== undefined && this.state.conversation !== null && this.state.conversation && this.state.conversation.messages.length > 0) {
            console.log(this.state.conversation, "displayconductor")
            return (
                <div className={classes.root}>
                <Typography  variant="h3" >Inbox</Typography>
            <MessageDisplay 
            token={this.props.token!} 
            conversation={this.state.conversation} 
            deleteMessage={this.deleteMessage} 
            loggedInUserId={this.state.loggedInUserId}
            />
                </div>
            )
        } else {
            return (
                <div>
                <Typography  variant="h3" >Inbox</Typography>
                    <h1>You have no Mail!!</h1>
                    <button onClick={this.handleClick}>Create New Message</button>
                    
                </div>
            )
        }
    }

    handleClick = () => {
        this.setState({redirect: "/sendmessage"})
    }

    render() {
        const { classes } = this.props
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
                this.displayConductor(classes)
        )
    }
}

export default withStyles(styles)(Message)