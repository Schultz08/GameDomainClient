import React from "react";


class LeaderBoards extends React.Component {
    state ={
        players: []
    }

    componentDidMount(){
        fetch("http://localhost:3000/score/allScores", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data => this.setState({players: data}))
    }

    redner(){
        return (
            this.state.players.map((player, index) => {
                return(
                    // <p>{player.userName}</p>
                    <div></div>
                )
            })
        )
    }
}

export default LeaderBoards;