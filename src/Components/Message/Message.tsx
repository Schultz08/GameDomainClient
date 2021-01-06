import React from "react";
import MessageDisplay from "./MessageDisplay"

type myProps = {
    token: string | null
}

type myState = {
    conversation: []
}


class Message extends React.Component<myProps, myState> {
    constructor(props: myProps) {
        super(props)
        this.state = {
            conversation: []
        }
    }

    componentDidMount() {
        console.log(this.props.token, "my token")
        fetch(`http://localhost:3000/message/getMail`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${this.props.token}`
            }
        })
            .then(res => res.json())
            .then(data => this.setState({ conversation: data }))
            .catch(err => console.log(err))

    }

    displayConductor = () => {
        if (!this.state.conversation == undefined) {
            return (
                <MessageDisplay conversation={this.state.conversation} />
            )
        } else {
            return (
                <div>
                    <h1>My Mail</h1>
                </div>
            )
        }
    }

    render() {
        return (
                this.displayConductor()
        )
    }
}

export default Message