import React from "react";
import MessageDisplay from "./MessageDisplay"
import {Redirect} from "react-router-dom"
import { getMaxListeners } from "process";
import { Typography, Grid, withStyles, Theme } from "@material-ui/core";

const styles = (theme:Theme) => ({
    root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
          },
          nested: {
            paddingLeft: theme.spacing(4),
          },
  });

type myProps = {
    token: string | null;
}

type myState = {
    conversation: any | null;
    redirect: string;
}


class Message extends React.Component<myProps, myState> {
    constructor(props: myProps) {
        super(props)
        this.state = {
            conversation: null,
            redirect: "",
        }
    }
    

    componentDidMount(){
        this.getMail()

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
            .then((data) => { console.log(data, "Fetch"); this.setState({ conversation: data })})
            .catch(err => console.log(err))

    }

    displayConductor = () => {
        if(!this.state.conversation){
            console.log("fetch from conduct")
        }
        console.log(this.state.conversation, "displayconduct 1")
        if (this.state.conversation !== undefined && this.state.conversation !== null && this.state.conversation && this.state.conversation.messages.length > 0) {
            console.log(this.state.conversation, "displayconductor")
            return (
                <Grid>
                <Typography variant="h3" >Inbox</Typography>
            <MessageDisplay conversation={this.state.conversation} />
                </Grid>
            )
        } else {
            return (
                <div>
                    <h1>My Mail</h1>
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
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
                this.displayConductor()
        )
    }
}

export default Message