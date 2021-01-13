import userEvent from "@testing-library/user-event";
import React from "react";
import { Route, Switch, BrowserRouter as Router, Redirect, matchPath } from "react-router-dom"
import CircleBlaster from "../../Games/CircleBlaster"
import APIURL from  "../../helpers/enviroment"


type myState = {
    userScoreData: any;
    token: string;
    gameName: string;
    score: number;
    isUpdateScore: boolean;
}
type myProps = {
    token: string;
}

class GameDisplay extends React.Component<myProps, myState> {
    constructor(props: myProps) {
        super(props)
        this.state = {
            token: this.props.token,
            userScoreData: null,
            isUpdateScore: true,
            gameName: "",
            score: 0,
        }
    }

    componentDidMount() {
        if (this.state.userScoreData == null) {
            this.getUserScore()
        }
    }

    componentDidUpdate(){
        if (this.state.userScoreData == null) {
            this.getUserScore()
        }
    }

    setGameData = (gameName: string, score: number) => {
        this.setState({ gameName: gameName })
        this.setState({ score: score })
    }

    createOrUpdateScore = (gameName: string, score: number) => {

        console.log(gameName, score)
        console.log(this.state.userScoreData.scores.length)
        let body = {
            gameName: gameName,
            score: score,
        }
        if (this.state.userScoreData.scores.length == 0) {
            console.log("1")
            fetch(`${APIURL}/score/score`, {
                method: "Post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": this.props.token!
                },
                body: JSON.stringify(body)
            })
                .then(res => res.json())
                .then(data => { this.setState({ userScoreData: data }) })
                .catch(err => console.log(err))
        } 
        
        else if (this.state.userScoreData.scores.length > 0) 
        {
            console.log("2")

            this.state.userScoreData.scores.map((game: any) => {
                if (game.gameName == gameName) {
                    console.log(game.gameName, gameName)
                    this.setState({ isUpdateScore: false })
                }
            })

        
            if (!this.state.isUpdateScore) {
                console.log("3")

                fetch(`${APIURL}/score/score`, {
                    method: "Post",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": this.props.token!
                    },
                    body: JSON.stringify(body)
                })
                    .then(res => res.json())
                    .then(data => { this.setState({ isUpdateScore: true }); this.setState({ userScoreData: data }) })
                    .catch(err => console.log(err))
            } else {
                console.log("4")


                fetch(`${APIURL}/score/updateScore`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": this.props.token!

                    },
                    body: JSON.stringify(body)
                })
                    .then(res => res.json())
                    .then(data => { this.setState({ userScoreData: data }) })
                    .catch(err => console.log(err))
            }
        }

    }

    getUserScore = () => {

        fetch(`${APIURL}/score/singleUserSorces`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")!
            },
        })
            .then(res => res.json())
            .then(data => { console.log(data, "Score Fetch"); this.setState({ userScoreData: data }) })
            .catch(err => console.log(err))
    }


    render() {
        const path = matchPath("/playgame/1", { path: "/playgame/:id" })
        return (
            <CircleBlaster createOrUpdateScore={this.createOrUpdateScore} />

        )
    }
}

export default GameDisplay;