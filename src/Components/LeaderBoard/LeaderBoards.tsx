import React from "react";
import LeaderBoardsDisplay from "./LeaderBoardDisplay"
import Grid from '@material-ui/core/Grid';

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
            <LeaderBoardsDisplay players={this.state.players}/>
        )
    }
}

export default LeaderBoards;