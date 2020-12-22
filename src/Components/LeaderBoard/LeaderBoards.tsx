import React from "react";
import LeaderBoardsDisplay from "./LeaderBoardDisplay"


class LeaderBoards extends React.Component {
        state ={
            players: []
        }

    componentDidMount(){
        fetch(`http://localhost:3000/score/allScores/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(res => res.json())
        .then(data => this.setState({players: data}))
    }

    render(){
        return (
            <div>
            <LeaderBoardsDisplay players={this.state.players}/>
            </div>
        )
    }
}

export default LeaderBoards;